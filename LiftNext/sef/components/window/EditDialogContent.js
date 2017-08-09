//EditDialogContent.js

Ext.define('sef.core.components.window.EditDialogContent',{
    extend: 'Ext.container.Container',
    xtype: 'sef-editdialogcontent',
    mixins:['sef.core.interfaces.IDialogContent'],
    

    layout:'fit',
    config:{
        successClose:true
    },

    initComponent:function(){
        this.callParent(arguments);
        this.initDialog();
        var me=this;
        this.items.get(0).on('formsuccess',function(form,result){
            if(me.successClose){
                me.closeDialog(true,result);
            }
            console.log('form will done=====>');
        });
    }
});