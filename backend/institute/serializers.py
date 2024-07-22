from rest_framework import serializers
from .models import (
    User,
    Admin,
    Student,
    Teacher,
    AttendanceChem11,
    AttendanceChem12,
    AttendanceCS11,
    AttendanceCS12,
    MarksChem11,
    MarksChem12,
    MarksCS11,
    MarksCS12,
    Lecture,
)


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


class MarksChem11Serializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = MarksChem11
        fields = "__all__"

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class MarksChem12Serializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = MarksChem12
        fields = "__all__"

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class MarksCS11Serializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = MarksCS11
        fields = "__all__"

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class MarksCS12Serializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = MarksCS12
        fields = "__all__"

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance




class LectureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lecture
        fields = ['id', 'title', 'subject', 'chapter', 'class_name', 'video']