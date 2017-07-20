
Ext.define("xf.view.sys.Menu", {
    extend: 'Ext.panel.Panel',
    layout: 'border',
    frame: true,
    requires: 'xf.model.sys.Menu',
    title: '菜单管理',
    items: [{
        xtype: "panel",
        region: 'west',
        width: 220
    }, {
        xtype: "panel",
        region: 'east',
        width: 220
    }, {
        xtype: 'panel',
        region: 'center',
        itemId: 'content',
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

                //var searchArgs = new serverNS.searchArgs();
                //searchArgs.FieldName = 'Status';
                //searchArgs.Values.push(0);
                //searchArgs.Operator = serverNS.searchOperator.Equal;
                //dataArgs.Query.Searchs.push(searchArgs);

                return dataArgs;
            },
            beforeload: function (store, action) {
                this.commuArgs.dataArgs = this.getDataArg();
                this.commuArgs.ajaxMethod = "Menu/GetPage";
            },
            quickSearchCols: ['Name'],
            modelName: 'xf.model.sys.Menu',
            tbar: [{
                text: '新建',
                iconCls: 'add',
                handler: function () {
                }
            }, {
                text: '编辑',
                iconCls: 'edit',
                handler: function () {
                    console.log(this.up('panel'));
                    this.up('#content').getLayout().setActiveItem(1);
                }
            }, {
                text: '删除',
                iconCls: 'remove',
                handler: function () {
                }
            }, {
                text: '打印',
                iconCls: 'print',
                handler: function () {
                }
            }]
        }, {
            xtype: "SGForm",
            layout: 'column',
            items: [{
                xtype: 'textfield',
                fieldLabel: '名称',
                columnWidth: 0.5,
                allowBlank: false,
            }],
            tbar: [{
                text: '返回',
                xtype: 'button',
                iconCls: 'back',
                handler: function () {
                    this.up('#content').getLayout().setActiveItem(0);
                }
            }]
        }]
    }]
});