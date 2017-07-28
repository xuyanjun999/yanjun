Ext.define("xf.view.org.Staff", {
    extend: 'Ext.panel.Panel',
    padding: 0,
    layout: 'border',
    frame: false,
    border: 0,
    controller: 'staff',
    title: '员工管理',
    items: [{
        xtype: 'CommonTreeSearchPanel',
        region: 'west',
        width: 200,
        reference: 'tree',
        enableDateSearch: false,
        enableTextSearch: false,
        commonTreeConfig: {
            rootVisible: false,
            listeners: {
                beforeitemclick: 'treeItemclick',
                storebeforeload: 'treeStoreBeforeLoad'
            },
        }
    },{
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
                text: '公司名称',
                dataIndex: 'Company.Name',
                width: 150
            }, {
                text: '用户编号',
                dataIndex: 'Code',
                width: 100
            }, {
                text: '名称',
                dataIndex: 'Name',
                width: 100
            }, {
                text: '部门',
                dataIndex: 'Dept',
                width: 100
            }, {
                text: '电话',
                dataIndex: 'Phone',
                width: 100
            }, {
                text: '邮件',
                dataIndex: 'Email',
                width: 100
            }, {
                text: '性别',
                dataIndex: 'Gender',
                width: 100,
                renderer: function (value, metaData) {
                    return value === true ? "男" : "女";
                }
            }, {
                text: '地址',
                dataIndex: 'Address',
                width: 100
            }, {
                text: '最后登录IP',
                dataIndex: 'LastLoginIp',
                width: 100
            }],
            listeners: {
                beforeload: "staffBeforeload"
            },
            quickSearchCols: ['Name', 'Code'],
            controllerUrl: 'Staff',
            modelName: 'xf.model.org.Staff',
            selfButtons: [SG_BUTTONS.ADD, SG_BUTTONS.EDIT, SG_BUTTONS.DELETE]
        }, {
            xtype: 'SGForm',
            apiUrl: '/api/Staff',
            includePath: ['Company'],
            items: [{
                fieldLabel: '公司名称',
                name: 'CompanyID',
                readOnly: true,
                allowBlank: false,
                afterLabelTextTpl: REQUIRED_LABEL_TPL,
                quickSearchCols: ['Code', 'Name'],
                xtype: 'CommonGridLookupPanel',
                gridModelName: 'xf.model.org.Company',
                gridColumnConfig: [{
                    text: '行号', xtype: 'rownumberer',
                    width: 50,
                    sortable: false
                }, {
                    text: 'ID',
                    dataIndex: 'ID',
                    hidden: true
                }, {
                    text: '编号',
                    dataIndex: 'Code',
                    width: 100
                }, {
                    text: '名称',
                    dataIndex: 'Name',
                    width: 150
                }, {
                    text: '地址',
                    dataIndex: 'Address',
                    width: 150
                }, {
                    text: '电话',
                    dataIndex: 'Tel',
                    width: 100
                }, {
                    text: '邮件',
                    dataIndex: 'Email',
                    width: 100
                }],
                displayField: 'Name',
                valueField: 'ID',
                getTextBySetValue: function (value) {
                    var form = this.up('SGForm');
                    if (Ext.isEmpty(form.record))
                        return;
                    return form.record.data["Company.Name"];
                },
                listeners: {
                    beforeload: "companyBeforeload"
                }
            }, {
                xtype: 'textfield',
                fieldLabel: '用户编号',
                name: 'Code'
            }, {
                xtype: 'textfield',
                fieldLabel: '名称',
                name: 'Name'
            }, {
                xtype: 'textfield',
                fieldLabel: '部门',
                name: 'Dept'
            }, {
                xtype: 'textfield',
                fieldLabel: '电话',
                name: 'Phone'
            }, {
                xtype: 'textfield',
                fieldLabel: '邮件',
                name: 'Email'
            }, {
                xtype: 'CommonBindCombo',
                store: serverNS.getComboStaticStore(comboStaticData.sex),
                fieldLabel: '性别',
                name: 'Gender'
            },  {
                xtype: 'textfield',
                fieldLabel: '地址',
                name: 'Address'
            }, {
                xtype: 'textfield',
                fieldLabel: '最后登录IP',
                name: 'LastLoginIp',
                readOnly: true
            }],
            selfButtons: [SG_BUTTONS.SAVE, SG_BUTTONS.BACK]
        }]
    }]
});