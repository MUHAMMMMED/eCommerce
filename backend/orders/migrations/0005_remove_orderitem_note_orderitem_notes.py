# Generated by Django 4.1.5 on 2024-06-05 23:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cart', '0003_cartitem_notes'),
        ('orders', '0004_shipping_country_shipping_price_shipping_country_tax'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orderitem',
            name='note',
        ),
        migrations.AddField(
            model_name='orderitem',
            name='notes',
            field=models.ManyToManyField(blank=True, to='cart.note'),
        ),
    ]
