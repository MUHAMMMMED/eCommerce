from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from datetime import datetime
from orders.models import Order,Customers
from orders.serializers import Order_Serializer,CustomerSerializer
from .models import Cart, CartItem
from .serializers import *
from products.models import Product,Coupon
 

class AddToCartView(APIView):
    def post(self, request, *args, **kwargs):
        product_id = request.data.get('productId')
        quantity = request.data.get('quantity', 1)
        notes = request.data.get('notes')
        if not request.session.session_key:
            request.session.create()
        session_id = request.session.session_key
        product = get_object_or_404(Product, id=product_id)
        cart, created = Cart.objects.get_or_create(session_id=session_id)
        # Ensure quantity is set properly
        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        if created:
            cart_item.quantity = quantity
        else:
            cart_item.quantity += quantity
        cart_item.save()
        # Check if notes are provided and add them
        for note_text in notes:
                note, note_created = Note.objects.get_or_create(note=note_text)
                cart_item.notes.add(note)
        cart_item.save()
        return Response({"message": "Product added to cart"}, status=status.HTTP_200_OK)
 
 
 
     
class CartDetailView(APIView):
    def get(self, request, *args, **kwargs):
        session_id = request.session.session_key
        # Get or create a session ID if it doesn't exist
        if not session_id:
            request.session.create()
            session_id = request.session.session_key
        # Fetch the cart based on the session ID
        cart = get_object_or_404(Cart, session_id=session_id)

        cart_serializer = Cart_Serializer(cart)
        # Fetch the cart items
        cart_items = CartItem.objects.filter(cart=cart)
        # Count the number of items in the cart
        cart_items_count = cart_items.count()
        # Serialize the cart items
        serializer = CartItemSerializer(cart_items, many=True)

        total = 0
        cart_quantity = 0
        for item in cart_items:
            cart_quantity += item.quantity

            price1 = item.product.price1
            price2 = item.product.price2
            price3 = item.product.price3
            price4 = item.product.price4
            price5 = item.product.price5

            quantity1 = item.product.quantity1
            quantity2 = item.product.quantity2
            quantity3 = item.product.quantity3
            quantity4 = item.product.quantity4
            quantity5 = item.product.quantity5

            quantity = item.quantity

            if quantity <= quantity1:
                subtotal = price1 * quantity
            elif quantity <= quantity2:
                subtotal = price2 * quantity
            elif quantity <= quantity3:
                subtotal = price3 * quantity
            elif quantity <= quantity4:
                subtotal = price4 * quantity
            elif quantity <= quantity5:
                subtotal = price5 * quantity
            else:
                subtotal = price5 * quantity

            total += subtotal

        try:
            order = Order.objects.get(session_key=session_id)
        except Order.DoesNotExist:
            order = None

        if order:
            order_serializer = Order_Serializer(order)
            order_data = order_serializer.data
        else:
            order_data = None  # or some default value indicating no order

        try:
            customers = Customers.objects.get(session_key=session_id)
        except Customers.DoesNotExist:
            customers = None

        if customers:
            customers_serializer = CustomerSerializer(customers)
            customers_data = customers_serializer.data
        else:
            customers_data = None  # or some default value indicating no order
 
        # Construct the response data
        data = {
            'cart_data': cart_serializer.data,
            'cart_items': serializer.data,
            'cart_items_count': cart_items_count,
            'total': total,
            'cart_quantity': cart_quantity,
            'customers': customers_data,
            'order': order_data,
        }
        return Response(data, status=status.HTTP_200_OK)






 

class UpdateTotalView(APIView):
    def post(self, request, *args, **kwargs):
        # Retrieve the session key
        session_id = request.session.session_key
        total = request.data.get('total')
  
        # If no session key exists, create a new session
        if not session_id:
            request.session.create()
            session_id = request.session.session_key
        
        # Fetch the cart associated with the session ID
        cart = get_object_or_404(Cart, session_id=session_id)

        # Update the total if it's provided
        if total is not None:
            cart.total = total
            cart.save()

        return Response({'total': cart.total})





class UpdateQuantityCartItemView(APIView):
    def put(self, request, *args, **kwargs):
        cart_item_id = kwargs.get('id')
        quantity = request.data.get('quantity', 1)
        session_id = request.session.session_key

        if not session_id:
            return Response({"error": "Session not found"}, status=status.HTTP_400_BAD_REQUEST)
        cart_item = get_object_or_404(CartItem, id=cart_item_id)
        cart_item.quantity = quantity
        cart_item.save()

        return Response({"message": "Cart item updated"}, status=status.HTTP_200_OK)


 
 
class DeleteCartItemView(APIView):
    def delete(self, request, *args, **kwargs):
        cart_item_id = kwargs.get('id')   
        session_id = request.session.session_key
        if not session_id:
            return Response({"error": "Session not found"}, status=status.HTTP_400_BAD_REQUEST)
        cart_item = get_object_or_404(CartItem, id=cart_item_id)
        cart_item.delete()
        return Response({"message": "Cart item deleted"}, status=status.HTTP_200_OK)
 
 
class NoteCreateView(APIView):
    def post(self, request, id, format=None):
        try:
            cart_item = CartItem.objects.get(id=id)
        except CartItem.DoesNotExist:
            return Response({"error": "CartItem not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = NoteSerializer(data=request.data)
        if serializer.is_valid():
            note = serializer.save()
            cart_item.notes.add(note)
            cart_item.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 
 
class NoteUpdateView(APIView):
    def put(self, request, pk, format=None):
        try:
            note = Note.objects.get(pk=pk)
        except Note.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = NoteSerializer(note, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None):
        try:
            note = Note.objects.get(pk=pk)
        except Note.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        note.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

 

class ApplyCouponView(APIView):
    def post(self, request, *args, **kwargs):
        # Validate request data
        code = request.data.get('code')
        total = request.data.get('Total')
        if not (code and total):
            return Response({'valid': False, 'error': 'Coupon code and total amount are required.'}, status=400)
        try:
            coupon = Coupon.objects.get(code=code)
        except Coupon.DoesNotExist:
            return Response({'valid': False, 'error': 'Invalid coupon code.'}, status=400)
        
        # Check coupon validity
        today = datetime.today().date()
        if coupon.expiryDate < today or coupon.coupon_usage <= 0:
            return Response({'valid': False, 'error': 'Invalid or expired coupon code.'}, status=400)

        # Calculate discounted price
        discounted_price = max(0, float(total) - (float(total) * coupon.discount / 100))
        
        # Update coupon usage
        coupon.coupon_usage -= 1
        coupon.save()

        return Response({'valid': True, 'discounted_price': discounted_price}, status=status.HTTP_200_OK)

 
class NoteListDeleteAPIView(APIView):
    # permission_classes = [IsAuthenticated]  # Restrict access to authenticated users

    def get(self, request):
        notes = Note.objects.all()
        notes_count = notes.count()

        serializer = NoteSerializer(notes, many=True)

        data = {
            'notes': serializer.data,
            'notes_count': notes_count
        }

        return Response(data)

    def delete(self, request, pk):
        try:
            note = Note.objects.get(pk=pk)
        except Note.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        note.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
