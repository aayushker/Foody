# Recipe Recommendation ML Model

This directory contains the machine learning model for recipe recommendations based on ingredients and natural language queries.

## Overview

The ML model consists of several components:

1. **Data Preprocessing** - Scripts to clean and prepare the recipe dataset
2. **Recipe Recommender** - A TF-IDF based recommendation engine to find recipes by ingredients
3. **LLM Integration** - Integration with OpenAI's GPT models for natural language understanding

## Setup Instructions

### Prerequisites

Make sure you have the following packages installed:

```bash
pip install numpy pandas scikit-learn python-dotenv openai scipy
```

Or simply run:

```bash
pip install -r requirements.txt
```

### Environment Variables

Create a `.env` file in the project root with your OpenAI API key:

```
OPENAI_API_KEY=your_openai_api_key_here
```

### Data Preprocessing

The raw recipe data needs to be preprocessed before it can be used by the model. Run:

```bash
cd backend
python mlModel/run_preprocess.py
```

This will:
1. Load and clean the recipe data
2. Create a TF-IDF matrix for recipe similarity
3. Build an ingredient-to-recipe index
4. Save all processed data files to the mlModel directory

**Note:** This process may take some time (10-20 minutes) depending on your hardware.

## Usage

The model is integrated with Django and can be accessed through the following API endpoints:

- `/api/recipe-search/query/` - Search for recipes using natural language
- `/api/recipe-search/ingredients/` - Search for recipes using a list of ingredients
- `/api/recipe-search/detail/<recipe_id>/` - Get detailed information about a specific recipe

## Model Details

### Recipe Recommender

The recommendation engine uses TF-IDF (Term Frequency-Inverse Document Frequency) to convert recipe text into vectors. Cosine similarity is then used to find recipes that are similar to the query or ingredients.

### LLM Integration

The LLM integration uses OpenAI's GPT models to:
1. Extract ingredients from natural language queries
2. Generate human-like responses about recommended recipes

## Extending the Model

To add more features to the model:

1. Modify the `recipe_recommender.py` file to add new recommendation methods
2. Update the `llm_integration.py` file to improve LLM interactions
3. Add new endpoints in `backend/recipe_recommendation/views.py` 