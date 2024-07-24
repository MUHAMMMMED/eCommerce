from django.db import models
from products.models import Product



class Info(models.Model):
    #   keywords= models.CharField(max_length = 300,blank=True, null=True)
      FaviconIco= models.FileField(upload_to = "files/images/FaviconIco/%Y/%m/%d/",blank=True, null=True)
      logo = models.FileField(upload_to = "files/images/logo/%Y/%m/%d/",blank=True, null=True)
      title = models.CharField(max_length=100,blank=True, null=True)
    #   PHONE = models.CharField(max_length = 15 ,blank=True, null=True)
      Whatsapp= models.CharField(max_length=15,blank=True, null=True)
    #   linkedin = models.CharField(max_length=500,blank=True, null=True)
      snapchat= models.CharField(max_length=300,blank=True, null=True)
      instagram = models.CharField(max_length=300,blank=True, null=True)
      Twitter = models.CharField(max_length=300,blank=True, null=True)
      facebook = models.CharField(max_length=300,blank=True, null=True)
    #   Map_Address= models.CharField(max_length=300,blank=True, null=True)
      pixel_id= models.CharField(max_length =300  ,blank=True, null=True)
      offer_message = models.TextField(blank=True, null=True)
      StripeFee = models.DecimalField(max_digits=5, decimal_places=2, default=5.00)

      def __str__(self):
         return self.title








class Slide(models.Model):
    top_slider_web= models.FileField(upload_to="files/images/Item/%Y/%m/%d/", blank=True, null=True)
    top_slider_mobile= models.FileField(upload_to="files/images/Item/%Y/%m/%d/", blank=True, null=True)
    is_active = models.BooleanField(default=True)



 
    

class Deal(models.Model):
    title = models.CharField(max_length=300)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    # def __str__(self):
    #     return self.product.name


class GroupProduct(models.Model):
    title = models.CharField(max_length=300)
    link = models.CharField(max_length=300) 
    big_image = models.FileField(upload_to="files/images/Item/%Y/%m/%d/", blank=True, null=True)
    image1 = models.FileField(upload_to="files/images/Item/%Y/%m/%d/", blank=True, null=True)
    image2 = models.FileField(upload_to="files/images/Item/%Y/%m/%d/", blank=True, null=True)
    image3 = models.FileField(upload_to="files/images/Item/%Y/%m/%d/", blank=True, null=True)
    price= models.CharField(max_length=10, blank=True, null=True)
    def delete(self, *args, **kwargs):
        self.big_image.delete()
        self.big_image.delete()
        self.image1.delete()
        self.image2.delete()
        self.image3.delete()

        super().delete(*args, **kwargs)

    def __str__(self):
        return self.title


class Card(models.Model):
    title= models.CharField(max_length=300)
    link = models.CharField(max_length=300) 
    image = models.FileField(upload_to="files/images/Item/%Y/%m/%d/", blank=True, null=True)
    def __str__(self):
      return self.title

class BestSellers(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    def __str__(self):
        return self.product.name
 
class QuestionsGeneral(models.Model):
      question= models.TextField()
      answer =  models.TextField()
      def __str__(self):
         return self.question
      


class RateGeneral(models.Model):
    created = models.DateTimeField(auto_now=True)
    message = models.TextField( blank=True, null=True)
    rate_number = models.IntegerField(default=0)
    name = models.CharField(max_length=100)
    def __str__(self):
         return self.name
