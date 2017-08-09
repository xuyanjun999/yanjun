//ExportDialog

Ext.define('sef.core.components.window.LookupDialog', {
    extend: 'sef.core.components.window.BaseDialog',
    
    xtype: 'sef-lookupdialog',
    //ui:'sefu-lockingwindow',

    title: _('选择数据'),
    closable:false,
    width:600,
    height:400,
    iconCls:'x-fa fa-filter',
    bodyPadding:0,

    config: {
        singleSelection:true,
        quickSearch:null,
        columns:null,
        //model:null,
        store:null
    },

    initComponent: function() {
        
        Ext.apply(this, {
            items: {
                xtype:'sef-lookupdatagrid',
                store:this.store,
                model:this.model,
                columns:this.columns,
                quickSearchInPaging:!!this.quickSearch,
                quickSearchFields:this.quickSearch,
                showCheckbox:!this.singleSelection
            }

        });

        this.callParent(arguments);
        //this.initDialog();
    }
});