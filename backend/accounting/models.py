from django.db import models
 
class SoldProduct(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField()
    date_sold = models.DateField()
    def __str__(self):
        return self.name
 
 
class MonthlyAdBudget(models.Model):
    name = models.CharField(max_length=255)
    initial_balance = models.IntegerField(default=0)
    final_balance = models.IntegerField(default=0)
    added_amount = models.IntegerField(default=0)
    month = models.DateField()
    def __str__(self):
        return self.name
     
class Package(models.Model):
    image = models.FileField(upload_to="files/images/Item/%Y/%m/%d/", blank=True, null=True)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    quantity = models.PositiveIntegerField()
    stock_alarm = models.IntegerField(default=0)
    def __str__(self):
        return f'{self.name} - {self.quantity} units'

    @property
    def is_empty(self):
        return self.quantity == 0




class Expense(models.Model):
    description = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    expense_date = models.DateField(auto_now_add=True)
    def __str__(self):
        return f'{self.description} - ${self.amount} '
    
 
class Purchase(models.Model):
    product_name = models.CharField(max_length=255)
    quantity = models.PositiveIntegerField()
    cost = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    purchase_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f'{self.product_name} - {self.quantity} units - ${self.cost}'
