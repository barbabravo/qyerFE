/**
 * report 举报插件
 * 
 * @type {Number} 被举报的类型
 */
;(function($){
    $.extend($.fn, {
        report: function(obj){
            
            /* 举报 */
            $(this).on('click', function() {
                var el = $(this),
                    type = obj.type, // 21问题, 22回答, 23评论
                    id = el.data('report-id'); // 被举报的ID
                require(['common/ui/list/list'], function(list) {
                    list.show({
                        title: '选择举报类型',
                        data: [
                            { key: '广告', val: '广告', },
                            { key: '灌水', val: '灌水', },
                            { key: '色情污秽', val: '色情污秽', },
                            { key: '危害国家安全', val: '危害国家安全', },
                        ],
                        onSelect: function(reason) {
                            submitInform(id, type, reason.key);
                            return true;
                        },
                    });
                });
            });

            /* 举报动作 */
            var submitInform = function(id, type, reason) {
                $.post('http://m.qyer.com/api.php?action=jubao', {
                    'id': id,
                    'type': type,
                    'reason': reason,
                    'page_url': window.location.href,
                }, function(json) {
                    require(['common/ui/slidTip/slidTip'], function(tip) {
                        var cfg = { type: 2, text: json.data.msg || '举报成功', delay: 3, };
                        switch (json.error_code) {
                            case 0: // 成功
                                break;
                            case 77: // 未登录
                                cfg.type = 4;
                                break;
                            default:
                                cfg.type = 5;
                        }
                        tip.show(cfg);
                    });
                }, 'json');
            };

            return this;
        }
    });
})(Zepto);
