from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from usermanage.models import MyUser
from .models import Question,Answer


# Define an inline admin descriptor for MyUser model
# which acts a bit like a singleton
class MyUserInline(admin.StackedInline):
    model = MyUser
    can_delete = False
    verbose_name_plural = 'MyUsers'

# Define a new User admin
class UserAdmin(BaseUserAdmin):
    inlines = (MyUserInline, )
# Register your models here.
admin.site.register(Question)
admin.site.register(Answer)
admin.site.unregister(User)
admin.site.register(User,UserAdmin)
