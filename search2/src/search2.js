define('common/ui/search2/search2', [
'common/ui/popup_base/popup_base',
'css!common/ui/search2/search2.css'
], function(popup) {

// 全局变量 
var gOption, gIsSearching;

// ============================================================

var model = {

    getHTML:function(){
        var tpl = [
        '<div class="qui-search">',
        '   <div class="qui-search_nav">',
        '       <div class="qui-search_nav_return js_return">&lt;</div>',
        '       <div class="qui-search_nav_search">',
        '           <input class="js_searchInput" type="text" placeholder="'+( gOption.placeholder||"搜索" )+'" />',
        '           <div class="staticIcon"></div>',
        '       </div>',
        '       <div class="qui-search_nav_searchBtn js_search" '+ (!gOption.hasBtn?'style="display:none;"':''  ) +' >搜 索</div>',
        '   </div>',
        '   <div class="qui-search_content"></div>',
        '</div>'
        ].join('');
        return tpl;
    },

    bindEvent:function(){
        var $div = $(popup.getContent()).find('.qui-search_nav');
        var $input = $div.find('.js_searchInput');

        $div.delegate('.js_return , .js_search , .js_clear ',qyerUtil.EVENT.CLICK,function(aEvt){
            if( this.className.indexOf('js_return') != -1 ){popup.hide();}
            else if( this.className.indexOf('js_search') != -1 ){
                popup.hide();
                if(gOption.onSearch){
                    gOption.onSearch( $input.val() );
                    return;
                }
            }
            else if( this.className.indexOf('js_clear') != -1 ){
                $input.val('').next().removeClass('js_clear');
                $div.next().html('');
                return false;
            }
        });

         $div.delegate('.js_clear ','touchstart',function(){
            $input.val('').next().removeClass('js_clear');
            $div.next().html('');
            return false;
        });

        
        // 这块写死 click 没有用 qyerUtil.EVENT.CLICK 因为，滚动 div 的时候（时间很短的时候）也会触发 tap 事件
        $div.next().delegate('li,.qui-search_result_createBtn_div',qyerUtil.EVENT.CLICK,function(aEvt){
            if( this.className.indexOf('qui-search_result_createBtn_div') != -1 ){
                if(gOption.onButtonClick){
                    gOption.onButtonClick(this);
                }
            }
            else if(gOption.onSelect){
                gOption.onSelect(this);
            }
            popup.hide();
        });


        $input.on('input',qyerUtil.runOneInPeriodOfTime(function(){
            if($input.val()){
                $input.next().addClass('js_clear');
                doSearch();
            }else{
                $input.next().removeClass('js_clear');
                $div.next().html('');
            }
        }));

        function doSearch(){
            if(!gIsSearching && $.trim($input.val()) ){
                gIsSearching = true;
                $input.next().addClass('js_searching').removeClass('js_clear');
                if(gOption.onKeyDown){
                    gOption.onKeyDown( $input.val() );
                }
            }
        }
    },

    pushHTML:function(aHTML){
        gIsSearching = false;
        var $div = $(popup.getContent()).find('.qui-search');
        $div.find('.qui-search_content').html(aHTML);
        var $input = $div.find('.js_searchInput');
        $input.next().removeClass('js_searching').addClass('js_clear');;

        $div= $input= null;
    }


};


// ============================================================

var control = {
    show:function(aOption){
        gOption = aOption;
        gIsSearching = false;
        popup.show({
            type:1,
            enableBodyScroll:true,
            contentHTML:model.getHTML(),
            onShow:function(){
                window.scrollTo(0,0);
                model.bindEvent();
            }
        });
    },
    pushHTML:function(aHTML){
        model.pushHTML( aHTML );
    }
};
return control;

});