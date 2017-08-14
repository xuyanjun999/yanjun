//Store
Ext.define('sef.core.data.Store', {
    extend: 'Ext.data.Store',
    alias: 'store.sef-store',

    autoDestroy: true,
    autoLoad: false,
    remoteFilter: true,
    remoteSort: true,
    pageSize: 50,
    additionFilterFn:Ext.emptyFn,
    include:null,

    getExData: function() {
        return this.getProxy().getReader().exData;
    },

    makeQuery: function(qObj, isOr,forAdd, forReload) {
        if (!qObj) {
            this.clearFilter();
            return;
        }

        var filters = [];
        for (var q in qObj) {
            var qv = qObj[q];
            if (!qv) continue;
            filters.push({
                property: q,
                value: qv,
                rel:isOr===true?'Or':'And'
            });
        }
        


        if (forAdd === true) {
            this.addFilter(filters, forReload);
        } else {
            this.clearFilter(false);
            this.addFilter(filters, forReload);
            //this.setFilters(filters);
        }

    },


    constructor: function(config) {
        //debugger;
        if (!config.url) {
            var mname = config.model;
            if (mname) {
                var ma = mname = mname.split('.');
                var name = ma[ma.length - 1];
                name = name.replace(/Model$/, ''); //.toLowerCase();
                config.url = '/api/' + name;
            }

        }
        if (!config.proxy) {
            config.proxy = {
                type: 'sef-apiproxy',
                url: config.url
            };
        }
        this.callParent([config]);
        var me=this;
        this.on('beforeload',function(store,oper){
            oper.setParams({
                Include:me.include
            });
            if(Ext.isFunction(this.additionFilterFn)){
                var r=this.additionFilterFn();
                if(r){
                    //console.log('will add aditionfilter#',r);
                    oper.setParams(r);
                }
            }
            //console.log('will before load#',this);
        });
    }

});