//BoolRadioGroup.js

Ext.define('sef.core.components.form.BoolRadioGroup',{
    extend:'Ext.form.RadioGroup',
    xtype:'sef-boolradiogroup',
    simpleValue:true,
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
            boxLabel: this.trueText,
            inputValue: this.trueValue,
            name:this.name
        });

        data.push({
            boxLabel: this.falseText,
            inputValue: this.falseValue,
            name:this.name
        });

        Ext.apply(this, {
            items:data
        });

        this.callParent(arguments);
    }
});