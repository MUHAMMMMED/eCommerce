from django.db import models
# from django.contrib.contenttypes.fields import GenericForeignKey
# from django.contrib.contenttypes.models import ContentType

class Category(models.Model):
    is_active = models.BooleanField(default=True)
    name = models.CharField(max_length=100)
    home_image = models.ImageField(upload_to="files/images/Item/%Y/%m/%d/", blank=True, null=True)
    top_slider_web= models.ImageField(upload_to="files/images/Item/%Y/%m/%d/", blank=True, null=True)
    top_slider_mobile= models.ImageField(upload_to="files/images/Item/%Y/%m/%d/", blank=True, null=True)
    def __str__(self):
        return self.name
    
    def delete(self, *args, **kwargs):
        self.top_slider_web.delete()
        self.top_slider_mobile.delete()
        super().delete(*args, **kwargs)
  
class Image_Product(models.Model):
    image = models.ImageField(upload_to="files/images/Item/%Y/%m/%d/", blank=True, null=True)
 

    def delete(self, *args, **kwargs):
        self.image.delete()
        super().delete(*args, **kwargs)

 
# class ThemeOne(models.Model):
#     name = models.CharField(max_length=100)
#     def __str__(self):
#         return self.name

# class ThemeTwo(models.Model):
#     name = models.CharField(max_length=100)
#     def __str__(self):
#         return self.name

# class ThemeThree(models.Model):
#     name = models.CharField(max_length=100)
#     def __str__(self):
#         return self.name

class Product(models.Model):
    
    THEME_MODELS = [
        ('themeone', 'ThemeOne'),
        ('themetwo', 'ThemeTwo'),
        ('themethree', 'ThemeThree'),
    ]
    created_at = models.DateTimeField(auto_now_add=True)
 
    is_active = models.BooleanField(default=False)
    name = models.CharField(max_length=300,blank=True, null=True)
    subtitle = models.CharField(max_length=100,blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, blank=True)
    currency= models.CharField(max_length= 50 ,blank=True, null=True)
    cost = models.DecimalField(max_digits=10, decimal_places=2,default=0)
    stock_no = models.IntegerField(default=0)
    stock_alarm = models.IntegerField(default=0)
    expiration_date_offer= models.DateField(blank=True, null=True)

    default_option = models.FloatField(default=0,blank=True, null=True)
    is_active_note = models.BooleanField(default=True)
    note_help_top = models.CharField(max_length=500, blank=True, null=True)
    note_help = models.CharField(max_length=500, blank=True, null=True)
    note_help_bottom = models.CharField(max_length=500, blank=True, null=True)
    discount = models.FloatField(default=0,blank=True, null=True)

    quantity1= models.IntegerField(default=0)
    quantity2= models.IntegerField(default=0)
    quantity3= models.IntegerField(default=0)
    quantity4= models.IntegerField(default=0)
    quantity5= models.IntegerField(default=0)
 
    price1 = models.FloatField(default=0,blank=True, null=True)
    price2 = models.FloatField(default=0,blank=True, null=True)
    price3 = models.FloatField(default=0,blank=True, null=True)
    price4 = models.FloatField(default=0,blank=True, null=True)
    price5 = models.FloatField(default=0,blank=True, null=True)

    discount_price1 = models.FloatField(default=0,blank=True, null=True)
    discount_price2 = models.FloatField(default=0,blank=True, null=True)
    discount_price3 = models.FloatField(default=0,blank=True, null=True)
    discount_price4 = models.FloatField(default=0,blank=True, null=True)
    discount_price5 = models.FloatField(default=0,blank=True, null=True)

    image_side_one = models.ImageField(upload_to="files/images/side_one/%Y/%m/%d/", blank=True, null=True)
    image_side_two = models.ImageField(upload_to="files/images/side_one/%Y/%m/%d/", blank=True, null=True)

    top_slider_web = models.ImageField(upload_to="files/images/Item/%Y/%m/%d/", blank=True, null=True)
    top_slider_mobile = models.ImageField(upload_to="files/images/Item/%Y/%m/%d/", blank=True, null=True)

    images = models.ManyToManyField(Image_Product, blank=True)
    video = models.CharField(max_length=300, blank=True, null=True)

    theme_type = models.CharField(max_length=20, choices=THEME_MODELS, default='', blank=True, null=True)
    # theme_id = models.PositiveIntegerField(null=True, blank=True)
    # theme_content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, null=True, blank=True)
    # theme_object = GenericForeignKey('theme_content_type', 'theme_id')

    def __str__(self):
        return str(self.id)

    def delete(self, *args, **kwargs):
        self.image_side_one.delete()
        self.image_side_two.delete()
        self.top_slider_web.delete()
        self.top_slider_mobile.delete()
    
        super().delete(*args, **kwargs)

    # def save(self, *args, **kwargs):
    #     if self.theme_type == 'themeone':
    #         self.theme_content_type = ContentType.objects.get_for_model(ThemeOne)
    #     elif self.theme_type == 'themetwo':
    #         self.theme_content_type = ContentType.objects.get_for_model(ThemeTwo)
    #     elif self.theme_type == 'themethree':
    #         self.theme_content_type = ContentType.objects.get_for_model(ThemeThree)
    #     super().save(*args, **kwargs)
 



class FrequentlyAsked(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    question= models.TextField()
    answer =  models.TextField()
    def __str__(self):
      return self.question


class MoreInfo(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    image = models.ImageField(upload_to="files/images/MoreInfo/%Y/%m/%d/", blank=True, null=True)
    name = models.CharField(max_length=300)
    description = models.TextField(blank=True, null=True)
    def __str__(self):
      return self.name

 

class Rate(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    created = models.DateTimeField(auto_now=True)
    message = models.TextField( blank=True, null=True)
    rate_number = models.IntegerField(default=0)
    name = models.CharField(max_length=100)
    def __str__(self):
         return self.name

 


class Coupon(models.Model): 
    code = models.CharField(max_length=100)
    discount = models.FloatField(default=0,blank=True, null=True)
    coupon_usage= models.FloatField(default=0)
    expiryDate = models.DateField(blank=True, null=True)  
    def __str__(self):
        return self.code

  
