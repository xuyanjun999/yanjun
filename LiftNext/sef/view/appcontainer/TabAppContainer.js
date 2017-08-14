//TabAppContainer implements IAppContainer

Ext.define('sef.core.view.appcontainer.TabAppContainer', {
    extend: 'Ext.tab.Panel',
    xtype: 'sef-tabappcontainer',
    ui: 'sefu-maintabpanel',
    defaults: {
        margin: 10,
        layout: 'fit'
    }
});