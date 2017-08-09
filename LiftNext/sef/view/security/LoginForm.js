//Login Form
Ext.define('sef.core.view.security.LoginForm', {
    extend: 'Ext.container.Container',
    xtype: 'sef-loginform',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    minWidth: 400,
    padding: '30px 30px 60px 30px',
    defaultFocus: 'textfield:focusable:not([hidden]):not([disabled]):not([value])',
    cls: 'sef-loginform-container',

    makeRememberMe: function() {
        return {
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            margin: '0 0 12px 0',
            items: [{
                xtype: 'checkbox',
                boxLabel: _('Login with AD'),
                flex: 1,
                reference:'withAD',
                bind:{
                    hidden:'{!EnableAd}'
                }
            }, {
                xtype: 'checkbox',
                reference:'rememberMe',
                boxLabel: _('Remember me')
            }]
        }
    },

    makeLoginForm: function() {
        var items = [{
            xtype: 'box',
            cls: 'loginform-logo',
            html: '<span class="logo"></span>'
        }, {
            xtype: 'textfield',
            ui: 'sefu-login-field',
            emptyText: _('用户名'),
            reference:'loginName',
            margin: '0 0 20px 0',
            bind:{
                value:'{LastLoginName}'
            },
            enableKeyEvents:true,
            minLength:6,
            listeners:{
                keydown:'onFieldKeyDown'
            }
        }, {
            xtype: 'textfield',
            ui: 'sefu-login-field',
            inputType: 'password',
            reference:'loginPwd',
            emptyText: _('密码'),
            margin: '0 0 20px 0',
            enableKeyEvents:true,
            value:'abcddeff',
            minLength:6,
            listeners:{
                keydown:'onFieldKeyDown'
            }
        }, this.makeRememberMe(), {
            reference:'btnLogin',
            xtype: 'button',
            scale: 'medium',
            text: 'Login',
            handler: 'onLogin'
        }];

        return items;
    },

    initComponent: function() {
        Ext.apply(this, {
            items: this.makeLoginForm() //[this.makeBrandBox(), this.makeLoginFormBox()]
        });
        return this.callParent(arguments);
    }
});