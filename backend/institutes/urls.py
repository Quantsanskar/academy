from django.urls import path
from .views import MainStudentListCreate, MainStudentRetrieveUpdateDestroy
from .views import index_view  # Import the view you want to use for the root path
urlpatterns = [
    path('', index_view, name='index'),  # Define a path for the root URL
    path('mainstudents/', MainStudentListCreate.as_view(),
         name='mainstudent-list-create'),
    path('mainstudents/<int:pk>/', MainStudentRetrieveUpdateDestroy.as_view(),
         name='mainstudent-retrieve-update-destroy'),
]
