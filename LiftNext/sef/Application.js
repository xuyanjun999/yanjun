/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */

Ext.Ajax.on('beforerequest', function(conn, options, opt) {
    if (!options.headers) options.headers = {};
    var dftHeader = {
        'x-sef': 'true',
        'ID': sef.runningCfg.getUser().ID,
        'TOKEN': sef.runningCfg.getUser().Token
    };
    Ext.apply(options.headers,dftHeader);
    //options.headers['TEST']=990000;
    //console.log(conn,options);
    if (options.url.indexOf('.json') >= 0) {
        if(window.____DEBUG___===true){
            options['method']='GET';
        }
        //options['method']='GET';
    }
    
});


Ext.define('sef.core.Application', {
    extend: 'Ext.app.Application',

    name: 'sef',

    //requires:['Ext.ux.IFrame'],

    //mainView: 'sef.core.view.viewport.MDIViewport',

    launch: function () {
        //Ext.Loader.setPath('sef', '/cc');
        //Ext.Loader.setPath('sef.app', '~/apps');
        //Ext.Loader.setPath('sef.core', '~/sef');

        var me = this;
        sef.runningCfg.initCfg(function(success, msg) {
            //console.log('initCfg done,ui mode is#',sef.runningCfg.getUIMode());
            if (success) {
                console.log('ui mode is#', sef.runningCfg.getUIMode());
                var uiMode = sef.runningCfg.getUIMode();
                sef.utils.setDocTitle(sef.runningCfg.getTitle());
                //return;
                //Ext.get('sef_splash').destroy();
                //me.setDefaultToken(sef.runningCfg.get('DefaultToken'));
                //console.log(me.getDefaultToken());
                if (uiMode === 'l-t') {
                    me.setMainView('sef.core.view.viewport.MDIViewport');
                } else {
                    me.setMainView('sef.core.view.viewport.TopMDIViewport');
                }

            } else {
                sef.dialog.error(msg.message, 'invalid profile');
            }
        });
        //window.document.title = sef.runningCfg.getTitle();

        //Ext.MessageBox.setUI('sefu-dialog');
        //Ext.MessageBox.setMinWidth(320);
        //Ext.MessageBox.setBodyPadding('10px 20px 20px 10px');
        // TODO - Launch the application
    }
});