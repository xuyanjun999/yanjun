//FormPage.js

Ext.define('sef.core.components.page.FormPage', {
    extend: 'sef.core.components.form.FormPanel',
    mixins: ['sef.core.interfaces.IAppPage'],
    xtype: 'sef-formpage',
    controller: 'sefc-formpagectrl',
    config: {
        //vname:'form',
        //onFormReady:Ext.emptyFn,
        showMode: 'default', //model
        assoField: null,
        assoFieldID: 0,
        recID: 0,
        recPID: 0,
        bars: null,
        listPageName: 'list',
        canBack: true, //支持返回按钮
        canNavRec: true, //支持记录导航
        enableViewMode: true //支持查看模式
    },
    privates: {
        _rec: null,
        _recIndex: -1,
        _recTotal: 0
    },

    applyRecID: function(id) {
        //console.log('will applyRecID#',id);
        if (Ext.isString(id)) {
            if (/^\d{1,}$/.test(id)) {
                id = eval(id);
            } else {
                id = 0;
            }
        }
        this.recID = id;
    },

    viewModel: 'sefv-form',


    makeTBar: function() {
        var bars = null;
        //debugger;
        if (this.bars) {
            bars = this.bars.map(function(btn) {
                var b = Ext.merge({}, btn);
                return b;
            });
            //debugger;
        }

        var bar = {
            xtype: 'toolbar',
            cls: 'form-toolbar',
            items: bars
        };

        if (this.canBack) {
            bar.items.push('-');
            bar.items.push(this.makeBackButton());
        }
        if (this.canNavRec) {
            bar.items.push('->');
            bar.items = bar.items.concat(this.makeRecButtons());
        }



        return bar;
    },

    onRouteChange: function(route) {

        var rid = route.qObj['id'];
        //debugger;
        if (rid) {
            if (/^\d{1,}$/.test(rid)) {
                rid = parseInt(rid);
            }
        } else {
            rid = 0;
        }
        //alert(rid);
        this.setRecID(rid);

        //this.recID = rid;
        //console.log('will change#', route,rid);
        this.switchRecord();
        
        if (this.enableViewMode) {
            if(rid>0){
                this.switchMode(0); //切换到查看模式
            }else{
                this.switchMode(1);
            }
        }
    },

    updateNavRecInfo: function() {
        //var total=0,current=0;
        //var canNext=false,canPrev=false;
        this._recIndex = -1;
        this._recTotal = 0;
        this._recTotal = this.store && this.store.getCount();
        if (this._rec && this.store) {
            this._recIndex = this.store.indexOf(this._rec);

        }

        //console.log('rec#',this._recIndex,this._recTotal);

        this.getViewModel()
            .setData({
                curRecIndex: this._recIndex,
                totalRec: this._recTotal,
                action_data_exist: this.recID > 0
            });
    },

    switchRecord: function() {

        this.updateNavRecInfo();

        if (this._rec && this._rec.get('ID') === this.recID) return;
        //if(this.rid<1)
        if (this.recID > 0) {
            //load record
            this._rec = this.store && this.store.getById(this.recID);
        } else {
            this.reset();
            //add a new record
            if (this.store) {
                var model = this.store.getModel();
                this._rec = new model();
                //console.log('will create new rec#',this._rec);
            } else {
                if (this._rec) {
                    //reset
                    //this.reset();
                    this._rec = null;
                }
            }

        }

        if (this._rec) {
            //console.log('Staff#',this._rec.get('Staff'));
            //debugger;
            if (this.assoField) {
                this._rec.set(this.assoField, this.assoFieldID);
            }
            this.loadRecord(this._rec);
        }

        //console.log('rec#',this._rec);


    },

    initComponent: function() {
        this.beforeReady();
        //console.log('befre form#',this._pid,this.store);
        this.callParent(arguments);

        if (Ext.isFunction(this.onPageReady)) {
            this.onPageReady.call(this);
        }

        if (this.showMode === 'model') {
            //debugger;
            this.switchRecord();
        }
    }
});