from django.db import models
from cart.models import Note
from accounting.models import Package
 
class Dictionary (models.Model):
    name =  models.CharField(max_length=50  )
    def __str__(self):
        return self.name
 
class Country (models.Model):
    dictionary = models.ForeignKey(Dictionary ,on_delete=models.CASCADE, null = False ,  blank=True)
    session_key= models.CharField(max_length=100)
    def __str__(self):
        return self.dictionary.name
     
class Region (models.Model):
    dictionary = models.ForeignKey(Dictionary ,on_delete=models.CASCADE, null = False ,  blank=True)
    country = models.ForeignKey(Country ,on_delete=models.CASCADE, null = False ,  blank=True)
    session_key= models.CharField(max_length=100)
    def __str__(self):
        return self.dictionary.name
    

class City (models.Model):
    dictionary = models.ForeignKey(Dictionary ,on_delete=models.CASCADE, null = False ,  blank=True)
    region = models.ForeignKey(Region ,on_delete=models.CASCADE, null = False ,  blank=True)
    session_key= models.CharField(max_length=100)
    def __str__(self):
        return self.dictionary.name
  
class Shipping_Company (models.Model):
    image = models.FileField(upload_to="files/images/Item/%Y/%m/%d/", blank=True, null=True)
    name = models.CharField(max_length=50)
    shipping_price = models.FloatField(default=0)
    discount_price = models.FloatField(default=0)
    work_days  = models.CharField(max_length=50)
    def __str__(self):
        return str(self.name)

class shipping_Country (models.Model):
    name = models.CharField(max_length=50)
    tax  = models.IntegerField(default=0)
    Shipping = models.ManyToManyField(Shipping_Company, blank=True)

    def __str__(self):
        return str(self.name)
 
class ShippingCompany_balance(models.Model):
    shipping = models.ForeignKey(Shipping_Company, on_delete=models.CASCADE , blank=True, null=True)
    initial_balance = models.DecimalField(max_digits=10, decimal_places=2)
    final_balance = models.DecimalField(max_digits=10, decimal_places=2)
    added_amount = models.FloatField(default=0)
    date = models.DateField()
    def __str__(self):
        return self.shipping.name

class Customers(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    session_key= models.CharField(max_length=100)
    IP_Address =  models.CharField(max_length=20, null=True, blank=True )
    name = models.CharField(max_length=100, blank=True, null=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    email  = models.CharField(max_length=50, blank=True, null=True)
    country = models.ForeignKey(shipping_Country, on_delete=models.CASCADE, blank=True, null=True)
    governorate = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    neighborhood= models.CharField(max_length=100, blank=True, null=True)
    street= models.CharField(max_length=100, blank=True, null=True)
    shipping_address= models.CharField(max_length=500, blank=True, null=True)
    IP_country =  models.ForeignKey(Country, on_delete=models.CASCADE, blank=True, null=True)
    IP_Region = models.ForeignKey(Region, on_delete=models.CASCADE, blank=True, null=True) 
    IP_city = models.ForeignKey(City, on_delete=models.CASCADE, blank=True, null=True)
    purchase_count = models.PositiveIntegerField(default=0, blank=True, null=True) 
  
   

class Order(models.Model):
    
    STATUS_CHOICES = [
     ('waiting','انتظار'),
     ('processing', 'تجهيز الطلب'),
     ('Shipping', 'تم الشحن'),
     ('done','تم'),
     ('cancel','الغاء'),  ]

    DAY = [
        ('mon', 'الاثنين'),
        ('tue', 'الثلاثاء'),
        ('wed', 'الأربعاء'),
        ('thu', 'الخميس'),
        ('fri', 'الجمعة'),
        ('sat', 'السبت'),
        ('sun', 'الأحد'),  ]
  
    created_at = models.DateTimeField(auto_now_add=True)
    session_key= models.CharField(max_length=100,blank=True, null=True)
    shipping=models.FloatField(default=0)
    tax = models.IntegerField(default=0)
    tax_amount= models.IntegerField(default=0)
    total = models.FloatField(default=0)
    note  = models.TextField( blank=True, null=True)
    Shipping = models.ForeignKey(Shipping_Company, on_delete=models.CASCADE, blank=True, null=True)
    paid = models.BooleanField(default=False)
    new = models.BooleanField(default=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='waiting')
    anticipation = models.CharField(max_length=20, choices=DAY, blank=True, null=True)
    Tracking = models.CharField(max_length=50, blank=True, null=True)
    invoice_number= models.CharField(max_length=50, blank=True, null=True)
    package = models.ForeignKey(Package, on_delete=models.CASCADE, blank=True, null=True)
    customer = models.ForeignKey(Customers, on_delete=models.CASCADE , blank=True, null=True)

    def __str__(self):
        return self.customer.name
 

class DictionaryProductName (models.Model):
    name =  models.CharField(max_length=200 )
    def __str__(self):
        return self.name
 
class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='order_items')
    dictionary = models.ForeignKey(DictionaryProductName ,on_delete=models.CASCADE )
    quantity = models.PositiveIntegerField()
    price = models.IntegerField(default=0)
    notes = models.ManyToManyField(Note, blank=True)
    cost =models.IntegerField(default=0)
    date_sold = models.DateField(auto_now_add=True)
    paid = models.BooleanField(default=False)

 
 

