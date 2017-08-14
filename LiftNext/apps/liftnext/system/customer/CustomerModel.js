Ext.define('sef.app.liftnext.system.customer.CustomerModel',{
    extend:'sef.core.model.BaseModel',

    fields: [{
        name:'Code',
        text:'代号'
    },{
        name: 'Name',
        text: '名称'
    },{
        name:'RegDate',
        text:'注册日期'
    },{
        name:'ActivateDate',
        text:'生效日期'
    },{
        name:'CompanyType',
        text:'公司类型'
    }]
});