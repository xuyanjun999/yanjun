﻿Ext.define("xf.view.data.DynamicBlock", {
    extend: 'Ext.panel.Panel',
    padding: 0,
    layout: 'border',
    frame: false,
    border: 0,
    controller: 'dynamicblock',
    title: '井道块管理',
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
                text: '代码',
                dataIndex: 'Code',
                width: 150
            }, {
                text: '名称',
                dataIndex: 'Name',
                width: 150
            }, {
                text: '描述',
                dataIndex: 'Desc',
                width: 100
            }, {
                text: '类别',
                dataIndex: 'Category',
                width: 100
            }, {
                text: '所属类型',
                dataIndex: 'OwnerType',
                width: 100
            }, {
                text: '块状态',
                dataIndex: 'BlockStatus',
                width: 100
            }, {
                text: '缩略图',
                dataIndex: 'Thumbnail',
                width: 100
            }, {
                text: '权限级别',
                dataIndex: 'RightLevel',
                width: 100
            }, {
                text: '插入X坐标',
                dataIndex: 'InsertPointX',
                width: 100
            }, {
                text: '插入Y坐标',
                dataIndex: 'InsertPointY',
                width: 100
            }, {
                text: '创建人员',
                dataIndex: 'CreateUser',
                width: 100
            }, {
                text: '创建日期',
                dataIndex: 'CreateOn',
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
            }],
            listeners: {
                beforeload: "dynamicBlockBeforeload"
            },
            quickSearchCols: ['Name', 'Code'],
            controllerUrl: 'DynamicBlock',
            modelName: 'xf.model.data.DynamicBlock',
            tbar: [{
                text: '新建',
                iconCls: 'add',
                handler: "addDynamicBlock"
            }, {
                text: '编辑',
                iconCls: 'edit',
                handler: "editDynamicBlock"
            }, {
                text: '删除',
                iconCls: 'remove',
                handler: "deleteDynamicBlock"
            }]
        }, {
            xtype: 'SGForm',
            apiUrl: '/api/DynamicBlock',
            includePath: [],
            listeners: {
                loadcallback:'dynamicBlockFormLoadCallback'
            },
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
                fieldLabel: '类别',
                name: 'Category'
            }, {
                xtype: 'numberfield', allowDecimals: false,
                fieldLabel: '所属类型',
                name: 'OwnerType'
            }, {
                xtype: 'numberfield', allowDecimals: false,
                fieldLabel: '块状态',
                name: 'BlockStatus'
            }, {
                xtype: 'textfield',
                fieldLabel: '缩略图',
                name: 'Thumbnail'
            }, {
                xtype: 'numberfield', allowDecimals: false,
                fieldLabel: '权限级别',
                name: 'RightLevel'
            }, {
                xtype: 'textfield',
                fieldLabel: '插入X坐标',
                name: 'InsertPointX'
            }, {
                xtype: 'textfield',
                fieldLabel: '插入Y坐标',
                name: 'InsertPointY'
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
                title: '井道块参数',
                columnWidth: 1,
                height: 300,
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
                    text: '默认值',
                    dataIndex: 'DefaultValue',
                    width: 150
                }],
                listeners: {
                    beforeload: "dynamicBlockParamBeforeload"
                },
                quickSearchCols: ['ParamDefine.Name', 'ParamDefine.Code'],
                controllerUrl: 'DynamicBlockParam',
                modelName: 'xf.model.data.DynamicBlockParam',
                tbar: [{
                    text: '新建',
                    iconCls: 'add',
                    handler: "addDynamicBlockParam"
                }, {
                    text: '编辑',
                    iconCls: 'edit',
                    handler: "editDynamicBlockParam"
                }, {
                    text: '删除',
                    iconCls: 'remove',
                    handler: "deleteDynamicBlockParam"
                }]
            }],
            tbar: [{
                xtype: 'button',
                text: '保存',
                iconCls: 'save',
                handler: "saveDynamicBlock"
            }, '-', {
                xtype: 'button',
                text: '返回',
                iconCls: 'back',
                handler: "back"
            }]
        }]
    }]
});