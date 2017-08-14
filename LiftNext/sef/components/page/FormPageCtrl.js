//ListPageCtrl

Ext.define('sef.core.components.page.FormPageCtrl', {
    extend: 'sef.core.components.page.PageCtrl',

    alias: 'controller.sefc-formpagectrl',

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

    back__execute: function() {
        this.switchToList();
    },

    save__execute: function() {
        //debugger;
        var vf = this.view.hasInvalidField();
        if (vf) {
            sef.message.error(_('当前页面的输入项有错误，请检查'));
            return false;
        }
        //debugger;
        //console.log('v.recID#',this.view.recID);
        if (this.view.recID < 1) {
            //add to the store
            this.view.store.add(this.view._rec);
        }

        this.view.updateRecord(this.view._rec);
        if (this.view.store.getModifiedRecords().length < 1) {
            sef.message.warning(_('数据没有更改，不需要保存'));
            return;
        }
        this.view.mask();
        var me = this;
        this.view.store.sync({
            scope: me,
            success: function(batch) {

                var exResult = batch.proxy.getReader().exResult || {};
                var id = exResult['ID'];
                if (Ext.isNumber(id)) {
                    this.view.setRecID(id);//recID = id;
                }
                this.view.unmask();
                sef.message.success(_('保存成功'));
                this.view.updateNavRecInfo();
                this.fireViewEvent('formsuccess');
                //console.log('success#',batch.getProxy().getReader().exResult);
            },
            failure: function(batch) {
                this.view.unmask();
                var err = sef.utils.formatError(batch);
                sef.dialog.error(err.message);
                if (this.view.recID < 1) {
                    //remove
                    this.view.store.remove(this.view._rec);
                }
                //console.log('failure@',a,b,this);
            }
        });
        //this.view._rec.set('test',9900);
        console.log('saving...#', this.view._rec);
    },

    internalDelete: function() {
        //var selIds = this.view.recID;
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
                //IDS: selIds
                ID: this.view.recID
            },
            scope: me,
            success: function(result) {
                this.view.recID = 0;
                sef.message.success(_('删除成功'));
                this.view._rec=null;
                this.view.store.load();
                this.rec_next__execute();
                this.fireViewEvent('formsuccess');
            },
            failure: function(err, resp) {

                sef.dialog.error(err.message);

            }
        });

        //console.log(url);
    },

    delete__execute: function() {
        var me = this;
        //selIds = this.view.getSelectionIDs();
        //this.internalDelete();

        if (this.view.recID>0) {
            sef.dialog.confirm(_('确认删除选中的数据?'), '', function() {
                me.internalDelete();
            });
            return false;
        }
    },

    edit__execute:function(){
        if(this.view.recID>0){
            //debugger;
            this.view.switchMode(1);
        }
    },

    print__execute:function(){
        var me = this,
            url = '';
        if (this.view.printUrl) {
            url = this.view.printUrl;
        } else {
            url = this.view.store.getProxy().getUrl();
            if (!/\/$/.test(url)) {
                url += '/';
            }
            url += 'print';
        }

        var dialog = Ext.create('sef.core.components.window.PrintDialog', { //SEF.core.view.security.LoginDialog', {
            url: url
        });
        dialog.on('dialogclose', function(state, result) {
            //console.log('export dialog will close#',state,result);
        });
        dialog.show();
    },

    rec_prev__execute: function() {
        if (!this.view.store) return;
        this.view.setRecID(0);

        var index = this.view._recIndex;
        index--;
        if (index < 0) {
            index = 0;
        }

        var r = this.view.store.getAt(index);
        if (r) {
            this.view.recID = r.get('ID');

        }
        this.view.switchRecord();
    },

    rec_next__execute: function() {
        if (!this.view.store) return;
        this.view.setRecID(0);
        //debugger;
        var index = this.view._recIndex;
        index++;
        if (index >= this.view._recTotal) {
            index = 0;
        }

        var r = this.view.store.getAt(index);
        if (r) {
            //this.view.recID = r.get('ID');
            this.view.setRecID(r.get('ID'));
        }

        this.view.switchRecord();


        //this.view.switchRecord();
    },


    switchToList: function(q) {
        if (this.view.listPageName) {
            if (!q) {
                q = {};
            }
            Ext.applyIf(q, {
                    viewname: this.view.listPageName
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