from django.shortcuts import render
from rest_framework import generics
from .models import MainStudent
from .serializers import MainStudentSerializer
from django.http import HttpResponse


class MainStudentListCreate(generics.ListCreateAPIView):
    queryset = MainStudent.objects.all()
    serializer_class = MainStudentSerializer


class MainStudentRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = MainStudent.objects.all()
    serializer_class = MainStudentSerializer


def index_view(request):
    # Customize this response as needed
    return HttpResponse("Welcome to my Django backend!")
