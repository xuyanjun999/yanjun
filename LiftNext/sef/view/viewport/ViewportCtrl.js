//MdiViewportCtrl.js

Ext.define('sef.core.view.viewport.ViewportCtrl', {
    extend: 'Ext.app.ViewController',

    //alias: 'controller.sefc-mdivp',

    privates: {
        _task: null,
        _internalInited: false,
        _loadingToast: null,
        _appContainer: null,
        _existApp: null,
        _lastClickTabRouteId: ''
    },

    listen: {
        controller: {
            '#': {
                unmatchedroute: 'onRouteChange'

            }
        }
    },

    control: {
        '#': {
            afterrender: 'onViewportReady',
            beforeDestroy: 'onViewportBeforeDestroy'
        }
    },



    closeActiveDialog: function() {
        var curDialog = Ext.WindowManager.getActive();
        //console.log('check active dialog#',curDialog);
        if (curDialog && curDialog.isWindow) {
            curDialog.destroy();
        }
    },

    showLoginDialog: function() {
        this.closeActiveDialog();
        var me = this,
            dialog = Ext.create('sef.core.view.security.LoginWindow', { //SEF.core.view.security.LoginDialog', {
                //title:'Login',
                width: 300,
                height: 300
            });
        dialog.on('loginsuccess', function() {
            dialog.close();
            me.redirectTo(sef.utils.makeTokenHash('', true));
            //console.log('login donw now');
        });

        dialog.show();
    },



    onRouteChange: function(token) {
        if (sef.runningCfg.getUser().ID < 1) {
            this.showLoginDialog();
            return;
        }
        this.internalInit();



        var tObj = sef.utils.decodeHash(token);
        if (Ext.isEmpty(tObj.appCls)) return;
        this._loadingToast = sef.message.loading('loading app...', 10000000);
        //return;
        this.switchApp(tObj);


    },

    switchApp: function(tokenObj) {
        //this._existApp = this._appContainer.child('component[routeId=' + tokenObj.appId + ']');
        this._existApp = this._appContainer.down('#' + tokenObj.appId);
        //console.log(this._existApp,tokenObj.appId);
        if (!this._existApp) {
            var me = this;
            Ext.require(tokenObj.appCls, function(loaderCls) {
                //console.log('here is loaded',cls);
                var newView = Ext.create(loaderCls, {
                    routeId: tokenObj.appId,
                    itemId: tokenObj.appId,
                    routeToken: tokenObj,
                    cls: 'sef-apppage-panel',
                    tabConfig: {
                        tRouteId: tokenObj.appId,
                        listeners: {
                            scope: me,
                            'click': me.onTabClickHandler,
                            'beforeclose': me.onTabBeforeClose
                        }
                    }
                });
                //window.___sef_history_count_++;
                this.showApp(newView, tokenObj, true)
            }, me);
        } else {
            this.showApp(this._existApp, tokenObj, false);
        }
        //console.log(this._appContainer,this._existApp);
    },

    showApp: function(app, tokenObj, isNew) {
        var me = this;
        this.closeActiveDialog();
        //console.log('will show app#', isNew);
        if (!app.isWindow) {
            if (isNew) {
                Ext.suspendLayouts();
                this._existApp = this._appContainer.add(app);

                //console.log(this._existApp, this._appContainer.getActiveTab());

                //mainLayout.setActiveItem(mainCard.add(appView));
                Ext.resumeLayouts(true);


            }
            this._existApp.updateRoute(tokenObj);
            //debugger;
            this._appContainer.setActiveTab(this._existApp);

            console.log('running...here');

        }



        this._loadingToast.close();
        this._loadingToast.destroy();
        this._loadingToast = null;
    },

    onMenuSelectionChange: function(view, node) {
        if (node.isLeaf()) {
            // some functionality to open the leaf(document) in a tabpanel
            this.willOpenNewApp(node.get('path') || node.get('url'));
        } else if (node.isExpanded()) {
            node.collapse();
        } else {
            node.expand();
        }
    },

    willOpenNewApp: function(path) {
        if (this._loadingToast) {
            sef.message.error(_('当前正在加载，请稍候', 1000));
            return;
        }
        var to = path; // && (node.get('path') || node.get('url'));
        if (to) {
            this.redirectTo(sef.utils.makeTokenHash(to));
        }
    },




    init: function() {
        //console.log('ctrl.init');
        //this.showLoginDialog();
    },

    updateMenuTree: function() {
        var mainMenuTree = this.lookupReference('mainMenuTree');
        if (!mainMenuTree) return;
        var rootCfg = {
            //Text:'',
            expanded: true,
            children: sef.runningCfg.getUser().Menus
        };
        //console.log(rootCfg);
        mainMenuTree.getStore().setRoot(rootCfg);
    },

    internalInit: function() {
        if (this._internalInited) return;
        this._internalInited = true;

        this.updateMenuTree();

        this._appContainer = this.getReferences().mainAppContainer;

        this.getViewModel()
            .setData({
                message_count: 0,
                user_name: sef.runningCfg.getUser().Name,
                soft_name: sef.runningCfg.get('Name'),
                soft_title: sef.runningCfg.get('Title'),
                lang: sef.runningCfg.getLang() === 'cn' ? 'En' : 'Cn'
            });

        //open message task
        var me = this;
        this._task = Ext.TaskManager.start({
            run: function() {
                me.checkNewMessage();
            },
            interval: sef.runningCfg.get('MessageInterval', 1) * 60 * 1000
        });

    },

    checkNewMessage: function() {
        //console.log('will check new message', this);
        var me = this,
            url = sef.runningCfg.get('MessageApi', '/api/message');
        sef.utils.ajax({
            url: url,
            method: 'GET',
            scope: me,
            success: function(result) {
                //console.log('message.result#',result);
                var count = result.Count;
                if (count > 0) {
                    this.getViewModel()
                        .setData({
                            message_count: count
                        });

                    sef.message.success(_('你有新的消息'));
                }
            },
            failure: function(err, resp) {

            }
        });
    },
    //iii:0,

    onBeforeTabChangeHandler: function(tabPanel, newTab, oldTab, opts) {
        //console.log(newTab,oldTab);
        //console.log('before change#', newTab.id);

        if (oldTab && oldTab.tab.waitForClose === true) {
            //based on close
            //if(this.iii++>0)return false;
            //console.log('before change1#', newTab.id, oldTab.id, oldTab.destroyed,this);

            this.redirectTo(newTab.routeToken.str);
            return false;
        }
        if (!Ext.isEmpty(this._lastClickTabRouteId)) {
            if (newTab.routeId === this._lastClickTabRouteId) {
                this._lastClickTabRouteId = '';
                //console.log('before change2#', newTab.id);

                this.redirectTo(newTab.routeToken.str);
                return false;
            }
        }
        //console.log('before change3#', newTab.id);
        //console.log('onBeforeTabChangeHandler#',opts);
    },

    onTabBeforeClose: function(tab) {
        //console.log('will close tab#',tab.tRouteId);
        if (this._lastClickTabRouteId === tab.tRouteId) {
            this._lastClickTabRouteId = '';

        }
        tab.waitForClose = true;
    },

    onTabClickHandler: function(tab, e, opts) {
        this._lastClickTabRouteId = tab.tRouteId;
    },

    onSignOut: function() {
        var me = this;
        sef.dialog.confirm(_('确认退出系统?'), '', function() {
            //me.internalDelete();
            sef.runningCfg.clearUser();
            me.redirectTo(sef.utils.makeTokenHash('', true));
        });
    },

    onShowUpdateLog: function() {
        var url = sef.runningCfg.get('UpdateLogUrl', '/api/updatelog/');
        var dialog = Ext.create('sef.core.components.window.UpdateLogDialog', { //SEF.core.view.security.LoginDialog', {
            url: url
        });

        dialog.show();
    },

    onChangePwd: function() {
        var url = sef.runningCfg.get('ChangePwdApi', '/api/changepwd/');
        var dialog = Ext.create('sef.core.components.window.ChangePwdDialog', { //SEF.core.view.security.LoginDialog', {
            url: url
        });

        dialog.show();
    },

    onChangeLang: function() {
        sef.runningCfg.changeLang();

        this.gotoHome(true);
    },

    onChangeUIMode: function() {
        sef.runningCfg.changeUIMode();
        this.gotoHome(true);
    },

    gotoHome: function(reload) {
        if (reload === true) {
            window.location.reload();
            return;
        }
        this.redirectTo(sef.utils.makeTokenHash('', true));
    },

    onViewportReady: function () {
        console.log("onViewportReady");
        this.gotoHome();

    },

    onViewportBeforeDestroy: function() {
        if (this._task) {
            this._task.destroy();
            this._task = null;
            delete this._task;
        }
    }
});