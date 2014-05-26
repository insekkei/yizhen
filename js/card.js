$(document).ready(function(){
	//点击“指标”“用药情况”出现详细内容，预置文本消失
	$('.yongyao h2').click(function(e){
		$('#yy-content').fadeIn(300);
		$('#pre-text').fadeOut(0);
	});
	$('.zhibiao h2').click(function(e){
		$('#zb-content').fadeIn(300);
		$('#pre-text').fadeOut(0);
	});
	//鼠标划过指标行，显示编辑和关注按钮
	$('#zb-content p').mouseover(function(e){
		$(this).find('a').fadeIn(0);
	});
	$('#zb-content p').mouseout(function(e){
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
	$('.zb-title').attr('title','点击查看指标相关内容');
	//设置指标名片位置
	setPos();

	//点击指标名称显示指标名片
	$('.zb-title').click(function(e){
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

	
	/**化验单表单定位**/
	setFormPos();
	
	//删除化验单
	$('a.del-paper').click(function(e){
		e.preventDefault();
		var $delForm = $('.paper-form.del');
		$delForm.fadeIn(300);
	});

	//上传化验单
	$('a.upload-paper').click(function(e){
		e.preventDefault();
		var $uploadForm = $('.paper-form.local');
		$uploadForm.fadeIn(300);
	});

	 $(".input.file").change(function(){
		var a = getPath($('.input.file'));
                alert(a);
        })
	
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
})
var   winWidth = $(window).width(),
     winHeight = $(window).height();
function setPos(){
	var  left =  (winWidth-710)/2,
	      top =  (winHeight-420)/2;

	if(top>10){
		$('#name-card').css({
		  'left':left+'px',
		  'top':top+'px'
		});
	}else{
		$('#name-card').css({
		  'left':left,
		  'top':10+'px'
		});
	}
}	

function setPaperPos(){
	var   right = $('.main').offset().right+30,
	    height = $(document).height()+60;
	$('#hy-paper').css({'right':right+'px','height':height+'px'});
}

function setFormPos(){
	var fLeft =  (winWidth-465)/2,
 	     fTop =  (winHeight-165)/2;
	$('#upload-local,#upload-url').css({'top':fTop+'px','left':fLeft+'px'});
}
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
