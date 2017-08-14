Ext.define('sef.app.demo.UserModel', {
    extend: 'sef.core.model.BaseModel',

    fields: [{
        name: 'CreateOn',
        text: '创建时间',
        type: 'date',
        stype: 'time',
        dateFormat: 'c'
    }, {
        name: 'UpdateOn',
        text: '最后更新时间',
        type: 'date',
        stype: 'time',
        dateFormat: 'c'
    }, {
        name: 'Name',
        text: '名称'
    }, {
        name: 'ExpiryTime',
        text: '账户到期时间',
        type: 'date',
        stype: 'time',
        dateFormat: 'c'
    }, {
        name: 'PwdExpiryTime',
        text: '密码到期时间',
        type: 'date',
        stype: 'time',
        dateFormat: 'c'
    }, {
        name: 'LastIpAddr',
        text: '最近登录IP',
    }, {
        name: 'LoginTimes',
        text: '登录次数',
    }, {
        name: 'Staff',
        text: '员工',
        stype: 'asso',
        //sassb: 'SEF.Core.Model.UserModel,SEF.Core.Model',
        assomodel: 'sef.app.demo.StaffModel'
    }
        //{
        //    name: 'Company',
        //    text: '公司',
        //    stype: 'asso',
        //    sassb: 'SEF.Core.Model.CompanyModel,SEF.Core.Model',
        //    assomodel: 'sef.app.demo.CompanyModel'
        //}, {
        //    name: 'Staff',
        //    text: '员工',
        //    stype: 'asso',
        //    sassb: 'SEF.Core.Model.UserModel,SEF.Core.Model',
        //    assomodel: 'sef.app.demo.StaffModel'
        //}, {
        //    name: 'Roles',
        //    stype: 'asso',
        //    ref: 'ID'
        //}
    ]
});