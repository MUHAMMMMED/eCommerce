
from rest_framework import serializers
from .models import  *

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields ="__all__"
    def validate_mage(self, value):
        """
        Custom validation to check if uploaded file is an image.
        """
        if not value.content_type.startswith('image/'):
            raise serializers.ValidationError('Uploaded file must be an image.')
        return value

 
 
class Image_ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image_Product
        fields ="__all__"
    def validate_mage(self, value):
        """
        Custom validation to check if uploaded file is an image.
        """
        if not value.content_type.startswith('image/'):
            raise serializers.ValidationError('Uploaded file must be an image.')
        return value
 
# class ThemeOneSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ThemeOne
#         # fields = ['id', 'name']
#         fields ="__all__"

# class ThemeTwoSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ThemeTwo
#         # fields = ['id', 'name']
#         fields ="__all__"
# class ThemeThreeSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ThemeThree
#         # fields = ['id', 'name']
#         fields ="__all__"
 
class Product_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        exclude = ['images']  # Exclude 'images' field from serialization


    def validate_image(self, value):
        """
        Custom validation to check if uploaded file is an image.
        """
        if not value.content_type.startswith('image/'):
            raise serializers.ValidationError('Uploaded file must be an image.')
        return value
 

class MoreInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MoreInfo
        fields ="__all__"
    def validate_mage(self, value):
        """
        Custom validation to check if uploaded file is an image.
        """
        if not value.content_type.startswith('image/'):
            raise serializers.ValidationError('Uploaded file must be an image.')
        return value



class FrequentlyAsked_Serializer(serializers.ModelSerializer):
    class Meta:
        model = FrequentlyAsked
        fields ="__all__"

 

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    images=Image_ProductSerializer(many=True)
    # theme_object = serializers.SerializerMethodField()

    class Meta:
        model = Product
     
        fields = [
            'id','theme_type', 
             'is_active','subtitle', 'name', 'description', 'category', 
            'image_side_one','image_side_two', 'top_slider_web', 'top_slider_mobile', 'stock_no', 'video','images',
            'quantity1','quantity2','quantity3','quantity4','quantity5',
            'discount_price1','discount_price2','discount_price3','discount_price4','discount_price5',
            'is_active_note','note_help_top','note_help_bottom','note_help','discount',
             'price1', 'price2', 'price3', 'price4', 'price5', 'currency','default_option','expiration_date_offer'
# 'theme_object', 'theme_id','theme_content_type', 

        ]

    # def get_theme_object(self, obj):
    #     if obj.theme_type == 'themeone':
 
    #         return ThemeOneSerializer(ThemeOne.objects.get(id=obj.theme_id)).data
    #     elif obj.theme_type == 'themetwo':
    #         return ThemeTwoSerializer(ThemeTwo.objects.get(id=obj.theme_id)).data
    #     elif obj.theme_type == 'themethree':
    #         return ThemeThreeSerializer(ThemeThree.objects.get(id=obj.theme_id)).data
    #     return None
  


class ProductList_Serializer(serializers.ModelSerializer):
    category = CategorySerializer()
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'category',  
                  'image_side_one','image_side_two', 'price1',
                  'discount_price1','currency','is_active_note',
                  'note_help_top','note_help_bottom','note_help','default_option','expiration_date_offer','stock_no','discount' ]


class ProductCart_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'category', 
            'image_side_one','image_side_two', 
            'quantity1','quantity2','quantity3','quantity4','quantity5',
            'discount_price1','discount_price2','discount_price3','discount_price4','discount_price5',
            'is_active_note','note_help_top','note_help_bottom','note_help',
             'price1', 'price2', 'price3', 'price4', 'price5', 'currency' ,'default_option','discount','stock_no'


        ]


class ProductDash_Serializer(serializers.ModelSerializer):
    category = CategorySerializer()
    class Meta:
        model = Product
        fields ="__all__"


class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields ="__all__"
 
 

class RateSerializer(serializers.ModelSerializer):
    product = ProductCart_Serializer()
    class Meta:
        model = Rate
        fields ="__all__"
 

class RateـSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rate
        fields ="__all__"