Ext.define("xf.view.project.Project", {
    extend: 'Ext.panel.Panel',
    padding: 0,
    layout: 'border',
    frame: false,
    border: 0,
    controller: 'project',
    title: '项目管理',
    items: [{
        xtype: 'panel',
        region: 'center',
        itemId: 'content',
        reference: 'content',
        layout: 'card',
        items: [{
            xtype: "sggrid",
            region: 'center',
            columns: [{
                text: '行号', xtype: 'rownumberer',
                width: 50,
                sortable: false
            }, {
                text: 'ID',
                dataIndex: 'ID',
                hidden: true
            }, {
                text: '公司名称',
                dataIndex: 'Company.Name',
                width: 100
            }, {
                text: '用户名称',
                dataIndex: 'User.Name',
                width: 100
            }, {
                text: '项目代码',
                dataIndex: 'ProjectNo',
                width: 100
            }, {
                text: '项目名称',
                dataIndex: 'ProjectName',
                width: 100
            }, {
                text: '合同号',
                dataIndex: 'ContractNo',
                width: 100
            }, {
                text: '客户名称',
                dataIndex: 'CustomerName',
                width: 100
            }, {
                text: '创建用户',
                dataIndex: 'CreateUser',
                width: 100
            }, {
                text: '创建日期',
                dataIndex: 'CreateDate',
                width: 200,
                renderer: Ext.util.Format.dateRenderer('m/d/Y H:i:s')
            }, {
                text: '项目状态',
                dataIndex: 'ProjectStatus',
                width: 100
            }, {
                text: '井道模型ID',
                dataIndex: 'ModelID',
                width: 100
            }, {
                text: '版本号',
                dataIndex: 'ProjectVerNo',
                width: 100
            }, {
                text: '来源项目',
                dataIndex: 'ParentID',
                width: 100
            }, {
                text: '绘图任务状态',
                dataIndex: 'DrawingTask.TaskStatus',
                width: 100,
                renderer: function (v) {
                    if (Ext.isEmpty(v)) return "";
                    return serverNS.getComboStaticValue(ProjectInfoStaticData.DrawingTaskStatus, v);
                }
            }, {
                text: '描述',
                dataIndex: 'Remark',
                width: 100
            }],
            listeners: {
                beforeload: "projectBeforeload"
            },
            quickSearchCols: ['Name', 'Code'],
            controllerUrl: 'Project',
            modelName: 'xf.model.project.Project',
            selfButtons: [SG_BUTTONS.ADD, SG_BUTTONS.EDIT, SG_BUTTONS.DELETE]
        }, {
            xtype: 'SGForm',
            apiUrl: '/api/Project',
            includePath: ["Company","User"],
            items: [{
                xtype: 'textfield',
                fieldLabel: '公司',
                readOnly: true,
                name: 'Company.Name'
            }, {
                xtype: 'textfield',
                fieldLabel: '用户',
                readOnly: true,
                name: 'User.Name'
            }, {
                xtype: 'textfield',
                fieldLabel: '项目代码',
                name: 'ProjectNo'
            }, {
                xtype: 'textfield',
                fieldLabel: '项目名称',
                name: 'ProjectName'
            }, {
                xtype: 'textfield',
                fieldLabel: '合同号',
                name: 'ContractNo'
            }, {
                xtype: 'textfield',
                fieldLabel: '客户名称',
                name: 'CustomerName'
            }, {
                xtype: 'datefield',
                fieldLabel: '创建日期',
                readOnly: true,
                format: "Y-m-d\\TH:i:s",
                name: 'CreateDate'
            }, {
                xtype: 'numberfield',
                allowDecimals: false,
                fieldLabel: '项目状态',
                name: 'ProjectStatus'
            }, {
                xtype: 'textfield',
                fieldLabel: '井道模型ID',
                name: 'ModelID'
            }, {
                xtype: 'textfield',
                fieldLabel: '版本号',
                name: 'ProjectVerNo'
            }, {
                xtype: 'textfield',
                fieldLabel: '来源项目',
                name: 'ParentID'
            }, {
                xtype: 'textfield',
                fieldLabel: '绘图任务ID',
                name: 'DrawingTaskID'
            }, {
                xtype: 'textarea',
                columnWidth: 1,
                fieldLabel: '描述',
                name: 'Remark'
            }],
            selfButtons: [SG_BUTTONS.SAVE, {
                text: '生成图纸',
                iconCls: 'edit',
                handler:'createDrawingTask'
            }, SG_BUTTONS.BACK]
        }]
    }]
});