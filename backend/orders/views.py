from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.permissions import IsAuthenticated
from decimal import Decimal
from collections import defaultdict
from django.http import Http404
from rest_framework.pagination import PageNumberPagination
from django.utils.dateparse import parse_date
from django.db.models import Sum, F
from django.shortcuts import  get_object_or_404
from datetime import datetime, timedelta
from ipware import get_client_ip
from ipapi import location as ipapi_location
import ipapi
import logging
from .serializers import  *
from .models import Order, OrderItem
from accounting.models import Package


class ShippingCompanyListCreateAPIView(APIView):
    def get(self, request):
        companies = Shipping_Company.objects.all()
        serializer = Shipping_CompanySerializer(companies, many=True)
        return Response(serializer.data)
  
class ShippingCountryListCreateAPIView(APIView):
    def get(self, request):
        countries = shipping_Country.objects.all()
        serializer = shipping_CountrySerializer(countries, many=True)
        return Response(serializer.data)
 
  
class ShippingAPIView(APIView):
    def get(self, request, *args, **kwargs):
        company_id = kwargs.get('id')   
        session_id = request.session.session_key
        try:
            company = Shipping_Company.objects.get(id=company_id)
            order = get_object_or_404(Order, session_key=session_id)
            shipping_price=company.shipping_price
            order.shipping=shipping_price
            order.save()
            return Response(status=status.HTTP_200_OK)
        except Shipping_Company.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
 
class Shipping_CompanyAPIView(APIView):
    def get(self, request, *args, **kwargs):
        country_id = kwargs.get('id')  
        session_id = request.session.session_key
        try:
            country = shipping_Country.objects.get(id=country_id)
            tax=country.tax
            order = get_object_or_404(Order, session_key=session_id)
            order.tax=tax
            order.save()
            serializer = shipping_CountrySerializer(country )
            return Response(serializer.data, status=status.HTTP_200_OK)
        except shipping_Country.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

  

logger = logging.getLogger(__name__)

def get_location_info(ip_address, session_key):
    try:
        location_info = ipapi_location(ip_address)
        if not location_info:
            logger.warning(f"No location info found for IP address: {ip_address}")
            return None
        
        # Fetch or create Country
        country_name = location_info.get('country_name')
        if country_name:
            dictionary, _ = Dictionary.objects.get_or_create(name=country_name)
            country, _ = Country.objects.get_or_create(dictionary=dictionary, session_key=session_key)
        
        # Fetch or create Region
        region_name = location_info.get('region')
        if region_name and country:
            dictionary, _ = Dictionary.objects.get_or_create(name=region_name)
            region, _ = Region.objects.get_or_create(dictionary=dictionary, country=country, session_key=session_key)
        else:
            region = None
        
        # Fetch or create City
        city_name = location_info.get('city')
        if city_name and region:
            dictionary, _ = Dictionary.objects.get_or_create(name=city_name)
            city, _ = City.objects.get_or_create(dictionary=dictionary, region=region, session_key=session_key)
        else:
            city = None

         
        return {
            'ip_address': ip_address,
            'country': country,
            'region': region,
            'city': city,
        }
        
    except ObjectDoesNotExist as e:
     pass
    return None
 
class TrackingOrderList(APIView):
    def get(self, request):
        tracking_filter = request.query_params.get('tracking')
        
        if not tracking_filter:
            return Response({"error": "Tracking parameter is missing"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            order = Order.objects.get(Tracking=tracking_filter)
            serializer = Order_Serializer(order)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Order.DoesNotExist:
            return Response({"error": f"Order with tracking number '{tracking_filter}' does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": f"Internal Server Error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

 
class OrderAPIView(APIView):
    def post(self, request):
        session_key = request.session.session_key

        if not session_key:
            return Response({'error': 'Session key not found'}, status=status.HTTP_400_BAD_REQUEST)

        # Fetch or create customer
        try:
            customer = Customers.objects.get(session_key=session_key)
        except Customers.DoesNotExist:
            customer_data = {'session_key': session_key}
            customer_serializer = Customer_Serializer(data=customer_data)
            if customer_serializer.is_valid():
                customer = customer_serializer.save()
            else:
                return Response(customer_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Placeholder IP address; replace with actual method to get IP
        ip_address = '41.235.33.189'  # Example IP address, replace with actual method
        if ip_address:
            try:
                get_location = get_location_info(ip_address, session_key)
                if get_location:
                    customer.IP_Address = get_location['ip_address']
                    customer.IP_country = get_location['country']
                    customer.IP_Region = get_location['region']
                    customer.IP_city = get_location['city']
                    customer.save()

            except Exception as e:
                pass  # Handle or log the exception as needed

        # Check if order exists, create or update accordingly
        try:
            order = Order.objects.get(session_key=session_key)
            order.total = request.data.get('total')
            order.save()
            serializer = Order_Serializer(order)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Order.DoesNotExist:
            data = {'session_key': session_key, 'total': request.data.get('total'), 'customer': customer.id}
            serializer = Order_Serializer(data=data)
            if serializer.is_valid():
                order = serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            order = Order.objects.get(pk=pk)
            session_id = request.session.session_key
            data = request.data.copy()
            data['session_key'] = session_id
            serializer = Order_Serializer(order, data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Order.DoesNotExist:
            return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)





 




class OrderList(APIView):
    permission_classes = [IsAuthenticated]  

    def get(self, request):
        status_filter = request.query_params.get('status')
        date_filter = request.query_params.get('date')

        orders = Order.objects.all().order_by('-created_at')

        # Apply status filter if provided
        if status_filter:
            orders = orders.filter(status=status_filter)

        # Apply date filter based on different options
        if date_filter == 'today':
            start_date = datetime.now().date()
            end_date = start_date + timedelta(days=1)
            orders = orders.filter(created_at__range=[start_date, end_date])
        elif date_filter == 'last3days':
            start_date = datetime.now().date() - timedelta(days=3)
            orders = orders.filter(created_at__gte=start_date)
        elif date_filter == 'thisweek':
            today = datetime.now().date()
            start_date = today - timedelta(days=today.weekday())
            orders = orders.filter(created_at__gte=start_date)
        elif date_filter == 'thismonth':
            today = datetime.now().date()
            start_date = today.replace(day=1)
            orders = orders.filter(created_at__gte=start_date)
        elif date_filter == 'last3months':
            today = datetime.now().date()
            start_date = today.replace(month=today.month - 3)
            orders = orders.filter(created_at__gte=start_date)
        elif date_filter == 'last6months':
            today = datetime.now().date()
            start_date = today.replace(month=today.month - 6)
            orders = orders.filter(created_at__gte=start_date)
        elif date_filter == 'thisyear':
            today = datetime.now().date()
            start_date = today.replace(month=1, day=1)
            orders = orders.filter(created_at__gte=start_date)
        elif date_filter == 'lastyear':
            today = datetime.now().date()
            start_date = today.replace(year=today.year - 1, month=1, day=1)
            end_date = today.replace(year=today.year - 1, month=12, day=31)
            orders = orders.filter(created_at__range=[start_date, end_date])

        orders_count = orders.count()
        serializer = OrderDashSerializer(orders, many=True)
        data={
            'orders': serializer.data,
            'orders_count': orders_count  }
        
        return Response(data, status=200)
   

 
class UpdateStatus(APIView):
    permission_classes = [IsAuthenticated]  

    def put(self, request, pk):
        status_param = request.query_params.get('status')
        if not status_param:
            return Response({"error": "Status parameter is missing"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            order = Order.objects.get(pk=pk)
        except Order.DoesNotExist:
            return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)

        order.status = status_param
        order.save()
        return Response({"message": "Status updated successfully"}, status=status.HTTP_200_OK)



 
class UpdateAnticipation(APIView):
    permission_classes = [IsAuthenticated]  

    def put(self, request, pk):
        anticipation_param = request.query_params.get('anticipation')
        if not anticipation_param:
            return Response({"error": "anticipation parameter is missing"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            order = Order.objects.get(pk=pk)
        except Order.DoesNotExist:
            return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)

        order.anticipation = anticipation_param
        order.save()
        return Response({"message": "anticipation updated successfully"}, status=status.HTTP_200_OK)


class UpdatePackage(APIView):
    permission_classes = [IsAuthenticated]  

    def put(self, request, pk):
        package_param = request.query_params.get('package')
     
        if not package_param:
            return Response({"error": "package parameter is missing"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            order = Order.objects.get(pk=pk)
        except Order.DoesNotExist:
            return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)

        try:
            package = Package.objects.get(pk=package_param)
        except Package.DoesNotExist:
            return Response({'error': 'Package not found'}, status=status.HTTP_404_NOT_FOUND)

        order.package = package
        order.save()
        return Response({"message": "Package updated successfully"}, status=status.HTTP_200_OK)






 
class OrderDetail(APIView):
    permission_classes = [IsAuthenticated]  

    def get(self, request, *args, **kwargs):
        order_id = kwargs.get('pk')
        
        try:
            order = Order.objects.get(id=order_id)
        except Order.DoesNotExist:
            return Response({"error": "Order not found"}, status=status.HTTP_404_NOT_FOUND)

        # Toggle the 'new' attribute of the order if it's True
        if order.new:
            order.new = False
            order.save()  # Save the order after updating

        # Fetching all order items related to the order
        order_items = OrderItem.objects.filter(order_id=order.id)
        
        # Count the number of items in the cart
        cart_items_count = order_items.count()

        # Calculate total quantity of items in the order
        cart_quantity = sum(item.quantity for item in order_items)

        # Serialize the order and order items
        serializer = OrderDashSerializer(order)
        order_item_serializer = OrderItemSerializer(order_items, many=True)
        
        # Construct response data
        data = serializer.data
        data['items'] = order_item_serializer.data
        data['cart_quantity'] = cart_quantity
        data['cart_items_count'] = cart_items_count

        return Response(data, status=status.HTTP_200_OK)

 
 

class Report(APIView):
    permission_classes = [IsAuthenticated]  # Restrict access to authenticated users

    def get(self, request):
        date_filter = request.query_params.get('date')  # Retrieve date filter from query parameters
        orders = Order.objects.all()  # Get all orders
       
        # Apply date filter based on different options
        if date_filter == 'today':
            start_date = datetime.now().date()
            end_date = start_date + timedelta(days=1)
            orders = orders.filter(created_at__range=[start_date, end_date])
          
        elif date_filter == 'last3days':
            start_date = datetime.now().date() - timedelta(days=3)
            orders = orders.filter(created_at__gte=start_date)
 

        elif date_filter == 'thisweek':
            today = datetime.now().date()
            start_date = today - timedelta(days=today.weekday())
            orders = orders.filter(created_at__gte=start_date)
 

        elif date_filter == 'thismonth':
            today = datetime.now().date()
            start_date = today.replace(day=1)
            orders = orders.filter(created_at__gte=start_date)
 

        elif date_filter == 'previousmonth':
            today = datetime.now().date()
            first_day_this_month = today.replace(day=1)
            last_day_last_month = first_day_this_month - timedelta(days=1)
            start_date = last_day_last_month.replace(day=1)
            end_date = last_day_last_month
            orders = orders.filter(created_at__range=[start_date, end_date])
 

        elif date_filter == 'last3months':
            today = datetime.now().date()
            start_date = (today.replace(day=1) - timedelta(days=90)).replace(day=1)
            orders = orders.filter(created_at__gte=start_date)
 

        elif date_filter == 'last6months':
            today = datetime.now().date()
            start_date = (today.replace(day=1) - timedelta(days=180)).replace(day=1)
            orders = orders.filter(created_at__gte=start_date)
 

        elif date_filter == 'thisyear':
            today = datetime.now().date()
            start_date = today.replace(month=1, day=1)
            orders = orders.filter(created_at__gte=start_date)
      

        elif date_filter == 'lastyear':
            today = datetime.now().date()
            start_date = today.replace(year=today.year - 1, month=1, day=1)
            end_date = today.replace(year=today.year - 1, month=12, day=31)
            orders = orders.filter(created_at__range=[start_date, end_date])
 

        # Count orders by status
        orders_count = orders.count()
        waiting = orders.filter(status='waiting').count()
        processing = orders.filter(status='processing').count()
        shipping_count = orders.filter(status='Shipping').count()
        done = orders.filter(status='done').count()
        cancel = orders.filter(status='cancel').count()
   
 
        return Response({
            'orders_count': orders_count,
            'waiting': waiting,
            'processing': processing,
            'Shipping': shipping_count,
            'done': done,
            'cancel': cancel,
 
        }, status=200)
 













 
class CustomerListView(APIView):
    permission_classes = [IsAuthenticated]  

    def get(self, request):
        phone = request.query_params.get('phone')
        start_date = request.query_params.get('createdAtStart')
        end_date = request.query_params.get('createdAtEnd')
        page = request.query_params.get('page', 1)
        page_size = request.query_params.get('page_size', 10)

        customer = Customers.objects.all()
        if phone:
            customer = customer.filter(phone=phone)

        if start_date and end_date:
            customer = customer.filter(created_at__range=[start_date, end_date])

        paginator = PageNumberPagination()
        paginator.page_size = page_size
        result_page = paginator.paginate_queryset(customer, request)
        serializer = CustomerSerializer(result_page, many=True)

        return paginator.get_paginated_response(serializer.data)



class CustomerAPIView(APIView):

    def put(self, request, pk, format=None):
        try:
            customer = Customers.objects.get(pk=pk)
        except Customers.DoesNotExist:
            raise Http404
        

        session_id = request.session.session_key
        data = request.data 
        data['session_key'] = session_id
 
        serializer = Customer_Serializer(customer,  data=data) 
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
 
        try:
            customer = Customers.objects.get(pk=pk)
        except Customers.DoesNotExist:
            raise Http404
        
        customer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)




class Shipping_CompanyListView(APIView):
 
    def get(self, request):
        queryset = Shipping_Company.objects.all()
        coupon_count = queryset.count()
        serializer = Shipping_CompanySerializer(queryset, many=True)
        data = {
            'company': serializer.data,
            'company_count': coupon_count
        }
        return Response(data, status=status.HTTP_200_OK)

  
class Shipping_CompanyView(APIView):
    permission_classes = [IsAuthenticated]  
    def post(self, request):
        serializer = Shipping_CompanySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            company = Shipping_Company.objects.get(pk=pk)
        except Shipping_Company.DoesNotExist:
            return Response({'error': 'Shipping Company not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = Shipping_CompanySerializer(company, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            company = Shipping_Company.objects.get(pk=pk)
        except Shipping_Company.DoesNotExist:
            return Response({'error': 'Shipping_Company not found'}, status=status.HTTP_404_NOT_FOUND)

        company.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


 

  

class Shipping_CountryListView(APIView):

    def get(self, request):
        queryset = shipping_Country.objects.all()
        country_count = queryset.count()
        serializer = shipping_CountrySerializer(queryset, many=True)
        data = {
            'country': serializer.data,
            'country_count': country_count
        }
        return Response(data, status=status.HTTP_200_OK)

 


class Shipping_CountryView(APIView):
    permission_classes = [IsAuthenticated]  

    def post(self, request):
        serializer = shippingCountrySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            country = shipping_Country.objects.get(pk=pk)
        except shipping_Country.DoesNotExist:
            return Response({'error': 'Shipping Country not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = shippingCountrySerializer(country, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            country = shipping_Country.objects.get(pk=pk)
        except shipping_Country.DoesNotExist:
            return Response({'error': 'shipping Country not found'}, status=status.HTTP_404_NOT_FOUND)

        country.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


 
class Shipping_Company_in_CountryView(APIView):
    permission_classes = [IsAuthenticated]  

    def post(self, request, pk):
        try:
            country = shipping_Country.objects.get(pk=pk)
        except shipping_Country.DoesNotExist:
            return Response({'error': 'Shipping Country not found'}, status=status.HTTP_404_NOT_FOUND)
        
        company_id = request.data.get('CompanyId')
        if not company_id:
            return Response({'error': 'CompanyId is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            company = Shipping_Company.objects.get(pk=company_id)
        except Shipping_Company.DoesNotExist:
            return Response({'error': 'Shipping Company not found'}, status=status.HTTP_404_NOT_FOUND)
        
        country.Shipping.add(company)
        country.save()

        return Response({'message': 'Shipping Company added successfully'}, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        try:
            country = shipping_Country.objects.get(pk=pk)
        except shipping_Country.DoesNotExist:
            return Response({'error': 'Shipping Country not found'}, status=status.HTTP_404_NOT_FOUND)
        
        company_id = request.query_params.get('CompanyId')
        if not company_id:
            return Response({'error': 'CompanyId is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            company = country.Shipping.get(pk=company_id)
        except Shipping_Company.DoesNotExist:
            return Response({'error': 'Shipping Company not found in this country'}, status=status.HTTP_404_NOT_FOUND)
        
        country.Shipping.remove(company)
        return Response({'message': 'Shipping Company removed successfully'}, status=status.HTTP_204_NO_CONTENT)

 





class ShippingBalanceView(APIView):
    permission_classes = [IsAuthenticated]  

    def get(self, request):
        start_date = request.query_params.get('createdAtStart')
        end_date = request.query_params.get('createdAtEnd')
        shipping_id = request.query_params.get('shipping')

        queryset = ShippingCompany_balance.objects.all()

        # Filter by shipping ID if provided
        if shipping_id:
            queryset = queryset.filter(shipping_id=shipping_id)

        # Filter by date range if both dates are provided
        if start_date and end_date:
            queryset = queryset.filter(date__range=[start_date, end_date])

        total_amount = Decimal('0.0')
        shipping_summary = defaultdict(lambda: Decimal('0.0'))

        for record in queryset:
            initial_balance = record.initial_balance or Decimal('0.0')
            added_amount = Decimal(record.added_amount or 0)
            total_amount += initial_balance + added_amount

            if record.shipping:
                shipping_summary[record.shipping.name] += initial_balance + added_amount

        # Serialize the queryset
        serializer = ShippingBalanceSerializer(queryset, many=True)
        shipping_balance = serializer.data

       
        data = {
            'shipping_balance': shipping_balance,
            'balance_count': queryset.count(),
            'total_amount': total_amount,
         }

        return Response(data, status=status.HTTP_200_OK)



    def post(self, request):
        serializer = ShippingBalanceـSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            balance = ShippingCompany_balance.objects.get(pk=pk)
        except ShippingCompany_balance.DoesNotExist:
            return Response({'error': 'Shipping company balance not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = ShippingBalanceـSerializer(balance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            balance = ShippingCompany_balance.objects.get(pk=pk)
        except ShippingCompany_balance.DoesNotExist:
            return Response({'error': 'Shipping company balance not found'}, status=status.HTTP_404_NOT_FOUND)

        balance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)






class InvoiceList(APIView):
    permission_classes = [IsAuthenticated]  

    def get(self, request):
        invoice_number_filter = request.query_params.get('invoice_number')
        start_date = request.query_params.get('createdAtStart')
        end_date = request.query_params.get('createdAtEnd')
   
        orders = Order.objects.all().order_by('-created_at')

    # Apply invoice number filter if provided
        if invoice_number_filter:
            orders = orders.filter(invoice_number=invoice_number_filter)

        # Apply date filter based on different options
        if start_date and end_date:
            orders = orders.filter(created_at__range=[start_date, end_date])

        orders_count = orders.count()
        serializer = OrderDashSerializer(orders, many=True)
        data={
            'orders': serializer.data,
            'orders_count': orders_count  }
        
        return Response(data, status=200)
    
 




 
class InvoiceDetail(APIView):

    def get(self, request, *args, **kwargs):
        order_id = kwargs.get('pk')

        try:
            # Fetch the order instance
            order = Order.objects.get(id=order_id, status='waiting')
        except Order.DoesNotExist:
            return Response({"error": "Order not found"}, status=status.HTTP_404_NOT_FOUND)

        # Fetch all order items related to the order
        order_items = OrderItem.objects.filter(order_id=order.id)

        # Count the number of items in the cart
        cart_items_count = order_items.count()

        # Calculate total quantity of items in the order
        cart_quantity = sum(item.quantity for item in order_items)

        # Serialize the order and order items
        serializer = OrderDashSerializer(order)
        order_item_serializer = OrderItemSerializer(order_items, many=True)

        # Construct response data
        data = serializer.data
        data['items'] = order_item_serializer.data
        data['cart_quantity'] = cart_quantity
        data['cart_items_count'] = cart_items_count

        return Response(data, status=status.HTTP_200_OK)
