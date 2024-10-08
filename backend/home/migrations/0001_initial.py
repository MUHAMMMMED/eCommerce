# Generated by Django 4.1.5 on 2024-06-06 08:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('products', '0004_frequentlyasked_category_top_slider_mobile_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='CategoryList',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('image', models.FileField(blank=True, null=True, upload_to='files/images/Item/%Y/%m/%d/')),
                ('link', models.CharField(max_length=300)),
            ],
        ),
        migrations.CreateModel(
            name='GroupProduct',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('link', models.CharField(max_length=300)),
                ('big_image', models.FileField(blank=True, null=True, upload_to='files/images/Item/%Y/%m/%d/')),
                ('image1', models.FileField(blank=True, null=True, upload_to='files/images/Item/%Y/%m/%d/')),
                ('image2', models.FileField(blank=True, null=True, upload_to='files/images/Item/%Y/%m/%d/')),
                ('image3', models.FileField(blank=True, null=True, upload_to='files/images/Item/%Y/%m/%d/')),
            ],
        ),
        migrations.CreateModel(
            name='Info',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('keywords', models.CharField(blank=True, max_length=300, null=True)),
                ('FaviconIco', models.FileField(blank=True, null=True, upload_to='files/images/FaviconIco/%Y/%m/%d/')),
                ('logo', models.FileField(blank=True, null=True, upload_to='files/images/logo/%Y/%m/%d/')),
                ('title', models.CharField(blank=True, max_length=100, null=True)),
                ('PHONE', models.CharField(blank=True, max_length=15, null=True)),
                ('Whatsapp', models.CharField(blank=True, max_length=15, null=True)),
                ('linkedin', models.CharField(blank=True, max_length=500, null=True)),
                ('snapchat', models.CharField(blank=True, max_length=300, null=True)),
                ('instagram', models.CharField(blank=True, max_length=300, null=True)),
                ('Twitter', models.CharField(blank=True, max_length=300, null=True)),
                ('facebook', models.CharField(blank=True, max_length=300, null=True)),
                ('Map_Address', models.CharField(blank=True, max_length=300, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='QuestionsGeneral',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.TextField()),
                ('answer', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='RateGeneral',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now=True)),
                ('message', models.TextField(blank=True, null=True)),
                ('rate_number', models.IntegerField(default=0)),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Slide',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('top_slider_web', models.FileField(blank=True, null=True, upload_to='files/images/Item/%Y/%m/%d/')),
                ('top_slider_mobile', models.FileField(blank=True, null=True, upload_to='files/images/Item/%Y/%m/%d/')),
                ('is_active', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='Deal',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('big_deal', models.BooleanField(default=False)),
                ('product', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='products.product')),
            ],
        ),
        migrations.CreateModel(
            name='BestSellers',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='products.product')),
            ],
        ),
    ]
