webpackJsonp([1],{108:function(a,t,n){"use strict";var l=n(27),s=function(a){return a&&a.__esModule?a:{default:a}}(l);n(70);var e=function(a,t){"object"===(void 0===a?"undefined":(0,s.default)(a))&&(t=a,a=void 0),i=this,i.options=t=t||{},i.init()},i=void 0;e.prototype={init:function(){var a=i.options,t="";$.ajax({type:a.type,url:a.url,data:a.data+"&page=1&count=10",dataType:"json",async:"false",success:function(n){n.code===a.code&&(t=a.contents(n),i.Page({id:a.page_id,total_ye:n.data.total_page,total_tiao:n.data.total_count,present_ye:n.data.current,url:a.url,data:a.data},function(n){t=a.contents(n),a.html_id.html(t)}),a.html_id.html(t))}})},Page:function(a,t){var n=i.options;a.id.PageAjax({pageCount:a.total_ye,total:a.total_tiao,current:a.present_ye,backFn:function(l){$.ajax({type:"POST",url:a.url,data:a.data+"&page="+l,dataType:"json",async:"false",success:function(a){a.code==n.code&&t(a)}})}})}},a.exports=function(a,t){return new e(a,t)}},123:function(a,t,n){"use strict";var l=n(108);$("#help-profit-call-0")[0]&&l({page_id:$("#profit-help-call-page"),html_id:$("#profit-help-call"),type:"POST",url:"/plan/json",data:"action=myplans",code:"00000",contents:function(a){$("#total_join_money").html(a.data.total_join_money+"元"),$("#total_setl_revenue").html(a.data.total_setl_revenue+"元");var t='<ul class="profit-help-list">';if(0===a.data.list.length)return $("#profit-help-call-page").remove(),'<div class="disableds">您还没有加入盈计划，马上加入赚收益吧！<a href="/plan/index">加入盈计划</a></div>';for(var n=0;n<a.data.list.length;n++){var l=0===parseFloat(a.data.list[n].is_novice)?"":"newbie";t+='\n                    <li>\n                        <span class="first"><a href="javascript:;">'+a.data.list[n].plan_name+"</a><strong>"+a.data.list[n].mtd_cde_desc+"</strong></span>\n                        <span>"+a.data.list[n].join_money+' <b>元</b><strong>加入金额</strong></span>\n                        <span style="width:18%">'+a.data.list[n].amount+' <b>元</b><strong>应收本息</strong></span>\n                        <span style="width:18%">'+a.data.list[n].wait_amount+' <b>元</b><strong>待收本息</strong></span>\n                        <span style="width:12%"><a href="/plan/orders/'+a.data.list[n].id+'">加入记录</a></span>\n                        <span style="width:12%;border-left: 1px solid #E8E8E8;"><a href="/plan/back/'+a.data.list[n].id+'">回款计划</a></span>\n                        <label class="type '+l+'">&nbsp;</label>\n                    </li>\n                '}return t+="</ul>"}});var s=function(a){l({page_id:a.page_id,html_id:a.html_id,type:"POST",url:"/plan/json",data:a.data,code:"00000",contents:function(a){var t='\n                        <div class="row blue">\n                            <span class="col-1-05 mar-05">加入日期</span>\n                            <span class="col-1-05">加入金额</span>\n                            <span class="col-1-05">年利率</span>\n                            <span class="col-1-05">到期日</span>\n                            <span class="col-1-05">状态</span>\n                            <span class="col-1-05">操作</span>\n                            <span class="col-1-05">&nbsp;</span>\n                        </div>\n                ';if(0===parseFloat(a.data.total_count))return $("#profit-help-call-page").remove(),'<div class="disableds">您还没有加入盈计划，马上加入赚收益吧！<a href="/plan/index">加入盈计划</a></div>';for(var n=0;n<a.data.list.length;n++){var l=1===a.data.list[n].repay_status?"未结清":"已结清",s=void 0;switch(parseFloat(a.data.list[n].is_keepon)){case 0:s='<a class="xt" href="javascript:;"\n                                        data-plan_id="'+a.data.list[n].plan_id+'" \n                                        data-log_id="'+a.data.list[n].id+'" \n                                        data-name="'+a.data.list[n].plan_name+'"\n                                        data-time="'+a.data.list[n].create_time+'"\n                                    >续投</a>';break;case 1:s='<a class="disr" \n                                        data-plan_id="'+a.data.list[n].plan_id+'" \n                                        data-log_id="'+a.data.list[n].id+'" \n                                        data-name="'+a.data.list[n].plan_name+'"\n                                        data-time="'+a.data.list[n].create_time+'"\n                                        href="javascript:;">取消续投</a>';break;case 10:s="-";break;case 11:s="<b>取消续投</b>"}t+='\n                        <div class="row">\n                            <span class="col-1-05 mar-05">'+a.data.list[n].create_time+'</span>\n                            <span class="col-1-05">'+a.data.list[n].invest_amount+'元</span>\n                            <span class="col-1-05">'+a.data.list[n].apr+'%</span>\n                            <span class="col-1-05">'+a.data.list[n].end_date+'</span>\n                            <span class="col-1-05">'+l+'</span>\n                            <span class="col-1-05">'+s+'</span>\n                            <span class="col-1-05"><a href="/plan/agreement/'+a.data.list[n].plan_id+"/"+a.data.list[n].id+'">《盈计划协议》</a></span>\n                        </div>\n                    '}return t+="</ul>"}})};if($("#help-profit-call-1")[0]){var e=$("#_planId").val();s({page_id:$("#profit-help-record-page-1"),html_id:$("#profit-help-record-1"),data:"action=mine&plan_id="+e+"&repay_status="}),s({page_id:$("#profit-help-record-page-2"),html_id:$("#profit-help-record-2"),data:"action=mine&plan_id="+e+"&repay_status=1"}),s({page_id:$("#profit-help-record-page-3"),html_id:$("#profit-help-record-3"),data:"action=mine&plan_id="+e+"&repay_status=2"})}$("#help-profit-call-2")[0]&&$(function(){function a(){}var t=new Date,n=t.getMonth()+1,l=n-1<1?12:n-1,s=n+1>12?1:n+1;$("#calendar").fullCalendar({customButtons:{myPrev:{text:l+"月"},myNext:{text:s+"月"}},header:{left:"prev,myPrev",center:"title",right:"myNext,next"},isRTL:!1,firstDay:0,monthNames:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],dayNamesShort:["周日","周一","周二","周三","周四","周五","周六"],buttonText:{month:""},allDaySlot:!1,selectable:!0,selectHelper:!0,aspectRatio:2.4,editable:!1,allDayDefault:!1,titleFormat:{month:"YYYY年MMMM"},viewRender:function(t,n){$.ajax({type:"POST",url:"/plan/json",data:"action=month_repay&plan_id="+$("#_planId").val()+"&year="+t.title.substr(0,4)+"&month="+t.title.split("年")[1].split("月")[0],dataType:"json",async:"false",success:function(t){var n;$(".fc-content-skeleton .fc-day-number").each(function(){$(this).addClass("unDataClick")});for(var l=0;l<t.data.list.length;l++){var s=$('.fc-day[data-date="'+t.data.list[l].date+'"]');n="0.00"==t.data.list[l].account||0==t.data.list[l].account?'<div class="recev back"><dd>已回款:'+t.data.list[l].account_over+"元</dd>":'<div class="recev"><dd>已回款：'+t.data.list[l].account_over+"元<br/><strong>待回款:"+t.data.list[l].account+"元</strong></dd>",s.empty().html(n+"</div>"),$('.fc-content-skeleton .fc-day-number[data-date="'+t.data.list[l].date+'"]').removeClass("unDataClick").addClass("DataClick").data("i",l)}$(document).off("click",".unDataClick").on("click",".unDataClick",function(){var a=$(this),t=a.data("date").split("-");$(".cularlist").html('<div class="dis">所选日期没有回款哦~ <label>（投资后，回款计划显示可能存在延迟）</label></div>'),$(".particular h3").html(t[0]+"年"+t[1]+"月"+t[2]+"日回款计划")}),$(document).off("click",".DataClick").on("click",".DataClick",function(){var a=$(this),n=a.data("date").split("-"),l=a.data("i"),s='\n                                        <div class="row borTop">\n                                            <span class="col-1-05">回款项目</span>\n                                            <span class="col-1-05">项目总额</span>\n                                            <span class="col-1-05">应收总额</span>\n                                            <span class="col-1-05">期数</span>\n                                            <span class="col-1-05">本期应收</span>\n                                            <span class="col-1-05">本期已收</span>\n                                            <span class="col-1-05">本期待收</span>\n                                            <span class="col-1-05">操作</span>\n                                        </div>\n                                    ';if(0!=t.data.list[l].list.length)for(var e=0;e<t.data.list[l].list.length;e++){var i=t.data.list[l].list[e];s+='\n                                            <div class="row">\n                                                <span class="col-1-05"><a href="javascript:;">'+i.borrow_id+'</a></span>\n                                                <span class="col-1-05">'+i.money+'</span>\n                                                <span class="col-1-05">'+i.ps_inter_money+'</span>\n                                                <span class="col-1-05">'+i.nper+'</span>\n                                                <span class="col-1-05">'+i.pstotalamt+'</span>\n                                                <span class="col-1-05">'+i.totalamount+'</span>\n                                                <span class="col-1-05">'+i.watotalamt+'</span>\n                                                <span class="col-1-05"><a class="details" data-borrow_id="'+i.borrow_id+'" data-credit_id="'+i.credit_id+'" href="javascript:;">还款明细</a></span>\n                                            </div>\n                                        '}else s='<div class="dis">所选日期没有回款哦~ <label>（投资后，回款计划显示可能存在延迟）</label></div>';$(".particular h3").html(n[0]+"年"+n[1]+"月"+n[2]+"日回款计划"),$(".cularlist").html(s)}),$(".fc-right-click").remove(),$(".fc-toolbar").append('<div class="fc-right-click" style="position: absolute;top:19px;right:3%;color:#38c0ff;cursor:pointer;">返回今天</div>'),$(document).off("click",".fc-right-click").on("click",".fc-right-click",function(){$("#calendar").fullCalendar("today"),a.net(),$(".particular h3").html("回款计划"),$(".cularlist").html('<div class="dis">所选日期没有回款哦~ <label>（投资后，回款计划显示可能存在延迟）</label></div>')})}})}}),a.prototype.net=function(){var a=Number($(".fc-center h2").html().replace(/[^0-9]/gi,"").substr(4,2)),t=a-1<1?12:a-1,n=a+1>12?1:a+1;$(".fc-myPrev-button").html(t+"月"),$(".fc-myNext-button").html(n+"月")},a.prototype.cick=function(t){$(t).on("click",function(){a.net()})};var a=new a;a.cick(".fc-next-button"),a.cick(".fc-prev-button"),$(".fc-center").on("click",function(){$("#calendar").fullCalendar("today"),a.net()}),$(".fc-myPrev-button").on("click",function(){$("#calendar").fullCalendar("prev"),a.net()}),$(".fc-myNext-button").on("click",function(){$("#calendar").fullCalendar("next"),a.net()})})},28:function(a,t,n){"use strict";function l(a,t,n){var l=$(a);l[0]&&l.on("click",function(){var a=$(this).children("label"),l=a.attr("id"),s=$("#"+l);s.hasClass("checked")?(a.removeClass("checked"),s.removeAttr("checked"),n()):(a.addClass("checked"),s.attr("checked","checked"),t())})}a.exports=l},86:function(a,t,n){"use strict";var l=n(40);n(28);n(123),$(function(){function a(a,t){l({title:"提示",ID:$("#profit-alert-cashOn"),width:480,height:230,titleClose:!1,culling:function(){return'\n                <style type="text/css">\n                    #profit-alert-cashOn .profit-alert-cash-integral{font-size:14px;color:#999999;width:400px;margin:20px auto 0;overflow:hidden;text-align:center}\n                    #profit-alert-cashOn .profit-alert-cash-integral p{margin:15px 0 20px;display:block;line-height:25px;text-align: center}\n                    #profit-alert-cashOn .profit-alert-cash-integral a{display:inline-block;background:#38c0ff;color:#fff;line-height:40px;width:140px;text-align: center;}\n                </style>\n                <div class="profit-alert-cash-integral">\n                    <p>'+a+'</p>\n                    <a class="profit-alert-cash-integral-Submit" href="javascript:;">确认</a>\n                </div>\n            '},success:function(){$(".profit-alert-cash-integral-Submit").on("click",function(){location.reload()})}})}$(document).on("click",".xt",function(){var t=$(this),n=t.data("plan_id"),s=t.data("log_id"),e=t.data("name"),i=t.data("time").replace(/-/g,"");l({title:"确认续投",ID:$("#profit-alert-cashOff"),width:480,height:230,culling:function(){return'\n                <style type="text/css">\n                    #profit-alert-cashOff .profit-alert-cash-integral{font-size:14px;color:#999999;width:400px;margin:20px auto 0;overflow:hidden}\n                    #profit-alert-cashOff .profit-alert-cash-integral p{margin:15px 0 20px;display:block;line-height:25px;text-align: center}\n                    #profit-alert-cashOff .profit-alert-cash-integral a{display:inline-block;background:#38c0ff;color:#fff;line-height:40px;width:140px;text-align: center;float:left;margin-left:40px;}\n                    #profit-alert-cashOff .profit-alert-cash-integral a.profit-alert-cash-integral-hidden{background:#fff;border:1px solid #38c0ff;color:#38c0ff;float:right;margin-left:0;margin-right:40px;}\n                </style>\n                <div class="profit-alert-cash-integral">\n                    <p>是否开通“'+e+"("+i+')”续投功能？自动续投可使您的资金不闲置，保证收益最大化！</p>\n                    <a class="profit-alert-cash-integral-hidden" href="javascript:;">再想想</a>\n                    <a class="profit-alert-cash-integral-Submit" href="javascript:;">确认</a>\n                </div>\n            '},success:function(){$(".profit-alert-cash-integral-hidden").on("click",function(){$("#profit-alert-cashOff").remove()}),$(".profit-alert-cash-integral-Submit").on("click",function(){$(this).css({color:"#fff",background:"#666666"}).attr("disabled","disabled"),$.ajax({type:"POST",url:"/plan/json",data:"action=set&plan_id="+n+"&log_id="+s+"&type=on",dataType:"json",async:"false",success:function(t){$("#profit-alert-cashOff").remove(),a("00000"===t.code?"您已成功开通“"+e+"("+i+")”的自动续投功能。":t.msg)}})})}})}),$(document).on("click",".disr",function(){var t=$(this),n=t.data("plan_id"),s=t.data("log_id"),e=t.data("name"),i=t.data("time").replace(/-/g,"");l({title:"确认取消续投",ID:$("#profit-myfrom"),width:480,height:230,culling:function(){return'\n                <style type="text/css">\n                    #profit-myfrom .profit-alert-cash-integral{font-size:14px;color:#999999;width:400px;margin:20px auto 0;overflow:hidden}\n                    #profit-myfrom .profit-alert-cash-integral p{margin:15px 0 20px;display:block;line-height:25px;text-align: center}\n                    #profit-myfrom .profit-alert-cash-integral a{display:inline-block;background:#38c0ff;color:#fff;line-height:40px;width:140px;text-align: center;float:left;margin-left:40px;}\n                    #profit-myfrom .profit-alert-cash-integral a.profit-alert-cash-integral-hidden{background:#fff;border:1px solid #38c0ff;color:#38c0ff;float:right;margin-left:0;margin-right:40px;}\n                </style>\n                <div class="profit-alert-cash-integral">\n                    <p>确认取消“'+e+"("+i+')”自动续投功能？自动续投可使您的资金不闲置，保证收益最大化！</p>\n                    <a class="profit-alert-cash-integral-hidden" href="javascript:;">再想想</a>\n                    <a class="profit-alert-cash-integral-Submit" href="javascript:;">确认</a>\n                </div>\n            '},success:function(){$(".profit-alert-cash-integral-hidden").on("click",function(){$("#profit-myfrom").remove()}),$(".profit-alert-cash-integral-Submit").on("click",function(){$(this).css({color:"#fff",background:"#666666"}).attr("disabled","disabled"),$.ajax({type:"POST",url:"/plan/json",data:"action=set&plan_id="+n+"&log_id="+s+"&type=off",dataType:"json",async:"false",success:function(t){$("#profit-myfrom").remove(),a("00000"===t.code?"您已成功取消“"+e+"("+i+")”的自动续投功能。":t.msg)}})})}})}),$(document).on("click",".details",function(){var a=$(this),t=a.data("borrow_id"),n=a.data("credit_id"),s="";$.ajax({type:"GET",url:"/account/credit/detail/"+n+"/"+t+"/0/WINPLAN",dataType:"json",async:"false",success:function(a){var n=a.length>5?'style="height:205px;overflow:auto"':"";s+="<div "+n+">";for(var e=0;e<a.length;e++)s+='\n                        <div class="row">\n                            <span class="col-1-05">'+a[e].repaymentDate+'</span>\n                            <span class="col-05">'+a[e].nper+'</span>\n                            <span class="col-1-05">'+a[e].psPrcpAmt+'</span>\n                            <span class="col-1-05">'+a[e].interest+'</span>\n                            <span class="col-1">'+a[e].lateDays+'</span>\n                            <span class="col-1-05">'+a[e].psOdIntAmt+'</span>\n                            <span class="col-1-05">'+a[e].totalAmount+'</span>\n                            <span class="col-1-05">'+a[e].repaymentTime+'</span>\n                            <span class="col-05">'+a[e].state+'</span>\n                            <span class="col-1">'+a[e].prepayment+"</span>\n                        </div>\n                    ";s+="</div>",l({title:"还款明细",ID:$("#profit-alert-details"),width:900,height:400,culling:function(){return'\n                                <style type="text/css">\n                                    #profit-alert-details .ther-body{ width:95% }\n                                    #profit-alert-details .row{ text-align:center;font-size:13px;border:1px solid #E8E8E8;border-bottom:none;line-height:40px }\n                                    #profit-alert-details label{width: 100%;display: block;text-align: center;line-height: 40px;border: 1px solid #E8E8E8;}\n                                    #profit-alert-details label a{color:#38c0ff}\n                                </style>\n                                <div class="row">\n                                    <span class="col-1-05">应还日期</span>\n                                    <span class="col-05">期数</span>\n                                    <span class="col-1-05">应收本金</span>\n                                    <span class="col-1-05">应收息费</span>\n                                    <span class="col-1">逾期天数</span>\n                                    <span class="col-1-05">逾期利息</span>\n                                    <span class="col-1-05">实收总额</span>\n                                    <span class="col-1-05">实还日期</span>\n                                    <span class="col-05">状态</span>\n                                    <span class="col-1">提前还款</span>\n                                </div>\n                                '+s+'\n                                <label><a href="/invest/agreement/'+t+'">《借款协议》</a></label>\n                                \n                            '},success:function(){}})}})})})}});