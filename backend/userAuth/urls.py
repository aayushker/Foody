from django.urls import path
from .views import UserRegisterView, ProfileView, MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('signup/', UserRegisterView.as_view(), name='register'),
    path('user/', ProfileView.as_view(), name='profile'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]