from django.shortcuts import render
from rest_framework import viewsets
from .models import Recipe, Ingredient, Instruction, NutritionalInfo, Comment
from .serializers import RecipeSerializer, IngredientSerializer, InstructionSerializer, NutritionalInfoSerializer, CommentSerializer

# Create your views here.
class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer

class InstructionViewSet(viewsets.ModelViewSet):
    queryset = Instruction.objects.all()
    serializer_class = InstructionSerializer

class NutritionalInfoViewSet(viewsets.ModelViewSet):
    queryset = NutritionalInfo.objects.all()
    serializer_class = NutritionalInfoSerializer

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
