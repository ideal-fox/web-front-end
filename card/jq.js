var data={img:[{"src":"img/0.jpg"},{"src":"img/1.jpg"},{"src":"img/2.jpg"},{"src":"img/3.jpg"},{"src":"img/4.jpg"},{"src":"img/5.jpg"},{"src":"img/6.jpg"},{"src":"img/7.jpg"},{"src":"img/8.jpg"},{"src":"img/9.jpg"},{"src":"img/10.jpg"}]};
var linewid=200;
var widthsum=new Array(4);
//最小数索引
function Smallest() {
 	var lowest = 0;
 	for (var i = 1; i < widthsum.length; i++) {
 		 if (widthsum[i] < widthsum[lowest]) lowest = i;
 	}
 	return lowest;
}
//按钮点击事件
function CardGame(){
	var btn=$(".btn");
	btn.on('click',function(index,value){
		
		$(".fapai").css({
			"z-index":10,
			"transform":"scale(1.2,1.2)",
			"transition":0.5+"s",

		})

		var m_pic=document.createElement('img');
			m_pic.src=data.img[Math.floor(Math.random()*10)].src;
		var m_div=document.createElement('div')	;	
			$(m_div).css({
				"top":"100%",
				"left":1.5*linewid+"px",
			});
			//分隔css样式改变
			setTimeout(function() {
				$(m_div).css({
					"z-index": 2,
					"left":Smallest()*linewid+"px",
					"top":widthsum[Smallest()]*30+"px",
				});widthsum[Smallest()]++;	
					}, 10);
			m_div.append(m_pic);
			$(".main_table").append(m_div);//插入
		setTimeout(function(){
				$(".fapai").css({
					"z-index":-1,
					"transform":"scale(0.2,0.2)",
		})	
		},500)
		
	})
}
/*---初始化-----*/
function startf(){
	  	var widnum= new Array(4)//定义数组
		for (var i = 0 ; i <= widnum.length - 1; i++) 
		{
			widnum[i]=Math.floor(Math.random()*10);
			widthsum[i]=widnum[i];
			widnum[i]=new Array(widnum[i]);
			for (var n = 0 ; n <= widnum[i].length - 1; n++) 
			{
				widnum[i][n]=Math.floor(Math.random()*10);
			}
	}
	for (var m =0; m <= widnum.length - 1; m++) 
	{
		for (var j = 0; j <= widnum[m].length - 1; j++) 
		{
			var m_pic=document.createElement('img');
				m_pic.src=data.img[widnum[m][j]].src;
			var m_div=document.createElement('div');
				m_div.append(m_pic);
			$(m_div).css({"left":m*linewid+"px","top":j*30+"px",});
			$(".main_table").append(m_div);

		}
	}


}




//加载完后调用
$(window).on('load',function(){

	startf();
	CardGame();
})