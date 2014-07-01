//城市所用的tab
define('common/ui/country/country',['css!common/ui/country/country.css'], function() {
    function Country(opt){
        this.init(opt);
    }
    Country.prototype = {
        tpl:'',
        el:null,
        tabs:null,
        contents:null,
        cIndex:0,
        preIndex:0,
        curClass:"qui-triangle",
        init:function(opt){
            $.extend(this,opt);

            this.initTabs();
            this.initContent();
            this.bindTabEvent();
            this.bindContentEvent();
            this.bindScroll();
        },
        initContent:function(cid){
            var me = this;
            $.ajax({
                url:"/plan/require/place.php",
                data:{
                    action:"getcountrylist",
                    continentid:cid||0
                },
                success:function(data){
                    var obj = JSON.parse(data),
                        dList,outstr = [];
                    if(obj.result == "ok"){
                        dList = obj.data.countrylist;
                        for(var i=0;i<dList.length;i++){
                            outstr.push('<li class="travelDetailBox clearfix '+(i==0?"travelDetailBox_start":"")+'" data-id="'+dList[i].id+'" data-bn-ipg="mplan-create-country-county">'+dList[i].cn_name+'</li>')
                        }
                        me.getCurContent().html('<ul class="detailList">'+outstr.join("")+'</ul>');
                        me.showContent();

                    }
                }
            })
        },
        showContent:function(){
            $(this.contents.children()[this.preIndex]).css("display","none")
            this.getCurContent().css("display","block");
        },
        getCurContent:function(){
            return $(this.contents.children()[this.cIndex]);
        },
        initTabs:function(){
            var me = this;
            $.ajax({
                url:"/plan/require/place.php",
                data:{
                    "action":"getcontinents"
                },
                success:function(data){
                    var obj = JSON.parse(data),
                        dList,outstr = [];
                    if(obj.result == "ok"){
                        dList = obj.data.list;
                        outstr.push('<span data-id="0" class="'+me.curClass+'" data-isload="true" data-bn-ipg="mplan-create-country-tab-0">热门</span>');
                        for(var i=0;i<dList.length;i++){
                            outstr.push('<span data-id="'+dList[i].id+'" data-bn-ipg="mplan-create-country-tab-'+(i+1)+'">'+dList[i].cn_name+'</span>')
                        }
                        me.tabs.html(outstr.join(""));
                    }
                }
            })
        },
        bindTabEvent:function(){
            var me = this;
            this.tabs.delegate("span",qyerUtil.EVENT.CLICK,function(evt){
                var tag = evt.target||evt.srcElement;
                if(!$(tag).hasClass(me.curClass)){
                    $(me.tabs).find("."+me.curClass).removeClass(me.curClass);
                    $(tag).addClass(me.curClass);
                    me.preIndex = me.cIndex;
                    me.cIndex = $(tag).index();
                    if($(tag).attr("data-isload")!="true"){
                        me.initContent($(tag).attr("data-id"))
                        $(tag).attr("data-isload",true);
                    }else{
                        me.showContent();
                    }
                }
            })
        },
        bindContentEvent:function(){
            var me = this;
            me.contents.delegate("li",qyerUtil.EVENT.CLICK,function(){
                $(me).trigger("selectcity",this);
            });
        },
        bindScroll:function(){
            //加载iscorll模块
            require(['basic/js/iscroll'],function(){
                new IScroll('#qui-scroll', {
                    eventPassthrough: true,
                    scrollX: true,
                    scrollY: false,
                    preventDefault: false
                });
            });
        }
    }
    return Country;
});

