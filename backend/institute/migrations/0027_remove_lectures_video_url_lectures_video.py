# Generated by Django 5.0 on 2024-07-21 13:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('institute', '0026_alter_lectures_video_url'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='lectures',
            name='video_url',
        ),
        migrations.AddField(
            model_name='lectures',
            name='video',
            field=models.FileField(blank=True, null=True, upload_to='lectures/'),
        ),
    ]