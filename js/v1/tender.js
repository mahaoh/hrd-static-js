//债权转让js验证
(function(){

    //变量
    var User_Input = $('#pay_text');   //舞台
    var User_text = $('#pay-IFtext');         //验证内容
    var User_income = Number($('#pay-income').text()); //剩余份数
    var User_balance = Number($('#pay-balance').text()); //账户余额
    var User_lowest = Number($('#pay-lowest').text()); //单价
    var User_ben = Number($('#osOriginalInvestAmt').val()); //转让本金、剩余原始投资额
    var User_fair = Number($('#pay-fair').text()); //公允价值
    var pay = Number( Number( $('#pay-Coefficient').text().replace('%','') ) / 100); // 转让系数
    var User_money = $('#pay-money'); //购买金额
    var map_money = $('#map-money');  //预期收益
    var User_video =$('#pay-video'); //全部剩余
    var input_value = 0,video_text = 0;   //演员

    //核心验算参数
    var IFnum = {
        test : /^[0-9]+$/,
        getInput : function(value){
            if( value == '' ) {
                return;
            }
            // 剩余最大份数
            if( value > User_income ){
                return User_income;
            }
            // 输入规则
            var reNum = this.test;
            if( !reNum.test(value) ){
                return 0;
            }else if( value.length >= 2 ){

                if( value.slice(0,1) == 0 ) {
                    return value.substr(1);
                }else{
                    return value;
                }
            }else{
                return value;
            }
        },
        getVideo: function(value){
            if( value == null ){
                return '0.00';
            }else if( value == User_income ){
                return Number( ( User_ben / 100 ) * User_fair * pay ).toFixed(2);
            }else{
                return Number(value * User_lowest).toFixed(2);
            }
        },
        getError: function(value){
            var Cssbay = 'color:red;font-size:14px;';
            //为空
            if( value == 0 ) return '<strong style="'+ Cssbay +'">请输入购买份数</strong>';
            //余额不足
            if( value > User_balance ) return '<strong style="'+ Cssbay +'">您的余额不足，请先充值。</strong>';

            return '';
        },
        getButton : function(value,balance,inp,income){
            if ( inp != 0 && value <= balance && inp <= income ) return true; else return false;
        }
    };

    // 风险测评
    function boxAlert() {
        var alertVal=$('#isRisk').val();
        if(alertVal==1){
            Alert(1)
        }else if(alertVal==2){
            Alert(2)
        };
        function Alert(num) {
            var scripts = document.getElementsByTagName("script");
            var __FILE__ = scripts[scripts.length - 2].getAttribute("src").split('/static/')[0];
            var alertHtml=`<div class=\"back\" style=\"width: 100%;height: 100%;position: fixed;top: 0;left: 0;z-index: 101;background: rgba(0,0,0,0.6);\">
                      <div class=\"alert\" style=\" width: 336px; height: 520px;position: absolute;left: 50%;top: 50%;margin-left: -168px;margin-top: -260px;z-index: 4;\">
                           <div class=\"alert_top\" style=\"  width: 100%;height: 60px; position: relative;\">
                                <em style=\" position: absolute; background:url(${__FILE__}/static/images/v3/risk/gb.png) no-repeat center;;width: 47px; height: 45px; right: -22px; top: 0; display: inline-block;\"></em>
                           </div>
                            <div class=\"alert_center\" style=\" background: #fff url(${__FILE__}/static/images/v3/risk/alert_pc.png) no-repeat center;width: 100%; height: 170px;\"></div>
                            <div class=\"alert_title\" style=\" background: #fff;height: 188px;width: 100%;\">
                                <p style=\" width: 90%;margin: 0 auto;text-indent: 24px;font-size: 16px;color: #333333; line-height: 28px;padding-top: 16px;\">您的<span style=\" color: #fb560a;\">风险测评已过期</span>，为保证您的出借权益，请重新测评，结果即时生效预计耗时60~120秒，惠人贷承诺对测评结果保密。</p>
                            </div>
                            <div class=\"alert_bottom\" style=\" width: 100%;height: 104px; background: #fff;\">
                                <button class=\"kai\" style=\" display: block;width: 90%; margin: 0 auto;border: none;height: 44px; background:#336cd3;border-radius: 5px;color: #fff; font-size: 18px;\">开始测评</button>
                                <button class=\"zan\" style=\" display: block;width: 90%; margin: 0 auto;border: none;height: 44px;background: none;color: #999999;font-size: 18px;\">暂不测评</button>
                            </div>
                        </div>
                    </div>`;

            if(num===1){
                //首次评估
                $('body').append(alertHtml);
                $('.alert_title').children('p').html('风险测评为保障您的出借权益，建议您在惠人贷平台出借前进行风险测评，便于选择适合您风险承受能力的项目，预计耗时60~120秒，惠人贷承诺对测评结果保密。');
            }else if(num===2){
                //过期评估
                $('body').append(alertHtml);
            };

            $('.alert_top').on('click','em',function () {
                $('.back').hide();
            });
            $('.alert_bottom').on('click','.kai',function () {
                location.href='/account/risktolerance'
            });
            $('.alert_bottom').on('click','.zan',function () {
                $('.back').hide();
            });
        }
    }

    var Each = Number($('#transferRegPsAmt').val());//每份代收本息
    var Amt = Number($('#osOriginalInvestAmt').val());//剩余原始投资额、转让本金

    //选择全部剩余
    User_video.bind('click', function () {
        input_value = User_income;
        input_value = IFnum.getInput(input_value); //份数
        video_text = IFnum.getVideo(input_value); //购买金额

        User_Input.val(input_value);
        User_money.html(video_text);
        User_Input.css('color', '#000');
        var map = ( input_value != User_income ) ? Conversion.Expected(Each,input_value,video_text) : Conversion.soExpected(Each,Amt,video_text);
        map_money.html( map );
        User_text.html(IFnum.getError( video_text ));
    });

    $(function () {
        //核心操作
        window.onunload = function(){ User_Input.val('请输入购买份数') };
        User_Input.focus(function () { if( $(this).val() == '请输入购买份数' ) $(this).val(0);$(this).css('color', '#000'); User_text.html(IFnum.getError( video_text )); });
        User_Input.blur(function () { User_text.html(IFnum.getError( video_text )); });

        User_Input.keyup(function(){
            input_value = $(this).val();
            input_value = IFnum.getInput(input_value);
            video_text = IFnum.getVideo(input_value);
            $(this).val(input_value);
            User_money.html(video_text);

            input_value = (input_value == '' || input_value == undefined) ? 0 : input_value;
            var map = ( input_value != User_income ) ? Conversion.Expected(Each,input_value,video_text) : Conversion.soExpected(Each,Amt,video_text);
            map_money.html( map );
            User_text.html(IFnum.getError( video_text ));
        });
        // 散场
        if( $('#pay-button')[0]) bayTypeRun.payText();

        $('#pay-button').bind('click', function () {
            var isRisk=$('#isRisk').val();
            if(isRisk==1 || isRisk==2){
                boxAlert();
                return false;
            }
            if( IFnum.getButton(Number(video_text),Number(User_balance),Number(input_value),Number(User_income)) ){
                bayTypeRun.payBox($(this),input_value,function(){
                    var Each = Number($('#transferRegPsAmt').val());//每份代收本息
                    var Amt = Number($('#osOriginalInvestAmt').val());//剩余原始投资额、转让本金
                    var fair = Number($('#pay-fair').text());//公允价值
                    //项目总额
                    $('#pay-Total').html(video_text);
                    if( input_value != User_income ){
                        $('#pay-Exp').html(Conversion.Expected(Each,input_value,video_text));//预期收益
                        $('#pay-Income').html(Conversion.Discount(fair,pay,input_value));//折让收益
                    }else{
                        $('#pay-Exp').html(Conversion.soExpected(Each,Amt,video_text));//预期收益
                        $('#pay-Income').html(Conversion.soDiscount(Amt,fair,pay));//折让收益
                    }
                });

            }
            User_text.html(IFnum.getError( video_text ));
        });
    });
})();

//债权转让确认支付计算方法
(function(){
    var Conversion = {
        /*
         * Each   每份待收利息
         * shares 购买份数
         * fair   公允价值
         * Amt    剩余原始投资额
         * unit   每份单价
         * coefficient 购买系数
         * capital 本金
         * */
        // 预期收益
        //Expected : function(Each,shares){ return Number( Number(Each) * Number(shares) ).toFixed(2); },
        Expected : function(Each,shares,capital){ return Number( ( Number(Each) * Number(shares) ) - Number(capital) ).toFixed(2); },
        // 时折让收益
        Discount : function(fair,coefficient,shares){ return Number( Number(fair) * ( 1 - Number(coefficient) ) * Number(shares) ).toFixed(2); },
        // 为 0 时预期收益
        //soExpected : function(Each,Amt,capital){ return Number( Number(Each) * ( Number(Amt) / 100 ) ).toFixed(2); },
        soExpected : function(Each,Amt,capital){ return Number( ( Number(Each) * ( Number(Amt) / 100 ) ) - Number(capital) ).toFixed(2); },
        // 为 0 时折让收益
        soDiscount : function(Amt,fair,coefficient){ return Number( ( Number(Amt) / 100 ) * Number(fair) * ( 1 - Number(coefficient) ) ).toFixed(2);}
    };
    window.Conversion = Conversion;
})();