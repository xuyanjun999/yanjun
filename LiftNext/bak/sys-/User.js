//User.js

Ext.define('sef.app.sys.User', {
    extend: 'sef.core.view.appcontainer.AppPageContainer',
    xtype: 'sef-user',
    title: 'User Tab',
    closable: false,
    requires: [
        'sef.app.sys.UserModel',
        'sef.app.sys.UserList',
        'sef.app.sys.UserForm',
        'sef.app.sys.CompanyModel',
        'sef.app.sys.StaffModel',
        'sef.app.sys.RoleModel',
        'sef.app.sys.RoleForm'
    ],
    //defaultView:'form',
    //html:'here is user panel',
    model: 'sef.app.sys.UserModel',
    api: '/mock/user.json',
    tree:{
        rootVisible:false,
        //enableCheck:true,
        xtype:'sef-pagetree',
        title:'导航菜单',
        url:'/mock/tree.json'
    },
    
    //store:
    views: [{
        vname:'list',
        xtype: 'sef-userlist'
    }, {
        vname:'form',
        xtype: 'sef-userform'
    }],

    onTreeItemClick:function(tree,record){
        console.log('user.tree.click',tree,record);
        tree.reload();
    },

    initComponent: function() {
        this.callParent(arguments);
        console.log(this.store);
        return;

        var store = Ext.create('store.sef-store', {
            model: this.model,
            url: this.api
        });
        store.on('load', function(s, rec, success, op, opt) {
            console.log('store.loaded#', success, rec, op, opt);
            if (success === true) {
                var reader = s.getProxy().getReader();
                console.log(reader, s.getExData());
            }
        });
        store.load();
    }
});