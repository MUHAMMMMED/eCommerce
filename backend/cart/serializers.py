from rest_framework import serializers
from .models import *
from products.serializers import ProductCart_Serializer
  

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields ="__all__"

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductCart_Serializer()
    notes = NoteSerializer(many=True)

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity','notes']

class CartItem_Serializer(serializers.ModelSerializer):
 
    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity']


class CartSerializer(serializers.ModelSerializer):
    items = CartItem_Serializer(many=True, read_only=True)
    class Meta:
        model = Cart
        fields = ['id', 'session_id', 'created_at',  ]
 
class Cart_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ['id', 'session_id', 'created_at','total' ]
 



 