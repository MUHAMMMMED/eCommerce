from django.db import models
from products.models import Product

class Note(models.Model):
    note  = models.TextField()
    def __str__(self):
        return self.note

class Cart(models.Model):
    session_id = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    total = models.DecimalField(max_digits=10, decimal_places=2,default=0)
    def __str__(self):
        return self.session_id

 
class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField( null=True, blank=True )
    notes = models.ManyToManyField(Note, blank=True )
    def __str__(self):
        return self.cart.session_id


 
 