//ListPageCtrl

Ext.define('sef.core.components.page.ListPageCtrl', {
    extend: 'sef.core.components.page.PageCtrl',

    alias: 'controller.sefc-listpagectrl',

    control: {

        '#': {
            'rowdblclick': 'onRowDblClick'
        }
    },

    onRowDblClick: function(grid, rec) {
        console.log(rec);
        this.switchToForm({
            id: rec.get('ID')
        });
    },



    refresh__execute: function(btn) {
        if (this.view.store) {
            this.view.store.reload();
            return false;
        }
    },

    create__execute: function(btn) {
        this.switchToForm({id:0});
    },

    edit__execute: function(btn) {
        var selIds = this.view.getSelectionIDs();
        if (selIds) {
            this.switchToForm({
                id: selIds[0], //.get('ID')
                ids: selIds.join(',')
            });
            return false;
        }
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

    export__execute: function(btn) {
        //console.log('will showing a export dialog');
        var me = this,
            url = '';
        if (this.view.exportUrl) {
            url = this.view.exportUrl;
        } else {
            url = this.view.store.getProxy().getUrl();
            if (!/\/$/.test(url)) {
                url += '/';
            }
            url += 'export';
        }

        var dialog = Ext.create('sef.core.components.window.ExportDialog', { //SEF.core.view.security.LoginDialog', {
            //title:'Login',
            //width: 600,
            //height: 600
            url: url
        });
        dialog.on('dialogclose', function(state, result) {
            //console.log('export dialog will close#',state,result);
        });
        dialog.show();
    },

    switchToForm: function(q) {
        if (this.view.editPageName) {
            if (!q) {
                q = {};
            }
            Ext.applyIf(q, {
                    viewname: this.view.editPageName
                })
                //to edit page
            this.switchToPage(q);
            return false;
            //console.log(newHash);
        }
    },

    init: function() {

    }
});