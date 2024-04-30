from rest_framework import serializers
from .models import MainStudent

class MainStudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = MainStudent
        fields = '__all__'
