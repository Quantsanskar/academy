from django.urls import path
from .views import (
    AadminListAPIView,
    MainStudentListAPIView,
    
)
urlpatterns = [
    path("admin", AadminListAPIView.as_view(), name="admin"),
    path("mainstudent", MainStudentListAPIView.as_view(), name="mainstudent"),

]