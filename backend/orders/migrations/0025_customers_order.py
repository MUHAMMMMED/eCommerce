# Generated by Django 4.1.5 on 2024-06-23 00:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0024_alter_customers_ip_region_alter_customers_ip_city_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='customers',
            name='order',
            field=models.ManyToManyField(blank=True, null=True, to='orders.order'),
        ),
    ]
