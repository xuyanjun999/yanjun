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
    }
});