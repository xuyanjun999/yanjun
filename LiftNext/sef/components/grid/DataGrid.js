//DataGrid

Ext.define('sef.core.components.grid.DataGrid', {
    extend: 'Ext.grid.Panel',

    xtype: 'sef-datagrid',
    config: {
        showIDCol:false,
        model: null,
        dataExist:'',
        showCheckbox: true,
        showPaging: true,
        showSummary: false,
        maskOnStoreLoading: true,
        displayMsg: '{0} - {1} of {2}',
        showPageSizeSwitcher: true,
        quickSearchInPaging: false,
        quickSearchFields: null,
        bindStoreAtInit: false,
        showRowNumber:true
    },


    makePagingBar: function() {
        return {
            xtype: 'sef-gridpagingbar',
            showPageSizeSwitcher: this.showPageSizeSwitcher,
            //displayInfo: true,
            displayMsg: this.displayMsg,
            quickSearchInPaging: this.quickSearchInPaging,
            quickSearchFields: this.quickSearchFields
        };
    },

    makeFeatures: function() {
        var features = [];
        if (this.showSummary) {
            features.push({
                ftype: 'summary'
            });
        }
        if (features) return features;
        return null;
    },

    makeTBar: function() {
        return null;
    },

    makeCols: function() {
        var me=this,modelMeta = null;
        var model = null;
        if (this.store) {
            if (this.store.getModel) {
                model = this.store.getModel();
            } else {
                model = this.store.model;
            }
            //modelMeta = sef.utils.getModelMeta(this.store.getModel());
        } else {
            model = this.model;
            // modelMeta = sef.utils.getModelMeta(this.model);
        }

        if (model) {
            modelMeta = sef.utils.getModelMeta(model);
        } else {
            throw 'Grid必须定义store或者model';
            //return;
        }

        //console.log('modelMeta#',modelMeta);
        var cols = [];
        if (this.columns) {
            //支持原生的列定义，也可支持基于字符型，用于指定属于Model中的field
            this.columns.forEach(function(c, i) {
                //debugger;
                if (Ext.isString(c)) {
                    //var cc=modelMeta[c];
                    //cc.dataIndex=c;
                    var mc = Ext.Array.findBy(modelMeta, function(mm) {
                        return mm.name === c;
                    });
                    if (mc) {
                        cols.push(mc);
                    } else {
                        cols.push({
                            name: c,
                            text: c,
                            dataIndex: c
                        });
                    }
                    //cols.push(modelMeta[c]);
                } else {
                    cols.push(Ext.merge({}, c));
                }
            });
        } else {
            modelMeta.forEach(function(mm, i) {
                if (mm.invisible !== true) {
                    if(mm.name==='ID'){
                        if(me.showIDCol===true){
                            cols.push(mm);
                        }
                    }else{
                        cols.push(mm);
                    }
                    
                }

            });
        }

        cols.forEach(function(c) {
            Ext.applyIf(c, {
                menuDisabled: true,
                align: 'left',
                dataIndex: c['name']
            });
        });

        if (this.colConfig) {
            //debugger;
            this.colConfig.forEach(function(cc) {
                //Ext.apply()
                var sc = Ext.Array.findBy(cols, function(c) {
                    return c.name === cc.name;
                });
                if (sc) {
                    Ext.apply(sc, cc);
                }
            });
        }

        //console.log(cols);
        if(this.showRowNumber){
            return [{
                xtype:'rownumberer'
            }].concat(cols);
        }
        return cols;
    },


    makeGrid: function() {
        var gridConfig = {

            //pageSize:4,
            //viewType: 'sef-datagrid-view',
            viewConfig: {
                enableTextSelection: true,
                stripeRows: false,
                deferEmptyText: false,
                loadMask: false,
                markDirty: false,
                emptyText: sef.runningCfg.get('GridEmptyText') //,//'没有数据' //SEF.G.Consts.TABLE_EMPTY_TEXT
            },
            columns: this.makeCols()
        };
        var tbar = this.makeTBar();
        if (tbar) {
            gridConfig['tbar'] = tbar;
        }

        gridConfig['features'] = this.makeFeatures();
        if (this.showCheckbox) {
            gridConfig['selModel'] = {
                type: 'checkboxmodel',
                checkOnly: true
            };
        }
        if (this.showPaging) {
            gridConfig['bbar'] = this.makePagingBar();
        }
        return gridConfig;
    },

    dataSelectionChange: function(selected) {
        var vm = this.getViewModel();
        if (vm) {
            var canShow=selected.length>0;
            var vd={
                //action_data_exist:canShow
            }
            if(this.dataExist==='name'){
                vd['action_'+this.name.toLowerCase()+'_data_exist']=canShow;
            }else if(this.dataExist!==false){
                vd['action_data_exist']=canShow;
            }
            
            vm.setData(vd);
            console.log(vd);

        }
        //this.getViewModel()

    },

    onRowDblClick: function(selected) {

    },

    attachStoreEvent: function() {
        if (!this.store) return;
        var me = this;

        this.store.on('load', function() {
            me.maskOnStoreLoading && me.unmask();
        });

        //this.store.on('beforeload')
        if (me.maskOnStoreLoading) {
            this.store.on('beforeload', function(s) {
                //debugger;
                me.mask();
            });
        }
    },

    getSelectionIDs: function() {
        var sel = this.getSelection();
        if (!sel) return [];
        return sel.map(function(r) {
            return r.get('ID');
        });
    },

    initComponent: function() {
        //if(this.bindStoreAtInit===true)this.bindStore(this.store,true);
        Ext.apply(this, this.makeGrid());
        this.callParent(arguments);
        var me = this;
        this.on('selectionchange', function(grid, selected, eOpts) {
            //console.log(selected);
            //debugger;
            me.dataSelectionChange(selected);
        });

        this.on('rowdblclick', function(grid) {
            me.onRowDblClick(grid.getSelection());
        });



        this.attachStoreEvent();

        //this.store.on
    }
});