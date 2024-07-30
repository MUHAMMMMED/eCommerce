from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (TokenRefreshView,)
 
urlpatterns = [
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('login/', LoginUserView.as_view(), name='login-user'),
    path('logout/', LogoutApiView.as_view(), name='logout'),
 
 ]
 