# Generated by Django 4.2.11 on 2024-05-04 06:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('institute', '0021_remove_markschem11_title_remove_markschem12_title_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='markschem11',
            name='title',
            field=models.CharField(default='unknown', max_length=56),
        ),
        migrations.AddField(
            model_name='markschem12',
            name='title',
            field=models.CharField(default='unknown', max_length=56),
        ),
        migrations.AddField(
            model_name='markscs11',
            name='title',
            field=models.CharField(default='unknown', max_length=56),
        ),
        migrations.AddField(
            model_name='markscs12',
            name='title',
            field=models.CharField(default='unknown', max_length=56),
        ),
    ]
