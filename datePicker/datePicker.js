define("common/ui/datePicker/datePicker",["common/ui/popup_base/popup_base","css!common/ui/datePicker/datePicker.css"],function(a){var b,c,d;function e(a){this.type=a||1;this.initDate()}e.prototype={date:null,type:null,$div:null,value:null,onSelect:null,initDate:function(){if(this.type==1){if(b.startTime){var a=b.startTime.split("-");a[1]=(a[1]|0)-1;this.date=new Date(a[0],a[1],a[2]);a.length=0;a=null}else{this.date=new Date}}else{if(b.endTime){var a=b.endTime.split("-");a[1]=(a[1]|0)-1;this.date=new Date(a[0],a[1],a[2]);a.length=0;a=null}else{this.date=new Date(c.date.getFullYear(),c.date.getMonth(),c.date.getDate());this.date.setDate(this.date.getDate()+3)}}var d=[this.date.getFullYear(),this.date.getMonth()+1,this.date.getDate()];this.value=d.join("-");d.length=0;d=null},getMonthHTML:function(){var a,b=[],c,d,e;a=[this.date.getFullYear(),this.date.getMonth(),this.date.getDate()];c=new Date(a[0],a[1],1);c.setDate(c.getDate()-c.getDay());d=new Date;e=this.value;function f(b){var c=[b.getFullYear(),b.getMonth(),b.getDate()];var f='href="javascript:void(0)" class="';if(b.getMonth()!=a[1]){f+=" qui-datePicker_table_noCurrent"}else{if(c[2]==d.getDate()&&c[1]==d.getMonth()&&c[0]==d.getFullYear()){f+=" qui-datePicker_table_currentDay"}}c[1]=c[1]+1;var g=c.join("-");if(g==e){f+=" qui-datePicker_table_selected_current "}f+=' " ';f+='data-value="'+g+'"';c.length=0;c=g=null;return f}var g=6;for(var h=0;h<g;h++){b.push("<tr>");for(var i=1;i<=7;i++){b.push("<td>");b.push("<a "+f(c)+" >"+c.getDate()+"</a>");b.push("</td>");c.setDate(c.getDate()+1)}b.push("</tr>")}var j=b.join("");b.length=0;a=b=c=d=e=null;return j},getHTML:function(){var a=['<div class="qui-datePicker_item '+(this.type==1?"qui-datePicker_item_select":"")+'" data-type="'+this.type+'" >','    <div class="qui-datePicker_nav">','        <div class="left"><span class="qui-icon _left"></span></div>','        <div class="content">{{__title__}}</div>','        <div class="right"><span class="qui-icon _right"></span></div>',"    </div>",'    <table class="qui-datePicker_table" border="0">',"        <thead>","            <tr>","                <td>周日</td><td>周一</td><td>周二</td><td>周三</td><td>周四</td><td>周五</td><td>周六</td>","            </tr>","        </thead>","        <tbody>{{__content__}}</tbody>","    </table>","</div>"].join("");var b=[this.date.getFullYear(),"年",this.date.getMonth()+1,"月"].join("");return a.replace("{{__content__}}",this.getMonthHTML()).replace("{{__title__}}",b)},bindEvt:function(){var b=this;this.$div=$(a.getContent()).find('.qui-datePicker_item[data-type="'+this.type+'"]');this.$div.delegate(".left , .right , tbody a",qyerUtil.EVENT.CLICK,function(a){if(this.className.indexOf("left")!=-1){b.toPrev()}else if(this.className.indexOf("right")!=-1){b.toNext()}else{b.onDaySelect(this)}})},refresh:function(){var a=[this.date.getFullYear(),"年",this.date.getMonth()+1,"月"].join("");this.$div.find(".qui-datePicker_nav > .content").html(a);a=null;this.$div.find(".qui-datePicker_table > tbody").html(this.getMonthHTML())},toPrev:function(){this.date.setMonth(this.date.getMonth()-1);this.refresh()},toNext:function(){this.date.setMonth(this.date.getMonth()+1);this.refresh()},onDaySelect:function(a){this.value=a.getAttribute("data-value");this.$div.find(".qui-datePicker_table > tbody  a.qui-datePicker_table_selected_current , .qui-datePicker_table > tbody  a.qui-datePicker_table_selected_noCurrent ").removeClass("qui-datePicker_table_selected_current qui-datePicker_table_selected_noCurrent");var b=this.value.split("-")[1]|0;var c=this.date.getMonth()+1==b;$(a).addClass(c?"qui-datePicker_table_selected_current":"qui-datePicker_table_selected_noCurrent");b=c=null;if(this.onSelect){this.onSelect(this.value,this.type)}}};function f(){var a=['<div class="qui-datePicker">',"    {{__tabs__}}",'    <div class="qui-datePicker_content">',"    {{__date1__}}","    {{__date2__}}","    ","    </div>",'    <div class="qui-datePicker_footer" >','       <div class="icon" ></div>',"       <div>今天</div>",'       <div class="icon iconSelect1"></div>','       <div class="icon iconSelect2"></div>',"       <div>选中的日期</div>","    </div>","</div>"].join("");return a}function g(){var a=['<div class="qui-datePicker_tabs">','<div class="qui-datePicker_tab qui-datePicker_tab_select js_startTime">','    <a><p class="title">'+(b.startText||"出发日期")+'</p><p class="time">'+c.value+"</p></a>",'    <div class="tip"></div>',"</div>",'<div class="qui-datePicker_tab  js_endTime">','    <a><p class="title">'+(b.endText||"结束日期")+'</p><p class="time">'+d.value+"</p></a>",'    <div class="tip"></div>',"</div>","</div>"].join("");return a}function h(){var a,h,i,j;a=new Date;gCurrentDate=new Date;i=[a.getFullYear(),a.getMonth(),a.getDate()];h=i[0]+"年"+(i[1]+1)+"月";j=new Date(i[0],i[1],1);c=new e(1);d=b.type==2?new e(2):null;var k=f().replace("{{__date1__}}",c.getHTML()).replace("{{__date2__}}",d?d.getHTML():"").replace("{{__tabs__}}",b.type==2?g():"");a=h=i=j=null;return k}function i(b){var c=$(a.getContent());var d=c.find(".qui-datePicker_tabs");d.children(".qui-datePicker_tab").removeClass("qui-datePicker_tab_select").eq(b).addClass("qui-datePicker_tab_select");var e=c.find(".qui-datePicker_content");e.children(".qui-datePicker_item ").removeClass("qui-datePicker_item_select").eq(b).addClass("qui-datePicker_item_select");c=d=e=null}function j(){c.bindEvt();if(d){d.bindEvt()}if(b.type==2){c.onSelect=d.onSelect=function(a,b){var c=$("."+(b==1?"js_startTime":"js_endTime"));c.find(".time").html(a);c=null}}$(a.getContent()).find(".qui-datePicker").delegate(".js_startTime , .js_endTime , .qui-datePicker_cancelBtn",qyerUtil.EVENT.CLICK,function(a){if(this.className.indexOf("js_startTime")!=-1){i(0)}else if(this.className.indexOf("js_endTime")!=-1){i(1)}})}var k={show:function(e){b=e;a.show({type:2,hasHead:true,title:"选择日期",contentHTML:h(),enableBodyScroll:true,onShow:function(){j()},onHide:function(){b=c=d=null},onOK:function(){if(b.onSelect){return b.onSelect(c.value,d?d.value:null)}}})}};return k});