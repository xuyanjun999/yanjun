Ext.define("xf.view.data.Model", {
    extend: 'Ext.panel.Panel',
    padding: 0,
    layout: 'border',
    frame: false,
    border: 0,
    controller: 'model',
    title: '梯型管理',
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
                    text: '状态',
                    dataIndex: 'ModelStatus',
                    width: 100,
                    renderer: function (v) {
                        return serverNS.getComboStaticValue(BaseDataStaticData.ModelStatus, v);
                    }
                }, {
                text: '编码',
                dataIndex: 'Code',
                width: 100
            }, {
                text: '名称',
                dataIndex: 'Name',
                width: 200
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
                text: '最后更新日期',
                dataIndex: 'LastUpdate',
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
                text: '描述',
                dataIndex: 'Desc',
                flex:1
            }, {
                text: '所属类型',
                dataIndex: 'OwnerType',
                width: 100,
                renderer: function (v) {
                    return serverNS.getComboStaticValue(BaseDataStaticData.OwnerType, v);
                }
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
                    xtype: 'CommonBindCombo',
                    fieldLabel: '所属类型',
                    name: 'OwnerType',
                    store: serverNS.getComboStaticStore(BaseDataStaticData.OwnerType),
                    value : 0,
                    readOnly: true
            }, {
                xtype: 'datefield',
                fieldLabel: '最后更新日期',
                format: 'Y-m-d\\TH:i:s',
                readOnly: true,
                name: 'LastUpdate'
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
            },{
                xtype: 'textarea',
                fieldLabel: '描述',
                name: 'Desc',
                columnWidth: 1
            }, {
                xtype: "sggrid",
                region: 'center',
                title: '梯型块分组配置',
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
                    text: '块分组',
                    dataIndex: 'BlockGroup',
                    width: 200
                }, {
                    text: '检测规则',
                    dataIndex: 'CheckConfig',
                    width: 200
                }, {
                    text: '插入点X坐标',
                    dataIndex: 'InsertPointX',
                    width: 200
                }, {
                    text: '插入点Y坐标',
                    dataIndex: 'InsertPointY',
                    width: 200
                }, {
                    text: '描述',
                    dataIndex: 'Desc',
                    width: 200
                }],
                listeners: {
                    beforeload: "modelGroupBeforeload"
                },
                quickSearchCols: ['Name'],
                controllerUrl: 'ModelGroup',
                modelName: 'xf.model.data.ModelGroup',
                selfButtons: [SG_BUTTONS.ADD, SG_BUTTONS.EDIT, SG_BUTTONS.DELETE],
                showEditWin: function (sggrid, record) {
                    var mainForm = sggrid.up("SGForm");
                    var win = Ext.create("Ext.window.Window", {
                        height: 600,
                        width: 800,
                        layout: 'fit',
                        items: [{
                            xtype: "SGForm",
                            apiUrl: '/ModelGroup',
                            refreshGridAfterSave: false,
                            record: record,
                            items: [{
                                xtype: 'hiddenfield',
                                fieldLabel: '梯型ID',
                                name: 'ModelID'
                            }, {
                                xtype: 'numberfield', allowDecimals: true,
                                fieldLabel: '序号',
                                name: 'Seq',
                                value : 0
                            }, {
                                xtype: 'textfield',
                                fieldLabel: '块分组',
                                allowBlank: false,
                                afterLabelTextTpl: REQUIRED_LABEL_TPL,
                                name: 'BlockGroup'
                            }, {
                                    xtype: 'textarea',
                                fieldLabel: '检测规则',
                                name: 'CheckConfig',
                                columnWidth:1
                            }, {
                                    xtype: 'textarea',
                                fieldLabel: '插入点X坐标',
                                name: 'InsertPointX',
                                columnWidth: 0.5
                            }, {
                                xtype: 'textarea',
                                fieldLabel: '插入点Y坐标',
                                name: 'InsertPointY',
                                columnWidth: 0.5
                            }, {
                                xtype: 'textarea',
                                fieldLabel: '描述',
                                name: 'Desc',
                                columnWidth: 1
                            }, {
                                xtype: "sggrid",
                                region: 'center',
                                title: '梯型块配置',
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
                                        text: '名称',
                                    dataIndex: 'Block.Name',
                                    width: 100
                                }, {
                                    text: '编号',
                                    dataIndex: 'Block.Code',
                                    width: 100
                                },{
                                    text: '块规则',
                                    dataIndex: 'BlockConfig',
                                    width: 200,
                                    renderer: function (v, o, g) {
                                        if (Ext.isEmpty(v)) {
                                            return g.data['Block.BlockConfig'];
                                        } else {
                                            return v;
                                        }
                                    }
                                }, {
                                    text: '插入点X坐标',
                                    dataIndex: 'InsertPointX',
                                    width: 200
                                }, {
                                    text: '插入点Y坐标',
                                    dataIndex: 'InsertPointY',
                                    width: 200
                                }, {
                                    text: '描述',
                                    dataIndex: 'Desc',
                                    width: 200
                                }],
                                listeners: {
                                    beforeload: function (me, store, action) {

                                        me.commuArgs.dataArgs = new serverNS.dataArgs();
                                        me.commuArgs.dataArgs.Query.IncludeEntityPaths.push("Block");
                                        me.commuArgs.dataArgs.ActionDes = '';
                                       
                                        var sgform = me.up("SGForm");
                                        if (sgform.record) {

                                            var searchArg = new serverNS.searchArgs();
                                            searchArg.FieldName = "ModelGroupID";
                                            searchArg.Values.push(sgform.record.data.ID);

                                            me.commuArgs.dataArgs.Query.Searchs.push(searchArg);
                                            me.commuArgs.ajaxMethod = Ext.String.format("/{0}/Gets", me.controllerUrl);
                                        }

                                    }
                                },
                                quickSearchCols: ['Block.Name'],
                                controllerUrl: 'ModelBlock',
                                modelName: 'xf.model.data.ModelBlock',
                                selfButtons: [SG_BUTTONS.ADD, SG_BUTTONS.EDIT, SG_BUTTONS.DELETE],
                                showEditWin: function (sggrid, record) {
                                    var mainForm = sggrid.up("SGForm");

                                    var win2 = Ext.create("Ext.window.Window", {
                                        height: 400,
                                        width: 600,
                                        layout: 'fit',
                                        items: [{
                                            xtype: "SGForm",
                                            apiUrl: '/ModelBlock',
                                            includePath:['Block'],
                                            refreshGridAfterSave: false,
                                            record: record,
                                            items: [{
                                                xtype: 'hiddenfield',
                                                fieldLabel: '梯型ID',
                                                name: 'ModelID'
                                            }, {
                                                xtype: 'hiddenfield',
                                                fieldLabel: '梯型ID',
                                                name: 'ModelGroupID'
                                                }, {
                                                    fieldLabel: '块',
                                                    name: 'BlockID',
                                                    readOnly: true,
                                                    allowBlank: false,
                                                    afterLabelTextTpl: REQUIRED_LABEL_TPL,
                                                    quickSearchCols: ['Code', 'Name'],
                                                    xtype: 'CommonGridLookupPanel',
                                                    gridModelName: 'xf.model.data.Block',
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
                                                    },{
                                                        text: '块分组',
                                                        dataIndex: 'BlockGroup',
                                                        width: 100
                                                    }, {
                                                        text: '默认值',
                                                        dataIndex: 'InsertPointX',
                                                        width: 100
                                                    }, {
                                                        text: '默认值',
                                                        dataIndex: 'InsertPointY',
                                                        width: 100
                                                    }, {
                                                        text: '描述',
                                                        dataIndex: 'Desc',
                                                        width: 100
                                                    } ],
                                                    displayField: 'Name',
                                                    valueField: 'ID',
                                                    getTextBySetValue: function (value) {
                                                        var form = this.up('SGForm');
                                                        if (Ext.isEmpty(form.record))
                                                            return;
                                                        return form.record.data["Block.Name"];
                                                    },
                                                    listeners: {
                                                        beforeload: function (me, store, action) {

                                                            var dataArgs = new serverNS.dataArgs();
                                                            dataArgs.ActionDes = '';
                                                            me.commuArgs.dataArgs = dataArgs;
                                                            me.commuArgs.ajaxMethod = Ext.String.format("/Block/Gets", me.controllerUrl);
                                                        },
                                                        callback: function (me, selectRaws) {
                                                            if (selectRaws.length > 0) {
                                                                var d = selectRaws[0];
                                                                if (!Ext.isEmpty(d)) {
                                                                    me.up('SGForm').getForm().findField("Block.Code").setValue(selectRaws[0]["Code"]);
                                                                    me.up('SGForm').getForm().findField("Block.BlockConfig").setValue(selectRaws[0]["BlockConfig"]);
                                                                }
                                                            }
                                                        }
                                                    }
                                            }, {
                                                xtype: 'textfield',
                                                fieldLabel: '代码',
                                                name: 'Block.Code',
                                                readOnly:true
                                            }, {
                                                xtype: 'textarea',
                                                fieldLabel: '原始块规则',
                                                name: 'Block.BlockConfig',
                                                columnWidth: 1,
                                                readOnly:true
                                            }, {
                                                 xtype: 'textarea',
                                                fieldLabel: '块规则',
                                                name: 'BlockConfig',
                                                columnWidth: 1,
                                                emptyText:'若为空，则以块本身的规则计算'
                                            },  {
                                                xtype: 'textarea',
                                                fieldLabel: '插入点X坐标',
                                                name: 'InsertPointX',
                                                columnWidth: 0.5
                                            }, {
                                                xtype: 'textarea',
                                                fieldLabel: '插入点Y坐标',
                                                name: 'InsertPointY',
                                                columnWidth: 0.5
                                            }, {
                                                xtype: 'textarea',
                                                fieldLabel: '描述',
                                                name: 'Desc',
                                                columnWidth: 1
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
                                    win2.show();

                                    var sgform = win2.down("SGForm");
                                    sgform.fireEvent("beforeshow", sgform);
                                    if (!record) {
                                        sgform.getForm().findField("ModelGroupID").setValue(mainForm.record.data.ID);
                                    }
                                }
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