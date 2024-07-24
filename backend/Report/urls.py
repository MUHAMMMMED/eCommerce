from django.urls import path
from . import views 
 
urlpatterns = [
  
    path('',  views.Report.as_view()),
    path('country/',  views.CountryList.as_view()),
    path('region/',  views.RegionList.as_view()),


 ]