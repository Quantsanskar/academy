# Generated by Django 5.0 on 2024-07-21 11:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('institute', '0025_lectures'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lectures',
            name='video_url',
            field=models.URLField(max_length=500),
        ),
    ]
