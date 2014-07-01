define('common/ui/datePicker/datePicker', [
'common/ui/popup_base/popup_base',
'css!common/ui/datePicker/datePicker.css'
], function(popup) {

// 模块内 - 全局对象
var gOption, gStartObj, gEndObj ;


// 日历时间对象
function dClass(aType){
    this.type = aType || 1 ;
    this.initDate();
}
dClass.prototype={
    


    date:null,
    type:null, // 1 开始类型日历，2 结束类型日历
    $div:null,
    value:null,
    onSelect:null,
    
    // 初始化 日期
    initDate:function(){
        if(this.type==1){
            if(gOption.startTime){
                var t = gOption.startTime.split('-');
                t[1] = (t[1]|0)-1;
                this.date = new Date(t[0],t[1],t[2]);
                t.length=0;
                t=null;
            }
            else{this.date = new Date();}
        }else{
            if(gOption.endTime){
                var t = gOption.endTime.split('-');
                t[1] = (t[1]|0)-1;
                this.date = new Date(t[0],t[1],t[2]);
                t.length=0;
                t=null;
            }
            else{
                this.date = new Date( gStartObj.date.getFullYear(),gStartObj.date.getMonth(),gStartObj.date.getDate() );
                this.date.setDate( this.date.getDate() +3 ) ; 
            }
        }
        var cv = [ this.date.getFullYear(), this.date.getMonth()+1, this.date.getDate() ];
        this.value = cv.join('-');
        cv.length=0;
        cv=null;
    },

    // 获取当月的 html ，只有日期部分的 html
    getMonthHTML:function(){
        var currentV, content=[], startDate, currentDate,selectValue ;

        currentV = [ this.date.getFullYear() , this.date.getMonth(), this.date.getDate() ];
        startDate = new Date( currentV[0],currentV[1],1);
        startDate.setDate(startDate.getDate() - startDate.getDay() );

        currentDate = new Date();
        selectValue = this.value;
        function getAttributes( aStartDate ){
            var cv = [ aStartDate.getFullYear(), aStartDate.getMonth(), aStartDate.getDate() ];
            var attr = 'href="javascript:void(0)" class="';
            if( aStartDate.getMonth() != currentV[1] ){
                attr += ' qui-datePicker_table_noCurrent';
            }else{
                if( cv[2] == currentDate.getDate() && cv[1] == currentDate.getMonth() && cv[0] == currentDate.getFullYear() ){
                  attr += ' qui-datePicker_table_currentDay';  
                }
            }
            cv[1] = cv[1]+1;
            var v = cv.join('-') ;
            if(v==selectValue){
                attr += ' qui-datePicker_table_selected_current ';    
            }
            attr += ' " ';
            attr += 'data-value="'+ v +'"';
            cv.length=0;
            cv=v=null;
            return attr;
        }

        var iCount = 6;//this.date.getDay()<=4 ? 5 : 6;
        for(var i=0;i<iCount;i++){
            content.push('<tr>');
            for (var j=1;j<=7;j++) {
                content.push('<td>');
                content.push('<a '+ getAttributes(startDate) +' >'+ startDate.getDate() +'</a>');
                content.push('</td>');
                startDate.setDate( startDate.getDate()+1 )
            }
            content.push('</tr>');
        }

        var str = content.join('');
        content.length = 0;
        currentV= content= startDate= currentDate= selectValue= null ;
        return str;
    },

    // 获取构建 html 代码
    getHTML:function(){
        var html = [
        '<div class="qui-datePicker_item '+(this.type==1?'qui-datePicker_item_select':'')+'" data-type="'+ this.type +'" >',
        '    <div class="qui-datePicker_nav">',
        '        <div class="left"><span class="qui-icon _left"></span></div>',
        '        <div class="content">{{__title__}}</div>',
        '        <div class="right"><span class="qui-icon _right"></span></div>',
        '    </div>',
        '    <table class="qui-datePicker_table" border="0">',
        '        <thead>',
        '            <tr>',
        '                <td>周日</td><td>周一</td><td>周二</td><td>周三</td><td>周四</td><td>周五</td><td>周六</td>',
        '            </tr>',
        '        </thead>',
        '        <tbody>{{__content__}}</tbody>',
        '    </table>',
        '</div>'].join('');
        var title =  [ this.date.getFullYear() , '年' ,this.date.getMonth()+1, '月'].join('');
        return html
            .replace('{{__content__}}',this.getMonthHTML())
            .replace('{{__title__}}',title);
    },

    // 绑定事件
    bindEvt:function(){
        var _this = this;
        this.$div = $(popup.getContent()).find('.qui-datePicker_item[data-type="'+ this.type + '"]');
        this.$div.delegate('.left , .right , tbody a',qyerUtil.EVENT.CLICK,function(aEvt){
            // aEvt.preventDefault();
            if( this.className.indexOf('left') != -1 ){_this.toPrev()}
            else if( this.className.indexOf('right') != -1 ){_this.toNext()}
            else{_this.onDaySelect(this)}
        });
    },

    // 刷新
    refresh:function(){
        var timeStr = [ this.date.getFullYear(),'年',this.date.getMonth()+1,'月'].join('');
        this.$div.find('.qui-datePicker_nav > .content').html(timeStr);
        timeStr=null;
        this.$div.find('.qui-datePicker_table > tbody').html( this.getMonthHTML() );
    },

    // 上一个月
    toPrev:function(){
        this.date.setMonth( this.date.getMonth()-1 );
        this.refresh();
    },

    // 下一个月
    toNext:function(){
        this.date.setMonth( this.date.getMonth()+1 );
        this.refresh();
    },

    // 选中某一天
    onDaySelect:function(aElement){
        this.value = aElement.getAttribute('data-value');
        this.$div.find('.qui-datePicker_table > tbody  a.qui-datePicker_table_selected_current , .qui-datePicker_table > tbody  a.qui-datePicker_table_selected_noCurrent ').removeClass( 'qui-datePicker_table_selected_current qui-datePicker_table_selected_noCurrent' );
        var m = this.value.split('-')[1]|0;
        var isIn =  this.date.getMonth()+1 == m ;
        $(aElement).addClass(isIn?'qui-datePicker_table_selected_current':'qui-datePicker_table_selected_noCurrent');
        m= isIn= null;

        if(this.onSelect){
            this.onSelect(this.value,this.type);
        }
    }

}


// ===============================================================================

// 渲染模板

// 完整结构
function getTpl(){
    var tpl = [
    '<div class="qui-datePicker">',
    '    {{__tabs__}}',
    '    <div class="qui-datePicker_content">',
    '    {{__date1__}}',
    '    {{__date2__}}',
    '    ',
    '    </div>',
    '    <div class="qui-datePicker_footer" >',
    '       <div class="icon" ></div>',
    '       <div>今天</div>',
    '       <div class="icon iconSelect1"></div>',
    '       <div class="icon iconSelect2"></div>',
    '       <div>选中的日期</div>',
    '    </div>',
    '</div>'].join('');
    return tpl;
}

// 标签部分
function getTplTabs(){
    var tpl_tabs = [
    '<div class="qui-datePicker_tabs">',
        '<div class="qui-datePicker_tab qui-datePicker_tab_select js_startTime">',
        '    <a><p class="title">'+( gOption.startText || '出发日期' )+'</p><p class="time">'+ gStartObj.value +'</p></a>',
        '    <div class="tip"></div>',
        '</div>',
        '<div class="qui-datePicker_tab  js_endTime">',
        '    <a><p class="title">'+( gOption.endText || '结束日期' )+'</p><p class="time">'+ gEndObj.value +'</p></a>',
        '    <div class="tip"></div>',
        '</div>',
    '</div>',
    ].join('');
    return tpl_tabs;
}

// ===============================================================================


// 构建整个弹层的 html
function getHTML(){
    var date, title, currentV, startDate ;

    date = new Date();
    gCurrentDate =  new Date();
    currentV = [ date.getFullYear() , date.getMonth(), date.getDate() ];
    title = currentV[0] + '年' + (currentV[1]+1) + '月' ;

    startDate = new Date( currentV[0],currentV[1],1);
    gStartObj = new dClass(1);
    gEndObj = (gOption.type==2)?(new dClass(2)):null;

    var str = getTpl()
        .replace('{{__date1__}}', gStartObj.getHTML() )
        .replace('{{__date2__}}', gEndObj?gEndObj.getHTML():'')
        .replace('{{__tabs__}}', (gOption.type==2)?getTplTabs():'' );

    date= title= currentV= startDate= null ;
    return str;
}

// 切换日期类型，选择起始日期，或者结束日期
function changeTab( aViewType ){
    var $content = $(popup.getContent());

    var ts = $content.find('.qui-datePicker_tabs');
    ts.children('.qui-datePicker_tab').removeClass('qui-datePicker_tab_select').eq(aViewType).addClass('qui-datePicker_tab_select');

    var c = $content.find('.qui-datePicker_content');
    c.children( '.qui-datePicker_item ' ).removeClass('qui-datePicker_item_select').eq(aViewType).addClass('qui-datePicker_item_select');;

    $content= ts= c= null;
}


// 绑定事件
function bindEvt(){
    gStartObj.bindEvt();
    if(gEndObj){gEndObj.bindEvt();}

    if(gOption.type==2){
        gStartObj.onSelect= gEndObj.onSelect= function(aValue,aType){
            var $d = $('.' + (aType==1?'js_startTime':'js_endTime') );
            $d.find('.time').html(aValue);
            $d= null;
        }
    }


    $(popup.getContent()).find('.qui-datePicker').delegate('.js_startTime , .js_endTime , .qui-datePicker_cancelBtn',qyerUtil.EVENT.CLICK,function(aEvt){
        // aEvt.preventDefault();
        if(this.className.indexOf('js_startTime')!=-1){changeTab(0); }
        else if(this.className.indexOf('js_endTime')!=-1){changeTab(1); }
    });
}

// ---------------------------------------------------------

var control = {
    show:function(aOption){
        gOption = aOption;
        popup.show({
            type:2,
            hasHead:true,
            title:'选择日期',
            contentHTML:getHTML(),
            enableBodyScroll : true,
            onShow:function(){
                bindEvt();
            },
            onHide:function(){
                gOption= gStartObj= gEndObj= null;
            },
            onOK:function () {
                if( gOption.onSelect ){
                    return gOption.onSelect( gStartObj.value , gEndObj?gEndObj.value:null );
                }
            }
        });
    }
};
return control;
});