Ext.define('sef.app.sys.UserModel',{
    extend:'sef.core.model.BaseModel',

    fields: [{
        name: 'name',
        text: '名称',
        defaultValue:'userUnName'
    }, {
        name: 'email',
        text: '邮箱'
    }, {
        name: 'birthday',
        text: '生日',
        type: 'date',
        dateFormat:'c'
    },  {
        name: 'loginTime',
        text: '最后登录',
        type: 'date',
        stype:'time',
        dateFormat:'c'
    }, {
        name: 'age',
        text: '年龄',
        type: 'int'
    }, {
        index:10,
        name: 'status',
        text: '状态',
        stype: 'enum',
        sassb: 'SEF.Core.Common.TestEnum,SEF.Core.Common'
    }, {
        name: 'isvalid',
        text: '是否有效',
        type: 'bool'
    },{
        name: 'remark',
        text: '备注'
    },{
        name: 'salary',
        text: '工资',
        stype: 'float'
    }, {
        name: 'Company',
        text: '公司',
        stype: 'asso',
        sassb:'SEF.Core.Model.CompanyModel,SEF.Core.Model',
        assomodel:'sef.app.sys.CompanyModel'
    }, {
        name: 'Staff',
        text: '员工',
        stype: 'asso',
        sassb:'SEF.Core.Model.UserModel,SEF.Core.Model',
        assomodel:'sef.app.sys.StaffModel'
    },{
        name:'Roles',
        stype:'asso',
        ref:'ID'
    }]
});