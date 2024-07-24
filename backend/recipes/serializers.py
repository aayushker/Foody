from rest_framework import serializers
from .models import Recipe, Ingredient, Instruction, NutritionalInfo, Comment, Image

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = '__all__'

class InstructionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instruction
        fields = '__all__'

class NutritionalInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = NutritionalInfo
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class RecipeSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True)
    instructions = InstructionSerializer(many=True)
    nutritional_info = NutritionalInfoSerializer()
    comments = CommentSerializer(many=True)
    images = ImageSerializer(many=True)

    class Meta:
        model = Recipe
        fields = '__all__'

    def create(self, validated_data):
        ingredients_data = validated_data.pop('ingredients')
        instructions_data = validated_data.pop('instructions')
        nutritional_info_data = validated_data.pop('nutritional_info')
        images_data = validated_data.pop('images')
        recipe = Recipe.objects.create(**validated_data)
        for ingredient_data in ingredients_data:
            Ingredient.objects.create(recipe=recipe, **ingredient_data)
        for instruction_data in instructions_data:
            Instruction.objects.create(recipe=recipe, **instruction_data)
        NutritionalInfo.objects.create(recipe=recipe, **nutritional_info_data)
        for image_data in images_data:
            Image.objects.create(recipe=recipe, **image_data)
        return recipe
