from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from .models import *
 

 
 
class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=155, min_length=6)
    password = serializers.CharField(max_length=68, write_only=True)
    full_name = serializers.CharField(max_length=255, read_only=True)
    access_token = serializers.CharField(max_length=255, read_only=True)
    refresh_token = serializers.CharField(max_length=255, read_only=True)
    class Meta:
        model = UserAccount
        fields = ['email', 'password', 'full_name', 'access_token', 'refresh_token', ]

  

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        request = self.context.get('request')
        user = authenticate(request, email=email, password=password)
        if not user:
            raise AuthenticationFailed("Invalid credentials, try again")

        tokens = user.tokens()
        return {
            'email': user.email,
            'full_name': user.get_full_name(),
            'access_token': str(tokens.get('access')),
            'refresh_token': str(tokens.get('refresh')),
        }
     
    
class LogoutUserSerializer(serializers.Serializer):
    refresh_token=serializers.CharField()

    default_error_message = {'bad_token': ('Token is expired or invalid')   }
        
    def validate(self, attrs):
        self.token = attrs.get('refresh_token')

        return attrs

    def save(self, **kwargs):
        try:
            token=RefreshToken(self.token)
            token.blacklist()
        except TokenError:
            return self.fail('bad_token')

    

    
    
