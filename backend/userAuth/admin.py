from django.contrib import admin
from django.contrib import admin
from .models import Profile

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'bio', 'full_name', 'profile_image', 'number_of_recipes')