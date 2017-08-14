//ExportDialog

Ext.define('sef.core.components.window.EditorDialog', {
    extend: 'sef.core.components.window.BaseDialog',

    xtype: 'sef-editordialog',
    //ui:'sefu-lockingwindow',

    title: _('编辑窗口'),
    closable: true,
    width: '70%',
    height: '75%',
    iconCls: 'x-fa fa-cube',
    showBar: false,
    bodyPadding:0,
    config: {
        assoField:null,
        assoFieldID:0,
        recID:0,
        formType: null,
        store:null
            //cancelText: '',
            //okText: _('关闭')
    },




    initComponent: function() {

        Ext.apply(this, {
            items: {
                xtype: 'sef-editdialogcontent',
                items: {
                    xtype: this.formType,
                    store:this.store,
                    canBack:false,
                    canNavRec:false,
                    showMode:'model',
                    recID:this.recID,
                    assoField:this.assoField,
                    assoFieldID:this.assoFieldID
                }
            }
        });

        this.callParent(arguments);
        //this.initDialog();
    },

    _afterRender: function() {
        this.callParent(arguments);
        this.mask();
        this.loadLog();
    }
});