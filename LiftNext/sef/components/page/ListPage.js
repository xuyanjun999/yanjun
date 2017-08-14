//ListPage.js

Ext.define('sef.core.components.page.ListPage', {
    extend: 'sef.core.components.grid.DataGrid',
    mixins: ['sef.core.interfaces.IAppPage'],
    xtype: 'sef-listpage',
    controller:'sefc-listpagectrl',
    viewModel: {
        data: {
            action_data_exist: false
            /*
            action_can_read: true,
            action_can_edit: true,
            action_can_delete: true,
            action_can_refresh: true,
            action_can_create: true,
            action_can_export:true
            */
        }
    },

    config: {
        //vname:'list',
        bars: null,
        enableRefresh: true,
        editPageName:'form',
        dbClickToEdit:true,
        searchConfig: {
            quickSearch: null,
            advSearch: null
        }
    },



    makeActionBars: function() {
        var bars = null;
        if (this.bars) {
            bars = this.bars.map(function(btn) {
                var b = Ext.merge({}, btn);
                return b;
            });
        }
        if (bars) {
            if (this.enableRefresh) {
                bars.push(sef.runningCfg.BUTTONS.REFRESH);
            }
            bars.forEach(function(b) {
                b.text = _(b.text);
            });
        }

        return {
            xtype: 'toolbar',
            items: bars
        }
    },

    makeSearchBar: function() {
        var me = this;
        if (!this.searchConfig) return null;
        if (this.searchConfig.quickSearch || this.searchConfig.advSearch) {
            return {
                xtype: 'sef-searchbar',
                searchItems:me.searchConfig.advSearch,
                model:me.model||me.store.getModel(),
                columnWidth:me.searchConfig.columnWidth||0,
                listeners: {
                    'search': me.onSearch,
                    scope: me
                }
            };
        }

        return null;

    },

    makeTBar: function() {
        var bar = {
            xtype: 'container',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [this.makeActionBars(), this.makeSearchBar()]
        };

        return bar;
    },

    onSearch: function(v) {
        //console.log('will process search#', v, this);
        if(!v){
            this.store.clearFilter();
            //this.store.reload();
        }else{
            var isOr=false;
            if(Ext.isString(v)){
                if(this.searchConfig.quickSearch){
                    //var vv={__QUICK:true};
                    var vv={};
                    var qf=this.searchConfig.quickSearch;
                    if(Ext.isString(this.searchConfig.quickSearch)){
                        qf=[this.searchConfig.quickSearch];
                    }
                    qf.forEach(function(q){
                        vv[q]=v;
                    });
                    isOr=true;
                    v=vv;
                }else{
                    console.error('没有定义快速搜索项');
                    throw "Not define QuickSearch Config";
                }
                //vv[]
            }
            this.store.makeQuery(v,isOr);
            
            
        }
    },

    initComponent: function() {
        this.beforeReady();
        //console.log('befre list#',this._pid);
        this.callParent(arguments);



        this.updatePermission({
            //action_can_data_exist: false,
            read: true,
            edit: true,
            delete: true,
            refresh: true,
            create: true,
            export:true
        });

        if(Ext.isFunction(this.onPageReady)){
            this.onPageReady.call(this);
        }
        //console.log('after list#');
    }
});