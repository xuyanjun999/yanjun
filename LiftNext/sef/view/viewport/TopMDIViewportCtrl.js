//TopMdiViewportCtrl.js

Ext.define('sef.core.view.viewport.TopMDIViewportCtrl', {
    extend: 'sef.core.view.viewport.ViewportCtrl',

    alias: 'controller.sefc-topmdivp',

    updateMenuTree: function() {
        var items = this.makeMenuItems();
        //console.log('utree#', items);
        if (items) {
            var bar = this.lookupReference('maintopmenubar');
            var len = bar.items.length;
            while (len > 7) {
                var ob = bar.items.get(1);
                //console.log(ob);
                //debugger;
                bar.remove(ob, {
                    destroy: true
                });
                len--;
            }
            bar.insert(1, items);
            console.log(bar.items);
            //console.log(bar);
        }
    },

    makeMenuItems: function() {
        var items = [];
        var menus = sef.runningCfg.getUser().Menus;
        if (!menus) return null;
        //debugger;
        menus.forEach(function(m) {
            var btn = {
                text: m.Text,
                ui: 'sefu-mtb-button-menu',
                arrowVisible: false,
                path:m.Path,
                handler: 'onMenuBtnClick'
            };
            if (m.Children) {
                var cm = m.Children.map(function(mc) {
                    var _m = {
                        text: mc.Text,
                        path:mc.Path,
                        handler: 'onMenuBtnClick'
                    };
                    //最多支持三层
                    if (mc.Children) {
                        var ccm = mc.Children.map(function(mmc) {
                            var _ccm = {
                                text: mmc.text,
                                path:mmc.Path,
                                handler: 'onMenuBtnClick'
                            }
                            return _ccm;
                        });
                        _m.menu = ccm;

                    }
                    return _m;

                });
                btn.menu = cm;
            }
            items.push(btn);
            //return btn;
        });

        return items;
    },


    onMenuBtnClick:function(btn){
        //console.log(btn,btn.menu,btn.path);
        if(btn.menu)return;
        this.willOpenNewApp(btn.path);
    }



});