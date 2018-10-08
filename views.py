from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect,Http404
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.utils import timezone
from community.models import Question,Answer
from usermanage.models import MyUser
from django.dispatch import receiver
from django.db.models.signals import post_save
# Create your views here.

def index(req):
	question = Question.objects.all()[:5]
	context={
		'question_list':question,
		'is_authenticated':'false',
    }
	if req.user.is_authenticated:
		context['is_authenticated']='true'
		context['user']=req.user
	return render(req,'community/index.html',context)

def register(req):
	username=req.POST['username']
	password=req.POST['password']
	email=req.POST['email']
	response=HttpResponse()
	#查重
	a=User.objects.filter(username=username)
	print(a)
	if len(a):
		return HttpResponse('error')
	else:
		u=User(username=username,email=email)
		u.set_password(password)
		u.save()
		m = MyUser(user = u)
		m.save()
		return HttpResponse('success')
def mlogin(req):
	username=req.POST['username']
	password=req.POST['password']
	user=authenticate(req,username=username,password=password)
	if user is not None:

		login(req,user)
		return HttpResponse('success')

	else:
		return HttpResponse('error')

@login_required(login_url='/community/')
def mlogout(req):
	logout(req)
	return HttpResponseRedirect('/community/')

@login_required(login_url='/community/')
def detail(req,question_id):
	try:
		question = Question.objects.get(pk=question_id)
		m = req.user.myuser
		a = m.follower.all()
#消息提醒
		mod = m.bell.filter(question_id = question_id)
		#get the first element of mod
		
		if len(mod) == 0:
			m.bell_flag = False
		else:
			m.bell_flag = True
			mod=mod[0]
			m.bell.remove(mod)
#消息提醒完毕
		for item in question.answer_set.all() :
			b = m.follower.filter(user_id = item.answerer.id)
			if len(b) == 0 :
				item.answerer.myuser.follow_flag = False
			else:
				item.answerer.myuser.follow_flag = True
			item.answerer.myuser.save()
		context={
    	'question':question,
    	'answers':question.answer_set.all()
    	}
		if req.user.is_authenticated:
			context['is_authenticated']='true'
			context['user']=req.user
		return render(req,'community/detail.html',context)
	except Question.DoesNotExist:
		raise Http404("Question does not exist")
    

@login_required(login_url='/community/')
def publishquestion(req):
	content=req.POST['text']
	title=req.POST['title']
	q=Question()
	q.content=content
	q.title=title
	q.raiser=req.user
	q.pub_date=timezone.now()
	q.save()
	return HttpResponse(q.pk)

def newanswer(req,question_id):
	content=req.POST['text']
	try:
		question = Question.objects.get(pk=question_id)
		answer = Answer()
		answer.content = content
		answer.answerer = req.user
		answer.question = question
		answer.save()
		return HttpResponse(question_id)
	except Question.DoesNotExist:
		raise Http404("Question does not exist")

@receiver(post_save, sender=Answer, dispatch_uid="answer_post_save")
def my_model_handler(sender, **kwargs):
	answer = kwargs["instance"]
	raiser = answer.question.raiser
	raiser.myuser.bell.add(answer)

def follow(req):
	id_get = req.POST['text']
	user = User.objects.get(id = id_get)
	follower = req.user
	follower.myuser.follower.add(user.myuser)
	follower.save()
	return HttpResponse("followed")

def unfollow(req):
	id_get = req.POST['text']
	user = User.objects.get(id = id_get)
	unfollower = req.user
	unfollower.myuser.follower.remove(user.myuser)
	unfollower.save()
	return HttpResponse("removed")
