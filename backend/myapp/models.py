from django.db import models
from django.template.defaultfilters import slugify
from django import forms


class Admin(models.Model):
    name = models.CharField(max_length=100)
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    mobno = models.CharField(max_length=15)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.username

    class Meta:
        ordering = ("created_at",)


class MainStudent(models.Model):
    name = models.CharField(max_length=100)
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    subjects = models.CharField(max_length=100)
    mobno = models.CharField(max_length=15)
    parentsmobno = models.CharField(max_length=15)
    email = models.EmailField(max_length=100)
    class_field = models.CharField(max_length=100)
    timings = models.CharField(max_length=100)
    feestatus = models.CharField(max_length=100)
    totalclass = models.IntegerField()
    attclass = models.IntegerField()
    teachers = models.CharField(max_length=100)
