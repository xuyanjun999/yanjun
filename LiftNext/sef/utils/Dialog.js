//Message.js

Ext.define('sef.core.utils.Dialog', {
    
    open:function(cfg){

    },

    show: function(cfg) {
        //console.log('will show a dialog#', cfg);
        var me=this,buttons=Ext.Msg.OK;
        if(cfg.type==='confirm'){
            buttons=Ext.Msg.YESNO;
        }
        
        Ext.apply(cfg,{
            //icon: Ext.Msg.SUCCESS,
            title:sef.runningCfg.getTitle(),
            closable:false,
            buttons:buttons,
            fn:function(btn){
                console.log('your clicked#',btn);
                if(btn==='ok' || btn==='yes'){
                    if(Ext.isFunction(cfg.onOK)){
                        cfg.onOK.call();
                    }
                }else if(Ext.isFunction(cfg.onCancel)){
                    cfg.onCancel.call();
                }
            }
        });

        Ext.Msg.show(cfg);
    }
}, function(dlgCls) {
    var types = ['success', 'error', 'warning', 'confirm','info'];
    var dlg = new dlgCls();
    if (!sef.dialog) {
        sef.dialog = {};
        types.forEach(function(t) {
            sef.dialog[t] = function(content, title, onOK, onCancel) {
                if(t==='confirm'){
                    icon='QUESTION';
                }else{
                    icon=t;
                }
                //debugger;
                var cfg = {
                    type: t,
                    icon:Ext.Msg[icon.toUpperCase()],
                    title: title,
                    message: content,
                    onOK: onOK,
                    onCancel: onCancel
                };
                return dlg.show(cfg);
                //return dlg.Message(t, content, duration, onClose);
            }
        });
        sef.dialog.open=function(cfg){
            return dlg.open(cfg);
        }
    }
});