$(document).ready(function(){
	//获取qa列表
	var url = 'http://115.29.143.102:8080/YizhenServer/que/getabstractlist?uid=18&token=9c6286f6155ba81948f0379ad3bb1257&currentqueindex=0&categaory=-1&client=web';
	$.ajax({ 
		url: url,
		type:"get",
		dataType: "jsonp",
		jsonpCallback: 'callback',
		success: function(data){ 
			var html = '';
			//console.info(data.abstractlist);
			$.each(data.abstractlist, function(qaIndex, qa) {

				html += '<li>';
				html += '<p class="intro clearfix">'+getCat(qa.category)+'<span class="fs12 fr">'+qa.publishdate+'</span></p>';
				html += '<p class="ques-title"><a href="">'+qa.title+'</a></p>';
				html += '<span class="hidden">'+qa.qeid+'</span>';
				html += '</li>';
			});
			$('#ques').html(html);

			//获取详情
			$('.ques-title a').click(function(e){
				alert(11)
				var qeid = $(this).parent('p').next('.hidden');
				url = 'http://115.29.143.102:8080/YizhenServer/que/getdetail?uid=18&token=9c6286f6155ba81948f0379ad3bb1257&qeid='+qeid;
				$.ajax({ 
					url: url,
					type:"get",
					dataType: "jsonp",
					jsonpCallback: 'callback',
					success: function(data){ 
						var html = '';
						console.info(data.abstractlist);
						$.each(data.abstractlist, function(qaIndex, qa) {

							html += '<li>';
							html += '<p class="intro clearfix">'+getCat(qa.category)+'<span class="fs12 fr">'+qa.publishdate+'</span></p>';
							html += '<p class="ques-title"><a href="">'+qa.title+'</a></p>';
							html += '<span class="hidden">'+qa.qeid+'</span>';
							html += '</li>';
						});
						$('#ques').html(html);
					}, 
					error: function(){ 
						alert('网络异常'); 
					} 
				});
			});//获取详情over
		}, 
		error: function(){ 
			alert('网络异常'); 
		} 
	});

	
})

//获取分类
function getCat(category){

	var cat = '';
	switch(category)
	{
	case 0:
	  cat = '科普知识';
	  break;
	case 1:
	  cat = '病例分析';
	  break;
	case 2:
	  cat = '药物信息';
	  break;
	case 3:
	  cat = '生活饮食';
	  break;
	case 4:
	  cat = '检查事项';
	  break;
	default:
	  cat = '未分类';
	}

	return cat;
}
