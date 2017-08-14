Ext.define('sef.app.liftnext.system.lift.LiftModel',{
    extend:'sef.core.model.BaseModel',

    fields: [{
        name:'Code',
        text:'代号'
    },{
        name: 'Name',
        text: '名称'
    },{
        name:'Version',
        text:'版本'
    },{
        name:'Remark',
        text:'备注'
    },{
        name:'Status',
        text:'状态'
    },{
        name:'Category',
        text:'分类'
    },{
        name:'Type',
        text:'类型'
    }]
});