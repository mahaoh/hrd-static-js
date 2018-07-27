(function(){
    var UserName = '[data-nav="nav"] .menu-nav';
    var NavAnimate = {
        Start : function(){
            var user = $(UserName);

            user.hover(function () {
                var last = $(this).children();
                var dl = $(this).children('dl');

                if( last.has('dl') ){
                    dl.show();
                    dl.children().bind('click', function(){
                        $(this).addClass('current').siblings().removeClass('current');
                    });
                }

            }, function () {
                $(this).children('dl').hide();
            });
        }
    };
    $(function(){
        NavAnimate.Start();

        //图片 hover 转换
        var Img = $('[data-ImgHover]');
        var _url,_src;
        if( Img[0] ){
            Img.hover(function () {
                _src = $(this).attr('src');
                _url = $(this).attr('data-ImgHover');
                $(this).attr('src', _url);
            }, function () {
                $(this).attr('src', _src);
            });
        }

        $(".top").on("mouseenter",".user",function(){
            $(this).addClass("open");
        }).on("mouseleave",".user",function(){
            $(this).removeClass("open");
        });

        $(".top").on("click",".sign",function(){
            var that = $(this);
            $.ajax({
                type: 'GET',
                url: '/account/signin',
                dataType: 'json',
                async:'false',
                success: function(data){
                    if(data.r == "00"){
                        that.empty().removeClass("sign").addClass("signed").html('已签到').append("<strong></strong>");
                        var text = that.find("strong");
                        text.text("+"+data.d.np).fadeOut(2000,function(){text.remove();})
                        $(".top").off("click",".sign");
                    } else if(data.r == "11") {
                        var html = '<div class="comment-pop" style="display:block;"><div class="bg"></div><div class="dialog"><div class="close" onclick="$(\'.comment-pop\').hide();"></div><p>请先完成手机、实名认证后进行签到</p><a href="/account/safety/center">去认证</a></div></div>';
                        $("body").append(html);
                    } else {
                        that.append("<strong>签到失败</strong>");
                        var text = that.find("strong");
                        text.fadeOut(2000,function(){text.remove();})
                    }
                },
                error: function(xhr, type){

                }
            })
        });


    });
})();

//用户中心签到
!function(t){function i(a){if(n[a])return n[a].exports;var o=n[a]={exports:{},id:a,loaded:!1};return t[a].call(o.exports,o,o.exports,i),o.loaded=!0,o.exports}var n={};return i.m=t,i.c=n,i.p="http://static.huirendai.com/",i(0)}([function(t,i,n){"use strict";$(function(){var t=n(1),i=$("#vipSign");t({vipSign:i,vipsignarr:$("#sign-txt"),vipText:i.children("ol"),vipButton:i.children("strong"),vipsignarrID:i.children("strong"),vipsignarrFloat:"top",vip:!0,localName:"text"})})},function(t,i){"use strict";var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t};!function(){var i=function(t,i){"object"===("undefined"==typeof t?"undefined":n(t))&&(i=t,t=void 0),a=this,a.options=i=i||{},a.init()},a=void 0;i.prototype={init:function(){var t=a.options;(1==$("#isLogin").val()||t.vip)&&$.ajax({type:"POST",url:"/member/json",data:"action=signinfo",dataType:"json",async:"false",success:function(i){if("00000"===i.code){for(var n="",o=0;o<i.data.info.length;o++)n+=0==o?'<li class="m '+a.hand(i.data.info[o])+'">'+(o+1)+"</li>":'<li class="'+a.hand(i.data.info[o])+'">'+(o+1)+"</li>";t.vipText.html(n),0==parseInt(i.data.sign_status)?t.vipButton.addClass("signinfo").removeClass("dids").html("签到"):t.vipButton.addClass("dids").removeClass("signinfo").html("已签到，请明天再来"),"input"===t.localName?t.vipsignarr.val(i.data.fillup_count):t.vipsignarr.html(i.data.fillup_count),a.vipSigns()}}})},hand:function(t){switch(parseInt(t)){case 0:return"";case 1:return"adv";case 2:return"did";default:return"rdo"}},vipSigns:function(){var t=a.options;$(document).off("click",".did").on("click",".did",function(){var i="input"===t.localName?parseInt(t.vipsignarr.val()):parseInt(t.vipsignarr.text()),n=parseInt($(this).html());return 0>=i?alert("对不起，您没有补签机会！"):(t.vipButton.data("su",n),$(this).addClass("show").siblings().removeClass("show"),void t.vipButton.addClass("signinfo").removeClass("dids").html("补签"))}),$(document).off("click",".signinfo").on("click",".signinfo",function(){var i=void 0==t.vipButton.data("su")?7:t.vipButton.data("su");$.ajax({type:"POST",url:"/member/json",data:"action=signin&theday="+i,dataType:"json",async:"false",success:function(i){"00000"===i.code&&!function(){var n=t.vipsignarrID,o=void 0,s=void 0;switch(t.vipsignarrFloat){case"right":o=n.offset().top-5,s=n.offset().left+n.outerWidth(!0);break;case"top":o=n.offset().top-n.outerHeight(!0)/2,s=n.offset().left+n.outerWidth(!0)/2}$("body").append('<div class="gralanmite" style="position:absolute;top:'+o+"px;left:"+s+'px;font-size:18px;color:red;display:none;">+'+i.data.point+"</div>"),$(".gralanmite").slideDown(1e3,function(){$(this).animate({opacity:"0"},1e3,function(){$(this).remove()});for(var o="",s=0;s<i.data.info.length;s++)o+=0==s?'<li class="m '+a.hand(i.data.info[s])+'">'+(s+1)+"</li>":'<li class="'+a.hand(i.data.info[s])+'">'+(s+1)+"</li>";t.vipText.html(o),t.vipButton.addClass("dids").removeClass("signinfo").html("已签到，请明天再来"),t.vip||n.html(parseInt(n.html())+parseInt(i.data.point))}),"input"===t.localName?t.vipsignarr.val(i.data.fillup_count):t.vipsignarr.html(i.data.fillup_count)}()}})})}},t.exports=function(t,n){return new i(t,n)}}()}]);