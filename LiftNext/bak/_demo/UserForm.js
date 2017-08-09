//UserForm

Ext.define('sef.app.demo.UserForm', {
    extend: 'sef.core.components.page.FormPage',
    xtype: 'sef-userform',

    delUrl: '/mock/user.delete.json',
    printUrl: '/mock/print-demo.pdf',

    bars: [sef.runningCfg.BUTTONS.SAVE,
    sef.runningCfg.BUTTONS.EDIT_INFORM,
    sef.runningCfg.BUTTONS.DEL_INFORM,
    sef.runningCfg.BUTTONS.PRINT,
    sef.runningCfg.BUTTONS.COPY
    ],

    onPageReady: function () {
        //console.log('formpage will on ready');
        //此方法用于更新权限信息
        //roles为子表名称，若不加则为主表的行为
        this.updatePermission({
            roles_create: true,
            roles_delete: true,
            roles_test: true,
            roles_edit: true
        });
    },

    //用于子表的按钮事件，若返回了false则系统内置的行为全部被屏蔽
    //标准子页面按钮事件名称为 [子列表名称(name)]_[按钮名称(name)]__execute
    _roles_create__execute: function (btn) {
        console.log('will process for create', btn, this);
        return false;
    },

    items: [{
        name: 'Name',
        fieldLabel: _('名称'),
        allowBlank: false
    }, {
        name: 'ExpiryTime',
        fieldLabel: _('账户到期时间'),
        xtype: 'datefield'
    }, {
        name: 'PwdExpiryTime',
        fieldLabel: _('密码到期时间'),
        xtype: 'datefield'
    },
    //{
    //    name: 'status',
    //    fieldLabel: _('状态'),
    //    xtype: 'sef-enumcombo',
    //    enumType: 'SEF.Core.Common.TestEnum,SEF.Core.Common'
    //},
    //{
    //    name: 'isvalid',
    //    fieldLabel: _('激活'),
    //    trueText: '激活',
    //    falseText: '失效',
    //    xtype: 'sef-boolradiogroup'
    //},

    //{
    //    name: 'Company',
    //    fieldLabel: _('所属公司'),
    //    xtype: 'sef-lookupfield',
    //    columns: ['ltdname', 'lcode'],
    //    quickSearch: ['ltdname', 'lcode'],
    //    displayField: 'ltdname',
    //    store: {
    //        type: 'sef-store',
    //        url: '/mock/company.json',
    //        //autoLoad:true,
    //        model: 'sef.app.demo.CompanyModel',
    //        additionFilterFn: function () {//此方法用于增加store的其它查询参数
    //            //console.log('addition#',this);
    //            return {
    //                DD: 1024
    //            };
    //        }
    //    }
    //},
    {
        name: 'Staff',
        fieldLabel: _('所属员工'),
        xtype: 'combo',
        editable: false,
        simpleModelValue: true,
        displayField: 'CnName',
        valueField: 'ID',
        store: {
            type: 'sef-store',
            url: '/api/CompanyOrg/Staff',
            //autoLoad:true,
            model: 'sef.app.demo.StaffModel'
        }
    }, {
        name: 'LastIpAddr',
        fieldLabel: _('上次登录IP')
    }, {
        name: 'Remark',
        fieldLabel: _('备注'),
        xtype: 'textarea',
        columnWidth: 1
    },
        //{
        //    name: 'Roles',
        //    columnWidth: 1,
        //    xtype: 'sef-datagridfield',
        //    title: _('角色列表'),
        //    quickSearchFields: ['rolecode', 'rolename'],
        //    bars: ['ADD', 'EDIT', 'DELETE', {
        //        iconCls: 'x-fa fa-bars',
        //        actionName: 'test'
        //    }],
        //    assoField: 'UserID',
        //    editor: {
        //        formType: 'sef-roleform',
        //        title: _('角色')
        //    },
        //    store: {
        //        type: 'sef-store',
        //        url: '/mock/role.json',
        //        //autoLoad:true,
        //        model: 'sef.app.demo.RoleModel'
        //    }
        //},
    ]
});