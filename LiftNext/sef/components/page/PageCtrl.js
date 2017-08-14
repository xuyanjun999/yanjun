//ListPageCtrl

Ext.define('sef.core.components.page.PageCtrl', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.sefc-pagectrl',

    control: {
        '*': {
            'childcommand': 'onChildCommand'
        },
        'sef-actionbutton': {
            'click': 'onActionButtonClick'
        }
        //'childcommand':'onChildCommand',

    },


    onChildCommand: function(child, cmd, btn) {
        //console.log('will catch a child command',cmd,btn);
        return this.onExecuteCommand(cmd, btn);
    },


    onActionButtonClick: function(btn) {
        if(btn.isChild===true)return false;
        var command = btn.command || btn.actionName;
        this.onExecuteCommand(command, btn);
        //console.log('will click an action button#',command, btn);
    },

    onExecuteCommand: function(command, btn) {
        //console.log('here catching....',command);
        //debugger;
        var cmdHandlerName = command.toLowerCase() + '__execute';
        var fn = this.view[cmdHandlerName];
        if (Ext.isFunction(fn)) {
            if (fn.call(this.view, btn) === false) return false;
        }
        fn = this[cmdHandlerName];
        if (Ext.isFunction(fn)) {
            if (fn.call(this, btn) === false) return false;
        }

        console.log('not found#', cmdHandlerName);
    },

    switchToPage: function(q) {
        var newHash = sef.utils.encodeHash(this.view._routes, q);
        this.redirectTo(newHash);
    }


});