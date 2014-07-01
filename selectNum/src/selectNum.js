define('common/ui/selectNum/selectNum', [
    'common/ui/popup_base/popup_base',
    'css!common/ui/selectNum/selectNum.css'
],function(popup) {
    function SelectNum(opt){
        this.init(opt);
    }
    SelectNum.prototype = {
        className:"qui-number",
        defNum:3,
        init:function(opt){
            $.extend(this,opt||{});
            this.getHtml();
        },
        bindEvent:function(){
            var me = this;
            $("."+this.className).unbind("touchstart").bind("touchstart",function(evt){
                var el = evt.srcElement||evt.target,
                    fun = $(el).attr("data-fun");
                fun&&me[fun]();
                evt.stopPropagation();
                evt.preventDefault();
            })
        },
        prev:function(){
            if(this.defNum!=1){
                this.defNum -= 1;
                this.setNum();
            }
        },
        next:function(){
            if(this.defNum!=50){
                this.defNum += 1;
                this.setNum();
            }
        },
        queren:function(){
            $(this).trigger("queren");
            this.cancel();
        },
        cancel:function(){
            popup.hide();
        },
        setNum:function(){
            $("."+this.className).find(".nav_cCumber").html(this.defNum);
        },
        getHtml:function(){
            this.html = '<div class="'+this.className+'">'+
                (this.title||"")+
                '<div class="nav">'+
                '<div class="nav_prev" data-fun="prev">-</div>'+
                '<div class="nav_cCumber">'+this.defNum+
                '</div>'+
                '<div class="nav_next" data-fun="next">+</div>'+
                '</div>'+
                '<div class="queren_btn" data-fun="queren">确认</div>'+
                '<div class="cancel_btn" data-fun="cancel">取消</div>'+
                '</div>';
            this.dom = $(this.html);
        },
        show:function(){
            popup.show({
                type:1,
                contentHTML:this.dom
            });
            this.bindEvent();

        }
    };
    return SelectNum;
});