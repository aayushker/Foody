import pandas as pd
import numpy as np
import pickle
import os
import json
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

class RecipeDataProcessor:
    def __init__(self, data_dir='dataset/'):
        self.data_dir = data_dir
        self.base_path = os.path.dirname(os.path.abspath(__file__))
        self.full_data_path = os.path.join(self.base_path, data_dir)
        self.raw_recipes_path = os.path.join(self.full_data_path, 'RAW_recipes.csv')
        self.processed_recipes_path = os.path.join(self.base_path, 'processed_recipes.pkl')
        self.tfidf_vectorizer_path = os.path.join(self.base_path, 'tfidf_vectorizer.pkl')
        self.tfidf_matrix_path = os.path.join(self.base_path, 'tfidf_matrix.pkl')
        self.recipe_id_to_index_path = os.path.join(self.base_path, 'recipe_id_to_index.pkl')
        self.ingredient_to_recipes_path = os.path.join(self.base_path, 'ingredient_to_recipes.pkl')
        
    def load_and_clean_data(self):
        """Load and clean the raw recipe data"""
        print("Loading raw recipe data...")
        
        # Load the recipes data with specific dtypes for efficiency
        recipes_df = pd.read_csv(
            self.raw_recipes_path, 
            usecols=['id', 'name', 'ingredients', 'steps', 'description', 'minutes', 'tags', 'nutrition'],
            dtype={
                'id': np.int32,
                'name': str,
                'ingredients': str,
                'steps': str,
                'description': str,
                'minutes': np.int32,
                'tags': str,
                'nutrition': str
            }
        )
        
        print(f"Loaded {len(recipes_df)} recipes")
        
        # Parse the ingredients from string to list
        recipes_df['ingredients'] = recipes_df['ingredients'].apply(self._parse_list_from_string)
        
        # Parse the steps from string to list
        recipes_df['steps'] = recipes_df['steps'].apply(self._parse_list_from_string)
        
        # Parse the tags from string to list
        recipes_df['tags'] = recipes_df['tags'].apply(self._parse_list_from_string)
        
        # Parse the nutrition from string to list
        recipes_df['nutrition'] = recipes_df['nutrition'].apply(self._parse_list_from_string)
        
        # Remove recipes with very short or very long cooking times
        recipes_df = recipes_df[(recipes_df['minutes'] >= 5) & (recipes_df['minutes'] <= 300)]
        
        # Keep only recipes with a reasonable number of ingredients (2-20)
        recipes_df = recipes_df[recipes_df['ingredients'].apply(len).between(2, 20)]
        
        # Create a text field that combines the recipe name, ingredients, and description for better searching
        recipes_df['search_text'] = recipes_df.apply(
            lambda x: f"{x['name']} {' '.join(x['ingredients'])} {x['description']}",
            axis=1
        )
        
        print(f"Processed data has {len(recipes_df)} recipes")
        
        # Save the processed dataframe
        with open(self.processed_recipes_path, 'wb') as f:
            pickle.dump(recipes_df, f)
        
        return recipes_df
    
    def build_ingredient_to_recipes_index(self, recipes_df=None):
        """Build an index mapping ingredients to recipes that contain them"""
        if recipes_df is None:
            if os.path.exists(self.processed_recipes_path):
                with open(self.processed_recipes_path, 'rb') as f:
                    recipes_df = pickle.load(f)
            else:
                recipes_df = self.load_and_clean_data()
        
        print("Building ingredient to recipes index...")
        ingredient_to_recipes = {}
        
        for idx, row in recipes_df.iterrows():
            recipe_id = row['id']
            for ingredient in row['ingredients']:
                ingredient = ingredient.lower()
                if ingredient not in ingredient_to_recipes:
                    ingredient_to_recipes[ingredient] = []
                ingredient_to_recipes[ingredient].append(recipe_id)
        
        # Save the ingredient to recipes index
        with open(self.ingredient_to_recipes_path, 'wb') as f:
            pickle.dump(ingredient_to_recipes, f)
        
        print(f"Built index with {len(ingredient_to_recipes)} ingredients")
        return ingredient_to_recipes
    
    def build_tfidf_model(self, recipes_df=None):
        """Build a TF-IDF model for recipe similarity based on search_text"""
        if recipes_df is None:
            if os.path.exists(self.processed_recipes_path):
                with open(self.processed_recipes_path, 'rb') as f:
                    recipes_df = pickle.load(f)
            else:
                recipes_df = self.load_and_clean_data()
        
        print("Building TF-IDF model...")
        
        # Create recipe ID to index mapping
        recipe_id_to_index = {recipe_id: idx for idx, recipe_id in enumerate(recipes_df['id'])}
        
        # Build TF-IDF vectorizer
        tfidf_vectorizer = TfidfVectorizer(
            min_df=2,
            max_df=0.8,
            stop_words='english',
            use_idf=True,
            ngram_range=(1, 2)
        )
        
        # Fit and transform the search_text
        tfidf_matrix = tfidf_vectorizer.fit_transform(recipes_df['search_text'])
        
        print(f"TF-IDF matrix shape: {tfidf_matrix.shape}")
        
        # Save the TF-IDF vectorizer
        with open(self.tfidf_vectorizer_path, 'wb') as f:
            pickle.dump(tfidf_vectorizer, f)
        
        # Save the TF-IDF matrix
        with open(self.tfidf_matrix_path, 'wb') as f:
            pickle.dump(tfidf_matrix, f)
        
        # Save the recipe ID to index mapping
        with open(self.recipe_id_to_index_path, 'wb') as f:
            pickle.dump(recipe_id_to_index, f)
        
        return tfidf_vectorizer, tfidf_matrix, recipe_id_to_index
    
    def _parse_list_from_string(self, list_str):
        """Parse a string representation of a list into an actual list"""
        if pd.isna(list_str) or not list_str:
            return []
        
        try:
            # Remove the brackets and quotes, then split by comma
            clean_str = list_str.strip('[]\'\"')
            if not clean_str:
                return []
            
            # Handle lists with Python syntax
            if list_str.startswith('[') and list_str.endswith(']'):
                try:
                    return eval(list_str)
                except:
                    pass
            
            # Try to split by comma
            items = re.findall(r'\'([^\']+)\'', list_str)
            if items:
                return items
            
            # Fallback to simple split
            return [item.strip(' \'\"') for item in clean_str.split(',')]
        except Exception as e:
            print(f"Error parsing list from string: {e}")
            return []

    def process_all(self):
        """Run the complete preprocessing pipeline"""
        print("Starting full preprocessing pipeline...")
        recipes_df = self.load_and_clean_data()
        self.build_ingredient_to_recipes_index(recipes_df)
        self.build_tfidf_model(recipes_df)
        print("Preprocessing complete. Files saved to:", self.base_path)

if __name__ == "__main__":
    processor = RecipeDataProcessor()
    processor.process_all() 