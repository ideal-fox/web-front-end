function waterfall(){
	//每张图片宽度
	var picw=$('#main>div:first').outerWidth()+20;
	//根据视窗宽度和单个图片宽度求出应该显示几列
	var cols=Math.floor($(window).width()/picw);
	//根据列数和单个图片宽度设置包裹容器的宽度并居中
	$('#main').width(cols*picw).css('margin','0 auto')
	//一、开始进行图片的瀑布流布局
			//获取6列的高度存入heightArr中
			var heightArr=new Array();
			var pics=$('#main>div')
			pics.each(function(index,value){
				//前六个
				if(index<cols){
					var h=pics.eq(index).outerHeight()+20;
					heightArr.push(h);
				}
				//从第七张开始判断最短的列并且把图片放到这列上
				else{
					var minHeight=Math.min.apply(null,heightArr); 				//a->add(m,n),b 			a.add.apply(b,1,2) 	a.add(1,2)
					var minIndex=$.inArray(minHeight,heightArr);	//求出最小高度所在的列数（即对应的数组下标）
					$(value).css({
						"position":'absolute',
						"left":minIndex*picw+'px',
						"top":minHeight+'px',
					});
					//更新保存列高度的数组
					heightArr[minIndex]+=$(value).outerHeight()+20;
				}
			})
}//waterfall()

//检查是否满足加载条件，如果最后一张图片的顶端露出来则进行加载,判断条件为 视窗高度+滚动高度>图片离文档顶端高度
function checkSlide(){
	//取最后一张图片
	var lastbox=$('#main>div').last();
	//最后一张图片距离文档顶端的高度
	var lastpicH=lastbox.offset().top;
	//滚动高度
	var scrollTop=$(window).scrollTop();
	//视窗高度
	var documentH=$(window).height();
	return (lastpicH<scrollTop+documentH)?true:false;
}

//程序运行主体
$(window).on('load',function(){
	waterfall();
	//二、随着下拉加载新图片
		//后台模拟JSON数据
	var dataInt={"data":[{"src":"0.jpg"},{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"},{"src":"6.jpg"},{"src":"7.jpg"},{"src":"8.jpg"},{"src":"9.jpg"},{"src":"10.jpg"},{"src":"11.jpg"},{"src":"12.jpg"},{"src":"13.jpg"},{"src":"14.jpg"},{"src":"15.jpg"},{"src":"16.jpg"},{"src":"17.jpg"},{"src":"18.jpg"},{"src":"19.jpg"},{"src":"20.jpg"},{"src":"21.jpg"},{"src":"22.jpg"}]};
	$(window).on('scroll',function(){
		if(checkSlide()){
		$.each(dataInt.data,function(key,value){
			//产生新div包裹img,div增加类pic，img增加属性src,值为后台数据中的对应的src.
		$('<div>').addClass('pic').append($('<img>').attr('src',$(value).attr('src'))).appendTo($('#main'))
		//增加新图片后重新瀑布流布局
		waterfall();
		})
		}
	})

})
