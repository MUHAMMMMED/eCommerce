# Generated by Django 4.1.5 on 2024-06-06 08:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0003_bestsellers'),
    ]

    operations = [
        migrations.CreateModel(
            name='FrequentlyAsked',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.TextField()),
                ('answer', models.TextField()),
                ('product', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='products.product')),
            ],
        ),
        migrations.AddField(
            model_name='category',
            name='top_slider_mobile',
            field=models.FileField(blank=True, null=True, upload_to='files/images/Item/%Y/%m/%d/'),
        ),
        migrations.AddField(
            model_name='category',
            name='top_slider_web',
            field=models.FileField(blank=True, null=True, upload_to='files/images/Item/%Y/%m/%d/'),
        ),
        migrations.DeleteModel(
            name='BestSellers',
        ),
    ]
