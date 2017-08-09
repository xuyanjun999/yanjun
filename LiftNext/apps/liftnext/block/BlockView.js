//FormPage.js

Ext.define('sef.app.liftnext.block.BlockView', {
    extend: 'Ext.container.Container',
    vname: 'view',
    //requires:['sef.core.interfaces.IAppPage'],
    mixins: ['sef.core.interfaces.IAppPage'],
    xtype: 'sef-blockview',
    controller: 'sefc-pagectrl',



    initComponent: function() {
        this.beforeReady();
        this.store.load();
        Ext.apply(this, {
            items: {
                store:this.store,
                xtype: 'dataview',
                itemSelector: 'div.thumb-wrap',
                cls:'block-view',
                tpl: [
                    '<tpl for=".">',
                    '<div class="block-wrap">',
                        '<div class="block-innerbox">',
                        '<div class="thumb"><img src="{Thumb}" title="{Name}" /></div>',
                        '<div class="title">{Name}</div>',
                        '</div>',
                    '</div>',
                    '</tpl>'
                ]
            }
        });

        this.callParent(arguments);


    }

});