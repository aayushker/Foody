from rest_framework import serializers
from .models import Recipe, Ingredient, Instruction, NutritionalInfo, Image
from django.contrib.auth.models import User

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

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['id', 'image']

class RecipeSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True)
    instructions = serializers.CharField()
    nutritional_info = NutritionalInfoSerializer()
    images = ImageSerializer(many=True, read_only=True)

    class Meta:
        model = Recipe
        fields = [
            'id',
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
            'main_image',
            'images',
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

    def update(self, instance, validated_data):
        ingredients_data = validated_data.pop('ingredients', None)
        instructions_data = validated_data.pop('instructions', None)
        nutritional_info_data = validated_data.pop('nutritional_info', None)

        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.total_time = validated_data.get('total_time', instance.total_time)
        instance.total_calories = validated_data.get('total_calories', instance.total_calories)
        instance.servings = validated_data.get('servings', instance.servings)
        instance.tags = validated_data.get('tags', instance.tags)
        instance.difficulty = validated_data.get('difficulty', instance.difficulty)
        instance.cuisine = validated_data.get('cuisine', instance.cuisine)
        instance.save()

        if ingredients_data:
            instance.ingredients.all().delete()
            for ingredient_data in ingredients_data:
                Ingredient.objects.create(recipe=instance, **ingredient_data)

        if instructions_data:
            instance.instructions.all().delete()
            Instruction.objects.create(recipe=instance, step=instructions_data.strip())

        if nutritional_info_data:
            instance.nutritional_info.delete()
            NutritionalInfo.objects.create(recipe=instance, **nutritional_info_data)

        return instance

class AllRecipeSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True)
    instructions = InstructionSerializer(many=True)
    nutritional_info = NutritionalInfoSerializer()
    images = ImageSerializer(many=True, read_only=True)
    username = serializers.SerializerMethodField()

    class Meta:
        model = Recipe
        fields = [
            'id',
            'user',
            'username',
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
            'main_image',
            'images',
        ]
        
    def get_username(self, obj):
        return obj.user.username
        