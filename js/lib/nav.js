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

        $(document).on("click",".pic",function(){
            var that = $(this).children('.sign');
            $.ajax({
                type: 'POST',
                url: '/member/json',
                data: "action=signin&theday=7",
                dataType: 'json',
                async:'false',
                success: function(data){
                    if(data.code == "00000" || data.code == "20009"){
                        that.empty().removeClass("sign").addClass("signed").html('已签到').append("<strong></strong>");
                        var text = that.find("strong");
                        text.text("+"+data.data.point).fadeOut(2000,function(){text.remove();});
                        $(".top").off("click",".sign");
                    } else if(data.code == "11") {
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


/*
 *
 * 首页拉幕
 *
 * */
(function(){

    $(function(){

        //var __FILE__, scripts = document.getElementsByTagName("script");
        //    __FILE__ = scripts[scripts.length - 1].getAttribute("src").split('/')[2];

        var hrd_grid = $('.hrd_grid'),
            hjq_content = $('.hjq-content');
        text = '<!--首页拉幕-->'+
        '<style>' +
        '.tente { width: 100%; margin: 0 auto; top: 0; left: 0; position: absolute; z-index: 1040; overflow: hidden; background: #ff4440; }' +
        '.tente img { width: 100%; max-width: 1920px; }' +
        '.tente img#tent-min { display: block; }' +
        '</style>'+
        '<div class="tente">'+
        '<a target="_blank" href="http://www.huirendai.com/activity/201601ny"><img id="tent-min" src="https://static.huirendai.com/static/images/activity/20160111/indexBanner.png" /></a>'+
        '</div>';


        if(hrd_grid.length > 0 || hjq_content.length > 0) {

           // $('body').prepend(text);
           //
           // var tent = $('.tente'),
           //     tentMin = $('#tent-min');
           //
           // var num = 76;
           // tent.css({'position':'absolute','height': num + 'px'});
           // tentMin.css({'position':'absolute','width':'1444px','height': num + 'px','top':'0px','left':'50%','margin-left':'-722px'});
           //$('.top .wrap').css('margin-top', num + 'px');

        }

    });



})();