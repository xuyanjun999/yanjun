Ext.define('xf.controller.data.DynamicBlock', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dynamicblock',

    getDynamicBlockDataArg: function () {
        var dataArgs = new serverNS.dataArgs();
        dataArgs.ActionDes = '';
        return dataArgs;
    },

    dynamicBlockBeforeload: function (me, store, action) {
        me.commuArgs.dataArgs = this.getDynamicBlockDataArg();
        me.commuArgs.ajaxMethod = Ext.String.format("/{0}/Gets", me.controllerUrl);
    },

    getDynamicBlockParamDataArg: function () {
        var dataArgs = new serverNS.dataArgs();
        dataArgs.Query.IncludeEntityPaths.push("ParamDefine");
        dataArgs.ActionDes = '';
        return dataArgs;
    },

    dynamicBlockParamBeforeload: function (me, store, action) {

        me.commuArgs.dataArgs = this.getDynamicBlockParamDataArg();
        var sgform = me.up("SGForm");
        if (sgform.record) {

            var searchArg = new serverNS.searchArgs();
            searchArg.FieldName = "DynamicBlockID";
            searchArg.Values.push(sgform.record.data.ID);

            me.commuArgs.dataArgs.Query.Searchs.push(searchArg);
            me.commuArgs.ajaxMethod = Ext.String.format("/{0}/Gets", me.controllerUrl);
        }

    },

    dynamicBlockFormLoadCallback: function (me, data) {
        if (me.record) {
            me.down("sggrid").show();
            me.down("sggrid").refresh();
        }
        else {
            me.down("sggrid").hide();
        }
    },

    addDynamicBlock: function (btn) {
        var content = this.lookup("content");
        var sggrid = btn.up("sggrid");
        var form = content.down("SGForm");
        if (sggrid.hasListeners.formedit) {
            var b = sggrid.fireEvent("formedit", sggrid, form, null);
        }
        form.down("sggrid").hide();

    },

    editDynamicBlock: function (btn) {
        var content = this.lookup("content");
        var sggrid = btn.up("sggrid");
        var form = content.down("SGForm");
        var records = sggrid.getSelectedRowsRecords();
        if (!records || records.length == 0) {
            toast_info('请选中数据');
            return;
        } else {
            sggrid.fireEvent("formedit", sggrid, form, records[0]);
        }
    },

    saveDynamicBlock: function (btn) {
        var me = this;
        var content = this.lookup("content");
        var sggrid = content.down("sggrid");
        var form = btn.up('SGForm');
        var commuArgs = form.commuArgs;
        var dataArgs = commuArgs.dataArgs;
        var option = {
            callBack: function (result) {
                if (result.Success) {
                    sggrid.resetData();
                    if (form.backAfterSave) {
                        me.back();
                    }
                }
            }
        };
        if (form.record) {
            dataArgs.ActionDes = '保存数据';
            form.save(option);
        }
        else {
            dataArgs.ActionDes = '新增数据';
            form.addNew(option);
        }
    },

    deleteDynamicBlock: function (btn) {

        var content = this.lookup("content");
        var sggrid = btn.up("sggrid");

        var option = {};
        option.callBack = function (data) {
            sggrid.resetData();
        }
        var records = sggrid.getSelectedRowsRecords();
        if (!records || records.length == 0) {
            toast_info('请选中要删除的数据');
            return;
        }
        alert_confirm(gettext('确定要删除选中的[' + records.length + ']行数据吗?'), function (rtn) {
            if (rtn === 'yes') {
                var dataArgs = sggrid.commuArgs.dataArgs;
                dataArgs.ActionDes = '删除数据';
                sggrid.del(option);
            }
        }, this);
    },

    aa: function (form,type) {
        var win = new Ext.Window({
            bodyPadding: 0,
            autoScroll: true,
            modal: true,
            title: 'DynamicBlockParam',
            height: 400,
            width: 800,
            defaults: defaultWidgetArgs,
            layout: 'column',
            items: [{
                xtype: 'SGForm',
                columnWidth: 1,
                isInSGView: false,
                apiUrl: '/api/DynamicBlockParam',
                includePath: [],
                listeners: {
                    beforeshow: function (me) {
                        me.getForm().reset();
                        var sgform = me;
                        if (me.record) {
                            var dataArgs = me.commuArgs.dataArgs;
                            dataArgs.ActionDes = '获取数据';
                            sgform.load();
                        }
                        else {
                            me.getForm().reset();
                        }
                    }
                },
                items: [{
                    xtype: 'hiddenfield',
                    fieldLabel: '',
                    name: 'DynamicBlockID'
                }, {
                    xtype: 'textfield',
                    fieldLabel: '参数ID',
                    name: 'ParamDefineID'
                }, {
                    xtype: 'textfield',
                    fieldLabel: '参数编码',
                    name: 'ParamCode'
                }, {
                    xtype: 'textfield',
                    fieldLabel: '默认值',
                    name: 'DefaultValue'
                },]

            }],
            buttons: [{
                text: '取消',
                iconCls: 'SJicon_all btn_cancel',
                handler: function () {
                    win.close();
                }
            }, {
                text: '提交',
                iconCls: 'SJicon_all btn_submit',
                scope: this,
                handler: function () {
                    var form = win.down('SGForm');
                    var commuArgs = form.commuArgs;
                    var dataArgs = commuArgs.dataArgs;

                    var option = {
                        callBack: function () {
                            win.sggrid.refresh();

                            win.close();
                        }
                    };

                    if (form.record) {


                        dataArgs.ActionDes = '保存数据';
                        dataArgs.EntityTypeFullName = 'SG.Eap.Trunk.Entity.DynamicBlockParamEntity';
                        commuArgs.ajaxMethod = ajaxProMethodNS.Update;


                        form.save(option);
                    }
                    else {
                        dataArgs.ActionDes = '新增数据';
                        dataArgs.EntityTypeFullName = 'SG.Eap.Trunk.Entity.DynamicBlockParamEntity';
                        commuArgs.ajaxMethod = ajaxProMethodNS.Add;
                        form.addNew(option);
                    }


                }
            }

            ]
        });
        win.show();
        win.down("SGForm").fireEvent("beforeshow", win.down("SGForm"));
    },

    back: function (btn, resetData) {
        var content = this.lookup("content");
        var sggrid = content.down("sggrid");
        content.getLayout().setActiveItem(0);
        // sggrid.resetData();
    }

});