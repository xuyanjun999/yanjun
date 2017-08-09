//FormViewModel

Ext.define('sef.core.components.form.FormViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.sefv-form',
    data: {
        action_data_exist: false,
        //action_roles_data_exist:true,
        action_can_save: window.____DEBUG___===true,
        action_can_copy: window.____DEBUG___===true,
        action_can_delete: window.____DEBUG___===true,
        action_can_edit:window.____DEBUG___===true,
        action_can_copy: window.____DEBUG___===true,
        action_can_print: window.____DEBUG___===true,
        action_can_rec_next: window.____DEBUG___===true,
        action_can_rec_prev: window.____DEBUG___===true,
        action_can_back: window.____DEBUG___===true,
        curRecIndex: 0,
        totalRec: 0
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