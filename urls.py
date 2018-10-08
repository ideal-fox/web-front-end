from django.urls import path
from . import views

urlpatterns=[
	path('',views.index,name='index'),
	path('register/',views.register,name='register'),
	path('login/',views.mlogin,name='login'),
	path('logout/',views.mlogout,name='logout'),
	#详情页面
	path('follow/',views.follow,name='detail'),
	path('unfollow/',views.unfollow,name='detail'),
	path('<int:question_id>/',views.detail,name='detail'),
	path('<int:question_id>/newanswer/',views.newanswer,name='detail'),
	#发布问题
	path('publishquestion/',views.publishquestion,name='publishquestion')
]