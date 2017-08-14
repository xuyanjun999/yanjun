//MDIViewport

Ext.define('sef.core.view.viewport.TopMDIViewport', {
    extend: 'Ext.panel.Panel',
    mixins: ['sef.core.interfaces.IAppViewport'],
    //hidden:true,
    controller: 'sefc-topmdivp',
    viewModel:'sefv-mainvm',
    cls:'sef-topmdiviewport',
    layout:'fit',

    makeTopBar: function() {
        return {
            xtype: 'sef-maintopmenubar',
            reference:'maintopmenubar'
        }
    },

    

    makeMdiContainer: function() {
        
        
        return {
            //html: 'mdi',
            //region: 'center',
            //layout:'fit',
            xtype: 'sef-tabappcontainer',
            reference:'mainAppContainer',
            
            
            listeners:{
                'beforetabchange':'onBeforeTabChangeHandler'
            }
        }
    },

    

    makeLayout: function() {
        var l = {
            //layout: 'border',
            tbar:this.makeTopBar(),
            items: this.makeMdiContainer()
        };

        return l;
    },

    initComponent: function() {
        Ext.apply(this, this.makeLayout());
        this.callParent(arguments);
        //console.log('view.init done');
    }
});