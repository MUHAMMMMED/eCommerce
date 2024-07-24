# Generated by Django 4.1.5 on 2024-06-27 01:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounting', '0006_remove_package_created_at_remove_package_updated_at_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='package',
            name='package_type',
        ),
        migrations.AddField(
            model_name='package',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='package',
            name='image',
            field=models.FileField(blank=True, null=True, upload_to='files/images/Item/%Y/%m/%d/'),
        ),
        migrations.AddField(
            model_name='package',
            name='name',
            field=models.CharField(default='', max_length=255),
            preserve_default=False,
        ),
        migrations.DeleteModel(
            name='PackageType',
        ),
    ]
