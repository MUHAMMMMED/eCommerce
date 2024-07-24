# Generated by Django 4.1.5 on 2024-06-10 16:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cart', '0006_cartitem_total'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cartitem',
            name='total',
        ),
        migrations.AddField(
            model_name='cart',
            name='shipping',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
        migrations.AddField(
            model_name='cart',
            name='total',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
    ]
