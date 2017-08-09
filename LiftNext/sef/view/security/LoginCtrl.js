//LoginCtrl.js

Ext.define('sef.core.view.security.LoginCtrl', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.sefc-loginctrl',

    init: function() {
        //console.log('login window.init');
        var cfg = window.__sg__sef_runningcfg__;
        //console.log('init#',cfg);
        this.getViewModel().setData(cfg);
        var loginInfo=sef.runningCfg.getLocal('LOGIN_INFO');
        if(loginInfo){
            this.getViewModel().setData(loginInfo);
        }
        //console.log(this.getViewModel().getData());
    },

    onFieldKeyDown: function(field, key) {
        if (key.getKey() === Ext.event.Event.ENTER) {
            //console.log('enter now',field);
            if (field.reference === 'loginName') {
                this.lookupReference('loginPwd').focus();
            } else {
                this.onLogin(this.lookupReference('btnLogin'));
            }
        }
        //console.log('key will down',field,key.getKey(),Ext.event.ENTER);
    },

    onLogin: function(btn) {
        //console.log('will do login', btn);
        var me = this,
            refs = this.getReferences();
        //console.log(refs);
        var loginName = refs.loginName.value;
        var loginPwd = refs.loginPwd.value;
        var withAD=refs.withAD.checked;
        var remMe=refs.rememberMe.checked;
        if (Ext.isEmpty(loginName) || Ext.isEmpty(loginPwd)) {
            sef.message.error(_('无效的用户名和密码'));
            return;
        }
        btn.setLoading(true);
        sef.utils.ajax({
            url: sef.runningCfg.get('LoginApi'),
            method:'POST',
            paramAsJson:true,
            jsonData: {
                UserName: loginName,
                UserPwd: loginPwd,
                WithAD: withAD,
                RememberMe: remMe,
                UIMode:sef.runningCfg.getUIMode()
            },
            scope: me,
            success: function(result) {
                sef.runningCfg.setUser(result);
                //if(remMe)
                sef.runningCfg.addLocal('LOGIN_INFO',{
                    LastLoginName:loginName
                });
                //sef.runningCfg.addLocal('LAST_LOGIN_USER',result);
                this.fireViewEvent('loginsuccess');
                //console.log('login done',result,loginName,remMe);
                 //btn.setLoading(false);
            },
            failure: function(err, resp) {

                sef.dialog.error(err.message);
                btn.setLoading(false);
                console.log('login error', err);
            }
        });
        return;

        sef.dialog.error('用户密码或密码错误', 'title', function() {
            console.log('dialog will be ok close');
            btn.setLoading(false);
        });
        return;
        sef.notification.success('系统提示',
            'I will never close automatically. I will be close automatically. I will never close automatically.');
        sef.notification.error('系统提示',
            'I will never close automatically. I will be close automatically. I will never close automatically.');
        sef.notification.warning('系统提示',
            'I will never close automatically. I will be close automatically. I will never close automatically.');
        sef.notification.open('系统提示',
            'I will never close automatically. I will be close automatically. I will never close automatically.');
        return;
        sef.message.success("hello,world,here is long text test", 4000, function(t) {
            console.log('ok,it close now#', t);
            btn.setLoading(false);
        });
        sef.message.error('here is error');
        sef.message.warning('here is warning');
        //sef.message.loading('here is loading');
    }
});