# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from django.conf import settings
# from django.conf.urls.static import static
# from django.urls import path
# from .views import AddRecipeView
# # from .views import (
# #     RecipeViewSet,
# #     IngredientViewSet,
# #     InstructionViewSet,
# #     NutritionalInfoViewSet,
# #     AddRecipeView
# # )

# # Create a router and register our viewsets with it.
# # router = DefaultRouter()
# # router.register(r'recipes', RecipeViewSet)
# # router.register(r'ingredients', IngredientViewSet)
# # router.register(r'instructions', InstructionViewSet)
# # router.register(r'nutritionalinfo', NutritionalInfoViewSet)

# urlpatterns = [
#     # Your other URLs here
#     # path('', include(router.urls)),
#     path('addRecipe/', AddRecipeView.as_view(), name='addRecipe'),
# ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

from django.urls import path
from .views import AddRecipeView, UserRecipeListView, RecipeUpdateView, AllRecipeListView

urlpatterns = [
    path('addRecipe/', AddRecipeView.as_view(), name='add-recipe'),
    path('user/recipes/', UserRecipeListView.as_view(), name='user-recipes'),
    path('user/recipe/<int:pk>/', RecipeUpdateView.as_view(), name='recipe-detail'),
    path('recipes/', AllRecipeListView.as_view(), name='all-recipes'),
]

