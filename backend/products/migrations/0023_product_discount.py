# Generated by Django 4.1.5 on 2024-06-21 16:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0022_category_home_image_category_is_active'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='discount',
            field=models.FloatField(blank=True, default=0, null=True),
        ),
    ]
