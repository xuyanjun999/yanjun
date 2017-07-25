Ext.define('xf.view.main.Main', {
    extend: 'Ext.container.Viewport',
    layout: 'border',
    itemId: 'mainviewport',
    controller: 'main',
    items: [{
        xtype: 'panel',
        region: 'north',
       // frame: false,
        border: 0,
        //height:120,
        items: [{
            border: 0,
            xtype: 'toolbar',
            items: [{
                html: '一个奇怪的人'
            }, '->', {
                xtype: 'button',
                text: '系统功能',
                iconCls:'application-key',
                menu: [{
                    text: '当前用户',
                    iconCls: 'user'
                }, {
                    text: '退出系统',
                    iconCls: 'user-go',
                    handler:'logout'
                }]
            }]
        }]
    }, {
        title: '菜单导航',
        xtype: 'CommonTreeSearchPanel',
        reference: 'tree',
        width: 250,
        collapsible: true,
        collapsed: false,
        region: 'west',
        enableDateSearch: false,
        enableTextSearch: false,
        commonTreeConfig: {
            rootVisible: false,
            listeners: {
                itemclick: 'treeItemclick',
                storebeforeload: 'treeStoreBeforeLoad'
            },
        }
    }, {
        region: 'center',
        xtype: 'tabpanel', // TabPanel itself has no title
        activeTab: 0,      // First tab active by default
        itemId: 'maintab',
        cls: 'sg-mainappspace',
        id: 'sg-mainappspace',
        plugins: ['tabclosemenu'],
        items: [{
            xtype: "panel",
            title: 'panel'

        }]
    }]
});