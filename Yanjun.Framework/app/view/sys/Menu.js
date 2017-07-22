Ext.define("xf.view.sys.Menu", {
    extend: 'Ext.panel.Panel',
    layout: 'border',
    frame: true,
    requires: 'xf.model.sys.Menu',
    title: '菜单管理',
    items: [{
        title: '发运日期',
        xtype: 'CommonTreeSearchPanel',
        width: 250,
        collapsible: true,
        collapsed: false,
        region: 'west',
        enableDateSearch: false,
        enableTextSearch: false,
        commonTreeConfig: {
            rootVisible: false,
            itemContextMenu: function (tree, record, item, index, e) {
                console.log(arguments);
                e.preventDefault();
                e.stopEvent(); 

                var menu = new Ext.menu.Menu({
                    //控制右键菜单位置 
                    float: true,
                    items: [{
                        text: "添加顶级菜单",
                        iconCls: 'add',
                        handler: function () {
                            //当点击时隐藏右键菜单 
                           this.up("menu").hide();
                           alert("添加顶级菜单");
                        }
                    }, {
                        text: "添加子菜单",
                        iconCls: 'add',
                        handler: function () {
                            this.up("menu").hide();
                            alert("添加子菜单");
                        }
                    }, {
                        text: "编辑",
                        iconCls: 'edit',
                        handler: function () {
                            this.up("menu").hide();
                            alert("编辑");
                        }
                    }, {
                        text: "删除",
                        iconCls: 'remove',
                        handler: function () {
                            this.up("menu").hide();
                            alert("删除");
                        }
                    }
                    ]
                }).showAt(e.getXY());//让右键菜单跟随鼠标位置

            },
            storeBeforeLoad: function (tree, store, operation, eOpts) {

                var dataArgs = new serverNS.dataArgs()


                var searchArgs = new serverNS.searchArgs();
                searchArgs.FieldName = 'ParentID';
                searchArgs.Operator = serverNS.searchOperator.Equal;

                if (operation.isRootLoad)
                    searchArgs.Values.push(null);
                else
                    searchArgs.Values.push(operation.node.raw.ID);
                dataArgs.Query.Searchs.push(searchArgs);

                tree.commuArgs.ajaxMethod = 'Menu/Gets';
                tree.commuArgs.dataArgs = dataArgs;
            },
            treeNodeClick: function (tree, record, item, index, e) {
                if (record.parentNode == null) {
                    var treeobj = tree.up('CommonTreeSearchPanel');
                    var grid = this.up('SGView').down('sggrid');
                    this.treeRootNodeClick(this, record, grid);
                }
                if (record.raw.Level == 1) {
                    var grid = this.up('SGView').down('sggrid');
                    grid.tempFilterSearchItems = [];

                    // var searchArg = new serverNS.searchArgs(); 
                    // searchArg.FieldName = 'FM.SO.DeliveryDate'; 
                    // searchArg.Values.push(record.raw.Date); 
                    // searchArg.SearchGroupID = 2; 
                    // grid.tempFilterSearchItems.push(searchArg); 

                    grid.resetData();
                }
            }
        }
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
                this.commuArgs.ajaxMethod = "Menu/Gets";
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