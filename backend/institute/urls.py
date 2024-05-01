from django.urls import path
from .views import (
    UserListAPIView,
    AdminListAPIView,
    StudentListAPIView,
    TeacherListAPIView,
    MarksListAPIView,
    SendSMSView,
    SendEmailView,
)


urlpatterns = [
    path("user", UserListAPIView.as_view(), name="user"),
    path("admin", AdminListAPIView.as_view(), name="admin"),
    path("student", StudentListAPIView.as_view(), name="student"),
    path("teacher", TeacherListAPIView.as_view(), name="teacher"),
    path("marks", MarksListAPIView.as_view(), name="marks"),
    path("send-sms-request/", SendSMSView.as_view(), name="send_sms"),
    path("send-email/", SendEmailView.as_view(), name="send-email"),
]
