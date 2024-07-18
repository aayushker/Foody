from django.urls import path
from .views import TopRecipesOfWeek

urlpatterns = [
    path('topRecipes/', TopRecipesOfWeek.as_view(), name='topRecipes'),
]
