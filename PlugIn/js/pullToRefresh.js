
var  pullDownEl, 
    pullDownOffset,
    pullUpEl, 
    pullUpOffset,
    generatedCount = 0;
function loaded() {
    pullDownEl = document.getElementById('pullDown');
    pullDownOffset = pullDownEl.offsetHeight;
    pullUpEl = document.getElementById('pullUp');   
    pullUpOffset = 10;   
    myScroll = new iScroll('wrapper', {
        useTransition: true,
        topOffset: pullDownOffset,
        onRefresh: function () {
            
            if (pullDownEl.className.match('loading')) {
                pullDownEl.className = '';
               }
            if (pullUpEl.className.match('loading')) {
                pullUpEl.className = '';
               ;
            }
            
            document.getElementById("pullUp").style.display="";            
            document.getElementById("show").innerHTML="onRefresh: up["+pullUpEl.className+"],down["+pullDownEl.className+"],Y["+this.y+"],maxScrollY["+this.maxScrollY+"],minScrollY["+this.minScrollY+"],scrollerH["+this.scrollerH+"],wrapperH["+this.wrapperH+"]";
        },
        onScrollMove: function () {
            document.getElementById("show").innerHTML="onScrollMove: up["+pullUpEl.className+"],down["+pullDownEl.className+"],Y["+this.y+"],maxScrollY["+this.maxScrollY+"],minScrollY["+this.minScrollY+"],scrollerH["+this.scrollerH+"],wrapperH["+this.wrapperH+"]";
            if (this.y > 0) {
                pullDownEl.className = 'flip';
               
                this.minScrollY = 0;
            }
            if (this.y < 0 && pullDownEl.className.match('flip')) {
                pullDownEl.className = '';
               
                this.minScrollY = -pullDownOffset;
            }
            
            if ( this.scrollerH < this.wrapperH && this.y < (this.minScrollY-pullUpOffset) || this.scrollerH > this.wrapperH && this.y < (this.maxScrollY - pullUpOffset) ) {
                document.getElementById("pullUp").style.display="";
                pullUpEl.className = 'flip';
               
            } 
             if (this.scrollerH < this.wrapperH && this.y > (this.minScrollY-pullUpOffset) && pullUpEl.className.match('flip') || this.scrollerH > this.wrapperH && this.y > (this.maxScrollY - pullUpOffset) && pullUpEl.className.match('flip')) {
                document.getElementById("pullUp").style.display="";
                pullUpEl.className = '';
              
            }
        },
        onScrollEnd: function () {
            document.getElementById("show").innerHTML="onScrollEnd: up["+pullUpEl.className+"],down["+pullDownEl.className+"],Y["+this.y+"],maxScrollY["+this.maxScrollY+"],minScrollY["+this.minScrollY+"],scrollerH["+this.scrollerH+"],wrapperH["+this.wrapperH+"]";
            if (pullDownEl.className.match('flip')) {
                pullDownEl.className = 'loading';                        
                     Refresh(); 
            } 
             if (pullUpEl.className.match('flip')) {
                pullUpEl.className = 'loading';
                        
                      load();
            }
        }
    });
}
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);
