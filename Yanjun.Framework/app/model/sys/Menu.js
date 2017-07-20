Ext.define('xf.model.sys.Menu', {
    extend: 'Ext.data.Model',
    fields: [
    {
        name: 'ID',
        text: ''
    }
    ,
    {
        name: 'Name',
        dtype: 'string',
        text: ''
    }
    ,
    {
        name: 'IconResource',
        dtype: 'string',
        text: ''
    }
    ,
    {
        name: 'Visible',
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
        name: 'SequenceIndex',
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
        name: 'ModuleUrl',
        dtype: 'string',
        text: ''
    }
    ,
    {
        name: 'ParentID',
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
    ],
    idProperty: 'ID'
}
);