from rest_framework import serializers
from .models import *
 

class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields ="__all__"

 
class PurchaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Purchase
        fields ="__all__"

class MonthlyAdBudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = MonthlyAdBudget
        fields ="__all__"

class PackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Package
        fields ="__all__"
    def validate_mage(self, value):
        """
        Custom validation to check if uploaded file is an image.
        """
        if not value.content_type.startswith('image/'):
            raise serializers.ValidationError('Uploaded file must be an image.')
        return value
    

 