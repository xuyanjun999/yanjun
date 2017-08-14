Ext.define('xf.controller.data.Block', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.block',

    getDynamicBlockDataArg: function () {
        var dataArgs = new serverNS.dataArgs();
        dataArgs.ActionDes = '';
        return dataArgs;
    },

    blockBeforeload: function (me, store, action) {
        me.commuArgs.dataArgs = this.getDynamicBlockDataArg();
        me.commuArgs.ajaxMethod = Ext.String.format("/{0}/Gets", me.controllerUrl);
    },

    getDynamicBlockParamDataArg: function () {
        var dataArgs = new serverNS.dataArgs();
        dataArgs.Query.IncludeEntityPaths.push("ParamDefine");
        dataArgs.ActionDes = '';
        return dataArgs;
    },

    blockParamBeforeload: function (me, store, action) {

        me.commuArgs.dataArgs = this.getDynamicBlockParamDataArg();
        var sgform = me.up("SGForm");
        if (sgform.record) {

            var searchArg = new serverNS.searchArgs();
            searchArg.FieldName = "BlockID";
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

    getParamDefineDataArg: function () {
        var dataArgs = new serverNS.dataArgs();
        dataArgs.ActionDes = '';
        return dataArgs;
    },

    paramDefineBeforeload: function (me, store, action) {
        me.commuArgs.dataArgs = this.getParamDefineDataArg();
        me.commuArgs.ajaxMethod = Ext.String.format("/{0}/Gets", me.controllerUrl);
    },


});