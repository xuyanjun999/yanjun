Ext.define('xf.controller.org.Company', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.company',

    getCompanyDataArg: function () {
        var dataArgs = new serverNS.dataArgs();
        dataArgs.ActionDes = '';
        return dataArgs;
    },

    companyBeforeload: function (me, store, action) {
        me.commuArgs.dataArgs = this.getCompanyDataArg();
        me.commuArgs.ajaxMethod = Ext.String.format("/{0}/Gets", me.controllerUrl);
    },

    addCompany: function (btn) {
        var content = this.lookup("content");
        var sggrid = btn.up("sggrid");
        var form = content.down("SGForm");
        if (sggrid.hasListeners.formedit) {
            var b = sggrid.fireEvent("formedit", sggrid, form, null);
            console.log(b);
        }

    },

    editCompany: function (btn) {
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

    saveCompany: function (btn) {
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

    deleteCompany: function (btn) {

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

    back: function (btn, resetData) {
        var content = this.lookup("content");
        var sggrid = content.down("sggrid");
        content.getLayout().setActiveItem(0);
       // sggrid.resetData();
    }

});