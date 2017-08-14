//TreeSearchBar.js

Ext.define('sef.core.components.bar.TreeSearchBar', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'sef-treesearchbar',
    cls:'sef-treesearchbar',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    config: {
        enableKeySearch: true,
        rangeSearchType: 'datefield',
        enableRefresh: true,
        keyName:'Key',
        rangeName:'Range'
    },

    onSearch:function(){
        var d={};
        var f=this.down('#textSearch');
        if(f){
            d[this.keyName]=f.getValue();
        }
        f=this.down('#rangeSearch');
        if(f){
            d[this.rangeName]=f.getValue();
        }
        this.fireEvent('treesearch',d);
        //console.log('will do search',d);
    },

    onRefresh:function(){
        this.fireEvent('treesearch',true);
    },

    initComponent: function() {
        var me=this,items = [];
        if (this.enableKeySearch) {
            items.push({
                xtype: 'textfield',
                emptyText: _('关键字搜索'),
                margin:'0 8px 5px 0',
                itemId:'textSearch'
            });
        }
        if (this.rangeSearchType) {
            items.push({
                xtype: 'sef-rangefield',
                rtype: this.rangeSearchType,
                margin:'0 8px 5px 0',
                itemId:'rangeSearch'
            });
        }
        var btns = {
            xtype: 'container',
            //margin: '0 0 5px 0',

            layout: {
                type: 'hbox',
                align: 'stretch',
                pack:"end"
            },
            items: [{
                xtype: 'button',
                btnType: 'primary',
                text: _('搜索'),
                handler:function(){
                    me.onSearch();
                }
            }]
        };
        if (this.enableRefresh) {
            btns.items.push({
                xtype: 'button',
                btnType: 'flat',
                text: _('刷新'),
                margin:'0 0 0 10px',
                handler:function(){
                    me.onRefresh();
                }
            });
        }
        items.push(btns);

        //console.log('treebar#', items);

        Ext.apply(this, {
            items: items
        });

        this.callParent(arguments);
    }
});