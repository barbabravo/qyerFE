(function(a){a.extend(a.fn,{report:function(b){a(this).on("click",function(){var d=a(this),e=b.type,f=d.data("report-id");require(["common/ui/list/list"],function(a){a.show({title:"选择举报类型",data:[{key:"广告",val:"广告"},{key:"灌水",val:"灌水"},{key:"色情污秽",val:"色情污秽"},{key:"危害国家安全",val:"危害国家安全"}],onSelect:function(a){c(f,e,a.key);return true}})})});var c=function(b,c,d){a.post("http://m.qyer.com/api.php?action=jubao",{id:b,type:c,reason:d,page_url:window.location.href},function(a){require(["common/ui/slidTip/slidTip"],function(b){var c={type:2,text:a.data.msg||"举报成功",delay:3};switch(a.error_code){case 0:break;case 77:c.type=4;break;default:c.type=5}b.show(c)})},"json")};return this}})})(Zepto);