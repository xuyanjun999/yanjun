//SearchField.js

Ext.define('sef.core.components.form.SearchField', {
    extend: 'Ext.form.field.Text',
    xtype: 'sef-searchfield',
    cls:'sef-searchfield',

    emptyText: 'search',
    triggers: {
        clear: {
            cls: 'x-fa fa-times',
            hidden: true,
            handler: 'onClearClick',
            scope: 'this',
            weight: 0
        },

        search: {
            weight: 10,
            cls: 'x-fa fa-search',
            handler: 'onSearchClick',
            scope: 'this'
        }
    },

    onClearClick: function() {
        var me = this;
        me.getTrigger('clear').hide();
        me.setValue('');
        me.updateLayout();
        me.fireEvent('quicksearch', me.getValue());
    },
    onSearchClick: function() {
        var me = this;
        me.getTrigger('clear').show();
        me.updateLayout();
        me.fireEvent('quicksearch', me.getValue());
    },

    initComponent: function() {
        //this.debug(arguments);
        //debugger;
        this.callParent(arguments);
        //this.setUI('searchbox');
        var me = this;
        me.on('specialkey', function(f, e) {
            if (e.getKey() == e.ENTER) {
                me.onSearchClick();
            }
        });
    }
});