from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.db.models import Sum
from .models import*
from .serializers import *
from django.utils.dateparse import parse_date
from rest_framework.permissions import IsAuthenticated

class ExpenseListView(APIView):
    permission_classes = [IsAuthenticated]  
    def get(self, request):
        start_date = request.query_params.get('createdAtStart')
        end_date = request.query_params.get('createdAtEnd')
        expense = Expense.objects.all()

        # Apply date filter based on different options
        if start_date and end_date:
            expense = expense.filter(expense_date__range=[start_date, end_date])
        
        expense_count = expense.count()
        total_amount = expense.aggregate(Sum('amount'))['amount__sum'] or 0

        serializer = ExpenseSerializer(expense, many=True)
        expense_data = serializer.data

        # Create a new dictionary to include both the list and the count
        data = {
            'expenses': expense_data,
            'expense_count': expense_count,
            'total_amount': total_amount
        }
        
        return Response(data, status=status.HTTP_200_OK)



 
class PurchaseListView(APIView):
    permission_classes = [IsAuthenticated]  

    def get(self, request):
        start_date = request.query_params.get('createdAtStart')
        end_date = request.query_params.get('createdAtEnd')
        purchase = Purchase.objects.all()

        # Apply date filter based on different options
        if start_date and end_date:
            purchase = purchase.filter(purchase_date__range=[start_date, end_date])
        
        purchase_count = purchase.count()
        total_amount = purchase.aggregate(Sum('amount'))['amount__sum'] or 0

        serializer = PurchaseSerializer(purchase, many=True)
        purchase_data = serializer.data

        # Create a new dictionary to include both the list and the count
        data = {
            'purchase': purchase_data,
            'purchase_count': purchase_count,
            'total_amount': total_amount
        }
        
        return Response(data, status=status.HTTP_200_OK)

 
 

class PackageListView(APIView):
    permission_classes = [IsAuthenticated]  
    def get(self, request):
        packages = Package.objects.all()
        total_quantity = packages.aggregate(total=Sum('quantity'))['total']
        serializer = PackageSerializer(packages, many=True)
        package_data = serializer.data
        data = {
            'package': package_data,
            'package_count': total_quantity,
        }
        return Response(data, status=status.HTTP_200_OK)





class NotificationPackageView(APIView):
    permission_classes = [IsAuthenticated]  

    def get(self, request, *args, **kwargs):
        # Filter   products
        packages = Package.objects.all()

        # Check stock numbers against stock alarm values
        packages_below_stock_alarm = [package for package in packages if package.quantity <= package.stock_alarm]

        # Serialize the data
        serializer = PackageSerializer(packages_below_stock_alarm, many=True)

        # Return the serialized data
        return Response(serializer.data)
 
class PackageAPIView(APIView):
    permission_classes = [IsAuthenticated]  

    def post(self, request, format=None):
        # Create a new package
        serializer = PackageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk, format=None):
        # Update a package
        package = self.get_object(pk)
        serializer = PackageSerializer(package, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        # Delete a package
        package = self.get_object(pk)
        package.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    def get_object(self, pk):
        try:
            return Package.objects.get(pk=pk)
        except Package.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

 
class ExpenseAPIView(APIView):
    permission_classes = [IsAuthenticated]  

    def post(self, request, format=None):
        serializer = ExpenseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk, format=None):
        expense = self.get_object(pk)
        serializer = ExpenseSerializer(expense, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        expense = self.get_object(pk)
        expense.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get_object(self, pk):
        try:
            return Expense.objects.get(pk=pk)
        except Expense.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)






 
class PurchaseAPIView(APIView):
    permission_classes = [IsAuthenticated]  

    def post(self, request, format=None):
        serializer = PurchaseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk, format=None):
        purchase = self.get_object(pk)
        serializer = PurchaseSerializer(purchase, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        purchase = self.get_object(pk)
        purchase.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get_object(self, pk):
        try:
            return Purchase.objects.get(pk=pk)
        except Purchase.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


 
 
class MonthlyAdBudgetView(APIView):
    permission_classes = [IsAuthenticated]  
 
    def get(self, request):
       if  request.user.is_authenticated:
        start_date = request.query_params.get('createdAtStart')
        end_date = request.query_params.get('createdAtEnd')
 
        queryset = MonthlyAdBudget.objects.all()

        # Filter by date range if both dates are provided
        if start_date and end_date:
            start_date = parse_date(start_date)
            end_date = parse_date(end_date)
            if start_date and end_date:
                queryset = queryset.filter(date__range=[start_date, end_date])

        # Count and sum calculations
        balance_count = queryset.count()
        # Serialize the queryset
        serializer = MonthlyAdBudgetSerializer(queryset, many=True)
        shipping_balance = serializer.data
        total_amount = 0
 
        for record in queryset:
            initial_balance = record.initial_balance or 0
            added_amount = record.added_amount or 0 
            total_amount += initial_balance + added_amount
 
        # Create a new dictionary to include both the list and the count
        data = {
            'ad_budget': shipping_balance,
            'total_amount': total_amount,
            'ad_budget_count': balance_count,
        }
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        serializer = MonthlyAdBudgetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk, format=None):
        ad_budget = self.get_object(pk)
        if isinstance(ad_budget, Response):
            return ad_budget
        serializer = MonthlyAdBudgetSerializer(ad_budget, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        ad_budget = self.get_object(pk)
        if isinstance(ad_budget, Response):
            return ad_budget
        ad_budget.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get_object(self, pk):
        try:
            return MonthlyAdBudget.objects.get(pk=pk)
        except MonthlyAdBudget.DoesNotExist:
            return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)




 