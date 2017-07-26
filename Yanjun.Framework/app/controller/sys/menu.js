Ext.define('xf.controller.sys.Menu', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.menu',
    treeStoreBeforeLoad: function (tree, store, operation, eOpts) {

        var dataArgs = new serverNS.dataArgs();

        var searchArgs = new serverNS.searchArgs();

        searchArgs.FieldName = 'ParentID';

        searchArgs.Operator = serverNS.searchOperator.Equal;

        if (operation.isRootLoad)
            searchArgs.Values.push(null);
        else
            searchArgs.Values.push(operation.node.data.ID);

        dataArgs.Query.Searchs.push(searchArgs);

        tree.commuArgs.ajaxMethod = '/Menu/Gets';

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
                text: "添加顶级菜单",
                iconCls: 'add',
                handler: function () {
                    //当点击时隐藏右键菜单 
                    this.up("menu").hide();
                    content.getLayout().setActiveItem(1);
                    sgform.record = null;
                    sgform.fireEvent("beforeshow", sgform);
                }
            }, {
                text: "添加子菜单",
                iconCls: 'add',
                handler: function () {
                    this.up("menu").hide();
                    sgform.record = null;
                    sgform.fireEvent("beforeshow", sgform);
                    content.getLayout().setActiveItem(1);
                    sgform.getForm().findField("Parent.Name").setValue(record.data.Name);
                    sgform.getForm().findField("ParentID").setValue(record.data.ID);
                }
            }, {
                text: "编辑",
                iconCls: 'edit',
                handler: function () {
                    sgform.record = record;
                    content.getLayout().setActiveItem(1);
                    sgform.fireEvent("beforeshow", sgform);
                }
            }, {
                text: "删除",
                iconCls: 'remove',
                handler: function () {
                    this.up("menu").hide();

                    sgform.record = record;
                    sgform.fireEvent("beforeshow", sgform);
                    content.getLayout().setActiveItem(1);
                    console.log(tree);

                    alert_confirm(gettext('确定删除[' + record.data.Name + ']吗?'), function (rtn) {
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
        console.log(record);
        if (!Ext.isEmpty(record.data)) {


            var content = this.lookup("content");
            var sgform = content.down("SGForm");
            sgform.record = record;
            var com = content.getLayout().getActiveItem();
            if (com.xtype == "SGForm") {
                sgform.fireEvent("beforeshow", sgform);
            }
            else {
                content.getLayout().setActiveItem(1);
            }

        }
    },
    getMenuDataArg: function () {
        var dataArgs = new serverNS.dataArgs();
        dataArgs.ActionDes = '';
        return dataArgs;
    },

    menuBeforeload: function (me, store, action) {
        me.commuArgs.dataArgs = this.getMenuDataArg();
        me.commuArgs.ajaxMethod = Ext.String.format("/{0}/Gets", me.controllerUrl);
    },
    formSave: function (btn) {
        var form = btn.up('SGForm');
        var commuArgs = form.commuArgs;
        var dataArgs = commuArgs.dataArgs;
        var option = {};
        var me = this;
        var tree = this.lookup("tree");
        option.callBack = function (data) {
            tree.down("CommonTreePanel").reloadChildNodes();
        }
        if (form.record) {
            dataArgs.ActionDes = '保存数据';
            form.save(option);
        }
        else {
            dataArgs.ActionDes = '新增数据';
            form.addNew(option);
        }
    }
});