import re
import json
import os
from openai import OpenAI
from dotenv import load_dotenv
load_dotenv()
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
import os
from typing import List, Dict, Any, Optional

class LLMRecipeAssistant:
    def __init__(self, api_key: Optional[str] = None):
        """
        Initialize the LLM Recipe Assistant
        
        Args:
            api_key: OpenAI API key (optional, can also be set as OPENAI_API_KEY environment variable)
        """
        # Always set the system prompt
        self.system_prompt = """
            You are a helpful cooking assistant that helps users find recipes based on ingredients they have.
            Your task is to:
            1. Extract the ingredients mentioned in the user's message
            2. Return them in a clean, normalized format as a JSON list
            3. If the user asks for recipe suggestions or advice, indicate this in your response
            
            For example:
            - If the user says "I have tomatoes, cheese, and bread", extract ["tomatoes", "cheese", "bread"]
            - If the user says "Can you suggest a recipe with chicken and rice?", extract ["chicken", "rice"] and indicate recipe_request=true
            - If the user asks "What can I make with potatoes, eggs, and spinach?", extract ["potatoes", "eggs", "spinach"] and indicate recipe_request=true
            
            Always output valid JSON with the following format:
            {"ingredients": ["ingredient1", "ingredient2", ...], "recipe_request": true/false}
            """
        
        # Set API key if provided, otherwise expect it in environment variables
        if api_key:
            # Optionally add additional api_key-related setup here
            pass

    def extract_ingredients(self, user_message: str) -> Dict[str, Any]:
        """
        Use an LLM to extract ingredients from a natural language message
        
        Args:
            user_message: User's natural language query
            
        Returns:
            Dictionary with extracted ingredients and whether this is a recipe request
        """
        try:
            # Use OpenAI API to extract ingredients
            response = client.chat.completions.create(model="gpt-3.5-turbo",  # Use an appropriate model
            messages=[
                {"role": "system", "content": self.system_prompt},
                {"role": "user", "content": user_message}
            ],
            temperature=0.2,  # Low temperature for more focused extraction
            max_tokens=200)

            # Extract the response content
            llm_response = response.choices[0].message.content.strip()

            # Try to extract JSON from the response
            try:
                # Look for JSON-like content in the response
                json_match = re.search(r'\{.*\}', llm_response, re.DOTALL)
                if json_match:
                    json_str = json_match.group(0)
                    result = json.loads(json_str)

                    # Validate the structure
                    if 'ingredients' not in result:
                        result['ingredients'] = []
                    if 'recipe_request' not in result:
                        result['recipe_request'] = True

                    return result
            except json.JSONDecodeError:
                pass

            # Fallback to manual extraction
            ingredients = re.findall(r'["\'](.*?)["\']', llm_response)
            return {
                "ingredients": ingredients,
                "recipe_request": "recipe" in user_message.lower()
            }

        except Exception as e:
            print(f"Error in LLM extraction: {e}")

            # Fallback to simple keyword extraction
            words = re.findall(r'\b[a-zA-Z]+\b', user_message.lower())
            common_ingredients = ["tomatoes", "chicken", "beef", "pork", "rice", "pasta", 
                                  "potatoes", "onions", "garlic", "carrots", "bell peppers", 
                                  "cheese", "eggs", "milk", "butter", "oil", "flour", "sugar", 
                                  "salt", "pepper", "herbs", "spices"]

            extracted = [word for word in words if word in common_ingredients]

            return {
                "ingredients": extracted,
                "recipe_request": "recipe" in user_message.lower() or "make" in user_message.lower()
            }

    def generate_recipe_response(self, recipe_data: Dict[str, Any], user_query: str) -> str:
        """
        Generate a natural language response about a recipe based on user query
        
        Args:
            recipe_data: Recipe data dictionary
            user_query: Original user query
            
        Returns:
            Natural language response about the recipe
        """
        try:
            # Prepare recipe information
            recipe_name = recipe_data.get('name', 'Unknown recipe')
            ingredients = recipe_data.get('ingredients', [])
            steps = recipe_data.get('steps', [])

            # Format the ingredients and steps for the LLM
            ingredients_text = "\n".join([f"- {ingredient}" for ingredient in ingredients])
            steps_text = "\n".join([f"{i+1}. {step}" for i, step in enumerate(steps)])

            # Create a prompt for the LLM
            prompt = f"""
            Please help me respond to a user who asked: "{user_query}"
            
            I want to recommend this recipe:
            
            Recipe Name: {recipe_name}
            
            Ingredients:
            {ingredients_text}
            
            Instructions:
            {steps_text}
            
            Please generate a friendly, helpful response that:
            1. Acknowledges their query about the ingredients they have
            2. Recommends this recipe and explains why it's a good match
            3. Briefly mentions the main ingredients and preparation method
            4. Offers a short cooking tip related to this recipe
            
            Keep your response concise and conversational.
            """

            # Use OpenAI API to generate a response
            response = client.chat.completions.create(model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful cooking assistant."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=300)

            return response.choices[0].message.content.strip()

        except Exception as e:
            print(f"Error generating recipe response: {e}")

            # Fallback to a templated response
            return f"""
            Based on your ingredients, I recommend {recipe_data.get('name', 'this recipe')}.
            
            It requires {len(recipe_data.get('ingredients', []))} ingredients and takes about {recipe_data.get('minutes', 'some')} minutes to prepare.
            
            Would you like to see the full recipe?
            """ 