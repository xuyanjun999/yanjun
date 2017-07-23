Ext.define('xf.controller.org.Company', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.company',

    onItemdblclick: function (me, record, item, index, e, eOpts) {

        this.onEditCallBack(me, record);
    },
    onAddCompany: function (me) {
        var grid = me.up("panel");
        this.onEditCallBack(grid, null);
    },
    onEditCallBack: function (grid, record) {
        var controller = this;
        var win = Ext.create("Ext.window.Window", {
            title: '编辑公司',
            height: 400,
            width: 800,
            layout: 'fit',
            bbar: ['->', {
                text: '保存',
                glyph: 'xf00c@FontAwesome',
                xtype: 'button',
                handler: function () {
                    var form = win.down("form");
                    if (form.getForm().isValid()) {
                        var formValues = form.getValues();
                        if (Ext.isEmpty(record)) {
                            record = Ext.create("xf.model.org.Company");
                            record.set("ID", 0);
                            record.set(formValues);

                        }
                        else {
                            record.set(formValues);
                            Ext.apply(record.raw, record.data);
                        }
                        controller.saveCompany(grid, record, form,win);
                    }
                    else {
                        return;
                    }
                }
            }, {
                text: '取消',
                glyph: 'xf057@FontAwesome',

                handler: function () {
                    win.close();
                }
            }],
            items: [{
                xtype: 'form',
                layout: 'column',
                listeners: {
                    beforeshow: function () {
                        var form = this;
                        if (Ext.isEmpty(record)) {
                            form.getForm().reset();
                        }
                        else {
                            controller.getCompany(record, form);
                        }
                    }
                },
                defaults: {
                    labelAlign: 'top',
                    padding: 5,
                    columnWidth: 0.5
                },
                items: [{
                    xtype: 'textfield',
                    fieldLabel: '英文名称',
                    name: 'EnName'
                }, {
                    xtype: 'textfield',
                    fieldLabel: '中文名称',
                    name: 'CnName'
                }, {
                    xtype: 'textfield',
                    fieldLabel: '简称',
                    name: 'ShortName'
                }, {
                    xtype: 'textfield',
                    fieldLabel: '代码',
                    allowBlank: false,
                    name: 'Code'
                }, {
                    xtype: 'numberfield', allowDecimals: true,
                    fieldLabel: '省会',
                    name: 'Capital'
                }, {
                    xtype: 'datefield',
                    fieldLabel: '注册日期',
                    name: 'RegisterDate'
                }, {
                    xtype: 'numberfield', allowDecimals: false,
                    fieldLabel: '公司类型',
                    name: 'CompType'
                }, {
                    xtype: 'textarea',
                    fieldLabel: '描述',
                    columnWidth: 1,
                    name: 'Des'
                }]
            }]
        });
        win.down("form").fireEvent("beforeshow");
        win.show();
    },

    saveCompany: function (grid, record, form,win) {
       win.setLoading(true);
        try {
            var url = record.url;
            var method = "";
            //record的Id===0,,则是新增
            if (record.get("ID") === 0) {
                method = "POST";
                record.raw = record.getData();
            }
            else {
                method = "PUT";
                url = url + "/" + record.get("ID");
            }
            Ext.Ajax.request({
                url: url,
                method: method,
                params: { record: Ext.JSON.encode([record.raw]), entityName: record.entityName },
                callback: function (option, success, response) {
                    if (success) {

                        var retObj = Ext.JSON.decode(Ext.JSON.decode(response.responseText));
                        console.log(retObj);
                        if (retObj.Success) {

                            Ext.toast("保存成功!", "消息", "t");
                            record.set(retObj.Entitys[0]);
                            form.loadRecord(record);
                            grid.getStore().reload();
                        }
                        else {
                            alert_error("保存失败!" + retObj.Message);
                        }

                    } else {
                        Ext.toast("请求发送失败!", "消息", "t");
                    }
                    win.setLoading(false);
                }
            });
        }
        catch (e) {
            Ext.toast(e.message, "错误", "t");
        }
    },

    getCompany: function (record, form) {
        try {
          
            var url = record.url + "/" + record.get("ID");
            var method = "GET";
            Ext.Ajax.request({
                url: url,
                method: method,
                params: { record: Ext.JSON.encode([{ID:record.get("ID")}]), entityName: record.entityName },
                callback: function (option, success, response) {
                    if (success) {

                        var retObj = Ext.JSON.decode(Ext.JSON.decode(response.responseText));
                        if (retObj.Success) {
                            console.log(retObj);
                            record.set(retObj.Entitys[0]);
                            record.raw = retObj.Entitys[0];
                            form.loadRecord(record);
                        }
                        else {
                            Ext.toast("获取数据失败!", "消息", "t");
                        }

                    } else {
                        Ext.toast("请求发送失败!", "消息", "t");
                    }
                 
                }
            });
        }
        catch (e) {
            Ext.toast(e.message, "消息", "t");
        }
    }
});