# Generated by Django 4.1.5 on 2024-06-04 17:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0002_country_dictionary_shipping_country_order_ip_region_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='country',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='orders.shipping_country'),
            preserve_default=False,
        ),
    ]
