define('common/ui/tabs/tabs', function() {

function QyerTabs(aOption){
    this.$div = aOption.$div;
    this.option = aOption.option;
    this.init();
    this.bindEvent();
}

QyerTabs.prototype={
    $div:null,
    option:null,
    init:function(){        
    },
    bindEvent:function(){
        var _this = this;
        this.$div.find('.qui-tabNav').delegate('li',qyerUtil.EVENT.CLICK,function(){
            
            // li 设置 data-disabled 时直接跳出
            if($(this).attr("data-disabled")){
                return;
            }

            var $t = $(this);
            $t.parent().children('.current').removeClass('current');
            $t.addClass('current');

            var ds = $t.parent().parent().find(' .qui-tabContent > div');
            ds.removeClass('show').eq( $t.index() ).addClass('show');

            //预置事件：onSelect
            if(typeof _this.option.onSelect === 'function'){
                _this.option.onSelect.apply(null,$t);
            }

            $t= ds= null;
        });
    }
};


Zepto.extend(Zepto.fn,{
    qyerTabs:function(aOption){
        var type = $.type(aOption);

        if(type == 'object' || type == 'undefined'){            
            $.each(this,function(index,ele){
                var $this,option = aOption;
                $this = $(ele);

                if(!$this.data('_qyerTabs')){
                    $this.data('_qyerTabs',new QyerTabs({$div:$this,option:(aOption ? aOption :{})}));
                }
                $this = option = null;
            });
        }
        return this;
    }
});

});