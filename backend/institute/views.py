import json
from django.shortcuts import render
from django.http import JsonResponse

# from h11 import Response
from rest_framework import generics, response, status
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response
from rest_framework import status
from .utils import send_sms, send_email
from rest_framework.generics import RetrieveUpdateDestroyAPIView

from .models import (
    User,
    Admin,
    Student,
    Teacher,
    AttendanceChem11,
    AttendanceChem12,
    AttendanceCS11,
    AttendanceCS12,
)
from .serializers import (
    UserSerializer,
    AdminSerializer,
    StudentSerializer,
    TeacherSerializer,
    AttendanceChem11Serializer,
    AttendanceChem12Serializer,
    AttendanceCS11Serializer,
    AttendanceCS12Serializer,
)

from django.views.decorators.csrf import csrf_exempt

# Create your views here.


class UserListAPIView(generics.ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.all()

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return response.Response(serializer.data, status=status.HTTP_201_CREATED)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdminListAPIView(generics.ListAPIView):
    serializer_class = AdminSerializer

    def get_queryset(self):
        return Admin.objects.all()


# Changed to ListCreateAPIView for POST method
class StudentListAPIView(generics.ListCreateAPIView):
    serializer_class = StudentSerializer

    def get_queryset(self):
        return Student.objects.all()


class TeacherListAPIView(generics.ListCreateAPIView):
    serializer_class = TeacherSerializer

    def get_queryset(self):
        return Teacher.objects.all()


class AttendanceChem11ListAPIView(generics.ListCreateAPIView):
    serializer_class = AttendanceChem11Serializer

    def get_queryset(self):
        return AttendanceChem11.objects.all()

    def post(self, request):

        username = request.data.get("username")
        attendance_status = request.data.get("status")
        absent_date = request.data.get("absent_date")
        try:
            student = AttendanceChem11.objects.get(username=username)
            if attendance_status == "present":
                student.classes_attended = int(student.classes_attended)+1
                student.total_classes = int(student.total_classes)+1
            else:
                student.total_classes = int(student.total_classes)+1
                student.absent_days = int(student.absent_days)+1
                student.absent_date += f",{absent_date}"
            student.save()
            return JsonResponse(
                {"message": "Attendance updated successfully"}, status=200
            )
        except AttendanceChem11.DoesNotExist:
            return JsonResponse({"message": "Student not found"}, status=404)
        else:
            return JsonResponse({"message": "Invalid request method"}, status=405)


class AttendanceChem12ListAPIView(generics.ListCreateAPIView):
    serializer_class = AttendanceChem12Serializer

    def get_queryset(self):
        return AttendanceChem12.objects.all()

    def post(self, request):

        username = request.data.get("username")
        attendance_status = request.data.get("status")
        absent_date = request.data.get("absent_date")
        try:
            student = AttendanceChem12.objects.get(username=username)
            if attendance_status == "present":
                student.classes_attended = int(student.classes_attended)+1
                student.total_classes = int(student.total_classes)+1
            else:
                student.total_classes = int(student.total_classes)+1
                student.absent_days = int(student.absent_days)+1
                student.absent_date += f",{absent_date}"
            student.save()
            return JsonResponse(
                {"message": "Attendance updated successfully"}, status=200
            )
        except AttendanceChem12.DoesNotExist:
            return JsonResponse({"message": "Student not found"}, status=404)
        else:
            return JsonResponse({"message": "Invalid request method"}, status=405)


class AttendanceCS11ListAPIView(generics.ListCreateAPIView):
    serializer_class = AttendanceCS11Serializer

    def get_queryset(self):
        return AttendanceCS11.objects.all()

    def post(self, request):

        username = request.data.get("username")
        attendance_status = request.data.get("status")
        absent_date = request.data.get("absent_date")
        try:
            student = AttendanceCS11.objects.get(username=username)
            if attendance_status == "present":
                student.classes_attended = int(student.classes_attended)+1
                student.total_classes = int(student.total_classes)+1
            else:
                student.total_classes = int(student.total_classes)+1
                student.absent_days = int(student.absent_days)+1
                student.absent_date += f",{absent_date}"
            student.save()
            return JsonResponse(
                {"message": "Attendance updated successfully"}, status=200
            )
        except AttendanceCS11.DoesNotExist:
            return JsonResponse({"message": "Student not found"}, status=404)
        else:
            return JsonResponse({"message": "Invalid request method"}, status=405)


class AttendanceCS12ListAPIView(generics.ListCreateAPIView):
    serializer_class = AttendanceCS12Serializer

    def get_queryset(self):
        return AttendanceCS12.objects.all()

    def post(self, request):

        username = request.data.get("username")
        attendance_status = request.data.get("status")
        absent_date = request.data.get("absent_date")
        try:
            student = AttendanceCS12.objects.get(username=username)
            if attendance_status == "present":
                student.classes_attended = int(student.classes_attended)+1
                student.total_classes = int(student.total_classes)+1
            else:
                student.total_classes = int(student.total_classes)+1
                student.absent_days = int(student.absent_days)+1
                student.absent_date += f",{absent_date}"
            student.save()
            return JsonResponse(
                {"message": "Attendance updated successfully"}, status=200
            )
        except AttendanceCS12.DoesNotExist:
            return JsonResponse({"message": "Student not found"}, status=404)
        else:
            return JsonResponse({"message": "Invalid request method"}, status=405)


def authenticate_user(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data.get("username", "")
        password = data.get("password", "")

        # Fetch student from the database based on the username
        try:
            student = Student.objects.get(erpid=username)
        except Student.DoesNotExist:
            return JsonResponse({"error": "Invalid username"}, status=400)

        # Check if the password matches
        if student.password == password:
            return JsonResponse({"username": username}, status=200)
        else:
            return JsonResponse({"error": "Invalid password"}, status=400)


class SendSMSView(APIView):
    def post(self, request):
        phone_number = request.data.get("phone_number")
        message = request.data.get("message")
        if phone_number and message:
            send_sms(phone_number, message)
            return response.Response({"message": "SMS sent successfully"})
        else:
            return response.Response(
                {"error": "Invalid request data"}, status=status.HTTP_400_BAD_REQUEST
            )

    def get(self, request):
        phone_number = request.query_params.get("phone_number")
        message = request.query_params.get("message")
        if phone_number and message:
            send_sms(phone_number, message)
            return response.Response({"message": "SMS sent successfully"})
        else:
            return response.Response(
                {"error": "Invalid request data"}, status=status.HTTP_400_BAD_REQUEST
            )


class SendEmailView(APIView):

    def post(self, request):
        body = request.data.get("body")
        name = request.data.get("name")
        email = request.data.get("email")
        phone = request.data.get("phone")
        mail = (
            f"Message: {body} sent from {name}, mobile number: {phone}, email: {email}"
        )
        if mail:
            send_email(mail)
            return response.Response({"message": "Email sent successfully"})
        else:
            return response.Response(
                {"error": "Invalid request data"}, status=status.HTTP_400_BAD_REQUEST
            )

    def get(self, request):
        body = request.query_params.get("body")
        name = request.query_params.get("name")
        email = request.query_params.get("email")
        phone = request.query_params.get("phone")
        mail = (
            f"Message: {body} sent from {name}, mobile number: {phone}, email: {email}"
        )
        if mail:
            send_email(mail)
            return response.Response({"message": "Email sent successfully"})
        else:
            return response.Response(
                {"error": "Invalid request data"}, status=status.HTTP_400_BAD_REQUEST
            )
