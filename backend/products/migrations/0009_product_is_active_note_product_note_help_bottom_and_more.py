# Generated by Django 4.1.5 on 2024-06-08 20:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0008_product_discount_price1_product_discount_price2_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='is_active_note',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='product',
            name='note_help_bottom',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
        migrations.AddField(
            model_name='product',
            name='note_help_top',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]
