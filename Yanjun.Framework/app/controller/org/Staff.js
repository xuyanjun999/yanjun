Ext.define('xf.controller.org.Staff', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.staff',

    treeStoreBeforeLoad: function (tree, store, operation, eOpts) {

        console.log(operation);

        var dataArgs = new serverNS.dataArgs();

        var searchArgs = new serverNS.searchArgs();

        tree.commuArgs.ajaxMethod = '/OrgTree/GetStaffTree';

        tree.commuArgs.dataArgs = dataArgs;
    },

    treeItemclick: function (tree, record, item, index, e, eOpts) {
        console.log(record);
        var content = this.lookup("content");
        var sggrid = content.down("sggrid");

        var searchArgs = [];
        var searchArg = new serverNS.searchArgs();
        searchArg.FieldName = "CompanyID";
        searchArg.Values = [record.data.CID];

        searchArgs.push(searchArg);
        var option = {
            searchArgs: searchArgs
        };
        //  grid.tempFilterSearchItems=searchArgs;
        sggrid.search(option);
    },

    getStaffDataArg: function () {
        var dataArgs = new serverNS.dataArgs();
        dataArgs.Query.IncludeEntityPaths.push("Company");
        dataArgs.ActionDes = '';
        return dataArgs;
    },

    staffBeforeload: function (me, store, action) {
        me.commuArgs.dataArgs = this.getStaffDataArg();
        me.commuArgs.ajaxMethod = Ext.String.format("/{0}/Gets", me.controllerUrl);
    },

    companyBeforeload: function (grid, store, action) {
        var dataArgs = grid.commuArgs.dataArgs;
        dataArgs.ActionDes = '获取供应商';
        grid.commuArgs.ajaxMethod = "/Company/Gets";
        var searchArgs = new serverNS.searchArgs();
        searchArgs.Operator = serverNS.searchOperator.Equal;
        dataArgs.Query.Searchs.push(searchArgs);

    },

    addStaff: function (btn) {
        var content = this.lookup("content");
        var sggrid = btn.up("sggrid");
        var form = content.down("SGForm");
        if (sggrid.hasListeners.formedit) {
            var b = sggrid.fireEvent("formedit", sggrid, form, null);
        }

    },

    editStaff: function (btn) {
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

    saveStaff: function (btn) {
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

    deleteStaff: function (btn) {

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