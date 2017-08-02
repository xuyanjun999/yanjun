Ext.define('xf.controller.data.Model', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.model',

    getModelDataArg: function () {
        var dataArgs = new serverNS.dataArgs();
        dataArgs.ActionDes = '';
        return dataArgs;
    },

    modelBeforeload: function (me, store, action) {
        me.commuArgs.dataArgs = this.getModelDataArg();
        me.commuArgs.ajaxMethod = Ext.String.format("/{0}/Gets", me.controllerUrl);
    },

    getModelConfigDataArg: function () {
        var dataArgs = new serverNS.dataArgs();
        dataArgs.Query.IncludeEntityPaths.push("Model");
        dataArgs.ActionDes = '';
        return dataArgs;
    },

    modelConfigBeforeload: function (me, store, action) {

        me.commuArgs.dataArgs = this.getModelConfigDataArg();
        var sgform = me.up("SGForm");
        if (sgform.record) {

            var searchArg = new serverNS.searchArgs();
            searchArg.FieldName = "ModelID";
            searchArg.Values.push(sgform.record.data.ID);

            me.commuArgs.dataArgs.Query.Searchs.push(searchArg);
            me.commuArgs.ajaxMethod = Ext.String.format("/{0}/Gets", me.controllerUrl);
        }

    }


});