Ext.define("xf.view.sys.Menu", {
    extend: 'Ext.panel.Panel',
    padding:0,
    layout: 'border',
    frame: false,
    border:0,
    controller: 'menu',
    title: '菜单管理',
    items: [{
        xtype: 'CommonTreeSearchPanel',
        region: 'west',
        width: 200,
        
        enableDateSearch: false,
        enableTextSearch: false,
        commonTreeConfig: {
            rootVisible: false,
            listeners: {
                itemcontextmenu: 'treeItemContextMenu',
                beforeitemclick : 'treeItemclick',
                storebeforeload: 'treeStoreBeforeLoad'
            },
        }
    }, {
        xtype: 'panel',
        region: 'center',
        itemId: 'content',
        reference: 'content',
        layout: 'card',
        items: [{
            xtype: "sggrid",
            region: 'center',
            columns: [{
                xtype: 'rownumberer',
                text: '行号',
                width: 50
            }, {
                text: '名称',
                dataIndex: 'Name',
                width: 100
            }, {
                text: '父级菜单',
                dataIndex: 'Parent.Name',
                width: 100
            }, {
                text: '图标',
                dataIndex: 'IconResource',
                width: 100
            }, {
                text: '是否显示',
                dataIndex: 'Visible',
                width: 100
            }, {
                text: '描述',
                dataIndex: 'Des',
                width: 100
            }, {
                text: '排序',
                dataIndex: 'SequenceIndex',
                width: 100
            }, {
                text: '代号',
                dataIndex: 'Code',
                width: 100
            }, {
                text: '路径',
                dataIndex: 'ModuleUrl',
                flex: 1
            }],
            controllerUrl: 'Menu',
            listeners: {
                beforeload: "menuBeforeload"
            },
            quickSearchCols: ['Name'],
            modelName: 'xf.model.sys.Menu',
        }, {
            xtype: 'SGForm',
            title: '明细',
            apiUrl: '/api/Menu',
            includePath: ["Parent"],
            items: [{
                xtype: 'textfield',
                allowBlank: false,
                afterLabelTextTpl: REQUIRED_LABEL_TPL,
                fieldLabel: '菜单名称',
                name: 'Name'
            }, {
                xtype: 'textfield',
                fieldLabel: '图标',
                name: 'IconResource'
            }, {
                xtype: 'CommonBindCombo',
                allowBlank: false,
                afterLabelTextTpl: REQUIRED_LABEL_TPL,
                store: serverNS.getComboStaticStore(comboStaticData.yesNo),
                fieldLabel: '是否显示',
                name: 'IsVisible'
            }, {
                xtype: 'textfield',
                fieldLabel: '描述',
                name: 'Des'
            }, {
                xtype: 'numberfield',
                allowBlank: false,
                afterLabelTextTpl: REQUIRED_LABEL_TPL,
                allowDecimals: false,
                fieldLabel: '序号',
                name: 'SequenceIndex'
            }, {
                xtype: 'textfield', allowBlank: false, afterLabelTextTpl: REQUIRED_LABEL_TPL,
                fieldLabel: '代号',
                name: 'Code'
            }, {
                xtype: 'textfield',
                fieldLabel: '路径',
                name: 'Url'
            }, {
                xtype: 'textfield',
                readOnly: true,
                fieldLabel: '父级菜单',
                name: 'Parent.Name'
            }, {
                xtype: 'hiddenfield',
                readOnly: true,
                name: 'ParentID'
            }, {
                xtype: 'textarea',
                columnWidth: 1,
                fieldLabel: '备注',
                name: 'Remark'
            },],
            tbar: [{
                xtype: 'button',
                text: '保存',
                iconCls: 'save',
                handler: "formSave"
            }, '-', {
                xtype: 'button',
                text: '返回',
                iconCls: 'back',
                handler: function () {
                    this.up("#content").getLayout().setActiveItem(0);
                }
            }]
        }]
    }]
});