/**
 * Created by Dreamslink on 16/6/16.
 * 提交按钮效果
 */


$.fn.extend({
    buttonColorOn:function(){
        var that = this;
        var time = setTimeout(function(){
            that.css({'color':'#fff','background': '#38c0ff'}).removeAttr('disabled');
            clearTimeout(time);
        },2000);
    },
    buttonColorOff:function(obj,txt){
        obj.html('<b style="color:#38c0ff">'+txt+'</b>');
        this.css({'color':'#fff','background': '#666666'}).attr('disabled', 'disabled');

    }
});


// PS:附加图形验证码更换图片
$('strong.refresh').off('click').on('click', function () {
    $(this).siblings('img').attr('src','/user/figurecaptcha?'+ new Date().getTime())
});