from django.urls import path
from . import views 
  
urlpatterns = [ 
  
    path('shipping-companies/', views.ShippingCompanyListCreateAPIView.as_view(), name='shipping-companies-list-create'),
    path('shipping-countries/', views.ShippingCountryListCreateAPIView.as_view(), name='shipping-countries-list-create'),

    path('shipping-company/<int:id>/', views.Shipping_CompanyAPIView.as_view(), name='shipping-Company'),
    path('shipping/<int:id>/', views.ShippingAPIView.as_view(), name='shipping'),

    path('orders/', views.OrderAPIView.as_view()),
    path('order/<int:pk>/',  views.OrderAPIView.as_view() ),
 
    path('order_list/', views.OrderList.as_view()),
    path('order-detail/<int:pk>/', views.OrderDetail.as_view(), name='order-detail'),
    path('status/<int:pk>/', views.UpdateStatus.as_view(), name='update-order-status'),
    path('anticipation/<int:pk>/', views.UpdateAnticipation.as_view(), name='update-order-anticipation'),
    path('package/<int:pk>/', views.UpdatePackage.as_view(), name='update-order-package_type'),

    path('tracking/', views.TrackingOrderList.as_view(), name='tracking'),
 
    path('customers/', views.CustomerListView.as_view(), name='customer-list'),

    path('report/', views.Report.as_view()),
  
    path('Customers/',views.CustomerAPIView.as_view(), name='Customer-list'),
    path('Customers/<int:pk>/', views.CustomerAPIView.as_view(), name='Customer-detail'),
 
    path('shipping_company_list/', views.Shipping_CompanyListView.as_view(), name='shipping_company-list'),
    path('shipping_company/',views.Shipping_CompanyView.as_view(), name='shipping_company'),
    path('shipping_company/<int:pk>/', views.Shipping_CompanyView.as_view(), name='shipping_company'),
 
    path('shipping_country_list/', views.Shipping_CountryListView.as_view(), name='shipping_country_list'),
    path('shipping_country/',views.Shipping_CountryView.as_view(), name='shipping_country'),
    path('shipping_country/<int:pk>/', views.Shipping_CountryView.as_view(), name='shipping_country'),
 
    path('shipping_country/<int:pk>/company/', views.Shipping_Company_in_CountryView.as_view(), name='shipping_company_in_country'),

    path('shipping_balance/',views.ShippingBalanceView.as_view(), name='shipping_balance'),
    path('shipping_balance/<int:pk>/', views.ShippingBalanceView.as_view(), name='shipping_balance'),
 
    path('invoice/',views.InvoiceList.as_view(), name='invoice-list'),
    path('invoice/<int:pk>/', views.InvoiceDetail.as_view(), name='invoice'),

 
 



 
 

]