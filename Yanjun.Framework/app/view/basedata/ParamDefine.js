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
                    text: '类别',
                    dataIndex: 'ParamClass',
                    width: 200
                }, {
                text: '代码',
                dataIndex: 'Code',
                width: 150
            }, {
                text: '名称',
                dataIndex: 'Name',
                width: 200
            }, {
                text: '单位',
                dataIndex: 'Unit',
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
                text: '描述',
                dataIndex: 'Desc',
                flex:1
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
            apiUrl: '/ParamDefine',
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
                    fieldLabel: '类别',
                    name: 'ParamClass'
                },{
                xtype: 'textfield',
                fieldLabel: '单位',
                name: 'Unit'
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
                xtype: 'textarea',
                fieldLabel: '描述',
                name: 'Desc',
                columnWidth: 1
            }],
            selfButtons: [SG_BUTTONS.SAVE, SG_BUTTONS.BACK]
        }]
    }]
});