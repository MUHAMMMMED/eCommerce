# Generated by Django 4.1.5 on 2024-06-20 01:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounting', '0003_expense_purchase'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='purchase',
            name='cost',
        ),
    ]
