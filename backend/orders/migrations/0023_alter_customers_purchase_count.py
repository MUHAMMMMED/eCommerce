# Generated by Django 4.1.5 on 2024-06-22 13:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0022_order_package'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customers',
            name='purchase_count',
            field=models.PositiveIntegerField(blank=True, default=0, null=True),
        ),
    ]
