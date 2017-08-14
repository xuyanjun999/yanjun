Ext.define('sef.app.sys.RoleModel',{
    extend:'sef.core.model.BaseModel',

    fields: [{
        name: 'rolename',
        text: '角色名'
    },{
        name:'rolecode',
        text:'角色代码'
    },{
        name:'User',
        text:'User',
        invisible:true,
        stype: 'asso'
    }]
});