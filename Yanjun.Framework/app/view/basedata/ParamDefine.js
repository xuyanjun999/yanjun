Ext.define("xf.view.basedata.ParamDefine", {
    extend: 'Ext.panel.Panel',
    padding: 0,
    layout: 'border',
    frame: false,
    border: 0,
    controller: 'paramdefine',
    title: '参数定义',
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
                text: '行号', xtype: 'rownumberer',
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
                dataIndex: 'Category',
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
            listeners: {
                beforeload: "paramDefineBeforeload"
            },
            quickSearchCols: ['Name', 'Code'],
            controllerUrl: 'ParamDefine',
            modelName: 'xf.model.basedata.ParamDefine',
            selfButtons: [SG_BUTTONS.ADD, SG_BUTTONS.EDIT, SG_BUTTONS.DELETE]
        }, {
            xtype: 'SGForm',
            apiUrl: '/api/ParamDefine',
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
                fieldLabel: '描述',
                name: 'Desc'
            }, {
                xtype: 'textfield',
                fieldLabel: '单位',
                name: 'Unit'
            }, {
                xtype: 'textfield',
                fieldLabel: '类别',
                name: 'Category'
            }, {
                xtype: 'textfield',
                fieldLabel: '默认值',
                name: 'DefaultValue'
            }, {
                xtype: 'CommonBindCombo',
                store: serverNS.getComboStaticStore(BaseDataStaticData.ParamDefineDataType),
                fieldLabel: '数据类型',
                name: 'DataType'
            }, {
                xtype: 'CommonBindCombo',
                store: serverNS.getComboStaticStore(BaseDataStaticData.ParamDefineUseType),
                fieldLabel: '使用类型',
                name: 'UseType'
            }, {
                xtype: 'CommonBindCombo',
                store: serverNS.getComboStaticStore(BaseDataStaticData.ParamDefineOwnerType),
                fieldLabel: '所属类型',
                name: 'OwnerType'
            }],
            selfButtons: [SG_BUTTONS.SAVE, SG_BUTTONS.BACK]
        }]
    }]
});