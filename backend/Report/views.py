from collections import defaultdict
from datetime import datetime, timedelta
from decimal import Decimal
from django.db.models import Sum,Count, F, IntegerField
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from orders.models import *
from accounting.models import *
from home.models import Info



class Report(APIView):
    permission_classes = [IsAuthenticated]  # Restrict access to authenticated users

    def get(self, request):
        date_filter = request.query_params.get('date')  # Retrieve date filter from query parameters
        orders = Order.objects.all()  # Get all orders
        shipping = ShippingCompany_balance.objects.all()  # Get all shipping company balances
        expense = Expense.objects.all()  # Get all expenses
        purchase = Purchase.objects.all()  # Get all purchases
        budget = MonthlyAdBudget.objects.all()  # Get all monthly ad budgets
        product_sold = OrderItem.objects.filter(paid=True)  # Get all paid order items

        # Apply date filter based on different options
        if date_filter == 'today':
            start_date = datetime.now().date()
            end_date = start_date + timedelta(days=1)
            orders = orders.filter(created_at__range=[start_date, end_date])
            shipping = shipping.filter(date__range=[start_date, end_date])
            expense = expense.filter(expense_date__range=[start_date, end_date])
            purchase = purchase.filter(purchase_date__range=[start_date, end_date])
            budget = budget.filter(month__range=[start_date, end_date])
            product_sold = product_sold.filter(date_sold__range=[start_date, end_date])

        elif date_filter == 'last3days':
            start_date = datetime.now().date() - timedelta(days=3)
            orders = orders.filter(created_at__gte=start_date)
            shipping = shipping.filter(date__gte=start_date)
            expense = expense.filter(expense_date__gte=start_date)
            purchase = purchase.filter(purchase_date__gte=start_date)
            budget = budget.filter(month__gte=start_date)
            product_sold = product_sold.filter(date_sold__gte=start_date)

        elif date_filter == 'thisweek':
            today = datetime.now().date()
            start_date = today - timedelta(days=today.weekday())
            orders = orders.filter(created_at__gte=start_date)
            shipping = shipping.filter(date__gte=start_date)
            expense = expense.filter(expense_date__gte=start_date)
            purchase = purchase.filter(purchase_date__gte=start_date)
            budget = budget.filter(month__gte=start_date)
            product_sold = product_sold.filter(date_sold__gte=start_date)

        elif date_filter == 'thismonth':
            today = datetime.now().date()
            start_date = today.replace(day=1)
            orders = orders.filter(created_at__gte=start_date)
            shipping = shipping.filter(date__gte=start_date)
            expense = expense.filter(expense_date__gte=start_date)
            purchase = purchase.filter(purchase_date__gte=start_date)
            budget = budget.filter(month__gte=start_date)
            product_sold = product_sold.filter(date_sold__gte=start_date)

        elif date_filter == 'previousmonth':
            today = datetime.now().date()
            first_day_this_month = today.replace(day=1)
            last_day_last_month = first_day_this_month - timedelta(days=1)
            start_date = last_day_last_month.replace(day=1)
            end_date = last_day_last_month
            orders = orders.filter(created_at__range=[start_date, end_date])
            shipping = shipping.filter(date__range=[start_date, end_date])
            expense = expense.filter(expense_date__range=[start_date, end_date])
            purchase = purchase.filter(purchase_date__range=[start_date, end_date])
            budget = budget.filter(month__range=[start_date, end_date])
            product_sold = product_sold.filter(date_sold__range=[start_date, end_date])

        elif date_filter == 'last3months':
            today = datetime.now().date()
            start_date = (today.replace(day=1) - timedelta(days=90)).replace(day=1)
            orders = orders.filter(created_at__gte=start_date)
            shipping = shipping.filter(date__gte=start_date)
            expense = expense.filter(expense_date__gte=start_date)
            purchase = purchase.filter(purchase_date__gte=start_date)
            budget = budget.filter(month__gte=start_date)
            product_sold = product_sold.filter(date_sold__gte=start_date)

        elif date_filter == 'last6months':
            today = datetime.now().date()
            start_date = (today.replace(day=1) - timedelta(days=180)).replace(day=1)
            orders = orders.filter(created_at__gte=start_date)
            shipping = shipping.filter(date__gte=start_date)
            expense = expense.filter(expense_date__gte=start_date)
            purchase = purchase.filter(purchase_date__gte=start_date)
            budget = budget.filter(month__gte=start_date)
            product_sold = product_sold.filter(date_sold__gte=start_date)

        elif date_filter == 'thisyear':
            today = datetime.now().date()
            start_date = today.replace(month=1, day=1)
            orders = orders.filter(created_at__gte=start_date)
            shipping = shipping.filter(date__gte=start_date)
            expense = expense.filter(expense_date__gte=start_date)
            purchase = purchase.filter(purchase_date__gte=start_date)
            budget = budget.filter(month__gte=start_date)
            product_sold = product_sold.filter(date_sold__gte=start_date)

        elif date_filter == 'lastyear':
            today = datetime.now().date()
            start_date = today.replace(year=today.year - 1, month=1, day=1)
            end_date = today.replace(year=today.year - 1, month=12, day=31)
            orders = orders.filter(created_at__range=[start_date, end_date])
            shipping = shipping.filter(date__range=[start_date, end_date])
            expense = expense.filter(expense_date__range=[start_date, end_date])
            purchase = purchase.filter(purchase_date__range=[start_date, end_date])
            budget = budget.filter(month__range=[start_date, end_date])
            product_sold = product_sold.filter(date_sold__range=[start_date, end_date])

        # Count orders by status
        orders_count = orders.count()
        waiting = orders.filter(status='waiting').count()
        processing = orders.filter(status='processing').count()
        shipping_count = orders.filter(status='Shipping').count()
        done = orders.filter(status='done').count()
        cancel = orders.filter(status='cancel').count()

        # Aggregations for orders with status 'done'
        order_done = orders.filter(status='done')
        total_amount = order_done.aggregate(Sum('total'))['total__sum'] or 0
 
        total_tax = order_done.aggregate(Sum('tax_amount'))['tax_amount__sum'] or 0
        total_shipping = order_done.aggregate(Sum('shipping'))['shipping__sum'] or 0
        total_discount_pshipping = order_done.aggregate(total_discount=Sum('Shipping__discount_price'))['total_discount'] or 0

        shipping_sum = []
        shipping_aggregates = defaultdict(lambda: {'total_amount': Decimal('0.0'), 'total_amount_discount': Decimal('0.0')})

        for record in order_done:
            if record.Shipping:
                shipping_aggregates[record.Shipping.name]['total_amount'] += Decimal(record.shipping)
                shipping_aggregates[record.Shipping.name]['total_amount_discount'] += Decimal(record.Shipping.discount_price)

        for name, aggregates in shipping_aggregates.items():
            shipping_sum.append({
                'name': name,
                'total_amount': aggregates['total_amount'],
                'total_amount_discount': aggregates['total_amount_discount']
            })

        total_shipping_balance = Decimal('0.0')
        shipping_summary = defaultdict(lambda: Decimal('0.0'))

        for record in shipping:
            initial_balance = Decimal(record.initial_balance or '0.0')
            added_amount = Decimal(record.added_amount or 0)
            total_shipping_balance += initial_balance + added_amount

            if record.shipping:
                shipping_summary[record.shipping.name] += initial_balance + added_amount

        shipping_balance_summary = [{'name': name, 'total_amount': amount} for name, amount in shipping_summary.items()]
        total_amount_expense = expense.aggregate(Sum('amount'))['amount__sum'] or 0
        total_amount_purchase = purchase.aggregate(Sum('amount'))['amount__sum'] or 0
        total_amount_product_sold = product_sold.aggregate(total_amount=Sum(F('cost') * F('quantity')))['total_amount'] or 0

        info = Info.objects.all().first()  # Get the first Info object
        StripeTax = float(info.StripeFee)  # Get the Stripe fee percentage
        taxAmount = (total_amount * StripeTax) / 100  # Calculate the tax amount

        total_amount_budget = 0
        for record in budget:
            initial_balance = record.initial_balance or 0
            added_amount = record.added_amount or 0
            total_amount_budget += initial_balance + added_amount

        aggregated_data = product_sold.values('dictionary__name').annotate(
            total_quantity=Sum('quantity'),
            total_cost=Sum(F('quantity') * F('cost'), output_field=IntegerField()),
            total_amount=Sum(F('quantity') * F('price'), output_field=IntegerField()),
            item_count=Count('id')
        ).order_by('dictionary__name')
        order_item = list(aggregated_data)

        country = Country.objects.all()  # Get all countries
        country_names = set(country.values_list('dictionary__name', flat=True))  # Get unique country names
        country_data= [name for name in country_names]  # Serialize the unique country names
         
        country_list=model_list(Country)

 
        return Response({
            'orders_count': orders_count,
            'waiting': waiting,
            'processing': processing,
            'Shipping': shipping_count,
            'done': done,
            'cancel': cancel,
            'total_tax': total_tax,
            'total_amount': total_amount,
            'shipping_balance_summary': shipping_balance_summary,
            'total_shipping_balance': total_shipping_balance,
            'total_shipping': total_shipping,
            'shipping_sum': shipping_sum,
            'total_discount_pshipping': total_discount_pshipping,
            'total_amount_expense':total_amount_expense,
            'total_amount_purchase':total_amount_purchase,
            'StripeTax':StripeTax,
            'taxAmount':taxAmount,
            'total_amount_budgetAdd':total_amount_budget,
            'total_amount_product_sold':total_amount_product_sold,
            'order_item':order_item,
            'country':country_data,
            'country_list':country_list,
        }, status=200)
 

def model_list(Model):
    # Retrieve all entries from the model
    items = Model.objects.all()

    # Create a dictionary to store dictionary names and counts
    dictionary_counts = {}

    # Iterate over the queryset and calculate the count for each item
    for item in items:
        dictionary_name = item.dictionary.name
        # Count the number of occurrences of the item in the queryset
        count = Model.objects.filter(dictionary=item.dictionary).count()
        # Store the item name and count in the dictionary
        dictionary_counts[dictionary_name] = count

    # Return the dictionary containing dictionary names and their counts
    return dictionary_counts

 

class CountryList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Check permissions (this can be added as per your project's requirements)

        # Extract 'country' parameter from query parameters
        name = request.query_params.get('country')
        
        # If 'country' parameter is not provided, return a 400 BAD REQUEST response
        if not name:
            return Response({"message": "Country parameter is missing"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Try to get the Dictionary object matching the country name
            dic = Dictionary.objects.get(name=name)
            
            # Filter the Country object related to the Dictionary object
            country = Country.objects.filter(dictionary__id=dic.id).first()
            
            # If no country is found, return a 404 NOT FOUND response
            if not country:
                return Response({"message": "Country not found"}, status=status.HTTP_404_NOT_FOUND)

            # Filter all Region objects related to the country's dictionary name
            regions = Region.objects.filter(country__dictionary__name=country.dictionary.name)

            # Get unique region names from the regions queryset
            regions_names = set(regions.values_list('dictionary__name', flat=True))
            
            # Serialize the unique region names into a list
            regions_names_list = list(regions_names)

            # Create a dictionary to store the count of regions per unique region name
            region_counts = {}
            for region_name in regions_names:
                count = regions.filter(dictionary__name=region_name).count()
                region_counts[region_name] = count

            # Prepare the response data
            data = { 
                'country_name': name,
                'region_counts': region_counts,
                'regions_names': regions_names_list,
            }
            
            # Return the response data with a 200 OK status
            return Response(data, status=status.HTTP_200_OK)

        except ObjectDoesNotExist:
            # If the Dictionary object is not found, return a 404 NOT FOUND response
            return Response({"message": "Country not found"}, status=status.HTTP_404_NOT_FOUND)




class RegionList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Extract 'Region' parameter from query parameters
        name = request.query_params.get('Region')
        
        # If 'Region' parameter is not provided, return a 400 BAD REQUEST response
        if not name:
            return Response({"message": "Region parameter is missing"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Try to get the Dictionary object matching the region name
            dic = Dictionary.objects.get(name=name)
            
            # Filter the Region object related to the Dictionary object
            region = Region.objects.filter(dictionary__id=dic.id).first()
            
            # If no region is found, return a 404 NOT FOUND response
            if not region:
                return Response({"message": "Region not found"}, status=status.HTTP_404_NOT_FOUND)

            # Filter all City objects related to the region's dictionary name
            cities = City.objects.filter(region__dictionary__name=region.dictionary.name)
            
            # Create a dictionary to store the count of cities per unique city name
            region_counts = {}
            for city in cities:
                count = cities.filter(dictionary__name=city.dictionary.name).count()
                region_counts[city.dictionary.name] = count

            # Prepare the response data
            data = { 
                'region_name': region.dictionary.name,
                'region_counts': region_counts,
            }
            
            # Return the response data with a 200 OK status
            return Response(data, status=status.HTTP_200_OK)

        except ObjectDoesNotExist:
            # If the Dictionary object is not found, return a 404 NOT FOUND response
            return Response({"message": "Region not found"}, status=status.HTTP_404_NOT_FOUND)

 