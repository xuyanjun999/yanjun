//BoolComob.js

Ext.define('sef.core.components.form.EnumCombo', {
    extend: 'Ext.form.field.ComboBox',
    xtype: 'sef-enumcombo',
    editable:false,

    config: {
        enumType:''//SEF.Core.Common.TestEnum,SEF.Core.Common
    },

    initComponent: function() {
        //this.debug(arguments);
        //window.sef_static_data.SEF_Core_Common_TestEnum
        var types=this.enumType.split(',');
        var enumName=types[0];
        enumName=enumName.replace(/\./g,'_');
        
        var data = window.sef_static_data[enumName];
        

        Ext.apply(this, {
            displayField: 'Text',
            valueField: 'Value',
            store: Ext.create('Ext.data.Store', {
                fields: ['Text', 'Value'],
                data: data
            })
        });

        this.callParent(arguments);
    }
});