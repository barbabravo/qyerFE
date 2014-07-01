/**
 * 文本截字
 *
 * @method clipText() 文字截断
 * @method clipLi() li截断
 */

define('common/ui/clipText/clipText', function(){
	
	var clipText = function (obj) {

		var obj = obj || {};

		$(this).each(function(index, el) {
			var $dom = $(el);

			var $domChild = $dom.children();
			
			if ($dom.height() < $domChild.height()) {
				var datIpg = "";
				if (typeof obj.ipg !== "undefined") {
					datIpg = ' data-bn-ipg="'+obj.ipg+'"';
				}
				$dom.after('<p class="qui-textMore"'+ datIpg +'><span class="qui-icon _down"></span><span class="qui-icon _up"></span></p>');
			} else {
				return;
			}

			var $more = $dom.next(".qui-textMore");

			

			$more.on("click", function(){
				if ($more.hasClass("showed")) {
					$more.removeClass("showed");
					$dom.css("max-height", "");
				}
				else {
					$more.addClass("showed");
					$dom.css("max-height", "none");
				}
			});
		});
	}
	
	var clipLi = function (obj) {

		var obj = obj || {};

		$(this).each(function(index, el) {
			
			var $dom = $(el);

			var $domChild = $dom.children();

			if($domChild.size() > obj.size){
				var datIpg = "";
				if (typeof obj.ipg !== "undefined") {
					datIpg = ' data-bn-ipg="'+obj.ipg+'"';
				}
				$dom.after('<p class="qui-textMore"'+ datIpg +'><span class="qui-icon _down"></span><span class="qui-icon _up"></span></p>');
			} else {
				return;
			}
			
			
			var $more = $dom.next(".qui-textMore");

			$more.on("click", function(){
				if ($more.hasClass("showed")) {
					$more.removeClass("showed");
					$domChild.each(function(i,el){
						if(i >= obj.size){
							$(el).hide();
						}
					});
				}
				else {
					$more.addClass("showed");
					$domChild.show();
				}
			});
		});
	}
	
	Zepto.extend(Zepto.fn, {
		clipText : function ( obj ) {
			clipText.call(this, obj);
			return this;
		},
		clipLi : function ( obj ) {
			clipLi.call(this, obj);
			return this;
		}
	});
});