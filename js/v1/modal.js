/*
*
* Income calculator
* Type: effect display code
* 理财计算器
*
* */
(function(){

    // 开   关：data-modal="off/no"
    // 按钮链接：data-modal-url=" ... "

    var cor = {
        name : 'data-modal',
        on: 'off',
        off: 'modal-off',
        win: 'modal',
        Hurl: 'data-modal-url'
    };

    var calctor = function () {};
    // 功能模块
    calctor.prototype.HasName = function () {
        var _length = $('['+cor.name+'="'+cor.on+'"]');
        var listlength = $('['+cor.name+'="list"]');
        if( _length.length > 0 || listlength.length > 0 ) return true; else return false;
    };
    // 内容模块
    calctor.prototype.modal = function () {
        var modal_text = '<div id="'+cor.win+'" style="display:none;">\n'+
            '<div class="PopupBgTint"></div>\n'+
            '<div class="modal-dialog">\n'+
            '<div class="modal-content">\n'+
            '<div class="modal-header">收益计算器<em id="'+cor.off+'"></em></div>\n'+
            '<div class="modal-body">\n'+
            '<div class="modal-text">\n'+
            '<b>加入金额</b>'+
            '<input type="text" id="modal-inp"  style="outline:none;" maxlength="8" placeholder="请输入投资拟金额"/>\n'+
            '<em>元</em>\n'+
            '</div>\n'+
            '<div class="modal-jg">\n'+
            '预期收益<strong id="modal-income">0.00</strong>元</div>\n'+
            '<div class="modal-ll">年化利率<strong id="modal-apr">20%</strong></div>\n'+
            '<div class="modal-qx">借款期限<strong id="modal-limit">1个月</strong></div>\n'+
            '<a class="modal-button" href="javascript:;">开始理财</a></div></div></div></div>\n';
        return modal_text;
    };

    //文本框初始颜色
    function inputText(id){
        var name = $('.' + id);
        var value = name.attr('value');
        if( name.length > 0) {
            name.blur(function() {
                $(this).css('color','#E8E8E8');
            });
            name.focus(function() {
                $(this).css('color','#000');
            });
        }
    }
    //关闭操作
    var off = {
        offClick : function(){
            var id = $('#' + cor.off);
            var $window = $('#' + cor.win);
            var off = $window.children().first();
            id.click(function () {
                $window.hide();
            });
            off.click(function () {
                $window.hide();
            });
        }
    };
    //核心控制
    var cator = new calctor();

    var IFnum = {
        // 输入基本规则
        test: /^[0-9]+$/,
        getInput: function (value) {
            if (value == '') {
                return 0;
            }

            if (value.length > 8) {
                return value.substr(0, 8);
            }

            var reNum = this.test;
            if (!reNum.test(value)) {
                return 0;
            } else if (value.length >= 2) {

                if (value.slice(0, 1) == 0) {
                    return value.substr(1);
                } else {
                    return value;
                }

            } else {
                return value;
            }
        }
    };
    function Box(){
        if(cator.HasName()) {
            $('body').append(cator.modal());

            function boxClick(ID,has) {
                $(ID).bind('click',function(e){
                    var _input = $('#modal-inp');
                    var income = $('#modal-income');
                    var Htmlurl = $(this).attr(cor.Hurl);
                    var lv = $(this).attr('data-count-apr'); //利率
                    var qx = $(this).attr('data-count-limit'); //月份
                    var Exp = Number($(this).attr('data-count_income')); //每百元收益
                    var amount = $(this).data('amount') == 'undefined' ? 0 : Number($(this).data('amount')); //变换金额
                    var rates = $(this).data('rates') == 'undefined' ? 0 : Number($(this).data('rates'));   //变换利率
                    var o = 0;


                    var modal_text = $('.modal-text');
                    if( has == 'list' ) {
                        modal_text.children('b').html('投资份数');
                        modal_text.children('em').html('份');
                        _input.attr('placeholder','请输入投资拟份数')
                    }
                    else{
                        modal_text.children('b').html('加入金额');
                        modal_text.children('em').html('元');
                        _input.attr('placeholder','请输入投资拟金额')
                    }

                    _input.val('');
                    income.html('0.00');
                    _input.on('keyup', function () {
                        var val = Number($(this).val());
                        val = IFnum.getInput(val);
                        o = val;
                        $(this).val(val);
                        
                        //每 1% 百元收益
                        var lvs = ( ( Number(Exp) / parseInt(lv) ) * ( parseInt(lv) + rates) ).toFixed(2);

                        if( Number(val) >= amount){
                            if( has == 'list' ){
                                income.html( Number( ( val ) * Number( Exp == null || Exp == 'undefined' ? 0 : lvs ) ).toFixed(2) );
                            } else{
                                income.html( Number( ( val / 100 ) * Number( Exp == null || Exp == 'undefined' ? 0 : lvs ) ).toFixed(2) );
                            }
                            $('#modal-apr').html( lv == null || lv == 'undefined' ? '无参数' : Number(parseInt(lv)+parseInt(rates)).toFixed(2) + '%' );
                        }else{
                            if( has == 'list' ){
                                income.html( Number( ( val ) * Number( Exp == null || Exp == 'undefined' ? 0 : Exp ) ).toFixed(2) );
                            } else{
                                income.html( Number( ( val / 100 ) * Number( Exp == null || Exp == 'undefined' ? 0 : Exp ) ).toFixed(2) );
                            }
                            $('#modal-apr').html( lv == null || lv == 'undefined' ? '无参数' : Number(lv).toFixed(2) + '%' );
                        }

                    });
                    $('#modal-apr').html( lv == null || lv == 'undefined' ? '无参数' : Number(lv).toFixed(2) + '%' );
                    $('#modal-limit').html( qx == null || qx == 'undefined' ? '无参数' : qx );

                    if( Htmlurl == '' ) {
                        $('.modal-button').click(function () {
                            $('#' + cor.win).hide();
                        });
                    }else{
                        $('.modal-button').attr('href',Htmlurl + '?input_meny="'+ o +'"');
                    }
                    $('#' + cor.win).show();
                    inputText('modal-inputJs');
                    off.offClick();

                    stopDefault(e);
                });
            }

            boxClick('['+cor.name+'="'+cor.on+'"]');
            boxClick('['+cor.name+'="list"]','list');



        }
    }
    $(document).ready(function(){
        Box();
    });
})();





/*
 *
 * Confirm payment
 * Type: effect display code
 * 确认支付
 *
 * */
(function(){

    // 开   关：data-pay="off/no"
    // 按钮链接：data-pay-url=" ... "
    function cmdEncrypt(str,that){
        var rsa = new RSAKey();
        var modulus = "D2B2A26451479928A48DD65E4188D3DC034C29388A2E212690A5148B7240E63E5D82A3BEE7F43CE2338B130BA81BC6834A3B875FDB54C7E0705B9FB843CD72034722170542DA6BCC2BA6C6142F141A33D4F9A21608F0579D1D9C866B5F8F5B4D002EB4EB57C5BF22B9FE45FC42B8A2DC1DFDA39642D4F90A5317732B2D60AF41";
        var exponent = "10001";
        rsa.setPublic(modulus, exponent);
        var res = rsa.encrypt(str);
        that.val(res)
    };
    var pay = {
        name : 'data-pay',
        on: 'off',
        off: 'payment-off',
        win: 'payment',
        Hurl: 'data-pay-url',
        value: 'data-pay-value',
        ID: 'Confirm-pay'
    };

    var o_url = $('#regsterId').val();
    var radio = 0,sub = 0;


    // 功能模块
    var payment = {
        HasName : function () {
            var _length = $('['+pay.name+'="'+pay.on+'"]');
            if( _length.length > 0 ) return true; else return false;
        },
        //内容模块（债权转让详情）
        modal : function () {
            var modal_text = '<!--债权转让确认支付-->\n' +
                '<form action="" method="post" id="pform">\n'+
                '<input id="transferNum" name="transferNum" style="display:none;" value="0"/>'+
                '<div id="' + pay.win + '" style="display:none;">\n' +
                '<div class="PopupBgTint"></div>\n' +
                '<div class="payment-dialog">\n' +
                '<div class="payment-content">\n' +
                '<div class="payment-header">确认支付<em id="' + pay.off + '"></em></div>\n' +
                '<div class="payment-body" style="height: 280px;">\n' +
                '<div class="payment-jg" style="height: 86px;font-size: 18px;margin-top: 35px;">\n' +
                '<span>项目总额：<strong id="pay-Total">0.00</strong>元</span>\n' +
                '<span class="payment-left">预期收益：<strong id="pay-Exp">0.00</strong>元</span>\n' +
                '<span class="payment-left">折让收益：<strong id="pay-Income">0.00</strong>元</span>\n' +
                '</div>\n' +
                '<div class="payment-text">\n' +
                '支付密码：' +
                '<input id="paypassword" type="password" class="payment-inputJs" style="outline:none;" maxlength="16" placeholder="请输入6-16位纯数字支付密码"/>\n' +
                '<input id="paypasswords" type="hidden" name="paypassword" value />\n' +
                '</div>\n' +
                '<span id="payText"></span>' +
                '<input id="payment-button" class="payment-button" type="submit" value="确定" />\n' +
                '<div class="payment-video">\n' +
                '<div id="calc-input" class="calc-input">\n' +
                '<input type="radio" id="payoba" name="sport" value="债权转让及受让协议">\n' +
                '<label name="oba" for="oba"></label>\n' +
                '我同意相关<a target="_blank" href="/loanCredit/agreement/'+ o_url +'">《债权转让及受让协议》</a></div></div></div></div></div></div></form>';
            return modal_text;
        },
        modalR : function (obj) {
            var modal_text = '<!--盈计划详情-->\n' +
                '<form action="" method="post" id="meyForm">\n'+ obj +
                '<div id="' + pay.win + '" class="appointWin" style="display:none;">\n' +
                '<div class="PopupBgTint"></div>\n' +
                '<div class="payment-dialog" style="height:400px;">\n' +
                '<div class="payment-content"  style="height:300px;">\n' +
                '<div class="payment-header">确认支付<em id="' + pay.off + '"></em></div>\n' +
                '<div class="payment-body" style="height:300px;">\n' +
                '<div class="payment-jg" style="margin-top:30px;height:110px;">\n' +
                '<span style="font-size:16px;color:#999999;">购买金额：<strong id="mey-Total">0.00</strong><b style="color:#333333;">元</b></span>\n' +
                '<span style="font-size:16px;color:#999999;">预期收益：<strong id="mey-Exp">0.00</strong><b style="color:#333333;">元</b></span>\n' +
                '<span style="font-size:16px;color:#999999;">到期处理：<strong id="mey-Cl">0.00</strong></span>\n' +
                '</div>\n' +
                '<div class="payment-text">\n' +
                '支付密码：' +
                '<input id="paypassword" type="password" name="paypassword" class="payment-inputJs" style="outline:none;" maxlength="16" placeholder="请输入6-16位纯数字支付密码"/>\n' +
                '</div>\n' +
                '<span id="payText"></span>' +
                '<input id="payment-button" class="payment-button" type="submit" value="确定" />\n' +
                '<div class="payment-video">\n' +
                '<div id="calc-input" class="calc-input">\n' +
                '<input type="radio" id="payoba" name="sport" value="债权转让及受让协议">\n' +
                '<label name="oba" for="oba"></label>\n' +
                '我同意相关<a target="_blank" href="/financePlan/protocol/'+$('#id').val()+'">《盈计划服务协议》</a></div></div></div></div></div></div></form>';
            return modal_text;
        },
        //内容模块（投资详情）
        modalO : function (obj) {
            var modal_text = '<!--投资详情确认支付-->\n' +
                '<form id="meyForm" action="" method="post">\n'+ obj +
                '<div id="' + pay.win + '" style="display:none;">\n' +
                '<div class="PopupBgTint"></div>\n' +
                '<div class="payment-dialog">\n' +
                '<div class="payment-content">\n' +
                '<div class="payment-header">确认支付<em id="' + pay.off + '"></em></div>\n' +
                '<div class="payment-body">\n' +
                '<div class="payment-jg">\n' +
                '<span>项目总额：<strong id="mey-Total">0.00</strong>元，预期总收益：<strong id="mey-Exp">0.00</strong>元，请确认无误后进行支付：</span>\n' +
                '<dl class="succeed">' +
                    '<dd><label>现金投资：</label>\n' +
                    '<p><em id="moo">0</em>元</p></dd><dd class="r">\n' +
                    '<label>使用惠米：</label>\n' +
                    '<p><em id="hm">0</em>惠米 ( 兑换<em id="hmm">0</em>元 )</p></dd><dd>\n' +
                    '<label>使用惠人币：</label>\n' +
                    '<p><em id="hrb">0</em>惠人币</p>\n' +
                    '</dd><dd class="r"><label>使用现金劵：</label>\n' +
                    '<p><em id="xjj">0</em>元</p></dd><dd>\n' +
                    '<label>加息:</label>\n' +
                    '<p>+<i id="xj">0</i>% ( 收益<em id="xjsy">0</em>元 )</p></dd></dl>\n' +
                '</div>\n' +
                '<div style="position: absolute;bottom:-9px;right: -35px;color: #888888;">投资有风险</div>'+
                '<div class="payment-text">\n' +
                '支付密码：' +
                '<input id="paypassword" type="password" name="paypassword" class="payment-inputJs" style="outline:none;" maxlength="16" placeholder="请输入6-16位纯数字支付密码"/>\n' +
                '</div>\n' +
                '<span id="payText"></span>' +
                '<input id="payment-button" class="payment-button" type="submit" value="确定" />\n' +
                '<div class="payment-video">\n' +
                '<div id="calc-input" class="calc-input">\n' +
                '<input type="radio" id="payoba" name="sport" value="借款协议">\n' +
                '<label name="oba" for="oba"></label>\n' +
                '我同意相关<a href="javascript:;" id="payurl"  target="_blank">《借款协议》</a></div></div></div></div></div></div></form>';
            return modal_text;
        },

        //单个按钮样式
        label : function(name,clascc) {
                var id = $('#' + name + ' ' + clascc);
                var num;
                if( id.length > 0) {
                    id.click(function() {
                        var radioId = $(this).attr('name');
                        if ( num == null ){
                            $(this).attr('class', 'checked');
                            $('#' + radioId).attr('checked', 'checked');
                           $('payoba').attr('class', 'checked');
                            num = 'checked';
                            radio = 1;sub = 0;
                            $('#payText').html('');
                            
                        }else{
                            id.removeAttr('class');
                            $('#' + name + ' input[type="radio"]').removeAttr('checked');
                            num = null;
                            radio = 0;sub = 0;
                            $('#payText').html('请认真阅读协议书，并勾选');
                           
                        }
                    });
                }
        },

        //关闭操作
        offClick : function(){
            var id = $('#' + pay.off);
            var $window = $('#' + pay.win);
            var off = $window.children().first();
            var txt = $('#payText');
            var inputJs = $('.payment-inputJs');
            id.click(function () {
                $window.hide();
                txt.html('');inputJs.val('');
            });
            off.click(function () {
                $window.hide();
                txt.html('');inputJs.val('');
            });
        },
        //提交基本验证
        soClick : function(del){
            var txt = $('#payText');
            var pas = $('#paypassword');
            var mit = $('#payment-button');
            pas.on('focus', function () {sub = 0; if( $(this).val() == '' ) txt.html(''); });
            pas.on('blur', function () { if( $(this).val() == '' ) txt.html('请输入支付密码！'); });
            mit.on('click', function () {
                var $this = $(this);
                if(del != 'v'){
                    if(radio == 0 ) txt.html('请认真阅读协议书，并勾选');

                    if( pas.val() == '' ) txt.html('请输入支付密码！');
                    if( pas.val() == '' ||  radio == 0 ) {
                        return false;
                    } else{
                        txt.html('<b style="color:#4cc8c8;">提交中，请稍后...</b>');
                        $(this).attr("disabled","disabled").css("background","#DDD");

                        cmdEncrypt($('#paypassword').val(),$('#paypasswords'));
                        $(this).parents('form').submit();
                    }

                }else{

                    var input_meny; $('#Total-investment').each(function(){ input_meny = $(this).val() });

                    function soAjax(url) {
                        $.ajax({
                            type:'GET',
                            url:url,
                            dataType:'json',
                            async:'false',
                            success:function(data) {
                                if(data.other >= Number(input_meny)){

                                    var bled = function(){
                                        $this.attr("disabled","disabled").css("background","#DDD");
                                    };

                                    if( radio == 0 ) txt.html('请认真阅读协议书，并勾选'); sub = 1;
                                    if( pas.val() == '' ) txt.html('请输入支付密码！'); sub = 1;

                                    if( pas.val() != '' &&  radio != 0 ) {

                                        txt.html('<b style="color:#4cc8c8;">提交中，请稍后...</b>');
                                        bled(); $this.parents('form').submit();
                                        sub = 0;
                                    }

                                }else{
                                    txt.html('<b style="color:red;">您当前的加入金额大于可投金额，请重新操作</b>');
                                    sub = 1;
                                }
                            }
                        });
                    }

                    if(sub == 0) {
                        soAjax('/invest/borrower/cashcoupon/' + Number($("#invest_id").val()) + '/' + $('#input_money').val());
                        return false;
                    }
                    sub = 1;

                }

            });
        }
    };
    //核心控制
    var bayType = {
        payBox : function(even,value,obj) {
            if(payment.HasName()) {
                obj();
                $('#transferNum').attr('value',value);
                var Htmlurl = even.attr(pay.Hurl);
                $('.modal-button').attr('href',Htmlurl);
                $('#' + pay.win).show();
                payment.offClick();
                payment.soClick();
            }
        },
        MeonyBox : function(even,obj) {
            if(payment.HasName()) {
                obj();
                var Htmlurl = even.attr(pay.Hurl);
                $('.modal-button').attr('href',Htmlurl);
                $('#' + pay.win).show();
                payment.offClick();
                payment.soClick('v');
            }
        },
        appointBox : function(even,obj) {
            if(payment.HasName()) {
                obj();
                var Htmlurl = even.attr(pay.Hurl);
                $('.modal-button').attr('href',Htmlurl);
                $('#' + pay.win).show();
                payment.offClick();
                payment.soClick();
            }
        },
        payText: function(){
            $('body').append(payment.modal);
            payment.label('calc-input','label');
        },
        meonyText: function(obj){
            $('body').append(payment.modalO(obj));
            payment.label('calc-input','label');
        },
        appointText: function(obj){
            $('body').append(payment.modalR(obj));
            payment.label('calc-input','label');
        }
    };

    window.bayTypeRun = bayType;

})();







/*
 *
 * Confirm payment
 * Type: effect display code
 * 登陆
 *
 * */
(function(){

    //开 关：data-login="off"

    var login = {
        name : '[data-login="off"]',
        win: 'Login',
        off: 'no',
        submit: '#lan-submit',
        nav : '#lan-nav',
        pass : '#lan-pass',
        text : '.eroll',
        autologin : 'autologin=0'
    };

    //var o_url = $('#regsterId').val();

    // 功能模块
    var loginment = {
        HasName : function () {
            var _length = $(login.name);
            if( _length.length > 0 ) return true; else return false;
        },
        //内容模块（登陆）
        modal : function () {
            var modal_text = '<!--登录-->'+
                '<form action="" method="post">'+
                '<div id="Login" style="display: none;">'+
                '<div class="PopupBgTint"></div>'+
                '<div class="Lan-dialog" >'+
                '<div class="Lan-content">'+
                '<div class="Lan-header">登录<em id="'+ login.win + login.off +'"></em></div>'+
                '<div class="Lan-body">'+
                '<div class="lan-text">'+
                '<ul class="lan-input">'+
                '<li><input id="lan-nav" type="text" name="" maxlength="64" placeholder="输入您用户名/邮箱/手机号码"></li>'+
                '<li><input id="lan-pass" type="password" maxlength="16" name="" placeholder="输入登录密码"></li>'+
                '</ul>'+
                '<div class="lan-tit">'+
                '<div id="Class-input">'+
                '<input type="radio" id="oba" name="sport" value="">'+
                '<label name="oba" for="oba"></label>'+
                '3天内自动登录，<strong>公用环境请勿选择!</strong>'+
                '</div>'+
                '<a class="" href="/index.php?user&q=action/getpwd/email" >忘记密码</a>'+
                '</div>'+
                '</div>'+
                '<div class="eroll">' +
                ' ' +
                '</div>'+
                '<div class="Lan-video">'+
                '<input id="lan-submit" type="submit" name="" value="登录">'+
                '<div class="lan-last">'+
                '<!--<div>使用合作伙伴登录'+
                '<a href="/index.php?user&q=oauth/connect&site=qq" >'+
                '<img src="static/images/v1/sina.png" />'+
                '</a>'+
                '<a href="/index.php?user&q=oauth/connect&site=weibo" >'+
                '<img src="static/images/v1/QQ.png" />'+
                '</a>'+
                '</div>-->'+
                '<a class="lan-log" href="/index.php?user&q=action/reg" >立即注册</a></div><div class="yg" style="margin-top:-20px;"><a href="/activity/201512ygbx" target="_blank">交易资金盗转盗用风险由<strong style="color:#ff6300;font-size:14px;">阳光保险</strong>提供保障</a></div></div></div></div></div></div></form>';
            return modal_text;
        },
        //单个按钮样式
        label : function(name,clascc) {
            var id = $('#' + name + ' ' + clascc);
            var num;
            if( id.length > 0) {
                id.click(function() {
                    var radioId = $(this).attr('name');
                    if ( num == null ){
                        $(this).attr('class', 'checked');
                        $('#' + radioId).attr('checked', 'checked');
                        num = 'checked';
                        login.autologin = 'autologin=1';

                    }else{
                        id.removeAttr('class');
                        $('#' + name + ' input[type="radio"]').removeAttr('checked');
                        num = null;
                        login.autologin = 'autologin=0';
                    }
                });
            }
        },
        //关闭操作
        offClick : function(){
            var id = $('#' + login.win + login.off);
            var $window = $('#' + login.win);
            var off = $window.children().first();
            id.click(function () {
                $window.hide();
            });
            off.click(function () {
                $window.hide();
            });
        }
    };
    //中心判断
    var IFlog = {
        // 基本判断
        basicName : function(value){
            if ( value == '' || value == 'undefined' ){
                $(login.text).html('请输入用户名');
                return false;
            }else{
                return true;
            }
        },
        basicPass : function(value){
            if ( value == '' || value == 'undefined' ){
                $(login.text).html('请输入密码');
                return false;
            }else{
                return true;
            }
        }
    };
    //核心控制
    var loginType = {

        loginText: function(){
            if( loginment.HasName() ) {
                $('body').append(loginment.modal);
                loginment.label('Class-input','label');
                $(login.name).click(function(){
                    $(login.nav).val('');
                    $(login.pass).val('');
                    $(login.text).html('');
                    $('#' + login.win).show();
                    loginment.offClick();
                });

                var nav = $(login.nav);
                var pass = $(login.pass);
                var text = $(login.text);
                $(login.nav).bind('focus',function () { text.html(''); });
                $(login.pass).bind('focus', function () { text.html(''); });

                $(login.nav).bind('blur', function () { IFlog.basicName($(this).val()); });
                $(login.pass).bind('blur', function () { IFlog.basicPass(($(this).val())); });

                $(login.submit).on('click',function () {
                    //ajax设置区

                    //验证区
                    if( IFlog.basicName(nav.val()) && IFlog.basicPass(pass.val()) ){
                        $.ajax({
                            type: "POST",
                            //url: "1.php",
                            url: '/user/loginajax',
                            data: 'username='+$("#lan-nav").val()+'&password='+$("#lan-pass").val()+'&'+login.autologin,
                            dataType: "json",
                            async: 'false',
                            success: function(message){
                                if( message.r == '00' ){
                                    $(login.submit).attr('disabled', 'disabled');
                                    text.html('<b style="color:#4cc8c8;">'+message.m+'，正在跳转</b>');
                                    window.location.reload();
                                }else{
                                    text.html(message.m);
                                }
                                return false;
                            },
                            error: function(message){

                                text.html('本次提交未成功，请重新操作！');

                            }
                        });
                        $(login.text).html('<b style="color:#4cc8c8;">提交中，请稍后...</b>');
                    }else{
                        text.html('请输入用户名和密码');
                    }



                    return false;

                });
            }
        }
    };

    $(function () {
        loginType.loginText();
    });

})();



/*
 *
 * Confirm payment
 * Type: effect display code
 * 通用提示
 *
 * */
(function(){

    //开 关：data-login="off"

    var ips = {
        win: 'Tips',
        off: 'Tips-sob',
        name: 'tips-onclick',
        url: 'data-cancel-url'
    };

    //var o_url = $('#regsterId').val();

    // 功能模块
    var ipsment = {
        HasName : function () {
            var _length = $('.'+ips.name);
            if( _length.length > 0 ) return true; else return false;
        },
        //内容模块（通用提示）
        modal : function () {
            var modal_text = '<!--提示-->' +
                '<form action="" method="post">' +
                '<div id="'+ ips.win +'" style="display: none;">' +
                '<div class="PopupBgTint" ></div>' +
                '<div class="Tips-dialog" >' +
                '<div class="Tips-content">' +
                '<div class="Tips-header">信息提示</div>' +
                '<div id="Tips-text" class="Tips-body">提示信息！</div>' +
                '<div class="Tips-input">' +
                '<a id="Tips-soa" href="" >确定</a>' +
                '<a id="'+ ips.off +'" href="javascript:" >关闭</a></div></div></div></div></form>';

            return modal_text;
        },
        //关闭操作
        offClick : function(){
            var id = $('#' + ips.off);
            var $window = $('#' + ips.win);
            var off = $window.children().first();
            id.click(function () {
                $window.hide();
            });
            off.click(function () {
                $window.hide();
            });
        }
    };

    var Tips = {
        soTips: function(){
            if(ipsment.HasName()) {
                var ute = $('.'+ips.name);

                    ute.each(function(){
                        var p = $(this);
                        var html = p.html();
                        var url = p.attr(ips.url);
                        var _url = $("#Tips-sob");
                        $('#Tips-text').html(html);
                        $("#Tips-soa").attr('href', url);

                        p.css('font-size', '0px');
                        if(!p.is(':hidden')) $('#' + ips.win).show(); else $('#' + ips.win).hide();
                        if( url == null || url == '' || url == 'undefined' ){
                            _url.bind('click', function () {
                                $('#' + ips.win).hide();
                            });
                        }else{
                            _url.attr('href',url);
                        }
                        ipsment.offClick();
                    });

            }
        },
        TipsText: function(){
            if(ipsment.HasName()) $('body').append(ipsment.modal);
        }

    };

    window.TipsTypeRun = Tips;

    $(function () {
        TipsTypeRun.TipsText();
        TipsTypeRun.soTips();
    });

})();


/*
 *
 * Confirm payment
 * Type: effect display code
 * 通用提示1
 *
 * */
(function(){

    //开 关：data-login="off"

    var ips = {
        win : 'payment',
        off : 'ment-off',
        back : 'PopupBgTint',
        txt : 'payment-jg',
        text: 'Tips-text2',
        button:'payment-button'
    };

    // 功能模块
    var ipsment = {
        //内容模块（通用提示）
        modal : function () {
            var text = '<!--信息提示2-->' +
                '<style type="text/css">' +
                '#payment .PopupBgTint { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: black; -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)"; filter: alpha(opacity=50); -moz-opacity: 0.5; -khtml-opacity: 0.5; opacity: 0.5; z-index: 1050; }'+
                '#payment .payment-dialog { position: fixed; top: 50%; left: 50%; width: 500px; height: 250px; margin-left: -200px; margin-top: -190px; background: #fff; z-index: 1051; border-radius: 6px; }' +
                '#payment .payment-content { position: relative; width: 100%; height: 180px; }' +
                '#payment .payment-content .payment-header { width: 100%; line-height: 40px; height: 40px; font-size: 18px; color: #fff; text-align: center; padding: 0 20px; background: #4cc8c8; border-radius: 6px 6px 0 0; position: relative; }' +
                '#payment .payment-content .payment-header em { width: 18px; height: 18px; display: block; position: absolute; top: 50%; right: 20px; margin-top: -9px; cursor: pointer; background: url(/static/images/v1/calculator/caltor-off.png?__sprite) no-repeat right center; }' +
                '#payment .payment-content .payment-body { width: 80%; height: 200px; font-size: 14px; margin: 25px 10% 0 10%; border-radius: 0 0 6px 6px; position: relative; }' +
                '#payment .payment-content .payment-body .payment-jg { width: 100%; font-size: 16px; padding-top: 25px; display: block; line-height:35px; height: 80px; text-align:center;overflow: hidden; }' +
                '#payment .payment-content .payment-body .payment-button { cursor:pointer; width: 70%; height: 50px; line-height: 50px; text-align: center; font-size: 24px; display: block; color: #fff; background: #4cc8c8; position: absolute; bottom: 45px; left: 15%; border: none; }' +
                '</style>' +
                '<div id="'+ ips.win +'" style="display: none;">'+
                '<div class="'+ ips.back +'"></div>'+
                '<div class="payment-dialog">'+
                '<div class="payment-content">'+
                '<div class="payment-header">信息提示<em id="'+ ips.off +'"></em></div>'+
                '<div class="payment-body">'+
                '<div id="'+ips.text+'" class="'+ ips.txt+'"></div>'+
                '<a id="payment-button" class="payment-button" href="javascript:">确定</a>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '</div>';
            return text;
        },
        //关闭操作
        offClick : function(){
            var id = $('#' + ips.off);
            var $window = $('#' + ips.win);
            id.click(function () {
                $window.hide();
            });
            $('#payment-button').click(function () {
                $window.hide();
            });
        }
    };

    var Tips = {
        text: function(){
            $('body').append(ipsment.modal);
            ipsment.offClick();
        },
        obj: function(obj){
            obj();
        }
    };

    window.textOnclick = Tips;
    window.textOnclick.user = ips.win;
    window.textOnclick.txt = ips.text;
    window.textOnclick.off = ips.off;
    window.textOnclick.button = ips.button;

})();