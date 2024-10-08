# Generated by Django 4.1.5 on 2024-06-20 01:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounting', '0004_remove_purchase_cost'),
    ]

    operations = [
        migrations.AddField(
            model_name='purchase',
            name='amount',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=10),
        ),
        migrations.AddField(
            model_name='purchase',
            name='cost',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=10),
        ),
    ]
