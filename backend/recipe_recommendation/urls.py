from django.urls import path
from .views import (
    RecipeQueryView,
    IngredientSearchView,
    UserFeedbackView,
    RecipeDetailView
)

urlpatterns = [
    path('recipe-search/query/', RecipeQueryView.as_view(), name='recipe-query'),
    path('recipe-search/ingredients/', IngredientSearchView.as_view(), name='ingredient-search'),
    path('recipe-search/feedback/<int:recommendation_id>/', UserFeedbackView.as_view(), name='recipe-feedback'),
    path('recipe-search/detail/<int:recipe_id>/', RecipeDetailView.as_view(), name='recipe-detail'),
] 