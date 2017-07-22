Ext.define('xf.controller.sys.Menu', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.menu',
    //左边树节点右键单击事件
    treeItemContextMenu: function (tree, record, item, index, e) {

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
    treeItemclick: function (tree, record, item, index, e, eOpts) {
         
        if (!Ext.isEmpty(record.raw)) {

            var content = this.lookup("content");
            content.getLayout().setActiveItem(1);
            var sgform = content.down("SGForm");
            sgform.record = record;
            sgform.beforeshow();
        }
    }
});