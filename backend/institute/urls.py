from django.urls import path
from .views import (
    UserListAPIView,
    AdminListAPIView,
    StudentListAPIView,
    TeacherListAPIView,
    AttendanceChem11ListAPIView,
    AttendanceChem12ListAPIView,
    AttendanceCS11ListAPIView,
    AttendanceCS12ListAPIView,
    SendSMSView,
    SendEmailView,
    MarksChem11ListAPIView,
    MarksChem12ListAPIView,
    MarksCS11ListAPIView,
    MarksCS12ListAPIView,
)


urlpatterns = [
    path("user", UserListAPIView.as_view(), name="user"),
    path("admin", AdminListAPIView.as_view(), name="admin"),
    path("student", StudentListAPIView.as_view(), name="student"),
    path("teacher", TeacherListAPIView.as_view(), name="teacher"),
    path(
        "attendancechem11",
        AttendanceChem11ListAPIView.as_view(),
        name="AttendanceChem11",
    ),
    path(
        "attendancechem12",
        AttendanceChem12ListAPIView.as_view(),
        name="AttendanceChem12",
    ),
    path("attendancecs11", AttendanceCS11ListAPIView.as_view(), name="AttendanceCS11"),
    path("attendancecs12", AttendanceCS12ListAPIView.as_view(), name="AttendanceCS12"),
    path("markschem11", MarksChem11ListAPIView.as_view(), name="MarksChem11"),
    path("markschem12", MarksChem12ListAPIView.as_view(), name="MarksChem12"),
    path("markscs11", MarksCS11ListAPIView.as_view(), name="MarksCS11"),
    path("markscs12", MarksCS12ListAPIView.as_view(), name="MarksCS12"),
    path("send-sms-request/", SendSMSView.as_view(), name="send_sms"),
    path("send-email/", SendEmailView.as_view(), name="send-email"),
]
