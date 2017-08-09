//UserList
Ext.define('sef.app.sys.UserList', {
    extend: 'sef.core.components.page.ListPage',
    xtype: 'sef-userlist',
    colConfig: [{
        name: 'loginTime',
        renderer: sef.utils.dateTimeRenderer,
        width: 200
    },{
        name:'Staff',
        renderer:sef.utils.relRenderer('fullname')
    }],
    searchConfig: {
        quickSearch: ['name'],
        columnWidth: .5,
        advSearch: ['email', 'birthday', 'loginTime', 'age', 'status', 'isvalid', 'salary', {
            text: 'name',
            name: 'name'
        }]
    },
    bars: [sef.runningCfg.BUTTONS.CREATE,
        sef.runningCfg.BUTTONS.EDIT,
        sef.runningCfg.BUTTONS.DELETE,
        sef.runningCfg.BUTTONS.EXPORT
    ],
    exportUrl: '/mock/export.json'
});