from django.db import models
from django.contrib.auth.models import User

class RecipeQuery(models.Model):
    """Model to store user recipe queries."""
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    query_text = models.TextField()
    ingredients = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.query_text

class RecipeRecommendation(models.Model):
    """Model to store recipe recommendations."""
    query = models.ForeignKey(RecipeQuery, on_delete=models.CASCADE, related_name='recommendations')
    recipe_id = models.IntegerField()
    recipe_name = models.CharField(max_length=255)
    similarity_score = models.FloatField()
    ingredient_match = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.recipe_name} (Match: {self.ingredient_match:.1f}%)"

class UserFeedback(models.Model):
    """Model to store user feedback on recipe recommendations."""
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    recommendation = models.ForeignKey(RecipeRecommendation, on_delete=models.CASCADE)
    liked = models.BooleanField(null=True, blank=True)
    tried = models.BooleanField(default=False)
    comment = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('user', 'recommendation')
    
    def __str__(self):
        return f"Feedback from {self.user.username} on {self.recommendation.recipe_name}"
