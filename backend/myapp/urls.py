from django.urls import path
from .views import (
    AdminListAPIView,
    MainStudentListAPIView,
)

urlpatterns = [
    path("admin", AdminListAPIView.as_view(), name="Admin"),
    path("mainstudent", MainStudentListAPIView.as_view(), name="mainstudent"),
]
