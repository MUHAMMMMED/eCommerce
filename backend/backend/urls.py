from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/accounts/', include('accounts.urls')),
    path('api/products/', include('products.urls')),
    path('api/cart/', include('cart.urls')),
    path('api/orders/', include('orders.urls')),
    path('api/payment/', include('payment.urls')),
    # path('api/search/', include('search.urls')),
    path('api/home/', include('home.urls')),
    path('api/Report/', include('Report.urls')),
    # path('api/shipping/', include('shipping.urls')),
    path('api/accounting/', include('accounting.urls')),



    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
 