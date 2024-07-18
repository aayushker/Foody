from django.urls import path
from .views import form

urlpatterns = [
    path('smtp/', form, name='smtp'),
]