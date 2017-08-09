//User.js

Ext.define('sef.app.demo.DefaultDemo', {
    extend: 'sef.core.view.appcontainer.AppPageContainer',
    xtype: 'sef-user',
    title: '标准页面',
    closable: false,
    requires: [
        'sef.app.demo.UserModel',
        'sef.app.demo.UserList',
        'sef.app.demo.UserForm',
        'sef.app.demo.CompanyModel',
        'sef.app.demo.StaffModel',
        'sef.app.demo.RoleModel',
        'sef.app.demo.RoleForm'
    ],
    //用于指定当前页面默认显示的vname，与下面的views中的vname相对应
    defaultView:'list',
   
    //若单独指定model则页面在加载完成时会自动生成一个store
    model: 'sef.app.demo.UserModel',


    api: '/api/security/user',	

    include:"Staff",
    //store:
    views: [{
        //用于在列表和表单之间的切换
        vname:'list',
        xtype: 'sef-userlist',
    }, {
        vname:'form',
        xtype: 'sef-userform'
    }],

    

    initComponent: function() {
        this.callParent(arguments);
        //console.log(this.store);
        
    }
});