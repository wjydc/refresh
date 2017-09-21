
var myScroll,
 pullDownEl, pullDownOffset,
 pullUpEl, pullUpOffset,
 generatedCount = 0;

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
function loaded(callback) {
 pullDownEl = document.getElementById('pullDown');
 pullDownOffset = pullDownEl.offsetHeight;
 myScroll = new iScroll('wrapper', {
  scrollbarClass: 'myScrollbar', /* 重要样式 */
  useTransition: false, 
  topOffset: pullDownOffset,
  onRefresh: function () {
   if (pullDownEl.className.match('loading')) {
    pullDownEl.className = '';
    pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
   } 
  },
  onScrollMove: function () {
   if (this.y > 5 && !pullDownEl.className.match('flip')) {
    pullDownEl.className = 'flip';
    pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
    this.minScrollY = 0;
   } else if (this.y < 5 && pullDownEl.className.match('flip')) {
    pullDownEl.className = '';
    pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
    this.minScrollY = -pullDownOffset;
   }

  },
  onScrollEnd: function () {
   if (pullDownEl.className.match('flip')) {
    pullDownEl.className = 'loading';
    pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';    
    pullDownAction()
   } 
  }
 });
 setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
}

