define('common/ui/editer1/editer1', [
'common/ui/popup_base/popup_base',
'css!common/ui/editer1/editer1.css'
], function(popup) {

// 全局对象
var gEditClass, gOption;

function EditClass(){
    this.init();
}
EditClass.prototype={

    textareaMax:null,
    tip:null,
    $content:null,
    $textarea:null,

    init:function(){
        this.textareaMax = gOption.maxLength||200;
    },

    getHTML:function(type){
        var tpl;
        switch(type){
            case 1:
                tpl = [
                    '<div class="qui-editer1" >',
                    '    <div class="qui-editer1_content" >',
                    '       <input class="title1" placeholder="'+ (gOption.input1Placeholder||'') +'" value="'+ (gOption.input1TitleText||'') +'"/> ',
                    '       <div class="textareaContent" >',
                    '           <textarea  class="textarea" placeholder="'+ (gOption.textarea1Placeholder||'') +'" >'+ (gOption.textarea1Text||'') + '</textarea>',
                    '           <div class="tip" >'+ (gOption.maxLength||200) +'</div>',
                    '       </div>',
                    '    </div>',
                    '</div>'
                ].join('');
                break;
            case 2:
                tpl = [
                    '<div class="qui-editer1" >',
                    '    <div class="qui-editer1_content" >',
                    '       <div class="textareaContent" >',
                    '           <textarea  class="textarea" placeholder="'+ (gOption.textarea1Placeholder||'') +'" >'+ (gOption.textarea1Text||'') + '</textarea>',
                    '           <div class="tip" >'+ (gOption.maxLength||200) +'</div>',
                    '       </div>',
                    '    </div>',
                    '</div>'
                ].join('');
                break;
        }
        return tpl;
    },

    bindEvt:function(){
        var _this = this;
        
        this.$content = $(popup.getContent()).find('.qui-editer1');
        this.$title1 = this.$content.find(".title1");
        this.$textarea = this.$content.find('.textarea');
        this.tip = this.$content.find('.tip')[0];

        var _timer;
        this.$textarea.on('input',qyerUtil.runOneInPeriodOfTime(function(){
            _this.onTextAreaKeyUp();
        }));

        this.$textarea.trigger('input');
    },

    onTextAreaKeyUp:function(){
        var len = this.$textarea.val().length;
        var sy = this.textareaMax - len;

        if( sy<0 ){
            if(this.tip.className.indexOf('tipError') == -1){
                this.tip.className = 'tip tipError';
            }
        }
        else {
            if(this.tip.className.indexOf('tipError') != -1){
                this.tip.className = 'tip';
            }
        }
        this.tip.innerHTML = sy>0?sy:0;
        len= sy= null
    },
    getValue:function(){
        var _this = this;
        var args = [];
        this.$title1.size() > 0 ? args.push(this.$title1.val()) : "";
        args.push(this.$textarea.val());
        return args;
    }
}



// ===================================================


var control = {
    show:function(aOption){
        gOption = aOption;
        gEditClass = new EditClass();

        popup.show({
            type:2,
            hasHead:true,

            title:gOption.title,
            okBtnText:gOption.okText || 'OK',
            okBtnIpg:gOption.okBtnIpg || '',
            cancelBtnText:gOption.cancelText || 'cancel',
            cancelBtnIpg:gOption.cancelBtnIpg || '',
            contentHTML:gOption.input1 === false ? gEditClass.getHTML(2) : gEditClass.getHTML(1),
            onOK:function () {
              if(gOption.onOK) {return gOption.onOK.apply(null,gEditClass.getValue())};  
            },
            onShow:function(){
                gEditClass.bindEvt();
                if(gOption.onShow){
                    gOption.onShow();
                }
            },
            onHide:function(){
                gEditClass=null;
            }
        });
    },
    hide:function(){
        popup.hide();
    }
};
return control;
});