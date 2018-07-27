/*======================*\
         注册页面
\*======================*/
(function(){

    // 基本变量
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

    // 验证信息
    var txt = {
         password_msg_shorter : "登录密码不能少于 8 个字符,且必须有字母",
         password_msg_confrim_shorter : "确认密码不能少于 8 个字符,且必须有字母",
         password_msg_confirm_invalid : "两次输入密码不一致",
         msg_can_reg : "正确",
         username_msg : '请输入2-15个汉字.英文,数字',
         username_msg_exist : "用户名已经存在,请重新输入"
    };

    // 判断正则 高级验证
    var imt = {
        user : /^([a-zA-Z0-9_]|[\u4e00-\u9fa5]){2,15}$/,  //用户名正则
        email : /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/,  //邮箱正则
        phone : /^(13[0-9]|15[012356789]|17[3678]|18[0-9]|14[57]|16[6]|19[9])\d{8}$|^170[0125789]\d{7}$/,  //手机正则

        // type 0 验证所以  1 数字+字母  2 数字+特殊字符  3 字母+特殊字符
        validate_password: function(str, type){
            var Errors = new Array("true", "密码必须含有数字", "密码必须含有字母", "密码必须含有特殊字符","密码不能为空","密码包含非法字符","密码校验类型不规范");
            var numasc = 0;
            var charasc = 0;
            var otherasc = 0;
            if(0==str.length){
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
        }
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

    // 基本验证
    var IFimt = {
        //通用验证
        used: function(value,id,txt,use,obj){
            if( value == undefined || $.trim(value) == '' || value == '' ){
                error.no(id,txt);
                use = false;
            }else {
                obj();
            }
        },
        //用户名验证
        user: function(value){

            var reg = imt.user;

            if( value == '' ){
                error.no(_.username_error, '请输入用户名');
                o.user = false;
            }else if( !reg.exec(value) ){
                error.no(_.username_error, txt.username_msg);
                o.user = false;
            }else{
                if(o.userCC==0){
                    $.ajax({
                        type:'GET',
                        url:'/user/checkname/'+value,
                        dataType:'json',
                        async:false,
                        success:function(data) {
                            if( data.r == '00' ){
                                o.user = true;
                                o.userCC = 0;
                                error.off(_.username_error,'用户名可用');
                            }else{
                                error.no(_.username_error, data.m);
                                o.user = false;
                                o.userCC = 1;
                            }
                        },
                        error:function(data) {
                            o.user = false;
                            error.no(_.username_error, '本次提交用户名失败');
                        }
                    });
                }
            }

            if( o.user ) o.user = true;
        },
        //邮箱验证
        email: function(value){

            var pattern = imt.email;
            if( value == '' ){
                error.no(_.email_error, '邮箱不能为空');
                o.email = false;
            }else if( !pattern.test(value) ){
                error.no(_.email_error, '邮箱格式错误');
                o.email = false;
            }else{
                if(o.emailCC==0){
                    $.ajax({
                        type: 'GET',
                        url:'/user/checkemail/'+value,
                        dataType:'JSON',
                        async:false,
                        success: function(data){
                            if (data.r =='00'){
                                error.off(_.email_error, '邮箱可用');
                                o.email = true;
                                o.emailCC = 0;
                            } else{
                                error.no(_.email_error, data.m );
                                o.email = false;
                                o.emailCC = 1;
                            }
                        },
                        error: function(data){
                            error.no(_.email_error, '本次提交邮箱失败');
                            o.email = false;
                        }
                    });
                }
            }

            if( o.email ) o.email = true;
        },
        //手机验证
        phone: function(value){

            this.used(value,_.phone_error,'请输入您的手机号',o.phone,function(){

                var reg = imt.phone;
                if( !reg.test(value) ){
                    error.no(_.phone_error, '您的手机号不正确');
                    o.phone = false;
                }else{
                    $.ajax({
                        type: 'GET',
                        url:'/user/checkmobile/'+value,
                        dataType:'json',
                        async:'false',
                        //complete:function() {
                        //    o.phoneAjax -= 1;
                        //},
                        success:function(data){
                            if (data.r =='00'){
                                error.off(_.phone_error, '手机号可用');
                                o.phone = true;
                                o.phoneAjax = 0;
                            } else{
                                error.no(_.phone_error, data.m );
                                o.phone = false;
                            }
                        },
                        error:function(data){
                            error.no(_.phone_error, '本次提交手机号失败');
                            o.phone = false;
                        }
                    });

                }
                o.phoneAjax = 1;
            });

            if( o.phone ) o.phone = true;

        },
        //短信验证
        phone_captcha: function(value,url) {

            var phone = $(_.phone).val(),      // 手机号码
                captcha = $(_.captcha).val(),  // 图形验证码
                phone_captcha = $(_.phone_captcha).val(),  // 短信验证码
                getCaptcha = $(_.getCaptcha),  // 发送验证码
                wai = $(_.wai),                // 发送语音验证码
                time = 60,                     // 重发时间
                st = "验证码已发送",
                str= "秒后重新发送",
                timer,_url;

            function CaptchaTed(getCaptcha,st,time,str){
                getCaptcha.css({
                    'border': '1px solid #ccc',
                    'color': '#ccc',
                    'line-height': '18px',
                    'font-size': '12px',
                    'cursor': 'default'
                }).html(st + '<br/>' + time + str)
            }

            function Capwai(wai,time,str){
                wai.css({
                    'color': '#ccc',
                    'cursor': 'default'
                }).html('语音验证码 (' + time + str + ')');
            }

            if( phone == undefined || $.trim(phone) == '' ){
                error.no(_.phone_error,'请输入手机号');
                o.phone_captcha = false;
            }else{

                if(o.phoneAjax == 0){
                    if( o.phoneCC == 0){

                        if( url == 'v' ){
                            _url = '/user/smscaptcha/' + phone + '/register/' + $(_.captcha).val(); // 短信验证
                        }else{
                            _url = '/user/voicecaptcha/' + phone + '/register/' + $(_.captcha).val(); // 语音验证
                        }

                        $.ajax({
                            type:'GET',
                            url:_url,
                            dataType:'json',
                            async:'false',
                            success:function(data){
                                if(data.r == '00' || data.r == '01' || data.r == '13' || data.r == '14') {

                                    function waiShow() {
                                        wai.removeAttr('style').html('语音验证码').bind('click', function () {
                                            IFimt.phone_captcha(phone_captcha)
                                        });
                                    }

                                    if (url == 'v') {

                                        if( data.r == '14'){

                                            error.no(_.phone_captcha_error, data.m);

                                        }else{

                                            error.none(_.phone_captcha_error);
                                            wai.css({'color': '#ccc', 'cursor': 'default'}).unbind('click');
                                            getCaptcha.unbind('click');

                                            if( data.r == '01'){

                                                $(_.I_captcha).show();
                                                getCaptcha.bind('click', function () { IFimt.phone_captcha(phone_captcha, 'v') });

                                            }else if (data.r != '13' && data.r != '01') {

                                                CaptchaTed(getCaptcha,st,time,str);
                                                $(_.phone).attr('disabled', 'disabled');
                                                timer = setInterval(function () {
                                                    time -= 1;
                                                    getCaptcha.html(st + '<br/>' + time + str);
                                                    if (time < 0) {
                                                        clearInterval(timer);
                                                        getCaptcha.removeAttr('style').html('重新发送');
                                                        $(_.phone).removeAttr('disabled');
                                                        getCaptcha.bind('click', function () { IFimt.phone_captcha(phone_captcha, 'v') });
                                                        waiShow();
                                                        $(_.captcha).next().children('img').attr('src', '/user/figurecaptcha?'+ new Date().getTime());
                                                    }
                                                }, 1000);

                                            }else {
                                                CaptchaTed(getCaptcha,st,time,str);
                                                getCaptcha.html(data.m);
                                            }
                                        }

                                    } else {

                                        getCaptcha.hide();

                                        if( data.r == '14'){

                                            error.no(_.phone_captcha_error, data.m);

                                        }else{
                                            wai.unbind('click');
                                            error.none(_.phone_captcha_error);

                                            if(data.r == '01'){

                                                $(_.I_captcha).show();waiShow();

                                            }else if (data.r != '13' && data.r != '01') {
                                                Capwai(wai,time,str);
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

                                                Capwai(wai,time,str);wai.html(data.m);

                                            }
                                        }

                                    }
                                    o.phoneCC = 0;

                                }else if(data.r == '12') {
                                    o.phoneCC = 0;
                                    $(_.I_captcha).show();
                                    error.no(_.phone_captcha_error, data.m);
                                    //$(_.captcha).next().children('img').attr('src', '/user/figurecaptcha?'+ new Date().getTime());
                                }else{
                                    error.no(_.phone_captcha_error, data.m);
                                    o.phone_captcha = false;
                                }
                            },
                            error:function(data) {
                                error.no(_.phone_captcha_error, '本次验证码发送失败');
                                o.phone_captcha = false;
                                o.phoneCC = 0;
                            }
                        });

                        $(_.phone).bind('keyup', function () {
                            clearInterval(timer);
                            if( getCaptcha[0] ) getCaptcha.removeAttr('style').html('发送验证码');
                            getCaptcha.bind('click', function () { IFimt.phone_captcha(phone_captcha, 'v') });
                        });
                    }
                    o.phoneCC = 1;
                }

            }
            if( o.phone_captcha ) o.phone_captcha = true;
        },
        phone_captcha_button:function(){

            var phone_captcha = $(_.phone_captcha).val();
            if( phone_captcha == undefined || phone_captcha == '' ) {
                error.no(_.phone_captcha_error, '请输入验证码');
            }else{
                o.phone_captcha = true;
            }
        },
        //图形验证
        captcha: function(value){

            if( value == undefined || value == ''){
                o.captcha = false;
                error.no(_.captcha_error, '请输入图形验证码');
            }else{
                o.captcha = true;
            }

        },
        //密码验证
        password: function(value){
            this.used(value,_.password_error,'请填写密码',o.password,function() {

                if( value.length < 8 || value.length > 20 ){
                    error.no(_.password_error, txt.password_msg_shorter );
                    o.password = false;
                }else{
                    var result = imt.validate_password(value,1);
                    if( result == 'true' ){
                        error.off(_.password_error, txt.msg_can_reg );
                        o.password = true;
                    }else{
                        error.no(_.password_error, result );
                        o.password = false;
                    }
                }

            });

            if( o.password ) o.password = true;
        },
        //二次密码验证
        conform_password: function(value){

            this.used(value,_.conform_password_error,'请填写确认密码',o.conform_password,function() {

                var passVal = $(_.password).val();

                if( value.length < 8 ){
                    error.no(_.conform_password_error, txt.password_msg_confrim_shorter );
                    o.conform_password = false;
                }else if( value != passVal ){
                    error.no(_.conform_password_error, txt.password_msg_confirm_invalid );
                    o.conform_password = false;
                }else{
                    error.off(_.conform_password_error, txt.msg_can_reg );
                    o.conform_password = true;
                }

            });

            if( o.conform_password ) o.conform_password = true;
        },
        //协议错误信息
        Input_radio: function(value){
            if( !value ) error.no(_.Input_radio_error, '请同意惠人贷网站使用协议');
        }
    };

    $(function(){
        //用户名关闭
        if( $('.reg-ul-text')[0] ) $(_.user).parents('dd').hide();

        //选项卡
        $('.reg-ul li').bind('click', function () {
            var $this = $(this),o = ['.reg-mail','.reg-phone','#loginType','.enterprise'];
            $this.addClass('sow').siblings().removeClass('sow');
            if( $this.index() != 0 ) {
                $(o[0]).show();$(_.user).parents('dd').show();$(o[1]).hide();
                if($(o[2]) != 0 ) {
                    if($(o[3]) != 0) $(o[3]).show();
                    $(o[2]).val('coop');
                    o.coop = 'coop';
                    $('#username-login').val('');
                    $('#password-login').val('');
                    $('.prise-val').removeAttr('style').html('无需填写输入用户名自动显示');

                }
            }else{
                $(o[1]).show();$(o[0]).hide();$(_.user).parents('dd').hide();
                if($(o[2]) != 0 ) {
                    if($(o[3]) != 0) $(o[3]).hide();
                    $(o[2]).val('');
                    o.coop = '';
                    $('#username-login').val('');
                    $('#password-login').val('');
                    $('.prise-val').removeAttr('style').html('无需填写输入用户名自动显示');
                }
            }
        });

        //协议
        var login = $('#autologin');
        label('Input-radio', 'label',function(){
            o.label = true;
            if($(_.D_error)[0]) $(_.D_error).html('').hide(); else error.none(_.Input_radio_error);
            if(login.length != 0) login.val(1);

        },function(){
            o.label = false;
            if(login.length != 0) login.val(0);
            error.no(_.Input_radio_error, '请同意惠人贷网站使用协议');

        });

        //手机验证码 Click 事件
        $(_.getCaptcha).bind('click', function () { IFimt.phone_captcha($(_.phone_captcha).val(),'v');error.none(_.phone_captcha_error) });
        $(_.wai).bind('click',function(){  IFimt.phone_captcha($(_.phone_captcha).val());error.none(_.phone_captcha_error) });
        $(_.captcha).next().children('img').bind('click',function() { $(this).attr('src', '/user/figurecaptcha?'+ new Date().getTime()) });
        $(_.captcha).next().children('a.sua').bind('click',function() { $(this).prev().attr('src','/user/figurecaptcha?'+ new Date().getTime()) });


        //基本判断
        $(_.user).bind('blur', function (){ IFimt.user($(this).val()) });
        //$(_.phone).bind('blur', function (){ IFimt.phone($(this).val()) });
        var phoneTime,org;
        $(_.phone).bind('keyup', function (){
            var $this = $(this);
            clearTimeout(phoneTime);
            phoneTime = setTimeout(function(){ IFimt.phone($this.val()); },1000);
            org=0;
        });
        $(_.phone).bind('blur', function (){
            var $this = $(this);
            if(org!=0) IFimt.phone($this.val());

        });
        $(_.email).bind('blur', function (){ IFimt.email($(this).val()) });
        $(_.phone_captcha).bind('blur', function (){ IFimt.phone_captcha_button() });
        $(_.captcha).bind('blur', function (){ IFimt.captcha($(this).val()) });
        $(_.password).bind('blur', function (){ IFimt.password($(this).val()) });
        $(_.conform_password).bind('blur', function (){ IFimt.conform_password($(this).val()) });

        //错误消除
        $(_.user).bind('focus', function (){ error.none(_.username_error); $(_.EmilSubmit).removeAttr('style');o.submitCC = 0;o.userCC = 0; });
        $(_.phone).bind('focus', function (){ error.none(_.phone_error);error.none(_.phone_captcha_error); $(_.EmilSubmit).removeAttr('style');o.submitCC = 0; });
        $(_.email).bind('focus', function (){ error.none(_.email_error); $(_.EmilSubmit).removeAttr('style');o.submitCC = 0;o.emailCC = 0; });
        $(_.captcha).bind('focus', function (){ error.none(_.captcha_error); $(_.EmilSubmit).removeAttr('style');o.submitCC = 0; });
        $(_.phone_captcha).bind('focus', function (){ error.none(_.phone_captcha_error); $(_.EmilSubmit).removeAttr('style');o.submitCC = 0; });
        $(_.password).bind('focus', function (){ error.none(_.password_error); $(_.EmilSubmit).removeAttr('style');o.submitCC = 0; });
        $(_.conform_password).bind('focus', function (){ error.none(_.conform_password_error); $(_.EmilSubmit).removeAttr('style');o.submitCC = 0; });

        //注册提交
        $(_.EmilSubmit).bind('click', function () {

            var phone = $(_.phone);
            var captcha = $(_.captcha);

            var $user = $(_.user).val(),
                $phone = $(_.phone).val(),
                $phone_captcha = $(_.phone_captcha).val(),
                $captcha = $(_.captcha).val(),
                $password = $(_.password).val(),
                $email = $(_.email).val(),
                $conform_password = $(_.conform_password).val();

            var ajaxSubmit = function (mit) {
                if(o.submitCC == 0){
                    $.ajax({
                        type:'POST',
                        url: '/user/registerajax',
                        data:mit,
                        dataType: 'json',
                        async: 'false',
                        success:function(data){
                            if(data.r == '00'){
                                location.href = '/user/registerResult';
                                o.submitCC = 0;
                            }else{
                                error.no(_.Input_radio_error, data.m);
                                o.submitCC = 1;
                            }
                        },
                        error:function(data) {
                            error.no(_.Input_radio_error, '本次提交失败，请重试');
                        }
                    });
                    $(_.EmilSubmit).css({'background':'#ccc','cursor':'text'});
                }
                o.submitCC = 1;

            };

            if( phone.is(':visible') ){

                //if( o.user && o.phone && o.phone_captcha && o.password && o.conform_password && o.label ){
                if( o.phone && o.phone_captcha && o.password && o.conform_password && o.label ){


                    //ajaxSubmit('username='+$user+'&phone='+$phone+'&captcha='+$phone_captcha+'&password='+$password+'&conform_password='+$conform_password);
                    ajaxSubmit('phone='+$phone+'&captcha='+$phone_captcha+'&password='+$password+'&conform_password='+$conform_password);

                }else{

                    //if(!o.user) IFimt.user($(_.user).val());
                    if(!o.phone) IFimt.phone($(_.phone).val());
                    if(!o.captcha) IFimt.captcha($(_.captcha).val());
                    if(!o.phone_captcha) IFimt.phone_captcha_button();
                    if(!o.password) IFimt.password($(_.password).val());
                    if(!o.conform_password) IFimt.conform_password($(_.conform_password).val());
                    if(!o.label) IFimt.Input_radio(o.label);

                }

            }else{

                if( o.user && o.email && o.password && o.conform_password && o.label ){

                    ajaxSubmit('username='+$user+'&email='+$email+'&imgCaptcha='+captcha.val()+'&password='+$password+'&conform_password='+$conform_password);

                }else{
                    if(!o.user) IFimt.user($(_.user).val());
                    if(!o.email) IFimt.email($(_.email).val());
                    if(!o.captcha) IFimt.captcha($(_.captcha).val());
                    if(!o.password) IFimt.password($(_.password).val());
                    if(!o.conform_password) IFimt.conform_password($(_.conform_password).val());
                    if(!o.label) IFimt.Input_radio(o.label);
                }
            }

            return false;
        });

    });




    window.IFreg_user = _;
    window.IFreg_true = o;
    window.IFreg_imt = IFimt;
    window.IFreg_verify = imt;
    window.IFreg_error = error;
    window.IFreg_txt = txt;

})();



/*======================*\
        首页注册卡片
\*======================*/
(function(){
    var _ = {
        phone_Index_captcha : '#phone_Index_captcha',   // 短信验证
        phone_Index_getCaptcha : '#IndexFa',            // 短信验证按钮
        get_password : '.xs',                           // 显示密码按钮
        Index_captcha : '#Index_captcha',               // 图形验证码
        IndexSubmit : '#IndexSubmit',                   // 提交按钮
        Index_tuImg : '.Index_tu img',                  // 图形验证切换
        Index_tuSua : '.Index_tu .tu_sua',              // 图形验证切换
        IndexCC : 0                                     // 验证去重

    };
    var user = window.IFreg_user,
        o = window.IFreg_true,
        error = window.IFreg_error,
        imt = window.IFreg_imt;

    function CaptchaText(getCaptcha,st,time,str){
        getCaptcha.css({
            'border': '1px solid #ccc',
            'color': '#ccc',
            'line-height': '20px',
            'font-size': '12px',
            'cursor': 'default'
        }).html(st + '<br/>' + time + str);
    }

    var phone = {
        phone_captcha: function (p) {
            var phonel = $(user.phone).val(),      // 手机号码
                getCaptcha = $(_.phone_Index_getCaptcha),  // 短信验证按钮
                time = 60,                        // 重发时间
                st = "验证码已发送",
                str = "秒后重新发送",
                timer;

            if (phonel == undefined || $.trim(phonel) == '') {
                error.no(user.D_error, '请输入手机号');
                o.phone_captcha = false;
            } else {
                if(o.phoneAjax == 0){
                    if(_.IndexCC == 0){
                        error.none(user.D_error);
                        $.ajax({
                            type: 'GET',
                            url: '/user/smscaptcha/' + phonel + '/register/' + $(_.Index_captcha).val(),
                            dataType: 'json',
                            async: 'false',
                            success: function (data) {
                                if (data.r == '00' || data.r == '01' || data.r == '13' || data.r == '14') {

                                    if(data.r == '14'){
                                        error.no(_.phone_captcha_error, data.m);
                                    }else{
                                        getCaptcha.unbind('click');


                                        if(data.r == '01' ){
                                            $(_.Index_captcha).parent().parent().parent().children().each(function(){ $(this).css('margin-bottom','8px') });
                                            $('.Index_captcha').show();
                                            getCaptcha.bind('click', function () { phone.phone_captcha() });
                                        }else if( data.r != '13' && data.r != '01' ){
                                            CaptchaText(getCaptcha,st,time,str);$(user.phone).attr('disabled', 'disabled');
                                            timer = setInterval(function () {
                                                time -= 1;
                                                getCaptcha.html(st + '<br/>' + time + str);
                                                if (time < 0) {
                                                    clearInterval(timer);
                                                    getCaptcha.removeAttr('style').html('重新发送');
                                                    $(user.phone).removeAttr('disabled');
                                                    getCaptcha.bind('click', function () { phone.phone_captcha() });
                                                    $(_.Index_tuImg).attr('src', '/user/figurecaptcha?'+ new Date().getTime());
                                                }
                                            }, 1000);
                                            o.phone_captcha = true;
                                        }else{
                                            CaptchaText(getCaptcha,st,time,str);getCaptcha.html(data.m);
                                        }

                                    }
                                    _.IndexCC = 0;
                                }else if(data.r == '12') {
                                    error.no(user.D_error, data.m);
                                    $(_.Index_captcha).parent().parent().parent().children().each(function(){ $(this).css('margin-bottom','8px') });
                                    $('.Index_captcha').show();
                                    _.IndexCC = 0;
                                }else{
                                    error.no(user.D_error, data.m);
                                    o.phone_captcha = false;
                                }
                            },
                            error: function (data) {
                                error.no(user.D_error, '本次验证码发送失败');
                                o.phone_captcha = false;
                                _.IndexCC = 0;
                            }
                        });

                        $(user.phone).bind('keyup', function () {
                            clearInterval(timer);
                            if( getCaptcha[0] ) getCaptcha.removeAttr('style').html('发送验证码');
                            getCaptcha.bind('click', function () { phone.phone_captcha() });
                        });
                    }
                    _.IndexCC = 1;
                }
            }

            if (o.phone_captcha) o.phone_captcha = true;
        },
        phone_captcha_button:function(){

            var phone_captcha = $(_.phone_Index_captcha).val();
            if( phone_captcha == undefined || phone_captcha == '' ) {
                error.no(user.D_error, '请输入验证码');
            }else{
                o.phone_captcha = true;
            }
        }

    };

    $(function(){
        //基本操作
        $(_.phone_Index_getCaptcha).bind('click', function () { phone.phone_captcha(); $(_.IndexSubmit).removeAttr('style');o.submitCC = 0;});
        $(_.phone_Index_captcha).bind('blur', function (){ phone.phone_captcha_button(); $(_.IndexSubmit).removeAttr('style');o.submitCC = 0;});
        $(_.phone_Index_captcha).bind('focus', function () { $(_.IndexSubmit).removeAttr('style');o.submitCC = 0; });
        if( $(_.get_password)[0] ) $(user.password).togglePassword({ el: _.get_password });

        $('.phone').bind('click', function () { $(_.IndexSubmit).removeAttr('style');o.submitCC = 0; });
        $('.pass').bind('click', function () { $(_.IndexSubmit).removeAttr('style');o.submitCC = 0; });
        $(_.Index_tuImg).bind('click',function() { $(_.Index_tuImg).attr('src', '/user/figurecaptcha?'+ new Date().getTime()); });
        $(_.Index_tuSua).bind('click',function() { $(_.Index_tuImg).attr('src','/user/figurecaptcha?'+ new Date().getTime()) });


        //提交操作
        $(_.IndexSubmit).bind('click', function () {
            var $phone = $(user.phone).val(),
                $phone_captcha = $(_.phone_Index_captcha).val(),
                $password = $(user.password).val();
            if(o.phone && o.phone_captcha && o.password && o.label ){

                    if(o.submitCC == 0){
                        $.ajax({
                            type:'POST',
                            url: '/user/registerajax',
                            data:'phone='+ $phone +'&captcha='+ $phone_captcha +'&password='+ $password,
                            dataType: 'json',
                            async: 'false',
                            success:function(data){
                                if(data.r == '00'){
                                    location.href = '/user/registerResult';
                                    o.submitCC = 0;
                                }else{
                                    error.no(_.Input_radio_error, data.m);
                                    o.submitCC = 1;
                                }
                            },
                            error:function(data) {
                                error.no(_.Input_radio_error, '本次提交失败，请重试');
                            }
                        });
                        $(_.IndexSubmit).css({'background':'#ccc','cursor':'text'});
                    }
                    o.submitCC = 1;

            }else{

                if(!o.phone_captcha) phone.phone_captcha_button();
                if(!o.label) imt.Input_radio(o.label);
                if(!o.password) imt.password($(user.password).val());
                if(!o.phone) imt.phone($(user.phone).val());
            }
            return false;
        });

    });

})();



/*======================*\
        首页登录卡片
\*======================*/
(function(){
    var _ = {
        parent : '.prise span',
        val : '.prise-val',
        click : 'em.prise-click',
        text : '.prise-text',
        id : '#coop_id',
        idTxt : '#coop_text',
        user:'#username-login',
        error:'.arr_error',
        captcha:'.captcha',
        idcaptcha:'#captcha',
        loginType:'#loginType',
        bannerSubmit:'.bannerSubmit',
        ajaxTime:null
    };

    var o = {
        coop : ''
    };

    var userll = $('#username-login'),
        pass = $('#password-login'),
        prise = $(_.id),
        idTxt = $(_.idTxt);

    function enterprise (){
        var enterprise = $('.enterprise');
        if( enterprise.is(':visible')){
            return o.coop = 'coop';
        }else{
            return o.coop = '';
        }
    }

    $(_.user).bind('focus', function () {
        $(_.bannerSubmit).removeAttr('style');submitLogin = 0;
        enterprise();
        $(_.error).html('');
        $(_.val).removeAttr('style').html('');
    });
    $(_.user).bind('blur',function() {
        if(o.coop == 'coop'){
            var value = $(_.user).val();
            if( value != undefined || value != ''){
                clearTimeout(_.ajaxTime);
                _.ajaxTime = setTimeout(function(){
                    $.ajax({
                        type:'POST',
                        url:'/user/cooprlist',
                        data:'username='+value,
                        dataType:'json',
                        async:'false',
                        complete:function() {
                        },
                        success:function(data){
                            if( data.r == '00' ){
                                var txt='';
                                for(var i = 0; i < data.d.length ; i++){
                                    txt += '<li BCH_CDE="'+data.d[i].BCH_CDE+'">'+data.d[i].COOPR_NAME+'</li>';
                                    if(i==0){
                                        $(_.val).css('color','#000').html(txt);
                                        $(_.id).val(data.d[i].BCH_CDE);
                                        $(_.idTxt).val(data.d[i].COOPR_NAME);
                                    }
                                }
                                $(_.text).html(txt);
                                $(_.error).html('');
                            }else{

                                $(_.error).html(data.m);
                            }

                        },
                        error:function(){

                        }
                    });
                },500);
                $(_.val).html('');
                $(_.text).html('');
            }
        }
        $(_.bannerSubmit).removeAttr('style');submitLogin = 0;
    });
    $(_.idcaptcha).bind('focus', function () { $(_.bannerSubmit).removeAttr('style');submitLogin = 0;$(_.error).html(''); });
    pass.bind('focus', function () { $(_.bannerSubmit).removeAttr('style');submitLogin = 0; $(_.error).html(''); });

    $('.tu').children('img').bind('click',function() { $(this).attr('src', '/user/figurecaptcha?'+ new Date().getTime()) });
    $('.sua').bind('click',function() { $(this).prev().attr('src','/user/figurecaptcha?'+ new Date().getTime()) });


    var autologin = 0;

    label('Input-login', 'label', function () {
        autologin = 1;
        $(_.bannerSubmit).removeAttr('style');submitLogin = 0
    }, function () {
        autologin = 0;
        $(_.bannerSubmit).removeAttr('style');submitLogin = 0
    });



    var submitLogin = 0;
    $(_.bannerSubmit).bind('click', function () {

        enterprise();
        var SubmitAjax = function (mit) {
            if(submitLogin == 0) {
                $.ajax({
                    type:'POST',
                    url:'/user/loginajaxex',
                    //url:'3.json',
                    data:mit,
                    dataType:'json',
                    async:'false',
                    success:function(data) {
                        if(data.r == '00'){
                            location.href = String(data.url);
                        }else if(data.captcha == '1') {
                            $('.captcha').show();
                            $(_.error).html(data.m);
                            //$('.sua').prev().attr('src','/user/figurecaptcha?'+ new Date().getTime())
                        }else{
                            $(_.error).html(data.m);
                            $(_.bannerSubmit).css({'background': '#ccc', 'cursor':'text'});
                            submitLogin = 1;
                        }
                    },
                    error:function(data) {
                        $(_.error).html('对不起，登录失败，请稍候重试');
                    }
                });
            }
            submitLogin = 1;
        };

        SubmitAjax('username='+ userll.val() +'&password='+ pass.val() +'&captcha='+$(_.idcaptcha).val()+'&coop_id='+ prise.val() +'&coop_name='+ idTxt.val() +'&autologin='+ autologin +'&logintype='+ o.coop);


        return false;

    });

    $(_.parent).bind('click', function () {
        $(_.bannerSubmit).removeAttr('style');submitLogin = 0;
        if( $(_.text).is(':visible') ){
            $(_.text).slideUp();
        }else{
            $(_.text).slideDown();
        }
    });
    $(_.text).on('click','li',function() {
        var val = $(this).attr('BCH_CDE'),
            txt = $(this).text();
        $(_.val).css('color','#000').html(txt);
        $(_.id).val(val);
        $(_.text).slideUp();
    });

})();



/*======================*\
        密码显示隐藏
\*======================*/
(function ( $ ) {
    $.fn.togglePassword = function( options ) {
        var s = $.extend( $.fn.togglePassword.defaults, options ),
            input = $( this );

        $( s.el ).bind( s.ev, function() {
            if("password" == $( input ).attr( "type" )){
                $( input ).attr( "type", "text" );
                $( this ).addClass('cx');
            }else{
                $( input ).attr( "type", "password" );
                $( this ).removeClass('cx');
            }
        });
    };

    $.fn.togglePassword.defaults = {
        ev: "click"
    };
}( jQuery ));



/*======================*\
 找回密码
 \*======================*/
(function(){
    // 继承
    var o = window.IFreg_true, imt = window.IFreg_verify, error  = window.IFreg_error, IFimt = window.IFreg_imt, _ = window.IFreg_user,txt=window.IFreg_txt,
        l = {
            phone : '#look-phone',              // 手机号
            email : '#look-email',              // 邮箱
            fa_phone : '#look-fa-phone',               // 发送手机验证码按钮
            fa_email : '#look-fa-email',               // 发送邮箱验证码按钮
            look_phone_captcha : '#look_phone_captcha',     // 短信验证码
            look_email_captcha : '#look_email_captcha',     // 邮箱验证码
            phone_captcha : '#look-captcha',    // 图形验证码
            wai : '.look-wai a',                 // 语音验证码按钮
            error : '.look-error',                 // 错误提示代码
            look_password : '#look_password',                   //密码
            look_conform_password : '#look_conform_password'    //验证密码
        },
        oo = {
            phoneAjax : 0,
            emailAjax : 0,
            ulAjax : 0
        };

    var look = {
        // 手机号验证
        phone : function(value) {

            var reg = imt.phone;
            if( value == '' || value == undefined ){
                error.no(_.phone_error, '请输入您的手机号');
                o.phone = false;
                oo.phoneAjax = 1;
            }
            else if( !reg.test(value) ){
                error.no(_.phone_error, '您的手机号不正确');
                o.phone = false;
                oo.phoneAjax = 1;
            }else{
                error.off(_.phone_error, '');
                o.phone = true;
                oo.phoneAjax = 0;
            }

            if( o.phone ) o.phone = true;
        },
        //邮箱验证
        email: function(value){

            var pattern = imt.email;
            if( value == '' ){
                error.no(_.email_error, '邮箱不能为空');
                o.email = false;
                oo.emailAjax = 1;
            }else if( !pattern.test(value) ){
                error.no(_.email_error, '邮箱格式错误');
                o.email = false;
                oo.emailAjax = 1;
            }else{

                error.off(_.email_error, '');
                o.email = true;
                oo.emailAjax = 0;
            }

            if( o.email ) o.email = true;
        },
        //图形验证
        captcha: function(value){

            if( value == undefined || value == ''){
                o.captcha = false;
                error.no(_.captcha_error, '请输入图形验证码');
            }else{
                error.off(_.captcha_error, '');
                o.captcha = true;
            }

        },
        //短信验证
        phone_captcha: function(value,id,Ajax,url) {

            var phone = $(value).val(),      // 手机/邮箱号码
                getCaptcha = $(id),       // 发送手机/邮箱验证码按钮
                phone_captcha = $(l.phone_captcha).val(),  // 图形验证码
                wai = $(l.wai),                // 发送语音验证码
                time = 60,                     // 重发时间
                st = "验证码已发送",
                str= "秒后重新发送",
                timer,_url;

            function CaptchaTed(getCaptcha,st,time,str){
                getCaptcha.css({
                    'border': '1px solid #ccc',
                    'color': '#ccc',
                    'line-height': '18px',
                    'font-size': '12px',
                    'cursor': 'default'
                }).html(st + '<br/>' + time + str)
            }

            function Capwai(wai,time,str){
                wai.css({
                    'color': '#ccc',
                    'cursor': 'default'
                }).html('语音验证码 (' + time + str + ')');
            }


            if( phone == undefined || $.trim(phone) == '' ){
                if( value == l.email ) error.no(_.email_error,'请输入邮箱号码'); else error.no(_.phone_error,'请输入手机号');
                o.phone_captcha = false;
            }else{
                if( Ajax == 0 ){
                    if( o.phoneCC == 0 ){
                        if( url == 'v' ){
                            _url = '/user/smscaptcha/' + phone + '/findpwd/' + phone_captcha; // 短信验证
                        }
                        else if( url == 't' ) {
                            _url = '/user/smscaptcha/' + phone + '/findpwd/' + phone_captcha; // 邮箱验证
                        }else{
                            _url = '/user/voicecaptcha/' + phone + '/findpwd/' + phone_captcha; // 语音验证
                        }

                        $.ajax({
                            type:'GET',
                            url:_url,
                            dataType:'json',
                            async:'false',
                            success:function(data){
                                if(data.r == '00' || data.r == '01' || data.r == '13' || data.r == '14') {

                                    function waiShow() {
                                        $(value).removeAttr('disabled');
                                        wai.removeAttr('style').html('语音验证码').bind('click', function () {
                                            look.phone_captcha(value,id,Ajax)
                                        });
                                    }

                                    if (url == 'v') {

                                        if( data.r == '14'){

                                            error.no(_.phone_captcha_error, data.m);

                                        }else{

                                            error.none(_.phone_captcha_error);
                                            wai.css({'color': '#ccc', 'cursor': 'default'}).unbind('click');
                                            getCaptcha.unbind('click');

                                            if( data.r == '01'){

                                                $(_.I_captcha).show();
                                                getCaptcha.bind('click', function () { look.phone_captcha(value,id,Ajax,'v') });

                                            }else if (data.r != '13' && data.r != '01') {

                                                CaptchaTed(getCaptcha,st,time,str);
                                                $(value).attr('disabled', 'disabled');
                                                var $this = $('#lookPass-input').val();
                                                timer = setInterval(function () {

                                                    var ulAjax = oo.ulAjax;

                                                        if(Number($this) == ulAjax ){
                                                            time -= 1;
                                                            getCaptcha.html(st + '<br/>' + time + str);
                                                            if (time < 0) {
                                                                clearInterval(timer);
                                                                getCaptcha.removeAttr('style').html('重新发送');
                                                                $(value).removeAttr('disabled');
                                                                getCaptcha.bind('click', function () { look.phone_captcha(value,id,Ajax,'v') });
                                                                waiShow();
                                                                $('.tu img').attr('src', '/user/figurecaptcha?'+ new Date().getTime());
                                                            }
                                                        }
                                                        //else{
                                                        //    clearInterval(timer);
                                                        //    getCaptcha.removeAttr('style').html('发送验证码');
                                                        //    $(value).removeAttr('disabled');
                                                        //    getCaptcha.bind('click', function () { look.phone_captcha(value,id,Ajax,'v') });
                                                        //    waiShow();
                                                        //    $('.tu img').next().children('img').attr('src', '/user/figurecaptcha?'+ new Date().getTime());
                                                        //}

                                                }, 1000);

                                            }else {
                                                CaptchaTed(getCaptcha,st,time,str);
                                                getCaptcha.html(data.m);
                                            }
                                        }

                                    } else {

                                        getCaptcha.hide();

                                        if( data.r == '14'){

                                            error.no(_.phone_captcha_error, data.m);

                                        }else{
                                            wai.unbind('click');
                                            error.none(_.phone_captcha_error);

                                            if(data.r == '01'){

                                                $(_.I_captcha).show();waiShow();

                                            }else if (data.r != '13' && data.r != '01') {
                                                Capwai(wai,time,str);
                                                $(value).attr('disabled', 'disabled');
                                                var $th = $('#lookPass-input').val();
                                                timer = setInterval(function () {

                                                    var ulAjax = oo.ulAjax;

                                                    if(Number($th) == ulAjax ){
                                                        time -= 1;
                                                        wai.html('语音验证码 (' + time + str + ')');
                                                        if (time < 0) {
                                                            clearInterval(timer);
                                                            waiShow();
                                                            getCaptcha.show();
                                                        }
                                                    }else{
                                                        clearInterval(timer);
                                                        waiShow();
                                                        getCaptcha.show();
                                                    }

                                                }, 1000);

                                            } else {

                                                Capwai(wai,time,str);wai.html(data.m);

                                            }
                                        }

                                    }
                                    o.phoneCC = 0;

                                }else if(data.r == '12') {
                                    o.phoneCC = 0;
                                    $(_.I_captcha).show();
                                    error.no(_.phone_captcha_error, data.m);
                                    //$(_.captcha).next().children('img').attr('src', '/user/figurecaptcha?'+ new Date().getTime());
                                }else{
                                    error.no(_.phone_captcha_error, data.m);
                                    o.phone_captcha = false;
                                }
                            },
                            error:function(data) {
                                error.no(_.phone_captcha_error, '本次验证码发送失败');
                                o.phone_captcha = false;
                                o.phoneCC = 0;
                            }
                        });

                        $(value).bind('keyup', function () {
                            clearInterval(timer);
                            if( getCaptcha[0] ) getCaptcha.removeAttr('style').html('发送验证码');
                            getCaptcha.bind('click', function () { look.phone_captcha(value,id,Ajax,'v') });
                        });
                    }
                    o.phoneCC = 1;
                }

            }
            if( o.phone_captcha ) o.phone_captcha = true;
        },
        phone_captcha_button:function(value){

            if( value == undefined || value == '' ) {
                error.no(_.phone_captcha_error, '请输入验证码');
            }else{
                o.phone_captcha = true;
            }
        },
        //二次密码验证
        conform_password:function(value) {
            if($(l.look_conform_password).val() == '' || $(l.look_conform_password).val() == undefined ){
                error.no(_.conform_password_error, '请填写确认密码' );
                o.conform_password = false;
            }else{
                var passVal = $(l.look_password).val();

                if( value.length < 6 ){
                    error.no(_.conform_password_error, txt.password_msg_confrim_shorter );
                    o.conform_password = false;
                }else if( value != passVal ){
                    error.no(_.conform_password_error, txt.password_msg_confirm_invalid );
                    o.conform_password = false;
                }else{
                    error.off(_.conform_password_error, txt.msg_can_reg );
                    o.conform_password = true;
                }
            }

            if( o.conform_password ) o.conform_password = true;
        }
    };

    //验证
    $(l.phone).bind('blur', function () { look.phone($(this).val()); });
    $(l.email).bind('blur', function () { look.email($(this).val()); });
    $(l.phone_captcha).bind('blur', function () { look.captcha($(this).val()); });
    $(l.look_phone_captcha).bind('blur', function () { look.phone_captcha_button($(this).val()); });
    $(l.look_email_captcha).bind('blur', function () { look.phone_captcha_button($(this).val()); });
    $(l.look_password).bind('blur', function () { IFimt.password($(this).val());  });
    $(l.look_conform_password).bind('blur', function () { look.conform_password($(this).val());  });
    //删除
    $(l.phone).bind('focus', function () { error.none(_.phone_error); removeButton();});
    $(l.email).bind('focus', function () { error.none(_.email_error); removeButton(); });
    $(l.look_phone_captcha).bind('focus', function () { error.none(_.phone_captcha_error); removeButton(); });
    $(l.look_email_captcha).bind('focus', function () { error.none(_.phone_captcha_error); removeButton(); });
    $(l.fa_phone).bind('focus', function () { error.none(_.captcha_error); removeButton(); });
    $(l.fa_email).bind('focus', function () { error.none(_.captcha_error); removeButton(); });
    $(l.phone_captcha).bind('focus', function () { error.none(_.captcha_error);error.none(_.phone_captcha_error); removeButton(); });
    $(l.look_password).bind('focus', function () { error.none(_.password_error); removeButton(); });
    $(l.look_conform_password).bind('focus', function () { error.none(_.conform_password_error); removeButton(); });
    //点击
    $(l.fa_phone).bind('click', function () { look.phone_captcha(l.phone,l.fa_phone,oo.phoneAjax,'v') });
    $(l.wai).bind('click', function () { look.phone_captcha(l.phone,l.fa_phone,oo.phoneAjax) });

    function Button($this,id,value) {
        var ass = '.lookPass-', target = $this == 0 ? 'phone' : 'mail';
        id.text('确认');$(ass + 'captcha').hide();
        $(ass + target).removeClass('sow').hide();$(ass + 'password').addClass('sow');
        $('.lookPass-fill li').eq(1).addClass('sow');
        id.removeAttr('disabled').removeAttr('style');
        $('#lookPass-input').val(value);

        if ( $this == 1) {
            $('.lookPass-fill li').eq(1).removeClass('sow');
            $('.lookPass-Button').hide();
            $('.look-error').css('padding-bottom', '50px');
        }

    }

    function removeButton(){
        $('#lookPass-Button').removeAttr('style').removeAttr('disabled');
        $('#lookPass-Button-one').removeAttr('style').removeAttr('disabled');
        error.no(l.error,'');
    }

    // 第一栏
    var OneAjax = 0,ButtonOne = 0;
    $('#lookPass-Button').on('click', function () {
        var $this = $(this),
            $look = $('#lookPass-input').val(),
            $phone = $(l.phone).val(),
            $email = $(l.email).val(),
            $look_phone_captcha = $(l.look_phone_captcha).val(),
            $phone_captcha = $(l.phone_captcha).val();

        $(this).attr('disabled', 'disabled').css('background', '#ccc');
        function Oneajax(url){

            $.ajax({
                type : 'POST',
                url:'/user/findpwd/ajax',
                data:"data="+cmdEncrypt(url),
                dataType:'JSON',
                async:'false',
                success:function(data) {
                    if( data.r == '00'){
                        $(l.error).css('color', '#4cc8c8');
                        error.no(l.error, data.m+',提交中，请稍后...');
                        Button($look,$this, 2);
                        $(l.error).html('');
                        OneAjax = 0;
                    }else{
                        error.no(l.error, data.m);
                        OneAjax = 1;
                    }
                },
                error:function(data) {
                    error.no(l.error, '本次提交失败，请重试');
                }
            });

            OneAjax = 1;
        }

        if( $look == 0 ){

            if ( o.phone && o.captcha && o.phone_captcha ){
                Oneajax('way='+ 0 +'&device='+ 0 +'&mobile='+ $phone +'&m_captcha='+ $look_phone_captcha);
            }else{
                if(!o.phone) look.phone($(l.phone).val());
                if(!o.captcha) look.captcha($(l.captcha).val());
                if(!o.phone_captcha) look.phone_captcha_button($(l.look_phone_captcha).val());
            }

        }
        else if( $look == 1 ){

            if (  o.email && o.captcha ){
                Oneajax('way='+ 0 +'&device='+ 1 +'&mail='+ $email +'&i_captcha=' + $phone_captcha);
            }else{
                if(!o.email) look.email($(l.email).val());
                if(!o.captcha) look.captcha($(l.captcha).val());
            }

        }
        else if( $look == 2 ) {

            if ( o.password && o.conform_password ) {
                if(ButtonOne == 0) {
                    $.ajax({
                        type:'POST',
                        url:'/user/findpwd/ajax',
                        data:"data="+cmdEncrypt('way=1&passwd='+ $(l.look_password).val() +'&passwd_again='+ $(l.look_conform_password).val()),
                        dataType:'JSON',
                        async:'false',
                        success:function(data) {

                            if(data.r == '00'){

                                $('#' + textOnclick.txt).html('密码重置成功，请使用新密码登录。');
                                textOnclick.obj(function(){
                                    $('#' + textOnclick.user).unbind('click');
                                    $('#' + textOnclick.off).unbind('click');
                                    $('#' + textOnclick.button).attr('href','/');
                                });
                                $('#'+textOnclick.user).show();
                                $this.removeAttr('style');
                                ButtonOne = 0;

                            }else{
                                error.no(l.error, data.m);
                                ButtonOne = 0;
                            }

                        },
                        error:function(data) {
                            error.no(l.error, '本次提交失败，请重试');
                            ButtonOne = 0;
                        }
                    });
                }
                ButtonOne = 1;
            }else{
                if( !o.password ) IFimt.password($(l.look_password).val());
                if( !o.conform_password ) look.conform_password($(l.look_conform_password).val());
            }

        }

        return false;
    });

    // 重复发送邮箱
    var emailRecur = 0;
    $('#emailRecur').bind('click',function(){
        var $this = $(this);
        $this.css({'color':'#333333','cursor':'default'});

        if(emailRecur == 0) {
            $.ajax({
                type:'POST',
                url:'/user/findpwd/ajax',
                data:'way=0&device=3',
                dataType:'JSON',
                async:'false',
                success:function(data){
                    if(data.r == '00'){
                        $('#' + textOnclick.txt).html('邮件发送成功，请在30分钟内收信并重置密码。');
                        $('#'+textOnclick.user).show();
                        $this.removeAttr('style');
                        emailRecur = 0;
                    }else{
                        $('#' + textOnclick.txt).html(data.m);
                        $('#'+textOnclick.user).show();
                        $this.removeAttr('style');
                        emailRecur = 0;
                    }
                },
                error:function(data) {
                    $('#' + textOnclick.txt).html(data.m);
                    $('#'+textOnclick.user).show();
                    $this.removeAttr('style');
                    emailRecur = 0;
                }
            });
        }

        emailRecur = 1;
    });
//数据加密
    function cmdEncrypt(that){
        var rsa = new RSAKey();
        var modulus = "D2B2A26451479928A48DD65E4188D3DC034C29388A2E212690A5148B7240E63E5D82A3BEE7F43CE2338B130BA81BC6834A3B875FDB54C7E0705B9FB843CD72034722170542DA6BCC2BA6C6142F141A33D4F9A21608F0579D1D9C866B5F8F5B4D002EB4EB57C5BF22B9FE45FC42B8A2DC1DFDA39642D4F90A5317732B2D60AF41";
        var exponent = "10001";
        rsa.setPublic(modulus, exponent);
        var res = rsa.encrypt(that);
        return res;
    };
    //弹窗自显示代码
    if( $('#isvalid').val() == 0 ){
        $('.lookPass-password').removeClass('sow');
        $('.lookPass-passtext').addClass('sow');
        $('#lookPass-Button').hide();
    }
    if($('#emailRecur')[0]) textOnclick.text();

})();
