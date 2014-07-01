;
(function($){
    
    if(typeof window.localStorage !=="undefined" && typeof localStorage.searchkey !=="undefined"){
        var searchkey = (localStorage.searchkey !== "") ? JSON.parse(localStorage.searchkey) : [];
        var srarchhistorydata=[];
        $.each(searchkey,function(k,v){
            if(typeof v != "undefined"){
                var value = {
                    val : v,
                    key : v
                }
                srarchhistorydata.push(value);
            }
        })
    }
            
    var fnSearch = function(options) {
        $(this).on(window.qyerUtil.EVENT.CLICK, function(e){
            e.preventDefault(); 
            var thiz = $(this);
            require(['common/ui/search/search'], function(s){
                s.show({
                    type : options.searchBtn ? 'search': '',
                    placeholder : options.placeholder ? options.placeholder : thiz.attr("placeholder"),
                    getAjaxData: options.ajaxUrl || 'http://m.qyer.com/ajax.php?action=ajaxsearch&wd={{= val}}&popsearch=1',
                    resultList : { 
                        'onSelect' : function(args){
                            if (args.data.url) {
                                window.location.href = args.data.url;
                            }else {
                                args.default();
                            }
                        },
                        'html' : !!options.html || true,
                    },
                    standbyList : {
                        listType : 'history',
                        data : srarchhistorydata,
                    },
                    doSearch : options.onSearch,
                });
            }); 
        });
    };

    $.extend($.fn, {
        search: function(options) {
            fnSearch.call(this, options);
        },
    });
    //全站搜索
    $(function() {
        $('.h5_main_search_input').search({
            onSearch: function(keywords) {
                if(keywords!=""){
                    setkeywordhistory(keywords);
                    window.location.href = 'http://m.qyer.com/s.php?wd=' + keywords;
                }
            },
            ajaxUrl: 'http://m.qyer.com/ajax.php?action=ajaxsearch&wd={{= val}}&popsearch=1',
            html: true,
            searchBtn: true,
            placeholder:'请输入搜索关键词'
        });
    });
    
    //目的地搜索    
    $(function() {
        $('.h5_place_search_input').search({
            onSearch: function(keywords) {
                if(keywords!=""){
                    setkeywordhistory(keywords);
                    window.location.href = 'http://m.qyer.com/s.php?wd=' + keywords+"&isplace=1";
                }
            },
            ajaxUrl: 'http://m.qyer.com/ajax.php?action=ajaxmplacesearch&wd={{= val}}&popsearch=1',
            html: true,
            searchBtn: true,
            placeholder:'请输入目的地'
        });
    });
    
    function setkeywordhistory(keywords){
        if(window.localStorage){
            if(typeof localStorage.searchkey !== "undefined"){
                var searchkey = (localStorage.searchkey !== "") ? JSON.parse(localStorage.searchkey) : [];
            }else{
                var searchkey =[];
            }
            
            var isadd = true;
            
            $.each(searchkey,function(k,v){
                if(typeof v != "undefined" && v == keywords ){
                    searchkey.splice(k,1);
                }
            })
            searchkey.unshift(keywords);
            
            searchkey.splice(8);
            try{
                window.localStorage.setItem('searchkey',JSON.stringify(searchkey));
            }catch(e){}
        }
    }
    
})(Zepto);
