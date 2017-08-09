//User.js

Ext.define('sef.app.liftnext.system.lift.Lift', {
    extend: 'sef.core.view.appcontainer.AppPageContainer',
    xtype: 'sef-lift',
    title: '梯型管理',
    closable: true,
    requires: [
        'sef.app.liftnext.system.lift.LiftModel',
        'sef.app.liftnext.system.lift.LiftList',
        'sef.app.liftnext.system.lift.LiftForm',
        //'sef.app.liftnext.system.customer.UserModel'
    ],
    //用于指定当前页面默认显示的vname，与下面的views中的vname相对应
    defaultView:'list',
   
    //若单独指定model则页面在加载完成时会自动生成一个store
    model: 'sef.app.liftnext.system.lift.LiftModel',

    //用于MODEL在加载数据时对应的url地址
    //正式使用时应该是 /api/user
    api: '/apps/liftnext/mock/lift.json',

    additionFilterFn:function(){
        return {TEST:2012114};
    },
    
    //store:
    views: [{
        //用于在列表和表单之间的切换
        vname:'list',
        xtype: 'sef-liftlist'
    }, {
        vname:'form',
        xtype: 'sef-liftform'
    }],

    //加上此节点用于显示标准树
    tree:{
        //此属性用于控制是否显示checkhbox
        //enableCheck:true,
        xtype:'sef-pagetree',
        
        title:'块的分类',
        //用于加载树的url
        url:'/apps/liftnext/mock/lifttree.json'
    },

    

    initComponent: function() {
        this.callParent(arguments);
        //console.log(this.store);
        
    }
});