//ExportPanel

Ext.define('sef.core.components.window.ExportPanel', {
    extend: 'Ext.form.Panel',
    xtype: 'sef-exportpanel',
    mixins:['sef.core.interfaces.IDialogContent'],
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    defaults: {
        labelAlign: 'top'
    },

    config: {
        fileTypes: 0,
        defaultFileName: ''
    },

    makeDialogResult:function(){
        var me=this,result=this.getForm().getFieldValues();

        sef.utils.ajax({
            url: me.url,
            method: 'POST',
            jsonData: result,
            scope: me,
            success: function(result) {
                //me.view.store.reload();
                //console.log('export down');
                if(result.Url){
                    window.open(result.Url,'_blank');
                }
                me.closeDialog(true,{
                    Url:result.Url
                });
            },
            failure: function(err, resp) {

                sef.dialog.error(err.message);
                me.setDialogLoading(false,false);
            }
        });

        return null;
    },

    initComponent: function() {
        var fileTypeItems = [];
        //debugger;
        var i=0;
        for (var c in sef.runningCfg.FILE_TYPES) {
            var sc = sef.runningCfg.FILE_TYPES[c];
            if ((sc & this.fileTypes) === sc) {
                fileTypeItems.push({
                    boxLabel: c,
                    checked:i++<1,
                    name: 'FileType',
                    inputValue:sc
                });
            }
        };

        var items = [{
            xtype: 'radiogroup',
            fieldLabel: _('数据范围'),
            vertical: true,
            name:'DataRange',
            items: [{
                boxLabel: '当前选择的行',
                checked: true,
                name: 'DataRange',
                inputValue:1
            }, {
                boxLabel: '所有数据',
                name: 'DataRange',
                inputValue:2
            }]
        }, {
            xtype: 'radiogroup',
            fieldLabel: _('文件类型'),
            vertical: true,
            name:'FileType',
            items: fileTypeItems
        }, {
            xtype: 'textfield',
            name:'FileName',
            value: this.defaultFileName,
            fieldLabel: _('文件名称')
        }];

        Ext.apply(this, {
            items: items
        });

        this.callParent(arguments);
        this.initDialog();
        //this.closeDialog();
    }
});