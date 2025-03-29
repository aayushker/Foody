"""
Script to preprocess the recipe data.
"""
from preprocess import RecipeDataProcessor

if __name__ == "__main__":
    print("Starting recipe data preprocessing...")
    processor = RecipeDataProcessor()
    processor.process_all()
    print("Preprocessing complete!") 