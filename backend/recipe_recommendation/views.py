from django.shortcuts import render
from rest_framework import status, generics, views
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.conf import settings
import os

from .models import RecipeQuery, RecipeRecommendation, UserFeedback
from .serializers import (
    RecipeQuerySerializer, 
    RecipeRecommendationSerializer, 
    UserFeedbackSerializer,
    RecipeRequestSerializer,
    RecipeIngredientRequestSerializer,
    RecipeResponseSerializer,
    NaturalLanguageResponseSerializer
)

# Import ML model components
from mlModel.recipe_recommender import RecipeRecommender
from mlModel.llm_integration import LLMRecipeAssistant

# Initialize the ML models
recipe_recommender = RecipeRecommender()
llm_assistant = LLMRecipeAssistant(api_key=os.getenv('OPENAI_API_KEY'))

class RecipeQueryView(views.APIView):
    """
    API endpoint for natural language recipe queries
    """
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = RecipeRequestSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        # Extract the query
        user_query = serializer.validated_data['query']
        
        # Use LLM to extract ingredients from the query
        extraction_result = llm_assistant.extract_ingredients(user_query)
        ingredients = extraction_result['ingredients']
        
        if not ingredients:
            return Response({
                "error": "Could not extract ingredients from your query. Please specify ingredients explicitly."
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Store the query
        query_data = {
            'query_text': user_query,
            'ingredients': ingredients
        }
        
        if request.user.is_authenticated:
            query_data['user'] = request.user
        
        query_serializer = RecipeQuerySerializer(data=query_data)
        if query_serializer.is_valid():
            query = query_serializer.save()
        else:
            # Continue even if we can't save the query
            query = None
        
        # Get recipe recommendations
        recommended_recipes = recipe_recommender.search_recipes_by_ingredients(ingredients)
        
        if not recommended_recipes:
            return Response({
                "response": f"I couldn't find any recipes with these ingredients: {', '.join(ingredients)}. Try adding more common ingredients.",
                "recipes": []
            }, status=status.HTTP_404_NOT_FOUND)
        
        # Store recommendations if query was saved
        if query:
            for recipe in recommended_recipes[:5]:  # Store top 5 recommendations
                recommendation_data = {
                    'query': query.id,
                    'recipe_id': recipe['id'],
                    'recipe_name': recipe['name'],
                    'similarity_score': 0.0,  # We don't have this from the model
                    'ingredient_match': recipe.get('ingredient_match', 0.0)
                }
                rec_serializer = RecipeRecommendationSerializer(data=recommendation_data)
                if rec_serializer.is_valid():
                    rec_serializer.save()
        
        # Generate a natural language response for the top recipe
        nl_response = llm_assistant.generate_recipe_response(
            recommended_recipes[0], 
            user_query
        ) if recommended_recipes else "I couldn't find any good recipes with those ingredients."
        
        # Format the response
        response_data = {
            "response": nl_response,
            "recipes": recommended_recipes[:5]  # Return top 5 recipes
        }
        
        return Response(response_data)

class IngredientSearchView(views.APIView):
    """
    API endpoint for searching recipes by explicit ingredients list
    """
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = RecipeIngredientRequestSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        # Extract ingredients
        ingredients = serializer.validated_data['ingredients']
        
        if not ingredients:
            return Response({
                "error": "Please provide at least one ingredient."
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Get recipe recommendations first
        recommended_recipes = recipe_recommender.search_recipes_by_ingredients(ingredients)
        
        if not recommended_recipes:
            return Response({
                "recipes": []
            }, status=status.HTTP_404_NOT_FOUND)
        
        # Try to store the query and recommendations
        try:
            # Create the query
            query_text = f"Recipes with {', '.join(ingredients)}"
            query_data = {
                'query_text': query_text,
                'ingredients': ingredients
            }
            
            if request.user.is_authenticated:
                query_data['user'] = request.user
            
            query_serializer = RecipeQuerySerializer(data=query_data)
            if query_serializer.is_valid():
                query = query_serializer.save()
                
                # Store recommendations only if query was successfully created
                for recipe in recommended_recipes[:5]:  # Store top 5 recommendations
                    # Handle NaN values in recipe data
                    recipe_data = {
                        'id': recipe['id'],
                        'name': recipe['name'],
                        'ingredients': recipe.get('ingredients', []),
                        'instructions': recipe.get('instructions', ''),
                        'nutritional_info': {
                            'calories': float(recipe.get('calories', 0)) if recipe.get('calories') is not None else 0,
                            'protein': float(recipe.get('protein', 0)) if recipe.get('protein') is not None else 0,
                            'fat': float(recipe.get('fat', 0)) if recipe.get('fat') is not None else 0,
                            'carbs': float(recipe.get('carbs', 0)) if recipe.get('carbs') is not None else 0
                        }
                    }
                    
                    recommendation_data = {
                        'query': query.id,
                        'recipe_id': recipe['id'],
                        'recipe_name': recipe['name'],
                        'similarity_score': 0.0,
                        'ingredient_match': float(recipe.get('ingredient_match', 0.0)) if recipe.get('ingredient_match') is not None else 0.0
                    }
                    rec_serializer = RecipeRecommendationSerializer(data=recommendation_data)
                    if rec_serializer.is_valid():
                        rec_serializer.save()
        except Exception as e:
            # Log the error but continue with the response
            print(f"Error saving query and recommendations: {e}")
        
        # Clean the recipe data for JSON response
        cleaned_recipes = []
        for recipe in recommended_recipes[:10]:
            cleaned_recipe = {
                'id': recipe['id'],
                'name': recipe['name'],
                'ingredients': recipe.get('ingredients', []),
                'instructions': recipe.get('instructions', ''),
                'nutritional_info': {
                    'calories': float(recipe.get('calories', 0)) if recipe.get('calories') is not None else 0,
                    'protein': float(recipe.get('protein', 0)) if recipe.get('protein') is not None else 0,
                    'fat': float(recipe.get('fat', 0)) if recipe.get('fat') is not None else 0,
                    'carbs': float(recipe.get('carbs', 0)) if recipe.get('carbs') is not None else 0
                },
                'ingredient_match': float(recipe.get('ingredient_match', 0.0)) if recipe.get('ingredient_match') is not None else 0.0
            }
            cleaned_recipes.append(cleaned_recipe)
        
        # Always return the recommendations regardless of storage success
        response_data = {
            "recipes": cleaned_recipes
        }
        
        return Response(response_data)

class UserFeedbackView(views.APIView):
    """
    API endpoint for users to provide feedback on recipe recommendations
    """
    permission_classes = [IsAuthenticated]
    
    def post(self, request, recommendation_id):
        try:
            recommendation = RecipeRecommendation.objects.get(id=recommendation_id)
        except RecipeRecommendation.DoesNotExist:
            return Response({"error": "Recommendation not found"}, status=status.HTTP_404_NOT_FOUND)
        
        # Check if feedback already exists
        try:
            feedback = UserFeedback.objects.get(user=request.user, recommendation=recommendation)
            serializer = UserFeedbackSerializer(feedback, data=request.data, partial=True)
        except UserFeedback.DoesNotExist:
            # Create new feedback
            data = {
                **request.data,
                'user': request.user.id,
                'recommendation': recommendation.id
            }
            serializer = UserFeedbackSerializer(data=data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RecipeDetailView(views.APIView):
    """
    API endpoint to get detailed information about a specific recipe
    """
    permission_classes = [AllowAny]
    
    def get(self, request, recipe_id):
        recipe_details = recipe_recommender.get_recipe_details(recipe_id)
        
        if not recipe_details:
            return Response({"error": "Recipe not found"}, status=status.HTTP_404_NOT_FOUND)
            
        return Response(recipe_details)
