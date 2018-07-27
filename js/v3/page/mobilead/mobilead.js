/**
 * Created by Dreamslink on 16/7/23.
 * 首页弹出活动广告
 */


function mobilead(mobileadImgUrl,mobileadHerf,mobileadStyle) {

    /**
     * @param mobileadImgUrl 图片路径
     * @param mobileadHerf   链接地址
     * @param mobileadStyle  { width , height , css }
     * */

    let
        width = mobileadStyle.width,
        height = mobileadStyle.height;
    let html = `
        <!--首页弹出活动广告-->
        <style class="alertYear" type="text/css">
        .yearBack{width:100%;height:100%;background:rgba(0,0,0,0.6);position:fixed;top:0;left:0;z-index: 1000}
        .yearTT{width:${width}px; height:${height}px; margin-top:${-parseInt(height/2)}px; margin-left:${-parseInt(width/2)}px;position:fixed;top:50%;left:50%;z-index: 1001;background:url(${mobileadImgUrl}) no-repeat}
        .yearcontent{position:relative;display:block;width:100%;height:100%;margin:0 auto}
        .yearcontent .off{width:51px;height:51px;position:absolute;overflow:hidden;${mobileadStyle.css}cursor:pointer;display:block}
        .yearcontent a{width:97%;height:${height}px;margin:0 auto;overflow:hidden;display:block}
        </style>
        <div class="alertYear">
            <div class="yearBack"></div>
            <div class="yearTT">
                <div class="yearcontent">
                    <em class="off"></em>
                    <a href="${mobileadHerf}"></a>
                </div>
            </div>
        </div>
    `;

    $('body').append(html);

    $('.yearcontent .off').bind('click', function () {

        $('.alertYear').remove();

    })

}

$(function () {
    if($('#mobileadImg')[0]) mobilead(mobileadImgUrl,mobileadHerf,mobileadStyle);
});

function mobilead2(mobileadImgUrl,mobileadStyle) {

    /**
     * @param mobileadImgUrl 图片路径
     * @param mobileadHerf   链接地址
     * @param mobileadStyle  { width , height , css }
     * */

    let
        width = mobileadStyle.width,
        height = mobileadStyle.height;
    let html = `
        <!--首页弹出活动广告-->
        <style class="alertYear" type="text/css">
        .yearBack{width:100%;height:100%;background:rgba(0,0,0,0.6);position:fixed;top:0;left:0;z-index: 1000}
        .yearTT{width:${width}px; height:${height}px; margin-top:${-parseInt(height/2)}px; margin-left:${-parseInt(width/2)}px;position:fixed;top:50%;left:50%;z-index: 1001;background:url(${mobileadImgUrl}) no-repeat;transition: .2s;}
        .yearcontent{position:relative;display:block;width:100%;height:100%;margin:0 auto}
        .yearcontent .off{width:51px;height:51px;position:absolute;overflow:hidden;${mobileadStyle.css}cursor:pointer;display:block}
       .yearcontent .locs{width: 196px;height: 40px;position: absolute;left: 50%;bottom: 0;margin-left: -102px;}
        </style>
        <div class="alertYear">
            <div class="yearBack"></div>
            <div class="yearTT">
                <div class="yearcontent">
                    <em class="off"></em>
                    <span class="locs"></span>
                </div>
            </div>
        </div>
    `;

    $('body').append(html);

    $('.yearcontent .off').bind('click', function () {

        $('.alertYear').remove();

    });
    $('.yearcontent .locs').bind('click', function () {
        var scripts = document.getElementsByTagName("script");
        var __FILE__ = scripts[scripts.length -3].getAttribute("src").split('/static/')[0];
        $('.yearTT').css('background','url('+__FILE__+'/static/images/activity/20180614/indexTop1.png) no-repeat')
        var time=1;
        var id=setInterval(function(){
            time--;
            if(time==0){
                window.location.href="/act/20180614"
                clearInterval(id);
            }
        },100);


    })

}

$(function () {
    if($('#mobileadImg2')[0]) mobilead2(mobileadImgUrl,mobileadStyle);
});