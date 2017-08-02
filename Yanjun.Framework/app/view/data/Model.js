Ext.define("xf.view.data.Model", {
    extend: 'Ext.panel.Panel',
    padding: 0,
    layout: 'border',
    frame: false,
    border: 0,
    controller: 'model',
    title: '井道模型管理',
    items: [{
        xtype: 'panel',
        region: 'center',
        itemId: 'content',
        reference: 'content',
        layout: 'card',
        items: [{
            xtype: "sggrid",
            region: 'center',
            columns: [{
                text: '行号',
                xtype: 'rownumberer',
                width: 50,
                sortable: false
            }, {
                text: 'ID',
                dataIndex: 'ID',
                hidden: true
            }, {
                text: '编码',
                dataIndex: 'Code',
                width: 100
            }, {
                text: '名称',
                dataIndex: 'Name',
                width: 100
            }, {
                text: '描述',
                dataIndex: 'Desc',
                width: 100
            }, {
                text: '状态',
                dataIndex: 'ModelStatus',
                width: 100
            }, {
                text: '创建人员',
                dataIndex: 'CreateUser',
                width: 100
            }, {
                text: '创建日期',
                dataIndex: 'CreateDate',
                width: 200,
                renderer: Ext.util.Format.dateRenderer('m/d/Y H:i:s')
            }, {
                text: '最后更新日期',
                dataIndex: 'LastUpdate',
                width: 200,
                renderer: Ext.util.Format.dateRenderer('m/d/Y H:i:s')
            }, {
                text: '权限级别',
                dataIndex: 'RightLevel',
                width: 100
            }, {
                text: '审核人员',
                dataIndex: 'AuditUser',
                width: 100
            }, {
                text: '审核日期',
                dataIndex: 'AuditDate',
                width: 200,
                renderer: Ext.util.Format.dateRenderer('m/d/Y H:i:s')
            }],
            listeners: {
                beforeload: "modelBeforeload"
            },
            quickSearchCols: ['Name', 'Code'],
            controllerUrl: 'Model',
            modelName: 'xf.model.data.Model',
            selfButtons: [SG_BUTTONS.ADD, SG_BUTTONS.EDIT, SG_BUTTONS.DELETE]
        }, {
            xtype: 'SGForm',
            apiUrl: '/Model',
            includePath: [],
            items: [{
                xtype: 'textfield',
                fieldLabel: '编码',
                allowBlank: false,
                afterLabelTextTpl: REQUIRED_LABEL_TPL,
                name: 'Code'
            }, {
                xtype: 'textfield',
                fieldLabel: '名称',
                allowBlank: false,
                afterLabelTextTpl: REQUIRED_LABEL_TPL,
                name: 'Name'
            }, {
                xtype: 'textfield',
                fieldLabel: '描述',
                name: 'Desc'
            }, {
                xtype: 'numberfield', allowDecimals: false,
                fieldLabel: '状态',
                name: 'ModelStatus'
            }, {
                xtype: 'textfield',
                fieldLabel: '创建人员',
                readOnly: true,
                name: 'CreateUser'
            }, {
                xtype: 'datefield',
                fieldLabel: '创建日期',
                format: 'Y-m-d\\TH:i:s',
                readOnly: true,
                name: 'CreateDate'
            }, {
                xtype: 'datefield',
                fieldLabel: '最后更新日期',
                format: 'Y-m-d\\TH:i:s',
                readOnly: true,
                name: 'LastUpdate'
            }, {
                xtype: 'numberfield',
                allowDecimals: false,
                fieldLabel: '权限级别',
                name: 'RightLevel'
            }, {
                xtype: 'textfield',
                fieldLabel: '审核人员',
                readOnly: true,
                name: 'AuditUser'
            }, {
                xtype: 'datefield',
                fieldLabel: '审核日期',
                readOnly: true,
                format:'Y-m-d\\TH:i:s',
                name: 'AuditDate'
            }, {
                xtype: "sggrid",
                region: 'center',
                title: '井道模型配置',
                columnWidth: 1,
                height: 300,
                isInSGForm: true,
                margin: '20 0 0 0',
                columns: [{
                    text: '行号', xtype: 'rownumberer',
                    width: 50,
                    sortable: false
                }, {
                    text: 'ID',
                    dataIndex: 'ID',
                    hidden: true
                }, {
                    text: '序号',
                    dataIndex: 'Seq',
                    width: 100
                }, {
                    text: '块名称',
                    dataIndex: 'Name',
                    width: 100
                }, {
                    text: '块规则',
                    dataIndex: 'BlockConfig',
                    width: 100
                }, {
                    text: '插入点X坐标',
                    dataIndex: 'InsertPointX',
                    width: 100
                }, {
                    text: '插入点Y坐标',
                    dataIndex: 'InsertPointY',
                    width: 100
                }],
                listeners: {
                    beforeload: "modelConfigBeforeload"
                },
                quickSearchCols: ['Name'],
                controllerUrl: 'ModelConfig',
                modelName: 'xf.model.data.ModelConfig',
                selfButtons: [SG_BUTTONS.ADD, SG_BUTTONS.EDIT, SG_BUTTONS.DELETE],
                showEditWin: function (sggrid, record) {
                    var mainForm = sggrid.up("SGForm");
                    var win = Ext.create("Ext.window.Window", {
                        height: 400,
                        width: 600,
                        layout: 'fit',
                        items: [{
                            xtype: "SGForm",
                            apiUrl: '/ModelConfig',
                            refreshGridAfterSave: false,
                            record: record,
                            items: [{
                                xtype: 'hiddenfield',
                                fieldLabel: '井道模型ID',
                                name: 'ModelID'
                            }, {
                                xtype: 'numberfield', allowDecimals: true,
                                fieldLabel: '序号',
                                name: 'Seq'
                            }, {
                                xtype: 'textfield',
                                fieldLabel: '块名称',
                                allowBlank: false,
                                afterLabelTextTpl: REQUIRED_LABEL_TPL,
                                name: 'Name'
                            }, {
                                xtype: 'textfield',
                                fieldLabel: '块规则',
                                name: 'BlockConfig'
                            }, {
                                xtype: 'textfield',
                                fieldLabel: '插入点X坐标',
                                name: 'InsertPointX'
                            }, {
                                xtype: 'textfield',
                                fieldLabel: '插入点Y坐标',
                                name: 'InsertPointY'
                            }],
                            selfButtons: [{
                                text: '保存',
                                iconCls: 'save',
                                callBack: function (data) {
                                    sggrid.resetData();
                                }
                            }]
                        }]
                    });
                    win.show();
                    var sgform = win.down("SGForm");
                    sgform.fireEvent("beforeshow", sgform);
                    if (!record) {
                        sgform.getForm().findField("ModelID").setValue(mainForm.record.data.ID);
                    }
                }
            }],
            selfButtons: [SG_BUTTONS.SAVE, SG_BUTTONS.BACK]
        }]
    }]
});