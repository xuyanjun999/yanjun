Ext.define('sef.core.components.grid.DataGridFieldCtrl', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.sefc-dgctrl',

    privates: {
        //_dialog:null
    },

    control: {
        'sef-actionbutton': {
            'click': 'onActionButtonClick'
        },

        '#': {
            // 'selectionchange':'onSelectionChange',
            // afterrender: 'onViewportReady',
            beforeDestroy: 'onFieldBeforeDestroy'
        }
    },


    onActionButtonClick: function(btn) {
        //if(btn.isChild)return;
        var command = btn.command || btn.actionName;
        this.onExecuteCommand(command, btn);
        //console.log('will click an action button#',command, btn);
    },

    onExecuteCommand: function(command, btn) {
        if (this.fireViewEvent('childcommand', command, btn) === false) {
            return false;
        };
        var cmdHandlerName = command.toLowerCase() + '__execute';
        var fn = this.view[cmdHandlerName];
        if (Ext.isFunction(fn)) {
            if (fn.call(this.view, btn) === false) return;
        }
        fn = this[cmdHandlerName];
        if (Ext.isFunction(fn)) {
            if (fn.call(this, btn) === false) return;
        }

        cmdHandlerName = cmdHandlerName.replace(this.view.name.toLowerCase() + '_', '');
        fn = this.view[cmdHandlerName];
        if (Ext.isFunction(fn)) {
            if (fn.call(this.view, btn) === false) return;
        }
        fn = this[cmdHandlerName];
        if (Ext.isFunction(fn)) {
            if (fn.call(this, btn) === false) return;
        }

        //console.log('not found#', cmdHandlerName);
    },

    create__execute: function() {
        //console.log('will do create at dgfield');
        if (!this.view.editor) return;
        var cfg = Ext.merge({}, this.view.editor);
        this.showEditDialog(cfg);
        return false;
    },

    edit__execute: function() {
        if (!this.view.editor) return;
        var cfg = Ext.merge({}, this.view.editor);
        var selId=this.view.getSelectionIDs()[0];
        cfg['recID']=selId;
        this.showEditDialog(cfg);
        return;
    },

    showEditDialog: function(cfg) {
        Ext.applyIf(cfg, {
            store: this.view.store,
            assoField: this.view.assoField,
            assoFieldID: this.view.getValue()
        });
        //console.log('cfg===>',cfg);
        var me = this,
            dialog = Ext.create('sef.core.components.window.EditorDialog', cfg);
        dialog.on('dialogclose', function(state, result) {
            //console.log('dialog.close#',state,result);
            if (state === 0) {
                me.view.store && me.view.store.reload();
            }
        });
        dialog.show();
    },

     internalDelete: function() {
        var selIds = this.view.getSelectionIDs();
        var me = this,
            url = '';
        if (this.view.delUrl) {
            url = this.view.delUrl;
        } else {
            url = this.view.store.getProxy().getUrl();
            if (!/\/$/.test(url)) {
                url += '/';
            }
            url += 'delete';
        }


        sef.utils.ajax({
            url: url,
            method: 'POST',
            jsonData: {
                IDS: selIds
            },
            scope: me,
            success: function(result) {
                me.view.store.reload();
            },
            failure: function(err, resp) {

                sef.dialog.error(err.message);

            }
        });

        //console.log(url);
    },

    delete__execute: function(btn) {
        var me = this,
            selIds = this.view.getSelectionIDs();
        //this.internalDelete();

        if (selIds) {
            sef.dialog.confirm(_('确认删除选中的数据?'), '', function() {
                me.internalDelete();
            });
            return false;
        }
    },
    

    onFieldBeforeDestroy: function() {
        if (this._dialog) {
            this._dialog.destroy();
            this._dialog = null;
            delete this._dialog;
        }
    }
});