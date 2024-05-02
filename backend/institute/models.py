from django.db import models
from django.template.defaultfilters import slugify
from django import forms


# Create your models here.


class User(models.Model):
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("created_at",)

    def __str__(self):
        return self.username


class Admin(models.Model):
    email = models.EmailField(max_length=250)
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=50)


class Student(models.Model):
    name = models.CharField(max_length=56, null=False)
    username = models.CharField(max_length=56, null=False)
    password = models.CharField(max_length=50, default="password", null=False)
    clas = models.CharField(max_length=56, null=False)
    stream = models.CharField(max_length=56, null=False)
    subjects = models.TextField(max_length=256, null=False)
    mobile = models.CharField(max_length=13, null=False, default="+91")
    par_mobile = models.CharField(max_length=13, null=False, default="+91")
    email = models.EmailField(max_length=254, null=False)


class Teacher(models.Model):
    name = models.CharField(max_length=56, null=False, default="unknown")
    subject = models.CharField(max_length=56, null=False, default="unknown")
    experience=models.CharField(max_length=56, null=False, default="unknown")
    institutes=models.CharField(max_length=56, null=False, default="unknown")
    achievements=models.CharField(max_length=56, null=False, default="unknown")
    classes_assigned = models.CharField(max_length=56, null=False, default="unknown")

