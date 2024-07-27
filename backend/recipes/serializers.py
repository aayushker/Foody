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
        fields = [
            'name', 
            'description', 
            'total_time', 
            'total_calories', 
            'servings', 
            'tags', 
            'difficulty', 
            'cuisine', 
            'ingredients', 
            'instructions', 
            'nutritional_info',
            # 'main_image',  #baad mai add karna hai
        ]

    def create(self, validated_data):
        ingredients_data = validated_data.pop('ingredients')
        instructions_data = validated_data.pop('instructions')
        nutritional_info_data = validated_data.pop('nutritional_info')
 
        user = validated_data.pop('user', None)
        recipe = Recipe.objects.create(user=user, **validated_data) 

        # Add ingredients
        for ingredient_data in ingredients_data:
            Ingredient.objects.create(recipe=recipe, **ingredient_data)

        # Add instructions
        Instruction.objects.create(recipe=recipe, step=instructions_data.strip())

        # Add nutritional info
        NutritionalInfo.objects.create(recipe=recipe, **nutritional_info_data)

        return recipe
