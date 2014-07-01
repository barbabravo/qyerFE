
define('common/ui/rightSlide/rightSlide',function(){Zepto.extend(Zepto.fn,{rightSlide:function(selector,callback){if(typeof selector==="function"){callback=selector;selector="";}
var start;var delta;var isScrolling;$(this).on('touchstart',selector,function(event){start={x:event.touches[0].pageX,y:event.touches[0].pageY}
isScrolling=undefined;},false);$(this).on('touchmove',selector,function(event){delta={x:event.touches[0].pageX-start.x,y:event.touches[0].pageY-start.y}
if(typeof isScrolling=='undefined'){isScrolling=!!(isScrolling||Math.abs(delta.x)<Math.abs(delta.y));}
if(!isScrolling){event.preventDefault();}},false);$(this).on("swipeRight",selector,function(event){callback.call(this,event);});return this;}});});