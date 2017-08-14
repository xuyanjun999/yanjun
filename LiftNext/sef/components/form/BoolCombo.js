//BoolComob.js

Ext.define('sef.core.components.form.BoolCombo', {
    extend: 'Ext.form.field.ComboBox',
    xtype: 'sef-boolcombo',
    editable:false,

    config: {
        trueText: 'True',
        falseText: 'False',
        trueValue: true,
        falseValue: false
    },

    initComponent: function() {
        //this.debug(arguments);
        var data = [];
        data.push({
            text: this.trueText,
            value: this.trueValue
        });

        data.push({
            text: this.falseText,
            value: this.falseValue
        });

        Ext.apply(this, {
            displayField: 'text',
            valueField: 'value',
            store: Ext.create('Ext.data.Store', {
                fields: ['text', 'value'],
                data: data
            })
        });

        this.callParent(arguments);
    }
});