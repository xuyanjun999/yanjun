//UserForm

Ext.define('sef.app.demo.RoleForm', {
    extend: 'sef.core.components.page.FormPage',
    xtype: 'sef-roleform',

    //若不指定delUrl和printUrl，则会使用store的url后加/prin/或/del/
    //这两个属性为可选
    delUrl:'/mock/user.delete.json',
    printUrl:'/mock/print-demo.pdf',

    bars: [sef.runningCfg.BUTTONS.SAVE,
        sef.runningCfg.BUTTONS.DEL_INFORM,
        sef.runningCfg.BUTTONS.PRINT,
        sef.runningCfg.BUTTONS.COPY
    ],

    onPageReady:function(){
        
    },

    

    items:[{
        name:'rolename',
        fieldLabel:_('名称'),
        allowBlank:false
    },{
        name:'rolecode',
        fieldLabel:_('代码')
    }]
});