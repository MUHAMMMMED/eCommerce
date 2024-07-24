from rest_framework import serializers
from .models import *
from products.serializers import ProductList_Serializer
  

class InfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Info
        fields ="__all__"
    def validate_mage(self, value):
        """
        Custom validation to check if uploaded file is an image.
        """
        if not value.content_type.startswith('image/'):
            raise serializers.ValidationError('Uploaded file must be an image.')
        return value




class SlideSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slide
        fields ="__all__"
    def validate_mage(self, value):
        """
        Custom validation to check if uploaded file is an image.
        """
        if not value.content_type.startswith('image/'):
            raise serializers.ValidationError('Uploaded file must be an image.')
        return value




class DealSerializer(serializers.ModelSerializer):
    product = ProductList_Serializer()
    class Meta:
        model = Deal
        fields ="__all__"

class Deal_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Deal
        fields ="__all__"



class GroupProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupProduct
        fields ="__all__"
    def validate_mage(self, value):
        """
        Custom validation to check if uploaded file is an image.
        """
        if not value.content_type.startswith('image/'):
            raise serializers.ValidationError('Uploaded file must be an image.')
        return value


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields ="__all__"
    def validate_mage(self, value):
        """
        Custom validation to check if uploaded file is an image.
        """
        if not value.content_type.startswith('image/'):
            raise serializers.ValidationError('Uploaded file must be an image.')
        return value


class BestSellersSerializer(serializers.ModelSerializer):
    product = ProductList_Serializer()
    class Meta:
        model = BestSellers
        fields ="__all__"
 
class BestSellersـSerializer(serializers.ModelSerializer):
    class Meta:
        model = BestSellers
        fields ="__all__"

 

class QuestionsGeneralSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionsGeneral
        fields ="__all__"
 

 
class RateGeneralSerializer(serializers.ModelSerializer):
    class Meta:
        model = RateGeneral
        fields ="__all__"


