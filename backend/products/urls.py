from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.ProductListView.as_view(), name='product_list'),
    path('products/<int:pk>/', views.ProductDetailView.as_view(), name='product_detail'),
   
    path('categories_list/', views.categoriesListView.as_view(), name='category_list'),
    path('category/<int:pk>/', views.CategoryListView.as_view(), name='category_detail'),
   
    path('notification_products/', views.NotificationProductView.as_view(), name='notification_products'),
    path('product_list_dash/', views.DashProductListView.as_view(), name='product_list_dash'),

    path('categories/', views.CategoryView.as_view(), name='create_category'),
    path('categories/<int:pk>/', views.CategoryView.as_view(), name='update_delete_category'),

    path('product_create/', views.ProductCreate_UpdateAPIView.as_view(), name='product_create'),
    path('product_list_update_delete/<int:pk>/', views.ProductCreate_UpdateAPIView.as_view(), name='update_delete_product'),
 
    path('image_products/<int:product_id>/',  views.ImageProductList.as_view(), name='image_products'),
    path('image_product/<int:pk>/', views.ImageProductDetail.as_view(), name='image_product_detail'),

    path('more_info/', views.MoreInfoView.as_view(), name='moreinfo_create'),   
    path('more_info/<int:pk>/', views.MoreInfoView.as_view(), name='moreinfo_update_delete'), 
 
    path('faqs/', views.FrequentlyAskedView.as_view(), name='faq_create'),  
    path('faqs/<int:pk>/', views.FrequentlyAskedView.as_view(), name='faq_update_delete'),  
 
    path('coupon/', views.CouponView.as_view(), name='coupon_create'),  
    path('coupon/<int:pk>/', views.CouponView.as_view(), name='coupon_update_delete'),  

    path('rate/', views.RateView.as_view(), name='rate_create'),  
    path('rate/<int:pk>/', views.RateView.as_view(), name='rate_update_delete'),  





]

  
 