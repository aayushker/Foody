from django.shortcuts import render
from rest_framework import generics
from .models import Recipe
from .serializers import RecipeSerializer

# Create your views here.

class TopRecipesOfWeek(generics.ListAPIView):
    queryset = Recipe.objects.order_by('-likes')[:10]
    serializer_class = RecipeSerializer
