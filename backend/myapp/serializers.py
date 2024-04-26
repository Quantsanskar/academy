from rest_framework import serializers
from .models import Admin, MainStudent


class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = "__all__"


class MainStudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = MainStudent
        fields = "__all__"
