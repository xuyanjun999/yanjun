Ext.define("xf.view.data.Block", {
    extend: 'Ext.panel.Panel',
    padding: 0,
    layout: 'border',
    frame: false,
    border: 0,
    controller: 'block',
    title: '块管理',
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
                    text: '块状态',
                    dataIndex: 'BlockStatus',
                    width: 100,
                    renderer: function (v) {
                        return serverNS.getComboStaticValue(BaseDataStaticData.BlockStatus, v);
                    }
            },  {
                text: '代码',
                dataIndex: 'Code',
                width: 150
            }, {
                text: '名称',
                dataIndex: 'Name',
                width: 150
            },  {
                text: '块分组',
                dataIndex: 'BlockGroup',
                width: 100
            }, {
                text: '描述',
                dataIndex: 'Desc',
                width: 100
            },  {
                text: '创建人员',
                dataIndex: 'CreateUser',
                width: 100
            }, {
                text: '创建日期',
                dataIndex: 'CreateDate',
                width: 200,
                renderer: Ext.util.Format.dateRenderer('m/d/Y H:i:s')
            }, {
                text: '审核人员',
                dataIndex: 'AuditUser',
                width: 100
            }, {
                text: '审核日期',
                dataIndex: 'AuditDate',
                width: 200,
                renderer: Ext.util.Format.dateRenderer('m/d/Y H:i:s')
            }, {
                text: '所属类型',
                dataIndex: 'OwnerType',
                width: 100,
                renderer: function (v) {
                    return serverNS.getComboStaticValue(BaseDataStaticData.OwnerType, v);
                }
            }],
            listeners: {
                beforeload: "blockBeforeload"
            },
            quickSearchCols: ['Name', 'Code'],
            controllerUrl: 'Block',
            modelName: 'xf.model.data.Block',
            selfButtons: [SG_BUTTONS.ADD, SG_BUTTONS.EDIT, SG_BUTTONS.DELETE]
        }, {
            xtype: 'SGForm',
            apiUrl: '/Block',
            includePath: [],
            items: [{
                xtype: 'textfield',
                fieldLabel: '代码',
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
                    fieldLabel: '块分组',
                    name: 'BlockGroup',
                    allowBlank: false,
                    afterLabelTextTpl: REQUIRED_LABEL_TPL
            }, {
                xtype: 'CommonBindCombo',
                fieldLabel: '所属类型',
                name: 'OwnerType',
                store: serverNS.getComboStaticStore(BaseDataStaticData.OwnerType),
                value: 0,
                readOnly: true
            }, {
                xtype: 'textarea',
                fieldLabel: '描述',
                name: 'Desc',
                columnWidth:1
            },  {
                xtype: 'textarea',
                fieldLabel: '块规则',
                name: 'BlockConfig',
                columnWidth: 1
            }, {
                xtype: 'textarea',
                fieldLabel: '插入X坐标',
                name: 'InsertPointX',
                columnWidth:0.5
            }, {
                    xtype: 'textarea',
                fieldLabel: '插入Y坐标',
                name: 'InsertPointY',
                columnWidth: 0.5
            }, {
                xtype: 'textfield',
                fieldLabel: '创建人员',
                name: 'CreateUser',
                readOnly: true
            }, {
                xtype: 'textfield',
                fieldLabel: '审核人员',
                name: 'AuditUser',
                readOnly: true
            }, {
                xtype: 'datefield',
                fieldLabel: '审核日期',
                name: 'AuditDate',
                readOnly: true
            }, {
                xtype: "sggrid",
                region: 'center',
                title: '块参数',
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
                    text: '参数名称',
                    dataIndex: 'ParamDefine.Name',
                    width: 150
                }, {
                    text: '参数编码',
                    dataIndex: 'ParamDefine.Code',
                    width: 150
                }, {
                    text: '绘图类型',
                    dataIndex: 'DrawingType',
                    width: 150,
                    renderer: function (v) {
                        return serverNS.getComboStaticValue(BaseDataStaticData.BlockParamDrawingType, v);
                    }
                }, {
                    text: '默认值',
                    dataIndex: 'DefaultValue',
                    width: 150
                }],
                listeners: {
                    beforeload: "blockParamBeforeload"
                },
                quickSearchCols: ['ParamDefine.Name', 'ParamDefine.Code'],
                controllerUrl: 'BlockParam',
                modelName: 'xf.model.data.BlockParam',
                selfButtons: [SG_BUTTONS.ADD, SG_BUTTONS.EDIT, SG_BUTTONS.DELETE],
                showEditWin: function (sggrid, record) {
                    var mainForm = sggrid.up("SGForm");
                    var win = Ext.create("Ext.window.Window", {
                        height: 400,
                        width: 600,
                        layout: 'fit',
                        items: [{
                            xtype: "SGForm",
                            includePath: ["ParamDefine"],
                            apiUrl: '/BlockParam',
                            refreshGridAfterSave: false,
                            record: record,
                            items: [{
                                xtype: 'hiddenfield',
                                fieldLabel: '',
                                name: 'BlockID'
                            }, {
                                fieldLabel: '参数名称',
                                name: 'ParamDefineID',
                                readOnly: true,
                                allowBlank: false,
                                afterLabelTextTpl: REQUIRED_LABEL_TPL,
                                quickSearchCols: ['Code', 'Name'],
                                xtype: 'CommonGridLookupPanel',
                                gridModelName: 'xf.model.basedata.ParamDefine',
                                gridColumnConfig: [{
                                    text: '行号',
                                    xtype: 'rownumberer',
                                    width: 50,
                                    sortable: false
                                }, {
                                    text: 'ID',
                                    dataIndex: 'ID',
                                    hidden: true
                                }, {
                                    text: '代码',
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
                                    text: '单位',
                                    dataIndex: 'Unit',
                                    width: 100
                                }, {
                                    text: '类别',
                                    dataIndex: 'ParamClass',
                                    width: 100
                                }, {
                                    text: '默认值',
                                    dataIndex: 'DefaultValue',
                                    width: 100
                                }, {
                                    text: '数据类型',
                                    dataIndex: 'DataType',
                                    width: 100,
                                    renderer: function (v) {
                                        return serverNS.getComboStaticValue(BaseDataStaticData.ParamDefineDataType, v);
                                    }

                                }, {
                                    text: '使用类型',
                                    dataIndex: 'UseType',
                                    width: 100,
                                    renderer: function (v) {
                                        return serverNS.getComboStaticValue(BaseDataStaticData.ParamDefineUseType, v);
                                    }
                                }, {
                                    text: '所属类型',
                                    dataIndex: 'OwnerType',
                                    width: 100,
                                    renderer: function (v) {
                                        return serverNS.getComboStaticValue(BaseDataStaticData.ParamDefineOwnerType, v);
                                    }
                                }],
                                displayField: 'Name',
                                valueField: 'ID',
                                getTextBySetValue: function (value) {
                                    var form = this.up('SGForm');
                                    if (Ext.isEmpty(form.record))
                                        return;
                                    return form.record.data["ParamDefine.Name"];
                                },
                                listeners: {
                                    beforeload: function (me, store, action) {

                                        var dataArgs = new serverNS.dataArgs();
                                        dataArgs.ActionDes = '';
                                        me.commuArgs.dataArgs = dataArgs;
                                        me.commuArgs.ajaxMethod = Ext.String.format("/ParamDefine/Gets", me.controllerUrl);
                                    },
                                    callback: function (me, selectRaws) {
                                        if (selectRaws.length > 0) {
                                            var code = selectRaws[0]["Code"];
                                            if (!Ext.isEmpty(code)) {
                                                me.up('SGForm').getForm().findField("ParamDefine.Code").setValue(code);
                                            }

                                        }

                                    }
                                }
                            }, {
                                xtype: 'textfield',
                                fieldLabel: '参数编码',
                                name: 'ParamDefine.Code'
                            }, {
                                xtype: 'CommonBindCombo',
                                fieldLabel: '绘图类型',
                                store: serverNS.getComboStaticStore(BaseDataStaticData.BlockParamDrawingType),
                                name: 'DrawingType'
                            }, {
                                xtype: 'textfield',
                                fieldLabel: '默认值',
                                name: 'DefaultValue'
                            },],
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
                        sgform.getForm().findField("BlockID").setValue(mainForm.record.data.ID);
                    }
                }
            }],
            selfButtons: [SG_BUTTONS.SAVE, SG_BUTTONS.BACK]
        }]
    }]
});