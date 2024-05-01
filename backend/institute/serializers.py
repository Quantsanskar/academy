from rest_framework import serializers
from .models import User, Admin, Student, Teacher, StudentMark


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = "__all__"


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = "__all__"


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = "__all__"

class StudentMarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentMark
        fields = "__all__"
