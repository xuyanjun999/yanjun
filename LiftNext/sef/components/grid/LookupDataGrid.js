//LookupDataGrid

Ext.define('sef.core.components.grid.LookupDataGrid', {
    extend: 'sef.core.components.grid.DataGrid',
    mixins: ['sef.core.interfaces.IDialogContent'],
    xtype: 'sef-lookupdatagrid',
    layout: 'fit',
    showPageSizeSwitcher:false,
    displayMsg:false,
    //quickSearchInPaging:true,
    quickSearchFields:null,
    //showCheckbox:true,

    onRowDblClick:function(selected){
        //console.log('row.dbl#',selected);
        this.closeDialog(true,{Result:selected});
    },

    makeDialogResult:function(){
        var selected=this.getSelection();
        //this.closeDialog(true,selected);
        return {Result:selected};
    },
    

    initComponent: function() {
        this.callParent(arguments);
        this.initDialog();

       
    }
});