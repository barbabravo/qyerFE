/**
 * 提问插件
 * @requires Zepto
 * @author zhangcheng
 * @version 2014.04.25
 * @example
 * $.qyerQuestion({
 *     title: '默认标题',
 *     content: '默认内容',
 *     selector: '#ask',
 *     autoShow: false,
 * });
 * $.qyerQuestion('show');
 */
(function($) {

	var showForm = function(_title, _content) {
        require([
            'common/ui/editer1/editer1',
            'common/ui/slidTip/slidTip',
        ], function(editer, tip) {
            editer.show({
                okText: '发布',
                cancelText: '取消',
                title: '提问',
                input1Placeholder: '请用简明的文字清晰地描述你的问题',
                textarea1Placeholder: '关于问题的详细说明可以在这里添加',
                input1TitleText: _title || '',
                textarea1Text: _content || '',
                maxLength: 1000,
                onOK: function(title, content) {

                    if (!/\S/.test(title) || !/\S/m.test(content)) {
                        tip.show({
                            type: '3', /* 轻微错误 */
                            text: '请填写标题和内容',
                            delay: 3,
                        });
                        return false;
                    }

                    if (title.length > 50) {
                        tip.show({
                            type: '3', /* 轻微错误 */
                            text: '标题长度要在50字以内',
                            delay: 3,
                        });
                        return false;
                    }

                    if (content.length > 1000) {
                        tip.show({
                            type: '3', /* 轻微错误 */
                            text: '内容长度要在1000字以内',
                            delay: 3,
                        });
                        return false;
                    }

                    window.localStorage.setItem('js-ask-question-form-title', title);
                    window.localStorage.setItem('js-ask-question-form-content', content);
                    var $form = $('<form action="/ask/savequestion" method="POST"></form>');
                    $('<input type="hidden" name="back_url" />').val(window.location.href).appendTo($form);
                    $('<input type="hidden" name="title" />').val(title).appendTo($form);
                    $('<input type="hidden" name="content" />').val(content).appendTo($form);
                    $form.submit();

                    return false;
                },
            });
        });
    };

	var _options = {
		title: window.localStorage.getItem('js-ask-question-form-title') || '',
		content: window.localStorage.getItem('js-ask-question-form-content') || '',
		selector: null,
		autoShow: false,
	};

    $.extend($, {

    	'qyerQuestion': function(options) {

    		switch (options) {

    			case 'show':
    				showForm(_options.title, _options.content);
    				break;

    			default:
    				$.extend(_options, options);
    		}

    		if (_options.selector) {
    			$(_options.selector).bind('click', function() {
	    			showForm(_options.title, _options.content);
	    		});
    		}

    		if (_options.autoShow) {
    			showForm(_options.title, _options.content);
    		}

    		return this;
    	},
    });

})(Zepto);

/* 
 * m端公用头部｜侧边栏滑出效果
 */
$(function(){
	
	var $aside = $(".qui-aside");
	var $page = $(".qui-page");

	/*禁止事件默认行为 */
	function bodyPreventDefault(event){
		event.preventDefault();
	}

	/*阻止侧边栏事件冒泡（因document禁用事件默认行为） */
	$aside.on('touchmove', function (event) {
	     event.stopPropagation();
	}, false);

	function asideShow(){
		$page.addClass("translateX");
		$aside.addClass("translateX");
		$(document).on('touchmove', bodyPreventDefault, false);
		/* $("body").css({"height":"100%","overflow":"hidden"}); */
	}

	function asideHide(){
		$page.removeClass("translateX");
		$aside.removeClass("translateX");
		$(document).off('touchmove', bodyPreventDefault);
		/* $("body").css({"height":"100%","overflow":""}); */
	}
	
	/*page页面点击侧边栏消失 */
	$page.on(qyerUtil.EVENT.CLICK, function(){
		if($page.hasClass("translateX")){
			asideHide();
		}
	});

	/*menu按钮点击触发效果 */
	$("#headerMenu, .headerMenu").on(qyerUtil.EVENT.CLICK, function(event){
		event.stopPropagation();
		if($page.hasClass("translateX")){
			asideHide();
		} else {
			asideShow();
		}
	});

	/* 提问题 */
	$.qyerQuestion({
		selector: '#js_ask_question_form',
	});
});
