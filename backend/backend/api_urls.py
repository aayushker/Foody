from django.urls import path, include


urlpatterns = [
    path('', include('recipes.urls')),
    path('', include('SMTP.urls')),
    path('', include('userAuth.urls')),
    path('', include('recipe_recommendation.urls')),
]