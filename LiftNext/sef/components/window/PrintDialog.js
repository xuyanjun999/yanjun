//ExportDialog

Ext.define('sef.core.components.window.PrintDialog', {
    extend: 'sef.core.components.window.BaseDialog',
    
    xtype: 'sef-printdialog',
    //ui:'sefu-lockingwindow',

    title: _('打印'),
    closable:false,
    width:'80%',
    height:'80%',
    iconCls:'x-fa fa-print',
    
    config: {
        url: '',
        cancelText:'',
        okText:_('关闭')
    },

    initComponent: function() {
        
        Ext.apply(this, {
            items: {
                xtype:'component',
                layout:'fit',
                autoEl:{
                    tag:'iframe',
                    src:this.url,
                    frameborder:0,
                    width:'100%',
                    height:'100%'
                }
            }

        });

        this.callParent(arguments);
        //this.initDialog();
    }
});