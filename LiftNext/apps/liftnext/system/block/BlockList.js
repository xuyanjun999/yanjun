//UserList
Ext.define('sef.app.liftnext.system.block.BlockList', {
    extend: 'sef.core.components.page.ListPage',
    xtype: 'sef-blocklist',
    colConfig: [{
        name: 'RegDate',
        renderer: sef.utils.dateRenderer,
        width: 150
    },{
        name:'Thumb',
        hidden:true
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