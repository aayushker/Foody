from rest_framework import serializers
from .models import RecipeQuery, RecipeRecommendation, UserFeedback

class RecipeQuerySerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeQuery
        fields = ['id', 'query_text', 'ingredients', 'created_at']
        read_only_fields = ['id', 'created_at']

class RecipeRecommendationSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeRecommendation
        fields = ['id', 'recipe_id', 'recipe_name', 'similarity_score', 'ingredient_match', 'created_at']
        read_only_fields = ['id', 'created_at']

class UserFeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFeedback
        fields = ['id', 'user', 'recommendation', 'liked', 'tried', 'comment', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']

class RecipeRequestSerializer(serializers.Serializer):
    query = serializers.CharField(required=True, help_text="Natural language query about ingredients")
    
class RecipeIngredientRequestSerializer(serializers.Serializer):
    ingredients = serializers.ListField(
        child=serializers.CharField(),
        help_text="List of ingredients to search for"
    )
    
class RecipeResponseSerializer(serializers.Serializer):
    name = serializers.CharField()
    ingredients = serializers.ListField(child=serializers.CharField())
    steps = serializers.ListField(child=serializers.CharField())
    minutes = serializers.IntegerField()
    ingredient_match = serializers.FloatField(required=False)
    description = serializers.CharField(required=False)
    
class NaturalLanguageResponseSerializer(serializers.Serializer):
    response = serializers.CharField()
    recipes = RecipeResponseSerializer(many=True) 