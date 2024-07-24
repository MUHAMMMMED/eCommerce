from django.urls import path
from . import views 
 
urlpatterns = [
 
     path('notification_packages/', views.NotificationPackageView.as_view(), name='notification_packages'),

     path('expense/', views.ExpenseListView.as_view(), name='expense'),
     path('purchase/', views.PurchaseListView.as_view(), name='purchase'),
     path('package/', views.PackageListView.as_view(), name='package'),

    path('packages/', views.PackageAPIView.as_view(), name='package-list-create'),
    path('packages/<int:pk>/', views.PackageAPIView.as_view(), name='package-detail'),

    path('expenses/', views.ExpenseAPIView.as_view(), name='expense-list'),
    path('expenses/<int:pk>/', views.ExpenseAPIView.as_view(), name='expense-detail'),
 
    path('purchases/', views.PurchaseAPIView.as_view(), name='purchase-list'),
    path('purchases/<int:pk>/', views.PurchaseAPIView.as_view(), name='purchase-detail'),
 
    path('ad_budget/', views.MonthlyAdBudgetView.as_view(), name='ad_budget-list'),
    path('ad_budget/<int:pk>/', views.MonthlyAdBudgetView.as_view(), name='ad_budget-detail'),
 


 





]

 