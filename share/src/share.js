/**
 * share分享插件
 *
 */

define('common/ui/share/share', ["common/ui/popup_base/popup_base", 'css!common/ui/share/share.css'], function(popup_base){

	return function(obj){
		obj = obj || {};

		window.jiathis_config = {
			url : obj.url || "",
			title : obj.title || "",
			summary : obj.summary || "",
			pic : obj.pic || ""
		}
		//console.log(obj);
		popup_base.show({
			type:1,
			contentHTML:[
			'<div class="qui-popup-shareContent">',
			'<div class="qui-popup-shareList jiathis_style" id="qui-popup-shareList">',
			'	<a class="jiathis_button_tsina">新浪微博</a>',
			'	<a class="jiathis_button_qzone">QQ空间</a>',
			'	<a class="jiathis_button_renren">人人网</a>',
			'	<a class="jiathis_button_fb">facebook</a>',
			'</div>',
			'<div class="qui-popup-shareCancel" id="qui-popup-shareCancel">取消</div>',
			'</div>'
			].join(""),
			onShow:function(){

                $("#qui-popup-shareCancel").on(qyerUtil.EVENT.CLICK, function(){
                    popup_base.hide();
                });

				var script = document.createElement("script");
				script.type = "text/javascript";
				script.src = "http://v3.jiathis.com/code/jia.js";
				document.body.appendChild(script);
			}
		});
		
	}
});