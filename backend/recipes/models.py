from django.db import models
from django.contrib.auth.models import User

class Recipe(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='recipes')
    name = models.CharField(max_length=255)
    description = models.TextField()
    total_time = models.IntegerField()
    total_calories = models.IntegerField()
    servings = models.IntegerField()
    tags = models.CharField(max_length=255)
    difficulty = models.CharField(max_length=50)
    cuisine = models.CharField(max_length=50)
    main_image = models.ImageField(upload_to='recipe_images/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    likes = models.IntegerField(default=0)
    ratings = models.FloatField(default=0.0)

    def __str__(self):
        return self.name

class Ingredient(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='ingredients')
    quantity = models.CharField(max_length=50)
    unit = models.CharField(max_length=50)
    ingredient = models.CharField(max_length=255)
    notes = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.ingredient

class Instruction(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='instructions')
    step = models.TextField()

    def __str__(self):
        return f"Step for {self.recipe.name}"

class NutritionalInfo(models.Model):
    recipe = models.OneToOneField(Recipe, on_delete=models.CASCADE, related_name='nutritional_info')
    calories = models.IntegerField()
    protein = models.IntegerField()
    fat = models.IntegerField()
    carbohydrates = models.IntegerField()

    def __str__(self):
        return f"Nutritional Info for {self.recipe.name}"

class Comment(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.user.username} on {self.recipe.name}"

class Image(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='recipe_images/')
    
    def __str__(self):
        return f"Image for {self.recipe.name}"
