define('common/ui/loading/loading', ['common/ui/popup_base/popup_base'], function(popup) {


var css=[
'.qui-loading {display: table; height: 100%; width: 100%; }',
'.qui-loading-content {display: table-cell; text-align: center; vertical-align: middle; }'
].join('');
window.qyerUtil.insertStyle(css);
css.length=0;
css=null;


function getHTML(aOption){
    var img = aOption.loadImgSrc || "http://static.qyer.com/m/common/ui/loading/loading_big.gif" ;
    var tpl=[
    '<div class="qui-loading" >',
    '   <div class="qui-loading-content" >',
    '       <img src="'+img+'" />',
    '   </div>',
    '</div>'
    ].join('');
    img=null;
    return tpl;
}

var control = {
    show:function(aOption){
        popup.show({
            type:1,
            contentHTML:getHTML(aOption)
        });
        if(aOption.onShow){
            aOption.onShow();
        }
    },
    hide:function(){
        popup.hide();
    }
};
return control;

});