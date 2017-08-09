//PageTree.js

Ext.define('sef.core.components.tree.PageTree', {
    extend: 'Ext.tree.Panel',
    xtype: 'sef-pagetree',
    ui: 'sefu-pagetree',
    title: _('系统菜单'),
    iconCls: 'x-fa fa-bars',
    minWidth: 200,
    width: 250,
    collapsible: true,
    useArrows: true,
    border: true,
    rootVisible: false,
    titleCollapse: false,
    autoLoad: true,

    viewConfig: {
        makeDirty: false,
        emptyText: _('没有数据'),
        deferEmptyText: false
    },

    config: {
        rootText: 'All',
        url: '',
        enableCheck: false,
        searchMode: '' //no|date|
    },

    makeBar: function() {
        var me=this;
        if(!this.searchMode)return null;
        return {
            xtype:'sef-treesearchbar',
            _items:['a']
        }
    },

    reload: function() {
        var root = this.getRootNode();
        root.removeAll(false);
        this.getStore().reload();
    },

    initComponent: function() {
        var me = this,
            _autoLoad = this.autoLoad; // === true;
        this.autoLoad = false;
        if (!this.store) {
            this.store = Ext.create('Ext.data.TreeStore', {
                //url:this.url,
                autoLoad: false,
                proxy: {
                    type: 'ajax',
                    url: this.url,
                    paramsAsJson: true,
                    actionMethods: {
                        create: 'POST',
                        read: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },

                    reader: {
                        type: 'sef-jsonreader',
                        rootProperty: 'Result.Children'
                    },
                    _writer: {
                        type: 'sef-jsonwriter',
                        rootProperty: 'TreeRoot',
                        transform: function(data, request) {
                            console.log('=========>>>>');
                            console.log('trans===>', Ext.merge({}, data));
                            return data;
                        }
                    }
                },
                model: this.enableCheck === true ?
                    'sef.core.model.CheckboxTreeModel' : 'sef.core.model.TreeModel'


            });

            this.store.on('beforeload', function(s, oper) {
                var id = oper.getId();
                //console.log('bind_store_data',id,store);
                var _params = Ext.merge({}, oper.getParams()); // || {};

                if (id === 'root') {
                    _params['TreeNode'] = { DataID: 0 };
                } else {
                    var rec = s.getById(id);
                    //debugger;
                    var data = Ext.merge({}, rec.data);
                    var ds = {};
                    for (var d in data) {
                        if (/^[A-Z]/.test(d)) {
                            //console.log(d);
                            if (d !== 'Children') {
                                ds[d] = data[d];
                            }

                        }
                    }
                    _params['TreeNode'] = ds;
                }
                oper.setParams(_params);

            });

            if (_autoLoad) this.store.load();

        }

        Ext.apply(this,{
            tbar:this.makeBar()
        });


        this.callParent(arguments);

    },

    afterRender: function() {
        this.callParent(arguments);
        //this.mask();
        //this.store.load();
    }


});