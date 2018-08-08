var index = 0
var PICWIDTH = 640
var pic = document.getElementById('pic')
//----图片跟随和按钮跟随用函数定义

function showpic(ind) {
	    if (ind == -1) {
	    	ind=5
            index = 5
        }
        if (ind == 6) {
        	ind=0
            index = 0
        }
    pic.style.marginLeft = -ind * PICWIDTH + 'px'

}

function shownav(ind) {
    var nav = document.getElementsByClassName('nav_btn')
        //清除先前的active
    for (var n = 0; n < nav.length; n++) {
        nav[n].className = nav[n].className.replace(/\s*active\s*/, '')
    }
    nav[ind].className += ' active'
}



//----定义区域结束
function setbtn() {
    var leftbtn = document.getElementById('leftbtn')
    var rightbtn = document.getElementById('rightbtn')

    //左右切换按钮
    leftbtn.addEventListener('click', function(event) {

        index--;
  
        showpic(index)
        shownav(index)

    })
    rightbtn.addEventListener('click', function(event) {
            index++;
  
            showpic(index)
            shownav(index)
        })
        //切换按钮结束

    function setnav() {

        //底部导航按钮事件添加

        var nav = document.getElementsByClassName('nav_btn')
        console.log(nav)
        for (var i = 0; i < nav.length; i++) {

            nav[i].addEventListener('click', (function(fixed) {

                return function(event) {

                    //清除先前的active
                    for (var n = 0; n < nav.length; n++) {
                        nav[n].className = nav[n].className.replace(/\s*active\s*/, '')
                    }

                    //增加新active并改变pic的边距
                    index=fixed
                    pic.style.marginLeft = -fixed * PICWIDTH + 'px'
                    this.className += ' active'
                }
            })(i))
        }

    }
    //调用给导航添加功能的函数
    setnav()
}

window.onload = function() {
    setbtn();
    setInterval(function(){
    	index++
    	showpic(index)
    	shownav(index)
    },3000)
}
