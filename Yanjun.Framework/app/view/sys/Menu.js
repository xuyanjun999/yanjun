﻿Ext.define("xf.view.sys.Menu", {
    extend: 'Ext.panel.Panel',
    layout: 'border',
    frame: true,
    controller: 'menu',
    title: '菜单管理',
    items: [{
        title: '发运日期',
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
                itemcontextmenu: 'treeItemContextMenu',
                itemclick: 'treeItemclick',
                storebeforeload:'treeStoreBeforeLoad'
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
            getDataArg: function () {
                var dataArgs = new serverNS.dataArgs();
                dataArgs.ActionDes = '';
                dataArgs.Query.IncludeEntityPaths.push('Parent');
                //var searchArgs = new serverNS.searchArgs();
                //searchArgs.FieldName = 'Status';
                //searchArgs.Values.push(0);
                //searchArgs.Operator = serverNS.searchOperator.Equal;
                //dataArgs.Query.Searchs.push(searchArgs);

                return dataArgs;
            },
            beforeload: function (store, action) {
                this.commuArgs.dataArgs = this.getDataArg();
                this.commuArgs.ajaxMethod = "/Menu/Gets";
            },
            quickSearchCols: ['Name'],
            modelName: 'xf.model.sys.Menu',
            tbar: [{
                text: '新建',
                hidden: true,
                iconCls: 'add',
                handler: function () {
                }
            }, {
                text: '编辑',
                iconCls: 'edit',
                hidden: true,
                handler: function () {
                    console.log(this.up('panel'));
                    this.up('#content').getLayout().setActiveItem(1);
                }
            }, {
                text: '删除',
                hidden: true,
                iconCls: 'remove',
                handler: function () {
                }
            }, {
                text: '打印',
                hidden: true,
                iconCls: 'print',
                handler: function () {
                }
            }]
        }, {
            xtype: 'SGForm',
            layout: 'column',
            defaults: {
                margin: '2 5 0 2',
                xtype: 'textfield',
                labelAlign: 'top',
                columnWidth: .5,
                labelSeparator: '',
                msgTarget: 'side'
            },
            split: true,
            autoScroll: true,
            title: '明细',
            border: false,
            apiUrl: '/api/Menu',
            includePath: ["Parent"],
            beforeshow: function () {
                this.getForm().reset();
                var sgform = this;
                if (this.record) {
                    var dataArgs = this.commuArgs.dataArgs;
                    dataArgs.ActionDes = '获取数据';
                    sgform.load();
                }
                else {
                    this.getForm().reset();
                }
            },
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