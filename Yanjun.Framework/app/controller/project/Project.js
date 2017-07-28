﻿Ext.define('xf.controller.project.Project', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.project',

    getProjectDataArg: function () {
        var dataArgs = new serverNS.dataArgs();
        dataArgs.Query.IncludeEntityPaths.push("Company");
        dataArgs.Query.IncludeEntityPaths.push("DrawingTask");
        dataArgs.Query.IncludeEntityPaths.push("User"); 
        dataArgs.ActionDes = '';
        return dataArgs;
    },

    projectBeforeload: function (me, store, action) {
        me.commuArgs.dataArgs = this.getProjectDataArg();
        me.commuArgs.ajaxMethod = Ext.String.format("/{0}/Gets", me.controllerUrl);
    },

    companyBeforeload: function (grid, store, action) {
        var dataArgs = grid.commuArgs.dataArgs;
        dataArgs.ActionDes = '获取供应商';
        grid.commuArgs.ajaxMethod = "/Company/Gets";
        var searchArgs = new serverNS.searchArgs();
        searchArgs.Operator = serverNS.searchOperator.Equal;
        dataArgs.Query.Searchs.push(searchArgs);

    },

    createDrawingTask: function (btn) {
        var sgform = btn.up("SGForm");


        Ext.Ajax.request({
            method: 'get',
            url: "/Project/CreateTask",
            params: {
                projectId: sgform.record.data.ID,
            },
            success: function (response, opts) {
                try {
                    var obj = Ext.decode(response.responseText);
                    if (obj.Success) {
                        toast_success("生成成功!")
                    }
                    else {
                        toast_error(obj.Message);
                    }
                } catch (e) {
                    console.log(e);
                } finally {
                    sggrid.setLoading(false);
                }

            },
        });
    }
});