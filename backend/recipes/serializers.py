from rest_framework import serializers
from .models import Recipe, Ingredient, Instruction, NutritionalInfo

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['quantity', 'unit', 'ingredient', 'notes']

class InstructionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instruction
        fields = ['step']

class NutritionalInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = NutritionalInfo
        fields = ['calories', 'protein', 'fat', 'carbohydrates']

class RecipeSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True)
    instructions = serializers.CharField()
    nutritional_info = NutritionalInfoSerializer()

    class Meta:
        model = Recipe
        fields = ['name', 'description', 'total_time', 'total_calories', 'servings', 'tags', 'difficulty', 'cuisine', 'ingredients', 'instructions', 'nutritional_info']

    def create(self, validated_data):
        ingredients_data = validated_data.pop('ingredients')
        instructions_data = validated_data.pop('instructions')
        nutritional_info_data = validated_data.pop('nutritional_info')

        # Use a dummy user ID for now
        user = validated_data.pop('user', 1)  # Replace '1' with your dummy user ID

        recipe = Recipe.objects.create(user_id=user, **validated_data)  # Use user_id here

        # Add ingredients
        for ingredient_data in ingredients_data:
            Ingredient.objects.create(recipe=recipe, **ingredient_data)

        # Convert instructions string to a list and add instructions
        for step in instructions_data.split('\n'):
            Instruction.objects.create(recipe=recipe, step=step.strip())

        # Add nutritional info
        NutritionalInfo.objects.create(recipe=recipe, **nutritional_info_data)

        return recipe
