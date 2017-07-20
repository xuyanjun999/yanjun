Ext.define('xf.controller.main.Main', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',
    // requires: 'EAP.common.TreeNodeData',

    ///页面初始化时第一级菜单要加载数据
    onFirstMenuAfterrender: function (me, options) {

        var menuName = me.getTitle();

        var tree = this.getMenuTree(me.itemId);

        me.add(tree).show();
    },


    onOtherMenuExpand: function (me, options) {
        var menuName = me.getTitle();
        //判断是否有树
        var tree = me.down("treepanel");
        if (!Ext.isEmpty(tree)) {
            return;
        }
        me.setLoading(true);

        tree = this.getMenuTree(me.itemId);
        me.add(tree).show();
        me.setLoading(false);
    },

    //加载模块菜单
    afterMenuPanelRender: function (me, e) {
        Ext.Ajax.request({
            url: '/Menu/ListModuleMenu',
            success: function (response, opts) {
                console.log(response);
                var result = Ext.decode(response.responseText);
                if (result.Success) {
                    Ext.each(result.Data, function (item, index) {
                        if (index == 0) {
                            me.add({
                                title: item.Name,
                                itemId: item.ID,
                                iconCls: item.IconResource,
                                layout: 'fit',
                                listeners: {
                                    afterrender: "onFirstMenuAfterrender",
                                }
                            });
                        }
                        else {
                            me.add({
                                title: item.Name,
                                itemId: item.ID,
                                iconCls: item.IconResource,
                                layout: 'fit',
                                listeners: {
                                    afterrender: "onOtherMenuExpand",
                                }
                            });
                        }
                    });
                }
            },

            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },

    getMenuTree: function (id) {
        var treeStore = Ext.create('Ext.data.TreeStore', {
            rootVisible: true,
            autoLoad: true,
            remoteSort: true,
            model: 'xf.common.TreeNodeData',
            proxy: {
                type: 'ajax',

                url: '/Menu/ListModuleMenu',
                extraParams: {
                    parentId: id
                },
                reader: {
                    type: 'json',
                    rootProperty: 'Data',
                    totalProperty: 'Total',
                    successProperty: 'Success'
                },
            }
        });

        var tree = Ext.create('Ext.tree.Panel', {
            store: treeStore,
            rootVisible: false,
            useArrows: true,
            listeners: {
                itemclick: function (tr, record, item, index, e, eOpts) {
                    console.log(arguments);
                    debugger
                    if (!Ext.isEmpty(record.data.Url)) {
                        var tab = tr.up("#mainviewport").down("#maintab");
                        var com = Ext.create(record.data.Url);
                        com.closable = true;
                        tab.add(com).show();
                    }
                },
                beforeload: function (store, operation, eOpts) {
                    store.getProxy().setExtraParam("parentId", operation.node.raw.ID);
                }
            }
        });

        return tree;
    }

});