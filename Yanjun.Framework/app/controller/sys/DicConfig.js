Ext.define('xf.controller.sys.DicConfig', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dicconfig',
    treeStoreBeforeLoad: function (tree, store, operation, eOpts) {

        var dataArgs = new serverNS.dataArgs();

        var searchArgs = new serverNS.searchArgs();
        searchArgs.FieldName = 'ParentID';
        searchArgs.Operator = serverNS.searchOperator.Equal;

        if (operation.isRootLoad)
            searchArgs.Values.push(null);
        else
            searchArgs.Values.push(operation.node.raw.ID);
        dataArgs.Query.Searchs.push(searchArgs);

        //字段排序
        var sorter = new serverNS.sorter();
        sorter.SortField = 'Sort';
        sorter.SortOrder = serverNS.sortOrder.Asc;
        dataArgs.Query.Sorters.push(sorter);

        tree.commuArgs.ajaxMethod = '/DicConfig/Gets';
        tree.commuArgs.dataArgs = dataArgs;
    },
    treeItemContextMenu: function (tree, record, item, index, e) {

        e.preventDefault();

        e.stopEvent();

        var me = this;

        var content = me.lookup("content");
        var sgform = content.down("SGForm");
        var commonTree = me.lookup("tree");

        var menu = new Ext.menu.Menu({
            //控制右键菜单位置 
            float: true,
            items: [{
                text: "添加子级",
                iconCls: 'add',
                handler: function () {
                    this.up("menu").hide();
                    content.getLayout().setActiveItem(1);
                    sgform.record = null;
                    sgform.beforeshow();
                    sgform.getForm().findField("Parent.Name").setValue(record.raw.Name);
                    sgform.getForm().findField("ParentID").setValue(record.raw.ID);
                }
            }, {
                text: "编辑",
                iconCls: 'edit',
                handler: function () {
                    content.getLayout().setActiveItem(1);
                    sgform.record = record;
                    sgform.beforeshow();
                }
            }, {
                text: "删除",
                iconCls: 'remove',
                handler: function () {
                    this.up("menu").hide();

                    content.getLayout().setActiveItem(1);
                    sgform.record = record;
                    sgform.beforeshow();

                    console.log(tree);

                    alert_confirm(gettext('确定删除[' + record.raw.Name + ']吗?'), function (rtn) {
                        if (rtn === 'yes') {
                            var option = {};
                            option.callBack = function (data) {
                                if (data.Success) {
                                    sgform.record = null;
                                    sgform.getForm().reset();
                                    commonTree.down("CommonTreePanel").reloadChildNodes();

                                }

                            }
                            sgform.del(option);
                        }
                    }, this);

                }
            }
            ]
        }).showAt(e.getXY());//让右键菜单跟随鼠标位置

    },
    treeItemclick: function (tree, record, item, index, e, eOpts) {

        if (!Ext.isEmpty(record.raw)) {
            var content = this.lookup("content");
            //content.getLayout().setActiveItem(1);
            var sggrid = content.down("sggrid");

            var searchArgs = new serverNS.searchArgs();
            searchArgs.FieldName = 'ParentID';
            searchArgs.Operator = serverNS.searchOperator.Equal;
            searchArgs.Values.push(record.raw.ID);

            var option = {
                searchArgs: [searchArgs]
            };
            
            sggrid.tempFilterSearchItems = searchArgs;
            sggrid.search(option);
        }
    },
});