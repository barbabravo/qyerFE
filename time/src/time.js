define('common/ui/time/time', ["common/ui/select/select"], function(select){


qyerUtil.insertStyle('.qui-select-time-hover,.qui-select-time-minute{position: absolute; top: 112px; z-index: 1; color: #2bab79; font-size: 14px;}');


function getData (aOption) {
    var data = [[],[]],k;
    for(var i=0;i<24;i++){
        k = i<10?'0'+i:i;
        data[0].push({text:k,value:k,select:k==aOption.defaultHour});
    }
    for(var i=0;i<60;i++){
        k = i<10?'0'+i:i;
        data[1].push({text:k,value:k,select:k==aOption.defaultMinute});
    }
    k=null;
    return data;
}

function getDay (aOption) {
    var data=[
        {text:'当日',value:'0',select:'0'==aOption.defaultDay},
        {text:'次日',value:'1',select:'1'==aOption.defaultDay}
        ];
    for(var i=2;i<10;i++){
        data.push({text:'+'+i,value:i,select:''+i==aOption.defaultDay});
    }
    return data;
}


var control = {
    show:function (aOption) {
        var data = getData(aOption);
        if(aOption.hasDay){
            data.push(getDay(aOption));
        }
        select.show({
            data:data,
            title:'选择时间',
            onSelect:function(aValueList) {
                aOption.onSelect && (aOption.onSelect(aValueList));
            }
        });
        data.length=0;


        var $select,l,l1,l2,cha=aOption.hasDay?25:50;
        
        $select = $(select.getContent()).find('.qui-select');
        $select.append('<div class="qui-select-time-hover" data-hasday="'+(aOption.hasDay?1:0)+'" >时</div><div class="qui-select-time-minute" data-hasday="'+(aOption.hasDay?1:0)+'">分</div>');
        l = $select.children('.list').eq(0).width();
        l1 = l-cha;
        l2 = l*2-cha;
        $select.children('.qui-select-time-hover').css('left',l1);
        $select.children('.qui-select-time-minute').css('left',l2);

        $select= l= l1= l2= cha= null;
    }
};
return control;

});