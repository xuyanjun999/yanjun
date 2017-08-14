//MainMenuTree.js

Ext.define('sef.core.components.tree.MainMenuTree',{
    extend: 'Ext.tree.Panel',
    xtype: 'sef-mainmenutree',
    ui: 'sefu-mainmenutree',
    title: _('系统菜单'),
    iconCls:'x-fa fa-bars',
    minWidth: 200,
    width: 250,
    collapsible: true,
    useArrows: true,
    border: true,
    rootVisible: false,
    titleCollapse:false


});