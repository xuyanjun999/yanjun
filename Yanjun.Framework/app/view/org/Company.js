
Ext.define("xf.view.org.Company", {
    extend: 'Ext.panel.Panel',
    layout: 'card',
    requires: 'xf.model.org.Company',
    title: '菜单管理',
    controller: Ext.create("xf.controller.org.Company"),

    items: [
        {
            xtype: "sggrid",
            columns: [
                {
                    text: '行号', xtype: 'rownumberer',
                    width: 50,
                    sortable: false
                }, {
                    text: 'ID',
                    dataIndex: 'ID',
                    hidden: true
                }, {
                    text: '英文名称',
                    dataIndex: 'EnName',
                    width: 100
                }, {
                    text: '中文名称',
                    dataIndex: 'CnName',
                    width: 100
                }, {
                    text: '简称',
                    dataIndex: 'ShortName',
                    width: 100
                }, {
                    text: '代号',
                    dataIndex: 'Code',
                    width: 100
                }, {
                    text: '描述',
                    dataIndex: 'Des',
                    width: 100
                }, {
                    text: '省会',
                    dataIndex: 'Capital',
                    width: 100
                }, {
                    text: '注册日期',
                    dataIndex: 'RegisterDate',
                    width: 200,
                    renderer: Ext.util.Format.dateRenderer('m/d/Y H:i:s')
                }, {
                    text: '公司类型',
                    dataIndex: 'CompType',
                    width: 100
                },
                {
                    text: '父公司',
                    dataIndex: 'Parent.Name',
                    flex: 1
                }
            ],
            selModel: 'checkboxmodel',
            model: 'xf.model.org.Company',
            url: '/Company/GetByPage',
            tbar: [{
                text: '创建',
                glyph: 'xf040@FontAwesome',
                handler: 'onAddCompany'
            },
            {
                text: '删除',
                glyph: 'xf014@FontAwesome',
                handler: ''
            }],
            listeners: {
                itemdblclick: 'onItemdblclick'
            }

        },
        {
            xtype: 'form',
            layout: 'column',
            defaults: {
                labelAlign: 'top',
                columnWidth: 0.5
            },
            items: [
{
    xtype: 'textfield',
    fieldLabel: '英文名称',
    name: 'EnName'
},
{
    xtype: 'textfield',
    fieldLabel: '中文名称',
    name: 'CnName'
},
{
    xtype: 'textfield',
    fieldLabel: '简称',
    height: 100,
    name: 'ShortName'
},
{
    xtype: 'textfield',
    fieldLabel: '代码',
    height: 100,
    name: 'Code'
},
{
    xtype: 'textarea',
    fieldLabel: '描述',

    name: 'Des'
},
{
    xtype: 'numberfield', allowDecimals: true,
    fieldLabel: '省会',
    name: 'Capital'
},
{
    xtype: 'datefield',
    fieldLabel: '注册日期',
    name: 'RegisterDate'
},
{
    xtype: 'numberfield', allowDecimals: false,
    fieldLabel: '公司类型',
    name: 'CompType'
},
{
    xtype: 'numberfield', allowDecimals: false,
    fieldLabel: '',
    name: 'FinanceYear'
},
{
    xtype: 'textfield',
    fieldLabel: '',
    name: 'LogoPath'
},
{
    xtype: 'textfield',
    fieldLabel: '',
    name: 'CurrencyTypeKey'
},
{
    xtype: 'textfield',
    fieldLabel: '',
    name: 'Homepage'
},
{
    xtype: 'textfield',
    fieldLabel: '',
    name: 'CountryDicID'
},
{
    xtype: 'textfield',
    fieldLabel: '',
    name: 'ProvinceDicID'
},
{
    xtype: 'textfield',
    fieldLabel: '',
    name: 'CityDicID'
},
{
    xtype: 'textfield',
    fieldLabel: '',
    name: 'Address'
},
{
    xtype: 'textfield',
    fieldLabel: '',
    name: 'ParentID'
},
{
    xtype: 'textfield',
    fieldLabel: '',
    name: 'PostCode'
},
{
    xtype: 'textfield',
    fieldLabel: '',
    name: 'Phone'
},
{
    xtype: 'textfield',
    fieldLabel: '',
    name: 'Fax'
},
{
    xtype: 'textfield',
    fieldLabel: '',
    name: 'Bank'
},
{
    xtype: 'textfield',
    fieldLabel: '',
    name: 'Account'
},
{
    xtype: 'textfield',
    fieldLabel: '',
    name: 'Tax'
},
{
    xtype: 'textfield',
    fieldLabel: '',
    name: 'LegalPer'
},
{
    xtype: 'textfield',
    fieldLabel: '',
    name: 'ConsignPer'
},
{
    xtype: 'textfield',
    fieldLabel: '',
    name: 'ContactPerson'
},
{
    xtype: 'textfield',
    fieldLabel: '',
    name: 'ContactTelephone'
},

{
    xtype: 'numberfield', allowDecimals: true,
    fieldLabel: '',
    name: 'DiscountRate'
},
{
    xtype: 'numberfield', allowDecimals: false,
    fieldLabel: '',
    name: 'CompDomestic'
},
{
    xtype: 'textfield',
    fieldLabel: '',
    name: 'Branch'
},
{
    xtype: 'textfield',
    fieldLabel: '',
    name: 'CompyAttribute'
},
{
    xtype: 'textfield',
    fieldLabel: '',
    name: 'Attribute1'
},
{
    xtype: 'textfield',
    fieldLabel: '',
    name: 'Attribute2'
},
{
    xtype: 'textfield',
    fieldLabel: '',
    name: 'Attribute3'
},
{
    xtype: 'numberfield', allowDecimals: false,
    fieldLabel: '',
    name: 'Attribute4'
},
{
    xtype: 'datefield',
    fieldLabel: '',
    name: 'Attribute5'
}]
        }
    ]


});