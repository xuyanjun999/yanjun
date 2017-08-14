//IAppPageContainer

Ext.define('sef.core.interfaces.IAppPageContainer', {
    beforeReady: function() {
        var me = this;
        if (!this.store) {
            if (this.model) {
                this.store = Ext.create('store.sef-store', {
                    model: this.model,
                    url: this.api,
                    storeId: me.id + '_store',
                    additionFilterFn:this.additionFilterFn,
                    include:me.include
                });
                //console.log(this.store);
                //console.log('will create a store');
            }
        }else{
            //if(this.store.__c)
            if(this.store.className){
                //with a exist store
                if(!this.store.storeId){
                    this.store.setStoreId(me.id+'_store');
                }
            }else{
                Ext.applyIf(this.store,{
                    storeId:me.id+'_store'
                });
            }
        }
    },

    afterReady: function() {

    },

    showAppView: function(pageName) {

    },

    makeAppViews: function() {
        //console.log('will ready>>>>>>>>');

        var me = this,
            _views = this.views.map(function(v) {
                var newV = Ext.merge({}, v);
                newV.itemId = me.id + '_' + v.vname;
                newV._pid = me.id;
                return newV;
            });

        var c = {};
        if (this.tree) {
            var tree = Ext.merge({}, this.tree);
           
            Ext.apply(tree, {
                region: 'west'
            });
            Ext.applyIf(tree,{
                itemId:'mainAppTree'
            });
            c = {
                //xtype:'container',
                layout: 'border',
                items: [tree, {
                        references: 'appc',
                        itemId:'appc',
                        xtype: 'panel',
                        region: 'center',
                        layout: 'card',
                        deferredRender: true,
                        items: _views
                    }]
                    //items: [this.tree, ]

            };

        } else {
            c = {
                layout: 'card',
                references: 'appc',
                //itemId:'appc',
                deferredRender: true,
                items: _views
            };


        }
        
        return c;
        //console.log(_views,this.views);



    },

    updateRoute: function(routeObj) {
        //console.log('will update route#',routeObj);
        //this.switch(routeObj);
        var viewName = routeObj.viewName || this.defaultView;
        var vid = this.id + '_' + viewName;
        var view = this.down('#' + vid);
        if (view) {
            var lay=null;
            if(this.tree){
                lay=this.down('#appc').getLayout();
            }else{
                lay=this.getLayout();
            }
            lay.setActiveItem(view);
            view.updateRoute && view.updateRoute(routeObj);
        }
        //console.log('viewName#',viewName);
    }

});