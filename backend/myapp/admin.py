from django.contrib import admin
from .models import Admin, MainStudent


class InstituteModelAdmin(admin.ModelAdmin):
    list_display = ("username", "created_at", "updated_at")
    search_fields = ("username",)
    list_per_page = 10


admin.site.register(Admin, InstituteModelAdmin)
admin.site.register(MainStudent)
