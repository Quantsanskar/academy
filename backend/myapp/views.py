import json
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Aadmin, MainStudent
from rest_framework import generics, response, status
from rest_framework.views import APIView
from .serializers import (
    AdminSerializer,
    MainStudentSerializer,


)
class AadminListAPIView(generics.ListAPIView):
    serializer_class = AdminSerializer

    def get_queryset(self):
        return Aadmin.objects.all()


class MainStudentListAPIView(generics.ListCreateAPIView):
    serializer_class = MainStudentSerializer

    def get_queryset(self):
        return MainStudent.objects.all()

