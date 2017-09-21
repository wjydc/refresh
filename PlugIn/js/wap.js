var c=c||{};
/**
* 功能说明:		h5弹出框
* @author:		vivy <lizhiziyan@qq.com>
* @time:		2016-09-28
* @version:		V1.1.0
* @update:		
* @js调用方法：
* c.dialog({
*  	title:'提示框',				<提示头部>
*  	isTitle:true,				<是否显示头部>		
*  	content:'内容',				<显示的内容，可以是html>
*  	btn:[{text:"确定",fun:null},{text:"取消",fun:null}]	<按钮数组，一个{}表示一个按钮，text为按钮文字内容，fun为点击后的执行方法>
* })
*
*/
c.dialog=function(opt){
	var defalut={
		isTitle:true,
		title:"提示",
		content:'提示内容',
		btn:[{text:"确定",fun:null},{text:"取消",fun:null}]
	}
	var options=$.extend({}, defalut, opt),ts=this;
	var s='<div id="dialog" style="display:none">'+
        '<div class="weui-mask"></div>'+
        '<div class="weui-dialog">';
     if(options.isTitle) s+='<div class="weui-dialog__hd"><strong class="weui-dialog__title">'+options.title+'</strong></div>';
     s+='<div class="weui-dialog__bd">'+options.content+'</div>';
     if(options.btn.length>0){
     	s+='<div class="weui-dialog__ft">';
     	for(var i=0;i<options.btn.length;i++){
     		s+='<a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default c-blue f-size14">'+options.btn[i].text+'</a>';
     	}
     	s+='</div>';
     }
     s+='</div></div>';
     if($("#dialog").length>0) $("#dialog").remove();
    $('body').append(s);
    var $dialog=$("#dialog");
	$dialog.fadeIn(200);
	var btns=$dialog.find('.weui-dialog__btn');
	btns.one('click',function(){
		var i=$(this).index();
		if (options.btn[i].fun && $.isFunction(options.btn[i].fun)) {
			options.btn[i].fun.call(ts);
			$dialog.fadeOut(200);
			$dialog.remove();
		}else $dialog.fadeOut(200),$dialog.remove();
	});
}
/**
* 功能说明:		h5正在加载中的悬浮层
* @author:		vivy <lizhiziyan@qq.com>
* @time:		2016-10-11
* @version:		V1.1.0
* @update:		
* @js调用方法：
* c.loading(val)  val---显示的信息，默认“请稍后...”
* 加载完成之后调用消失方法：
* c.loadingHidden();
*/
c.loading=function(val){
	val=val||"请稍后...";	
	if($(".loadingToast").length>0){
		$(".loadingToast").remove();
	}
	var str='<div class="loadingToast" style="display:none;">'+
				'<div class="weui-mask_transparent"></div>'+
				'<div class="weui-toast">'+
					'<i class="weui-loading weui-icon_toast"></i>'+
					'<p class="weui-toast__content">'+val+'</p>'+
				'</div>'+
			'</div>';
	$('body').append(str);
	$(".loadingToast").fadeIn(100);
}
c.loadingHidden=function(){
	$(".loadingToast").fadeOut(100);
}
/**
* 功能说明:		h5操作成功的弹出层
* @author:		vivy <lizhiziyan@qq.com>
* @time:		2016-10-11
* @version:		V1.1.0
* @update:		
* @js调用方法：
* c.loading(val,fun)  val---显示的信息，默认“成功”
* 					  fun---完成后的回调函数，必须是function
*/
c.toast=function(val,fun){
	val=val||"成功";
	var ts=this;
	if($(".toast").length>0){
		$(".toast").remove();
	}
	var str='<div class="toast" style="display: none;">'+
				'<div class="weui-mask_transparent"></div>'+
				'<div class="weui-toast">'+
					'<i class="weui-icon-success-no-circle weui-icon_toast"></i>'+
					'<p class="weui-toast__content" style="font-size:14px">'+val+'</p>'+
				'</div>'+
			'</div>';
	$('body').append(str);
	$(".toast").fadeIn(100);
	 setTimeout(function () {
		 $(".toast").fadeOut(100);
		 if(fun && $.isFunction(fun)) fun.call(ts);
     }, 2000);
}
/**
* 功能说明:		h5操作错误的弹出层
* @author:		vivy <lizhiziyan@qq.com>
* @time:		2016-10-21
* @version:		V1.1.0
* @update:		
* @js调用方法：
* c.loading(val,fun)  val---显示的信息，默认“失败”
* 					  fun---完成后的回调函数，必须是function
*/
c.toastError=function(val,fun){
	val=val||"失败";
	var ts=this;
	if($(".toastError").length>0){
		$(".toastError").remove();
	}
	var str='<div class="toastError" style="display: none;">'+
				'<div class="weui-mask_transparent"></div>'+
				'<div class="weui-toast">'+
					'<i class="wap-close weui-icon_toast" style="font-size:48px"></i>'+
					'<p class="weui-toast__content" style="margin-top:0;font-size:14px">'+val+'</p>'+
				'</div>'+
			'</div>';
	$('body').append(str);
	$(".toastError").fadeIn(100);
	setTimeout(function () {
		$(".toastError").fadeOut(100);
		if(fun && $.isFunction(fun)) fun.call(ts);
    }, 2000);
}
/**
* 功能说明:		h5查看大图
* @author:		vivy <lizhiziyan@qq.com>
* @time:		2016-11-02
* @version:		V1.1.0
* @update:		
* @js调用方法： 需要查看大图的页面初始化时调用 
*/
c.showPic=function(){
	var that;
	$('#page1').on("swiperight",function(){prev();});
	$('#page1').on("swipeleft",function(){next();});
	$(".weui-gallery__img").click(function(){$("#page1").hide();});
	$("body").on({
		click:function(){
			that=$(this);
			 judge($(this));
			$("#page1").show();
		}
	},".showBIgImg");
	function judge(obj){
		var len=$(".zxdetail .showBIgImg").length,
			index=$(".showBIgImg").index(obj),
			src=obj.attr("data-src");
			alert($(".showBIgImg").eq(0).attr("data-src"))
		$("#page1 img").attr("src",src);
	 }
	 function next(){
	 	//下一张
	 	var _len=$(".zxdetail .showBIgImg").length-1;
	 	if($(".showBIgImg").index(that)==_len) return;
	 	that=$(".showBIgImg").eq($(".showBIgImg").index(that)+1);
	 	judge(that);
	 }
	 function prev(){
	 	//上一张	
	 	if($(".showBIgImg").index(that)==0) return;	
	 	that=$(".showBIgImg").eq($(".showBIgImg").index(that)-1);	
	    judge(that);
	 }

}
c.GetQueryString=function(name){
	var reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)","i");
	var result = window.location.search.substr(1).match(reg);
	return result?decodeURIComponent(result[2]):null;	
};
/**
* 功能说明:		获取当前时间
* @author:		vivy <lizhiziyan@qq.com>
* @time:		2016-12-07
* @version:		V1.1.0
* @update:		
* @js调用方法： 
*/
c.getLocalDate=function(){
	var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}
