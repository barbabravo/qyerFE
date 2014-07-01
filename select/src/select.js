define('common/ui/select/select', ["common/ui/popup_base/popup_base", 'css!common/ui/select/select.css'], function(popup){

function qSelect(aOption) {
    this.option = aOption;
    this.$div = aOption.$div;
    this.init();
}
qSelect.prototype={
    option:null,
    $div:null,
    init:function () {
        this.buildHTML();
    },
    buildHTML:function () {
        var html,list=[],item=[],width;

        html = [
        '<div>',
        '   <div class="qiu-select_title" >'+(this.option.title||"&nbsp;")+'</div>',
        '   <div class="qui-select  '+(screen.height<=480?'qui-select-min':'')+'  clearfix" >',
               '<div class="current"></div>',
               '<div class="top"></div>',
               '<div class="end"></div>',
               '{{__list__}}',
        '   </div>',
        '   <div class="qiu-select_okBtn">确定</div>',
        '   <div class="qiu-select_canCelBtn">取消</div>',
        '</div>',
        ].join('');

        width = (1/this.option.data.length*100) + '%';
        $.each(this.option.data,function () {
            item.push('<ul class="list" data-count="'+ this.length +'"   style="top: 100px;width:'+ width +';" >');
            $.each(this,function () {
                item.push('<li data-value="'+this.value+'" '+( this.select?'data-default="true"':'' )+' >'+ this.text +'</li>');    
            });
            item.push('</ul>');
            list.push(item.join(''));
            item.length=0;
        });
        
        html = html.replace('{{__list__}}',list.join(''));
        this.$div = $(html);

        list.length= item.length= 0;
        html= list= item= width= null;
    },
    getHTML:function () {
        return  this.$div[0].outerHTML ;
    },
    bindEvent:function( a$div ) {
        this.$div = a$div.find('.qui-select');

        var _this = this;
        this.$div.delegate('.list','touchstart',function  (aEvt) {_this.evt_touchstart(aEvt); });
        this.$div.delegate('.list','touchmove',function  (aEvt) {_this.evt_touchmove(aEvt); });
        this.$div.delegate('.list','touchend',function  (aEvt) {_this.evt_touchend(aEvt); });
        a$div.find('.qiu-select_okBtn').click(function (aEvt) {_this.evt_ok(aEvt); });
        a$div.find('.qiu-select_canCelBtn').click(function (aEvt) {_this.evt_cancel(aEvt); }); 

        var $list,$li;
        this.$div.children('.list').each(function () {
            $list = $(this);
            $li = $list.children('li[data-default="true"]');
            if($li.length){
                $li.addClass('selectItem');
                $list.css('top',(100-$li.index()*50));
            }else{
                $list.children('li').eq(0).addClass('selectItem');
            }
        });
        $list= $li= null;
    },

    _startPoint:null,
    _touchList:null,
    _top:null,
    _itemCount:null,
    evt_touchstart:function (aEvt) {
        this._touchList = aEvt.currentTarget;
        this._itemCount = this._touchList.getAttribute('data-count')|0;
        if(this._itemCount>1){
            this._startPoint = aEvt.touches[0].pageY;
            this._top = this._touchList.style.top;
            this._top = this._top?(parseInt(this._top,10)):0;
        }else{
            aEvt.stopPropagation();
            aEvt.preventDefault();
        }
    },
    
    evt_touchmove:function (aEvt) {
        if(this._itemCount<=1){return; }

        var top = aEvt.touches[0].pageY - this._startPoint + this._top;
        if(top>=(this._itemCount==2?50:0) && top<=100){
            this._touchList.style.top = top + 'px';
        }else if( top <0 && (this._itemCount-3)*50 >= Math.abs(top) ){
            this._touchList.style.top = top + 'px';
        }
        top=null;
    },
    
    evt_touchend:function (aEvt) {
        if(this._itemCount>1){
            var top,cha,correction;
            
            top = parseInt( this._touchList.style.top,10);
            cha = Math.abs(top%50);
            if(cha>=25){
                if(top>=0){correction = top+50-Math.abs(cha); }
                else {correction = top-50+Math.abs(cha); }
            }
            else{
                if(top>=0){correction = top-Math.abs(cha); }
                else{correction = top+Math.abs(cha); }
            }
            this._touchList.style.top = correction + 'px';
            this.setSelectItemStyle(this._touchList);

            top= cha= correction= null;
        }
        this._startPoint= this._touchList= this._top= this._itemCount= null;
    },

    getValue:function () {
        var result = [],item;
        this.$div.children('.list').each(function () {
            item = $(this).children('.selectItem');
            result.push( {text:item.text(),value:item.attr('data-value')} );
        });
        return result;
    },

    evt_ok:function (aEvt) {
        if(this.option.onSelect){
            this.option.onSelect(this.getValue());
        }
        popup.hide();
    },

    evt_cancel:function (aEvt) {
        popup.hide();
    },

    setSelectItemStyle:function (aList) {
        var $this,top,index=0,c=100;

        $this = $(aList);
        $this.find('.selectItem').removeClass('selectItem');
        top = parseInt( $this.css('top'), 10 );
        while(c-top!=0){
            c-=50;
            index++;
        }
        $this.children('li').eq(index).addClass('selectItem');

        $this= top= index= c= null;
    }

};


// -----------------------------------------------------------------------------

var control = {
    show:function (aOption) {
        var select = new qSelect(aOption);
        popup.show({
            type:1,
            contentHTML:select.getHTML(),
            onShow:function () {
                window.qyerUtil.disableBodyScroll();
                aOption.onShow && (aOption.onShow() );
            },
            onHide:function () {
                window.qyerUtil.enableBodyScroll();
                aOption.onHide && (aOption.onHide() );
            }
        });
        select.bindEvent( $(popup.getContent()) );
        select=null;
    },
    getContent:function () {
        return popup.getContent();
    }
};
return control;

});