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

});