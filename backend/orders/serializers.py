from rest_framework import serializers
from .models import *
from products.serializers import ProductSerializer
from cart.serializers import NoteSerializer

class Shipping_CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Shipping_Company
        fields ="__all__"
    def validate_mage(self, value):
        """
        Custom validation to check if uploaded file is an image.
        """
        if not value.content_type.startswith('image/'):
            raise serializers.ValidationError('Uploaded file must be an image.')
        return value


 

class OrderSerializer(serializers.ModelSerializer):
    # items = OrderItemSerializer(many=True)
    Shipping = Shipping_CompanySerializer()
    class Meta:
        model = Order
        fields ="__all__"

 
class Order_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields ="__all__"
 
 
class shipping_CountrySerializer(serializers.ModelSerializer):
    Shipping = Shipping_CompanySerializer(many=True)
    class Meta:
        model = shipping_Country
        fields ="__all__"

class shippingCountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = shipping_Country
        # fields ="__all__"
        exclude = ['Shipping']  # Exclude 'images' field from serialization

 

class DictionarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Dictionary
        fields = '__all__'

 

class DictionaryProductNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = DictionaryProductName
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    dictionary = DictionaryProductNameSerializer()
    order = Order_Serializer()  
    notes = NoteSerializer(many=True)   

    class Meta:
        model = OrderItem
        fields = '__all__'





class DictionarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Dictionary
        fields = '__all__'


class CountrySerializer(serializers.ModelSerializer):
    dictionary = DictionarySerializer()
    class Meta:
        model = Country
        fields = '__all__'

class RegionSerializer(serializers.ModelSerializer):
    dictionary = DictionarySerializer()
    class Meta:
        model = Region
        fields = '__all__'

class CitySerializer(serializers.ModelSerializer):
    dictionary = DictionarySerializer()
    class Meta:
        model = City
        fields = '__all__'


class CustomerSerializer(serializers.ModelSerializer):
    country = shipping_CountrySerializer()
    IP_country = CountrySerializer()
    IP_Region = RegionSerializer()
    IP_city = CitySerializer()
    # order=OrderSerializer(many=True)
    class Meta:
        model = Customers
        fields = '__all__'

 

class Customer_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Customers
        fields = '__all__'


class ShippingBalanceSerializer(serializers.ModelSerializer):
    shipping = Shipping_CompanySerializer()
    class Meta:
        model = ShippingCompany_balance
        fields = '__all__'

class ShippingBalanceـSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingCompany_balance
        fields = '__all__'




class OrderDashSerializer(serializers.ModelSerializer):
    customer= Customer_Serializer()
    Shipping = Shipping_CompanySerializer()
    order_items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields ="__all__"
  
# class OrderDashSerializer(serializers.ModelSerializer):
#     Shipping = Shipping_CompanySerializer()
#     customer = CustomerSerializer()
#     orderItem=OrderItemSerializer(many=True)
#     class Meta:
#         model = Order
#         fields = "__all__"

# class OrderDashSerializer(serializers.ModelSerializer):
#     shipping = Shipping_CompanySerializer(read_only=True)
#     customer = CustomerSerializer(read_only=True)
#     order_items = OrderItemSerializer(many=True, read_only=True)  # Make sure this matches the related_name in OrderItem

#     class Meta:
#         model = Order
#         fields = '__all__'
 