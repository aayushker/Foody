from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import RecipeViewSet, IngredientViewSet, InstructionViewSet, NutritionalInfoViewSet, CommentViewSet

router = DefaultRouter()
router.register(r'recipes', RecipeViewSet)
router.register(r'ingredients', IngredientViewSet)
router.register(r'instructions', InstructionViewSet)
router.register(r'nutritional-info', NutritionalInfoViewSet)
router.register(r'comments', CommentViewSet)

urlpatterns = [
    path('addRecipe/', include(router.urls)),
]
