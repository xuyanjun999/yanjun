//Main top bar

Ext.define('sef.core.components.bar.MainTopbar', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'sef-maintopbar',
    ui: 'sefu-maintopbar',
    region: 'north',
    //height: 32,
    items: [{
        xtype: 'tbtext',
        cls: 'tbtext',
        html: 'EAP',
        bind:{
            html:'{soft_name}'
        }
    }, '-', {
        xtype: 'tbtext',
        cls: 'tbtext webfont',
        html: '电梯行业高级管理平台',
        bind:{
            html:'{soft_title}'
        }
    }, '->', {
        xtype: 'tbtext',
        html: ''
    }, '->', {
        //iconCls:'x-fa fa-envelope',
        ui: 'sefu-mtb-msg-button',
        tooltip:_('你收到的消息'),
        hidden:true,
        //text: '10+',
        bind:{
            text:'{message_count}',
            hidden:'{message_count<1}'
        }
        
    },{
        ui:'sefu-mtb-button',
        iconCls:'x-fa fa-language',
        text:'En',
        tooltip:'Language',
        bind:{
            text:'{lang}'
        },
        handler:'onChangeLang'
    },{
        ui:'sefu-mtb-button',
        iconCls:'x-fa fa-th-large',
        //text:'En',
        tooltip:'显示模式',
        
        handler:'onChangeUIMode'
    }, '-',{
        ui: 'sefu-mtb-button',
        iconCls: 'x-fa fa-user',
        //text: 'Demo User',
        bind:{
            text:'{user_name}'
        },
        margin:'0 5px 0 0',
        menu: [{
            text: _('用户设置'),
            handler:'onUserSetting'
        }, {
            text: _('更改密码'),
            handler:'onChangePwd'
        }, '-',{
            text:_('更新日志'),
            handler:'onShowUpdateLog'
        },'-', {
            iconCls: 'x-fa fa-sign-out',
            handler:'onSignOut',
            text: _('退出系统')
        }]
    }]
});