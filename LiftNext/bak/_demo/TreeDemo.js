//User.js

Ext.define('sef.app.demo.TreeDemo', {
    extend: 'sef.core.view.appcontainer.AppPageContainer',
    xtype: 'sef-usertree',
    title: '树型页面',
    //closable: false,
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

    //用于MODEL在加载数据时对应的url地址
    //正式使用时应该是 /api/user
    api: '/mock/user.json',
    
    //store:
    views: [{
        //用于在列表和表单之间的切换
        vname:'list',
        xtype: 'sef-userlist'
    }, {
        vname:'form',
        xtype: 'sef-userform'
    }],

    //加上此节点用于显示标准树
    tree:{
        //此属性用于控制是否显示checkhbox
        //enableCheck:true,
        xtype:'sef-pagetree',
        
        title:'导航菜单',
        //用于加载树的url
        url:'/mock/tree.json'
    },
    
    

    onTreeItemClick:function(tree,record){
        console.log('user.tree.click',tree,record);
        tree.reload();
    },

    initComponent: function() {
        this.callParent(arguments);
        //console.log(this.store);
        
    }
});