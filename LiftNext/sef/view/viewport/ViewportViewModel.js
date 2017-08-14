//FormViewModel

Ext.define('sef.core.view.viewport.ViewportViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.sefv-mainvm',
    data: {
        user_name:'',
        message_count:0,
        lang:''
    },
    formulas:{
        rec_label:function(get){
            var ci=get('curRecIndex');
            var t=get('totalRec');
            return ci>=0 && t>0;
        },
        rec_prev:function(get){
            var ci=get('curRecIndex');
            return ci>0; 
        },
        rec_next:function(get){
            var ci=get('curRecIndex');
            var t=get('totalRec');
            return ci<t-1;
        }
    }
});