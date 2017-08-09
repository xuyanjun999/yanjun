//Base Dialog

Ext.define('sef.core.components.window.BaseDialog', {
    extend: 'Ext.window.Window',
    xtype: 'sef-basedialog',
    ui: 'sefu-basedialog',
    closable: true,
    resizable: false,
    autoShow: false,

    modal: true,
    layout: 'fit',
    bodyPadding: 10,
    minWidth: 320,
    defaultFocus: 'textfield:focusable:not([hidden]):not([disabled]):not([value])',
    config: {
        //longTask:false,
        showBar: true,
        okText: 'OK',
        cancelText: 'Cancel',
        dynamicContent:false
    },
    _dialogResult: {},

    //onBeforeDialogClose:Ext.emptyFn,

    onBeforeCloseDialog:function(){
        return true;
    },

    closeDialog: function(state, action) {
        /*
        state=0     ==>press ok button
        state=1     ==>press cancel button
        state=2     ==>press close icon

        action=0    ==>from dialog self
        action=1    ==>from content
        */
        //if(this.longTask){}
        if (action === 0 && state === 0) {

            if(this.onBeforeCloseDialog()===false)return;
            
            if (this.fireEvent('willclosedialog', this, this._dialogResult) === false) {
                return;
            }

        }
        this.fireEvent('dialogclose', state, this._dialogResult);
        this.close();
    },

    setDialogLoading: function(loading, cancelable) {
        var btn = this.down('#okBtn');
        btn && btn.setLoading(loading);
        if (cancelable === false) {
            //if(loading)
            btn = this.down('#cancelBtn');
            btn && btn.setDisabled(loading);
        }
    },



    initComponent: function() {
        var me = this;
        if (this.showBar && !this.bbar) {
            var bar = [];
            bar.push('->');
            if (this.cancelText) {
                bar.push({
                    text: this.cancelText,
                    itemId: 'cancelBtn',
                    btnType: 'default',
                    minWidth: 80,
                    handler: function() {
                        me.closeDialog(1, 0);
                    }
                });
            }

            bar.push({
                text: this.okText,
                itemId: 'okBtn',
                btnType: 'primary',
                minWidth: 80,
                handler: function() {
                    me.closeDialog(0, 0);
                }
            });
            Ext.apply(this, {
                bbar: {
                    xtype: 'toolbar',
                    items: bar,
                    padding: 8
                }
            });
        }

        //this.on('')
        this.on('dialogcontentclose', function(status, result) {
            //console.log('catch fclose#',status,result);
            this._dialogResult = result || {};
            this.closeDialog(status === true ? 0 : 1, 1);
        });

        this.on('contentload',function(isloading){
            if(this.dynamicContent !==true)return;
            if(isloading===true){
                this.mask();
            }else{
                this.unmask();
            }
        },me);

        this.callParent(arguments);
        
    },

    _afterRender:function(){
        this.callParent(arguments);
        if(this.dynamicContent===true){
            this.mask();
            //this.setDialogLoading(true,false);
        }
    }
});