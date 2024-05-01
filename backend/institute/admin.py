from django.contrib import admin
from .models import User, Admin, Student, Teacher, StudentMark


class InstituteModelAdmin(admin.ModelAdmin):
    list_display = ("username", "created_at", "updated_at")
    search_fields = ("username",)
    list_per_page = 10


# Register your models here.
admin.site.register(User, InstituteModelAdmin)
admin.site.register(Admin)
admin.site.register(Student)
admin.site.register(Teacher)
admin.site.register(StudentMark)

