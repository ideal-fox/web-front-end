$(document).ready(function() {
	//给所有按钮添加功能
	//登陆按钮
	$(".btn-login").click(function() {
		//收集表单
		var username = $("#username").val()
		var password = $("#password").val()
		//ajax
		var context = {
			'username': username,
			'password': password,
		}
		//准备post
		var csrftoken = getCookie('csrftoken');
		console.log(csrftoken)
		$.ajax({
			type: "POST",
			url: "/community/login/",
			headers: {
				"X-CSRFToken": getCookie("csrftoken")
			},
			data: context,
			success: function(res) {
				if(res=='success'){
				window.location.replace('/community/')
				}
				else{
				$(".alert-loginerror").removeClass('hide').addClass('show')
				}
			},

		});
	})
	//注册
	$(".btn-reg").click(function() {
		//收集表单
		var username = $("#username_sub").val()
		var password = $("#password_sub").val()
		var email = $("#email_sub").val()
		//ajax
		var context = {
			'username': username,
			'password': password,
			'email': email
		}
		//准备post
		var csrftoken = getCookie('csrftoken');
		$.ajax({
			type: "POST",
			headers: {
				"X-CSRFToken": getCookie("csrftoken")
			},
			url: "/community/register/",
			data: context,
			success: function(res) {
				if(res=='success'){
				window.location.replace('/community/')
				}
				else{
				$(".alert-regerror").removeClass('hide').addClass('show')
				}
			},
		});
	})
	//写文章
	$(".btn-newquestion").click(function(){
		var title=$('#q_name').val()
		var text=$('#q_text').val()
		var context={
			'text':text,
			'title':title,
		}
		$.ajax({
			type: "POST",
			headers: {
				"X-CSRFToken": getCookie("csrftoken")
			},
			url: "/community/publishquestion/",
			data: context,
			success: function(res) {
				window.location.replace('/community/'+res)
			},
		});
	})


})


function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
