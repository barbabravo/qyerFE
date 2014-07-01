define('common/ui/slidTip/slidTip', function(popup) {

window.qyerUtil.insertStyle([
'.qui-bottomTip{background-color:rgba(255,255,255,0.7);width:100%;text-align: center; position: fixed; z-index:9999; opacity:0;transition-property:bottom,opacity;transition-duration:300ms;left:0px;}',
'.qui-bottomTip_show{bottom:0px !important;opacity:1;}',
'.qui-bottomTip_content{margin: 0 auto; display: inline-block; text-align: left; white-space: nowrap; padding:15px; }',
'.qui-bottomTip_content > .text{vertical-align:top;white-space: normal;height:20px;line-height:20px;font-family:"Icons"!important;-webkit-font-smoothing:antialiased;}',
'.qui-bottomTip_content >.type1::before{content:"\\f960";color:#6cbe00;font-size:20px;}',
'.qui-bottomTip_content >.type2::before{content:"\\f960";color:#6cbe00;font-size:20px;}',
'.qui-bottomTip_content >.type3::before{content:"\\f961";color:#f5b100;font-size:20px;}',
'.qui-bottomTip_content >.type4::before{content:"\\f963";color:#3ba5e2;font-size:20px;}',
'.qui-bottomTip_content >.type5::before{content:"\\f961";color:#cb0900;font-size:20px;}',
'.qui-bottomTip_content >.type6::before{content:"\\f962";color:#cb0900;font-size:20px;}'
].join(''));

var gTimer,g$Tip;

function create( aOption ){
    var html,type, delay,css=' ';

    type = aOption.type||'';
    if(type){
        css += 'type'+type;
    }

    html = [
    '<div class="qui-bottomTip">',
    '    <div class="qui-bottomTip_content">',
    '        <div class="text ' + css + '">'+ (aOption.text||"") +'</div>',
    '    </div>',
    '</div>'
    ].join('');

    g$Tip = $(html);
    g$Tip.appendTo(document.body);
    g$Tip.css( 'bottom', (-g$Tip.height()) );

    setTimeout(function(){g$Tip.addClass('qui-bottomTip_show'); },500)
    window.clearTimeout(gTimer);


    delay = aOption.delay || "2";
    delay = delay|0;
    if(delay<=0){delay=2;}
    gTimer=setTimeout(clear,(delay*1000+800))
}

function clear(isForce){
    // 强制清除
    if(isForce){
        window.clearTimeout(gTimer);
        g$Tip.remove();
        g$Tip= gTimer= null;
    }
    else{
        g$Tip.removeClass('qui-bottomTip_show');
        setTimeout(function(){
            g$Tip.remove();
            g$Tip= gTimer= null;
        },500)
    }
}


var control = {
    show:function( aOption ){
        if(g$Tip){
            clear(true);
        }
        create(aOption);
    }
};
return control;
});