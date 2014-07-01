define("common/ui/list/multi-list",["common/ui/popup_base/popup_base","css!common/ui/list/list.css"],function(a){var b,c=[],d={map:{},arr:[]},e={};var f,g,h;var i=4;function j(){var a=['<div class="qui-list_tabNav">',"<ul>","","</ul>",'<div class="qui-list_tabNavTip"></div>',"</div>"];var e=['<div class="qui-list_tabContent">',"","</div>"];var f=[],g=[];for(var h=0,i=b.group.length;h<i;h++){var j="key"in b.group[h]?b.group[h].key:h;d.map[j]=h;d.arr.push(j);c.push({});f.push(k(h,b.group[h]));g.push(l(h,b.group[h]))}a[2]=f.join("");e[1]=g.join("");return[a.join(""),e.join("")].join("")}function k(a,c){return['<li data-quiListTabKey="',d.arr[a],'"',' data-quiListTabIndex="',a,'"',b.group[a].ipg?'" data-bn-ipg="'+b.group[a].ipg+'"':"",">",c.title||"组"+a,"</li>"].join("")}function l(a,b){var c=['<div class="qui-list_innerTabContent" data-quiListTabKey="',d.arr[a],'" data-quiListTabIndex="',a,'">',b.fullTitle?'<p class="qui-list_tabTitle">'+b.fullTitle+"</p>":"",'<ul class="qui-list qui-list_default',!b.html&&!b.template?b.listType?" qui-list_"+b.listType:" qui-list_default_li":"",'">'].join("");var f=["</ul>","</div>"].join("");var g=[];e[d.arr[a]]={map:{},arr:[]};for(var h=0,i=b.data.length;h<i;h++){var j="key"in b.data[h]?b.data[h].key:h;e[d.arr[a]].map[j]=h;e[d.arr[a]].arr.push(j);var k=['<li data-quiListKey="',j,'"',' data-quiListIndex="',h,'"',' data-quiListTabIndex="',a,'"',b.data[h].ipg?' data-bn-ipg="'+b.data[h].ipg+'"':"",">"].join(""),l,m="</li>";try{l=b.html?b.data[h].val:b.template?window.qyerUtil.renderTemplate(b.template,b.data[h]):b.data[h].val}catch(n){}g.push([k,l||"",m].join(""))}return[c,g.join(""),f].join("")}function m(){var c=$(a.getContent());f=c.find(".qui-list_tabNav li");$tabtip=c.find(".qui-list_tabNavTip");g=c.find(".qui-list_tabContent .qui-list_innerTabContent");f.on(window.qyerUtil.EVENT.CLICK,function(){o($(this).attr("data-quiListTabKey"))});for(var e=0,h=g.length;e<h;e++){$(g[e]).find(".qui-list > li").on(window.qyerUtil.EVENT.CLICK,function(){var a={key:$(this).attr("data-quiListKey"),index:$(this).attr("data-quiListIndex"),groupIndex:$(this).attr("data-quiListTabIndex"),el:$(this)};a.groupKey=d.arr[a.groupIndex];a.data=b.group[a.groupIndex].data[a.index];if(typeof b.group[a.groupIndex].onSelect=="function"){b.group[a.groupIndex].onSelect(a)}n(a)})}n(b.selected);o(b.defaultTab)}function n(a){if(!a)return;if("el"in a&&typeof a.el.attr=="function"){if(c[a.groupIndex].el){c[a.groupIndex].el.removeClass("_selected")}a.el.addClass("_selected");c[a.groupIndex]=a}else{for(gkey in a){if(gkey in d.map){if(a[gkey]in e[gkey].map){var b=$(g[d.map[gkey]]).find('[data-quiListKey="'+a[gkey]+'"]');b.triggerHandler(window.qyerUtil.EVENT.CLICK)}else if(!a[gkey]){if(c[d.map[gkey]].el){c[d.map[gkey]].el.removeClass("_selected")}c[gkey]={}}}}}}function o(a){var b=a?a in d.map?d.map[a]:typeof a=="number"&&a>-1&&a<d.arr.length?a:0:0;if(h&&h.tab){h.tab.removeClass("_current")}$(f[b]).addClass("_current");$tabtip.css({left:parseInt($(f[b]).position().left)+parseInt($(f[b]).width())/2-i+"px"});if(h&&h.cnt){h.cnt.hide()}$(g[b]).css({opacity:0}).show().css({opacity:1});h={tab:$(f[b]),cnt:$(g[b]),index:b};return}var p={show:function(d){b=d;a.show({type:1,hasHead:true,title:d.title||"选择",okBtnText:d.okBtnText||"完成",okBtnIpg:d.okBtnIpg,cancelBtnText:d.cancelBtnText||"取消",cancelBtnIpg:d.cancelBtnIpg,enableBodyScroll:true,contentHTML:j(),onShow:m,onHide:b.onHide,onOK:function(){var a={};for(var d=0,e=c.length;d<e;d++){if(c[d].el){a[c[d].groupKey]=c[d]}}b.onConfirm.call(this,a)},onCancel:d.onCancel});if(typeof b.onShow=="function"){b.onShow()}},hide:function(){c=[];d={map:{},arr:[]};e={};h=null;a.hide()},"switch":function(a){o(a)},select:function(a){n(a)}};return p});