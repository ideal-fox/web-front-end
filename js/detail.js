$(document).ready(function() {
	//写回答 
	$(".btn-answer").click(function(){
		var text=$('#a_text').val()
		var context={
			'text':text,
		}
		var id=$('#question_id').val()
		$.ajax({
			type: "POST",
			headers: {
				"X-CSRFToken": getCookie("csrftoken")
			},
			url: "/community/"+id+'/newanswer/',
			data: context,
			success: function(res) {
				window.location.replace('/community/'+res)
			},
		});
	})
	//关注
	$(".btn-follow").click(function(){
		var text=$(this).siblings("input").val()
		var context={
			'text':text,
		}
		var id=$('#question_id').val()
		$.ajax({
			type: "POST",
			headers: {
				"X-CSRFToken": getCookie("csrftoken")
			},
			url: "/community/follow/",
			data: context,
			success: function(res) {
				window.location.replace('/community/'+id)
			},
		});
	})	
	//取消关注
	$(".btn-cancelfollow").click(function(){
		var text=$(this).siblings("input").val()
		var context={
			'text':text,
		}
		var id=$('#question_id').val()
		$.ajax({
			type: "POST",
			headers: {
				"X-CSRFToken": getCookie("csrftoken")
			},
			url: "/community/unfollow/",
			data: context,
			success: function(res) {
				window.location.replace('/community/'+id)
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
