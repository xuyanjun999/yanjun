Ext.define('xf.controller.main.Main', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',
    treeStoreBeforeLoad: function (tree, store, operation, eOpts) {
        console.log(operation);
        var dataArgs = new serverNS.dataArgs();
        var searchArgs = new serverNS.searchArgs();
        searchArgs.FieldName = 'ParentID';
        searchArgs.Operator = serverNS.searchOperator.Equal;

        if (operation.isRootLoad)
            searchArgs.Values.push(null);
        else
            searchArgs.Values.push(operation.node.raw.ID);

        dataArgs.Query.Searchs.push(searchArgs);

        tree.commuArgs.ajaxMethod = '/Menu/Gets';
        tree.commuArgs.dataArgs = dataArgs;
    },
    treeItemclick: function (tree, record, item, index, e, eOpts) {

        if (!Ext.isEmpty(record.data.Url)) {
            var tab = tree.up("#mainviewport").down("#maintab");
            var com = Ext.create(record.data.Url);
            com.closable = true;
            tab.add(com).show();
        }
    },

});