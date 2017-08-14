//ActionButton.js

Ext.define('sef.core.components.button.ActionButton', {
    extend: 'Ext.button.Button',
    xtype: 'sef-actionbutton',
    hidden: true,


    config: {
        btnType: 'default',
        actionName: '',
        dataAction: false, //基于数据的操作
        dataActionName:'',//用于关联字段的属性定义
        alignCn: true //格式化中文
    },


    initComponent: function(cfg) {

        var _bind = null;
        if (this.config.bind) {
            _bind = Ext.merge({}, this.config.bind);
            this.config.bind = null;
            delete this.config.bind;
        }

        if (false) { //this.actionName) {
            //debugger;

        };
        //var reg = /^[\u4E00-\u9FA5]+$/;
        //console.log(this.text,sef.utils.isCnText(this.text),this.text.split(''));
        //console.log(bind);
        if (this.alignCn) {
            if (sef.utils.isCnText(this.text)) {
                var newText = Ext.String.trim(this.text);
                var source = this.text.split('');
                //if(source)
                if (source.length === 2) {
                    newText = source.join('  ');
                } else if (source.length === 3) {
                    //newText=source.join(' ');
                }
                newText = Ext.String.trim(newText);
                Ext.apply(this, {
                    text: newText
                });


            }
        }

        this.callParent(arguments);
        if (this.actionName) {

            //var bind = this.getBind()||{};
            _bind = _bind || {};
            //hidden:'{!(action_can_edit && with_rec)}'
            //var action_expr='{!(';
            
            //dataActionName
            if (this.dataAction === true) {
                var action_expr='{!(';
                if(this.dataActionName){
                    action_expr+='action_'+this.dataActionName+'_data_exist';
                }else{
                    action_expr+='action_data_exist';
                }
                action_expr+=' && action_can_'+ this.actionName + ')}'
                _bind['hidden'] = action_expr.toLowerCase();//'{!(action_data_exist && action_can_' + this.actionName + ')}';
                //console.log(action_expr);
            } else {
                _bind['hidden'] = '{!action_can_' + this.actionName.toLowerCase() + '}';
            }


            this.setBind(_bind);
            //console.log(this.actionName, this.getBind());
        }
        //console.log(this.getBind());
    }
});