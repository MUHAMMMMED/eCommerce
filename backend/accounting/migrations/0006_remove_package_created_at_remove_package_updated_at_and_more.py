# Generated by Django 4.1.5 on 2024-06-20 12:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounting', '0005_purchase_amount_purchase_cost'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='package',
            name='created_at',
        ),
        migrations.RemoveField(
            model_name='package',
            name='updated_at',
        ),
        migrations.AddField(
            model_name='package',
            name='stock_alarm',
            field=models.IntegerField(default=0),
        ),
    ]
