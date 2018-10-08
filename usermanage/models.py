from django.db import models
from django.contrib.auth.models import User
from community.models import Answer

# Create your models here.
class MyUser(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE)
	follower = models.ManyToManyField("self",blank = True,symmetrical=False)
	follow_flag = models.BooleanField(default = False)
	bell = models.ManyToManyField(Answer,blank = True,symmetrical=False)


