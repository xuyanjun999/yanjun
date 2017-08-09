Ext.define('sef.app.sys.StaffModel',{
    extend:'sef.core.model.BaseModel',

    fields: [{
        name: 'fullname',
        text: '姓名'
    },{
        name:'code',
        text:'工号'
    }]
});