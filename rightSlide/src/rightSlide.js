/**
 * leftSlide插件：绑定手势左滑事件
 *
 * @param {String} 输入需要翻转的字符串
 * @method leftSlide() 绑定手势左滑事件
 * @example : $(dom).leftSlide(callback);
 * @example : $(dom).leftSlide(selector, callback);
 */

define('common/ui/rightSlide/rightSlide', function(){
	
	Zepto.extend(Zepto.fn, {
		rightSlide : function ( selector, callback ) {
			
			if(typeof selector === "function"){
				callback = selector;
				selector = "";
			}
			
			//阻止目标左滑动的时候body也同时上下滑动
			var start;
			var delta;
			var isScrolling;
			
			$(this).on('touchstart', selector, function (event) {
			     start = {
			     	x: event.touches[0].pageX,
			     	y: event.touches[0].pageY
			     }
			     isScrolling = undefined;
			     //console.log(start);
			}, false);
			
			$(this).on('touchmove', selector, function (event) {
				delta = {
					x: event.touches[0].pageX - start.x,
					y: event.touches[0].pageY - start.y
				}
				// determine if scrolling test has run - one time test
				if ( typeof isScrolling == 'undefined') {
					isScrolling = !!( isScrolling || Math.abs(delta.x) < Math.abs(delta.y) );
				}
				
				if (!isScrolling) {
					event.preventDefault();
				}
			    //console.log(delta);
			}, false);
			
			$(this).on("swipeRight", selector, function(event){
				callback.call(this, event);
				//console.log(this);
			});
			
			return this;
		}
	});
});