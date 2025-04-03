# Generated by Django 5.0.11 on 2025-04-03 11:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0005_delete_profile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='image',
            field=models.URLField(max_length=500),
        ),
        migrations.AlterField(
            model_name='recipe',
            name='main_image',
            field=models.URLField(blank=True, max_length=500, null=True),
        ),
    ]
