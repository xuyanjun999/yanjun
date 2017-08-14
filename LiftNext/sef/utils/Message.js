//Message.js

Ext.define('sef.core.utils.Message', {
    privates: {
        __msg_types: {
            success: 'fa success fa-check-circle fa-fw',
            error: 'fa error fa-times-circle fa-fw',
            warning: 'fa warning fa-exclamation-triangle fa-fw',
            loading: 'fa loading fa-spinner fa-spin fa-fw'
        }
    },
    Message: function(type, content, duration, onClose) {
        //console.log('will show type#', type);
        if (!Ext.isNumber(duration)) {
            duration = 3000;
        }
        var me = this;

        var html = Ext.String.format('<div class="sef-message"><span class="{0}"></span><span class="content">{1}</span></div>',
            me.__msg_types[type],
            content
        );
        var toast = Ext.toast({
            minHeight: 20,
            shadow: false,
            ui: 'sefu-message-toast',
            cls:Ext.baseCSSPrefix + 'toast sef-toast-'+type,
            html: html, //'Data Saved',
            //title: 'My Title',
            //width: 200,
            //minWidth:200,
            align: 't',
            slideInAnimation: 'cubic-bezier(0.08, 0.82, 0.17, 1)',
            slideBackAnimation: 'cubic-bezier(0.6, 0.04, 0.98, 0.34)',
            slideInDuration: 200,
            slideBackDuration: 200,
            autoCloseDelay: duration
        });
        if (Ext.isFunction(onClose)) {
            //onClose = Ext.emptyFn;
            toast.on('close', function(t) {
                onClose(t);
            });
        }
        return toast;
        //if(Ext.isFunction)
    },

    Notification: function(type, title, desc, duration, onClose) {
        if (!Ext.isNumber(duration)) {
            duration = 0;
        }
        if (duration < 1) {
            //duration=1000*60*60*60;
        }
        var me = this;
        var toast = null;
        var titles = {
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'box',
                flex: 1,
                cls: 'notify-header',
                html: title
            }, {
                xtype: 'button',
                //text: 'close',
                iconCls: 'x-fa fa-times',
                ui: 'sefu-btn-close',
                handler: function() {
                    toast.close();
                }
            }]
        };
        var icons = null;
        if (type) {
            icons = {
                xtype: 'box',
                html: Ext.String.format('<span class="{0}"></span>',me.__msg_types[type]),
                _width: 50
            };
        }
        var contents = {
            xtype: 'container',
            //maxWidth:210,
            flex: 1,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                titles,
                {
                    xtype: 'box',
                    cls: 'notify-desc',
                    html: desc
                }

            ]
        };

        var items = {
            xtype: 'container',
            padding: 10,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                icons,
                contents
            ]
        };



        toast = Ext.toast({
            minHeight: 20,
            width: 320,
            paddingX: 10,
            paddingY: 40,
            //maxWidth:250,
            shadow: false,
            ui: 'sefu-notify-toast',
            items: items,
            //html: html, //'Data Saved',
            //title: 'My Title',
            //width: 200,
            //minWidth:200,
            align: 'tr',
            slideInAnimation: 'cubic-bezier(0.08, 0.82, 0.17, 1)',
            slideBackAnimation: 'cubic-bezier(0.6, 0.04, 0.98, 0.34)',
            slideInDuration: 200,
            slideBackDuration: 200,
            autoCloseDelay: duration,
            autoClose: duration > 1
        });

        return toast;


    }
}, function(msg) {
    //singleton
    var myToast = new msg();
    var types = ['success', 'error', 'warning', 'loading'];
    //console.log('will make new message now');
    if (!sef.message) {
        sef.message = {};
        types.forEach(function(t) {
            sef.message[t] = function(content, duration, onClose) {
                return myToast.Message(t, content, duration, onClose);
            }
        });

    }
    if (!sef.notification) {
        sef.notification = {};
        types.forEach(function(t) {
            sef.notification[t] = function(title, desc, duration, onClose) {
                return myToast.Notification(t, title, desc, duration, onClose);
            }
        });
        sef.notification.open = function(title, desc, duration, onClose) {
            return myToast.Notification('', title, desc, duration, onClose);
        }
    }
});