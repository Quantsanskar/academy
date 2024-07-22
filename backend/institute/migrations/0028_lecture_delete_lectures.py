# Generated by Django 5.0 on 2024-07-22 07:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('institute', '0027_remove_lectures_video_url_lectures_video'),
    ]

    operations = [
        migrations.CreateModel(
            name='Lecture',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('subject', models.CharField(max_length=100)),
                ('chapter', models.CharField(max_length=100)),
                ('class_name', models.CharField(max_length=10)),
                ('video', models.FileField(blank=True, null=True, upload_to='lectures/')),
            ],
        ),
        migrations.DeleteModel(
            name='Lectures',
        ),
    ]
