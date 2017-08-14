//override
Ext.define('sef.core.components.grid.DataGridViewTable',{
    extend:'Ext.view.Table',
    xtype:'sef-datagrid-view',
    initComponent:function(){
        console.log('here is working...');
        return this.callParent(arguments);
    }
});