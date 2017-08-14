window.____DEBUG___ = true;
(function () {

    if (window.__sg__sef_runningcfg__) return;
    //console.log('will make a defualt config');
    window.__sg__sef_runningcfg__ = {
        Greeting:'欢迎你使用EAP系统',//欢迎词
        Version: '20.0.1',
        Name: "EAP",
        Title: "电梯行业高级管理平台",
        CustomerLogo:'',//客户LOGO
        License: "FULL",
        LANG:'cn',
        EnableAd:true,//启用AD验证
        Launch: "sef.core.view.security.LoginPage",
        DefaultUIMode: 'l-t',//l-t,t-b,t-b-s,
        LoadAppsOnce:false,//一次性加载所有APP，适用于内网环境
        DefaultToken:'Dashboard',
        
        GridEmptyText:'<div class="grid-no-data">还没有数据，你可以添加或者更改查询条件</div>',
        ProfileApi:'/mock/profile.json',
        LoginApi:'/login.json',
        ChangePwdApi:'/mock/changepwd.json',
        MessageInterval:10,//消息任务的节拍，单位为分钟
        MessageApi:'/mock/message.json',
        UpdateLogUrl:'/mock/updatelog.json'
    };
})();

//console.log('here is running config');

function _(text){
    
    if(sef){
        var langCode='';
        if(sef.runningCfg){
            langCode=sef.runningCfg.getLang();
        }else{
            langCode=window.localStorage.getItem('__sef__ld__-LANG')
        }
        if(!langCode){
            langCode=window.__sg__sef_runningcfg__.LANG;
        }
        
        //console.log('new langCode#',langCode);
        var lang=sef.lang[langCode];
        var nt;
        if(lang){
            nt=lang[text];
        }
        //var nt=sef.lang[langCode]&&sef.lang[langCode].text;
        if(nt)return nt;
        
    }
    //console.log('lang#',text);
    return text;
}