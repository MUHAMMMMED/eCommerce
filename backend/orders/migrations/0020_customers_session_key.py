# Generated by Django 4.1.5 on 2024-06-18 23:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0019_customers'),
    ]

    operations = [
        migrations.AddField(
            model_name='customers',
            name='session_key',
            field=models.CharField(default='', max_length=100),
            preserve_default=False,
        ),
    ]
