//LoginPage

Ext.define('sef.core.view.security.LoginWindow', {
    extend: 'sef.core.components.window.LockingWindow',
    xtype: 'sef-loginwindow',
    cls: 'sef-loginwindow',
    border: 0,
    onEsc: Ext.emptyFn,
    defaultFocus:'sef-loginform',
    controller:'sefc-loginctrl',
    viewModel:{
        data:{
            LastLoginName:''
            //Welcome:'欢迎您使用EAP系统#1'
        }
    },

    
    items:[{
        xtype:'box',
        cls:'welcome-title',
        bind:{
            html:'{Greeting}'
        }
        
    },{
        xtype:'sef-loginform'
    },{
        xtype: 'container',
        //cls:'sef-loginwindow'
        //margin: '20 50px 36px 50px',
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items: [{
                    xtype: 'box',
                    cls:'language-option',
                    html: '<ul><li><a href="#" class="current">中文</a></li><li><a href="#">English</a></li></ul>'
                },
                {
                    xtype: 'box',
                    minWidth:180,
                    html:'&nbsp;'
                },
                {
                    xtype: 'box',
                    cls:'copyright-box',
                    html: '<span class="text">Powerd by</span> <span class="logo"></span>'
                }
            ]
            //html:'bottom'
    }]
    

});