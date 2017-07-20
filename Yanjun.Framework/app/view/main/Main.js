Ext.define('xf.view.main.Main', {
    extend: 'Ext.container.Viewport',
    layout: 'border',
    itemId: 'mainviewport',
    controller: Ext.create("xf.controller.main.Main"),
    items: [{
        region: 'north',
        html: '<h4 style="line-height:0px;">&nbsp;&nbsp;通用后台任务管理系统(EAP V9.5)</h4>',
        border: false,
        margin: '0 0 3 0',
        height: 35,
        rbar: [{ text: 'test', handler: 'addUser' }]
    }, {
        region: 'west',
        title: '菜单导航',
        collapsible: true,
        iconCls: 'fa fa-home',
        width: 250,
        split: {
            width: 3
        },
        layout: 'fit',
        items: [{
            xtype: 'treepanel',
            rootVisible: false,
            lines: false,
            useArrows: true,
            store: {
                model: 'xf.Common.TreeNodeData',
                proxy: {
                    type: 'ajax',
                    url: '/Menu/GetMenu',
                    reader: {
                        type: 'json',
                        rootProperty: "Entitys",
                        successProperty: "Success"
                    }
                },
                listeners: {
                    beforeload: function (store, operation, eOpts) {
                        if (operation.node.data.ID) {
                            operation.setParams({ parentId: operation.node.data.ID });
                        }
                    },
                }
            },
            listeners: {
                itemclick: function (tr, record, item, index, e, eOpts) {
                    if (!Ext.isEmpty(record.data.Url)) {
                        var tab = tr.up("#mainviewport").down("#maintab");
                        var com = Ext.create(record.data.Url);
                        com.closable = true;
                        tab.add(com).show();
                    }
                },
            }
        }]

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