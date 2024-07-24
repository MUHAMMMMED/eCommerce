# Generated by Django 5.0.6 on 2024-07-01 13:32

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0030_remove_orderitem_product_alter_orderitem_price'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderitem',
            name='date_sold',
            field=models.DateField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='orderitem',
            name='name',
            field=models.CharField(default='', max_length=255),
            preserve_default=False,
        ),
    ]
