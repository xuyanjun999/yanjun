//UserForm

Ext.define('sef.app.sys.UserForm', {
    extend: 'sef.core.components.page.FormPage',
    xtype: 'sef-userform',

    delUrl:'/mock/user.delete.json',
    printUrl:'/mock/print-demo.pdf',

    bars: [sef.runningCfg.BUTTONS.SAVE,
        sef.runningCfg.BUTTONS.DEL_INFORM,
        sef.runningCfg.BUTTONS.PRINT,
        sef.runningCfg.BUTTONS.COPY
    ],

    onPageReady:function(){
        //console.log('formpage will on ready');
        this.updatePermission({
            roles_create:true,
            roles_delete:true,
            roles_test:true,
            roles_edit:true
        });
    },

    _roles_create__execute:function(btn){
        console.log('will process for create',btn,this);
        return false;
    },

    items:[{
        name:'name',
        fieldLabel:_('名称'),
        allowBlank:false
    },{
        name:'email',
        fieldLabel:_('邮箱')
    },{
        name:'birthday',
        fieldLabel:_('出生日期'),
        xtype:'datefield'
    },{
        name:'salary',
        fieldLabel:_('薪资'),
        xtype:'numberfield'
    },{
        name:'status',
        fieldLabel:_('状态'),
        xtype:'sef-enumcombo',
        enumType:'SEF.Core.Common.TestEnum,SEF.Core.Common'
    },{
        name:'isvalid',
        fieldLabel:_('激活'),
        trueText:'激活',
        falseText:'失效',
        xtype:'sef-boolradiogroup'
    },{
        name:'remark',
        fieldLabel:_('备注'),
        xtype:'textarea',
        columnWidth:1
    },{
        name:'Company',
        fieldLabel:_('所属公司'),
        xtype:'sef-lookupfield',
        columns:['ltdname','lcode'],
        quickSearch:['ltdname','lcode'],
        displayField:'ltdname',
        store:{
            type:'sef-store',
            url:'/mock/company.json',
            //autoLoad:true,
            model:'sef.app.sys.CompanyModel',
            additionFilterFn:function(){
                //console.log('addition#',this);
                return {
                    DD:1024
                };
            }
        }
    },{
        name:'Staff',
        fieldLabel:_('所属员工'),
        xtype:'combo',
        editable:false,
        simpleModelValue:true,
        displayField:'fullname',
        valueField:'ID',
        store:{
            type:'sef-store',
            url:'/mock/staff.json',
            //autoLoad:true,
            model:'sef.app.sys.StaffModel'
        }
    },{
        name:'Roles',
        columnWidth:1,
        xtype:'sef-datagridfield',
        title:_('角色列表'),
        quickSearchFields:['rolecode','rolename'],
        bars:['ADD','EDIT','DELETE',{
            iconCls:'x-fa fa-bars',
            actionName:'test'
        }],
        assoField:'UserID',
        editor:{
            formType:'sef-roleform',
            title:_('角色')
        },
        store:{
            type:'sef-store',
            url:'/mock/role.json',
            //autoLoad:true,
            model:'sef.app.sys.RoleModel'
        }
    },{
        xtype:'textarea',
        fieldLabel:'Remark',
        columnWidth:1
    }]
});