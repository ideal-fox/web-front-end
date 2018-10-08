from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Question(models.Model):
	pub_date=models.DateTimeField('date published')
	title=models.CharField(max_length=200)
	content=models.CharField(max_length=500)
	#提问者
	raiser=models.ForeignKey(User,on_delete=models.CASCADE)
	#answerer=models.ForeignKey(User,on_delete=models,CASCADE)
	def __str__(self):
		return self.content

class Answer(models.Model):
	content=models.CharField(max_length=1000)
	question=models.ForeignKey(Question,on_delete=models.CASCADE)
	answerer=models.ForeignKey(User,on_delete=models.CASCADE)
	def __str__(self):
		return self.content