//UserForm

Ext.define('sef.app.liftnext.system.customer.CustomerForm', {
    extend: 'sef.core.components.page.FormPage',
    xtype: 'sef-customerform',

    delUrl: '/mock/user.delete.json',
    printUrl: '/mock/print-demo.pdf',

    bars: [sef.runningCfg.BUTTONS.SAVE,
        sef.runningCfg.BUTTONS.EDIT_INFORM,
        sef.runningCfg.BUTTONS.DEL_INFORM,
        {
            text:'激活',
            xtype: 'sef-actionbutton',
            btnType: 'default',
            actionName:'activate'
        }
    ],

    activate__execute:function(btn){
        console.log('here is activate click#',btn,this);
    },

    onPageReady: function() {

        //console.log('formpage will on ready');
        //此方法用于更新权限信息
        //roles为子表名称，若不加则为主表的行为
        this.updatePermission({
            activate:true,
            roles_create: true,
            roles_delete: true,
            roles_test: true,
            roles_edit: true
        });
    },

    //用于子表的按钮事件，若返回了false则系统内置的行为全部被屏蔽
    //标准子页面按钮事件名称为 [子列表名称(name)]_[按钮名称(name)]__execute
    _roles_create__execute: function(btn) {
        console.log('will process for create', btn, this);
        return false;
    },

    items: [{
        name: 'Code',
        fieldLabel: _('代号'),
        allowBlank: false
    }, {
        name: 'Name',
        fieldLabel: _('名称')
    }, {
        name: 'RegDate',
        fieldLabel: _('注册日期'),
        xtype: 'datefield'
    },  {
        name: 'ActivateDate',
        fieldLabel: _('生效日期'),
        xtype: 'datefield'
    }, {
        xtype: 'textarea',
        name:'Remark',
        fieldLabel:_('备注'),
        columnWidth: 1
    }]
});