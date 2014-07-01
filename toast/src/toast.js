define('common/ui/toast/toast',['common/ui/popup_base/popup_base'],function(pb){
	function renderData(){
		var _prefix, //前缀
			_surfix,	//后缀
			_iconHTML,	//图标
			_titleHTML,	//主标题
			_despHTML,	//描述
			_buttonHTML,	//按钮
			toastHTML=[];//最终html

		//插入样式
		var css = [
'.qui-toast-container{height:100%;overflow:hidden;text-align:center;white-space:nowrap;font-size:0px;}',
'.qui-toast-container::before{content:".";display:inline-block;width:0px;height:100%;vertical-align:middle;}',
'.qui-toast-container .toastBox{display:inline-block;width:100%;vertical-align:middle;}',
'.toastBox>.icon{background:url(http://static.qyer.com/m/common/ui/toast/icons-toast.png) no-repeat;background-size:380px 81px;background-position:0px 0px;width:80px;height:81px;margin:0 auto;}',
'.toastBox>.icon.correct{background-position:0px 0px;}',
'.toastBox>.icon.warn{background-position:-100px 0px;}',
'.toastBox>.icon.error{background-position:-200px 0px;}',
'.toastBox>.icon.info{background-position:-300px 0px;}',
'.toastBox>.title{padding-top:15px;font-size:18px;line-height:18px;color:#323232;}',
'.toastBox>.desp{margin:22px 16px 0px;font-size:16px;line-height:24px;color:#323232;white-space:normal;}',
'.toastBox>.buttonBox{margin:20px 40px 0px;}',
'.toastBox>.buttonBox>.qui-btn{display:block;margin-bottom:10px;}'
].join("");
		window.qyerUtil.insertStyle(css);

		//前缀
		var _prefix = [
'<section class="qui-toast-container">',
'    <div class="toastBox">'
			].join("");
		//后缀
		var _surfix=[
'    </div>  ',
'</section>'
			].join("");

		toastHTML.push(_prefix);

		if(['correct','warn','error','info'].indexOf(option.type) > -1){
			_iconHTML = '<p class="icon ' + option.type + '"></p>';
		}else{
			_iconHTML = '<p class="icon ' + option.type + '" style="background:url(' + (option.iconURL || '') + ') left top;background-size:cover;"></p>';
		}

		toastHTML.push(_iconHTML);

		toastHTML.push('<p class="title">' + (option.toastTitle || '标题') + '</p>');

		toastHTML.push('<p class="desp">' + (option.toastContent || '') + '</p>');

		if(typeof option.buttons !== 'undefined'){	
			toastHTML.push('<p class="buttonBox">');
			var _btnHTML=[];
			for(var i=0,len=option.buttons.length;i<len;i++){
				_btnHTML.push(
					'<input type="button" name="" value="' 
					+ option.buttons[i].text 
					+ '" class="qui-btn btnA fluid" ' 
					+ (option.buttons[i].ipg ? 'data-bn-ipg = "' + option.buttons[i].ipg + '"' : '')
					+'>');
			}
			if(typeof option.cancelButton !== 'undefined' && option.cancelButton === true){
				_btnHTML.push(
					'<input type="button" name="" value="' 
					+ (option.cancelButtonText || '取消') 
					+ '" class="qui-btn btnWeak fluid cancelBtn" '
					+ (option.cancelBtnIpg ? 'data-bn-ipg = "' + option.cancelBtnIpg + '"' : '')
					+'>');
			}		
			toastHTML.push(_btnHTML.join(""));
			toastHTML.push('</p>');	
			//console.log(toastHTML.join(""));		
			_btnHTML =null;	
		}

		toastHTML.push(_surfix);

		_prefix=_iconHTML=_titleHTML=_despHTML=_buttonHTML=_surfix=null;

		return toastHTML.join("");
	}

	function bindEvent(){
		var $t = $(pb.getContent());
		$t.off(qyerUtil.EVENT.CLICK,'input');
		$t.on(qyerUtil.EVENT.CLICK,'input',function(e){
			var $btn = $(e.target);
			if($btn.hasClass("cancelBtn") && option.cancelButton === true){
	            if (typeof option.onCancel === 'function') {
	                option.onCancel();
	            }
	            pb.hide();
			}else{
				if (typeof option.buttons !== 'undefined' && typeof option.buttons[$btn.index()].onClick === 'function'){
					option.buttons[$btn.index()].onClick.apply($t);
				}
			}		
		})

	}

	var control = {
		show:function(aOption){
			option = aOption;
			pb.show({
				type:1,
				hasHead:false,
				contentHTML:renderData(),
				onShow:bindEvent(),
				onCancel:option.onCancel
			});
			if(typeof option.onShow === 'function'){
				option.onShow();
			}
		},
		hide:function(){
			pb.hide();
		}
	}
	return control;
})