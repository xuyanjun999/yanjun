//UserList
Ext.define('sef.app.liftnext.system.lift.LiftList', {
    extend: 'sef.core.components.page.ListPage',
    xtype: 'sef-liftlist',
    colConfig: [{
        name: 'RegDate',
        renderer: sef.utils.dateRenderer,
        width: 150
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