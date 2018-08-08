var index = 0
var PICWIDTH = 640
var pic = $('#pic')
//见W#SCHOOL JSON数据表示法
var simData={
	date:1996,
	admin:'dasabi',
	data:[
		{'src':'images/0.jpg'},
		{'src':'images/1.jpg'},
		{'src':'images/2.jpg'},
		{'src':'images/3.jpg'},
		{'src':'images/4.jpg'},
	],
}
//JSON

//注意区别两种 .each()调用方式    jq对象.each(function(index,value){})和 $.each(jq对象,function(key,value)) 无需考虑闭包
//注意回调函数中的 value 或者this等 代表的都是原生JS对象，又叫DOM对象，在JQUERY中使用时需要将DOM对象转化成JQ对象才可以使用，如$(value),$(this)



//根据后台数据动态添加DOM
function addHTML(){
		$.each(simData.data,function(key,value){
			//两次添加都牵扯到JQUERY链式调用
			//添加图片
			$('<li>').append($('<img>').attr('src',value.src)).appendTo(pic)
			//添加按钮
			$('<li>').append($('<a>').attr('href','javascript:').addClass('nav_btn').addClass('nav_btn_'+key)).appendTo($('#nav'))
		})
}

function showpic(ind) {
	    if (ind == -1) {
	    	ind=simData.data.length-1
            index = simData.data.length-1
        }
        if (ind == simData.data.length) {
        	ind=0
            index = 0
        }
        //区别于JS  dom.style.XXX
    pic.css('margin-left',-ind * PICWIDTH +'px')

}

function shownav(ind) {
    var nav = $('.nav_btn')
        //清除先前的active
	$('.nav_btn').each(function(event){
		//增加类 删除类函数 removeClass addClass
	$(this).removeClass('active')
	})
	//jq对象(数组).eq() 相当于js里的.item()
	nav.eq(ind).addClass('active')
}

function setbtn(){
	$('#leftbtn').on('click',function(event){
		index--;
  
        showpic(index)
        shownav(index)
	})
	$('#rightbtn').on('click',function(event){
		index++;
  
        showpic(index)
        shownav(index)
	})
	//底部导航
	$('.nav_btn').each(function(ind,value){
		$(value).on('click',function(event){
			//清除原有的active类
			$('.nav_btn').each(function(){
				$(this).removeClass('active')
			})
			//给当前点击的按钮增加active类并修改边距
			index=ind
			pic.css('margin-left',-ind * PICWIDTH + 'px')
			$(value).addClass('active')
		})
	})   
}



$(window).on('load',function(){
	addHTML();
	setbtn();
	    showpic(index)
        shownav(index)
	    setInterval(function(){
    	index++
    	showpic(index)
    	shownav(index)
    },3000)
})
