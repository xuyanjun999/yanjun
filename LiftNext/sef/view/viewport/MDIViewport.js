//MDIViewport

Ext.define('sef.core.view.viewport.MDIViewport', {
    extend: 'Ext.container.Container',
    mixins: ['sef.core.interfaces.IAppViewport'],
    //hidden:true,
    controller: 'sefc-mdivp',
    viewModel:'sefv-mainvm',

    makeTopBar: function() {
        return {
            xtype: 'sef-maintopbar',
            //ui: 'sefu-maintopbar',
            region: 'north'
        }
    },

    makeSideMenuBar: function() {
        /*
        var store = Ext.create('Ext.data.TreeStore', {
            root: {
                expanded: true,
                children: [
                    { text: '我的桌面', leaf: true, iconCls: 'x-fa fa-cube' },
                    {
                        text: '任务管理',
                        expanded: true,
                        iconCls: 'x-fa fa-cube',
                        children: [
                            { text: 'book report', leaf: true, iconCls: 'x-fa fa-cube' },
                            { text: 'algebra', leaf: true, iconCls: 'x-fa fa-cube' }
                        ]
                    },
                    { text: '系统设置', leaf: true, iconCls: 'x-fa fa-cube' }
                ]
            }
        });
        */
        return {
            region: 'west',
            reference: 'mainMenuTree',
            xtype: 'sef-mainmenutree',
            store: Ext.create('Ext.data.TreeStore', {
                model: 'sef.core.model.TreeModel',
                proxy: {
                    type: 'memory'
                }
            }),
            listeners: {
                itemClick: 'onMenuSelectionChange'
            }
            //store: store,


        }
    },

    makeMdiContainer: function() {
        
        
        return {
            //html: 'mdi',
            region: 'center',
            xtype: 'sef-tabappcontainer',
            reference:'mainAppContainer',
            
            listeners:{
                'beforetabchange':'onBeforeTabChangeHandler'
            }
        }
    },

    

    makeLayout: function() {
        var l = {
            layout: 'border',
            items: [
                this.makeTopBar(),
                this.makeSideMenuBar(),
                this.makeMdiContainer()
            ]
        };

        return l;
    },

    initComponent: function() {
        console.log('I will working1...',this);
        Ext.apply(this, this.makeLayout());
        console.log('I will working2...',this);
        try{
            this.callParent(arguments);
        }catch(err){
            console.log('found err#',err);
        }
        
        console.log('I will working3...',this);
        //console.log('view.init done');
    }
});