# Generated by Django 5.0.6 on 2024-07-01 12:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounting', '0009_delete_shippingcompany_balance_monthlyadbudget_name'),
    ]

    operations = [
        migrations.DeleteModel(
            name='StripeFee',
        ),
    ]
