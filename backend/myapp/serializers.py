from rest_framework import serializers
from .models import Aadmin, MainStudent

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aadmin
        fields = "__all__"

class MainStudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = MainStudent
        fields = "__all__"