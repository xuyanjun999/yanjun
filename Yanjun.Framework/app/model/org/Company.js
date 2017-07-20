
Ext.define('xf.model.org.Company', {
    extend: 'Ext.data.Model',
    fields: [
    {
        name: 'ID',
        text: ''
    }
    ,
    {
        name: 'EnName',
        dtype: 'string',
        text: ''
    }
    ,
    {
        name: 'CnName',
        dtype: 'string',
        text: ''
    }
    ,
    {
        name: 'ShortName',
        dtype: 'string',
        text: ''
    }
    ,
    {
        name: 'Code',
        dtype: 'string',
        text: ''
    }
    ,
    {
        name: 'Des',
        dtype: 'string',
        text: ''
    }
    ,
    {
        name: 'Capital',
        text: ''
    }
    ,
    {
        name: 'RegisterDate',
        type: 'date',
        dateFormat:'c',
        text: ''
    }
    ,
    {
        name: 'CompType',
        text: ''
    }
    ,
    {
        name: 'FinanceYear',
        text: ''
    }
    ,
    {
        name: 'LogoPath',
        dtype: 'string',
        text: ''
    }
    ,
    {
        name: 'CurrencyTypeKey',
        dtype: 'string',
        text: ''
    }
    ,
    {
        name: 'Homepage',
        dtype: 'string',
        text: ''
    }
    ,
    {
        name: 'CountryDicID',
        text: ''
    }
    ,
    {
        name: 'ProvinceDicID',
        text: ''
    }
    ,
    {
        name: 'CityDicID',
        text: ''
    }
    ,
    {
        name: 'Address',
        dtype: 'string',
        text: ''
    }
    ,
    {
        name: 'Status',
        text: ''
    }
    ,
    {
        name: 'CreateBy',
        text: ''
    }
    ,
    {
        name: 'CreateOn',
        dtype: 'date',
        text: ''
    }
    ,
    {
        name: 'UpdateBy',
        text: ''
    }
    ,
    {
        name: 'UpdateOn',
        dtype: 'date',
        text: ''
    }
    ,
    {
        name: 'PostCode',
        dtype: 'string',
        text: ''
    }
    ,
    {
        name: 'Phone',
        dtype: 'string',
        text: ''
    }
    ,
    {
        name: 'Fax',
        dtype: 'string',
        text: ''
    }
    ,
    {
        name: 'Bank',
        dtype: 'string',
        text: ''
    }
    ,
    {
        name: 'Account',
        dtype: 'string',
        text: ''
    }
    ,
    {
        name: 'Tax',
        dtype: 'string',
        text: ''
    }
    ,
    {
        name: 'LegalPer',
        dtype: 'string',
        text: ''
    }
    ,
    {
        name: 'ConsignPer',
        dtype: 'string',
        text: ''
    }
    ,
    {
        name: 'ContactPerson',
        dtype: 'string',
        text: ''
    }
    ,
    {
        name: 'ContactTelephone',
        dtype: 'string',
        text: ''
    }
    ,
    {
        name: 'IsNeedInvoice',
        text: ''
    }
    ,
    {
        name: 'DiscountRate',
        text: ''
    }
    ,
    {
        name: 'IsSpecialPack',
        text: ''
    }
    ,
    {
        name: 'CompDomestic',
        text: ''
    }
    ,
    {
        name: 'Branch',
        dtype: 'string',
        text: ''
    }
    ,
    {
        name: 'CompyAttribute',
        dtype: 'string',
        text: ''
    }
    ,
    {
        name: 'Attribute1',
        dtype: 'string',
        text: ''
    }
    ,
    {
        name: 'Attribute2',
        dtype: 'string',
        text: ''
    }
    ,
    {
        name: 'Attribute3',
        dtype: 'string',
        text: ''
    }
    ,
    {
        name: 'Attribute4',
        text: ''
    }
    ,
    {
        name: 'Attribute5',
        dtype: 'date',
        text: ''
    }, 
    {
        name: 'Parent.Name',
        mapping: function (record) {
            var name = record.Parent == null ? '' : record.Parent.CnName;
            return name;
        }
    }
    ],
    idProperty: 'ID',
    url: '/api/CommonApi',
    entityName: 'Model.Org.Company'
}
);