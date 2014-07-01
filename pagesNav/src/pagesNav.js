define('common/ui/pagesNav/pagesNav', [
'common/ui/popup_base/popup_base',
'css!common/ui/pagesNav/pagesNav.css'
],function(popup) {


function PagesNav(aDiv,aOption){
    this.$div = $(aDiv);
    this.option = aOption;
    this.init();
}
PagesNav.prototype={
    $div:null,
    $content:null,
    option:null,
    current:null,
    count:null,

    init:function(){
        this.current = this.$div.attr('data-page-current')|0;
        this.count = this.$div.attr('data-page-count')|0;

        this.createbtn();
        this.bindEvent();
    },

    createbtn:function(){
        var html=[
        '<div class="qui-pagesNav_left">&lt;上一页</div>',
        '<div class="qui-pagesNav_content"><span>'+this.current+' / '+this.count+' </span><span class="down"></span></div>',
        '<div class="qui-pagesNav_right">下一页&gt;</div>',
        ].join('');

        this.$div.html(html);
        this.$content = this.$div.children('.qui-pagesNav_content');

        html=null;
    },

    bindEvent:function(){
        var _this = this;
        this.$div.delegate('.qui-pagesNav_left, .qui-pagesNav_content, .qui-pagesNav_right',qyerUtil.EVENT.CLICK,function(){
            if(this.className.indexOf('qui-pagesNav_left')!=-1){
                _this.goPrev();
            }
            else if(this.className.indexOf('qui-pagesNav_right')!=-1){
                _this.goNext();
            }
            else if(this.className.indexOf('qui-pagesNav_content')!=-1){
                _this.showSelectPopup();
            }
        });
    },

    goPrev:function(){
        if(this.current > 1){
            this.current--;
            this.callOnGoPage();
        }
    },

    goNext:function(){
        if(this.current < this.count){
            this.current++;
            this.callOnGoPage();
        }
    },

    showSelectPopup:function(){
        var _this = this;
        new SelectPage({
            current:this.current,
            count:this.count,
            onSelect:function(aPage){
                _this.current = aPage;
                _this.callOnGoPage();
            }
        });
    },

    callOnGoPage:function(){
        this.$content.children('span').eq(0).html(this.current+' / '+this.count);
        if(this.option.onGoPage){
            this.option.onGoPage.call(this.$div[0],this.current);
        }
    }
};

function SelectPage(aOption){
    this.option = aOption;
    this.page = aOption.current;
    popup.show({
        type:1,
        contentHTML:this.getHTML()
    });
    this.bindEvent();
}
SelectPage.prototype={
    page:null,
    option:null,
    $input:null,
    getHTML:function(){
        return [
        '<div class="qui-pagesNav_popup" >',
        '   <div class="qui-pagesNav_popup_content" >',
        '       <div class="space" ></div>',
        '       <div class="qui-pagesNav_popup_content" >',
        '           <div class="numbers" >',
        '               <div class="numbers_nav" >',
        '                   <div class="numbers_nav_prev js_prev" data-fun="evt_prev">-</div> ',
        '                   <div class="numbers_nav_cCumber" ><input type="text" value="'+ this.page +'" class="js_inputKey"  /></div> ',
        '                   <div class="numbers_nav_next js_next" data-fun="evt_next" >+</div> ',
        '               </div>',
        '               <div>',
        '                   <span>'+ this.option.count +'</span>',
        '                   <div class="line" ></div>',
        '               </div>',
        '           </div>',
        '           <div class="qui-pagesNav_popup_content_btn" >',
        '               <div class="first js_first" data-fun="evt_first">首页</div>',
        '               <div class="go js_go" data-fun="evt_go">跳转</div>',
        '               <div class="last  js_last" data-fun="evt_last">尾页</div>',
        '           </div>',
        '       </div>',
        '       <div class="space" ></div>',
        '   </div>',
        '   <div class="qui-pagesNav_popup_bottom js_cancle" data-fun="evt_cancel">取消</div>',
        '</div>'
        ].join('');
    },
    bindEvent:function(){
        var _this = this;
        var $popup = $(popup.getContent());
        this.$input = $popup.find('.js_inputKey');
        // this.$input.keyup( qyerUtil.runOneInPeriodOfTime(function () {
        //     _this.evt_keyUp();
        // }) );

        $popup.find('.qui-pagesNav_popup')
            .delegate('.js_cancle, .js_prev, .js_next, .js_first, .js_go , .js_last',qyerUtil.EVENT.CLICK,function(aEvt){
                var fun = this.getAttribute('data-fun');
                fun = _this[fun];
                fun.call(_this,aEvt)

                fun=null;
        });
    },

    // evt_keyUp:function(){
    //     var page = this.$input.val();
    //     page = page.replace(/[^0-9]/g,'');
    //     alert(page)
    // },

    evt_cancel:function(){
        popup.hide();
    },


    evt_go:function(){
        function showError() {
            alert('请输入正确的页码');
        }

        if( (/^[1-9][0-9]*$/gi).test(this.$input.val()) ){
            var page = this.$input.val()|0;
            if(page>=1 && page <= this.option.count){
                popup.hide();
                this.option.onSelect(page);
            }else{
                showError();    
            }
        }
        else{
            showError();
        }
    },

    evt_prev:function(){
        if(this.page >1 ){
            this.page--;
            this.setPage();
        }
    },

    evt_next:function(){
        if(this.page < this.option.count ){
            this.page++;
            this.setPage();
        }
    },

    evt_first:function(){
        this.page=1;
        this.setPage();
    },

    evt_last:function(){
        this.page=this.option.count;
        this.setPage();
    },

    setPage:function () {
        this.$input.val(this.page);
    }


};


Zepto.extend(Zepto.fn,{
    qyerPagesNav:function(aOption){
        $.each(this,function(){new PagesNav(this,aOption); });
    }
});

});