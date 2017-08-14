//SearchField.js

Ext.define('sef.core.components.form.LookupField', {
    extend: 'Ext.form.field.Text',
    xtype: 'sef-lookupfield',
    mixins: ['Ext.util.StoreHolder'],
    //cls:'sef-searchfield',

    //emptyText: 'search',
    editable: false,
    _dialog: null,
    _rawValue: null,

    config: {
        displayField: '',
        valueField: 'ID',
        quickSearch: null,
        columns: null,
        autoLoad: true,
        store: null
    },
    triggers: {
        clear: {
            cls: 'x-fa fa-times',
            hidden: true,
            handler: 'onClearClick',
            scope: 'this',
            weight: 0
        },

        search: {
            weight: 10,
            cls: 'x-fa fa-filter',
            handler: 'onSearchClick',
            scope: 'this'
        }
    },

    onClearClick: function() {
        var me = this;
        me.getTrigger('clear').hide();
        me.setValue('');
        me._rawValue = null;
        me.updateLayout();
        me.fireEvent('quicksearch', me.getValue());
    },
    onSearchClick: function() {
        var me = this;
        if (!this._dialog) {
            this._dialog = Ext.create('sef.core.components.window.LookupDialog', { //SEF.core.view.security.LoginDialog', {
                //url: url

                closeAction: 'hide',
                quickSearch: this.quickSearch,
                store: me.store,
                columns: me.columns

            });
            this._dialog.on('dialogclose', function(state, result) {
                //console.log('export dialog will close#', state, result);
                if (result.Result) {
                    var rec = result.Result[0];
                    var disp = rec.get(this.displayField);
                    var v = rec.get(this.valueField);
                    this._rawValue = v;
                    this.setValue(disp);
                    console.log(rec, this.value, this._rawValue);
                    this.getTrigger('clear').show();
                }else{

                }
                
                this.updateLayout();
            }, me);
        }

        this._dialog.show();


        //me.fireEvent('quicksearch', me.getValue());
    },

    getValue:function(){
        return this._rawValue;
    },

    setValue:function(v){
        if(!v){
            this._rawValue=0;
            return;
        }

        if(Ext.isObject(v)){
            this._rawValue=v[this.valueField];
            return this.callParent([v[this.displayField]]);
        }
        return this.callParent([v]);
    },

    initComponent: function() {
        //this.debug(arguments);
        //debugger;
        this.callParent(arguments);
        //this.setUI('searchbox');
        var me = this;
        me.on('specialkey', function(f, e) {
            if (e.getKey() == e.ENTER) {
                me.onSearchClick();
            }
        });
        //debugger;
        //var store=this.store;
        this.bindStore(this.store, true);
        if (this.store) {
            this.store.setAutoLoad(this.autoLoad);
        }
        //console.log(this.store);
    },

    onDestroy: function() {
        this.unbindStoreListeners(this.store);
        this.store.destroy();
        //this.unBindStore(this.store);
        if (this._dialog) {
            this._dialog.destroy();
            this._dialog = null;
            delete this._dialog;
        }
        this.callParent(arguments);

    }
});