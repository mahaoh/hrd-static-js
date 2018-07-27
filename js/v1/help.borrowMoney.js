$(function () {
    function colAjax(url,obj){
        var v ='<div class="row"><span class="col-12">',s='</span></div>';
        var pare = $(obj).parent().parent().next().find('.rowAjax');
        var rowAjaxH2 = $(obj).parent().parent().next().find('.rowAjaxH2');
        var od_no = $(obj).attr('od_no');
        if(pare.attr('so') != '0'){
            pare.html(v+'数据传输中，请等待...'+s);
            $.ajax({
                type:'POST',
                url:'/account/repayment/list',
                data:url,
                dataType:'json',
                async:'false',
                success:function(data) {
                    var num = data.data.length;
                    var txt = '';
                    if(num == 0){ txt+= v+'暂无数据'+s; }
                    else{

                        if($('#isFlag').val()=='Y'){

                            for(var i=0; i<num; i++) {
                                var status;
                                if(data.data[i].ostatus  != 1 || data.data[i].ostatus != '1') status='否'; else status='是';
                                txt += '<div class="row">' +
                                    '<span class="col-1-05">'+ data.data[i].repaymentYesTime +'</span>' +
                                    '<span class="col-1">'+ data.data[i].timeLimit +'</span>' +
                                    '<span class="col-2">'+ data.data[i].repaymentAccountEx +'元</span>' +
                                    '<span class="col-1">'+ data.data[i].lateDays +'</span>' +
                                    '<span class="col-2">'+ data.data[i].lateInterest +'元</span>' +
                                    '<span class="col-2">'+ data.data[i].repaymentYesaccountTotal +'元</span>' +
                                    '<span class="col-1">'+ data.data[i].psOdInd +'</span>' +
                                    '<span class="col-1">'+ status +'</span>' +
                                    '</div>';
                            }
                            rowAjaxH2.html('<p>期供总额: '+data.rm_accont_count+'</p><p>逾期金额: '+data.late_interest_count+'</p><p>实还总额: '+data.rm_yes_account_count+'</p>');


                        }else{
                            for(var i=0; i<num; i++) {
                                var status;
                                if(data.data[i].status  != 1 || data.data[i].status != '1'){
//                                        if(Number(od_no) >= data.data[i].order)
                                    status='<a i="'+data.is_set_paypwd+'" borrowId="'+data.data[i].borrowId+'" repaymentId="'+data.data[i].repaymentId+'" add-yue="'+data.data[i].borrowId+'" add-yh="'+data.data[i].repaymentYesaccountTotal+'" add-bai="'+data.data[i].repaymentAccount+'" add-money="'+data.data[i].lateInterest+'" add-fee="'+data.data[i].psFeeAmt+'" add-yuq="'+data.data[i].repaymentAccountSum+'"  add-ycz="'+data.data[i].userRepayMoney+'" class="add" href="javascript:">还款</a>';
//                                        else
//                                           status='-';
                                }
                                else{
                                    status='-';
                                }
                                txt += '<div class="row">' +
                                    '<span class="col-1-05">'+ data.data[i].repaymentShowtime +'</span>' +
                                    '<span class="col-05">'+ data.data[i].timeLimit +'</span>' +
                                    '<span class="col-1-05">'+ data.data[i].repaymentAccountEx +'元</span>' +
                                    '<span class="col-1">'+ data.data[i].lateDays +'</span>' +
                                    '<span class="col-1-05">'+ data.data[i].lateInterest +'元</span>' +
                                    '<span class="col-1-05">'+ data.data[i].repaymentYesaccountTotal +'元</span>' +
                                    '<span class="col-1-05">'+ data.data[i].repaymentAccountSum +'元</span>' +
                                    '<span class="col-05">'+ data.data[i].psOdInd +'</span>' +
                                    '<span class="col-1">'+ status +'</span>' +
                                    '</div>';
                            }
                        }

                    }
                    if(data.pre_status == '1'){
                        pare.next().find(".ppErInd").text('提前还款').addClass('odd').attr('i',data.borrowId);
                    }else{
                        pare.next().find(".ppErInd").html('');
                    }

                    pare.html(txt);pare.attr('so', '1');
                },
                error:function(data) {
                    pare.html(v+'数据获取失败，请重试！'+s);
                }
            });
        }
    }
    $('a.tz').bind('click',function() { if( $(this).parents('.row').attr('so') == 0 ) colAjax($(this).attr('data-time'), this) });
});
$(window).load(function(){
    //错误弹窗操作
    function endtext(txt,url,but){
        var clicko = $('#endPlay-click');
        $("#endPlay").show();
        $(".payment-dialog").css({'height':'260px','margin-top':'-130px'});
        $("#endPlay .payment-jg").html(txt);
        function playhide(){ $('#endPlay').hide(); $('#endPlay .payment-jg').html('您当期或以前账期有借款未还。请先还清应还借款，才可提前还款哦！')}
        if(url == null || url == undefined || url == '') clicko.bind('click',function(){ playhide() }); else if(url == 'reload') clicko.bind('click',function(){ location.reload(); }); else clicko.attr('href',url);
        if(but != null || but != undefined || but != '') clicko.html(but);
        $('.payment-header em').bind('click',function(){ playhide() });

    }
    $(document).on('click','a.odd',function() {
        var win = $('#addPlay'),
            end = $('.payment-header em'),
            but = $('#add-button'),
            error = $('#payment-error'),
            sub = 0,radio = 1,
            pass = $('#addInput'),
            i = $(this).attr('i');

        $.ajax({
            type:'POST',
            url:'/account/repayment/list',
            data:'action=pre_check&borrowId='+i,
            dataType:'JSON',
            async:'false',
            success:function(data) {
                if(data.code == '000'){
                    $('#add-y').html(data.data.borrowId);   //ID
                    $('#loanOsPrcp').show();$('.loanOsPrcp').html(data.data.loanOsPrcp);
                    $(".addPlay .payment-dialog").css({'height':'450px','margin-top':'-225px'});
                    $('#add-b').html(data.data.psAllAmt);     //实际扣款金额
                    $('#add-j').prev().text("提前还款违约金:");
                    $('#add-j').html(data.data.psALLPenaltyFee);   //应提前还款违约金
                    $('#add-s').html(data.data.paymentAmount);     //应还款总金额
                    $('#add-fee').html(data.data.relDepositFee).prev().text('释放保证金:').parent().show();   //释放保证金
                    win.show();
                }else if(data.code == '105'){
                    endtext(data.msg,'/account/paypwd/set');
                }else{
                    endtext(data.msg);
                }
            },
            error:function(data) {
                endtext('本次操作未提交成功，请稍后重试！');
            }

        });

        end.bind('click',function(){ win.hide(); error.html('');$(".addPlay .payment-dialog").removeAttr('style');$('#add-fee').text(0).prev().text('管理费:').parent().hide();$('#loanOsPrcp').hide(); });
        $('#endPlay-click').bind('click',function(){ $("#endPlay").hide() });
        pass.on('focus', function () {sub = 0; if( $(this).val() == '' ) error.html('');but.removeAttr('style').removeAttr('disabled'); });
        pass.on('blur', function () { if( $(this).val() == '' ) error.html('请输入支付密码！'); });

        //提交
        var butarr = 0;
        but.unbind('click').on('click', function () {
            var _this = $(this);
            _this.attr("disabled","disabled").css("background","#DDD");
            error.html('<b style="color:#4cc8c8;">提交中，请稍后...</b>');
            if(butarr == 0){
                $.ajax({
                    type:'POST',
                    url:'/account/repayment/list',
                    data:'action=pre_repay&borrowId='+$('#add-y').text()+'&payPwd='+pass.val(),
                    dataType:'JSON',
                    async:'false',
                    success:function(data) {
                        if( data.code == '000' ) {
                            win.hide();$('#loanOsPrcp').hide();but.removeAttr('style').removeAttr('disabled');error.html('');pass.val('');

                            $('#' + textOnclick.txt).css({
                                'height':'90px',
                                'width':'110%',
                                'line-height':'28px',
                                'margin-left':'-4%',
                                'padding-top':'11px',
                                'font-size':'14px'
                            }).html('还款成功！本次成功还款'+data.data.paymentAmount+'元。<br />感谢您使用惠人贷贷款融资，我们已经将您的还款汇入相关投资人账户');
                            $('#' + textOnclick.user).show();
                            $('#' + textOnclick.button).bind('click',function() {
                                location.reload();
                            });
                        }else{
                            error.html(data.msg);
                        }
                        butarr=0;_this.removeAttr("disabled").removeAttr("style");
                    },
                    error:function(data) {
                        error.html('本次操作未提交成功，请稍后重试！');
                        butarr=0;_this.removeAttr("disabled").removeAttr("style");
                    }

                });
            }
            butarr++;

        });



    });
    var trial = true;
    $(document).on('click','a.add',function() {
        var win = $('#addPlay'),
            end = $('.payment-header em'),
            but = $('#add-button'),
            error = $('#payment-error'),
            sub = 0,radio = 1,
            pass = $('#addInput'),
            that = $(this);


        var ycz = Number(that.attr('add-ycz'));
        var ddb = that.attr('add-yuq');
        var borrowId = that.attr('borrowId'),
            repaymentId = that.attr('repaymentId');

        if(ycz != 0){
            endtext('<b style="text-align:left;display:block">对不起，您的账户余额不足，请先充值。本次还款金额'+ddb+'元，还需充值'+ycz+'元。</b>','/account/recharge','去充值');
        }else{

            if(trial){


                $.ajax({
                    type:'POST',
                    url : '/account/single/trial',
                    data: 'borrowId='+ borrowId +'&repaymentId=' +repaymentId,
                    dataType:'json',
                    async:'false',
                    success:function(data){


                        if(data.code == '000'){


                            //文字改变
                            var addId = that.attr('add-yue');//还款ID
                            var repaymentId = that.attr('repaymentId');
                            $('#add-y').html(addId);   //类型
                            $('#add-b').html(that.attr('add-bai'));     //百分比
                            $('#add-j').html(that.attr('add-money')).prev().html('逾期利息:');   //金额
                            $('#add-s').html(that.attr('add-yuq'));     //预期收益
                            $('#add-fee').html(that.attr('add-fee'));   //管理费
                            $('#add-yh').html(that.attr('add-yh'));   //已还金额
                            $(".addPlay .payment-dialog").css({'height':'460px','margin-top':'-230px'});
                            $('#add-j').parent().next().show();
                            $('#add-j').parent().next().next().show();
                            var i = that.attr('i');  //id

                            //连接替换
                            $('#addHref').attr('href','/financePlan/protocol/'+i);

                            //弹窗操作
                            function winhide(){ $("#endPlay").hide(); win.hide();$(".addPlay .payment-dialog").removeAttr('style');$('#add-fee').parent().hide();$('#add-yh').parent().hide();$('#appendJG').remove();$('#payment-jg dl').show(); }
                            if(that.attr('i') == '0') endtext('您未设置支付密码，请先设置支付密码后再操作','/account/paypwd/set'); else win.show();
                            end.bind('click',function(){ winhide(); error.html('') });
                            $('#endPlay-click').bind('click',function(){ winhide() });
                            pass.on('focus', function () {sub = 0; if( that.val() == '' ) error.html('');but.removeAttr('style').removeAttr('disabled'); });
                            pass.on('blur', function () { if( that.val() == '' ) error.html('请输入支付密码！'); });


                            if( data.data.mtdCde == 'M006' ){


                                var jg = $('#payment-jg');

                                jg.children().hide();
                                $('.payment-dialog').css({'height':'515px','margin-top':'-257px'});

                                var soTXT = '<dl id="appendJG"><dd><span>项目ID:</span><p>'+data.data.borrowId+'</p></dd>' +
//                                                             '<dd><span>提前还款日费率:</span><p>'+data.data.wyFeePct+'%</p></dd>' +
                                    '<dd><span>管理费:</span><p>'+data.data.feeManage+'</p></dd>' +
                                    '<dd><span>违约金:</span><p>'+data.data.feePrepayment+'</p></dd>' +
                                    '<dd><span>罚息:</span><p>'+data.data.lateIntAll+'</p></dd>' +
                                    '<dd><span>应还本金:</span><p>'+data.data.borrowCapital+'</p></dd>' +
                                    '<dd><span>应还利息:</span><p>'+data.data.borrowInterest+'</p></dd>' +
                                    '<dd><span>应还金额:</span><p>'+data.data.money+'</p></dd></dl>';
                                jg.append(soTXT);

                            }

                            //提交
                            var butarr = 0;
                            but.unbind('click').on('click', function () {
                                var _this = that;
                                _this.attr("disabled","disabled").css("background","#DDD");
                                error.html('<b style="color:#4cc8c8;">提交中，请稍后...</b>');
                                if(butarr==0){
                                    $.ajax({
                                        type:'POST',
                                        url:'/account/repayment/list',
                                        data:'action=repay&repaymentId='+repaymentId+'&payPwd='+pass.val(),
                                        dataType:'JSON',
                                        async:'false',
                                        success:function(data) {
                                            $(".addPlay .payment-dialog").removeAttr('style');
                                            if( data.code == '000' ) {
                                                win.hide();$(".addPlay .payment-dialog").removeAttr('style');$('#add-fee').parent().hide();but.removeAttr('style').removeAttr('disabled');error.html('');pass.val('');
                                                $('#' + textOnclick.txt).css({
                                                    'height':'90px',
                                                    'width':'110%',
                                                    'line-height':'28px',
                                                    'margin-left':'-4%',
                                                    'padding-top':'11px',
                                                    'font-size':'14px'
                                                }).html('还款成功！<br />感谢您使用惠人贷贷款融资，我们已经将您的还款汇入相关投资人账户');
                                                $('#' + textOnclick.user).show();
                                                $('#' + textOnclick.button).bind('click',function() {
                                                    location.reload();
                                                });
                                            }else{
                                                error.html(data.msg);
                                            }
                                            butarr=0;_this.removeAttr("disabled").removeAttr("style");
                                        },
                                        error:function(data) {
                                            error.html('本次操作未提交成功，请稍后重试！');
                                            butarr=0;_this.removeAttr("disabled").removeAttr("style");
                                        }

                                    });
                                }
                                butarr++;
                            });


                        }else{

                            endtext(data.msg,'reload');

                        }

                        trial = true;
                    },
                    error:function(data){
                        endtext(data.msg);
                        trial = true;
                    }
                });


            }

            trial = false;

        }
    });
    textOnclick.text();
});