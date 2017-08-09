//Main top bar

Ext.define('sef.core.components.bar.MainTopMenubar', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'sef-maintopmenubar',
    ui: 'sefu-maintopmenubar',
    //region: 'north',

    makeUserItems: function() {
        var items = [{
            //iconCls:'x-fa fa-envelope',
            ui: 'sefu-mtb-msg-button',
            tooltip: _('你收到的消息'),
            hidden: true,
            //text: '10+',
            bind: {
                text: '{message_count}',
                hidden: '{message_count<1}'
            }

        }, {
            ui: 'sefu-mtb-button',
            iconCls: 'x-fa fa-language',
            text: 'En',
            tooltip: 'Language',
            bind: {
                text: '{lang}'
            },
            handler: 'onChangeLang'
        }, {
            ui: 'sefu-mtb-button',
            iconCls: 'x-fa fa-th-large',
            //text:'En',
            tooltip: '显示模式',

            handler: 'onChangeUIMode'
        }, '-', {
            ui: 'sefu-mtb-button',
            iconCls: 'x-fa fa-user',
            //text: 'Demo User',
            bind: {
                text: '{user_name}'
            },
            margin: '0 5px 0 0',
            menu: [{
                text: _('用户设置'),
                handler: 'onUserSetting'
            }, {
                text: _('更改密码'),
                handler: 'onChangePwd'
            }, '-', {
                text: _('更新日志'),
                handler: 'onShowUpdateLog'
            }, '-', {
                iconCls: 'x-fa fa-sign-out',
                handler: 'onSignOut',
                text: _('退出系统')
            }]
        }];
        return items;
    },

    makeItems: function() {
        var items = [];
        
        items.push({
            xtype: 'tbtext',
            cls: 'tbtext',
            html: 'EAP',
            bind: {
                html: '{soft_name}'
            },
            margin:'0 10px 0 0'
        });
        
        items.push({
            text: 'SCM',
            ui:'sefu-mtb-button-menu',
            arrowVisible:false,
            menu:[{
                text:'PO'
            },
            {
                text:'PR'
            }]
        });
        

        items.push('->');
        items=items.concat(this.makeUserItems());
        return items;
    },

    initComponent: function() {
        Ext.apply(this, {
            items: this.makeItems()
        });
        console.log('default.items.length#',this.items.length);

        this.callParent(arguments);
    }

});