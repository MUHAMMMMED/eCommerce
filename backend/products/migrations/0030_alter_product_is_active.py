# Generated by Django 4.1.5 on 2024-06-25 22:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0029_alter_product_images'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='is_active',
            field=models.BooleanField(default=False),
        ),
    ]
