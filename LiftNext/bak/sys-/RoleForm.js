//UserForm

Ext.define('sef.app.sys.RoleForm', {
    extend: 'sef.core.components.page.FormPage',
    xtype: 'sef-roleform',

    delUrl:'/mock/user.delete.json',
    printUrl:'/mock/print-demo.pdf',

    bars: [sef.runningCfg.BUTTONS.SAVE,
        sef.runningCfg.BUTTONS.DEL_INFORM,
        sef.runningCfg.BUTTONS.PRINT,
        sef.runningCfg.BUTTONS.COPY
    ],

    onPageReady:function(){
        
    },

    _roles_create__execute:function(btn){
        console.log('will process for create',btn,this);
        return false;
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