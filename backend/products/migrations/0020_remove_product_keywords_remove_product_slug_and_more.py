# Generated by Django 4.1.5 on 2024-06-20 00:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0019_product_cost'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='keywords',
        ),
        migrations.RemoveField(
            model_name='product',
            name='slug',
        ),
        migrations.RemoveField(
            model_name='themeone',
            name='discount',
        ),
        migrations.RemoveField(
            model_name='themeone',
            name='price',
        ),
        migrations.RemoveField(
            model_name='themethree',
            name='discount',
        ),
        migrations.RemoveField(
            model_name='themethree',
            name='price',
        ),
        migrations.RemoveField(
            model_name='themetwo',
            name='discount_price1',
        ),
        migrations.RemoveField(
            model_name='themetwo',
            name='discount_price2',
        ),
        migrations.RemoveField(
            model_name='themetwo',
            name='discount_price3',
        ),
        migrations.RemoveField(
            model_name='themetwo',
            name='discount_price4',
        ),
        migrations.RemoveField(
            model_name='themetwo',
            name='discount_price5',
        ),
        migrations.RemoveField(
            model_name='themetwo',
            name='quantity1',
        ),
        migrations.RemoveField(
            model_name='themetwo',
            name='quantity2',
        ),
        migrations.RemoveField(
            model_name='themetwo',
            name='quantity3',
        ),
        migrations.RemoveField(
            model_name='themetwo',
            name='quantity4',
        ),
        migrations.RemoveField(
            model_name='themetwo',
            name='quantity5',
        ),
        migrations.AddField(
            model_name='product',
            name='expiration_date_offer',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='product',
            name='stock_alarm',
            field=models.IntegerField(default=0),
        ),
    ]
