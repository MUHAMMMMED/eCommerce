from django.urls import path
from .views import  *


urlpatterns = [
 
    path('create-checkout-session/', create_checkout_session),
    path('stripe_webhook', stripe_webhook, name='stripe-webhook'),

]
 