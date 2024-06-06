from django.contrib import admin
from profiles.models import Profile, User

# Register your models here.

class UserAdmin(admin.ModelAdmin):
  list_display = ["username", "email"]

class ProfileAdmin(admin.ModelAdmin):
  list_display = ["id", "user", "first_name", "last_name", "phone_number"]

admin.site.register(User, UserAdmin)
admin.site.register(Profile, ProfileAdmin)