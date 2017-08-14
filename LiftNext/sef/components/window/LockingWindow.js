//Locking Dialog

Ext.define('sef.core.components.window.LockingWindow', {
    extend: 'Ext.window.Window',
    xtype: 'sef-lockingwindow',
    ui:'sefu-lockingwindow',
    title:null,
    header:false,
    //cls: 'sef-locked-window',
    closable: false,
    resizable: false,
    autoShow: true,
    //titleAlign: 'center',
    maximized: true,
    modal: true,

    //defaultFocus: 'textfield:focusable:not([hidden]):not([disabled]):not([value])',

    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    }
});