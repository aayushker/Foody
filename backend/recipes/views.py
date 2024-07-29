from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Recipe
from .serializers import RecipeSerializer


class AddRecipeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = RecipeSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=request.user) 
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserRecipeListView(generics.ListAPIView):
    serializer_class = RecipeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Recipe.objects.filter(user=self.request.user)
    
    
class RecipeUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            recipe = Recipe.objects.get(id=kwargs['pk'], user=request.user)
        except Recipe.DoesNotExist:
            return Response({'message': 'Recipe not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = RecipeSerializer(recipe)
        return Response(serializer.data)

    def put(self, request, *args, **kwargs):
        try:
            recipe = Recipe.objects.get(id=kwargs['pk'], user=request.user)
        except Recipe.DoesNotExist:
            return Response({'message': 'Recipe not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = RecipeSerializer(recipe, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        try:
            recipe = Recipe.objects.get(id=kwargs['pk'], user=request.user)
        except Recipe.DoesNotExist:
            return Response({'message': 'Recipe not found'}, status=status.HTTP_404_NOT_FOUND)
        recipe.delete()
        return Response({'message': 'Recipe deleted successfully'}, status=status.HTTP_204_NO_CONTENT)