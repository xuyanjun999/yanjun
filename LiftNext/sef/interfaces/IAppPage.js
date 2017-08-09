//IAppPage

Ext.define('sef.core.interfaces.IAppPage', {
    _routes:null,

    onPageReady:Ext.emptyFn,

    beforeReady: function() {
        var me = this;
        if (!this.store) {
            this.store = Ext.getStore(me._pid + '_store');
            //console.log('will get a store',this.store);
        }
    },

    afterReady: function() {

    },

    updateRoute: function(routeObj) {
        var isChange=false;
        if(this._routes != routeObj){
            isChange=true;
        }else{
            if(this._routes && routeObj){
                isChange=this._routes.str !== routeObj.str;
            }
        }
        this._routes=routeObj;
        if(isChange){
            this.onRouteChange(this._routes);
        }
        //console.log('will update page.route#', routeObj, this.itemId, this.id, this._pid);
    },

    //设置权限信息
    updatePermission:function(p){
        if(!p)return;
        var vm=this.getViewModel();
        if(!vm)return;

        var newP={};
        for(var pp in p){
            var newPP='action_can_'+pp;
            newP[newPP]=p[pp];
        }
        vm.setData(newP);
        newP=null;
        delete newP;
        //if(this.getViewModel())
    },

    onRouteChange:function(route){
        //console.log('route will change#',this._routes);
    }
});