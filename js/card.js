var   winWidth = $(window).width(),
     winHeight = $(window).height();
var $time  =  $('#yy-content p span:nth-child(2)'),
  $delForm = $('.paper-form.del');
$(document).ready(function(){
	//设置指标曲线、指标名片、化验单位置
	setPos();
	//基本情况
	var $basic = $('.basic>div');
	$basic.mouseover(function(e){
		$(this).find('h3').find('a').fadeIn(0);
	});
	$basic.mouseout(function(e){
		$(this).find('h3').find('a').fadeOut(0);
	});
	//点击编辑基本情况
	$basic.find('h3 a').click(function(e){
		e.preventDefault();
		$thisForm = $(this);
		$('.edit-basic').fadeIn(300);
		var relForm = $thisForm.attr('rel');
		$('.edit-basic form').each(function(e){
			var formId = $(this).attr('id');
			if(relForm.match(formId)==formId){
				$(this).fadeIn(0);
				$(this).siblings('form').fadeOut(0);
			}
		});
		
	});
	//取消编辑基本情况
	$('.cancel').click(function(e){
		$('.edit-basic').fadeOut(0);

	});
	//点击“指标”“用药情况”出现详细内容，预置文本消失
	$('.yongyao h2').click(function(e){
		$('#yy-content').fadeIn(300);
		$('#pre-text').fadeOut(0);
	});
	$('.zhibiao h2').click(function(e){
		$('#zb-content').fadeIn(300);
		$('#pre-text').fadeOut(0);
	});

	//用药情况绿色横条
	$time.addClass('time');
	initTime();
	//编辑用药历史
	$('#yy-edit p span:first-child').addClass('clearfix');
	$('.yongyao h2 a').click(function(e){
		e.preventDefault();
		$('.yongyao.edit').fadeIn(100);
	});
	//插入年月
	insertOption();
	//保存
	$('#yy-save').click(function(e){
		e.preventDefault();
		$('.yongyao.edit').fadeOut(100);
	});
	//鼠标划过指标行，显示编辑和关注按钮
	var $zbConP = $('#zb-content p');
	$zbConP.mouseover(function(e){
		$(this).find('a').fadeIn(0);
	});
	$zbConP.mouseout(function(e){
		$(this).find('a.zb-edit,a.zb-note').fadeOut(0);
	});
	//编辑指标
	$('a.zb-edit').click(function(e){
		e.preventDefault();
		var $thislink = $(this),
		    $editForm = $('.zb-edit-form');
		var top = $thislink.offset().top,
		    left = $thislink.offset().left+28;
		var value = $thislink.parent('span').next('span').text();
		$editForm.fadeIn(300);
		$editForm.css({'top':top+'px','left':left+'px'});
		$('#edit-input').val(value);
	});

	//关闭浮层
	$('.close').click(function(e){
		e.preventDefault();
		$(this).parent('form,div').fadeOut(0);
	})
	//按顺序排列化验单菜单
	$('.order-by').click(function(e){
		
		var left = $(this).offset().left-20;
		$('#order-menu').css('left',left+'px');
		$('#order-menu').toggle(300);
	});
	//指标名称title
	var $zbTitle = $('.zb-title');
	$zbTitle.attr('title','点击查看指标相关内容');

	//点击指标名称显示指标名片
	$zbTitle.click(function(e){
		e.preventDefault();
		$('#name-card').fadeIn(300);
	})

	//设置化验单位置
	setPaperPos();

	//点击化验单icon出现化验单
	$('#zb-content h3 a').click(function(e){
		var   left = $('.main').offset().left-30;
		$('#hy-paper').animate({'width':left+'px'});
	});

	//收回化验单
	$('.slide-left').click(function(e){
		e.preventDefault();
		$('#hy-paper').animate({'width':0});
	});

	//拖动图片
	var $img = $('#paper-img img');
	$img.draggable();
	//放大缩小图片
	$('.zoom-in').click(function(e){
		e.preventDefault();
		var width = $img.width(),
		   height = $img.height();
		if(height > 405){
			$img.width(width-100);
		}
	});
	$('.zoom-out').click(function(e){
		e.preventDefault();
		
		var width = $img.width();
		if(width < 2048){
			$img.width(width+100);
		}
		
	});

	
	//删除化验单
	$('a.del-paper').click(function(e){
		e.preventDefault();
		$delForm.fadeIn(300);
	});

	//上传化验单
	$('a.upload-paper').click(function(e){
		e.preventDefault();
		var $uploadForm = $('.paper-form.local');
		$uploadForm.fadeIn(300);
	});
	
	//上传方式切换
	$('#pt-url').click(function(e){
		e.preventDefault();
		$('#upload-local').fadeOut(0);
		$('#upload-url').fadeIn(300)
	});
	$('#up-local').click(function(e){
		e.preventDefault();
		$('#upload-url').fadeOut(0);
		$('#upload-local').fadeIn(300)
	});

	//指标图表
	$('#zb-content p').append('<span><img src="./images/tongji.png"></span>');
	$('#zb-content p span:last-child img').click(function(e){
		$('.zb-chart').fadeIn(300);
		initChart();
	});
});

//用药时间线
function initTime(){
	var a0 = Date.parse('2008-05-01'),
	    a1 = Date.parse('2009-12-01'),
	    b0 = Date.parse('2008-12-01'),
	    b1 = Date.parse('2010-12-01'),
	    c0 = Date.parse('2010-10-01'),
	    c1 = Date.parse('2013-12-01');
	//时间段长度，单位为分钟
	var aTime = (a1-a0)/10000/36000,
	    bTime = (b1-b0)/10000/36000,
	    cTime = (c1-c0)/10000/36000;

	$('#yy-content p:eq(0) .time').css('width',aTime);
	$('#yy-content p:eq(1) .time').css({'width':bTime,'left':bTime-aTime});
	$('#yy-content p:eq(2) .time').css({'width':cTime,'left':cTime-aTime});
	//$time.get(0).style.width = aTime;

}
//设置指标曲线、指标名片、化验单位置
function setPos(){
	var  left =  (winWidth-710)/2,
	      top =  (winHeight-420)/2,
	    bLeft = (winWidth-640)/2,
	     bTop = (winHeight-400)/2,
	    fLeft =  (winWidth-465)/2,
 	     fTop =  (winHeight-165)/2;

	if(top>10){
		$('#name-card,.zb-chart').css({
		  'left':left+'px',
		  'top':top+'px'
		});
		$('.edit-basic').css({
		  'left':bLeft+'px',
		  'top':bTop+'px'
		});
		$('#upload-local,#upload-url').css({'top':fTop+'px','left':fLeft+'px'});
		$delForm.css({'top':fTop+'px','left':fLeft+'px'});
		
	}else{
		$('#name-card,.zb-chart').css({
		  'left':left,
		  'top':10+'px'
		});
		$('.edit-basic').css({
		  'left':bLeft+'px',
		  'top':10+'px'
		});
		$('#upload-local,#upload-url').css({'top':10+'px','left':fLeft+'px'});
		$delForm.css({'top':10+'px','left':fLeft+'px'});
	}
}	
//设置化验单图片显示位置
function setPaperPos(){
	var   right = $('.main').offset().right+30,
	    height = $(document).height()+60;
	$('#hy-paper').css({'right':right+'px','height':height+'px'});
}
//获取路径
function getPath(obj) {
	if (obj) {
		if (window.navigator.userAgent.indexOf("MSIE") >= 1) {
			obj.select(); return document.selection.createRange().text;
		}
		else if (window.navigator.userAgent.indexOf("Firefox") >= 1) {
			if (obj.files) {
				return obj.files.item(0).getAsDataURL();
			}
			return obj.value;
		}
		return obj.value;
	}
}  
//指标曲线
function initChart(){
	var line1=[['2013-12-01 8:00AM',70], ['2014-01-01 8:00AM',20], ['2014-02-01 8:00AM',30], ['2014-03-01 8:00AM',40], ['2014-04-01 8:00AM',40], ['2014-05-01 8:00AM',30], ['2014-06-01 8:00AM',50]];
	var plot2 = $.jqplot('chart', [line1], {
	      title:'Customized Date Axis', 
	      axes:{
	        xaxis:{
	          renderer:$.jqplot.DateAxisRenderer, 
	          tickOptions:{formatString:'%b %#d, %#I %p'},
	          min:'11 16, 2013 8:00AM', 
	          tickInterval:'1 months'
	        }
	      },
	      series:[{lineWidth:4, markerOptions:{style:'square'}}]
	});
}
//编辑用药时间options
function insertOption(){
	var options = '',
	     date   =   new Date();
	var year = parseInt(date.getFullYear());
	
	for(var i = 2000;i < year;i ++){
		options += '<option>'+i+'</option>';
	}
	$('#yy-edit select:even').html(options);

	options = '';
	for(var i = 1;i < 13;i ++){
		options += '<option>'+i+'</option>';
	}
	$('#yy-edit select:odd').html(options);
}
	

