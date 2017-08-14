//UserList
Ext.define('sef.app.demo.UserList', {
    extend: 'sef.core.components.page.ListPage',
    xtype: 'sef-userlist',
    columns: [{
        text: '创建时间',
        dataIndex: 'CreateOn',
        width: 120,
        renderer: sef.utils.dateRenderer
    }, {
        dataIndex: 'UpdateOn',
        text: '最后更新时间',
        width: 120,
        renderer: sef.utils.dateRenderer
    }, {
        dataIndex: 'Name',
        text: '用户名称',
        width: 100,
    }, {
        dataIndex: 'Staff',
        text: '员工名称',
        width: 100,
        renderer: sef.utils.relRenderer('CnName')
    }, {
        dataIndex: "LoginTimes",
        text: '登录次数',
        width: 100
    }, {
        dataIndex: 'ExpiryTime',
        text: '账户到期时间',
        width: 120,
        renderer: sef.utils.dateRenderer
    }, {
        dataIndex: 'PwdExpiryTime',
        text: '密码到期时间',
        width: 120,
        renderer: sef.utils.dateRenderer
    }, {
        dataIndex: 'LastIpAddr',
        text: '最近登录IP',
        width: 200,
    }],
    //columns:['code'],
    searchConfig: {
        quickSearch: ['Name','Staff.CnName'],
        columnWidth: .5,
        advSearch: ['Name', 'Staff.CnName'],
    },
    bars: [sef.runningCfg.BUTTONS.CREATE,
    sef.runningCfg.BUTTONS.EDIT,
    sef.runningCfg.BUTTONS.DELETE,
    sef.runningCfg.BUTTONS.EXPORT
    ],
    exportUrl: '/mock/export.json'
});