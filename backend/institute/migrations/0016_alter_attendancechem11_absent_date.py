# Generated by Django 5.0 on 2024-05-03 19:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('institute', '0015_attendancechem11_absent_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='attendancechem11',
            name='absent_date',
            field=models.CharField(default='[]', max_length=56),
        ),
    ]
