$(function(){
		initPage();
		$(".banner ul li").eq(0).addClass("banner-animate");

		$(".nav").on("click",function(){
			var obj = $("nav");
			if(obj.hasClass("nav-animate")){
				obj.animate({
					left:"-100%"
				},500,"swing",function(){
					obj.removeClass("nav-animate");
				});
			}else{
				obj.animate({
					left:"0%"
				},500,"swing",function(){
					obj.addClass("nav-animate");
				});
			}
		});
});


//初始化页面事件
function initPage(){
	var screenHeight = $(window).height();//获取窗口高度
	var screenWidth = $(window).width();//获取窗口宽度
	$("section").css("height",screenHeight);
	$(".banner ul li").css("width",screenWidth);
	$(".banner").css("width",$(".banner ul li").length*screenWidth);

	var width = 0;//已滚动的距离
	var widthSum = ($(".banner > ul > li").length-1)*screenWidth;//获取总宽度

	var height = 0;//已滚动的距离
	var timeStamp = 0;//当前滚动的时间戳
	var heightSum = ($(".scroll-wrapper > section").length-1)*screenHeight;//获取总高度
	var process = 0;
	var timer = setInterval(function(){
		if(process == 100){
			clearInterval(timer);
			$(".load-process").html(process+"%");
			$(".pre-load").remove();

			//绑定鼠标滚轮上下滚动事件
			$(window).on("mousewheel",function(e,data){
				if((e.timeStamp - timeStamp) > 500){//如果两次滚动事件触发时间相差500毫秒
					if(data > 0 && height != 0){//向上滚动，且不在最顶部
						$(".scroll-wrapper").animate({
							marginTop:-(height-screenHeight)
						},600,function(event){
							$(".scroll-wrapper section").removeClass("section-animate");
							$(".banner ul li").eq(width/screenWidth).addClass("banner-animate");
					
							$(".scroll-wrapper section").removeClass("section-animate");
							$(".scroll-wrapper section").eq(height/screenHeight).addClass("section-animate");
						});
						height-=screenHeight;
						timeStamp = e.timeStamp;
					}else if(data <= 0 && height != heightSum){//向下滚动，且不在最底部
						
						$(".scroll-wrapper").animate({
							marginTop:-(height+screenHeight)
						},600,function(event){
							$(".banner ul li").removeClass("banner-animate");
							$(".scroll-wrapper section").removeClass("section-animate");
							$(".scroll-wrapper section").eq(height/screenHeight).addClass("section-animate");
						});
						height+=screenHeight;
						timeStamp = e.timeStamp;
					}
				}
			});
		}else{
			process+=10;
			$(".load-process").html(process+"%");
		}
	},50);

	//第一页左右翻页事件
	//上一页
	$(".carousel-left").on("click",function(){
		$(".banner ul li").removeClass("banner-animate");
		if(width != 0){//向右滚动，且不在右底部
			$(".banner").animate({
				left:-(width-screenWidth)
			},600);
			width-=screenWidth;
		}
		$(".banner ul li").eq(width/screenWidth).addClass("banner-animate");
	});
	//下一页
	$(".carousel-right").on("click",function(){
		$(".banner ul li").removeClass("banner-animate");
		if(width != widthSum){//向左滚动，且不在最左部
			$(".banner").animate({
				left:-(width+screenWidth)
			},600);
			width+=screenWidth;
		}
		$(".banner ul li").eq(width/screenWidth).addClass("banner-animate");
	});
}