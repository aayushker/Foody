from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Recipe, Ingredient, Instruction, NutritionalInfo, Comment, Image

@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at', 'updated_at', 'likes', 'ratings')
    search_fields = ('name', 'tags', 'difficulty', 'cuisine')

@admin.register(Ingredient)
class IngredientAdmin(admin.ModelAdmin):
    list_display = ('ingredient', 'quantity', 'unit', 'recipe')

@admin.register(Instruction)
class InstructionAdmin(admin.ModelAdmin):
    list_display = ('step', 'recipe')

@admin.register(NutritionalInfo)
class NutritionalInfoAdmin(admin.ModelAdmin):
    list_display = ('recipe', 'calories', 'protein', 'fat', 'carbohydrates')

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('user', 'recipe', 'created_at')

@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    list_display = ('recipe', 'image')
