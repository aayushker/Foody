import os
import pickle
import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from typing import List, Dict, Any

class RecipeRecommender:
    def __init__(self):
        self.base_path = os.path.dirname(os.path.abspath(__file__))
        self.processed_recipes_path = os.path.join(self.base_path, 'processed_recipes.pkl')
        self.tfidf_vectorizer_path = os.path.join(self.base_path, 'tfidf_vectorizer.pkl')
        self.tfidf_matrix_path = os.path.join(self.base_path, 'tfidf_matrix.pkl')
        self.recipe_id_to_index_path = os.path.join(self.base_path, 'recipe_id_to_index.pkl')
        self.ingredient_to_recipes_path = os.path.join(self.base_path, 'ingredient_to_recipes.pkl')
        
        # Load all the necessary data
        self.load_data()
        
    def load_data(self):
        """Load all the necessary data for recipe recommendation"""
        try:
            with open(self.processed_recipes_path, 'rb') as f:
                self.recipes_df = pickle.load(f)
            
            with open(self.tfidf_vectorizer_path, 'rb') as f:
                self.tfidf_vectorizer = pickle.load(f)
            
            with open(self.tfidf_matrix_path, 'rb') as f:
                self.tfidf_matrix = pickle.load(f)
            
            with open(self.recipe_id_to_index_path, 'rb') as f:
                self.recipe_id_to_index = pickle.load(f)
            
            with open(self.ingredient_to_recipes_path, 'rb') as f:
                self.ingredient_to_recipes = pickle.load(f)
            
            # Create inverse mapping from index to recipe ID
            self.index_to_recipe_id = {idx: recipe_id for recipe_id, idx in self.recipe_id_to_index.items()}
            
            print("All data loaded successfully")
            return True
        except FileNotFoundError as e:
            print(f"Error loading data: {e}")
            print("Make sure to run preprocess.py first to generate the necessary files")
            return False
    
    def search_recipes_by_ingredients(self, ingredients: List[str], top_n: int = 10) -> List[Dict[str, Any]]:
        """
        Find recipes that use the given ingredients
        
        Args:
            ingredients: List of ingredient names
            top_n: Number of recipes to return
            
        Returns:
            List of recipe dictionaries with recipe details
        """
        # Normalize the ingredients (lowercase)
        ingredients = [ing.lower() for ing in ingredients]
        
        # First, find recipes that contain any of the given ingredients
        candidate_recipe_ids = set()
        for ingredient in ingredients:
            for key in self.ingredient_to_recipes.keys():
                if ingredient in key:
                    candidate_recipe_ids.update(self.ingredient_to_recipes[key])
        
        if not candidate_recipe_ids:
            return []
        
        # Convert ingredients list to a search query
        query = " ".join(ingredients)
        
        # Transform the query using the TF-IDF vectorizer
        query_vector = self.tfidf_vectorizer.transform([query])
        
        # Get the candidate recipes' indices
        candidate_indices = [self.recipe_id_to_index[recipe_id] for recipe_id in candidate_recipe_ids 
                            if recipe_id in self.recipe_id_to_index]
        
        # Calculate cosine similarity between the query and candidate recipes
        candidate_similarities = cosine_similarity(
            query_vector, 
            self.tfidf_matrix[candidate_indices]
        )[0]
        
        # Sort the candidate recipes by similarity score
        sorted_indices = np.argsort(candidate_similarities)[::-1]
        
        # Get the top_n recipe IDs
        top_recipe_indices = [candidate_indices[idx] for idx in sorted_indices[:top_n]]
        top_recipe_ids = [self.index_to_recipe_id[idx] for idx in top_recipe_indices]
        
        # Get the recipes from the dataframe
        recommended_recipes = []
        for recipe_id in top_recipe_ids:
            recipe = self.recipes_df[self.recipes_df['id'] == recipe_id].iloc[0].to_dict()
            # Convert numpy types to Python native types for JSON serialization
            recipe = {k: v.item() if hasattr(v, 'item') else v for k, v in recipe.items()}
            
            # Calculate ingredient match percentage
            recipe_ingredients = [ing.lower() for ing in recipe['ingredients']]
            matched_ingredients = [ing for ing in ingredients if any(ing in recipe_ing for recipe_ing in recipe_ingredients)]
            recipe['ingredient_match'] = len(matched_ingredients) / len(ingredients) * 100
            
            recommended_recipes.append(recipe)
        
        return recommended_recipes
    
    def search_recipes_by_query(self, query: str, top_n: int = 10) -> List[Dict[str, Any]]:
        """
        Search recipes by text query
        
        Args:
            query: Text query to search for
            top_n: Number of recipes to return
            
        Returns:
            List of recipe dictionaries with recipe details
        """
        # Transform the query using the TF-IDF vectorizer
        query_vector = self.tfidf_vectorizer.transform([query])
        
        # Calculate cosine similarity between the query and all recipes
        similarities = cosine_similarity(query_vector, self.tfidf_matrix)[0]
        
        # Sort the recipes by similarity score
        sorted_indices = np.argsort(similarities)[::-1]
        
        # Get the top_n recipe IDs
        top_recipe_indices = sorted_indices[:top_n]
        top_recipe_ids = [self.index_to_recipe_id[idx] for idx in top_recipe_indices]
        
        # Get the recipes from the dataframe
        recommended_recipes = []
        for recipe_id in top_recipe_ids:
            recipe = self.recipes_df[self.recipes_df['id'] == recipe_id].iloc[0].to_dict()
            # Convert numpy types to Python native types for JSON serialization
            recipe = {k: v.item() if hasattr(v, 'item') else v for k, v in recipe.items()}
            recommended_recipes.append(recipe)
        
        return recommended_recipes
    
    def get_recipe_details(self, recipe_id: int) -> Dict[str, Any]:
        """
        Get detailed information about a specific recipe
        
        Args:
            recipe_id: ID of the recipe to get details for
            
        Returns:
            Dictionary with recipe details
        """
        recipe = self.recipes_df[self.recipes_df['id'] == recipe_id]
        if len(recipe) == 0:
            return None
        
        recipe = recipe.iloc[0].to_dict()
        # Convert numpy types to Python native types for JSON serialization
        recipe = {k: v.item() if hasattr(v, 'item') else v for k, v in recipe.items()}
        return recipe 