//RangeField

Ext.define('sef.core.components.form.RangeField',{
    extend:'Ext.form.FieldContainer',
    mixins: [
        'Ext.form.field.Field'
    ],
    xtype:'sef-rangefield',
    cls:'sef-rangefield',
    config:{
        rtype:'textfield'
    },
    layout:{
        type:'hbox',
        align:'middle'
    },

    getValue:function(){
        var v=[this.down('#r1').getValue(),this.down('#r2').getValue()];
        if(v[0] && v[1]){

        }else{
            v=null;
        }
        this.value=v;
        return v;
    },

    initComponent:function(){
        var items=[];
        items.push({
            itemId:'r1',
            xtype:this.rtype,
            flex:1
        });
        items.push({
            xtype:'label',
            cls:'splitter',
            padding:'0 2px 0 2px',
            text:'-'
        });
        items.push({
            itemId:'r2',
            xtype:this.rtype,
            flex:1
        });

        Ext.apply(this,{
            items:items
        });
        this.callParent(arguments);
    }
    
})