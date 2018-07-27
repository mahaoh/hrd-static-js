/**
 * Created by Dreamslink on 16/7/4.
 * 错误信息分类单独显示
 */

module.exports = function(m) {
    
    if(m.indexOf('金额') >= 0){
        $('.error-prompt-Money').html(m);
    }else if(m.indexOf('图形验证码') >= 0){
        $('.error-prompt-ImgCaptcha').html(m);
    }else{
        var so = `
            <style class="top-error-prompt-obj" type="text/css">
                 p.top-error-prompt { width:100%;height:30px;line-height:25px;font-size:12px;display:block;padding:0 15px;margin:10px 0;background:#f4f4f4;display:none }
                 p.top-error-prompt strong { width:100%;height:30px;line-height:30px;display:block;color:#ff6161; }
            </style>
            <p class="top-error-prompt top-error-prompt-obj"><strong>${m}</strong></p>
        `;
        $('.TopErrorPrompt').html(so);

        $('.top-error-prompt').each(function(n,value){
            $(value).slideDown(300);
            var tiem = setTimeout(function(){
                $(value).slideUp(300,function(){ $('.top-error-prompt-obj').remove(); });
                clearTimeout(tiem);
            },7000);
        })
    }

};

