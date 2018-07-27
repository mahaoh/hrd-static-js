/**
*
* 转让单笔债权计算方法
*
* */
(function(){

    //舞台演员
    var FeePct = Number($('#transferFeePct').val()); // 费率
    var Detail = Number($('#transferDetail').val()); // 公允价值
    var feect = Number($('#transferfeect').text()); // 可转让份数
    var investAmt = Number($('#originalInvestAmt').text()); // 原始投资额

    var _free = $('#transferFree'); // 舞台
    var free = 0; // 舞台初始值
    var _radio = true; // 协议初始值
    var Subo,Subt,Subl; // 提交初始值

    var _d = $('#transfer_each_money'); // 转让单价
    var _z = $('#transfer_money'); // 转让总价格
    var _f = $('#transfer_fee_amt'); // 转让费用
    var _y = $('#profit_norm_int_amt'); // 预计收入金额

    var d = 0; // 转让单价
    var z = 0; // 转让总价格
    var f = 0; // 转让费用
    var y = 0; // 预计收入金额

    var pass = $('#paypassword');
    var html1 = $('.from-callO');
    var html2 = $('.from-callT');

    //价格换算
    var IFmey = {
        Calculate : function(paren,even){
            return Number(paren * even).toFixed(2);
        },
        CalculateO : function(paren,even){
            return Number(paren - even).toFixed(2);
        },
        // 输入基本规则
        test : /^[0-9]+$/,
        getInput: function (value) {
            if (value == '') {
                return 0;
            }

            //复用可删除
            if ( value > feect ){
                return feect;
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
        // 表单验证
        textInput : function(value){
            if( value == '' || value == 0 ) {
                return html1.html('请填写转让份额');
            }
        },
        passInput : function(value){
            if( value == '' || value == 0 ) {
                return html2.html('请输入支付密码');
            }
        },
        // 提交验证
        Submit : function(){
            var pss = $('#paypassword').val();

            if ( free == 0 || free == '' || free == '请输入购买份数' ){
                IFmey.textInput(free);
                Subo = 0;
            }else{
                Subo = 1;
            }

            if ( pss == 0 ){
                IFmey.passInput(pss);
                Subt = 0;
            }else{
                Subt = 1;
            }

            if ( !_radio ){
                $('.coon').css('display','block');
                Subl = 0;
            }else{
                Subl = 1;
            }

        }
    };
    label(
        'calc-input',
        'label',
        function(){
            _radio = true;
            $('.coon').css('display', 'none');
        },
        function(){
            _radio = false;
        }
    );

    //核心验算
    $(function(){
        if( $('#transferCoefficient')[0] ) var ficient = Number(Number(String($('#transferCoefficient option:selected').val()).split('%'))/100); // 转让系数
        $('#transferCoefficient').bind('change', function () {
            ficient = Number(($('#transferCoefficient option:selected').val().replace('%',''))/100); // 转让系数
            d = IFmey.Calculate(Detail,ficient); // 转让单价
            if(free != feect){
                z = IFmey.Calculate(d,free); // 转让总价格
            } else {
                z = IFmey.Calculate(d,Number(investAmt/100).toFixed(2));
            }
            //f = IFmey.Calculate(z,Number(FeePct/100).toFixed(2)); // 转让费用
            f = IFmey.Calculate(z,Number(FeePct/100).toFixed(5)); // 转让费用
            y = IFmey.CalculateO(z,f); // 预计收入金额
            _d.html(d);_z.html(z);_f.html(f);_y.html(y);
        });
        _free.focus(function () {
            if( $(this).val() == '请输入购买份数' ){
                $(this).val(0);
            }
            $(this).css('color', '#000');
            html1.html('');
        });
        _free.keyup(function(){
            ficient = Number(Number(String($('#transferCoefficient option:selected').val()).split('%'))/100); // 转让系数
            free = Number($(this).val()); // 转让份数
            free = Number(IFmey.getInput(free));
            IFmey.textInput(free);
            $(this).val(free);
            d = IFmey.Calculate(Detail,ficient); // 转让单价
            if(free != feect){
                z = IFmey.Calculate(d,free); // 转让总价格
            } else {
                z = IFmey.Calculate(d,Number(investAmt/100).toFixed(2));
            }
            //f = IFmey.Calculate(z,Number(FeePct/100).toFixed(2)); // 转让费用
            f = IFmey.Calculate(z,Number(FeePct/100).toFixed(5)); // 转让费用
            y = IFmey.CalculateO(z,f); // 预计收入金额
            _d.html(d);_z.html(z);_f.html(f);_y.html(y);

        });

        _free.blur(function () { IFmey.textInput(free); });
        pass.focus(function(){ html2.html(''); });
        pass.blur(function () { pass = $(this).val(); IFmey.passInput(pass); });
        pass.keyup(function () { html2.html(''); pass = $(this).val(); IFmey.passInput(pass); });
        $('.cre-a').bind('click', function () {
            cmdEncrypt($('#paypassword').val(),$('#paypasswords'))
            IFmey.Submit();

            if ( Subo == 0 || Subl == 0 || Subt == 0 ){
                return false;
            }else{
                return true;
            }

        });
    });

    $(window).unload(function(){ $('#transferFree').css('color','#ccc').val('请输入购买份数');$('#transferCoefficient option:selected').val(100) });
    function cmdEncrypt(str,that){
        var rsa = new RSAKey();
        var modulus = "D2B2A26451479928A48DD65E4188D3DC034C29388A2E212690A5148B7240E63E5D82A3BEE7F43CE2338B130BA81BC6834A3B875FDB54C7E0705B9FB843CD72034722170542DA6BCC2BA6C6142F141A33D4F9A21608F0579D1D9C866B5F8F5B4D002EB4EB57C5BF22B9FE45FC42B8A2DC1DFDA39642D4F90A5317732B2D60AF41";
        var exponent = "10001";
        rsa.setPublic(modulus, exponent);
        var res = rsa.encrypt(str);
        that.val(res)
    };
})();
