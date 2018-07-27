//首页标
var mySwiper = new Swiper('.Project-swiper',{
    pagination: '.swiper-pagination',
    paginationClickable: true,
    slidesPerView : 3,
    slidesPerGroup : 3,
    spaceBetween:46,
    prevButton:'.Project-prev',
    nextButton:'.Project-next'
});
//banner图
var swiper2 = new Swiper('.banner-swiper', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    centeredSlides: true,
    autoplay: 5000,
    autoplayDisableOnInteraction: false,
    loop: true,
    prevButton:'.banner-prev',
    nextButton:'.banner-next'
});
// 关闭注册框
$('.banner-card').on('click','.remo',function () {
    $(this).parent().parent().parent().parent().hide();
    $('.Project').css('z-index','1')
});
//注册跳转登录
$('.banner-card ol').on('click','#loginshow',function (event) {
     window.open('https://www.huirendai.cn/user/login');var a=document.getElementsByClassName()
});
$('#index-homepage').click(function (event) {
    event = event ? event : window.event;
    var target = event.target || event.srcElement;
    if(target.id=='index-homepage'){
        $(this).hide();
    }else{
        return false;
    };

});
//显示注册框
$('.greenHand').on('click','#greenHand-alert',function () {
    $('#index-homepage').show();

});
//首页标交互
$(".Project-submit").hover(
    function () {$(this).css('background','#e96309')
    }, function () {
        $(this).css('background','#f56b0f')
    }
);
$('.Project-swiper .swiper-slide').hover(function(){
    $(this).children('.Project-submit').css({'background':'#f56b0f',"color":"#fff",'border-radius':'3px'});
    $(this).css('box-shadow',' 0px 0px 10px rgb(144,144,144)')

},function(){
    $(this).children('.Project-submit').css({'background':'#fff',"color":"#f56b0f",'border-radius':'3px'})
    $(this).css('box-shadow',' 0px 0px 0px ')
});
// 首页动画
domShow($('.BrandStory-c'),'80%',' .BrandStory-c');
domShow($('.Project-info'),'80%',' .Project-info');
domShow($('.VIP-info h6'),'80%',' .VIP-info h6');
function domShow(thanq,offh,thats){
    var i = 0;
    thanq.waypoint( function( direction ) {

        if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
            i++;
            $(this.element).addClass('item-animate');
            setTimeout(function(){
                $('body'+thats+'.item-animate').each(function(k){
                    var el = $(this);
                    setTimeout( function () {
                        var effect = el.data('animate-effect');
                        el.addClass(effect);//读取自定义属性值中设定的动画名称添加到元素类中

                        el.removeClass('item-animate');
                    },  k * 200, 'easeInOutExpo' );//根据顺序分别为每个元素添加过渡动画时间
                });
            }, 100);
        }
    } , { offset: offh } );
}


$('.BrandStory').children('.h6s').waypoint(function() {
    $('.BrandStory').children('.h6s').addClass("fadeInUp");
}, { offset: '80%' });
$('.BrandStory').children('.ps').waypoint(function() {
    $('.BrandStory').children('.ps').addClass("fadeInUp");
}, { offset: '80%' });
$('.AboutUs-info').children('p').waypoint(function() {
    $('.AboutUs-info').children('p').addClass("fadeInUp");
}, { offset: '80%' });
$('.AboutUs-info').children('a').waypoint(function() {
    $('.AboutUs-info').children('a').addClass("fadeInUp");
}, { offset: '80%' });
$('.AboutUs-info').children('h6').waypoint(function() {
    $('.AboutUs-info').children('h6').addClass("fadeInUp");
}, { offset: '80%' });
$('.gengduo').waypoint(function() {
    $('.gengduo').addClass("fadeInUp");
}, { offset: '80%' });
$('.VIP-info a').waypoint(function() {
    $('.VIP-info a').addClass("fadeInUp");
}, { offset: '80%' });
$('.partner-info').children('h6').waypoint(function() {
    $('.partner-info').children('h6').addClass("fadeInUp");
}, { offset: '80%' });
$('.partner-info').children('.partner-img').eq(0).waypoint(function() {
    $('.partner-info').children('.partner-img').eq(0).addClass("fadeInUp");
}, { offset: '80%' });
$('.partner-info').children('.partner-img').eq(1).waypoint(function() {
    $('.partner-info').children('.partner-img').eq(1).addClass("fadeInUp");
}, { offset: '80%' });
$('.BrandStory-info').children('.as').waypoint(function() {
    $('.BrandStory-info').children('.as').addClass("fadeInUp");
}, { offset: '80%' });
var i = 0;
var a=$('.Project-swiper').children().children('.swiper-slide');
$('.Project-swiper').children().children('.swiper-slide').waypoint( function( direction ) {
    if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
        i++;
        $(this.element).addClass('item-animate');
        setTimeout(function(){
            $('body .Project-swiper .swiper-slide.item-animate').each(function(k){
                var el = $(this);
                setTimeout( function () {
                    var effect = el.data('animate-effect');
                    el.addClass(effect);//读取自定义属性值中设定的动画名称添加到元素类中

                    el.removeClass('item-animate');
                },  k * 200, 'easeInOutExpo' );//根据顺序分别为每个元素添加过渡动画时间
            });
        }, 100);
    }
} , { offset: '80%' } );
//首页标跳转
$('.greenHand-bottom .uls').on('click','li.noAccomplish',function(){
    var URL=$(this).attr('data-url');
    window.location.href=URL;
});
$('.Project-swiper .swiper-wrapper').on('click','.swiper-slide',function(){
    var URL=$(this).attr('data-url');
    window.location.href=URL;
});
