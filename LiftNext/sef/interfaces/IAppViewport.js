//IAppViewport


Ext.define("sef.core.interfaces.IAppViewport", {
    showLogin: function() {
        console.log('will show login now', this);
    },

    _makeLayout: function() {
        return null;
    }
});