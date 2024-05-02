from rest_framework import serializers
from .models import User, Admin, Student, Teacher, AttendanceChem11 , AttendanceChem12 , AttendanceCS11 , AttendanceCS12


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

class AttendanceChem11Serializer(serializers.ModelSerializer):

    class Meta:
        model = AttendanceChem11
        fields = "__all__"
class AttendanceChem11Serializer(serializers.ModelSerializer):

    class Meta:
        model = AttendanceChem11
        fields = "__all__"
class AttendanceChem12Serializer(serializers.ModelSerializer):

    class Meta:
        model = AttendanceChem12
        fields = "__all__"
class AttendanceCS11Serializer(serializers.ModelSerializer):

    class Meta:
        model = AttendanceCS11
        fields = "__all__"
class AttendanceCS12Serializer(serializers.ModelSerializer):

    class Meta:
        model = AttendanceCS12
        fields = "__all__"

