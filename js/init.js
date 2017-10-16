
//var myScroll,
// pullDownEl, pullDownOffset,
// pullUpEl, pullUpOffset,
// generatedCount = 0;

/**
 * 下拉刷新 （自定义实现此方法）
 * myScroll.refresh();  // 数据加载完成后，调用界面更新方法
 */
// function pullDownAction () {
//  setTimeout(function () { 
//   var el, li, i;
//   el = document.getElementById('thelist');
 
//   for (i=0; i<10; i++) {
//    li = document.createElement('li');
//    li.innerText = '添加三冰 ' + (++generatedCount);
//    el.insertBefore(li, el.childNodes[0]);
//   }

//   myScroll.refresh(); 

//  }, 1000); 
// }

/**
 * 滚动翻页 （自定义实现此方法）
 * myScroll.refresh();  // 数据加载完成后，调用界面更新方法
 */
// function pullUpAction () {
//  setTimeout(function () {

//   var el, li, i;
//   el = document.getElementById('thelist');

//   for (i=0; i<3; i++) {
//    li = document.createElement('div');
//    li.innerHTML ="杀神碰上美女特工。杀神碰上美女特工！";
//    el.appendChild(li, el.childNodes[0]);
//   }

//   myScroll.refresh(); 
  
//  }, 1000); 

// }
 // 数据加载完成后，调用界面更新方法 Remember to refresh when contents are loaded (ie: on ajax completion)
/**
 * 初始化iScroll控件
 */
//function loaded(callback) {
// pullDownEl = document.getElementById('pullDown');
// pullDownOffset = pullDownEl.offsetHeight;
// myScroll = new iScroll('wrapper', {
//scrollbarClass: 'myScrollbar', //重要样式 
//useTransition: false, 
//topOffset: pullDownOffset,
//onRefresh: function () {
// if (pullDownEl.className.match('loading')) {
//  pullDownEl.className = '';
//  pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
// } 
//},
//onScrollMove: function () {
//	console.info(this.y);
// if (this.y > 5 && !pullDownEl.className.match('flip')) {
//  pullDownEl.className = 'flip';
//  pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
//  this.minScrollY = 0;
// } else if (this.y < 5 && pullDownEl.className.match('flip')) {
//  pullDownEl.className = '';
//  pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
//  this.minScrollY = -pullDownOffset;
// } 
//	
//
//	
//	
//	
//},
//onScrollEnd: function () {
// if (pullDownEl.className.match('flip')) {
//  pullDownEl.className = 'loading';
//  pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';    
//  pullDownAction()
// } 
//}
// });
// setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
//}





 	var myScroll;
    var pullDownEl, pullDownL;
    var pullUpEl, pullUpL;
    var Downcount = 0 ,Upcount = 0;
    var loadingStep = 0;//加载状态0默认，1显示加载状态，2执行加载数据，只有当为0时才能再次加载，这是防止过快拉动刷新
    


// 下拉刷新
var token='';
var index=0;
var size=4 ;

    function pullDownAction(downCallback) {//下拉事件
        setTimeout(function() {
           var el, li, i;
           el = $('#thelist');
	       $.ajax({
		       url: 'data.json',  
		       type: 'GET',  
		       dataType: 'json', 
		       success: function(data){
		       		index++;
		         	datas= data.books;
		         	token=datas;
					var divs='';
		        	var length=token.length;
		        	for (var i=(index-1)*size ; i <(index*size>length?length:index*size); i++) {
	            	   divs =('<div class="wrap"><p class="title">'+token[i].title+'</p><p class="bookName">'+token[i].bookName+'</p><img src="'+token[i].img+'" alt=""><p class="text">'+token[i].text+'</p><a href="#">阅读全文</a></div>') +divs;
	        		}
	        		el.prepend(divs);
			        pullDownEl.removeClass('loading');
			        pullDownL.html('下拉显示更多...');
			        pullDownEl['class'] = pullDownEl.attr('class');
			        pullDownEl.attr('class','').hide();
			        myScroll.refresh();
			        loadingStep = 0;
	       		} 
	    	});

        }, 1000); //1秒
    }


//上拉加载
var tokenUp='';
var indexUp=0;
var sizeUp=4 ;
    function pullUpAction() {//上拉事件
        setTimeout(function() {
            var el, li, i;
            el = $('#thelist');
            $.ajax({
		       url: 'data1.json',  
		       type: 'GET',  
		       dataType: 'json', 
		       success: function(data){
		       		indexUp++;
		         	datass= data.books;
		         	tokenUp=datass;
					var divs='';
		        	var length=tokenUp.length;
		        	for (var i=(indexUp-1)*sizeUp; i< sizeUp*indexUp;i++){
	            	   divs = divs+('<div class="wrap"><p class="title">'+tokenUp[i].title+'</p><p class="bookName">'+tokenUp[i].bookName+'</p><img src="'+tokenUp[i].img+'" alt=""><p class="text">'+tokenUp[i].text+'</p><a href="#">阅读全文</a></div>') ;
	        		}
	        		el.append(divs);
			        pullUpEl.removeClass('loading');
		            pullUpL.html('上拉显示更多...');
		            pullUpEl['class'] = pullUpEl.attr('class');
		            pullUpEl.attr('class','').show();
		            myScroll.refresh();
		            loadingStep = 0;
	       		} 
	    	});

        }, 1000);
    }

    function loaded() {
        pullDownEl = $('#pullDown');
        pullDownL = pullDownEl.find('.pullDownLabel');
        pullDownEl['class'] = pullDownEl.attr('class');
        pullDownEl.attr('class','').hide();

        pullUpEl = $('#pullUp');
        pullUpL = pullUpEl.find('.pullUpLabel');
        pullUpEl['class'] = pullUpEl.attr('class');
        pullUpEl.attr('class','').show();

        myScroll = new IScroll('#wrapper', {
            probeType: 2,//probeType：1对性能没有影响。在滚动事件被触发时，滚动轴是不是忙着做它的东西。probeType：2总执行滚动，除了势头，反弹过程中的事件。这类似于原生的onscroll事件。probeType：3发出的滚动事件与到的像素精度。注意，滚动被迫requestAnimationFrame（即：useTransition：假）。
            scrollbars: true,//有滚动条
            mouseWheel: true,//允许滑轮滚动
            fadeScrollbars: true,//滚动时显示滚动条，默认影藏，并且是淡出淡入效果
            bounce:true,//边界反弹
            interactiveScrollbars:true,//滚动条可以拖动
            shrinkScrollbars:'scale',// 当滚动边界之外的滚动条是由少量的收缩。'clip' or 'scale'.
            click: true ,// 允许点击事件
            keyBindings:true,//允许使用按键控制
            momentum:true// 允许有惯性滑动
        });
        //滚动时
        myScroll.on('scroll', function(){
            if(loadingStep == 0 && !pullDownEl.attr('class').match('flip|loading') && !pullUpEl.attr('class').match('flip|loading')){
                if (this.y > 5) {
                    //下拉刷新效果
                    pullDownEl.attr('class',pullUpEl['class'])
                    pullDownEl.show();
                    myScroll.refresh();
                    pullDownEl.addClass('flip');
                    pullDownL.html('准备刷新...');
                    loadingStep = 1;
                }else if (this.y < (this.maxScrollY - 5)) {
                   //上拉刷新效果
                   pullUpEl.attr('class',pullUpEl['class'])
                   pullUpEl.show();
                   myScroll.refresh();
                   pullUpEl.addClass('flip');
                   pullUpL.html('准备刷新...');
                   loadingStep = 1;
                }
            }
        });
        //滚动完毕
        myScroll.on('scrollEnd',function(){
            if(loadingStep == 1){
                if (pullUpEl.attr('class').match('flip|loading')) {
                    pullUpEl.removeClass('flip').addClass('loading');
                    pullUpL.html('Loading...');
                    loadingStep = 2;
                    pullUpAction();
                }else if(pullDownEl.attr('class').match('flip|loading')){
                    pullDownEl.removeClass('flip').addClass('loading');
                    pullDownL.html('Loading...');
                    loadingStep = 2;
                    pullDownAction();
                }
            }
        });
    }


    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

















