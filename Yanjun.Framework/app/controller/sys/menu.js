Ext.define('xf.controller.sys.Menu', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.menu',
    //左边树节点右键单击事件
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
                    sgform.beforeshow();
                }
            }, {
                text: "添加子菜单",
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
            content.getLayout().setActiveItem(1);
            var sgform = content.down("SGForm");
            sgform.record = record;
            sgform.beforeshow();
        }
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