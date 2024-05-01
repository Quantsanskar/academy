# Generated by Django 5.0 on 2024-04-12 06:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('institute', '0007_alter_student_mobile'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='teacher',
            name='class_assigned',
        ),
        migrations.AddField(
            model_name='teacher',
            name='classes_assigned',
            field=models.CharField(default='unknown', max_length=56),
        ),
        migrations.AddField(
            model_name='teacher',
            name='experience',
            field=models.CharField(default='unknown', max_length=56),
        ),
        migrations.AddField(
            model_name='teacher',
            name='institutes',
            field=models.CharField(default='unknown', max_length=56),
        ),
        migrations.AlterField(
            model_name='teacher',
            name='name',
            field=models.CharField(default='unknown', max_length=56),
        ),
        migrations.AlterField(
            model_name='teacher',
            name='subject',
            field=models.CharField(default='unknown', max_length=56),
        ),
    ]
