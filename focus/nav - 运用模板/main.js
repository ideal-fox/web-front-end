(function(){
	var nav=document.getElementById('nav')
	var li_model=nav.getElementsByClassName('nav_li').item(0)

	
	for(var i=0;i<4;i++){
		var newli=li_model.innerHTML
		newli=newli.replace(/{{index}}/,i)
		var newliobj=document.createElement('li')
		newliobj.className+='nav_li'
		newliobj.innerHTML=newli
		nav.appendChild(newliobj)

	}
			nav.removeChild(li_model)

})()

