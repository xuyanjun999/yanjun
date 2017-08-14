Ext.define('sef.app.liftnext.system.user.UserModel',{
    extend:'sef.core.model.BaseModel',

    fields: [{
        name:'Code',
        text:'代号'
    },{
        name: 'Name',
        text: '名称'
    },{
        name:'Email',
        text:'邮箱'
    },{
        name:'LoginName',
        text:'登录名'
    },{
        name: 'LoginPwd',
        text: '登录密码'
    },{
        name:'RegDate',
        text:'注册日期'
    },{
        name:'ActivateDate',
        text:'生效日期'
    },{
        name:'Customer',
        text:'所属公司',
        stype: 'asso',
        sassb:'SEF.Core.Model.CompanyModel,SEF.Core.Model',
        assomodel:'sef.app.liftnext.system.customer.CustomerModel'
    }]
});