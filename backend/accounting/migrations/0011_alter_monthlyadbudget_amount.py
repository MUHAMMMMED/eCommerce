# Generated by Django 5.0.6 on 2024-07-03 11:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounting', '0010_delete_stripefee'),
    ]

    operations = [
        migrations.AlterField(
            model_name='monthlyadbudget',
            name='amount',
            field=models.IntegerField(default=0),
        ),
    ]
