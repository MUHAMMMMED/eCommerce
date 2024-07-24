 
from django.urls import path
from .views import *

urlpatterns = [
    path('list/', HomeListView.as_view(), name='home-list-view'),
    path('group-list/', GroupProductListView.as_view(), name='group-list-view'),
    path('deal-list/', DealListView.as_view(), name='deal-list-view'),


    path('info-list/', InfoView.as_view(), name='info-list'),


    path('info/', InfoListView.as_view(), name='info'),
    path('info/<int:pk>/', InfoListView.as_view(), name='info_detail'),

    path('deals/', DealView.as_view(), name='deal-list'),
    path('deals/<int:pk>/', DealView.as_view(), name='deal-detail'),

    path('questions/', QuestionsGeneralView.as_view(), name='questions'),
    path('questions/<int:pk>/', QuestionsGeneralView.as_view(), name='questions-detail'),
   
    path('slide/', SlideView.as_view(), name='slide'),
    path('slide/<int:pk>/', SlideView.as_view(), name='slide-detail'),
  
    path('card/', CardView.as_view(), name='card'),
    path('card/<int:pk>/', CardView.as_view(), name='card-detail'),

    path('best/', BestSellersView.as_view(), name='best'),
    path('best/<int:pk>/', BestSellersView.as_view(), name='best-detail'),

    path('group/', GroupView.as_view(), name='group'),
    path('group/<int:pk>/', GroupView.as_view(), name='group-detail'),
    
 
     
     
     
 
    
 ]