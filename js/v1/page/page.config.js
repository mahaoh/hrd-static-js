/**
 *
 * 内部组件说明文档
 *
 */

{
   let PlugUnitArr = {

       alert : {
           init: { alt: '弹窗初始化内容框架', url: require('./alert/init')}
       }
       ,
       user : {
           imts: { alt: '基础校验规则算法', url: require('./user/imts')}
           ,
           phone_captcha: { alt: '短信验证码多功能校验', url: require('./user/phone_captcha')}
           ,
           buttonColor: { alt: '提交按钮效果', url: require('./user/buttonColor')}
       }
       ,
       error : {
           prompt: { alt: '错误信息分类单独显示', url: require('./error/prompt')}
       }
   }
}

