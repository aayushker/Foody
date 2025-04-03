from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from .models import Recipe, Image
from .serializers import RecipeSerializer, AllRecipeSerializer
from cloudinary_config import upload_image


class AddRecipeView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        # Handle main image upload if provided
        main_image_url = None
        if 'main_image' in request.FILES:
            main_image_file = request.FILES['main_image']
            main_image_url = upload_image(main_image_file)
            if main_image_url:
                request.data['main_image'] = main_image_url
        
        # Handle additional images if provided
        additional_images = []
        if 'additional_images' in request.FILES:
            for image_file in request.FILES.getlist('additional_images'):
                image_url = upload_image(image_file)
                if image_url:
                    additional_images.append(image_url)
        
        # Create the recipe
        serializer = RecipeSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            recipe = serializer.save(user=request.user)
            
            # Add additional images to the recipe
            for image_url in additional_images:
                Image.objects.create(recipe=recipe, image=image_url)
            
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


class AllRecipeListView(generics.ListAPIView):
    serializer_class = AllRecipeSerializer

    def get_queryset(self):
        return Recipe.objects.all()


class UploadImageView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        if 'image' not in request.FILES:
            return Response({'error': 'No image file provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        image_file = request.FILES['image']
        recipe_id = request.data.get('recipe_id')
        
        # Upload to Cloudinary
        cloudinary_url = upload_image(image_file)
        
        if not cloudinary_url:
            return Response({'error': 'Failed to upload image'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        # If recipe_id is provided, associate the image with the recipe
        if recipe_id:
            try:
                recipe = Recipe.objects.get(id=recipe_id, user=request.user)
                image = Image.objects.create(recipe=recipe, image=cloudinary_url)
                return Response({
                    'url': cloudinary_url,
                    'id': image.id
                }, status=status.HTTP_201_CREATED)
            except Recipe.DoesNotExist:
                return Response({'error': 'Recipe not found'}, status=status.HTTP_404_NOT_FOUND)
        
        # If no recipe_id, just return the URL
        return Response({
            'url': cloudinary_url
        }, status=status.HTTP_201_CREATED)