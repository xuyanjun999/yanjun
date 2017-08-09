//ExportDialog

Ext.define('sef.core.components.window.ChangePwdDialog', {
    extend: 'sef.core.components.window.BaseDialog',

    xtype: 'sef-changepwddialog',
    //ui:'sefu-lockingwindow',

    title: _('更改密码'),
    closable: false,
    width: 400,
    height: 400,
    iconCls: 'x-fa fa-lock',
    dynamicContent: true,

    config: {
        url: ''
            //cancelText: '',
            //okText: _('关闭')
    },


    doChangePwd: function(data) {
        var me = this;
        sef.utils.ajax({
            url: this.url,
            method: 'POST',
            jsonData:data,
            scope: me,
            success: function(result) {
                this.setDialogLoading(false,false);
                sef.message.success(_('密码更改成功'));
                this.closeDialog(0,1);
            },
            failure: function(err, resp) {
                this.setDialogLoading(false,false);
                //this.unmask();
                sef.dialog.error(err.message);

            }
        });

        return;


    },

    onBeforeCloseDialog:function(){
        var form=this.down('#pwdForm');
        if(form.hasInvalidField())return false;
        var data=form.getValues();
        if(data.NewPwd !== data.NewPwd2){
            sef.message.error(_('两次密码不相同，请检查'));
            return false;
        }

        delete data['NewPwd2'];

        this.doChangePwd(data);
        this.setDialogLoading(true,false);

        //console.log(data);

        return false;
    },

    initComponent: function() {

        Ext.apply(this, {
            items: {
                xtype: 'form',
                itemId:'pwdForm',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                defaults: {
                    xtype: 'textfield',
                    inputType: 'password',
                    minLength:6,
                    maxLength:20,
                    labelAlign: 'top',
                    allowBlank:false
                },
                items: [{

                    fieldLabel: _('原始密码'),
                    name: 'OldPwd'
                }, {
                    fieldLabel: _('新的密码'),
                    name: 'NewPwd'
                }, {
                    fieldLabel: _('重复新的密码'),
                    name: 'NewPwd2'
                }]
            }
        });

        this.callParent(arguments);
        //this.initDialog();
    },

    _afterRender: function() {
        this.callParent(arguments);
        this.mask();
        this.loadLog();
    }
});