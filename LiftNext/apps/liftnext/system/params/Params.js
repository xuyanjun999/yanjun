//User.js

Ext.define('sef.app.liftnext.system.params.Params', {
    extend: 'sef.core.view.appcontainer.AppPageContainer',
    xtype: 'sef-params',
    title: '参数管理',
    closable: true,
    requires: [
        'sef.app.liftnext.system.params.ParamsModel',
        'sef.app.liftnext.system.params.ParamsList',
        'sef.app.liftnext.system.params.ParamsForm',
        //'sef.app.liftnext.system.customer.UserModel'
    ],
    //用于指定当前页面默认显示的vname，与下面的views中的vname相对应
    defaultView:'list',
   
    //若单独指定model则页面在加载完成时会自动生成一个store
    model: 'sef.app.liftnext.system.params.ParamsModel',

    //用于MODEL在加载数据时对应的url地址
    //正式使用时应该是 /api/user
    api: '/apps/liftnext/mock/params.json',

    additionFilterFn:function(){
        return {TEST:2012114};
    },
    
    //store:
    views: [{
        //用于在列表和表单之间的切换
        vname:'list',
        xtype: 'sef-paramslist'
    }, {
        vname:'form',
        xtype: 'sef-paramsform'
    }],

    //加上此节点用于显示标准树
    tree:{
        //此属性用于控制是否显示checkhbox
        //enableCheck:true,
        xtype:'sef-pagetree',
        
        title:'参数分类',
        //用于加载树的url
        url:'/apps/liftnext/mock/paramstree.json'
    },

    

    initComponent: function() {
        this.callParent(arguments);
        //console.log(this.store);
        
    }
});