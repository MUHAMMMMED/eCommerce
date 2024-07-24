
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.http import Http404
from .models import *
from .serializers import  *
from django.db.models import Count
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated


 
class ProductListView(APIView):
    def get(self, request,  *args, **kwargs):
        query = request.query_params.get('query')
        category_id = request.query_params.get('category')
        # Filter products based on the 'is_active' field
        queryset = Product.objects.filter(is_active=True)

        # Apply 'name__icontains' filter if 'query' parameter is provided
        if query:
            queryset = queryset.filter(name__icontains=query)
        
        # Apply 'category_id' filter if 'category' parameter is provided
        if category_id:
            queryset = queryset.filter(category_id=category_id)

        # Serialize the queryset
        serializer = ProductList_Serializer(queryset, many=True)
        return Response(serializer.data)

    




 
class CategoryListView(APIView):
    def get(self, request, pk, *args, **kwargs):
        # Retrieve the specific category
        query = request.query_params.get('query')
        category = get_object_or_404(Category, pk=pk)
        cat_serializer = CategorySerializer(category)
        
        # Get products for the specific category
        products = Product.objects.filter(category_id=pk)

        # Filter products based on the 'is_active' field and optionally 'name__icontains'
        if query:
            products = products.filter(is_active=True, name__icontains=query)
        else:
            products = products.filter(is_active=True)

        product_serializer = ProductList_Serializer(products, many=True)
        
        data = {
            'categories': cat_serializer.data,
            'products': product_serializer.data,
        }
        
        return Response(data, status=status.HTTP_200_OK)

 


 


class ProductDetailView(APIView):
 
    def get_object(self, pk):
        try:
            return Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        product = self.get_object(pk)
        more_info = MoreInfo.objects.filter(product=pk)
        image_product = Image_Product.objects.filter(product=pk)
        freq = FrequentlyAsked.objects.filter(product=pk)
        rate = Rate.objects.filter(product=pk)

        # Products in the same category
        related_products = Product.objects.filter(category_id=product.category.id)

        # Find the most frequent rate_number
        most_frequent_rate = rate.values('rate_number').annotate(rate_count=Count('rate_number')).order_by('-rate_count').first()
        most_frequent_rate_number = most_frequent_rate['rate_number'] if most_frequent_rate else None

        rate_count = rate.count()

        # Serializing data
        serializer = ProductSerializer(product)
        moreInfo_Serializer = MoreInfoSerializer(more_info, many=True)
        image_produc_Serializer = Image_ProductSerializer(image_product, many=True)
        freq_Serializer = FrequentlyAsked_Serializer(freq, many=True)
        rate_Serializer = RateSerializer(rate, many=True)
        products_Serializer = ProductSerializer(related_products, many=True)
 
        data = serializer.data
        data['more_info'] = moreInfo_Serializer.data
        data['image_product'] = image_produc_Serializer.data
        data['freq'] = freq_Serializer.data
        data['rate'] = rate_Serializer.data
        data['products'] = products_Serializer.data
        data['rate_count'] = rate_count
        data['most_frequent_rate_number'] = most_frequent_rate_number

        return Response(data)

  



class categoriesListView(APIView):
    def get(self, request):
        queryset = Category.objects.all()
        categories_count = queryset.count()
        serializer = CategorySerializer(queryset, many=True)
        data = {
            'categories': serializer.data,
            'categories_count': categories_count
        }
        return Response(data, status=status.HTTP_200_OK)
   
  
class CategoryView(APIView):
    permission_classes = [IsAuthenticated]     

    def post(self, request, format=None):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk, format=None):
        category = get_object_or_404(Category, pk=pk)
        serializer = CategorySerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        category = get_object_or_404(Category, pk=pk)
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)




class NotificationProductView(APIView):
    permission_classes = [IsAuthenticated]  

    def get(self, request, *args, **kwargs):
        # Filter active products
        active_products = Product.objects.filter(is_active=True)
        # Check stock numbers against stock alarm values
        products_below_stock_alarm = [product for product in active_products if product.stock_no <=  product.stock_alarm]
        # Serialize the data
        serializer = ProductSerializer(products_below_stock_alarm, many=True)
        # Return the serialized data
        return Response(serializer.data)

 
 

class  DashProductListView(APIView):
    permission_classes = [IsAuthenticated]  

    def get(self, request):
        category_id = request.query_params.get('category')
        
        if category_id:
            queryset = Product.objects.filter(category_id=category_id)
        else:
            queryset = Product.objects.all()

        # Calculate aggregates
        product_count = queryset.count()
        serializer = ProductDash_Serializer(queryset, many=True)

        return Response({
            'products': serializer.data,
            'product_count': product_count,
        }, status=200)



     







  
class ProductCreate_UpdateAPIView(APIView):
    permission_classes = [IsAuthenticated]     

    def get(self, request, pk):
        print('pk',pk)
        try:
            product = Product.objects.get(pk=pk)
            serializer = Product_Serializer(product)
            more_info = MoreInfo.objects.filter(product=pk)
            image_product = Image_Product.objects.filter(product=pk)
            freq = FrequentlyAsked.objects.filter(product=pk)
            rate = Rate.objects.filter(product=pk)
 
            # Serializing data
            serializer = ProductSerializer(product)
            moreInfo_Serializer = MoreInfoSerializer(more_info, many=True)
            image_produc_Serializer = Image_ProductSerializer(image_product, many=True)
            freq_Serializer = FrequentlyAsked_Serializer(freq, many=True)
            rate_Serializer = RateSerializer(rate, many=True)
            data = serializer.data
            data['more_info'] = moreInfo_Serializer.data
            data['image_product'] = image_produc_Serializer.data
            data['freq'] = freq_Serializer.data
            data['rate'] = rate_Serializer.data
  
            return Response(data, status=status.HTTP_200_OK)
        except Product.DoesNotExist:
            return Response({'error': 'Product does not exist'}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        serializer = Product_Serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            return Response({'error': 'Product does not exist'}, status=status.HTTP_404_NOT_FOUND)

        serializer = Product_Serializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
   
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            return Response({'error': 'Product does not exist'}, status=status.HTTP_404_NOT_FOUND)

        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

 
class ImageProductList(APIView):
    permission_classes = [IsAuthenticated]     

    def get(self, request, product_id):
        try:
            product = Product.objects.get(id=product_id)
            image_products = product.images.all()
            serializer = Image_ProductSerializer(image_products, many=True)
            return Response(serializer.data)
        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, product_id):
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

        image = request.data.get('image')
        serializer = Image_ProductSerializer(data={'image': image})
        if serializer.is_valid():
            image_product = serializer.save()
            product.images.add(image_product)
            product.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 

class ImageProductDetail(APIView):
    permission_classes = [IsAuthenticated]     

    def get_object(self, pk):
        try:
            return Image_Product.objects.get(pk=pk)
        except Image_Product.DoesNotExist:
            raise Http404
    
    def get(self, request, pk):
        image_product = self.get_object(pk)
        serializer = Image_ProductSerializer(image_product)
        return Response(serializer.data)
    
    def put(self, request, pk):
        image_product = self.get_object(pk)
        serializer = Image_ProductSerializer(image_product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        image_product = self.get_object(pk)
        image_product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)







 
class MoreInfoView(APIView):
    permission_classes = [IsAuthenticated]     

    def post(self, request):
        serializer = MoreInfoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            more_info = MoreInfo.objects.get(pk=pk)
        except MoreInfo.DoesNotExist:
            return Response({'error': 'MoreInfo not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = MoreInfoSerializer(more_info, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            more_info = MoreInfo.objects.get(pk=pk)
        except MoreInfo.DoesNotExist:
            return Response({'error': 'MoreInfo not found'}, status=status.HTTP_404_NOT_FOUND)
        more_info.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)




 
class FrequentlyAskedView(APIView):
    permission_classes = [IsAuthenticated]     

    def post(self, request):
        serializer = FrequentlyAsked_Serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            faq = FrequentlyAsked.objects.get(pk=pk)
        except FrequentlyAsked.DoesNotExist:
            return Response({'error': 'FrequentlyAsked not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = FrequentlyAsked_Serializer(faq, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            faq = FrequentlyAsked.objects.get(pk=pk)
        except FrequentlyAsked.DoesNotExist:
            return Response({'error': 'FrequentlyAsked not found'}, status=status.HTTP_404_NOT_FOUND)

        faq.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

 
class CouponView(APIView):
    permission_classes = [IsAuthenticated]     
    def get(self, request):
        queryset = Coupon.objects.all()
        coupon_count = queryset.count()
        serializer = CouponSerializer(queryset, many=True)
        data = {
            'coupon': serializer.data,
            'coupon_count': coupon_count
        }
        return Response(data, status=status.HTTP_200_OK)
    def post(self, request):
        serializer = CouponSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            coupon = Coupon.objects.get(pk=pk)
        except Coupon.DoesNotExist:
            return Response({'error': 'Coupon not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = CouponSerializer(coupon, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            coupon = Coupon.objects.get(pk=pk)
        except Coupon.DoesNotExist:
            return Response({'error': 'Coupon not found'}, status=status.HTTP_404_NOT_FOUND)

        coupon.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


 

class RateView(APIView):
    permission_classes = [IsAuthenticated]     

    def get(self, request):
        queryset = Rate.objects.all()
        deal_count = queryset.count()
        serializer = RateSerializer(queryset, many=True)
        data = {
            'rate': serializer.data,
            'rate_count': deal_count
        }
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = RateـSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            deal = Rate.objects.get(pk=pk)
        except Rate.DoesNotExist:
            return Response({'error': 'Deal not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = RateـSerializer(deal, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            deal = Rate.objects.get(pk=pk)
        except Rate.DoesNotExist:
            return Response({'error': 'Rate not found'}, status=status.HTTP_404_NOT_FOUND)

        deal.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

