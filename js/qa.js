$(document).ready(function(){
	//获取qa列表
	$.ajax({ 
		url: YZAPI_GETURL('/que/getabstractlist?currentqueindex=0&categaory=-1'),
		type:"get",
		dataType: "jsonp",
		jsonpCallback: 'callback',
		success: function(data){ 
			var html = '';
			console.info(data);
			$.each(data.abstractlist, function(qaIndex, qa) {

				html += '<li>';
				html += '<p class="intro clearfix">'+getCat(qa.category)+'<span class="fs12 fr">'+qa.publishdate+'</span></p>';
				html += '<p class="ques-title"><a href="#" onclick="return false;" qaid="' + qa.qaid + '" qeid="' + qa.qeid + '">'+qa.title+'</a></p>';
				html += '</li>';
			});
			$('#ques').html(html);

			//获取详情
			$('.ques-title a').click(function(e){
				var qaid = $(this).attr('qaid');
				var qeid = $(this).attr('qeid');
				//$('#qa').load(YZAPI_GETWeb('/page/quedetail.jsp?qaid='+qaid + "&qeid=" + qeid));
				$('#qa-iframe').attr('src', YZAPI_GETWeb('/page/quedetail.jsp?qaid='+qaid + "&qeid=" + qeid));
				$('#qa-div').hide();
				$('#qa-iframe').show();
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
