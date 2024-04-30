from django.db import models

# Create your models here.



class MainStudent(models.Model):
    name = models.CharField(max_length=100)
    username = models.CharField(max_length=50, unique=True)
    class_field = models.CharField(max_length=50)
    password = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    stream = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=15)
    parents_mob_no = models.CharField(max_length=15)
    # Assuming subjects will be stored as comma-separated values or JSON
    subjects = models.TextField()
    teachers_assigned = models.ManyToManyField(
        'Teacher', related_name='students_assigned')


class Admin(models.Model):
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

class Teacher(models.Model):
    name = models.CharField(max_length=100)
    subject = models.CharField(max_length=100)
