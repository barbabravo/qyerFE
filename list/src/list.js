define('common/ui/list/list',["common/ui/popup_base/popup_base", "css!common/ui/list/list.css"], function(pb) {
    
    var para;

    function renderData() {
        var prefix = [
                '<div class="qui-list_content">'
            ,       '<div class="qui-list_innerContent">'
            ,           (para.title ? '<p class="qui-list_title">'+para.title+'</p>' : '')
            ,           '<ul class="qui-list'
            ,           (!para.customize) ? ' qui-list_default' : para.customize
            ,           (!para.html && !para.template)
                            ? (para.listType ? ' qui-list_'+para.listType : ' qui-list_default_li')
                            : ""
            ,           '">'
            ].join("");

        var surfix = [
                        '</ul>'
            ,       '</div>'
            ,       '<div class="qui-list_valignFix"></div>'
            ,   '</div>'
            ,   '<div class="qui-list_ctrl">'
            ,       '<div class="qui-list_cancel"'
            ,           (para.cancelBtnIpg ? ' data-bn-ipg="'+para.cancelBtnIpg+'"' : '' )
            ,       '>取消</div>'
            ,   '</div>'
            ].join("");

        var li = [];


        for (var i=0, len=para.data.length; i<len; i++) {
            var pre = '<li data-quiListKey="' + (para.data[i].key || i) + '" data-quiListIndex="' + i + '"'
                        + (para.data[i].ipg ? ' data-bn-ipg="'+para.data[i].ipg+'" ' : '' ) + '>',
                inner,
                sur = '</li>';

            try {
                inner = para.html
                        ? para.data[i].val
                        : (para.template)
                            ? window.qyerUtil.renderTemplate(para.template, para.data[i])
                            : para.data[i].val;
            }
            catch (err) {}

            li.push([ pre, inner || "", sur ].join(""));
        }
        
        return [ prefix, li.join(""), surfix ].join("");
    }

    function bindEventHandler() {
        var c = $(pb.getContent());
        c.find('.qui-list_cancel').on(qyerUtil.EVENT.CLICK, function() {
            if (typeof para.onCancel == 'function') {
                para.onCancel();
            }
            pb.hide();
        });

        c.find('.qui-list').delegate('li', qyerUtil.EVENT.CLICK, function() {
            if (typeof para.onSelect == 'function') {
                para.onSelect({
                    key : $(this).attr('data-quiListKey'),
                    index : $(this).attr('data-quiListIndex'),
                    data : para.data[$(this).attr('data-quiListIndex')],
                    el : $(this)
                });
            }
            pb.hide();
        });
    }

    var pub = {
        show : function (options) {
            para = options;
            pb.show({
                type : 1,
                enableBodyScroll: true,
                contentHTML : renderData(),
                onShow : bindEventHandler,
                onHide : para.onHide
            });
            if (typeof para.onShow == 'function') {
                para.onShow();
            }
        },

        hide : function () {
            pb.hide();
        }
    }

    return pub;
});