Ext.define('xf.controller.basedata.ParamDefine', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.paramdefine',

    getParamDefineDataArg: function () {
        var dataArgs = new serverNS.dataArgs();
        dataArgs.ActionDes = '';
        return dataArgs;
    },

    paramDefineBeforeload: function (me, store, action) {
        me.commuArgs.dataArgs = this.getParamDefineDataArg();
        me.commuArgs.ajaxMethod = Ext.String.format("/{0}/Gets", me.controllerUrl);
    }
});