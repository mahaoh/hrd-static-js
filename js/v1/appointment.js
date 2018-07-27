/*
/*
 * 盈计划详情
 */

(function(){

    function appointment(){}

    var input = $('#appoint-input'),                // 输入框
        profit = $('#appoint-money'),               // 预期收益容器
        error = $('.appoint-error'),                // 错误信息提示
        Button = $('#appoint-button');              //提交


    var SetPwd = $("#IsSetPayPwd").val(),        //支付密码是否设置
        max = Number($("#mostAccount").val()),            //最大投资额
        min = Number($("#lowestAccount").val()),          //最小投资额
        Calc_balance = Number($("#appoint-balance").text()), //账户余额
        Calc_invest = Number($("#appoint-invest").text());   //剩余可投金额

    var money = false,  // 加入金额是否合法
        Renewals = 0,   // 到期是否续费
        ButAjax = true; // 提交去重

    //错误信息提示
    appointment.prototype.errorText = function(value){

        //0值
        if( value == 0 ) return '请输入加入金额';
        //是否设置支付密码
        if( SetPwd == 'N' ) return '您未设置支付密码，请<a href="/index.php?user&q=user/paypwd/setting" target="_blank">设置支付密码</a>后继续投资';
        //投资额度必须为1000的倍数
        if( !(/^\d+(\.\d{0})?$/.test(value / 1000)) ) return '本次加入金额需是1000的整数倍';
        //最高投资额度
        if( max != 0 ){
            if( max > Calc_invest ) {
                if (value > Calc_invest) return '本次加入金额大于剩余金额，请重新输入';
            }else{
                if( value > max ) return '本次加入金额不能高于'+ max.toFixed(2) +'元，请重新输入';
            }
        }else{
            if (value > Calc_invest) return '本次加入金额大于剩余金额，请重新输入';
        }
        //最低投资额度
        if( value < min ) return '本次加入金额不能低于'+ min.toFixed(2) +'元，请重新输入';

        //最小剩余投资额度
        if( Calc_invest - value < min && Calc_invest - value !==0  ) return '本次投资之后剩余金额不足'+ min.toFixed(2) +'元，请重新输入';
        //余额不足
        if( value > Calc_balance ) return '您的余额不足，请先充值';

        money = true;
        profit.html((( value / 100 ) * Number($('#eachIncome').val())).toFixed(2));
        return '<b style="color:#4cc8c8;">您的加入金额为：' + Number(value).toFixed(2) + '元</b>';

    };

    //基本样式
    appointment.prototype.style = function (value) {
        var _ = this;
        value.bind('focus',function() {
            $(this).css('color', '#000');
            Button.removeAttr('style').removeAttr('disabled');
        });
        value.bind('keyup',function() {
            money = false;
            error.html(_.errorText($(this).val()));
        });
    };


    var appoint = new appointment();

    //离开页面清空数据
    $(window).unload(function(){ input.val('') });

    $(function () {

        //动作
        appoint.style(input);

        //提交
        Button.bind('click',function() {

            $(this).css('background', '#ccc')
                   .css('cursor','default')
                   .attr('disabled','disabled');

            if(money && ButAjax) {
                bayTypeRun.appointBox($(this),function(){

                    var inpMoney = Number(input.val());
                    //加入金额
                    $('#myInvestment').val(inpMoney);
                    //是否到期续费
                    $('#ifRenewal').val(Renewals);
                    //防重复提交
                    $('#app-repeat').val($('#repeat').val());

                    //项目总额
                    $('#mey-Total').html(inpMoney);
                    //预期收益
                    $('#mey-Exp').html((( inpMoney / 100 ) * Number($('#eachIncome').val())).toFixed(2));
                    //到期处理
                    var tst = Renewals == 0 ? '到期自动退出' : '到期自动续期';
                    $('#mey-Cl').css('color','#333333').html(tst);
                    //提交地址
                    $('#meyForm').attr('action','/financePlan/pay/'+$('#id').val());

                });
            }
            else
            {
                error.html(appoint.errorText(input.val()));
            }

        });

        if(Button[0]){

            bayTypeRun.appointText(
                '<!--加入金额-->'+
                '<input id="myInvestment" name="myInvestment" type="hidden" value="0"/>'+
                '<!--是否到期续费-->'+
                '<input id="ifRenewal" name="ifRenewal" type="hidden" value="0"/>'+
                '<!--防重复提交-->'+
                '<input id="app-repeat" name="repeat" type="hidden" value="0"/>'
            );

        }

        //到期后自动续费
        label('fall-input','label',function(){ Renewals = 1; Button.removeAttr('style').removeAttr('disabled'); },function(){ Renewals = 0; Button.removeAttr('style').removeAttr('disabled'); });

    });

})();




/*
 * 我的盈计划弹出框
 */
(function(){

    var add = $('.add'),
        cancel = $('.cancel');

    add.bind('click',function() {

        var win = $('#addPlay'),
            end = $('.payment-header em'),
            but = $('#add-button'),
            error = $('#payment-error'),
            sub = 0,radio = 1,
            pass = $('#addInput');

        //文字改变
        $('#add-y').html($(this).attr('add-yue'));   //类型
        $('#add-b').html($(this).attr('add-bai'));     //百分比
        $('#add-j').html($(this).attr('add-money'));   //金额
        $('#add-s').html($(this).attr('add-yuq'));     //预期收益
        var i = $(this).attr('i');  //id

        //连接替换
        $('#addHref').attr('href','/financePlan/protocol/'+i);

        //弹窗操作
        win.show();
        end.bind('click',function(){ win.hide(); error.html('') });
        pass.on('focus', function () {sub = 0; if( $(this).val() == '' ) error.html('');but.removeAttr('style').removeAttr('disabled'); });
        pass.on('blur', function () { if( $(this).val() == '' ) error.html('请输入支付密码！'); });

        //单个按钮样式
        function label(name,clascc) {
            var id = $('#' + name + ' ' + clascc);
            var num;
            if( id.length > 0) {
                id.click(function() {
                    var radioId = $(this).attr('name');
                    if ( num == null ){
                        $(this).attr('class', 'checked');
                        $('#' + radioId).attr('checked', 'checked');
                        num = 'checked';
                        radio = 1;sub = 0;
                        $('#payText').html('');
                    }else{
                        id.removeAttr('class');
                        $('#' + name + ' input[type="radio"]').removeAttr('checked');
                        num = null;
                        radio = 0;sub = 0;
                        $('#payText').html('请仔细了解借款协议！');
                    }
                });
            }
        }
        label('calc-input','label');



        //提交
        but.on('click', function () {

            if( radio == 0 ) error.html('请认真阅读协议书，并勾选');
            if( pass.val() == '' ) error.html('请输入支付密码！');
            if( pass.val() == '' ||  radio == 0 ) {
                return false;
            } else{
                $(this).attr("disabled","disabled").css("background","#DDD");
                error.html('<b style="color:#4cc8c8;">提交中，请稍后...</b>');
                $.ajax({
                    type:'POST',
                    url:'/invest/financePlanRenewal',
                    data:'id='+i+'&ifRenewal=Y&payPwd='+pass.val(),
                    dataType:'JSON',
                    async:'false',
                    success:function(data) {
                        if( data.r == '00' ) {

                            win.hide();but.removeAttr('style').removeAttr('disabled');error.html('');pass.val('');

                            $('#' + textOnclick.txt).html('恭喜您，续期成功！');
                            $('#' + textOnclick.user).show();
                            $('#' + textOnclick.button).bind('click',function() {
                                location.reload();
                            });

                        }else{
                            error.html(data.m);
                        }
                    },
                    error:function(data) {
                        error.html('本次操作未提交成功，请稍后重试！');
                    }

                });
            }

        });



    });

    cancel.bind('click', function () {
        var win = $('#endPlay'),
            hide = $('#endPlay-click'),
            end = $('.payment-header em'),
            error = $('#endPlay-error'),
            but = $('#endPlay-button');

        var i = $(this).attr('i');  //id

        //文本修改
        var text = $(this).attr('add-yue');
        $('#endPlay-text').html(text);

        //弹窗操作
        win.show();
        end.bind('click',function(){ win.hide(); error.html('') });
        hide.bind('click', function () { win.hide(); error.html('') });

        but.bind('click', function () {
            $.ajax({
                type:'POST',
                url:'/invest/financePlanRenewal',
                data:'ifRenewal=N&id='+i,
                dataType:'JSON',
                async:'false',
                success:function(data) {

                    win.hide();

                    if( data.r == '00'){
                        $('#' + textOnclick.txt).html('您已成功取消“'+ text +'”的自动续期功能。');
                    }else{
                        $('#' + textOnclick.txt).html(data.m);
                    }

                    $('#' + textOnclick.user).show();
                    $('#' + textOnclick.button).bind('click',function() {
                        location.reload();
                    });

                },
                error: function (data) {
                    error.html('本次操作未提交成功，请稍后重试！');
                }
            });
        });

    });

    if($('.benefits-info')[0]) textOnclick.text();

})();