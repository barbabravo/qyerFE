define("common/ui/share/share",["common/ui/popup_base/popup_base","css!common/ui/share/share.css"],function(a){return function(b){b=b||{};window.jiathis_config={url:b.url||"",title:b.title||"",summary:b.summary||"",pic:b.pic||""};a.show({type:1,contentHTML:['<div class="qui-popup-shareContent">','<div class="qui-popup-shareList jiathis_style" id="qui-popup-shareList">','	<a class="jiathis_button_tsina">新浪微博</a>','	<a class="jiathis_button_qzone">QQ空间</a>','	<a class="jiathis_button_renren">人人网</a>','	<a class="jiathis_button_fb">facebook</a>',"</div>",'<div class="qui-popup-shareCancel" id="qui-popup-shareCancel">取消</div>',"</div>"].join(""),onShow:function(){$("#qui-popup-shareCancel").on(qyerUtil.EVENT.CLICK,function(){a.hide()});var b=document.createElement("script");b.type="text/javascript";b.src="http://v3.jiathis.com/code/jia.js";document.body.appendChild(b)}})}});