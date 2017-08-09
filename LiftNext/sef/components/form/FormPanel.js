//FormPanel.js

Ext.define('sef.core.components.form.FormPanel', {
    extend: 'Ext.form.Panel',
    xtype: 'sef-formpanel',
    scrollable: 'y',
    bodyPadding: '0 10px 20px 10px',
    cls: 'sef-formpanel',
    layout: 'column',
    defaults: {
        columnWidth: .333333,
        margin: '0 10px 5px 10px',
        xtype: 'textfield',
        labelAlign: 'top',
        labelSeparator:''
    },
    defaultExcludeForViewMode:'sef-datagridfield,',
    excludeForViewMode:'',

    config: {
        editMode:undefined//0为view,1为edit
    },

    updateRecord:function(rec){
        var f=this.callParent(arguments);
        if(rec){
            //debugger;
            var fields=rec.getFields();
            fields.forEach(function(f){
                if(f.stype==='asso'){
                    var name=f.name+'_ID';
                    rec.set(name,rec.get(f.name));
                }
            });
        }

        return f;
    },


    makeTBar: function() {
        return null;
    },

    makeBackButton: function() {
        return {
            xtype: 'sef-actionbutton',
            btnType: 'flat',
            iconCls: 'x-fa fa-arrow-left',
            tooltip: _('返回'),
            actionName: 'back'
        };
    },

    makeRecButtons: function() {
        var bars = [{
            xtype: 'label',
            hidden: true,
            bind: {
                html: '{curRecIndex+1}/{totalRec}',
                hidden: '{!rec_label}'
            }
        }];
        bars.push({
            xtype: 'sef-actionbutton',
            disabled: true,
            btnType: 'flat',
            tooltip: _('上一条'),
            actionName: 'rec_prev',
            iconCls: 'x-fa fa-angle-left',
            bind: {
                disabled: '{!rec_prev}'
            }
        });
        bars.push({
            xtype: 'sef-actionbutton',
            btnType: 'flat',
            disabled: true,
            actionName: 'rec_next',
            tooltip: _('下一条'),
            //disabled:true,
            iconCls: 'x-fa fa-angle-right',
            bind: {
                disabled: '{!rec_next}'
            }
        });
        return bars;
    },




    makeContent: function() {
        //var items=[];
        var dfts = Ext.merge({}, this.defaults);
        Ext.applyIf(dfts, {
            columnWidth: .333333,
            margin: '0 10px 5px 10px',
            xtype: 'textfield',
            labelAlign: 'top'
        });
        //delete this.defaults;

        var c = {
            //layout: 'column',
            defaults: dfts
        };

        

        return c;
    },

    switchMode:function(newMode){
        if(newMode === this.editMode){
            return;
        }
        var me=this,items=this.items;
        items.each(function(field,index){
            var ftype=field.xtype;
            if(me.defaultExcludeForViewMode.indexOf(ftype+',')>=0)return;
            if(me.excludeForViewMode.indexOf(ftype+',')>=0)return;
            if(newMode===1){
                if(field._lastDisabled===true){
                    field.setDisabled(true);
                }else{
                    field.setDisabled(false);
                }
            }else{
                field._lastDisabled=field.disabled;
                field.setDisabled(true);
            }
            //console.log(field.name,field.xtype,field.disabled);
        });

        if(newMode===0){
            this.addCls('sef-form-onlyview');
        }else{
            this.removeCls('sef-form-onlyview');
        }
        this.editMode=newMode;
    },

    initComponent: function() {
        var tbar = this.makeTBar();
        if (tbar) {
            Ext.apply(this, {
                //scrollable:'y',
                tbar: tbar
            });
        }
        Ext.apply(this, this.makeContent());
        this.callParent(arguments);
        //this.switchMode(0);
    }
});