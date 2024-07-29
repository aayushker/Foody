from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField()
    full_name = models.CharField(max_length=255, default='chef')
    profile_image = models.ImageField(upload_to='profile_images/', blank=True, null=True)
    number_of_recipes = models.IntegerField(default=0)
    followers = models.ManyToManyField(User, related_name='following', blank=True)

    def __str__(self):
        return self.user.username