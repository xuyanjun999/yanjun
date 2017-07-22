
Ext.define('xf.model.sys.Menu', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'ID',
        text: ''
    }, {
        name: 'Status',
        text: ''
    }, {
        name: 'CreateBy',
        text: ''
    }, {
        name: 'CreateOn',
        dtype: 'date',
        text: ''
    }, {
        name: 'UpdateBy',
        text: ''
    }, {
        name: 'UpdateOn',
        dtype: 'date',
        text: ''
    }, {
        name: 'Name',
        dtype: 'string',
        text: ''
    }, {
        name: 'IconResource',
        dtype: 'string',
        text: ''
    }, {
        name: 'IsVisible',
        text: '',
        convert: function (v, record) {
            return serverNS.getComboStaticValue(comboStaticData.yesNo, v, record);
        }
    }, {
        name: 'Des',
        dtype: 'string',
        text: ''
    }, {
        name: 'SequenceIndex',
        text: ''
    }, {
        name: 'Code',
        dtype: 'string',
        text: ''
    }, {
        name: 'Url',
        dtype: 'string',
        text: ''
    }, {
        name: 'ParentID',
        text: ''
    }, {
        name: 'Parent.Name'
    }, {
        name: 'Remark',
        dtype: 'string',
        text: ''
    }],
    idProperty: 'ID'
});