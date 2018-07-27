// 投资详情逻辑计算
(function(){

    //变量
    var Calc_Input = $('#input_money'); // 舞台
    var Calc_text = $('#but-txt'); // 错误提示信息
    var Calc_button = $("#calc-nth"); //提交
    var timeout,numAjax = 0;

    var Calc_balance = Number($("#calc-balance").text()); //账户余额
    var Calc_invest = Number($("#calc-invest").text()); //剩余可投金额
    var max = Number($("#most_account").val()); //最大投资额
    var min = Number($("#lowest_account").val()); //最小投资额
    var invest_id = Number($("#invest_id").val()); //标ID
    var SetPwd = Number($("#is_setpaypwd").val()); //密码是否设置
    var xsb = Number($("#is_newbie_invest").val()); //是否新手标
    var xs = Number($("#is_newbie").val()); //是否新手
    var soxs = $("#newbie_invest_hint").val(); //新手标信息提示
    var isFool = $("#isFool").val(); //是否是投资自己的项目
    var isPlanBorrow = $('#isPlanBorrow'); //盈计划专享标

    var input_meny = 0;  //公共总额
    var input_value = 0;
    var input_val = 0;  //公共金额
    var ajax_hr = 0,Array_hr=''; //惠人币
    var ajax_xj = 0,Array_xj = ''; //现金劵
    var ajax_xjoo = 0; //现金劵限额
    var ajax_jx = 0,Array_jx = '',soJx=0; //加息劵
    var ajax_zjx = 0;
    var ajax_jxoo = 0; //加息劵限额
    var ajax_hm = 0; //惠米
    var ajax_hmm = 0; //惠米


    //核心验算参数
    var IFnum = {
        // 输入基本规则
        test: /^[0-9]+$/,
        getInput: function (value) {
            if (value == '') {
                return 0;
            }
            if( value.length > 9 ){
                return value.substr(0, 9);
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
        },
        //项目总额
        Meny : function(a,b,c,d){
            return Number(a) + Number(b) + Number(c) + Number(d);
        },
        //错误信息提示
        errorText: function(value,Inp,ajax_jx){

            //盈计划专享标
            if( Number(isPlanBorrow.val()) == 1 ) return '盈计划专享标的，不支持单独投资';
            //是否是投资自己的项目
            if( isFool == 1 ) return '对不起，不能购买自己的借款项目，请选择其他项目';
            //是否新手标
            if( xsb == 1 && xs == 0 ) return soxs;
            //空值
            if( value == -1 ) return;
            //0值
            if( value == 0 ) return '请输入加入金额';
            //是否设置支付密码
            if( SetPwd == 0 ) return '您未设置支付密码，请<a href="/index.php?user&q=user/paypwd/setting" target="_blank">设置支付密码</a>后继续投资';
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
            if( Inp > Calc_balance ) return '您的余额不足，请先充值';

            var a = Number($('#each_income').val()),
                b = Number($('.jx').attr('data-count-apr'));

            if( ajax_jx == 0 ){
                //return '<b style="color:#4cc8c8;">您的加入金额为：' + Number(value).toFixed(2) + '元，预期收益：'+ ( ( Number(input_meny) / 100 ) * a ).toFixed(2) +' 元</b>';
                return '<b style="color:#4cc8c8;">您的加入金额为：' + Number(value).toFixed(2) + '元，预期收益：'+ ( (( Number(input_meny) / 100 ) * a) + ( Number(input_value) / 100 ) * (a / b) * (Number(ajax_zjx)) ).toFixed(2) +' 元</b>';
            }else{
                return '<b style="color:#4cc8c8;">您的加入金额为：' + Number(value).toFixed(2) + '元，预期收益：'+ ( (( Number(input_meny) / 100 ) * a) + ( Number(input_value) / 100 ) * (a / b) * (Number(ajax_jx)) + ( Number(input_value) / 100 ) * (a / b) * (Number(ajax_zjx)) ).toFixed(2) +' 元</b>';
            }
        },
        //ajax默认勾选判断
        getCheckStatus: function(i,j,k,l) {
            var a = '';

            if ( Number(j) == 0 && l == 1) a =  ' disabled="disabled"  ';
            if (Number(j) < Number(k) && l==1) a =  ' disabled="disabled"  ';
            if (Number(j) >= Number(k) && Number(parseInt(i)) == 1 && l == 1) a =  ' checked="checked" style="color:#000;"';

            return a;

        },
        //提交验算
        submitInput: function(meny,val,value,min,max,coo){
            if( numAjax == 0){

                if( Number(isPlanBorrow.val()) == 1 ) return false;

                if( SetPwd == 0 ) return false;

                if( isFool == 1 ) return false;

                if( xsb == 1 && xs == 0 ) return false;

                if( max != 0 ){
                    if( meny != 0 && val <= value && (Calc_invest - meny > min || Calc_invest - meny == 0) && meny >= min && meny <= max && meny <= coo ) return true;
                }else{
                    if( meny != 0 && val <= value  && (Calc_invest - meny > min || Calc_invest - meny == 0) &&  meny >= min && meny > max && meny <= coo ) return true;
                }

                //return true;
            }
        }
    };

    //ajax预留空间
    var _ajax = {
        //惠米
        soHm: function () {
            label(
                'mey-input',
                'label',
                function () {
                    var meny = Number($('#nba').val());
                    ajax_hmm = Number($('#nba').attr('mm'));
                    ajax_hm = Number(meny);
                    input_meny = IFnum.Meny(input_value,ajax_hm,ajax_hr,ajax_xj);
                    Calc_text.html(IFnum.errorText(input_meny,Number(Calc_Input.val()),ajax_jx));
                },
                function () {
                    ajax_hm = Number(0);
                    ajax_hmm = Number(0);
                    input_meny = IFnum.Meny(input_value,ajax_hm,ajax_hr,ajax_xj);
                    Calc_text.html(IFnum.errorText(input_meny,Number(Calc_Input.val()),ajax_jx));
                }
            );
        },
        //现金劵
        soXj : function(){
            $('#calc-xj .but-off-text').on('click','input',function(){
                var o = Number($(this).attr('is_aut'));
                var value = Number($(this).attr('nominal'));
                input_val = Number(Calc_Input.val());
                var html;
                if( !$(this).is(':checked') ){
                    ajax_xj -= value;
                    ajax_xjoo -= o;
                    $(this).parents('.row').css('color','#666');
                }else{
                    ajax_xjoo += o;
                    if( input_val >= ajax_xjoo ){
                        ajax_xj += value;
                        $(this).parents('.row').css('color','#000');
                    }else{
                        $(this).removeAttr('checked');
                        ajax_xjoo -= o;
                        alert("当前投标金额无法释放更多现金券！");
                    }
                }
                if(ajax_xj==0) html = '未使用'; else html = '<strong>'+ajax_xj+'</strong>元';
                input_meny = IFnum.Meny(input_value,ajax_hm,ajax_hr,ajax_xj);
                $('#calc-xj span b').html(html);
                Calc_text.html(IFnum.errorText(input_meny,input_val,ajax_jx));
            });

        },
        //加息劵
        soJx : function(){

            $('#calc-jx .but-off-text').on('click','input',function(){
                var o = Number($(this).attr('is_aut'));
                var value = Number($(this).attr('nominal'));
                input_val = Number(Calc_Input.val());
                var html;

                if( !$(this).is(':checked') ){
                    ajax_jx -= value;
                    ajax_jxoo = 0;
                    $(this).parents('.row').css('color','#666');
                }else{
                    ajax_jxoo = o;

                    if( input_val >= ajax_jxoo ){

                        var ros = $(this).attr('soJx');
                        for( var i = 0; i < soJx; i++) {

                            var paren = $('.soJx-' + i);
                            if( i == ros ) {
                                paren.attr('checked', 'checked');
                                ajax_jx = paren.attr('nominal');
                                ajax_jxoo = Number(paren.attr('is_aut'));
                                paren.parents('.row').css('color','#000');
                            }else{
                                paren.removeAttr('checked');
                                paren.parents('.row').css('color','#666');
                            }

                        }

                    }else{
                        $(this).removeAttr('checked');
                        alert("当前投标无法释放更多加息券！");
                    }
                }
                if(ajax_jx==0) html = '未使用'; else html = '<strong> '+ajax_jx+'%</strong>';
                $('#calc-jx span b').html(html);
                Calc_text.html(IFnum.errorText(input_meny,input_val,ajax_jx));
            });

        },
        //惠人币
        soHr : function(){
            if( !$('#calc-hr .but-off-text .row')[0] ) $('#calc-hr span b').html('无可用');
            $('#calc-hr .but-off-text').on('click','input',function(){
                var value = Number($(this).attr('nominal'));
                var html;
                if( !$(this).is(':checked') ){
                    ajax_hr -= value;
                    $(this).parents('.row').css('color','#666');
                }else{
                    ajax_hr += value;
                    $(this).parents('.row').css('color','#000');
                }
                if(ajax_hr==0) html = '未使用'; else html = '&nbsp;<strong>'+ajax_hr+'</strong>';
                input_meny = IFnum.Meny(input_value,ajax_hm,ajax_hr,ajax_xj);
                $('#calc-hr span b').html(html);
                Calc_text.html(IFnum.errorText(input_meny,Number(Calc_Input.val()),ajax_jx));
            });

        },
        //全投
        soly : function(){
            $('.totally').on('click', function () {
                if(Calc_balance > Calc_invest) input_value = Calc_invest; else input_value = Math.floor(Calc_balance);
                input_val = input_value;
                input_meny = IFnum.Meny(input_value,ajax_hm,ajax_hr,ajax_xj);
                Calc_Input.val(input_value).css('color','#333');
                Calc_text.html(IFnum.errorText(input_meny,Calc_balance,ajax_jx));
                _ajax._(invest_id,input_value);

            });
        },
        _: function (invest_id,Meny,cooper) {
            $.ajax({
                type: 'GET',
                url: '/invest/borrower/cashcoupon/'+invest_id+'/'+ Meny,
                dataType: 'json',
                async: 'false',
                complete: function(){
                    numAjax -= 1;
                },
                success: function (data) {
                    //通用
                    var html = '',html2 = '',html3 = '',html4 = '';
                    var c = Calc_Input.val().indexOf('请输入加入金额') >= 0 ? 0 : Calc_Input.val();
                    //惠米
                    var hm_value = $('#calc-hm .calc-input #nba');
                    var hm_text = $('#calc-hm .calc-input span');

                    if( c.indexOf('请输入加入金额') >= 0 || c == '0' ){
                        ajax_hm = 0;
                        hm_value.removeAttr('checked');
                        hm_value.next().removeClass('checked');
                        hm_text.html('您还有' + data.myPoint + '惠米，可兑换' + data.myPointConvert + '元');
                        hm_value.attr({ 'value': '0' ,'mm': 0 });
                    }else if( Number(c) >= 10 && data.myPoint != 0 ){
                        ajax_hm = 0;
                        hm_value.removeAttr('checked');
                        hm_value.next().removeClass('checked');
                        hm_text.html('使用' + data.myPoint + '惠米，兑换' + data.myPointConvert + '元');
                        hm_value.removeAttr('disabled');
                        hm_value.attr({ 'value': data.myPointConvert,'mm': data.myPoint });

                    }else{
                        ajax_hm = 0;
                        hm_value.removeAttr('checked');
                        hm_value.next().removeClass('checked');
                        hm_value.attr({ 'value': 0  ,'mm': 0});
                        hm_text.html('使用0惠米，兑换0元');
                    }
                    //现金劵
                    var len = data.use.length;
                    var cool = 0;
                    var xjoo = 0;
                    if (len == 0) {
                        ajax_xj = 0;
                        html= '<b class="but-off-txt">暂无可用现金劵</b>';
                        html2= '无可用';
                    } else {
                        for (var i = 0; i < len; i++) {

                            html += '<div class="row mar-on"' + IFnum.getCheckStatus(data.use[i].is_use, Number(c), data.use[i].every_tender_amt, 1) + '>' +
                            '<div class="col-3">' +
                            '<div class="calc-input-check" >' +
                            '<input type="checkbox" class="c-box" name="myCoupon[]"'+IFnum.getCheckStatus(data.use[i].is_use, Number(c), data.use[i].every_tender_amt, 1) +
                            'nominal='+ data.use[i].nominal+
                            ' id="'+ data.use[i].id +'"'+
                            ' is_aut="'+ data.use[i].every_tender_amt +
                            '" is_use="' + data.use[i].is_use +
                            '" value="' + data.use[i].coding +
                            '">&nbsp;' +
                            data.use[i].nominal + '元' +
                            '</div>' +
                            '</div>' +
                            '<div class="col-5">' + data.use[i].ruleset_memo + '</div>' +
                            '<div class="col-4">' + '有效期至 ' + data.use[i].validity + '</div>' +
                            '</div>';

                            //现金劵金额打印
                            if (Number(input_value) >= Number(data.use[i].every_tender_amt) && parseInt(data.use[i].is_use) == 1) {
                                cool += Number(data.use[i].nominal);
                                ajax_xj = cool;
                                xjoo += Number(data.use[i].every_tender_amt); ajax_xjoo = xjoo;
                            }else{
                                ajax_xj = cool;
                            }
                            if (cool == 0) html2 = '无可用'; else html2 = '<strong>' + cool + '</strong>元';
                        }
                    }
                    $('#calc-xj .but-off-text').html(html);
                    $('#calc-xj span b').html(html2);



                    //加息劵
                    var lenJx = data.iic_use.length;
                    var coolJx = 0;
                    var xjooJx = 0;
                    if( lenJx == 0 ){
                        html3 = '<b class="but-off-txt">暂无可用加息劵</b>';
                        html4 = '无可用';
                    } else{
                        for (var i = 0; i < lenJx; i++) {
                            html3 += '<div class="row mar-on"' + IFnum.getCheckStatus(data.iic_use[i].is_use, Number(c), data.iic_use[i].every_tender_amt, 1) + '>' +
                            '<div class="col-2">' +
                            '<div class="calc-input-check" >' +
                            '<input type="checkbox" class="c-box soJx-'+ i +'" soJx="'+ i +'" name="interest[]"'+IFnum.getCheckStatus(data.iic_use[i].is_use, Number(c), data.iic_use[i].every_tender_amt, 1) +
                            'nominal='+ data.iic_use[i].increaseInterest+
                            ' id="'+ data.iic_use[i].coding +'"'+
                            ' is_aut="'+ data.iic_use[i].every_tender_amt +
                            '" is_use="' + data.iic_use[i].is_use +
                            '" value="' + data.iic_use[i].id +
                            '">&nbsp;' +
                            data.iic_use[i].increaseInterest + '%' +
                            '</div>' +
                            '</div>' +
                            '<div class="col-6">' + data.iic_use[i].rulesetMemo + '</div>' +
                            '<div class="col-4">' + '有效期至 ' + data.iic_use[i].validity + '</div>' +
                            '</div>';

                            soJx=i+1;

                            //加息卷比例打印
                            if (Number(input_value) >= Number(data.iic_use[i].every_tender_amt) && parseInt(data.iic_use[i].is_use) == 1) {
                                coolJx += Number(data.iic_use[i].increaseInterest);
                                ajax_jx = coolJx;
                                xjooJx += Number(data.iic_use[i].every_tender_amt); ajax_jxoo = xjooJx;
                            }else{
                                ajax_jx = coolJx;
                            }
                            //if (coolJx == 0) html4 = '无可用'; else html4 = '<strong> ' + coolJx + '%</strong>';
                            html4 = '未使用';
                        }
                    }
                    $('#calc-jx .but-off-text').html(html3);
                    $('#calc-jx span b').html(html4);

                    ajax_zjx = (data.inrateqh == '' || data.inrateqh == undefined) ? 0 : Number(data.inrateqh);

                    //现金劵
                    input_meny = IFnum.Meny(input_value,ajax_hm,ajax_hr,ajax_xj);
                    if( c.indexOf('请输入加入金额') >= 0 ) input_meny = -1;
                    if(cooper != 'yes') Calc_text.html(IFnum.errorText(input_meny,c,ajax_jx));
                },
                error: function (xhr, type) {

                }
            });
            numAjax +=1;
        }
    };
    //返回值提取
    var inputText = {
        hr : function(o){
            var name = o.attr('name');
            var nominal = o.attr('nominal');
            var id = o.attr('id');
            var is_aut = o.attr('is_aut');
            var is_use = o.attr('is_use');
            var value = o.attr('value');
            var html = '<input type="checkbox" checked="checked" name="myCurrency[]" nominal="'+ nominal +'" value="'+ value +'">';
            return html;
        },
        xj : function(o){
            var _class = o.attr('class');
            var name = o.attr('name');
            var nominal = o.attr('nominal');
            var id = o.attr('id');
            var is_aut = o.attr('is_aut');
            var is_use = o.attr('is_use');
            var value = o.attr('value');
            var html = '<input type="checkbox" checked="checked" class="'+ _class +'" name="'+ name +'" nominal="'+ nominal +'" id="'+ id +'" is_aut="'+ is_aut +'" is_use="'+ is_use +'" value="'+ value +'">\n';
                html += '<input type="checkbox" checked="checked" class="'+ _class +'" name="myCouponID[]" nominal="'+ nominal +'" id="'+ id +'" is_aut="'+ is_aut +'" is_use="'+ is_use +'" value="'+ id +'">\n';
            return html;
        },
        jx : function(o){
            var _class = o.attr('class');
            var name = o.attr('name');
            var nominal = o.attr('nominal');
            var id = o.attr('id');
            var is_aut = o.attr('is_aut');
            var is_use = o.attr('is_use');
            var value = o.attr('value');
            var html = '<input type="checkbox" checked="checked" class="'+ _class +'" name="'+ name +'" nominal="'+ nominal +'" id="'+ id +'" is_aut="'+ is_aut +'" is_use="'+ is_use +'" value="'+ value +'">\n';
                html += '<input type="checkbox" checked="checked" class="'+ _class +'" name="interestCoding[]" nominal="'+ nominal +'" id="'+ id +'" is_aut="'+ is_aut +'" is_use="'+ is_use +'" value="'+ id +'">\n';
            return html;
        }

    };


    $(function(){
        //核心处理
        $(window).unload(function(){ Calc_Input.val('请输入加入金额('+min+'~'+Calc_invest+'元)') });
        _ajax._(invest_id,Number(input_meny),'yes');
        if( Calc_invest == 0 ) {
            Calc_Input.attr('disabled', 'disabled');
            Calc_button.attr('disabled', 'disabled').css({"background":"#DDD","cursor":"text"});
            return;
        }
        _ajax.soHm();_ajax.soXj();_ajax.soJx();_ajax.soHr();_ajax.soly();
        Calc_Input.bind('focus',function () { Calc_text.html(''); if( $(this).val().indexOf('请输入加入金额') >= 0 ) $(this).val(0);$(this).css('color', '#000') });
        Calc_Input.bind('blur',function () { Calc_text.html( IFnum.errorText( input_meny , Number($(this).val()),ajax_jx)) });
        Calc_Input.bind('keyup',function () {
            input_value = Number(IFnum.getInput($(this).val()));
            input_val = input_value;
            $(this).val(input_value);
            input_meny = IFnum.Meny(input_value,ajax_hm,ajax_hr,ajax_xj);
            Calc_text.html( IFnum.errorText( input_meny , input_value , ajax_jx) );
            clearTimeout(timeout);
            timeout = setTimeout(function(){ _ajax._(invest_id,input_val) },500);
        });
        //提交设定
        Calc_button.click(function () {
            if( IFnum.submitInput(Number(input_meny),Number(input_value),Number(Calc_balance),Number(min),Number(max),Number(Calc_invest)) ){
                bayTypeRun.MeonyBox($(this),function(){

                    Array_hr = '';
                    Array_xj = '';
                    Array_jx = '';
                    $('#calc-hr .but-off-text input:checked').each(function(){Array_hr += inputText.hr($(this));});
                    $('#calc-xj .but-off-text input:checked').each(function(){Array_xj += inputText.xj($(this));});
                    $('#calc-jx .but-off-text input:checked').each(function(){Array_jx += inputText.jx($(this));});

                    var a = Number($('#each_income').val()),
                        b = Number($('.jx').attr('data-count-apr')),
                        Exp;

                    if( ajax_jx == 0 ){
                        //Exp = ( Number(input_meny) / 100 ) * a
                        Exp = (( Number(input_meny) / 100 ) * a) + ( Number(input_value) / 100 ) * (a / b) * (Number(ajax_zjx));
                    }else{
                        Exp = ( (( Number(input_meny) / 100 ) * a) + ( Number(input_value) / 100 ) * (a / b) * (Number(ajax_jx)) + ( Number(input_value) / 100 ) * (a / b) * (Number(ajax_zjx)) );
                    }

                    //链接
                    $('#payurl').attr('href','/invest/agreement/'+invest_id);
                    //项目总额
                    $('#mey-Total').html(Number(input_meny).toFixed(2));
                    //预期收益
                    $('#mey-Exp').html(Number(Exp).toFixed(2));
                    //提交
                    $('#meyForm').attr({
                        'action':'/invest/pay/'+ invest_id,
                        'method':'post'
                    });
                    //项目总额
                    $('#Total-investment').attr('value',Number(input_meny).toFixed(2));
                    //加入金额
                    $('#myInvestment').attr('value',Number(input_val).toFixed(2));
                    //惠人币
                    $('#myCurrency').html(Array_hr);
                    //现金劵
                    $('#myCoupon').html(Array_xj);
                    //现金劵
                    $('#myPlusCoupons').html(Array_jx);
                    //惠米
                    $('#myPoint').attr('value',Number(ajax_hm).toFixed(2));
                    //其他
                    $('.tz_repeat').val($('#repeat').val());

                    // 投资详细信息
                    var xjsy = ajax_jx == 0 && ajax_zjx == 0 ? 0 : (( Number(input_value) / 100 ) * (a / b) * (Number(ajax_jx)+Number(ajax_zjx)) ).toFixed(2);

                    $('#moo').html(Number(input_value));   // 现金投资
                    $('#hm').html(Number(ajax_hmm));    // 惠米
                    $('#hmm').html(Number(ajax_hm));   // 惠米可兑换 * 元
                    $('#hrb').html(Number(ajax_hr));   // 惠人币
                    $('#xjj').html(Number(ajax_xj));   // 现金劵
                    $('#xj').html(Number(ajax_jx)+Number(ajax_zjx));    // 加息
                    $('#xjsy').html(Number(xjsy));  // 加息卷收益



                });
            }
        });
        bayTypeRun.meonyText(
            '<!--项目总额-->'+
            '<input id="Total-investment" name="Total-investment" type="hidden" value="0"/>'+
            '<!--加入金额-->'+
            '<input id="myInvestment" name="myInvestment" type="hidden" value="0"/>'+
            '<!--惠人币-->'+
            '<div id="myCurrency" style="display: none;"></div>'+
            '<!--现金劵-->'+
            '<div id="myCoupon" style="display: none;"></div>'+
            '<!--加息劵-->'+
            '<div id="myPlusCoupons" style="display: none;"></div>'+
            '<!--惠米-->'+
            '<input id="myPoint" name="myPoint" type="hidden" value="0"/>'+
            '<!--其他-->'+
            '<input id="repeat" class="tz_repeat" name="repeat" type="hidden" value="" />'
        );
    });

})();




//借款证明特效
;(function($){
    $.fn.DeriveImg = function(options) {
        var defaults = {
            speed : 200,
            listSpeed : 200,
            setLood : {
                path : "static/images/v1/loading.gif",
                width : 32,
                height : 32
            },
            setModal : {
                bgColor : "#000",
                opacity : .6
            },
            state : "fade"
        };
        var options = $.extend(defaults,options);
        return this.each(function(i,t) {
            var $this = $(this),
                _self = this,
                $RelList = $("a[rel]",$this),
                $TitleList = $("a[title]",$this),
                $TitleGroup = $("a[group]",$this),
                $body = $("body"),
                $document = $(document),
                $window = $(window),
                nWinWidth = $window.width(),
                nWinHeight = $window.height(),
                nLoadPath = options.setLood.path,
                nLoadWidth = options.setLood.width,
                nLoadHeight = options.setLood.height,
                Pindex = $this,
                oloadDom = "<img src= \""+ nLoadPath + "\" height=\"" +nLoadHeight+ "\" width=\""+ nLoadWidth+"\"/>",
                sBoxWrap = "<div id=\"jc-Mod\" style=\"background:"+options.setModal.bgColor+";display:none;height:"+$document.height()+"px;width:100%;\"></div>" +//width:"+nWinWidth+"px;
                           "<div id=\"jc-Box\" style=\"position:fixed;display:none;\">" +
                                //"<div id=\"box-close\" style=\"display:none;\"><a></a></div>" +
                                "<div id=\"box-top\">" +
                                    "<div id=\"box-top-left\"></div>" +
                                    "<div id=\"box-top-right\"></div>" +
                                "</div>" +
                                "<div id=\"box-cen\">" +
                                    "<div id=\"box-cen-right\">" +
                                        "<div id=\"box-cen-img\">{Boxtitle}</div> " +
                                    "</div>" +
                                "</div>" +
                                "<div id=\"box-pn\" style=\"display:none;\">" +
                                    "<div id=\"box-prev\"><a></a></div>" +
                                    "<div id=\"box-next\"><a></a></div>" +
                                "</div>" +
                                "<div id=\"box-text\" style=\"display:none;\">" +
                                    "<samp></samp>" +
                                    "<div id=\"box-text-left\"></div>" +
                                    "<div id=\"box-text-cen\">{Boxtitle}</div>" +
                                    "<div id=\"box-text-right\"><b></b>/"+ $this.context.childElementCount +"</div>" +
                                "</div>" +
                                "<div id=\"box-btm\">" +
                                    "<div id=\"box-btm-left\"></div>" +
                                    "<div id=\"box-btm-right\"></div>" +
                                "</div>" +
                           "</div>",


                fnAddBox = function(){
                    if(!($body.find("#jc-Mod").is("div")&&$body.find("#jc-Box").is("div"))) {
                        $body.append(sBoxWrap);
                        return false;
                    };
                },
                fnBoxMode = function(){
                    this.view = viewMode;
                    this.title = relMode;
                },
                fnState = function(){
                    this.curr = currState;
                    this.fade = fadeState;
                    this.top = topState;
                },
            //获取预览图信息列表
                arrListInfo = fnReleach($RelList);

            fnState.prototype.SelectState = function(state,width,height){
                return this[state](width,height);
            };
            fnBoxMode.prototype.SelectBoxMode = function(mode,Dom,title){
                this[mode](Dom,title);
            };
            //新建元素
            fnAddBox();
            var $modal = $("#jc-Mod"),
                $box = $("#jc-Box"),
                $boxCon = $("#box-cen-img"),
                $boxTextWrap = $("#box-text"),
                $boxText = $("#box-text-cen"),
                $closeBtn = $("#box-close"),
                $opera = $("#box-pn"),
                $boxPrev = $("#box-prev"),
                $boxNext = $("#box-next");
            //效果初始化
            var currMode = new fnBoxMode(),
                arrImgObj = [];
            for(var h in arrListInfo){
                //匹配列表模式
                arrListInfo[h][1] == undefined?thisMode="view":thisMode="title";
                currMode.SelectBoxMode(thisMode,$RelList.eq(h),arrListInfo[h][1]);
                //创建所有Image()
                if(arrListInfo[h][1] == undefined){
                    arrListInfo[h][1] = "";
                };
                var oImg = new Image();
                oImg.src = arrListInfo[h][0];
                oImg.title = arrListInfo[h][1];
                //oImg.width = arrListInfo[h][2];
                //oImg.height = arrListInfo[h][3];
                //oImg.width = arrListInfo[h][2];    PS:1
                //oImg.height = arrListInfo[h][3];   PS:1
                arrImgObj.push(oImg);
            };
            //图片列表点击事件
            var fnCurrState = new fnState();
            $RelList.unbind("click").bind("click",function(){
                var othis = $(this),
                    _idx = $RelList.index(othis),
                    othisGroup = othis.attr("group"),
                    $thisGroup = $("a[group=\"" + othisGroup +"\"]",$this),
                    arrLoadPos = fnCurrState.SelectState(options.state,nLoadWidth,nLoadHeight);
                arrTmpGroup = [];
                for(var n = 0; n < $thisGroup.length; n++ ){
                    arrTmpGroup.push($RelList.index($thisGroup.eq(n)))
                };
                var TmpPos = 0;
                for(var a in arrTmpGroup){
                    if(arrTmpGroup[a] == _idx){
                        TmpPos = a;
                    };
                };
                fnLoadImg(oloadDom,arrLoadPos,_idx,function(){
                    var arrPos = fnCurrState.SelectState(options.state,this.width,this.height);
                    fnSuccess(arrPos,$(this),this.title,$thisGroup.length);
                });

                $('#box-text-right b').text(_idx+1);
                $("#jc-Mod").css('width', window.innerWidth);
                //左右按钮
                $boxPrev.unbind("click").bind("click",function(){
                    if(TmpPos > 0){
                        TmpPos--;
                        fnOpera(arrTmpGroup,TmpPos,arrImgObj,arrLoadPos);

                    } else {
                        return false;
                    };
                });
                $boxNext.unbind("click").bind("click",function(){
                    if(arrTmpGroup.length-1 > TmpPos){
                        TmpPos++;
                        fnOpera(arrTmpGroup,TmpPos,arrImgObj,arrLoadPos);
                    } else {
                        return false;
                    };
                });
                return false;
            });
            //左右按钮切换
            function fnOpera(groupArr,Pos,objArr,loadpos){
                if(groupArr[Pos]!=undefined){
                    fnLoadImg(oloadDom,loadpos,groupArr[Pos],function(){
                        var arrPos = fnCurrState.SelectState(options.state,this.width,this.height);
                        $boxCon.html("")
                            //.animate({ "height":arrPos[3]
                            .animate({ "height":'100%',
                                       "overflow":'auto'
                            },options.speed,function(){
                                var oimg = objArr[groupArr[Pos]];
                                $(this).html(oimg).find("img").fadeTo(0,0);
                            });
                        $box.animate({
                            //"width":arrPos[2]+20,
                            //"height":arrPos[3],
                            //"left":arrPos[1]-10,
                            //"top":arrPos[0]
                            "width":'1020px',
                            "height":"600px",
                            "left":'50%',
                            "top":'50%',
                            "margin-left":"-510px",
                            "margin-top":"-300px"
                        },options.speed,function(){
                            var cen = $("#box-cen"),
                                img = $("#box-cen-img img"),
                                cenW = cen.width(),
                                cenH = cen.height(),
                                imgW = img.width(),
                                imgH = img.height();

                            if( imgW >= cenW ){
                                cen.scrollLeft((imgW - cenW) / 2);
                            }

                            if ( imgH >= cenH ){
                                cen.scrollTop((imgH - cenH) / 2);
                            }

                            if( imgW <= cenW ){
                                img.css('margin-left', (cenW - imgW) / 2 + 'px');
                            }

                            if ( imgH <= cenH ){
                                img.css('margin-top', (cenH - imgH) / 2 + 'px');
                            }


                            $boxCon.find("img").fadeTo(options.speed,1);
                            $closeBtn.fadeIn(options.speed);
                            if(groupArr.length){
                                $opera.fadeIn(options.speed);
                            };
                            if(objArr[groupArr[Pos]].title!=""){
                                $boxText.text(objArr[groupArr[Pos]].title);
                                var textWidth = $boxTextWrap.width();
                                $boxTextWrap.css({"left":"0","top":"-20px","display":'block'});
                            };
                        });

                        $('#box-text-right b').text(Pos+1);

                    });
                }
                return false;
            }
            //预览图加载完毕位置
            function fnSuccess(size,$img,title,groupBool){
                $boxCon.html("").animate({
                    //"height":size[3]
                    "height":'100%',
                    "overflow":'auto'
                },options.speed,function(){
                    $(this).html($img).find("img").fadeTo(0,0);
                });
                $box.animate({
                    //"width":size[2]+20,
                    //"height":size[3],
                    //"left":size[1]-10,
                    //"top":size[0]
                    "width":'1020px',
                    "height":"600px",
                    "left":'50%',
                    "top":'50%',
                    "margin-left":"-510px",
                    "margin-top":"-300px"
                },options.speed,function(){
                    var cen = $("#box-cen"),
                        img = $("#box-cen-img img"),
                        cenW = cen.width(),
                        cenH = cen.height(),
                        imgW = img.width(),
                        imgH = img.height();

                    if( imgW >= cenW ){
                        cen.scrollLeft((imgW - cenW) / 2);
                    }

                    if ( imgH >= cenH ){
                        cen.scrollTop((imgH - cenH) / 2);
                    }

                    if( imgW <= cenW ){
                        img.css('margin-left', (cenW - imgW) / 2 + 'px');
                    }

                    if ( imgH <= cenH ){
                        img.css('margin-top', (cenH - imgH) / 2 + 'px');
                    }


                    $boxCon.find("img").fadeTo(options.speed,1);
                    $closeBtn.fadeIn(options.speed);
                    if(groupBool){
                        $opera.fadeIn(options.speed);
                    };
                    if(title!=""){
                        $boxText.text(title);
                        var textWidth = $boxTextWrap.width();
                        $boxTextWrap.css({"left":"0","top":"-20px","display":'block'});
                    };
                });
            };
            //关闭预览图
            $closeBtn.bind("click",function(){
                closeBox($box);
                setTimeout(function(){
                    closeBox($modal);
                },options.speed);
            });
            $modal.bind("click",function(){
                setTimeout(function(){
                    closeBox($box);
                    setTimeout(function(){
                        closeBox($modal);
                    },options.speed);
                },options.speed);
            });
            //图片列表bover动作
            $RelList.hover(function(){
                var $thisA = $(this);
                if($thisA.data("value") == "rel"){
                    $thisA.find("span").fadeTo(options.listSpeed,.6).next().animate({"bottom":nTextBottom,"opacity":1},options.listSpeed);
                    return false;
                }
                $thisA.find("div").fadeTo(options.listSpeed,.4).next().fadeTo(options.listSpeed,.7);
                return false;
            },function(){
                var $thisA = $(this);
                if($thisA.data("value") == "rel"){
                    $thisA.find("b").animate({"bottom":0,"opacity":0},options.listSpeed).prev().fadeTo(options.listSpeed,0);
                    return false;
                }
                $thisA.find("div").fadeTo(options.listSpeed,0).next().fadeTo(options.listSpeed,0);
                return false;
            });
            //盒子状态指针方法
            function currState(){
                alert("curr")
            }
            function fadeState(nw,nh){
                var scrollTop = $window.scrollTop(),
                _w = nw,
                    _h = nh,
                    _l = (nWinWidth-_w)/2,
                    _t = (nWinHeight-_h)/2;
                return [_t,_l,_w,_h];
            }
            function topState(){
                alert("top")
            }
            //预览图loading
            function fnLoadImg(Dom,arrSize,index,callback){
                fnModal("open");
                $closeBtn.hide();
                $opera.hide();
                $boxTextWrap.hide();
                $boxCon.animate({
                    "height":arrSize[3]
                },options.speed,function(){
                    $('#box-cen').css('height', 'auto');
                    $(this).html(Dom);
                });
                $box.animate({"width":50,
                    "height":"52px",
                    "left":arrSize[1],
                    "top":arrSize[0]
                },options.speed,function(){
                    $(this).fadeIn(options.speed,function(){
                        $('#box-cen').css('height', '86%');
                        oImg = arrImgObj[index];
                        if (oImg.complete) {
                            callback.call(oImg);
                            return false;
                        }
                        oImg.onload = function(){
                            callback.call(oImg);
                        };
                        return false;
                    });
                });
                return false;
            }
            //预览图模态
            function fnModal(state){
                var opa = 0;
                if(state == "open"){
                    opa = options.setModal.opacity;
                }
                $modal.fadeTo(options.speed,opa);
            }
            //关闭预览图
            function closeBox(Dom){
                $opera.fadeOut(options.speed);
                $closeBtn.fadeOut(options.speed);
                $boxTextWrap.fadeOut(options.speed);
                Dom.delay(100).fadeOut(options.speed,function(){
                    $(this).hide();
                });
            }
            //列表模式指针方法
            function viewMode(Dom,title){
                listHover = "<div></div><samp></samp>";
                Dom.data("value","view").append(listHover).find("div").fadeTo(0,0).next().fadeTo(0,0);
            }
            function relMode(Dom,title){
                listHover = "<span></span><b>"+ title +"</b>";
                nTextHeight = Dom.find("span").height();
                nTextBottom = parseInt(Dom.find("span").css("bottom"));
                Dom.find("b").css({"bottom":-nTextHeight,"opacity":0});
            }
            //遍历缩略图信息
            function fnReleach(list){
                var arrList = [];
                for(var c = 0; c < list.length; c++){
                    var curr = list.eq(c),
                        thisRel = curr.attr("rel"),
                        thisTitle = curr.attr("title"),
                        thisHeight = parseInt(curr.attr("height")),
                        thisWidth = parseInt(curr.attr("width"));

                    arrList.push([thisRel,thisTitle,thisWidth,thisHeight]);
                };

                return arrList;
            };


            return false;
        });
    };
})(jQuery);


$(function(){

    $("#DeriveImg").DeriveImg({
        speed : 200,
        listSpeed : 200,
        setLood : {
            path : "/static/images/v1/loading.gif",
            width : 32,
            height : 32
        },
        setModal : {
            bgColor : "#000",
            opacity : .6
        },
        state : "fade"
    });

});
