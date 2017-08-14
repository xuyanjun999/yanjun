//GridPagingToolbar.js

Ext.define('sef.core.components.bar.GridPagingToolbar', {
    extend: 'Ext.toolbar.Paging',
    xtype: 'sef-gridpagingbar',
    ui: 'sefu-gridpagingbar',
    inputItemWidth: 40,

    //DEFAULT_STATUS_TIP:[{text:'default'}]
    config: {
        gridTip: null,
        statusTip: [],
        showPageSizeSwitcher: true,
        quickSearchInPaging: true,
        quickSearchFields: null
    },

    initComponent: function() {
        this.displayInfo = false;
        this.callParent(arguments);
        this.displayInfo = true;
    },
    makePageSizeOption: function() {
        var me=this;
        var sizeData = [{
            name: '50/page',
            value: 50
        }, {
            name: '100/page',
            value: 100
        }];
        return {
            xtype: 'combo',
            ui: 'sefu-textfield-paging',
            editable: false,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'value',
            width: 100,
            emptyText: _('PageSize'),
            store: Ext.create('Ext.data.Store', {
                data: sizeData
            }),
            listeners:{
                scope:me,
                change:me.onPageSizeChange
            }
        };

    },

    onPageSizeChange:function(cb,newPageSize){
        //console.log(newPageSize);
        var me=this,store=me.store;
        //debugger;
        if(store.getPageSize()!=newPageSize){
            store.setPageSize(newPageSize);
            store.currentPage=1;//(0);
            store.loadPage(store.currentPage);
            return true;
        }
        return false;
    },

    makeGridTip: function() {
        if (this.gridTip) {
            return this.gridTip;
        }
        if (this.statusTip) {
            //todo.
        }



        return null;
    },

    makeQuickSearch: function() {
        if (this.quickSearchInPaging === true) {
            var me = this;
            return {
                xtype: 'sef-searchfield',
                flex: 1,
                listeners: {
                    quicksearch: function(v) {
                        if (me.quickSearchFields) {
                            var q = {};
                            me.quickSearchFields.forEach(function(qf) {
                                q[qf] = v;
                            });
                            me.getStore().makeQuery(q, true);
                        }

                    }
                }

            };
        }
        return null;
    },

    getPagingItems: function() {
        var items = this.callParent(arguments);

        if (this.showPageSizeSwitcher === true) {
            items = Ext.Array.insert(items, 7, [this.makePageSizeOption(), '-']);
        }

        var newItems = [];
        var it = this.makeGridTip();
        if (it) newItems.push(it);
        it = this.makeQuickSearch();
        if (it) newItems.push(it);
        else {
            newItems.push('->');
        }


        newItems = newItems.concat(items);
        newItems.forEach(function(item) {
            //if(!item)return ;
            if (!item) return;
            if (item.itemId === 'first' ||
                item.itemId === 'prev' ||
                item.itemId === 'next' ||
                item.itemId === 'last' || item.itemId === 'refresh') {
                //item.ui = 'sefu-btn-paging';
            }
            if (item.itemId === 'afterTextItem') {
                //item.html=Ext.String.format('of {0}/{1}',)
            }

            if (item.itemId === 'inputItem') {
                item.ui = 'sefu-textfield-paging';
            }
        });
        newItems = Ext.Array.insert(newItems, newItems.length-1, [{
            xtype: 'tbtext',
            itemId: 'displayItem'
        }, '-']);

        
        //console.log(newItems);
        return newItems;
    }
});