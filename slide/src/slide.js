/**
 * zepto ui控件，引入此模块将为zepto对象注册slideUp,slideDown方法
 * @module common/ui/slide
 */
 define('common/ui/slide/slide',function(){
	 function slideUp(aOption){	 	 		
		this.$obj = aOption.$obj;
		this.during = null;
		this.option = aOption.option;
		this.init();
	 }
	 function slideDown(aOption){	 		
		this.$obj = aOption.$obj;
		this.during = null;
		this.option = aOption.option;
		this.init();
	 }
	 slideUp.prototype = {
	 	$obj:null,
	 	during:null,
	 	option:null,
	 	init:function(){

	 	}
	 }
//////////////////////////////////////////////////////////////////

	/**
	 * Zepto 插件
	 * @class jQuery.plugin.qyerTextArea
	 */
	Zepto.extend(Zepto.fn, {
	 	slideUp:function(aOption){
		 	var timer,during,callback;

	        during = typeof aOption != 'undefined' && typeof aOption.during != 'undefined' ? aOption.during : 1000;
	        callback = typeof aOption !='undefined' && typeof aOption.callback != 'undefined' ? aOption.callback : function(){};

	        switch (during){
	          case 'fast':
	            during = 200;
	            break;
	          case 'normal':
	            during = 500;
	            break;
	          case 'slow':
	            during = 800;
	            break;
	          default:
	            during = Number(during) !== 'NaN' ? Number(during) : 1000;
	        }
	      return this.each(function(){
	          var $_this = $(this);
	          window.clearTimeout(timer);
	          if($_this.height()==0) return;
	          var h = $_this.height(); 
	          $_this.css({"height":h,"visibility":"visible"});    
	          // console.log(h);
	          timer = window.setTimeout(function(){
	            $_this.css({"-webkit-transition":"all "+ during/1000 +"s ease","transition":"all "+ during/1000 +"s  ease","height":0,"overflow":"hidden"});
	          },100);
	          window.setTimeout(function(){
	            $_this.css({"-webkit-transition":"none","transition":"none"});
	            callback.call($_this);
	          },during+100);
	        });
		},
		slideDown:function(aOption){
		 	var timer,during,callback;    
		    
	     	during = typeof aOption != 'undefined' && typeof aOption.during != 'undefined' ? aOption.during : 1000;
	        callback = typeof aOption !='undefined' && typeof aOption.callback != 'undefined' ? aOption.callback : function(){};

		    switch (during){
		      case 'fast':
		        during = 500;
		        break;
		      case 'normal':
		        during = 1000;
		        break;
		      case 'slow':
		        during = 1500;
		        break;
		      default:
		        during = Number(during) !== 'NaN' ? Number(during) : 1000;
		    }
		    return  this.each(function(){
		        var $_this = $(this);
		        window.clearTimeout(timer);
		        if($_this.height()>0) return;
		        var h = $_this.css({"visibility":"hidden","height":"auto"}).height(); 
		        $_this.css({"-webkit-transition":"all "+ during/1000 +"s ease","transition":"all "+ during/1000 +"s  ease","height":0,"visibility":"visible"});    
		        // console.log(h);
		        timer = window.setTimeout(function(){
		          $_this.css({"height":h,"display":"block"});
		        },100);
		        window.setTimeout(function(){
		          $_this.css({"-webkit-transition":"none","transition":"none",'height':'auto'});
	          	  callback.call($_this);
		        },during+100);  
		    });
		}
	})	
});