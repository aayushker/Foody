from django.urls import path
from .views import UserRegisterView, MyTokenObtainPairView, UserDetailView, ProfileUpdateView, UpdateUserCredentialsView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', UserRegisterView.as_view(), name='register'),
    path('user/', UserDetailView.as_view(), name='user-detail'),
    path('user/profile/', ProfileUpdateView.as_view(), name='profile-update'),
    path('user/credentials/', UpdateUserCredentialsView.as_view(), name='update-credentials'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]