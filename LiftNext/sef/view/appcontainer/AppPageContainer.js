//AppPageContainer.js

Ext.define('sef.core.view.appcontainer.AppPageContainer',{
    extend:'Ext.panel.Panel',
    xtype:'sef-apppagecontainer',

    mixins:['sef.core.interfaces.IAppPageContainer'],

    config:{
        closable:true,
        views:null,
        model:null,
        defaultView:'list',
        tree:null

    },

    

    initComponent:function(){
        //console.log('befre app.contaer#');
        this.beforeReady();
        var me=this,c=this.makeAppViews();
        Ext.apply(this,c);
        //console.log(c);
        this.callParent(arguments);
        var tree=this.down('#mainAppTree');
        if(tree){
            tree.on('itemclick',function(tv,rec){
                if(Ext.isFunction(this.onTreeItemClick)){
                    this.onTreeItemClick.call(this,tree,rec);
                }
            },this);
        }
        this.afterReady();

        
        console.log('found tree#',tree);

    }
});