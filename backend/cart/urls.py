from django.urls import path
from .views import  *
urlpatterns = [
 
    path('add/', AddToCartView.as_view(), name='add_to_cart'),
 
    path('cart/', CartDetailView.as_view(), name='cart_detail'),
    path('update_total/', UpdateTotalView.as_view(), name='update_total'),

    path('delete-cart-item/<int:id>/', DeleteCartItemView.as_view(), name='delete_cart_item'),
    path('update_quantity/<int:id>/', UpdateQuantityCartItemView.as_view(), name='update_quantity'),
  
    path('note/create/<int:id>/', NoteCreateView.as_view(), name='note-create'),
    path('notes/<int:pk>/', NoteUpdateView.as_view(), name='note-update'),

    path('coupon/apply/', ApplyCouponView.as_view(), name='apply_coupon'),
  
    path('note-list/', NoteListDeleteAPIView.as_view(), name='note-list'),
    path('note-delete/<int:pk>/', NoteListDeleteAPIView.as_view(), name='note-delete'),
 
 
]

 