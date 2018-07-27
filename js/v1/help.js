var passwordrule = /^\d{6,16}$/;
// type 0 验证所以  1 数字+字母  2 数字+特殊字符  3 字母+特殊字符
var validate_password = function(str, type){
    var Errors = new Array(true, "密码必须含有数字", "密码必须含有字母", "密码必须含有特殊字符","密码不能为空","密码包含非法字符","密码校验类型不规范");
    var numasc = 0;
    var charasc = 0;
    var otherasc = 0;
    if(str.length==0){
        return Errors[4];
        //      return "密码不能为空";
    }else{
        if(0==type.length){
            type = 0;
        }
        for (var i = 0; i < str.length; i++) {
            var asciiNumber = str.substr(i, 1).charCodeAt();
            //alert(asciiNumber);
            if (asciiNumber >= 48 && asciiNumber <= 57) {
                if(0 == type || 1 == type || 2 == type){
                    numasc += 1;
                }
            }
            if ((asciiNumber >= 65 && asciiNumber <= 90)||(asciiNumber >= 97 && asciiNumber <= 122)) {
                if(0 == type || 1 == type || 3 == type){
                    charasc += 1;
                }
            }
            if ((asciiNumber >= 33 && asciiNumber <= 47)||(asciiNumber >= 58 && asciiNumber <= 64)||(asciiNumber >= 91 && asciiNumber <= 96)||(asciiNumber >= 123 && asciiNumber <= 126)) {
                if(0 == type || 2 == type || 3 == type){
                    otherasc += 1;
                }
            }
            if((0 == type) && (asciiNumber<33 || asciiNumber>126)){
                return Errors[5];
            }else if((1 == type) && (asciiNumber<48 || asciiNumber>122 || (asciiNumber>57 && asciiNumber<65) || (asciiNumber>90 && asciiNumber<97))){
                return Errors[5];
            }else if((2 == type) && (asciiNumber<33 || asciiNumber>126 || (asciiNumber>64 && asciiNumber<91) || (asciiNumber>96 && asciiNumber<123))){
                return Errors[5];
            }else if((3 == type) && (asciiNumber<33 || asciiNumber>126 || (asciiNumber>47 && asciiNumber<58))){
                return Errors[5];
            }
        }
        if(0 == type){
            if(0==numasc)  {
                return Errors[1];
                //return "密码必须含有数字";
            }else if(0==charasc){
                return Errors[2];
                //return "密码必须含有字母";
            }else if(0==otherasc){
                return Errors[3];
                //return "密码必须含有特殊字符";
            }else{
                return Errors[0];
            }
        }else if(1 == type){
            if(0==numasc)  {
                return Errors[1];
                //return "密码必须含有数字";
            }else if(0==charasc){
                return Errors[2];
                //return "密码必须含有字母";
            }else{
                return Errors[0];
            }
        }else if(2 == type){
            if(0==numasc)  {
                return Errors[1];
                //return "密码必须含有数字";
            }else if(0==otherasc){
                return Errors[3];
                //return "密码必须含有特殊字符";
            }else{
                return Errors[0];
            }
        }else if(3 == type){
            if(0==charasc){
                return Errors[2];
                //return "密码必须含有字母";
            }else if(0==otherasc){
                return Errors[3];
                //return "密码必须含有特殊字符";
            }else{
                return Errors[0];
            }
        }else{
            return Errors[6];
            //return "校验类型不规范";
        }
    }
};

//新旧密码
function Password(id,error,type,errorText,off){
    var password = id;
    var passwordall = false;
    var postaction = function(){}; //外部事件接取函数
    var pass;//校验规则
    function passwored(value){
        if(type != null || type != undefined || type != '') {
            // type 0 验证所以  1 数字+字母  2 数字+特殊字符  3 字母+特殊字符 4 数字
            pass = (type == 4) ? passwordrule.test(value) : validate_password(value, type);
        }

        if( pass && value.length >=6 && value.length <= 16) {
            error.html('');
            passwordall = true;
            postaction(passwordall);
        }else{
            if(errorText == undefined || errorText == '' || errorText == null) {
                console.log(errorText)
                error.html('密码由6-16位数字组成,请正确输入');
            }else{
                error.html(errorText);
            }
            passwordall = false;
            postaction(passwordall);


        }
    }

    if(off == 'off'){
        passwored(password.val());
    }else{
        password.bind('focus',function() { error.html('') });
        password.bind('blur',function() { passwored($(this).val()) });
    }

    return {
        done:function(f) {
            postaction=f || postaction;
        }
    }
}


//确认密码
function capypassword(id,nweid,error,off){
    var password = id;
    var newpassword = nweid;
    var passwordall = false;
    var postaction = function(){}; //外部事件接取函数
    function passwored(value){
        if( newpassword.val() != value ) {
            error.html('两次新密码输入不一致');
            passwordall = false;
            postaction(passwordall);
        }else{
            error.html('');
            passwordall = true;
            postaction(passwordall);
        }
    }

    if(off == 'off') {
        passwored();
    }else{
        password.bind('focus',function() { error.html('') });
        password.bind('blur',function() { passwored($(this).val()) });
    }

    return {
        done:function(f) {
            postaction=f || postaction;
        }
    }
}


//认证通用错误提示
$(function(){
    var helpprompthtml = $('.helpprompt');
    if(helpprompthtml.html() != ''){
        helpprompthtml.slideDown();
        var time = setInterval(function () {
            helpprompthtml.slideUp();
            clearInterval(time);
        },5000);
    }else{
        helpprompthtml.slideUp();
    }

});



//短信验证
(function(){

    var _ = {
        user : '#username',     // 用户名
        phone: '#phone',        // 手机号
        email: '#email',        // 邮箱
        captcha: '#captcha',    // 图形验证码
        I_captcha: '.reg-phone-3',           // 图形验证码显示区
        phone_captcha: '#phone_captcha', // 短信验证码
        getCaptcha: '#get-captcha',      // 发送验证码
        wai: '.wai > a',                 // 发送语音验证码
        password: '#password',           // 登录密码
        conform_password: '#conform_password', // 验证密码
        EmilSubmit : '#EmilSubmit',            // 提交

        D_error : '.error b',  // 单项错误信息
        username_error : '.username_error',  // 用户名错误信息
        phone_error : '.phone_error',        // 手机号错误信息
        email_error : '.email_error',        // 邮箱号错误信息
        captcha_error : '.captcha_error',    // 图形验证错误信息
        phone_captcha_error : '.phone_captcha_error',  // 短信验证错误信息
        password_error : '.password_error',  // 登录密码错误信息
        conform_password_error : '.conform_password_error',  // 二次验证密码错误信息
        Input_radio_error : '.Input_radio_error'  // 协议错误信息
    };

// 提交变量
    var o = {
        user : false,                // 用户名
        phone : false,               // 手机号
        email : false,               // 邮箱
        captcha : false,             // 图形验证码
        phone_captcha : false,       // 短信验证码
        password : false,            // 登录密码
        conform_password : false,    // 验证密码
        label : true,                // 使用协议
        phoneAjax : 0,               // 注册页面手机校验完成提示
        emailAjax : 0,               // 邮箱校验完成提示
        userCC : 0,                  // 用户名去重
        emailCC : 0,                 // 邮箱去重
        phoneCC : 0,                 // 校验去重
        submitCC : 0,                // 提交去重
        coop : ''
    };
// 错误信息填写
    var error = {
        no : function(user,value){
            if($(user)[0]) $(user).removeClass('dui').html(value).show(); else $(_.D_error).html(value).show();
        },
        off: function(user,value){
            if($(user)[0]) $(user).addClass('dui').html(value).show(); else $(_.D_error).html('').hide();
        },
        none : function(user){
            if($(user)[0]) $(user).removeClass('dui').html('').hide(); else if($(_.D_error).html() == '') $(_.D_error).html('').hide();
        }
    };
    var IFimt = {
        phone_captcha: function (GetCaptcha,Wai,value,captchaal, url) {

            var phone = $(_.phone).val(),      // 手机号码
                captcha = $(_.captcha).val(),  // 图形验证码
                phone_captcha = $(_.phone_captcha).val(),  // 短信验证码
                //getCaptcha = $(_.getCaptcha),  // 发送验证码
                //wai = $(_.wai),                // 发送语音验证码
                getCaptcha = GetCaptcha,  // 发送验证码
                wai = Wai,                // 发送语音验证码
                time = 60,                     // 重发时间
                st = "验证码已发送",
                str = "秒后重新发送",
                timer, _url;

            function CaptchaTed(getCaptcha, st, time, str) {
                getCaptcha.css({
                    'border': '1px solid #ccc',
                    'color': '#ccc',
                    'line-height': '18px',
                    'font-size': '12px',
                    'cursor': 'default'
                }).html(st + '<br/>' + time + str)
            }

            function Capwai(wai, time, str) {
                wai.css({
                    'color': '#ccc',
                    'cursor': 'default'
                }).html('语音验证码 (' + time + str + ')');
            }

            if (phone == undefined || $.trim(phone) == '') {
                error.no(_.phone_error, '请输入手机号');
                o.phone_captcha = false;
            } else {

                    if (o.phoneCC == 0) {

                        if (url == 'v') {
                            _url = '/user/smscaptcha/' + phone + '/'+captchaal+'/' + $(_.captcha).val(); // 短信验证
                        } else {
                            _url = '/user/voicecaptcha/' + phone + '/'+captchaal+'/' + $(_.captcha).val(); // 语音验证
                        }

                        $.ajax({
                            type: 'GET',
                            url: _url,
                            dataType: 'json',
                            async: 'false',
                            success: function (data) {
                                if (data.r == '00' || data.r == '01' || data.r == '13' || data.r == '14') {

                                    function waiShow() {
                                        wai.removeAttr('style').html('语音验证码').bind('click', function () {
                                            IFimt.phone_captcha(GetCaptcha,Wai,phone_captcha,captchaal)
                                        });
                                    }

                                    if (url == 'v') {

                                        if (data.r == '14') {
                                            error.no(_.phone_captcha_error, data.m);
                                        } else {

                                            error.none(_.phone_captcha_error);
                                            wai.css({'color': '#ccc', 'cursor': 'default'}).unbind('click');
                                            getCaptcha.unbind('click');

                                            if (data.r == '01') {

                                                $(_.I_captcha).show();
                                                getCaptcha.bind('click', function () {
                                                    IFimt.phone_captcha(GetCaptcha,Wai,phone_captcha,captchaal,'v')
                                                });

                                            } else if (data.r != '13' && data.r != '01') {

                                                CaptchaTed(getCaptcha, st, time, str);
                                                $(_.phone).attr('disabled', 'disabled');
                                                timer = setInterval(function () {
                                                    time -= 1;
                                                    getCaptcha.html(st + '<br/>' + time + str);
                                                    if (time < 0) {
                                                        clearInterval(timer);
                                                        getCaptcha.removeAttr('style').html('重新发送');
                                                        $(_.phone).removeAttr('disabled');
                                                        getCaptcha.bind('click', function () {
                                                            IFimt.phone_captcha(GetCaptcha,Wai,phone_captcha, captchaal, 'v')
                                                        });
                                                        waiShow();
                                                        $(_.captcha).next().children('img').attr('src', '/user/figurecaptcha?' + new Date().getTime());
                                                    }
                                                }, 1000);

                                            } else {
                                                CaptchaTed(getCaptcha, st, time, str);
                                                getCaptcha.html(data.m);
                                            }
                                        }

                                    } else {

                                        getCaptcha.hide();

                                        if (data.r == '14') {

                                            error.no(_.phone_captcha_error, data.m);

                                        } else {
                                            wai.unbind('click');
                                            error.none(_.phone_captcha_error);

                                            if (data.r == '01') {

                                                $(_.I_captcha).show();
                                                waiShow();

                                            } else if (data.r != '13' && data.r != '01') {
                                                Capwai(wai, time, str);
                                                timer = setInterval(function () {
                                                    time -= 1;
                                                    wai.html('语音验证码 (' + time + str + ')');
                                                    if (time < 0) {
                                                        clearInterval(timer);
                                                        waiShow();
                                                        getCaptcha.show();
                                                    }
                                                }, 1000);

                                            } else {

                                                Capwai(wai, time, str);
                                                wai.html(data.m);

                                            }
                                        }

                                    }
                                    o.phoneCC = 0;

                                } else if (data.r == '12') {
                                    o.phoneCC = 0;
                                    $(_.I_captcha).show();
                                    error.no(_.phone_captcha_error, data.m);
                                    //$(_.captcha).next().children('img').attr('src', '/user/figurecaptcha?'+ new Date().getTime());
                                } else {
                                    o.phoneCC = 0;
                                    error.no(_.phone_captcha_error, data.m);
                                    o.phone_captcha = false;
                                }
                            },
                            error: function (data) {
                                error.no(_.phone_captcha_error, '本次验证码发送失败');
                                o.phone_captcha = false;
                                o.phoneCC = 0;
                            }
                        });

                        $(_.phone).bind('keyup', function () {
                            clearInterval(timer);
                            if (getCaptcha[0]) getCaptcha.removeAttr('style').html('发送验证码');
                            getCaptcha.bind('click', function () {
                                IFimt.phone_captcha(GetCaptcha,Wai,phone_captcha, captchaal,'v');
                            });
                        });
                    }
                    o.phoneCC = 1;
            }

            if (o.phone_captcha) o.phone_captcha = true;
        }
    };

    $(function () {
        $(_.getCaptcha).bind('click', function () { IFimt.phone_captcha($(_.getCaptcha),$(_.wai),$(_.phone_captcha).val(),'paypwdFind','v');error.none(_.phone_captcha_error) });
        $(_.wai).bind('click',function(){  IFimt.phone_captcha($(_.getCaptcha),$(_.wai),$(_.phone_captcha).val(),'paypwdFind');error.none(_.phone_captcha_error) });
        //第二
        $('#get-captchaOne').bind('click', function () { IFimt.phone_captcha($('#get-captchaOne'),$('.waiOne a'),$(_.phone_captcha).val(),'verifymobile','v');error.none(_.phone_captcha_error);$('#mobile').val($('#phone').val()) });
        $('.waiOne a').bind('click',function(){  IFimt.phone_captcha($('#get-captchaOne'),$('.waiOne a'),$(_.phone_captcha).val(),'verifymobile');error.none(_.phone_captcha_error);$('#mobile').val($('#phone').val())
        });
        $(_.captcha).next().children('img').bind('click',function() { $(this).attr('src', '/user/figurecaptcha?'+ new Date().getTime()) });
        $(_.captcha).next().children('a.sua').bind('click',function() { $(this).prev().attr('src','/user/figurecaptcha?'+ new Date().getTime()) });
        $('.sua').bind('click',function() { $(this).prev().attr('src','/user/figurecaptcha?'+ new Date().getTime()) });

    });
})();