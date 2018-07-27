//充值
{

        var CPM = require('../page/alert/init'),
            prompt = require('../page/error/prompt');
                  require('../page/user/buttonColor');

        var error = $(".m-error");
        var amount = $("#amount"),  //充值金额
            figureCaptcha = $("#figureCaptcha"),    //验证码
            accounts = $("#accounts");  //实际到账

        //错误提示
        var amountError = $('#amountError'),
            figurError = $('#figurError');
        //实际到账
        var amountber = false,
            //最小值
            amount_limit_min = parseInt($('#amount_limit_min').val()),
            //最大值
            amount_limit = parseInt($('#amount_limit').val());
        accounts.html('0元');
        function amountcoop(){
            var moneytest = /^\d+(\.\d{1,2})?$/;
            if(!moneytest.test(amount.val())){
                amountError.html('请正确输入充值金额');
                amountber = false;
            }else if( amount.val() < amount_limit_min ){
                amountError.html(`充值金额要大于${amount_limit_min}元少于${amount_limit}元`);
                amountber = false;
            }else if( amount.val() > amount_limit ){
                amountError.html(`充值金额要大于${amount_limit_min}元少于${amount_limit}元`);
                amountber = false;
            }else if(amount.val() == '') {
                amountError.html('请完整输入充值信息');
                amountber =false;
            }else{
                amountError.html('');
                amountber =true;
            }
            accounts.html(amount.val()+'元');
        }
        function figureCapt(){ if(figureCaptcha.val().length == 0) figurError.html('验证码不能为空') }
        amount.bind('keyup',amountcoop);
        amount.bind('blur',amountcoop);
        amount.focus(function(){ amountError.html(''); error.html('').hide() });
        figureCaptcha.focus(function(){ figurError.html(''); error.html('').hide() });
        figureCaptcha.bind('blur',figureCapt);
        //图形验证码切换
        $('.sua').click(function() { $(this).prev().attr('src','/user/figurecaptcha?'+ new Date().getTime()) });

        //错误信息弹窗
        function chargText(text,way){
            CPM({
                title:'确认支付',
                titleCss:{'font-size':'18px'},
                titleBut:false,
                ID:$('#rechargeText'),
                width:400,
                height:200,
                culling:function(){
                    var html = `
                            <style type="text/css">
                                #rechargeText .rechargeText{ width:100%;height:50px;padding-top:5px;text-align: center }
                                #rechargeText button{ display:block;margin:25px auto 0;width:60%;background:#38c0ff;line-height:35px;color:#fff;font-size:20px;border:none }
                            </style>
                            <div class="rechargeText">${text}</div>
                            <button id="rechargeOut">确定</button>
                        `;
                    return html;
                },
                success:function(){
                    //关闭按钮(删除)
                    $('#rechargeOut').off('click').on('click', function () { $(this).parents('#rechargeText').remove(); return false; });
                    if(way) {
                        $('#rechargeOut').remove();
                        $('#rechargeText').css({'height':'100px','line-height':'100px'})
                    }
                }
            });
        }
        //输入支付密码弹窗
        function chargPass(){
            CPM({
                title:'确认支付',
                titleCss:{'font-size':'18px'},
                ID:$('#rechargePass'),
                width:350,
                height:215,
                culling:function(){
                    var html = `
                    <style type="text/css">
                        .rechargePass label{ display:inline-block;margin-top:10px; }
                        .rechargePass .Updiv{ display:inline-block;position: relative;width:76%;margin-top:10px; }
                        .rechargePass .Updiv input{ outline:none;padding:5px 10px;width:100% }
                        .rechargePass .Updiv a{ position: absolute;bottom:-18px;right:0;font-size:12px;color:#38c0ff }
                        .rechargePass button{ display:block;margin-top:10px;width:100%;background:#38c0ff;line-height:35px;color:#fff;font-size:20px;border:none;outline:none; }
                        .rechargePass #errors{ display:block;height:15px;color:red;font-size:12px;margin-top:20px; }
                    </style>
                    <div class="rechargePass">
                        <label>支付密码：</label>
                        <div class="Updiv">
                            <input type="password" id="paypwd" name="paypwd" placeholder="请输入支付密码" />
                            <a class="" href="/account/paypwd/find">忘记密码?</a>
                        </div>
                        <div id="errors"></div>
                        <button id="rechargePassSubmit">确定</button>
                    </div>
                `;
                    return html;
                },
                success:function(){

                    let err = $("#errors");

                    $('#paypwd').off('focus').on('focus',function(){ err.html('') });

                    $('#rechargePassSubmit').off('click').on('click',function(){
                        
                        let that = $(this);
                        // that.attr('disabled','disabled').css('background','rgb(102, 102, 102)')
                        // var time= setTimeout(function () {
                        //     $('#rechargePassSubmit').removeAttr('disabled','disabled').css('background','#38c0ff');
                        //     clearInterval(time)
                        // },3000);
                         if($('#paypwd').val().length > 0){
                             $.ajax({
                                 type:'POST',
                                 data:'amount='+ amount.val() +'&paypwd='+$('#paypwd').val(),
                                 dataType:'json',
                                 async:'false',
                                 success:function(data){
                                     if(data.r == '00'){
                                         location.href = '/account/recharge/wait';
                                     }else{
                                         err.html(data.m);
                                         that.buttonColorOn();
                                     }

                                 },
                                 error:function(){
                                     err.html('本次提交失败,请稍后重试');
                                     that.buttonColorOn();
                                 }
                             });
                             that.buttonColorOff(err,'提交中,请稍后...');
                         }else{
                             err.html('支付密码不能为空');
                         }
                        return false;
                    });
                    
                }
            });
        }
        //输入手机验证码弹窗
        function chargPhone(){
            CPM({
                title:'确认支付',
                titleCss:{'font-size':'18px'},
                ID:$('#rechargePhone'),
                width:350,
                height:230,
                culling:function(){
                    var html = `
                        <style type="text/css">
                            .rechargePhone .phoneAleat{ display:inline-block;margin:0 5px; }
                            .rechargePhone .UpPhone{ display:block;margin-top:5px;}
                            .rechargePhone #sms_captcha{ width: 170px;height: 40px;line-height: 40px;padding: 0 10px;outline: none;border: 1px solid #38c0ff;margin-top:10px; }
                            .rechargePhone .PEhone{ width: 130px;height: 40px;line-height: 40px;font-size:12px;margin-top:10px;float: right;overflow: hidden;position: relative;background: none;text-align: center;color: #38c0ff;border: 1px solid #38c0ff;-webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;cursor: pointer;}
                            .rechargePhone button{ display:block;margin-top:10px;width:100%;background:#38c0ff;line-height:35px;color:#fff;font-size:20px;border:none;outline:none; }
                            .rechargePhone #errors{ display:block;height:15px;color:red;font-size:12px;margin-top:5px; }
                        </style>
                        <div class="rechargePhone">
                            <label>请输入手机号<strong class="phoneAleat">${$('#user_mobile').val()}</strong>收到的短信验证码：</label>
                            <div class="UpPhone">
                                <input id="sms_captcha" name="sms_captcha" type="text" placeholder="请输入收到的验证码" />
                                <strong id="rechargePEhone" class="PEhone">发送短信验证码</strong>
                            </div>
                            <div id="errors"></div>
                            <button id="rechargePhoneSubmit">确定</button>
                        </div>
                    `;
                    return html;
                },
                success:function(){


                    var times = 60,
                        time = times,
                        $ele = $('#rechargePEhone');

                    function Alertphone(){

                        //短信验证码DOM
                        $ele.css({
                            'border': '1px solid #ccc',
                            'color': '#ccc',
                            'font-size': '12px',
                            'cursor': 'default'
                        }).html(time + '秒后重新发送');

                        var timer = setInterval(function () {
                            time -= 1;
                            $ele.html(time + '秒后重新发送');
                            if (time < 0) {
                                clearInterval(timer);
                                $ele.removeAttr('style').html('重新发送');
                                time = times;
                                $ele.off('click').on('click', function () {
                                    $.ajax({
                                        type:"POST",
                                        url:"/account/recharge/payment",
                                        data:"figureCaptcha="+Math.floor(Math.random()*9000+1000)+"&amount="+amount.val(),
                                        async:"false",
                                        dataType:"json",
                                        success:function(e){
                                            Alertphone();
                                        }
                                    })
                                });
                            }
                        }, 1000);
                    }

                    Alertphone();

                    let err = $("#errors");

                    $('#sms_captcha').off('focus').on('focus',function(){ err.html('') });

                    $('#rechargePhoneSubmit').off('click').on('click',function(){
                        
                        let that = $(this);
                        if($('#sms_captcha').val().length > 0){
                            $.ajax({
                                type:'POST',
                                data:'sms_captcha='+$('#sms_captcha').val(),
                                dataType:'json',
                                async:'false',
                                success:function(data){
                                    if(data.r == '00'){
                                        location.href = '/account/recharge/wait';
                                    }else{
                                        err.html(data.m);
                                    }
                                    that.buttonColorOn();
                                },
                                error:function(){
                                    err.html('本次提交失败,请稍后重试');
                                    that.buttonColorOn();
                                }
                            });
                            that.buttonColorOff(err,'提交中,请稍后...');
                        }else{
                            err.html('短信验证码不能为空');
                        }
                        return false;
                    });


                }
            });
        }
        //提交
        $('#recharge').bind('click',function() {
            var that = $(this);

            if( amountber && figureCaptcha.val().length > 0  ){
                $.ajax({
                    type:'POST',
                    url:'/account/recharge/payment',
                    data:'amount='+ amount.val() +'&figureCaptcha='+figureCaptcha.val(),
                    async:'false',
                    dataType:'json',
                    success:function(data) {
                        if(data.r == 'yeepay'){
                            chargPass();
                        }else if(data.r == 'sumapay'){
                            chargPhone();
                        }else if(data.r == ''){
                            chargText('系统异常,请稍后再试');
                        }else if(data.r == 'error'){
                            prompt(data.m);
                        }
                        that.buttonColorOn();
                    }
                });
                that.buttonColorOff(error,'提交中,请稍后...');

            }else{
                if(!amountber) amountError.html('充值金额需大于1元小于5万元');
                figureCapt();
            }
            return false;

        });


}


//充值状态
(function(){
        

        var await = $('#await'), //充值等待
            succeed = $('#succeed'), //充值成功
            exception = $('#exception'), //充值异常
            failure = $('#failure'); //充值失败
    
        $(".Recharge-info em").each(function(){ retoryTime(5,this,'s','load') });
        $(".Recharge-Inv-info .Inv-last em").each(function(){ retoryTime(10,this,'秒后自动返回') });
    
        function retoryTime(iTime,ob,text,Manner){
            var iSecond;
            var sDay="",sTime="",Account;
            iSecond = parseInt(iTime%60);
            sTime =sDay + iSecond + text;
            if(iTime==0){
                clearTimeout(Account);
                if( Manner == 'load' ){
                    var USERID = $('#resultLoad').val();
                    location.href = '/account/recharge/result/'+USERID;
                }else{
                    location.href = '/account/recharge';
                }
    
            }else{
                Account = setTimeout(function(){retoryTime(iTime,ob,text,Manner)},1000);
            }
            iTime=iTime-1;
    
            ob.innerHTML = sTime;
        }
    
        exception.children('.button').bind('click', function () { location.reload() });
    
        failure.children().children().children(".Inv-fh").bind('click',function(){ location.href = '/account/recharge' });
        
})();