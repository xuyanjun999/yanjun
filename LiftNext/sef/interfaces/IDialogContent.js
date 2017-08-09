//IDialogContent

Ext.define('sef.core.interfaces.IDialogContent', {
    _dialog: null,
    _dialogResult:null,

    initDialog: function(ptype) {
        if (!ptype) ptype = 'sef-basedialog';
        this._dialog = this.up(ptype);
        if(this._dialog){
            var me=this;
            this._dialog.on('willclosedialog',function(d,result){
                //me.setDialogLoading(true,false);
                var r=me.makeDialogResult();
                if(!r)return false;
                result=Ext.apply(result,r);
                
            });
        }
        //console.log('initDialog#', p, ptype);
    },

    setDialogLoading:function(loading,cancelable){
        if(this._dialog){
            this._dialog.setDialogLoading(loading,cancelable);
        }
    },

    makeDialogResult:function(){
        return {Result:1};
    },

    closeDialog:function(status,result){
        this._dialog && this._dialog.fireEvent('dialogcontentclose',status,result);
    }
});