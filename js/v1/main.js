$(function(){
    if($(".partner")[0]) $(".partner").slide({mainCell:".bd ul",autoPage:true,effect:"left",vis:7,prevCell:'.f-prev',nextCell:'.f-next',pnLoop:'false'});
    if($(".partnerDerive")[0]) $(".partnerDerive").slide({mainCell:".bd ul",autoPage:true,effect:"left",vis:6,prevCell:'.f-prev',nextCell:'.f-next',pnLoop:'false'});
    $(".button").mouseenter(function(){
        var item = $(this).parent();
        item.addClass("hover");
    }).mouseleave(function(){
        var item = $(this).parent();
        item.removeClass("hover");
    });
    $(".calc-Time em").each(function(){
        var iTime = $(this).html();
        hrd.remainTime(iTime,this);
    });
    $(".remaining-time strong").each(function(){
        var iTime = $(this).html();
        hrd.remainTime(iTime,this);
    });
    $(".remaining-gou strong").each(function(){
        var iTime = $(this).html();
        hrd.remainTime(iTime,this,'v');
    });
    $(".jxk-Time em").each(function(){
        var iTime = $(this).html();
        hrd.mainTime(iTime,this);
    });

    $(".list-page .action em").each(function(){
        var iTime = $(this).html();
        hrd.remainTime(iTime,this);
    });

    tableColoe('table-color','row','odd','#ffffff','');
    tableColoe('table-color-O','row','odd','#ffffff','');
    tableColoe('table-color-T','row','odd','#ffffff','');
    dropDown('but-off','off','but-off-text');

    if($(".banner")[0]) $(".banner").slide({mainCell:".bd ul", effect:"fold",autoPlay:"true",mouseOverStop:"true",pnLoop:"true"});

    // if($(".page-nav").length != 0 ){
    //
    //     if($('#page-nav').length == 0){
    //         $(".page-nav").html(page(pagepre, pagecount, pageurl, numsize));
    //         var width = $(".page").width();
    //         var left = parseInt($('.page-nav').width()-width)/2;
    //         $(".page").css({ width:width, marginLeft:left});
    //     }
    //
    //
    // }

    radius('.process');
    radius('.processs','#45c8c9');

    function radius(data,barColor){
        var tar = $(data);
        if( tar[0] ) {
            var bar = tar.width()/12;
            var radius = (tar.width()/2-bar)*2;
            tar.each(function(){
                var radialObj = radialIndicator($(this), {
                    barWidth : bar,
                    radius:  radius,
                    //barBgColor: barBgColor == null ? '#EEE' : barBgColor,
                    barColor: barColor == null ? '#FF763A' : barColor,
                    initValue : $(this).attr("data")
                });
            });

        }
    }


    var pathname = location.pathname;
    if(pathname.indexOf("/invest/")!=-1){
        $("header li").eq(1).addClass("current");
    } else if(pathname.indexOf("/loanCredit/")!=-1){
        $("header li").eq(2).addClass("current");
    }
    
    if(!!window.chrome) $('.top .user .messages span').addClass('isFontChrome');

});
var hrd = {
    remainTime:function(iTime,ob,v){
        var iDay,iHour,iMinute,iSecond;
        var sDay="",sTime="";
        if (iTime >= 0){
            iDay = parseInt(iTime/24/3600);
            iHour = parseInt((iTime/3600)%24);
            iMinute = parseInt((iTime/60)%60);
            iSecond = parseInt(iTime%60);

            if (iDay > 0){
                sDay = iDay + "天";
            }
            sTime =sDay + iHour + "时" + iMinute + "分" + iSecond + "秒";

            if(iTime==0){
                clearTimeout(Account);
                sTime= v == 'v' ? "马上抢购" : "<em style='color:green'>时间到了！</em>";
            }else{
                Account = setTimeout(function(){hrd.remainTime(iTime,ob,v)},1000);
            }
            iTime=iTime-1;
        }else{
            sTime="<em style='color:#f90'>此标已过期！</em>";
        }
        ob.innerHTML = sTime;
    },
    mainTime:function(iTime,ob){
        var iDay,iHour,iMinute,iSecond;
        var sDay="",sTime="";
        var mTime = $(ob).attr('time');
        var b = $(ob).siblings('b');
        if (iTime > 0){

            iDay = parseInt(iTime/24/3600);
            iHour = parseInt((iTime/3600)%24);
            iMinute = parseInt((iTime/60)%60);
            iSecond = parseInt(iTime%60);

            if (iDay > 0){
                sDay = iDay + ":";
            }
            sTime =sDay + iHour + ":" + iMinute + ":" + iSecond;

            if(iTime==0){
                clearTimeout(Account);
                if(iTime == 0){
                    hrd.mTimeTime(mTime,ob);
                }else{
                    Account = setTimeout(function(){hrd.mainTime(iTime,ob);},1000);
                }
            }else{
                Account = setTimeout(function(){hrd.mainTime(iTime,ob)},1000);
            }

            iTime=iTime-1;
            ob.innerHTML = sTime;
        }else{
            b.html('结束，仅剩');
            $('em.rate-xi').show();
            hrd.mTimeTime(mTime,ob);
        }

    },
    mTimeTime:function(iTime,ob){
        var iDay,iHour,iMinute,iSecond;
        var sDay="",sTime="";
        var b = $(ob).siblings('b');
        if (iTime >= 0){

            iDay = parseInt(iTime/24/3600);
            iHour = parseInt((iTime/3600)%24);
            iMinute = parseInt((iTime/60)%60);
            iSecond = parseInt(iTime%60);

            if (iDay > 0){
                sDay = iDay + ":";
            }
            sTime =sDay + iHour + ":" + iMinute + ":" + iSecond;

            if(iTime==0){
                clearTimeout(Account);
                $('em.rate-xi').slideUp();
                $(ob).parent().html('<b style="color: #d4d4d4;">本场加息已结束！</b>');
            }else{
                Account = setTimeout(function(){
                    hrd.mTimeTime(iTime,ob);
                    b.html('结束，仅剩');
                    $('em.rate-xi').show();
                },1000);
            }

            iTime=iTime-1;
        }
        ob.innerHTML = sTime;
    }
};

//首页卡片提示
// (function(){
//     var UserClass = {
//         name : '[invest-item="off"]',
//         data : 'off',
//         text : '<div class="invest-click">'
//
//     };
//     var Item_animtion = {
//         Case: function(){
//             var user = $(UserClass.name);
//             user.append(UserClass.text);
//
//             function Hegel(_this){
//                 return _this.children('.click').height() + 20;
//             }
//             //function Hegel(_this){
//             //    var p = _this.children('.invest-click').children('p');
//             //    return p.length * 20 + 20;
//             //
//             //};
//
//             $(window).resize(function () {
//                 user.children('.invest-click').hide();
//             });
//
//             user.hover(function () {
//                 var textClass = $(this).children('.invest-click');
//                 var txt = $(this).children('.click').html();
//                 //var txt = $(this).children('.click').val();
//                 textClass.append(txt);
//                 textClass.css('display', 'block');
//
//                 var las = Hegel($(this));
//
//                 textClass.stop(true,true).animate({
//                     'top':-las,
//                     'height':las
//                 }, 100);
//
//             }, function () {
//
//                 var textClass = $(this).children('.invest-click');
//                 textClass.html('');
//                 textClass.stop(true,true).animate({
//                     'top':'-25px',
//                     'height':'20px'
//                 }, 100,function(){
//                     textClass.css('display', 'none');
//                 });
//
//             });
//
//         }
//     };
//
//     $(function () {
//         Item_animtion.Case();
//     });
// })();

//选项卡
(function(){
    var dl = $('.optionDL');

    if( dl[0] ) {
        $('.option li').bind('click', function () {
            var dl = $(this).parent().next();
            var index = $(this).index();

            if( dl.hasClass('optionDL') ) {
                $(this).addClass('show').siblings().removeClass('show');
                dl.children().eq(index).addClass('show').siblings().removeClass('show');
            }

        });
    }
})();

//投资成功页面自动返回
(function(){
    $(".Inv-info .Inv-last em").each(function(){
        retoryTime(5,this,'秒后自动返回');
    });
    function retoryTime(iTime,ob,text,Manner){
        var iSecond;
        var sDay="",sTime="";
        iSecond = parseInt(iTime%60);
        sTime =sDay + iSecond + text;
        if(iTime==0){
            clearTimeout(Account);
            Manner == 'reload' ? location.reload() : history.go(-1);
        }else{
            Account = setTimeout(function(){retoryTime(iTime,ob,text,Manner)},1000);
        }
        iTime=iTime-1;

        ob.innerHTML = sTime;
    }

})();
//表格颜色
function tableColoe(id,row,even,backColor,textColor) {
    var idea = $('#'+id);
    if(idea.length > 0) {
        $('#'+ id +' .' + row + ':' + even).css({
            background:backColor,
            color:textColor
        });
    }
}
//单个按钮样式
function label(name,clascc,objLeft,objRight) {
    var id = $('#' + name + ' ' + clascc);
    var num;
    if( id.length > 0) {
        id.click(function() {
            var radioId = $(this).attr('name');
            if ( num == null ){
                $(this).attr('class', 'checked');
                $('#' + radioId).attr('checked', 'checked');
                num = 'checked';
                objLeft();
            }else{
                id.removeAttr('class');
                $('#' + name + ' input[type="radio"]').removeAttr('checked');
                num = null;
                objRight();
            }
        });
    }
}
//下拉菜单
function dropDown(id,off,text){
    var name = $('.' + id);
    var content,limt,indexLimt,num;

    //显示内容
    content = name.parents('li').children('.but-off-text');
    //显示字符串
    var lmt = 'dropDown-index-sow-',
        con = 'dropDown-index-';

    content.each(function (index) {
        var pare = name.parents('li').eq(index),
            limt = pare.find('span').children('.but-off'),
            cont = pare.children('.but-off-text');
        limt.attr('index',index);
        limt.attr('num', '0');
        limt.parent().addClass(lmt+index);
        cont.addClass(con+index);
        pare.attr('style', 'z-index:' + index+1);
    });

    name.bind('click',function () {

        limt = $(this).parent();
        num = $(this).attr('num');
        indexLimt = $(this).attr('index');

        if(num == '0'){
            for (var i = 0; i < 3; i++) {
                if (i == indexLimt) {
                    var a = $('.' + lmt + i);
                    a.addClass(off);
                    a.children('em').attr('num','1');
                    $('.' + con + i).show();
                } else {
                    var c = $('.' + lmt + i);
                    c.removeClass(off);
                    c.children('em').attr('num', '0');
                    $('.' + con + i).hide();
                }
            }
        }else{
            var t = $('.' + lmt + indexLimt);
            t.removeClass(off);t.children('em').attr('num', '0');
            $('.' + con + indexLimt).hide();
        }

    });

}

//文本框初始颜色
function inputText(id,off){
    var name = $('.' + id);
    var value = name.attr('value');
    if( name.length > 0) {
        if( off == 'off') {
            name.blur(function() {
                $(this).css('color','#E8E8E8');
            });
            name.focus(function() {
                $(this).attr('value','');
                $(this).css('color','#000');
            });
        }else {
            name.blur(function() {
                $(this).attr('value', value);
                $(this).css('color','#E8E8E8');
            });
            name.focus(function() {
                $(this).attr('value','');
                $(this).css('color','#000');
            });
        }
    }
}

//充值状态客服

window.onload = function(){
    $('.kefu-im').bind('click',function(){
        window.open("https://huirendai.udesk.cn/im_client/?web_plugin_id=1354&cur_url="+location.href+"&pre_url="+document.referrer,"", "width=780,height=560,top=200,left=350,resizable=yes");
    });
};


//标签导航
(function(){
    var label = {
            type: '.',
            name: 'label',
            pent: 'label-pent',
            text: 'label-text'
        },
        financial = {
            name: 'financial-calorie',
            pent: 'financial-calorie ol',
            text: 'financial-calorie ul'
        },
        guide = {
            name: 'guide-info',
            pent: 'guide-info ol',
            text: 'guide-info dl'
        },
        guidel = {
            name: 'ol-info',
            pent: 'ol-info',
            text: 'dl-info'
        };

    function labelNavigation(name,pents,texts){
        var Nav = $(label.type + name);
        var pent = $(label.type + pents);
        var text = $(label.type + texts);
        var num;
        if( Nav.length > 0) {
            //附加
            pent.children().eq(0).css('border-left', 'none');
            pent.children().click(function () {
                num = $(this).index();
                $(this).addClass('show').siblings().removeClass('show');
                text.children().eq(num).addClass('show').siblings().removeClass('show');
            });
        }
    }
    labelNavigation(label.name,label.pent,label.text);
    labelNavigation(financial.name,financial.pent,financial.text);
    labelNavigation(guide.name,guide.pent,guide.text);
    labelNavigation(guidel.name,guidel.pent,guidel.text);
})();

//首页公告滚动
(function(){

    var ul = $('.announce span'),li = ul.children(),Time,_index = 0;

    Time = setInterval(function(){ sx() },7000);

    ul.hover(function () { clearInterval(Time); },function(){ Time = setInterval(function(){ sx() },7000); });

    function sx(){
        _index = _index >= li.length ? 0 : _index;
        if( li.length <= 1 ){
            clearInterval(Time);
        }else{
            li.eq(_index).animate({'height': '0px'}, 500, function () {
                var txt = $(this).removeAttr('style').remove();
                ul.append(txt);
            });
            _index++;
        }

    }

})();

//title提示弹窗
(function(){
    $(function(){
        function eptitle(id,o) {
            var x = 10;
            var y = 10;
            $(id).mouseover(function(e){
                this.myTitle = this.title;
                this.title = "";
                var tooltip = "";
                tooltip += '<style class=".tooltip" type="text/css">' +
                '#tooltip{position:absolute;padding:5px 10px;color:#4cc8c8;border:1px solid #E8E8E8;background:#fff;-webkit-box-shadow: 3px 3px 3px #ccc;-moz-box-shadow: 3px 3px 3px #ccc;box-shadow: 3px 3px 3px #ccc;border-radius: 5px;z-index:100;}' +
                '</style>';
                tooltip += "<div id='tooltip'>"+ this.myTitle +"<\/div>"; //创建 div 元素 文字提示
                if( this.myTitle != '' ) $("body").append(tooltip);    //把它追加到文档中
                var tootip = $('#tooltip');
                if(o=='right'){
                    tootip.each(function(){ x = - $(this).width() * 1.2 });
                }
                tootip.css({
                        "top": (e.pageY-y) + "px",
                        "left": (e.pageX+x)  + "px"
                    }).show("fast");      //设置x坐标和y坐标，并且显示
            }).mouseout(function(){
                this.title = this.myTitle;
                $("#tooltip").remove();   //移除
                $(".tooltip").remove();   //移除
            }).mousemove(function(e){
                $("#tooltip")
                    .css({
                        "top": (e.pageY-y) + "px",
                        "left": (e.pageX+x)  + "px"
                    });
            });
        }

        eptitle('em.zhuan-30');
        eptitle('em.zhuan-90');
        eptitle('.t','right');
    })
})();


/*
 *
 * 帮助中心
 *
 * */
(function(){

    function hrdGrid(id){
        var dl = $(id),hasSow;
        dl.bind('click',function(){
            hasSow= $(this).hasClass('show') ? true : false;
            if( hasSow ){
                $(this).removeClass('show').addClass('hide');
                $(this).siblings('dd').stop(false,true).slideUp();
            }else{
                $(this).removeClass('hide').addClass('show');
                $(this).siblings('dd').stop(false,true).slideDown();
            }
        });
    }
    function tentGrid(id){
        var dl = $(id),hasSow;
        dl.bind('click',function(){
            hasSow= $(this).hasClass('show') ? true : false;
            if( hasSow ){
                $(this).removeClass('show').addClass('hide');
                $(this).children('dd').stop(false,true).slideUp();
            }else{

                if( $(this).children('dd').text() != '' ){

                    $(this).addClass('show').siblings().removeClass('show');
                    $(this).children('dd').stop(false,true).slideDown();
                    $(this).siblings().each(function(){ $(this).children('dd').slideUp(); });
                    $(this).siblings().each(function(){ $(this).children('dd').slideUp(); });
                }

            }
        });
    }

    $(function () {
        hrdGrid('.help-left dl dt');//left
        tentGrid('.content-ul dl');//right
    });

})();

/*
 *
 * 我的盈计划
 *
 * */
(function(){

    $(function () {
        $('.row-click').each(function (index,value) { $(value).attr('so', '0');  });

        function rowClick(ID) {
            $(ID).bind('click',function () {

                var tz = $(this).parents('.row').attr('so');

                if( tz == 0 ){
                    $(this).parents('.row').addClass('show').next('.row-show').stop(false,true).slideDown();
                    $(this).parents('.row').attr('so','1');
                }else{
                    $(this).parents('.row').removeClass('show').next('.row-show').stop(false,true).slideUp();
                    $(this).parents('.row').attr('so','0');
                }

            });
        }

        rowClick('.row-click .tz');
        rowClick('.row-click em');


        if(!$('.benefits-info ol.end')[0]){
            $('.benefits-info ol li').bind('click',function(){
                var dl = $(this).parent().next().children();
                var index = $(this).index();
                $(this).addClass('show').siblings().removeClass('show');
                dl.eq(index).addClass('show').siblings().removeClass('show');
            });
        }
    });

})();




/*
 *
 * 旧菜单
 *
 * */
(function(){
    var help = $('#help_tree dl dt');
    help.bind('click',function(){
        if( $(this).hasClass('show') ){
            $(this).removeClass('show').addClass('hide').next('dd').stop(false,true).slideUp();
        }
        else if( $(this).hasClass('hide') ){
            $(this).removeClass('hide').addClass('show').next('dd').stop(false,true).slideDown();
        }
    });
})();


/*
 *
 * 阳光保险，各页面HTML添加
 *
 * */
(function(){
    $(function () {
        function Yhtml(Hclass,Hcss,Acss) {
            var html = '<div class="yg" style="'+Hcss+'"><a href="/activity/201512ygbx" target="_blank" style="'+Acss+'">交易资金盗转盗用风险由<strong style="color:#ff6300;font-size:14px;">阳光保险</strong>提供保障</a></div>';
            $(Hclass).each(function(index,value){ $(value).append(html) });
        }
        //注册：
        Yhtml('.reg-content .reg-info .left','margin-top:-20px;margin-left:150px');
        //登录：
        Yhtml('.banner-dl-info .reg-ul-text','margin-top:10px');
        //注册banner：
        Yhtml('.banner-info','position:absolute;bottom:5px;','color:#dadada;');
        //通用
        Yhtml('.bx');
    });

})();

/*
 *
 * 首页拉幕
 *
 * */
(function(){



    $(function () {

        var tent = $('.tent'),
            tentMax = $('#tent-max'),
            tentMin = $('#tent-min'),
            tentminOne = $('#tent-min-1'),
            Timel,Maxff = 0,
            scrolling = false,
            num = 76;

        function banner(){
            if(window.chrome) {
                $('.banner li').css('background-size', '100% 100%');
            }

            $('.banner').unslider({
                arrows: true,
                fluid: true,
                dots: true
            });


            //  Find any element starting with a # in the URL
            //  And listen to any click events it fires
            $('a[href^="#"]').click(function() {
                //  Find the target element
                var target = $($(this).attr('href'));

                //  And get its position
                var pos = target.offset(); // fallback to scrolling to top || {left: 0, top: 0};

                //  jQuery will return false if there's no element
                //  and your code will throw errors if it tries to do .offset().left;
                if(pos) {
                    //  Scroll the page
                    $('html, body').animate({
                        scrollTop: pos.top,
                        scrollLeft: pos.left
                    }, 1000);
                }

                //  Don't let them visit the url, we'll scroll you there
                return false;
            });
        }

        if(tent.is(':visible')){

            if($(window).width() < 1200 ){
                tent.css({'width':'100%','overflow':'hidden'});
            }

            var winMax = $(window).height(),
                Time,index = 0;

            function maxhide(){

                tent.stop(false, true).animate({'height':'0'},function(){
                    tent.css('position','relative');
                    tentMax.removeAttr('style').hide();
                    tentMin.css({'display':'block','position':'absolute','width':'1444px','top':'0px','left':'50%','margin-left':'-722px'});
                    tent.stop(false, true).animate({'height':'76px'},function(){
                        $('.top .wrap').css('margin-top','76px');
                        tent.css('position','absolute');
                        $('body').removeAttr('style');
                        $('body,html').removeAttr('style');$('.banner-reg').show();banner();
                    });

                    clearTimeout(Time);
                });

            }

            function Tscroll(){
                $(document).scroll(function(){

                    var headerTop = $('header').offset().top + 74;

                    if( tentMin.is(':visible') || tentminOne.is(':visible') ){
                        if( scrollY > headerTop ){

                            if(index == 0) {
                                tent.css({'height': '0', 'position': 'fixed','background':'none'});
                                tentMax.hide();tentMin.hide();tentminOne.css({'display':'block','margin':'0 auto'});
                                tent.animate({'height':'61px'},function(){});
                            }
                            index=1;

                        }else{
                            if(index == 1) {
                                tent.animate({'height':'0'},function(){ tentminOne.hide();tentMin.css({'display':'block','position':'absolute','width':'1444px','top':'0px','left':'50%','margin-left':'-722px'});tent.css({'background':'#a42e8d','height':'76px','position': 'absolute'}) });
                            }
                            index=0;
                        }
                    }
                });
            }

            if(tentMax[0]){

                $(window).unload(function(){ $('body,html').scrollTop(0) });
                $('body,html').css('overflow','hidden');
                $('.banner-reg').css('display', 'none');
                tent.css('height', (winMax-115)+'px');
                if( winMax < 1000 ){
                    tentMax.css({'margin-top': '-' + (winMax / 2).toFixed(0) + 'px','margin-left':'-'+ (tentMax.width()/2).toFixed(0) + 'px','height':winMax+'px'});
                }else{
                    tentMax.css({'margin-top': '-' + (1000 / 2).toFixed(0) + 'px','margin-left':'-'+ (tentMax.width()/2).toFixed(0) + 'px','height':1000+'px'});
                }
                Time = setTimeout(function () {
                    maxhide();
                },6000);
                if( tentMax.is(':visible') || Maxff == 0 ) {
                    $(document).bind('mousewheel', function (event) {
                        event.preventDefault();

                        if (!scrolling) {
                            if (event.deltaY > 0) {        //向上滚动
                                //
                            } else {                       //向下滚动
                                maxhide();
                                $(document).unbind('mousewheel');
                            }
                            scrolling = true;
                            clearTimeout(Timel);
                            Timel = setTimeout(function () {
                                scrolling = false;
                            }, 1000);
                        }
                    });
                }
                //Tscroll();
            }else{
                if($('#index-homepage')[0]){
                    banner();
                    tent.css({'position':'absolute','height': num + 'px'});
                    tentMin.css({'display':'block','position':'absolute','width':'1444px','height': num + 'px','top':'0px','left':'50%','margin-left':'-722px'});
                    $('.top .wrap').css('margin-top', num + 'px');
                    $('body,html').removeAttr('style');
                    //Tscroll();
                }
                else{
                    tent.css({'position':'absolute','height': num + 'px'});
                    tentMin.css({'display':'block','position':'absolute','width':'1444px','height': num + 'px','top':'0px','left':'50%','margin-left':'-722px'});
                    $('.top .wrap').css('margin-top', num + 'px');
                    banner();
                }
            }
        }else{
            if($('#index-homepage')[0]) banner();
        }

    });

})();

/*
 *
 * 返回顶部
 *
 * */
(function(){
    var __FILE__, scripts = document.getElementsByTagName("script");
    __FILE__ = scripts[scripts.length - 1].getAttribute("src").split('/static/')[0];
    // var text =  {
    //     txt :
    //     '<!--返回顶部 开始-->'+
    //     '<style type="text/css">'+
    //     '.back-top{position:fixed;z-index:999;top:75%;right:0;width:50px;height:187px;margin-top:-127px;display:block;border:1px solid #ccc;background:#fff;-webkit-box-shadow:5px 5px 5px #ccc;-moz-box-shadow:5px 5px 5px #ccc;box-shadow:0 1px 3px #ccc}'+
    //     '.back-Err,.back-kf,.back-tp,.back-js{background:url('+__FILE__+'//static/images/v1/backTop.png?__sprite) no-repeat;border-bottom:2px solid #f2f2f2}'+
    //     '.back-kf{width:100%;height:52px;display:block;background-position:-1px -1px}'+
    //     '.back-kf:hover{background-position:-1px -52px}'+
    //     '.back-Err{position:relative;width:100%;height:52px;display:block;background-position:-52px -1px}'+
    //     '.back-Err img{position:absolute;top:50%;left:-269px;margin-top:-59px;display:none;width:269px;height:144px;}'+
    //     '.back-Err:hover{background-position:-52px -52px}'+
    //     '.back-Err:hover img{display:block}'+
    //     '.back-js{width:100%;height:52px;display:block;background-position:-155px 0}'+
    //     '.back-js:hover,.back-js.hover{background-position:-155px -52px}'+
    //     '.back-tp{width:100%;height:30px;display:block;background-position:-103px -12px;border-bottom:none}'+
    //     '#back-js{display:none;width:430px;height:377px;overflow:hidden;position:absolute;right:55px;top:50%;margin-top:-200px;background:#fff;-webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;  -webkit-box-shadow: 0 2px 4px #CCC;  -moz-box-shadow: 0 2px 4px #CCC;  box-shadow: 0 2px 4px #CCC;}'+
    //     '#back-js .title {width:100%;height: 44px;line-height:44px;color:#fff;text-align:center;font-size:18px;background: #4cc8c8;-webkit-border-radius: 5px 5px 0 0;-moz-border-radius:  5px 5px 0 0;border-radius:  5px 5px 0 0; }'+
    //     '#back-js .content {width:80%;height:260px;margin:20px auto 0;}'+
    //     '#back-js .content dl {width:100%;display:block;height:50px;line-height:50px;overflow:hidden;font-size:14px;}'+
    //     '#back-js .content dl dt{float:left;width:25%;}'+
    //     '#back-js .content dl dd{float:right;width:75%;height:50px;position:relative;}'+
    //     '#back-js .content dl dd b { position:absolute;top:0;right:2px;width:20px;height:50px;line-height:50px;font-size:16px;color:#000;z-index:100; }'+
    //     '#back-js .content dl dd input,#back-js .content dl dd select{width:100%;height:40px;line-height:40px;padding:0 25px 0 5px;margin-top:5px;outline:none;border:1px solid #dfdfdf;}'+
    //     '#back-js .content dl dd .way {width:100%;}'+
    //     '#back-js .content dl dd .way li{ float:left;width:50%;height:40px;line-height:40px;border:1px solid #ccc;color:#4cc8c8;text-align:center;margin-top:5px;cursor:pointer;}'+
    //     '#back-js .content dl dd .way li.sow{background:#4cc8c8;color:#fff;}'+
    //     '#backJS-calculate,#backJS-replace{display:inline-block;width:35%;text-align:center;height:30px;color:#4cc8c8;line-height:30px;font-size:16px;border:1px solid #4cc8c8;margin:15px 7% 0 3%;-webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;}'+
    //     '#backJS-calculate.sow,#backJS-replace.sow{background:#4cc8c8;color:#fff;}'+
    //     '#backJs-error{display:none;width:60%; margin-left:30%; margin-top:-5px; height:12px;line-height:12px;font-size:12px;color: #e1183d;}'+
    //     '#back-js .text{width:80%; margin:0 auto;font-size: 16px;}'+
    //     '#back-js .text b { font-size:24px; color:#ff6161; margin:0 2px; }'+
    //     '</style>'+
    //     '<div class="back-top" style="">'+
    //     '<a class="back-kf" href="javascript:" id="kefu-im" style="" ></a>'+
    //     '<a class="back-Err" href="javascript:" style="" ><img src="'+__FILE__+'/static/images/v1/backTopErr.png" /></a>'+
    //     '<a class="back-js " href="javascript:" style="" ></a>'+
    //     '<a class="back-tp" href="javascript:" style="" ></a>'+
    //     '<!--计算器-->'+
    //     '<div id="back-js">'+
    //     '<div class="title">收益计算器</div>'+
    //     '<div class="content">'+
    //     '<dl><dt>加入金额：</dt>'+
    //     '<dd><b>元</b><input id="backJS-money" name="" type="text" placeholder="请输入拟加入金额" /></dd>'+
    //     '</dl><dl><dt>年化利率：</dt>'+
    //     '<dd><b>%</b><input id="backJS-rate" name="" type="text" placeholder="请输入年化利率" /></dd>'+
    //     '</dl><dl><dt>投资期限：</dt>'+
    //     '<dd><b>月</b><input id="backJS-limit" name="" type="text" placeholder="请输入投资期限" />'+
    //     '</dd></dl><dl><dt>还款方式：</dt><dd>'+
    //     '<ol class="way">'+
    //     '<li class="sow" style="border-right:none;">先息后本</li>'+
    //     '<li>等额本息</li>'+
    //     '</ol></dd></dl><dl><dt></dt><dd>'+
    //     '<a id="backJS-calculate" class="sow" href="javascript:">计算</a>'+
    //     '<a id="backJS-replace" href="javascript:">重置</a>'+
    //     '</dd></dl></div><div id="backJs-error"></div>'+
    //     '<div class="text">'+
    //     '预期收益 <b id="backJs-profit">0.00</b> 元'+
    //     '</div></div></div>'+
    //     '<!--返回顶部 结束-->'
    //
    // };
    //返回顶部
    function scrollTop(id) {
        var scroltp = {
            id : '.' + id,
            run : function () {
                var name = $(this.id);
                name.click(function() {
                    $('body,html').animate({scrollTop: 0}, 300);
                    return false;
                });
            }
        };
        return scroltp.run();
    }
    //计算器显示
    var o = {
        rate : false,
        limit : false,
        way  : 0
    };
    var calculator = {

        test: /^[0-9]+$/,
        getInput: function (value) {
            if (value == '') {
                return 0;
            }
            var reNum;

            reNum = this.test;

            if( value.length > 9 ){
                return value.substr(0, 9);
            }
            if (!reNum.test(value)) {
                return value.substring(0,value.length-1);
            } else if (value.length >= 2) {

                if (value.slice(0, 1) == 0) {
                    return value.substr(1);
                } else {
                    return value;
                }

            } else {
                return value;
            }

        },

        hover : function(id,error,profit,way){

            var $this = $('.' + id),
                sow = $('#' + id),
                Soid = $('#' + id +' input'),
                Time,addSow=0;

            $this.hover(function () {
                $(this).addClass('hover');sow.show();SoEach();
            },function(){
                clearTimeout(Time);
                Time = setTimeout(function () {
                    if( addSow != 1){
                        $this.removeClass('hover');sow.hide();
                    }
                },200);
            });

            sow.hover(function () {
                addSow=1;
            },function(){
                addSow=0;sow.hide();$this.removeClass('hover');SoEach();
            });

            function SoEach(){
                //Soid.each(function () {
                //   $(this).val('');$(error).hide().html('');$(profit).text('0.00');
                //   $(way).eq(0).addClass('sow').siblings().removeClass('sow');
                //   o.way = 0;
                //});
            }
        },
        rateKey : function(id,moneyId,limit,error){
            $(moneyId).bind('keyup', function () {
                var val = $(this).val();
                $(this).val(calculator.getInput(val));
            });

            $(id).bind('keyup', function () {
                var val = $(this).val(),
                    pattern = /^\d+(\.\d{1})?$/;
                if( val!='' && ( val<0.5 || val>25 || !pattern.test(val) ) ){
                    $(error).show().html('利率精确到小数点后一位，范围0.5%-25.0%');
                    o.rate = false;
                }else{
                    $(error).hide().html('');
                    o.rate = true;
                }
            });

            $(limit).bind('keyup',function(){
                var val = $(this).val(),
                    pattern = /^[1-9]\d*$/;
                if( val!='' && ( val<1 || val>36 || !pattern.test(val) ) ){
                    $(error).show().html('投资期限只能填写 1-36 的整数');
                    o.limit = false;
                }else{
                    $(error).hide().html('');
                    o.limit = true;
                }
            });

        },
        wayClick : function(id){
            $(id).bind('click',function() {
                $(this).addClass('sow').siblings().removeClass('sow');
                o.way = $(this).index();
            });
        },
        replaceClick : function(id,parent,profit,error){
            $(id).bind('click', function () {
                $(this).addClass('sow').siblings().removeClass('sow');
                $(parent+' input').each(function () { $(this).val('') });
                $(parent + ' select option').eq(0).attr('selected', 'selected');
                $(profit).text('0.00');
                $(error).hide().html('');
            });
        }

    };

    $(function () {
        //基本操作
        // $('body').append(text.txt);
        scrollTop('back-tp');
         // var imKefu = document.getElementById("kefu-im").onclick=function(){alert('d');return window.open("https://huirendai.udesk.cn/im_client/?web_plugin_id=1354&cur_url="+location.href+"&pre_url="+document.referrer,"", "width=780,height=560,top=200,left=350,resizable=yes");};
        //变量
        var _ = {
            //父元素
            parent : '#back-js',
            //加入金额
            money : '#backJS-money',
            //年化利率
            rate : '#backJS-rate',
            //投资期限
            limit : '#backJS-limit',
            //还款方式
            way : '.way li',
            //投资收益
            profit : '#backJs-profit',
            //重置
            place : '#backJS-replace',
            //错误信息
            error : '#backJs-error'
        };
        //收益计算器显示
        calculator.hover('back-js', _.error, _.profit, _.way);
        //还款方式
        calculator.wayClick(_.way);
        //利率提示+投资期限
        calculator.rateKey(_.rate, _.money, _.limit, _.error);
        //重置
        calculator.replaceClick(_.place,_.parent,_.profit, _.error);
        //提交
        $('#backJS-calculate').bind('click', function () {
            $(this).addClass('sow').siblings().removeClass('sow');
            var money = Number($(_.money).val()),
                limit = Number($(_.limit).val()),
                rate = Number($(_.rate).val())/100,
                i = rate/12;

            if(o.rate && o.limit){

                if(o.way != 0 ){
                    //等额本息
                    var y = ( [([money*i*Math.pow((1+i),limit)]/[Math.pow((1+i),limit)-1]) - (money/limit)] * limit ).toFixed(2);
                    $(_.profit).html( y );
                }else{
                    //先息后本 【 ( 本金 * [ 年化利率 / 100 / 12 ] ) * 投资期限 】
                    var x = ( ( money * i ) * limit).toFixed(2);
                    $(_.profit).html( x );
                }
            }else {
                if (!o.rate) $(_.error).show().html('利率精确到小数点后一位，范围0.5%-25.0%');
                if (!o.limit) $(_.error).show().html('投资期限只能填写 1-36 的整数');
            }
        });

    });

})();



