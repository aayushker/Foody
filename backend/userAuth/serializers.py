from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

class UserSerializer(serializers.ModelSerializer):
   class Meta:
       model = User
       fields = ('id', 'username','password', 'email', 'first_name', 'last_name')
       extra_kwargs = {'password': {'write_only': True, 'required': True}}
       
       def create(self, validated_data):
           user = User.objects.create_user(
                username=validated_data['username'],
                password=validated_data['password'],
                email=validated_data['email'],
                first_name=validated_data['first_name'],
                last_name=validated_data['last_name']
           )
           return user

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'profile_pic')