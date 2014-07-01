define('common/ui/list/multi-list',["common/ui/popup_base/popup_base", "css!common/ui/list/list.css"], function(popup_base) {
    
    var para, selection = [], groupKey = { 'map' : {}, 'arr' : [] }, itemKey = {};
    var $tab, $cnt, $current;

    var _tabtipWidth = 4;

    function renderFrame() {
        var tab = [
            '<div class="qui-list_tabNav">'
        ,       '<ul>'
        ,           ''
        ,       '</ul>'
        ,       '<div class="qui-list_tabNavTip"></div>'
        ,   '</div>'
        ];

        var cnt = [
            '<div class="qui-list_tabContent">'
        ,       ''
        ,   '</div>'
        ];

        var tabArr = [], cntArr = [];

        for (var i=0, len=para.group.length; i<len; i++) {
            var key = 'key' in para.group[i] ? para.group[i].key : i;
            groupKey.map[key] = i;
            groupKey.arr.push(key);
            selection.push({});

            tabArr.push(_renderSingleTab(i, para.group[i]));
            cntArr.push(_renderList(i, para.group[i]));
        }

        tab[2] = tabArr.join("");
        cnt[1] = cntArr.join("");

        return [ tab.join(""), cnt.join("") ].join("");
    }

    function _renderSingleTab(i, item) {
        return [
                '<li data-quiListTabKey="', groupKey.arr[i], '"'
            ,       ' data-quiListTabIndex="', i, '"'
            ,       (para.group[i].ipg ? '" data-bn-ipg="'+para.group[i].ipg+'"' : '')
            ,   '>'
            ,       item.title || ('组'+i)
            ,   '</li>'
            ].join("");
    }

    function _renderList(i, item) {
        var prefix = [
                '<div class="qui-list_innerTabContent" data-quiListTabKey="'
            ,       groupKey.arr[i]
            ,       '" data-quiListTabIndex="'
            ,       i
            ,   '">'
            ,       (item.fullTitle ? '<p class="qui-list_tabTitle">'+item.fullTitle+'</p>' : '')
            ,       '<ul class="qui-list qui-list_default'
            ,           (!item.html && !item.template)
                            ? (item.listType ? ' qui-list_'+item.listType : ' qui-list_default_li')
                            : ""
            ,           '">'
            ].join("");

        var surfix = [
                    '</ul>'
            ,   '</div>'
            ].join("");

        var li = [];

        itemKey[groupKey.arr[i]] = { map : {}, arr: [] };

        for (var j=0, len=item.data.length; j<len; j++) {
            var key = 'key' in item.data[j] ? item.data[j].key : j;

            itemKey[groupKey.arr[i]].map[key] = j;
            itemKey[groupKey.arr[i]].arr.push(key);

            var pre = [
                    '<li data-quiListKey="', key, '"'
                ,       ' data-quiListIndex="' , j , '"'
                ,       ' data-quiListTabIndex="' , i , '"'
                ,       (item.data[j].ipg ? ' data-bn-ipg="'+item.data[j].ipg+'"' : '')
                ,   '>'
                ].join(""),
                inner,
                sur = '</li>';

            try {
                inner = item.html
                        ? item.data[j].val
                        : (item.template)
                            ? window.qyerUtil.renderTemplate(item.template, item.data[j])
                            : item.data[j].val;
            }
            catch (err) {}

            li.push([ pre, inner || "", sur ].join(""));
        }

        return [ prefix, li.join(""), surfix ].join("");
    }

    

    function bind_n_switch() {
        var c = $(popup_base.getContent());

        $tab = c.find('.qui-list_tabNav li');
        $tabtip = c.find('.qui-list_tabNavTip');
        $cnt = c.find('.qui-list_tabContent .qui-list_innerTabContent');

        // tab events
        $tab.on(window.qyerUtil.EVENT.CLICK, function(){
            switchTab($(this).attr('data-quiListTabKey'));
        });

        // list events
        for (var i=0, len=$cnt.length; i<len; i++) {
            $($cnt[i]).find('.qui-list > li').on(window.qyerUtil.EVENT.CLICK, function(){
                var obj = {
                        key : $(this).attr('data-quiListKey'),
                        index : $(this).attr('data-quiListIndex'),
                        groupIndex : $(this).attr('data-quiListTabIndex'),
                        el : $(this)
                    };
                    obj.groupKey = groupKey.arr[obj.groupIndex];
                    obj.data = para.group[obj.groupIndex].data[obj.index];

                if (typeof para.group[obj.groupIndex].onSelect == 'function') {
                    para.group[obj.groupIndex].onSelect(obj);
                }

                selectItem(obj);
            });
        }

        selectItem(para.selected);
        switchTab(para.defaultTab);
    }


    function selectItem(slct) {
        if (!slct)
            return;

        if ('el' in slct && typeof slct.el.attr == 'function') {
            // click on an object
            if (selection[slct.groupIndex].el) {
                selection[slct.groupIndex].el.removeClass('_selected');
            }
            
            slct.el.addClass('_selected');
            selection[slct.groupIndex] = slct;
        }
        else {
            // only keys
            for (gkey in slct) {
                if (gkey in groupKey.map) {
                    if (slct[gkey] in itemKey[gkey].map) {
                        var el = $($cnt[groupKey.map[gkey]]).find('[data-quiListKey="' + slct[gkey] + '"]');
                        el.triggerHandler(window.qyerUtil.EVENT.CLICK);
                    }
                    else if (!slct[gkey]) { // -1, false etc, remove
                        if (selection[groupKey.map[gkey]].el) {
                            selection[groupKey.map[gkey]].el.removeClass('_selected');
                        }
                        selection[gkey] = {};
                    }
                }
            }
        }
    }

    function switchTab(key) {
        var index = key
            ? ( key in groupKey.map
                ? groupKey.map[key]
                : ( (typeof key== 'number' && key>-1 && key<groupKey.arr.length)
                    ? key
                    : 0
                    )
                )
            : 0;

        // tab

        if ($current && $current.tab) {
            $current.tab.removeClass('_current');
        }

        $($tab[index]).addClass('_current');

        $tabtip.css({
            'left' : (parseInt($($tab[index]).position().left) + parseInt($($tab[index]).width())/2 - _tabtipWidth) + 'px'
        });

        // content
        if ($current && $current.cnt) {
            $current.cnt.hide();
        }

        $($cnt[index])
            .css({ opacity: 0 })
            .show()
            .css({ opacity: 1 });

        // data
        $current = {
            'tab' : $($tab[index]),
            'cnt' : $($cnt[index]),
            'index' : index
        };
        return;
    }

    var pub = {
        show : function (options) {
            para = options;

            popup_base.show({
                type : 1,
                hasHead : true,
                title : options.title || '选择',
                okBtnText : options.okBtnText || '完成',
                okBtnIpg : options.okBtnIpg,
                cancelBtnText : options.cancelBtnText || '取消',
                cancelBtnIpg : options.cancelBtnIpg,
                enableBodyScroll : true,
                contentHTML : renderFrame(),
                onShow : bind_n_switch,
                onHide : para.onHide,
                onOK : function(){
                    var smp = {};
                    for (var i=0, len=selection.length; i<len; i++) {
                        if (selection[i].el) {
                            smp[selection[i].groupKey] = selection[i];
                        }
                    }
                    para.onConfirm.call(this, smp);
                },
                onCancel : options.onCancel
            });
            if (typeof para.onShow == 'function') {
                para.onShow();
            }
        },

        hide : function () {
            selection = [];
            groupKey = { 'map' : {}, 'arr' : [] };
            itemKey = {};
            $current = null;

            popup_base.hide();
        },

        switch : function (index) {
            switchTab(index);
        },

        select : function (sel) {
            selectItem(sel);
        }
    }

    return pub;
});