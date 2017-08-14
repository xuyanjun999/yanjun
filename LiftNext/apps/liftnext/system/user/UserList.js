//UserList
Ext.define('sef.app.liftnext.system.user.UserList', {
    extend: 'sef.core.components.page.ListPage',
    xtype: 'sef-userlist',
    colConfig: [{
        name:'Customer',
        renderer:sef.utils.relRenderer('Name')
    }],
    //columns:['code'],
    searchConfig: {
        quickSearch: ['Name']
    },
    bars: [sef.runningCfg.BUTTONS.CREATE,
        sef.runningCfg.BUTTONS.EDIT,
        sef.runningCfg.BUTTONS.DELETE,
        sef.runningCfg.BUTTONS.EXPORT
    ]
});