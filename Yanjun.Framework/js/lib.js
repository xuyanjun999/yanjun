/// <reference path="serverCommunication.js" />
/*! ext-app.js based on ExtJs 4.2.0 | (c) 2006, 2026 SEUNGEE, Inc. | SEUNGEE.COM/license
//@
*/
///共有控件命名控件
//Ext.ns('xf.Common');

/*ExtJs's Bug************************************************************

1.解决数据选中后刷新 报错（Uncaught TypeError: Cannot read property 'length' of undefined ）
2.Combo的lastQuery初始值必须是空，不然第一次Store过滤无效
3.Grid 无数据时鼠标移动第一行第一列不断报错PageMap asked for range which it does not have
4.define公用控件时，引用字段 必须在initComponent重新定义才能对象隔离，暂时这样用
ExtJs's Bug************************************************************/

//basic tools
function alert_error(msg, title) {
    if (Ext.isEmpty(title)) {
        title = ClientInfo.LName;
    }
    //console.log(msg);
    Ext.Msg.show({
        title: title,
        msg: msg,
        buttons: Ext.Msg.OK,
        icon: Ext.Msg.ERROR
    });
}

function alert_info(msg, title, callBack) {

    if (Ext.isEmpty(title)) {
        title = ClientInfo.LName;
    }

    if (!Ext.emptyFn(callBack)) {
        Ext.Msg.alert(title, msg, callBack);
    } else {
        Ext.Msg.show({
            title: title,
            msg: msg,
            buttons: Ext.Msg.OK,
            icon: Ext.Msg.INFO
        });
    }
}

function alert_confirm(msg, callBack, scope) {
    Ext.Msg.confirm(ClientInfo.LName, msg, callBack, scope);
}


function gettext(t) {
    return t;
}

//Grid 无数据时鼠标移动第一行第一列不断报错PageMap asked for range which it does not have
Ext.selection.RowModel.override({
    isRowSelected: function (record, index) {
        try {

            var k = this.isSelected(record);
            //console.log('isRowSelected',k);
            return k;
        } catch (e) {
            return false;
        }
    }
});

function gc_store(store) {
    if (store == null) return;

    if (!store.isDestroyed) {
        console.log('gc>' + store.storeId, store);

        if (store.storeId) {
            Ext.data.StoreManager.unregister(store);
        }

        store.clearData();
        store.clearListeners();


        store.data = store.tree = store.sorters = store.filters = store.groupers = null;
        if (store.reader) {
            store.reader.destroyReader();
        }
        store.proxy = store.reader = store.writer = null;
        store.clearListeners();
        store.isDestroyed = true;

        if (store.implicitModel) {
            Ext.destroy(store.model);
        } else {
            store.model = null;
        }
        store = null;
    }
    if (store != null) delete store;

}


//解决数据选中后刷新 报错（Uncaught TypeError: Cannot read property 'length' of undefined ）
Ext.selection.Model.override({
    storeHasSelected: function (record) {
        var store = this.store, records, len, id, i;

        if (record.hasId() && /*store.getById(record)*/
            store.getById(record.getId())) {
            return true;
        } else {
            records = store.data.items;
            //len = records.length;
            len = store.length;
            id = record.internalId;

            for (i = 0; i < len; ++i) {
                if (id === records[i].internalId) {
                    return true;
                }
            }
        }
        return false;
    }
});

//Ext的Eap通用函数
var commonCtrlFun = {

};
//绑定数据的下拉框通用控件
Ext.define('xf.Common.BindCombo', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.CommonBindCombo',
    displayField: 'name',
    valueField: 'value',
    editable: false,

    //store数据是否为空
    isStoreEmpty: function () {
        if (this.getStore() == null)
            return true;
        return this.getStore().count() == 0;
    },
    //设置绑定combo默认值的store,selected是否选择 默认的 名字 和 值
    setDefStore: function (name, value, selected) {
        var data = [];
        var item = {};
        item['name'] = name;
        item['value'] = value;
        data.push(item);

        var store = Ext.create('Ext.data.Store', {
            fields: ['name', 'value'],
            data: data
        });
        this.bindStore(store);
        if (selected) {
            this.setValue(value);
        }
    },
    //重新绑定store
    reSetStore: function (store) {
        this.bindStore(store);
        var v = this.getValue();
        if (v) {
            this.setValue(v);
        }
    },

    //清空绑定combo的store
    clearStore: function () {
        this.bindStore(Ext.create('Ext.data.Store', {
            fields: ['name', 'value'],
            data: []
        }));
    },

    //重置时清楚绑定
    reset: function () {
        if (!this.store.isStatic) {
            this.clearStore();
        }
        this.callParent();
        this.applyEmptyText();
    },

    initComponent: function () {
        Ext.apply(this, {

        });
        this.callParent(arguments);
    }
});

//绑定数据的单选框通用控件  单选框的所有name将设置为单选框组name一样，否则无法绑定
Ext.define('xf.Common.BindRadioGroup', {
    extend: 'Ext.form.RadioGroup',
    alias: 'widget.CommonBindRadioGroup',
    setValue: function (value) {
        var cbValue, first, formId, radios, i, len, name;
        if (!Ext.isObject(value)) {
            var valueObj = {};
            valueObj[this.name] = value;
            value = valueObj;
        }
        for (name in value) {
            if (value.hasOwnProperty(name)) {
                cbValue = value[name];
                first = this.items.first();
                formId = first ? first.getFormId() : null;
                radios = Ext.form.RadioManager.getWithValue(name, cbValue, formId).items;
                len = radios.length;

                for (i = 0; i < len; ++i) {
                    radios[i].setValue(true);
                }
            }
        }

        return this;
    },
    listeners: {
        afterrender: function (me, option) {
            me.items.each(function (item) {
                item.name = me.name;
            })
        }
    }
});

/*数据读取后映射配置**********************************************/

//树控件的数据banding通用的模式
Ext.define('xf.Common.TreeNodeData', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'text',
        mapping: 'Text',
        type: 'string'
    }, {
        name: 'leaf',
        mapping: 'Leaf'
    }, {
        name: 'expanded',
        mapping: 'Expanded'
    }]
});
//具有复选框的树控件的数据banding通用的模式
Ext.define('xf.Common.CheckBoxTreeNodeData', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'text',
        mapping: 'Text',
        type: 'string'
    }, {
        name: 'leaf',
        mapping: 'Leaf'
    }, {
        name: 'checked',
        mapping: 'Checked',
        type: 'bool'
    }, {
        name: 'expanded',
        mapping: 'Expanded'
    }]
});

/*数据读取后映射配置**********************************************/

/*数据读取处理****************************************************/

Ext.define('xf.Common.Reader', {
    extend: 'Ext.data.reader.Json',
    alias: 'reader.CommonReader',
    useSimpleAccessors: true,
    //上一次总数 分页时防止重新计算总数
    lastTotalCount: 0,
    read: function (object) {
        try {
            console.log();
            var result = Ext.decode(object.responseText);
            if (result.error) {
                console.log("Ext获得服务器数据格式错误:" + result.error);
                console.log(result);
                if (!isDebug) {
                    //serverNS.isLogin();
                }
                return;
            }
            var data = result;//serverNS.packRespData(result.value);

            //分页时防止重新计算总数
            var count = data[this.totalProperty];
            if (!Ext.isEmpty(count)) {
                this.lastTotalCount = count;
            } else {
                data[this.totalProperty] = this.lastTotalCount;
            }
        } catch (err) {
            console.log("解析服务器返回数据错误.");
            console.log(err);
            if (!isDebug) {
                //serverNS.isLogin();
            }
        }
        return this.callParent([result]);
    }
});

/*数据读取处理****************************************************/

/*通讯方式********************************************************/
//设置通讯超时
Ext.Ajax.timeout = 30 * 1000;
//Grid通用通讯方式
Ext.define('xf.Common.Proxy', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.CommonProxy',
    headers: {},
    config: {
        actionMethods: {
            create: 'POST',
            read: 'POST',
            update: 'POST',
            destroy: 'POST'
        },
        paramsAsJson: true,
    },
    commuArgs: new serverNS.commuArgs(),
    //缓存通讯参数  为了分页等操作使用
    cacheCommuArgs: null,
    //监听store 是否重新从服务器加载数据
    isReloadData: true,

    buildUrl: function (request) {
        var me = this;
        var tempCommuArgs = me.commuArgs;
        if (this.isReloadData) {
            me.cacheCommuArgs = me.commuArgs.deepCopy();
        }
        tempCommuArgs = me.cacheCommuArgs;

        //添加请求参数
        if (request._params) {
            //页参数
            if (request._params.page) {
                tempCommuArgs.dataArgs.Query.Page.PageIndex = request._params.page;
            }
            if (request._params.limit) {
                tempCommuArgs.dataArgs.Query.Page.PageSize = request._params.limit;
            }

            //排序参数
            if (request._params.sort && request._params.dir) {
                tempCommuArgs.dataArgs.Query.Sorters = [];
                var sorter = new serverNS.sorter();
                sorter.SortField = request._params.sort;
                sorter.SortOrder = (request._params.dir == 'DESC') ? serverNS.sortOrder.Desc : serverNS.sortOrder.Asc;
                tempCommuArgs.dataArgs.Query.Sorters.push(sorter);
            }
        }
        request._params = {};

        if (tempCommuArgs.ajaxMethod == 'undefined' || tempCommuArgs.ajaxMethod == '') {
            throw '没有设置异步通讯方式:ajaxMethod.';
        }
        var ns = tempCommuArgs.ajaxMethod.split('.');
        var method_name = ns[ns.length - 1];


        request._url = tempCommuArgs.ajaxMethod;

        request.jsonData = serverNS.packDataArgs(tempCommuArgs.dataArgs);

        me._headers = {};
        me._headers[AJAXPRO_METHOD_HEADER_NAME] = method_name;
        //me.setExtraParams(request.jsonData);
        request._params = request.jsonData;
        this.isReloadData = false;
        me.commuArgs.reset();

        return me.callParent(arguments);
    }
}, function () {
    this.commuArgs = new serverNS.commuArgs();
    Ext.apply(this.prototype, {

        actionMethods: {
            create: 'POST',
            read: 'POST',
            update: 'POST',
            destroy: 'DELETE'
        },
        listeners: {
            exception: function (proxy, resp, action) {
                //console.log('exception');
                //console.log('store.exception',resp,action);
                console.log('ajaxpro.proxy found a error', resp, action);
                return;
                resp = Ext.decode(resp.responseText);
                alert_error(resp.message, 'loader.exception');
            }
        }
    });
});
//Grid通用通讯方式
/*通讯方式********************************************************/

/*Store********************************************************/
//获得grid通用store配置
var getGridStoreConfig = function (grid) {
    return Ext.create("Ext.data.Store", {
        buffered: false,
        remoteSort: true,
        //trailingBufferZone : 0,
        remoteFilter: true,
        model: grid.modelName,
        pageSize: grid.pageSize,
        //预先加载行数
        leadingBufferZone: grid.pageSize,
        autoLoad: grid.autoLoadData,
        proxy: {
            type: 'CommonProxy',
            commuArgs: grid.commuArgs,
            reader: {
                type: 'CommonReader',
                totalProperty: 'Count',
                root: 'Entitys'
            },
            simpleSortMode: true,
            filterParam: 'query'
        },
        listeners: {
            scope: grid,
            beforeload: function (store, operation, eOpts) {
                eOpts.grid = grid;

                //                if (!Ext.isEmpty(grid.selModel)) {
                //                    grid.selModel.deselectAll();
                //                }

                //通知proxy需要重新到服务器获取
                store.getProxy().isReloadData = true;
                if (this.beforeload) {
                    this.beforeload(store, operation, eOpts);
                }
                //如果未配置权限读取器，自动从model扫描读取器
                if (Ext.isEmpty(grid.commuArgs.dataArgs.Right.RightReaderName) && this.commuArgs.dataArgs.Right.UseRight) {
                    //是否配置权限读取器
                    var rightReaderName = eval(this.modelName).prototype.rightReaderName;
                    if (!Ext.isEmpty(rightReaderName)) {
                        this.commuArgs.dataArgs.Right.RightReaderName = rightReaderName;
                    }
                }
                if (!Ext.isEmpty(this.lastAdvSearchItems)) {
                    this.commuArgs.dataArgs.Query.Searchs = Ext.Array.merge(this.commuArgs.dataArgs.Query.Searchs, this.lastAdvSearchItems);
                } else {
                    if (Ext.isEmpty(this.lastSearchItems)) {
                        //默认过滤条件
                        if (!Ext.isEmpty(this.defFilterSearchItems)) {
                            this.commuArgs.dataArgs.Query.Searchs = this.defFilterSearchItems;
                        }
                    }

                    //合并临时过滤条件
                    if (!Ext.isEmpty(this.tempFilterSearchItems)) {
                        this.commuArgs.dataArgs.Query.Searchs = Ext.Array.merge(this.commuArgs.dataArgs.Query.Searchs, this.tempFilterSearchItems);
                    }

                    //合并搜索状态下的搜索条件
                    if (!Ext.isEmpty(this.lastSearchItems)) {
                        this.commuArgs.dataArgs.Query.Searchs = Ext.Array.merge(this.commuArgs.dataArgs.Query.Searchs, this.lastSearchItems);
                    }
                }


                //                //默认过滤条件
                //                if (!Ext.isEmpty(this.defFilterSearchItems)) {
                //                    this.commuArgs.dataArgs.Query.Searchs = this.defFilterSearchItems;
                //                }

                //                //合并临时过滤条件
                //                if (!Ext.isEmpty(this.tempFilterSearchItems)) {
                //                    this.commuArgs.dataArgs.Query.Searchs = Ext.Array.merge(this.commuArgs.dataArgs.Query.Searchs, this.tempFilterSearchItems);
                //                }

                //                //合并搜索状态下的搜索条件
                //                if (!Ext.isEmpty(this.lastSearchItems)) {
                //                    this.commuArgs.dataArgs.Query.Searchs = Ext.Array.merge(this.commuArgs.dataArgs.Query.Searchs, this.lastSearchItems);
                //                }

                //如果未设置查询条件  设置默认排序
                if (Ext.isEmpty(this.commuArgs.dataArgs.Query.Sorters)) {
                    var sorter = new serverNS.sorter();
                    sorter.SortField = 'ID', sorter.SortOrder = serverNS.sortOrder.Desc;
                    this.commuArgs.dataArgs.Query.Sorters = [sorter];
                }
            },
            load: function (store, records, successful, eOpts) {
                if (this.load) {
                    this.load(store, records, successful, eOpts);
                }
            }
        }
    });
};
/*Store********************************************************/

/*高级查询界面********************************************************/

//Ext.define('xf.Common.GridAdvSearch', {
//    extend: 'Ext.panel.Panel',
//    alias: 'widget.CommonGridAdvSearch',
//    border: false,
//    fields: null,
//    fieldStore: null,
//    doQuery: null,
//    layout: {
//        type: 'vbox',
//        padding: '5',
//        align: 'stretch'
//    },
//    lines: 0,
//    maxLineNum: 5,

//    removeSearch: function (line) {
//        if (this.lines <= 1)
//            return;

//        this.remove(line);
//        this.lines--;
//    },

//    andStore: Ext.create('Ext.data.Store', {
//        fields: ['name', 'title'],
//        data: [{
//            name: serverNS.logicalRelOperator.And,
//            title: 'And'
//        }, {
//            name: serverNS.logicalRelOperator.Or,
//            title: 'Or'
//        }]
//    }),

//    //定义操作符数据源
//    opStore: Ext.create('Ext.data.Store', {
//        fields: ['name', 'title'],
//        data: [{
//            name: serverNS.searchOperator.Equal,
//            title: gettext('Equals'),
//            remark: '',
//            validDataType: 'string date float enum'
//        }, {
//            name: serverNS.searchOperator.Like,
//            title: gettext('Like'),
//            remark: '',
//            validDataType: 'string'
//        }, {
//            name: serverNS.searchOperator.GreaterThan,
//            title: gettext('GreaterThan'),
//            remark: '',
//            validDataType: 'date float'
//        }, {
//            name: serverNS.searchOperator.GreaterThanOrEqual,
//            title: gettext('GreaterOrEquals'),
//            remark: '',
//            validDataType: 'date float'
//        }, {
//            name: serverNS.searchOperator.LessThan,
//            title: gettext('LessThan'),
//            remark: '',
//            validDataType: 'date float'
//        }, {
//            name: serverNS.searchOperator.LessThanOrEqual,
//            title: gettext('LessOrEquals'),
//            remark: '',
//            validDataType: 'date float'
//        }]
//    }),

//    //执行查询
//    execute_query: function () {

//        var searchArgs = new Array();
//        var rows = this.query('panel');
//        var canSearch = true;
//        Ext.Array.each(rows, function (name, index, countriesItSelf) {

//            try {
//                var rel = name.down('#query_rel').getValue();
//                var op = name.down('#query_op').getValue();
//                var field = name.down('#query_field').getValue();
//                var value = name.down('#query_value').getValue();
//                if (Ext.isEmpty(rel) || Ext.isEmpty(op) || Ext.isEmpty(field)) {
//                    alert_info('高级查询条件(字段,操作符,逻辑关系符)不能为空', 'EAP');
//                    canSearch = false;
//                    return;
//                }

//                //获得查询字段下拉框对象
//                var fieldComboObj = name.down('#query_field');
//                var dtype = fieldComboObj.findRecordByValue(field).dtype;
//                if (dtype != 'string' && Ext.isEmpty(value)) {
//                    alert_info('高级查询条件非字符型字段值不能为空', 'EAP');
//                    canSearch = false;
//                    return;
//                } else if (dtype == 'date') {
//                    //分解日期的等于
//                    if (op == serverNS.searchOperator.Equal) {
//                        var sases = serverNS.getDateSearchArgsGroup(field, value);
//                        sases[0].RelOperator = rel;
//                        searchArgs = Ext.Array.merge(searchArgs, sases);
//                        return;
//                    } else {
//                        value = serverNS.convertToSerDT(value);
//                    }
//                }
//                var arg = new serverNS.searchArgs();
//                arg.FieldName = field;
//                arg.Operator = op;
//                arg.RelOperator = rel;
//                arg.Values.push(value);

//                searchArgs.push(arg);
//            } catch (e) {
//                alert_error('高级查询条件配置错误：' + e, 'EAP');
//                canSearch = false;
//                return;
//            }
//        });

//        if (!canSearch || searchArgs.length == 0)
//            return;
//        if (Ext.isFunction(this.doQuery)) {
//            this.doQuery({
//                "searchArgs": searchArgs
//            });
//        }
//    },

//    addSearch: function () {
//        if (this.lines >= this.maxLineNum) {
//            alert_info('高级查询条件数不能超过' + this.maxLineNum + '个.', 'EAP');
//            return;
//        }
//        if (this.lines < 1) {
//            this.add({
//                xtype: 'fieldcontainer',
//                layout: 'hbox',
//                items: [{
//                    xtype: 'button',
//                    text: '添加',
//                    iconCls: 'SJicon_all btn_add',
//                    handler: function () {
//                        this.up('CommonGridAdvSearch').addSearch();
//                    }
//                }, {
//                    xtype: 'splitter'
//                }, {
//                    xtype: 'button',
//                    text: '查询',
//                    iconCls: 'SJicon_all btn_runquery',
//                    handler: function () {
//                        this.up('CommonGridAdvSearch').execute_query();
//                    }
//                }]
//            });
//        }

//        //逻辑运算符选择框
//        var logicCombo = {
//            xtype: 'combo',
//            width: 50,
//            editable: true,
//            itemId: 'query_rel',
//            emptyText: '关系',
//            displayField: 'title',
//            valueField: 'name',
//            store: this.andStore
//        };

//        //字段选择框
//        var fieldCombo = {
//            xtype: 'combo',
//            flex: 1,
//            editable: true,
//            emptyText: '字段',
//            itemId: 'query_field',
//            displayField: 'title',
//            valueField: 'field',
//            store: this.fieldStore,
//            listeners: {
//                scope: this,
//                change: function (combo, newValue) {
//                    //console.log(newValue, combo,this);
//                    var mode = combo.findRecordByValue(newValue);
//                    if (!mode)
//                        return;
//                    var dtype = mode.dtype;
//                    var nextFC = combo.up('fieldcontainer').nextSibling();
//                    var field = nextFC.getComponent(0);
//                    var cur_xtype = field.xtype;
//                    var new_field = {};
//                    switch (dtype) {
//                        case 'string':
//                            new_field = {
//                                xtype: 'textfield'
//                            };
//                            break;
//                        case 'float':
//                            new_field = {
//                                xtype: 'numberfield'
//                            };
//                            break;
//                        case 'date':
//                            new_field = {
//                                xtype: 'datefield'
//                            };
//                            break;
//                        case 'enum':
//                            new_field = {
//                                xtype: 'combo',
//                                displayField: 'name',
//                                valueField: 'value',
//                                store: mode.store
//                            };
//                            break;
//                    }

//                    //                    if (new_field['xtype'] == cur_xtype)
//                    //                        return;
//                    new_field['itemId'] = 'query_value';
//                    new_field['flex'] = 1;

//                    nextFC.remove(field);
//                    nextFC.insert(0, new_field);
//                }
//            }
//        };

//        //运算符选择框
//        var operatorCombo = {
//            xtype: 'combo',
//            flex: 1,
//            editable: true,
//            itemId: 'query_op',
//            emptyText: '操作符',
//            displayField: 'title',
//            valueField: 'name',
//            lastQuery: '',
//            store: this.opStore,
//            listeners: {
//                expand: function (field, eOpts) {
//                    //获得查询字段下拉框对象
//                    var fieldComboObj = this.up('fieldcontainer').getComponent('query_field');
//                    var mode = fieldComboObj.findRecordByValue(fieldComboObj.getValue());
//                    if (!mode)
//                        return;
//                    var dtype = mode.dtype;
//                    if (!dtype)
//                        return;
//                    //过滤可用操作符
//                    this.store.filterBy(function (record, id) {
//                        return record.validDataType.indexOf(dtype) >= 0;
//                    });
//                }
//            }
//        };

//        var panel = {
//            layout: {
//                type: 'vbox',
//                padding: '0',
//                align: 'stretch'
//            },
//            border: false,
//            items: [{
//                xtype: 'fieldcontainer',
//                layout: 'hbox',
//                items: [logicCombo, {
//                    xtype: 'splitter'
//                }, fieldCombo, {
//                    xtype: 'splitter'
//                }, operatorCombo]
//            }, {
//                xtype: 'fieldcontainer',
//                layout: 'hbox',
//                items: [{
//                    xtype: 'textfield',
//                    flex: 1,
//                    itemId: 'query_value',
//                    emptyText: 'field'
//                }, {
//                    xtype: 'splitter'
//                }, {
//                    xtype: 'button',
//                    text: '移除',
//                    iconCls: 'SJicon_all btn_remove',
//                    handler: function () {
//                        this.up('CommonGridAdvSearch').removeSearch(this.up('panel'));
//                    }
//                }]
//            }]

//        };

//        this.add(panel);

//        this.lines++;
//    },

//    initComponent: function () {

//        Ext.apply(this, {});
//        //end apply

//        this.fieldStore = Ext.create('Ext.data.Store', {
//            fields: ['title', 'dtype', 'field'],
//            data: this.fields
//        });

//        this.callParent(arguments);
//        this.addSearch();
//    } //initComponent
//});

Ext.define('xf.Common.GridAdvSearch', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.CommonGridAdvSearch',
    border: false,
    modelName: '',
    fields: null,
    fieldStore: null,
    doQuery: null,
    layout: {
        type: 'vbox',
        padding: '5',
        align: 'stretch'
    },
    lines: 0,
    maxLineNum: 5,

    removeSearch: function (line) {
        if (this.lines <= 1)
            return;

        this.remove(line);
        this.lines--;
    },

    andStore: Ext.create('Ext.data.Store', {
        fields: ['name', 'title'],
        data: [{
            name: serverNS.logicalRelOperator.And,
            title: '并且'
        }, {
            name: serverNS.logicalRelOperator.Or,
            title: '或者'
        }]
    }),

    //定义操作符数据源
    opStore: Ext.create('Ext.data.Store', {
        fields: ['name', 'title'],
        data: [{
            name: serverNS.searchOperator.Equal,
            title: gettext('等于'),
            remark: '',
            validDataType: 'string date float enum'
        }, {
            name: serverNS.searchOperator.Like,
            title: gettext('包含'),
            remark: '',
            validDataType: 'string'
        }, {
            name: serverNS.searchOperator.GreaterThan,
            title: gettext('大于'),
            remark: '',
            validDataType: 'date float'
        }, {
            name: serverNS.searchOperator.GreaterThanOrEqual,
            title: gettext('大于或等于'),
            remark: '',
            validDataType: 'date float'
        }, {
            name: serverNS.searchOperator.LessThan,
            title: gettext('小于'),
            remark: '',
            validDataType: 'date float'
        }, {
            name: serverNS.searchOperator.LessThanOrEqual,
            title: gettext('小于或等于'),
            remark: '',
            validDataType: 'date float'
        }]
    }),

    //执行查询
    execute_query: function () {

        var searchArgs = new Array();
        var rows = this.query('panel');
        var canSearch = true;
        Ext.Array.each(rows, function (name, index, countriesItSelf) {

            try {
                var rel = name.down('#query_rel').getValue();
                var op = name.down('#query_op').getValue();
                var field = name.down('#query_field').getValue();
                var value = name.down('#query_value').getValue();
                if (Ext.isEmpty(rel) || Ext.isEmpty(op) || Ext.isEmpty(field)) {
                    alert_info('高级查询条件(字段,操作符,逻辑关系符)不能为空', 'EAP');
                    canSearch = false;
                    return;
                }

                //获得查询字段下拉框对象
                var fieldComboObj = name.down('#query_field');
                var dtype = fieldComboObj.findRecordByValue(field).dtype;
                if (dtype != 'string' && Ext.isEmpty(value)) {
                    alert_info('高级查询条件非字符型字段值不能为空', 'EAP');
                    canSearch = false;
                    return;
                } else if (dtype == 'date') {
                    //分解日期的等于
                    if (op == serverNS.searchOperator.Equal) {
                        var sases = serverNS.getDateSearchArgsGroup(field, value);
                        sases[0].RelOperator = rel;
                        searchArgs = Ext.Array.merge(searchArgs, sases);
                        return;
                    } else {
                        value = serverNS.convertToSerDT(value);
                    }
                }

                var arg = new serverNS.searchArgs();
                arg.FieldName = field;
                arg.Operator = op;
                arg.RelOperator = rel;
                arg.Values.push(value);

                searchArgs.push(arg);
            } catch (e) {
                alert_error('高级查询条件配置错误：' + e, 'EAP');
                canSearch = false;
                return;
            }
        });

        if (!canSearch || searchArgs.length == 0)
            return;

        if (Ext.isFunction(this.doQuery)) {
            this.doQuery({
                "searchArgs": searchArgs
            });
        }
    },

    addSearch: function () {
        if (this.lines >= this.maxLineNum) {
            alert_info('高级查询条件数不能超过' + this.maxLineNum + '个.', 'EAP');
            return;
        }
        if (this.lines < 1) {
            this.add({
                xtype: 'fieldcontainer',
                layout: 'hbox',
                items: [{
                    xtype: 'button',
                    text: '添加',
                    iconCls: 'SJicon_all btn_add',
                    handler: function () {
                        this.up('CommonGridAdvSearch').addSearch();
                    }
                }, {
                    xtype: 'splitter'
                }, {
                    xtype: 'button',
                    text: '查询',
                    iconCls: 'SJicon_all btn_runquery',
                    handler: function () {
                        this.up('CommonGridAdvSearch').execute_query();
                    }
                }]
            });
        }

        //逻辑运算符选择框
        var logicCombo = {
            xtype: 'combo',
            width: 50,
            editable: false,
            itemId: 'query_rel',
            emptyText: '关系',
            displayField: 'title',
            valueField: 'name',
            store: this.andStore
        };

        //字段选择框
        var fieldCombo = {
            xtype: 'combo',
            flex: 1,
            editable: false,
            emptyText: '字段',
            itemId: 'query_field',
            displayField: 'title',
            valueField: 'field',
            store: this.fieldStore,
            listeners: {
                scope: this,
                change: function (combo, newValue) {
                    //console.log(newValue, combo,this);
                    var mode = combo.findRecordByValue(newValue);
                    console.log('modeLocate');
                    console.log(mode);
                    if (!mode)
                        return;
                    var dtype = mode.dtype;

                    var nextFC = combo.up('fieldcontainer').nextSibling();
                    var field = nextFC.getComponent(0);
                    var cur_xtype = field.xtype;
                    var new_field = {};
                    switch (dtype) {
                        case 'string':
                            new_field = {
                                xtype: 'textfield'
                            };
                            break;
                        case 'float':
                            new_field = {
                                xtype: 'numberfield'
                            };
                            break;
                        case 'date':
                            new_field = {
                                xtype: 'datefield'
                            };
                            break;
                        case 'enum':
                            new_field = {
                                xtype: 'combo',
                                displayField: 'name',
                                valueField: 'value',
                                store: mode.store
                            };
                            break;
                    }

                    //                    if (new_field['xtype'] == cur_xtype)
                    //                        return;
                    new_field['itemId'] = 'query_value';
                    new_field['flex'] = 1;

                    nextFC.remove(field);
                    nextFC.insert(0, new_field);
                }
            }
        };

        //运算符选择框
        var operatorCombo = {
            xtype: 'combo',
            flex: 1,
            editable: false,
            itemId: 'query_op',
            emptyText: '操作符',
            displayField: 'title',
            valueField: 'name',
            lastQuery: '',
            store: this.opStore,
            listeners: {
                expand: function (field, eOpts) {
                    //获得查询字段下拉框对象
                    var fieldComboObj = this.up('fieldcontainer').getComponent('query_field');
                    var mode = fieldComboObj.findRecordByValue(fieldComboObj.getValue());
                    if (!mode)
                        return;
                    var dtype = mode.dtype;
                    if (!dtype)
                        return;
                    //过滤可用操作符
                    this.store.filterBy(function (record, id) {
                        return record.validDataType.indexOf(dtype) >= 0;
                    });
                }
            }
        };

        var panel = {
            layout: {
                type: 'vbox',
                padding: '0',
                align: 'stretch'
            },
            border: false,
            items: [{
                xtype: 'fieldcontainer',
                layout: 'hbox',
                items: [logicCombo, {
                    xtype: 'splitter'
                }, fieldCombo, {
                        xtype: 'splitter'
                    }, operatorCombo]
            }, {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                items: [{
                    xtype: 'textfield',
                    flex: 1,
                    itemId: 'query_value',
                    emptyText: 'field'
                }, {
                    xtype: 'splitter'
                }, {
                    xtype: 'button',
                    text: '移除',
                    iconCls: 'SJicon_all btn_remove',
                    handler: function () {
                        this.up('CommonGridAdvSearch').removeSearch(this.up('panel'));
                    }
                }]
            }]

        };

        this.add(panel);

        this.lines++;
    },

    addFields: function () {
        if (!this.modelName) {
            console.log("没有为高级查询配置有效的modelName!");
            return;
        }
        var model = Ext.create(this.modelName);
        if (!model) {
            console.log("没有为高级查询配置有效的modelName!");
            return;
        }
        if (!this.fields) {
            this.fields = [];
        }
        var fields = model.fields.items;
        for (var i = 0; i < fields.length; i++) {
            var field = fields[i];
            if (!field.dtype || !field.text) { continue; }  //没配置text或type 则不加入高级搜索
            else {
                field.title = field.text;
                field.field = field.name;
                this.fields.push(field);

            }
        }
    },

    initComponent: function () {

        Ext.apply(this, {});
        if (!this.fields) {
            this.addFields();
        }
        this.fieldStore = Ext.create('Ext.data.Store', {
            fields: ['title', 'dtype', 'field'],
            data: this.fields
        });

        this.callParent(arguments);

        this.addSearch();



    } //initComponent
});

/*高级查询界面********************************************************/

//@class
//MainView
Ext.define('xf.DefaultView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.SGView',
    record: null,

    //isEdit：是否编辑状态  record：行数据 refreshGrid:是否刷新Grid
    changeView: function (isEdit, record, refreshGrid) {
        if (Ext.isEmpty(refreshGrid)) {
            refreshGrid = true;
        }
        this.record = record;
        var layout = this.getLayout();
        if (isEdit) {
            if (layout.getNext()) {
                var form = this.down('SGForm');
                form.record = record;
                layout.next();
                if (form.autoLoadData) {
                    form.load();
                }
            }
        } else {
            if (layout.getPrev()) {
                layout.prev();
                if (refreshGrid) {
                    this.down('sggrid').refresh();
                }
            }
        }

    }, //更改view
    initComponent: function () {
        Ext.apply(this, {
            layout: 'card',
            deferredRender: false,
            border: false,
            listeners: {
                scope: this,
                openspace: function (isWindow, record) {
                    //alert('dfdf');
                }
            }
        });
        //end apply
        this.callParent(arguments);
    } //initComponent
});
//end SGView

//@class
//SGForm
Ext.define('xf.Form', {
    extend: 'Ext.form.Panel',
    alias: 'widget.SGForm',
    border: false,
    bodyPadding: 5,
    layout: 'column',
    defaults: {
        margin: "2 5 0 2",
        xtype: 'textfield',
        labelAlign: 'top',
        columnWidth: .5,
        labelSeparator: '',
        msgTarget: 'side'
    },

    //form是否包含在SGView中
    isInSGView: true,

    //行数据对象
    record: null,
    //通讯方式参数
    commuArgs: new serverNS.commuArgs(),
    //是否自动加载数据
    //如果需要手工调用load写callback方法的，请设置为false；
    autoLoadData: true,
    //判断当前是否需要验证数据
    needValidate: true,
    //是否需要自动关闭loading，当二次异步调用时需要设置为false
    autoCloseLoading: true,
    //是否为编辑状态
    isEdit: function () {
        return !Ext.isEmpty(this.record);
    },

    //第一次显示后执行
    afterFirstShow: function (me, eOpts) {
    },

    //呈现之前出发的事件  参数 Ext.Component me, Object eOpts
    beforeshow: function (me, eOpts) {
    },
    //数据加载
    //回调参数 option.callBack = function(data){}
    //option.autoSetValues=teue 回调时是否自动赋值
    load: function (option) {
        if (Ext.isEmpty(option)) {
            option = {};
        }
        //默认自动回调赋值开启
        if (Ext.isEmpty(option.autoSetValues)) {
            option.autoSetValues = true;
        }
        //不是编辑状态 或 不能自动加载时不接下去执行
        if (!this.isEdit())
            return;
        var formPanel = this;
        this.commuArgs.dataArgs.Entitys = new Array(this.record.raw);
        this.commuArgs.callBack = function (data) {
            try {
                if (data.Success) {
                    if (!Ext.isEmpty(data.Entitys) && option.autoSetValues) {
                        formPanel.getForm().reset();
                        formPanel.record.raw = data.Entitys[0];
                        formPanel.getForm().setValues(data.Entitys[0]);
                    }
                    if (option.callBack) {
                        option.callBack(data);
                    }
                    return;
                }
                throw data.Message;
            } catch (e) {
                var err = '异常' + e;
                alert_error(err);
                console.log(err);
                formPanel.setLoading(false);
            } finally {
                if (formPanel.autoCloseLoading) {
                    formPanel.setLoading(false);
                }
            }
        };
        this.setLoading('Loading...');
        serverNS.ajaxProSend(this.commuArgs);
    },

    //数据添加 不能使用add,会覆盖父类方法
    //回调参数 option.callBack = function(data){}
    addNew: function (option) {
        if (Ext.isEmpty(option)) {
            option = {};
        }
        var form = this.getForm();
        if (this.needValidate) {
            if (!form.isValid())
                return;
        }
        var editData = form.getValues();
        var formPanel = this;
        this.commuArgs.dataArgs.Entitys = new Array(editData);
        this.commuArgs.callBack = function (data) {
            try {
                if (data.Success) {
                    //把添加后实体赋值给this.record.raw
                    if (!Ext.isEmpty(data.Entitys)) {
                        formPanel.record = {};
                        formPanel.record.raw = data.Entitys[0];
                    }
                    if (option.callBack) {
                        option.callBack(data);
                    }
                    if (formPanel.isInSGView) {
                        formPanel.up('SGView').changeView(false, null, true);
                    }
                    return;
                }
                throw data.Message;
            } catch (e) {
                var err = '异常' + e;
                alert_error(err);
                console.log(err);
                formPanel.setLoading(false);
            } finally {
                if (formPanel.autoCloseLoading) {
                    formPanel.setLoading(false);
                }
            }
        };

        this.setLoading('Loading...');
        serverNS.ajaxProSend(this.commuArgs);
    },

    //通用删除
    //回调参数 option.callBack = function(data){}
    del: function (option) {
        if (Ext.isEmpty(option)) {
            option = {};
        }
        if (!this.record)
            return;
        var formPanel = this;
        this.commuArgs.dataArgs.Entitys = new Array(this.record.raw);
        this.commuArgs.callBack = function (data) {
            try {
                if (data.Success) {
                    if (option.callBack) {
                        option.callBack(data);
                    }
                    if (formPanel.isInSGView) {
                        formPanel.up('SGView').changeView(false, null, true);
                    }
                    return;
                }
                throw data.Message;
            } catch (e) {
                var err = '异常' + e;
                alert_error(err);
                console.log(err);
                formPanel.setLoading(false);
            } finally {
                if (formPanel.autoCloseLoading) {
                    formPanel.setLoading(false);
                }
            }
        }

        this.setLoading('Loading...');
        serverNS.ajaxProSend(this.commuArgs);
    },

    //通用保存
    //回调参数 option.callBack = function(data){}
    save: function (option) {
        if (Ext.isEmpty(option)) {
            option = {};
        }
        var formPanel = this;
        var form = this.getForm();
        if (this.needValidate) {
            if (!form.isValid()) {
                alert_error(gettext('Form validation failure'));
                return;
            }
        }
        var editData = form.getValues();
        //合并数据实例
        editData = Ext.Object.merge(this.record.raw, editData);
        this.commuArgs.dataArgs.Entitys = new Array(editData);
        this.commuArgs.callBack = function (data) {
            try {
                if (data.Success) {
                    formPanel.record.raw = editData;
                    //formPanel.record.load(formPanel.record.id)
                    if (option.callBack) {
                        option.callBack(data);
                    }
                    if (formPanel.isInSGView) {
                        formPanel.up('SGView').changeView(false, null, true);
                    }
                    return;
                }
                throw data.Message;
            } catch (e) {
                var err = '异常' + e;
                alert_error(err);
                console.log(err);
                formPanel.setLoading(false);
            } finally {
                if (formPanel.autoCloseLoading) {
                    formPanel.setLoading(false);
                }
            }
        };

        this.setLoading('Loading...');
        serverNS.ajaxProSend(this.commuArgs);
    },

    //重置form数据
    resetData: function () {
        this.getForm().reset();
        this.record = null;
    },

    //上传所有field.File控件的文件
    //option.callBack(data) data:数据库返回信息
    uploadFiles: function (option) {
        if (Ext.isEmpty(this.down("filefield"))) {
            return;
        }
        if (!Ext.isObject(option)) {
            option = {};
        }
        this.getForm().submit({
            url: '/FileUploader.ashx', //上传地址
            waitMsg: '正在上传文件,请稍等...',
            failure: function (fp, o) {
                try {
                    var resultData = Ext.decode(o.response.responseText);
                    if (resultData.Success) {
                        serverNS.packRespData(resultData);
                        if (Ext.isFunction(option.callBack)) {
                            option.callBack(resultData);
                        }
                    } else {
                        alert_error(resultData.Message);
                        console.log(resultData);
                    }
                }
                catch (err) {
                    alert_error("解析上传文件的返回信息异常.");
                    console.log(err);
                    console.log(o);
                }
            }
        });
    },

    initComponent: function () {
        //引用 只能在initComponent重新定义才能对象隔离，暂时这样用
        this.commuArgs = new serverNS.commuArgs();
        Ext.apply(this, {
            listeners: {
                scope: this,
                beforeshow: this.beforeshow,
                afterrender: function (me, eOpts) {
                    if (this.afterFirstShow) {
                        this.afterFirstShow(me, eOpts);
                    };
                }
            }
        });
        //end apply
        this.callParent(arguments);
    } //initComponent
});
//end SGForm

//通用Grid
Ext.define('xf.GridPanel', {
    extend: 'Ext.grid.Panel',
    //alternateClassName: 'Ext.data.RestProxy',
    alias: 'widget.sggrid',

    //form是否包含在SGView中
    isInSGView: true,
    //是否多选
    multiSel: false,
    pageSize: 100,
    //leadingBufferSize: 100,
    modelName: '', //定义实体的名称
    gridTips: '', //表格图标的指示提醒区
    //通讯方式参数
    commuArgs: new serverNS.commuArgs(),
    //快速搜索的列名数组
    quickSearchCols: [],
    //启用搜索
    enableSearch: true,
    //默认的列表过滤条件   会拼接所有查询和读取的条件
    //使用此属性时，查询或grid加载时 不必指定相同条件，自动拼接
    defFilterSearchItems: [],
    //临时列表过滤条件  在某段时间内使用的过滤（比如 使用树节点分类查询时）     会拼接所有查询和读取的条件
    //使用此属性时，查询或grid加载时 不必指定相同条件，自动拼接
    tempFilterSearchItems: [],

    //private 私有字段，不得使用     保存上一次的搜索条件
    lastSearchItems: [],
    invalidateScrollerOnRefresh: false,
    //双击时是否显示默认行详情
    isShowRowDetailOnDblClick: false,
    //双击是否触发编辑
    dblClickToEdit: true,
    //编辑触发的回调函数  records为行数据对象数组 raws真实数据集
    editCallBack: function (records, raws) {
    },
    //是否允许SGGrid最前有复选框
    checkBoxMode: true,
    //是否自动加载grid数据
    autoLoadData: true,
    //第一次显示后执行
    afterFirstShow: function (me, eOpts) {
    },
    //每次加载数据前执行事件
    beforeload: function (store, operation, eOpts) {
    },
    //自定义行样式
    getCustomRowClass: function (record) { },

    isEditor: false,

    isRowEditor: false,
    //获取当前表格中已选中的行数
    getSelectedRowsRecords: function () {
        var sRows = this.getSelectionModel().getSelection();
        var checked_rows = [];
        if (!sRows || sRows.length < 1)
            return checked_rows;
        Ext.Array.each(sRows, function (name, index, itself) {
            checked_rows.push(name);
        });
        return checked_rows;
    },

    //取消选择
    deSelectAll: function () {
        this.getSelectionModel().deselectAll();
    },

    //刷新表格
    refresh: function () {
        try {
            //暂时使用重置取消 编辑前的选中状态
            this.getStore().clearData();
            var store = this.getStore();

            //需要取消选择  不然有选择数据残留
            this.deSelectAll();

            store.load();
        } catch (err) {
            //alert_error(err.message);
            console.log(err.message);
        }
    }, //end refresh

    //重置为初始数据
    resetData: function () {
        this.lastSearchItems = [];
        this.getStore().clearData();
        var store = this.getStore();

        //需要取消选择  不然有选择数据残留
        this.deSelectAll();

        this.removeSort();
        store.load();
    },
    //刷新已选择好的数据 提升用户体验
    refreshSelectedData: function () {
        var selectedItems = this.getSelectedRowsRecords();

        var ids = [];
        Ext.each(selectedItems, function (item) {
            ids.push(item.ID);
        });

        var option = {
            searchArgs: []
        };

        if (!Ext.isEmpty(ids)) {
            var searchArgs = new Array();
            var arg = new serverNS.searchArgs();
            arg.FieldName = 'ID';
            arg.Values = ids;
            arg.Operator = serverNS.searchOperator.In;
            searchArgs.push(arg);
            option.searchArgs = searchArgs;
        }

        this.deSelectAll();

        this.search(option);
    },
    //删除排序信息
    removeSort: function () {
        //this.reconfigure();
        //暂时取消不掉
    },

    ///是否处于查询状态
    isSearching: function () {
        return !Ext.isEmpty(this.lastSearchItems);
    },

    //搜索表格 参数option{searchArgs:serverNS.searchArgs的数组}
    search: function (option) {

        if (!option.searchArgs || option.searchArgs.length == 0) {
            this.resetData();
            return;
        }
        this.lastSearchItems = option.searchArgs;
        this.store.loadPage(1);
        //        this.store.loadPage(1);

    }, //end search

    quickSearch: function () {
        var quickSTB = this.down('#quicksearch_field');
        var key = quickSTB.getValue().trim();
        quickSTB.setValue(key);

        var searchs = [];
        if (!this.quickSearchCols || this.quickSearchCols.length == 0)
            return;
        if (Ext.isEmpty(key))
            return;
        for (var i = 0; i < this.quickSearchCols.length; i++) {
            var searchArgs = new serverNS.searchArgs();
            searchArgs.FieldName = this.quickSearchCols[i];
            searchArgs.Values = new Array(key);
            searchArgs.Operator = serverNS.searchOperator.Like;
            //第一个条件用and 与其他组关联
            searchArgs.RelOperator =
                i == 0 ? serverNS.logicalRelOperator.And : serverNS.logicalRelOperator.Or;
            //把查询条件配置为同一组号
            searchArgs.SearchGroupID = 1;
            searchs.push(searchArgs);
        }
        this.search({
            searchArgs: searchs
        });
    }, //quick search

    //触发编辑动作
    edit: function () {
        var records = this.getSelectedRowsRecords();
        if (!records || records.length == 0)
            return;

        if (this.isInSGView) {
            this.up('SGView').changeView(true, records[0]);
        }

        if (this.editCallBack) {
            var raws = [];
            for (var i = 0; i < records.length; i++) {
                raws.push(records[i].raw);
            }
            this.editCallBack(records, raws, this);
        }
    },
    //参数option.callBack(records) records为删除的数据实体对象
    del: function (option) {

        var grid = this;

        var records = this.getSelectedRowsRecords();
        if (!records || records.length == 0)
            return;

        this.commuArgs.dataArgs.Entitys = [];
        for (var i = 0; i < records.length; i++) {
            this.commuArgs.dataArgs.Entitys.push(records[i].raw);
        }

        this.commuArgs.callBack = function (data) {
            try {
                if (data.Success) {
                    if (option && option.callBack) {
                        option.callBack(data);
                    }
                    grid.refresh();
                    return;
                }
                throw data.Message;
            } catch (e) {
                var err = '异常' + e;
                alert_error(err);
                console.log(err);
            } finally {
                grid.setLoading(false);
            }
        };

        this.setLoading('Loading...');

        serverNS.ajaxProSend(this.commuArgs);
    },

    //导出grid数据
    //option.ExportFileName 导出数据文件的名称
    exportData: function (option) {
        var grid = this;

        if (Ext.isEmpty(option)) {
            option = {};
        }

        option.submitCallBack = function (dataRange, fileType) {
            var cacheCommuArgs = grid.getStore().getProxy().cacheCommuArgs;
            if (!Ext.isObject(cacheCommuArgs))
                return;
            var commuArgs = cacheCommuArgs.deepCopy();
            var dataArgs = commuArgs.dataArgs;
            dataArgs.Query.Page.PageSize = -1;
            dataArgs.Query.Page.PageIndex = 1;

            dataArgs.Query.Export = new serverNS.exportArg();
            dataArgs.Query.Export.ExportFileType = fileType;
            dataArgs.Query.Export.ExportFileName = option.ExportFileName;

            //获取导出的列信息
            var modelType = eval(grid.modelName).prototype;
            console.log(grid.modelName);
            for (var j = 0; j < modelType.fields.items.length; j++) {
                var modelItem = modelType.fields.items[j];
                if (Ext.isEmpty(modelItem.exportIndex)) {
                    continue;
                }

                var exportCol = new serverNS.exportColArg();
                exportCol.ExportIndex = modelItem.exportIndex;
                exportCol.Text = modelItem.text;
                exportCol.Name = modelItem.name;

                dataArgs.Query.Export.ExportCols.push(exportCol);
            }

            switch (dataRange) {
                case 'AllData':
                    //以后也许还要考虑固定过滤条件的问题
                    //dataArgs.Query.Searchs = [];
                    break;
                case 'QueryedData':
                    break;
                case 'SelectedData':
                    //获得勾选所有ID
                    var selectedIDs = Ext.Array.map(grid.getSelectedRowsRecords(), function (e) {
                        return e.ID;
                    });
                    if (Ext.isEmpty(selectedIDs))
                        return;
                    var searchArgs = new serverNS.searchArgs();
                    searchArgs.FieldName = 'ID';
                    searchArgs.Values = selectedIDs;
                    searchArgs.Operator = serverNS.searchOperator.In;
                    //以后也许还要考虑固定过滤条件的问题
                    dataArgs.Query.Searchs = [searchArgs];
                    break;
            }

            commuArgs.callBack = function (data) {
                try {
                    if (data.Success) {
                        if (!Ext.isEmpty(data.ExportFileRelPath)) {
                            window.location.href = "../App/Download.aspx?path=" + data.ExportFileRelPath;
                            return;
                        }
                    }
                    throw data.Message;
                } catch (e) {
                    var err = '异常' + e;
                    alert_error(err);
                    console.log(err);
                } finally {
                    grid.setLoading(false);
                }
            };
            if (!Ext.isEmpty(option.isCustom)) {
                // console.log("1");
                commuArgs.ajaxMethod = option.isCustom;

            }
            else {
                // console.log("2");
                commuArgs.ajaxMethod = ajaxProMethodNS.Gets;
            };
            grid.setLoading('Loading...');
            // console.log(dataArgs.Query.Export.ExportCols);
            serverNS.ajaxProSend(commuArgs);
        };
        showExportForm(option);
    },

    //根据列名获取列显示文本
    getColumnText: function (columnName) {
        for (var i = 0; i < this.columns.length; i++) {
            var column = this.columns[i];
            if (column.dataIndex == columnName) {
                return column.text;
            }
        }
        return '';
    },

    //显示默认grid行信息
    showDefGridRowDetail: function (record, grid) {
        var text = '<br/>';
        for (var attrName in record.data) {
            var columnText = this.getColumnText(attrName);
            if (Ext.isEmpty(columnText))
                continue;
            text += '[' + columnText + ']:<br/>';
            var valObj = record.data[attrName];
            if (Ext.isDate(valObj)) {
                text += valObj.CommonPatternDateTime();
            } else {
                text += valObj;
            }
            text = text.replace(/\n/g, "<br/>");
            //换行显示
            text += '<br/><br/><br/>';
        }
        showTextWinForm(text);
    },

    //同步数据模型信息到列信息
    syncModelInfoToColumnInfo: function () {
        //是否配置权限读取器
        if (Ext.isEmpty(eval(this.modelName))) return;
        var modelType = eval(this.modelName).prototype;
        if (Ext.isEmpty(modelType)) return;
        for (var i = 0; i < this.columns.length; i++) {
            var column = this.columns[i];
            for (var j = 0; j < modelType.fields.items.length; j++) {
                var modelItem = modelType.fields.items[j];
                if (modelItem.name == column.dataIndex) {
                    if (column.text != '&#160;') {
                        modelItem.text = column.text;
                    } else {
                        column.setText(modelItem.text);
                    }
                    break;
                }
            }
        }
    },

    initComponent: function () {
        var sgGrid = this;
        //引用 只能在initComponent重新定义才能对象隔离，暂时这样用
        this.commuArgs = new serverNS.commuArgs();
        // this.defFilterSearchItems = [];
        // this.quickSearchCols = [];
        // this.lastSearchItems = [];
        if (Ext.isEmpty(this.defFilterSearchItems)) {
            this.defFilterSearchItems = [];
        }
        this.lastSearchItems = [];

        //是否允许行多选
        this.selModel = {
            mode: this.multiSel ? 'MULTI' : 'SINGLE'
        };

        if (!this.tbar) {
            this.tbar = [];
        }
        this.tbar.push('->');
        if (this.enableSearch) {

            this.tbar.push({
                xtype: 'textfield',
                scope: this,
                itemId: 'quicksearch_field',
                emptyText: '输入条件进行快捷搜索',
                listeners: {
                    scope: this,
                    specialKey: function (field, e) {
                        if (e.getKey() == Ext.EventObject.ENTER) {
                            this.quickSearch();
                        }
                    }
                }
            });
            this.tbar.push({
                xtype: 'button',
                itemId: 'quickSearchBtn',
                text: '搜索',
                iconCls: 'search',
                scope: this,
                handler: this.quickSearch
            });
            this.tbar.push('-');
        }
        this.tbar.push({
            xtype: 'button',
            itemId: 'refreshBtn',
            text: '刷新',
            iconCls: 'reload',
            listeners: {
                scope: this,
                click: function (me, e, eOpts) {
                    this.resetData();
                }
            }
        });

        var selType = this.checkBoxMode ? 'checkboxmodel' : 'rowmodel';
        var store = getGridStoreConfig(this);
        Ext.apply(this, {
            layout: 'fit',
            bbar: [{
                xtype: 'component',
                html: this.gridTips
            }, '->', {
                xtype: 'component',
                itemId: 'status',
                tpl: 'Total records: {count}',
                style: 'margin-right:10px'
            }], //end bbar
            store: store,
            selType: selType,
            dockedItems: [{
                xtype: 'pagingtoolbar',
                itemId: 'pagingbommontoolbar',
                store: store,   // GridPanel中使用的数据
                dock: 'bottom',
                displayInfo: true

            }],
            viewConfig: {
                forceFit: true,
                enableTextSelection: true,
                preserveScrollOnRefresh: true,
                emptyText: '<h1 style="margin:20px">没有匹配的数据</h1>',
                //自定义行样式接口
                getRowClass: function (value, metaData, record, rowIndex, colIndex, store) {
                    if (Ext.isFunction(sgGrid.getCustomRowClass)) {
                        return sgGrid.getCustomRowClass(value, metaData, record, rowIndex, colIndex, store);
                    }
                }
            },
            listeners: {
                scope: this,
                render: function () {
                    this.store.on('totalcountchange', function (count) {
                        this.down('#status').update({
                            count: this.store.getTotalCount()
                        });
                    }, this);
                },
                afterrender: function (me, eOpts) {
                    me.syncModelInfoToColumnInfo();
                    if (this.afterFirstShow) {
                        this.afterFirstShow(me, eOpts);
                    };
                },
                itemdblclick: function (grid, record, item, index, e, eOpts) {
                    if (this.dblClickToEdit) {
                        if (this.isInSGView) {
                            var view = this.up('SGView');
                            if (view) {
                                view.changeView(true, record);
                            }
                        }
                        this.edit();
                    }
                    if (this.isShowRowDetailOnDblClick) {
                        this.showDefGridRowDetail(record, grid);
                    }
                },
                edit: function (editor, e) {
                    this.roworcelledit(editor, e);
                }
            },
            plugins: (this.isEditor ? (this.isRowEditor ? [Ext.create('Ext.grid.plugin.RowEditing', {
                clicksToMoveEditor: 1,
                clicksToEdit: 2,
                saveBtnText: '确定',
                cancelBtnText: '退出',
                autoCancel: false
            })] : [Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 2,
                listeners: {
                    beforeedit: {
                        fn: function (editor, e, eOpts) {
                            if (sgGrid.cellbeforeedit) {
                                return sgGrid.cellbeforeedit(editor, e, eOpts);
                            }
                        }
                    },
                    edit: {
                        fn: function (editor, e, eOpts) {
                            if (sgGrid.celledit) {
                                sgGrid.celledit(editor, e, eOpts);
                            }
                        }
                    }
                }
            })]) : [])
        });
        //end apply

        this.callParent(arguments);
    }
});

//***自定义grid模式lookup控件*******************************************************
Ext.define('xf.Common.GridLookupPanel', {
    extend: 'Ext.form.FieldContainer',
    alias: 'widget.CommonGridLookupPanel',
    mixins: {
        field: 'Ext.form.field.Field'
    },
    layout: 'hbox',
    title: '选择数据',
    //没有选择时，指定的空值
    nullValue: null,
    //双击grid行时是否视为选中操作
    isSelOnGridRowDblClick: true,
    //双击时是否显示默认行详情
    isShowRowDetailOnDblClick: false,
    //选择显示字段
    displayField: 'ID',
    //选择值字段
    valueField: 'ID',
    //允许为空
    allowBlank: true,
    //是否多选
    multiSel: false,
    modal: true,
    //grid数据模型名称
    gridModelName: '',
    //grid列配置
    gridColumnConfig: [],
    //需要快速查询的列名
    quickSearchCols: [],
    //选择的行的数据源  不要重写
    selRecordRaws: [],
    //根据setValue方法设置的值，获取显示值  使用setValue设置值时，可以自定义需要显示的文本
    readOnly: true,
    getTextBySetValue: function (value) {
        return value;
    },
    //multiSel=false获得选择唯一标识		multiSel=true 获得选择唯一标识数组
    getValue: function () {
        if (!this.multiSel) {
            if (!Ext.isEmpty(this.selRecordRaws)) {
                return this.selRecordRaws[0][this.valueField];
            }
            return this.nullValue;
        } else {
            return this.down('#inputfield').rawValue;
        }
    },

    //multiSel=false设置数据唯一标识		multiSel=true 设置数据唯一标识数组
    //text 设置默认文本
    setValue: function (value, text) {
        if (Ext.isEmpty(value))
            return;
        if (!this.multiSel) {
            var textTemp = text;
            if (Ext.isEmpty(textTemp)) {
                textTemp = this.getTextBySetValue(value);
            }
            var item = {};
            item[this.displayField] = textTemp;
            item[this.valueField] = value;
            this.setRawValues([item]);
        } else {
            this.down('#inputfield').setValue(value);
        }

    },
    //重置lookup选择数据
    reset: function () {
        this.selRecordRaws = [];
        this.down('#inputfield').setValue('');
        this.fireEvent('reset', this);
    },

    //设置数据对象数组
    setRawValues: function (valueObjs) {
        if (Ext.isEmpty(valueObjs))
            return;
        this.selRecordRaws = valueObjs;
        this.refreshText();
        this.fireEvent('callBack', this, this.selRecordRaws);
    },
    //刷新lookup显示文本
    refreshText: function () {
        var text = '';
        for (var i = 0; i < this.selRecordRaws.length; i++) {
            if (Ext.isEmpty(text)) {
                text = this.selRecordRaws[i][this.displayField];
                continue;
            }
            text += ',' + this.selRecordRaws[i][this.displayField];
        }
        this.down('#inputfield').setValue(text);
    },

    //弹框对象
    popupWin: null,
    //打开选择框
    openSelWin: function () {
        var commonGridLookupPanel = this;
        this.popupWin = new Ext.Window({
            bodyPadding: 0,
            commonGridLookupPanel: commonGridLookupPanel,
            //是否为模式窗体
            modal: this.modal,
            itemId: 'selPopupWin',
            title: commonGridLookupPanel.title,
            layout: 'fit',
            width: defaultWinArgs.width,
            height: defaultWinArgs.height,
            //获得弹出Grid对象
            getGrid: function () {
                return this.down('sggrid');
            },
            items: {
                xtype: 'sggrid',
                isInSGView: false,
                isShowRowDetailOnDblClick: commonGridLookupPanel.isShowRowDetailOnDblClick,
                //是否多选
                multiSel: commonGridLookupPanel.multiSel,
                //把编辑事件视为选中
                editCallBack: function (records, raws) {
                    if (commonGridLookupPanel.isSelOnGridRowDblClick) {
                        commonGridLookupPanel.popupWin.down('#submitBtn').selectGridData();
                    }
                },
                modelName: this.gridModelName,
                columns: this.gridColumnConfig,
                quickSearchCols: this.quickSearchCols,
                beforeload: function (store, action) {
                    commonGridLookupPanel.fireEvent('beforeload', this, store, action);
                },
                afterFirstShow: function (me, eOpts) {
                    commonGridLookupPanel.fireEvent('afterFirstShow', me, eOpts);
                }
            },
            buttons: [{
                text: "取消",
                iconCls: 'SJicon_all btn_cancel',
                listeners: {
                    scope: this,
                    click: function () {
                        this.popupWin.close();
                        this.popupWin = null;
                    }
                }
            }, {
                text: "确认",
                iconCls: 'SJicon_all btn_submit',
                itemId: 'submitBtn',
                selectGridData: function () {
                    //清空之前选择的
                    var raws = [];
                    var datasource = commonGridLookupPanel.popupWin.getGrid().getSelectedRowsRecords();
                    for (var i = 0; i < datasource.length; i++) {
                        raws.push(datasource[i].raw);
                    }

                    commonGridLookupPanel.setRawValues(raws);

                    commonGridLookupPanel.fireEvent('beforeColse', this);
                    commonGridLookupPanel.popupWin.close();
                    commonGridLookupPanel.popupWin = null;
                },
                listeners: {
                    click: function () {
                        this.selectGridData();
                    }
                }
            }]
        });
        this.popupWin.show();
    },

    //自定义初始化控件
    initComponent: function () {
        Ext.apply(this, {
            //定义子控件
            items: [{
                xtype: 'textfield',
                itemId: 'inputfield',
                allowBlank: this.allowBlank,
                readOnly: this.readOnly,
                flex: 1,
                listeners: {
                    change: function (text, newValue, oldValue, eOpts) {
                        if (!text.readOnly) {

                            text.up('CommonGridLookupPanel').setValue(text.lastValue);
                        }
                    }
                }
            }, {
                xtype: 'splitter'
            }, {
                xtype: 'button',
                itemId: 'queryBtn',
                iconCls: 'SJicon_all btn_runquery',
                handler: function () {
                    this.up('CommonGridLookupPanel').openSelWin();
                }
            }, {
                xtype: 'splitter'
            }, {
                xtype: 'button',
                itemId: 'clearBtn',
                iconCls: 'SJicon_all btn_refresh',
                handler: function () {
                    this.up('CommonGridLookupPanel').reset();
                }
            }]
        });

        this.addEvents({//custom event
            'beforeload': true,
            'callBack': true,
            'reset': true,
            'beforeColse': true,
            'afterFirstShow': true
        });
        this.callParent(arguments);

        this.on('beforedestroy', function (p) {

            if (this.popupWin != null) {
                this.popupWin.destroy();
                this.popupWin = null;
                console.log('destroy window at lookup');
            }
        });
        //console.log(this.down('textfield').allowBlank);
    }
});
//***自定义grid模式lookup控件*******************************************************

/***自定义ImageField控件**************************************************/
Ext.define('xf.Common.ImageField', {
    extend: 'Ext.container.Container',
    alias: 'widget.CommonImageField',
    mixins: {
        field: 'Ext.form.field.Field'
    },
    layout: 'fit',
    cls: 'imageview',
    border: false,
    defaultValue: '',
    url: '',
    savedirkey: '',
    addbtntext: '选择',
    clearbtntext: '清除',

    getValue: function () {
        return this.url;
    },
    setValue: function (newValue) {
        if (Ext.isEmpty(newValue)) {
            newValue = this.defaultValue;
        }
        this.updateImage(newValue);
    },

    updateImage: function (url) {
        var img = this.el.query('img')[0];
        if (Ext.isEmpty(url)) {
            url = "/Static/img/Custom/NoCompanyLogo.png";
        }
        img.src = url;
        this.url = url;
    },

    uploadFile: function () {
        var self = this;
        var uploadDialog = Ext.create('Ext.ux.UploadDialog.Dialog', {
            //上传文件扩展名限制（不区分大小写），例如此配置限制职能上传PDF文件
            permitted_extensions: ['gif', 'jpg', 'png', 'jpeg', 'xls', 'xlsx', 'PDF', 'doc', 'docx', 'DWG'],
            //上传的Ajax的params配置对象（一般无需配置）
            base_params: {},
            max_queued_count: 1
        });
        uploadDialog.on("uploadsuccess", function (scope, filename, data) {
            if (data && data.Success) {
                serverNS.packRespData(data);
                self.updateImage(data.FileMsgs[0].RelativePath);
            }
        });
        uploadDialog.show();
    },
    clearuploadFile: function () {
        this.setValue('');
    },

    initComponent: function () {
        Ext.apply(this, {
            url: this.url,
            savedirkey: this.savedirkey,
            addbtntext: this.addbtntext,
            clearbtntext: this.clearbtntext,
            imgWidth: this.imgWidth,
            imgHeight: this.imgHeight,
            defaultValue: this.defaultValue,
            items: {
                layout: 'vbox',
                align: 'stretch',
                pack: 'center',
                defaults: {
                    border: false
                },
                items: [{
                    layout: 'hbox',
                    flex: 1,
                    width: '100%',
                    items: [{
                        xtype: 'displayfield',
                        flex: 1
                    }, {
                        xtype: 'container',
                        width: this.imgWidth,
                        height: this.imgHeight,
                        tpl: '<img id="imgLogo" style="vertical-align:middle;" src="' + this.defaultValue + '" />',
                        data: {}
                    }, {
                        xtype: 'displayfield',
                        flex: 1
                    }]
                }, {
                    layout: 'hbox',
                    padding: 3,
                    border: false,
                    width: '100%',
                    items: [{
                        xtype: 'displayfield',
                        flex: 1
                    }, {
                        xtype: 'displayfield',
                        flex: 1
                    }, {
                        xtype: 'button',
                        text: this.addbtntext,
                        iconCls: 'SJicon_all btn_edit',
                        listeners: {
                            scope: this,
                            click: this.uploadFile
                        }
                    }, {
                        xtype: 'displayfield',
                        flex: 1
                    }, {
                        xtype: 'button',
                        text: this.clearbtntext,
                        iconCls: 'SJicon_all btn_delete',
                        listeners: {
                            scope: this,
                            click: this.clearuploadFile
                        }
                    }, {
                        xtype: 'displayfield',
                        flex: 1
                    }, {
                        xtype: 'displayfield',
                        flex: 1
                    }]
                }]
            }

        });
        this.callParent(arguments);

        this.addEvents({//custom event
            "change": true
        });
        //console.log(this.items);
    }
});
//SGSEP.exwidget.ImageField
/***自定义ImageField控件**************************************************/

/***自定义TreePanel控件**************************************************/
//Custom TreePanel
Ext.define('xf.Common.TreePanel', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.CommonTreePanel',
    rootVisible: false,
    layout: 'fit',
    anchor: '100%',
    singleExpand: true,
    region: 'center',
    lines: false,
    useArrows: true,
    border: false,
    rootVisible: false,
    //根节点显示文本，如果文本为空，则根节点不显示
    rootText: '',
    listeners: {
        checkchange: function (node, checked) {
            //递归修改所后代节点状态（节点,状态）
            var allChild = function (node, checked) {
                node.eachChild(function (n) {
                    n.set('checked', checked);
                    if (n.hasChildNodes()) {
                        allChild(n, checked);
                    }
                });
            };
            //递归判断兄弟节点是否选中 修改父节点状态(父节点)
            var allParent = function (node) {
                //父节点状态 0 选中
                var i = 0;
                //遍历节点是全选
                node.eachChild(function (n) {
                    //如果没选中
                    if (!n.data.checked) {
                        i = 1;
                    }
                });
                if (i == 0) {
                    node.set('checked', 'true');
                    //node.updateInfo({checked:flag});
                } else {
                    node.set('checked', 'false');
                }
                if (node.parentNode != null) {
                    allParent(node.parentNode);
                }
            };
            //递归判断兄弟节点是否选中 修改父节点状态(父节点)
            var allParentUnChecked = function (node) {
                node.set('checked', 'false');
                if (node.parentNode != null) {
                    allParentUnChecked(node.parentNode);
                }
            };
            //判断当前节点层级
            if (Ext.isEmpty(node.parentNode)) {
                //根节点操作

                //同步所有子节点
                allChild(node, checked);

            } else {
                //子节点操作

                //同步所有子节点
                node.data.checked = checked;
                allChild(node, checked);

                if (checked) {
                    //子节点选中时 判断是否所有子节点都为选中状态 改变父节点状态
                    allParent(node.parentNode);
                } else {
                    //子节点取消选中时 改变父节点状态
                    allParentUnChecked(node.parentNode);
                }

            }
        },
        load: function (tree, records, successful, operation, node, eOpts) {
            console.log(arguments);
            if (!Ext.isEmpty(node.data.checked)) {
                if (node.data.checked == true) {
                    node.eachChild(function (child) {
                        child.set('checked', 'true');
                        //child.on('checkchange', child,true);
                        //child.fireEvent('', child, 'true');
                    });
                } else {
                    node.eachChild(function (child) {
                        child.set('checked', 'false');
                        //child.fireEvent('checkchange', child, 'false'); 
                        //child.on('checkchange', child,false);
                    });

                }
            }
        },
        itemcontextmenu(tree, record, item, index, e, eOpts) {
            if (this.itemContextMenu) {
                this.itemContextMenu(tree, record, item, index, e, eOpts);
            }

        }
    },
    //树节点点击事件
    treeNodeClick: function (tree, record, item, index, e) {
    },

    itemContextMenu: function (tree, record, item, index, e) {

    },

    //通讯方式参数
    commuArgs: new serverNS.commuArgs(),
    //快速搜索的列名数组
    quickSearchCols: [],
    query_data: null,
    enableCheckbox: false,

    //节点加载之前事件 参数me,store, action
    storeBeforeLoad: null,

    //获取所有选中的节点
    getCheckedNode: function () {
        var records = this.getView().getChecked(), snodes = [];

        Ext.Array.each(records, function (rec) {
            snodes.push(rec.raw);
        });

        return snodes;
    },

    //获取选中节点
    getSelectNode: function () {
        if (this.getSelectionModel().selectionStart == null)
            return null;
        return this.getSelectionModel().selectionStart.raw;
    },

    //重写加载子节点 如果node为null，重新加载整个树
    reloadChildNodes: function (node) {
        var store = this.getStore();
        if (Ext.isEmpty(node)) {
            node = this.getRootNode();
        }
        store.load({
            node: node
        });
    },

    initComponent: function () {
        var modelName = 'xf.Common.TreeNodeData';
        if (this.enableCheckbox) {
            modelName = 'xf.Common.CheckBoxTreeNodeData';
        }

        var treeStoreConfig = {
            model: modelName,
            defaultRootProperty: 'Entitys',
            proxy: {
                type: 'CommonProxy',
                commuArgs: this.commuArgs,
                reader: {
                    type: 'CommonReader',
                    root: 'Entitys'
                }
            },
            listeners: {
                beforeload: function (store, action, eOpts) {
                    //通知proxy需要重新到服务器获取
                    store.getProxy().isReloadData = true;
                    if (this.storeBeforeLoad) {
                        this.storeBeforeLoad(this, store, action, eOpts);
                    }
                },
                scope: this
            }
        };

        //是否显示根节点
        if (this.rootVisible) {
            treeStoreConfig = Ext.Object.merge(treeStoreConfig, {
                root: {
                    expanded: true,
                    leaf: false,
                    text: this.rootText,
                    iconCls: 'SJicon_all menu'
                }
            });
        }

        Ext.apply(this, {
            layout: 'fit',
            viewConfig: {
                loadMask: true
            },
            store: Ext.create('Ext.data.TreeStore', treeStoreConfig)
        });
        //end apply

        this.callParent(arguments);

        if (this.treeNodeClick) {
            //注册treeNodeClick事件
            this.on('itemclick', this.treeNodeClick);
        }
    }
});

//具有查找功能树控件
Ext.define('xf.Common.TreeSearchPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.CommonTreeSearchPanel',
    layout: 'border',
    //是否激活时间搜索
    enableDateSearch: true,
    //是否激活文本搜索框控件
    enableTextSearch: true,
    //控件是否在查询状态,私有变量不要随便设置
    isSearching: false,
    //搜索词
    searchText: '',
    //开始时间
    searchFromDate: null,
    //结束时间
    searchToDate: null,
    //通用树的重写配置 慎用
    commonTreeConfig: {},

    //树节点点击事件
    treeNodeClick: function (tree, record, item, index, e) {
    },

    //获取包含的树
    getTree: function () {
        return this.down('CommonTreePanel');
    },

    //注册树的事件
    regTreeEvent: function (eventName, callBack, scope) {
        this.getTree().on(eventName, callBack, scope);
    },

    //改变搜索相关控件的激活状态
    changeSearchCtrlsEnable: function (enable) {
        this.down('#searchContainer').setDisabled(!enable);
    },

    //查询
    search: function () {
        if (!this.isValidSearchArg()) {
            if (this.isSearching) {
                this.reset();
            }
            return;
        }

        this.searchText = this.getSearchTB().getValue().trim();
        this.searchFromDate = this.getFromDateCtrl().getValue();
        this.searchToDate = this.getToDateCtrl().getValue();
        this.isSearching = true;
        //把搜索框失效，避免多次点击
        this.changeSearchCtrlsEnable(false);
        this.getTree().reloadChildNodes(null);
    },

    //刷新
    reset: function () {
        this.getSearchTB().reset();
        this.getFromDateCtrl().reset();
        this.getToDateCtrl().reset();
        this.isSearching = false;
        this.getTree().reloadChildNodes(null);
    },

    //////界面相关功能  ////////////////////////////////////////////////

    //是否为有效的搜索条件
    isValidSearchArg: function () {
        var searchText = this.getSearchTB().getValue().trim();
        //没有激活日期选择的搜索
        if (!this.enableDateSearch) {
            return !Ext.isEmpty(searchText);
        }

        var fromDateText = this.getFromDateCtrl().getRawValue().trim();
        var toDateText = this.getToDateCtrl().getRawValue().trim();

        //没有填写日期的搜索
        if (Ext.isEmpty(fromDateText) && Ext.isEmpty(fromDateText)) {
            if (!this.enableTextSearch) {
                return false;
            }
            return !Ext.isEmpty(searchText);
        }

        if (this.getFromDateCtrl().isValid() && this.getToDateCtrl().isValid()) {
            var fromDate = this.getFromDateCtrl().getValue();
            var toDate = this.getToDateCtrl().getValue();
            if (fromDate > toDate) {
                return false;
            }
            return true;
        }
        return false;
    },

    //获取搜索框
    getSearchTB: function () {
        return this.down('#searchKeywordTB');
    },

    //获取开始日期控件
    getFromDateCtrl: function () {
        return this.down('#fromDateCtrl');
    },

    //获取结束日期控件
    getToDateCtrl: function () {
        return this.down('#toDateCtrl');
    },

    initComponent: function () {
        var searchTreePanel = this;
        var treeConfig = {
            xtype: 'CommonTreePanel',
            lines: true,
            region: 'center'
        }

        if (!Ext.isEmpty(this.commonTreeConfig)) {
            treeConfig = Ext.merge(treeConfig, this.commonTreeConfig);
        }

        var dateCtrlColumnW = 0.5;
        if (!this.enableTextSearch) {
            dateCtrlColumnW = 0.4;
        }

        Ext.apply(this, {
            items: [{
                xtype: 'container',
                itemId: 'searchContainer',
                margin: "0 0 4 0",
                layout: 'column',
                region: 'north',
                defaults: {
                    margin: "2 2 2 2",
                    labelAlign: 'top',
                    columnWidth: dateCtrlColumnW,
                    msgTarget: 'side',
                    labelSeparator: ''
                },
                items: [{
                    itemId: 'fromDateCtrl',
                    emptyText: '开始',
                    xtype: 'datefield'
                }, {
                    itemId: 'toDateCtrl',
                    emptyText: '结束',
                    xtype: 'datefield'
                }, {
                    itemId: 'searchKeywordTB',
                    emptyText: '关键字',
                    xtype: 'textfield',
                    //hideMode: 'visibility',
                    columnWidth: .8,
                    listeners: {
                        scope: this,
                        specialKey: function (field, e) {
                            if (e.getKey() == Ext.EventObject.ENTER) {
                                this.search();
                            }
                        }
                    }
                }, {
                    xtype: 'button',
                    itemId: 'treeSearchBtn',
                    iconCls: 'SJicon_all btn_runquery',
                    columnWidth: .1,
                    handler: function () {
                        //刷新==重置数据
                        this.up('CommonTreeSearchPanel').search();
                    }
                }, {
                    xtype: 'button',
                    columnWidth: .1,
                    itemId: 'treeResetBtn',
                    iconCls: 'SJicon_all btn_refresh',
                    handler: function () {
                        //刷新==重置数据
                        this.up('CommonTreeSearchPanel').reset();
                    }
                }]
            }, treeConfig]
        });

        Ext.apply(this, {
            listeners: {
                storeBeforeLoad: function (tree, store, operation, eOpts) {
                    treeConfig.storeBeforeLoad(tree, store, operation, eOpts);
                }
            },
        })


        ////原本树加载函数，避免覆盖
        //var sourceTreeBeforeLoadEvt = treeConfig.storeBeforeLoad;
        ////注册节点加载之前事件
        //treeConfig.storeBeforeLoad = function (tree, store, operation, eOpts) {
        //    searchTreePanel.fireEvent('storeBeforeLoad', tree, store, operation, eOpts);
        //    if (Ext.isFunction(sourceTreeBeforeLoadEvt)) {
        //        sourceTreeBeforeLoadEvt(tree, store, operation, eOpts);
        //    }
        //};

        this.callParent(arguments);

        //注册节点重新加载事件
        this.regTreeEvent('load', function (treeStore, node, records, successful, eOpts) {
            this.changeSearchCtrlsEnable(true);
        }, this);

        //如果不是用日期选择框
        if (!this.enableDateSearch) {
            this.getFromDateCtrl().hide();
            this.getToDateCtrl().hide();
        }

        //是否隐藏文本搜索框
        if (!this.enableTextSearch) {
            this.getSearchTB().hide();
        }

        if (!this.enableDateSearch && !this.enableTextSearch) {
            this.down("#treeSearchBtn").hide();
            this.down("#treeResetBtn").hide();
        }

        if (this.treeNodeClick) {
            this.getTree().on('itemclick', this.treeNodeClick);
        }
    }
});
/***自定义TreePanel控件**************************************************/

/***创建统一的WinForm窗体 (返回弹框对象)**************************************************/
//option.winConfig
//option.sgFormConfig
//option.submitCallBack = function(win,form){}
//option.closeCallBack = function(win,form){}
var creareCommonWinForm = function (option) {
    if (Ext.isEmpty(option))
        option = {};
    if (Ext.isEmpty(option.winConfig))
        option.winConfig = {};
    if (Ext.isEmpty(option.sgFormConfig))
        option.sgFormConfig = {};

    //合并SGForm配置
    option.sgFormConfig = Ext.Object.merge({
        xtype: 'SGForm'
    }, option.sgFormConfig);

    //合并windows配置
    option.winConfig = Ext.Object.merge({
        bodyPadding: 0,
        //是否为模式窗体
        modal: true,
        title: 'EAP',
        layout: 'fit',
        width: defaultWinArgs.width,
        height: defaultWinArgs.height,
        items: option.sgFormConfig,
        listeners: {
            close: function (panel, eOpts) {
                var win = panel;
                if (Ext.isFunction(option.closeCallBack)) {
                    option.closeCallBack(win, win.down('SGForm'));
                }
            }
        },
        buttons: [{
            text: "取消",
            iconCls: 'SJicon_all btn_cancel',
            listeners: {
                click: function () {
                    var win = this.up('window');
                    win.close();
                }
            }
        }, {
            text: "确认",
            iconCls: 'SJicon_all btn_submit',
            listeners: {
                click: function () {
                    var win = this.up('window');
                    if (Ext.isFunction(option.submitCallBack)) {
                        option.submitCallBack(win, win.down('SGForm'));
                    }
                    win.close();
                }
            }
        }]
    }, option.winConfig);

    var popupWin = new Ext.Window(option.winConfig);
    popupWin.show();
    return popupWin;
};
/***创建统一的WinForm窗体 (返回弹框对象)**************************************************/

//弹出文本框
var showTextWinForm = function (text) {
    var option = {};
    option.sgFormConfig = {
        items: {
            xtype: 'htmleditor',
            margin: '0 0 0 0',
            readOnly: true
        },
        layout: 'fit'
    };
    var win = creareCommonWinForm(option);
    win.down('htmleditor').setValue(text);
}
/***创建统一的WinForm窗体**************************************************/

/***创建统一的导出弹框**************************************************/
//option.submitCallBack(dataRange,fileType)  isOK是否确定  dataRange数据范围  fileType文件类型
var showExportForm = function (option) {
    if (Ext.isEmpty(option)) {
        option = {
            showAllData: true
        };
    }

    var winOption = {};
    winOption.winConfig = {
        xtype: 'SGForm',
        title: '导出数据',
        height: 300,
        width: 350,
        resizable: false
    };
    winOption.sgFormConfig = {
        items: [{
            xtype: 'CommonBindRadioGroup',
            fieldLabel: '[请选择导出范围]',
            columns: 1,
            vertical: true,
            labelAlign: 'top',
            name: 'dataRange',
            itemId: 'dataRange',
            items: [{
                name: 'dataRange',
                boxLabel: '当前选中行',
                inputValue: 'SelectedData',
                checked: true
            }, {
                name: 'dataRange',
                boxLabel: '当前查询条件',
                inputValue: 'QueryedData'
            }, {
                name: 'dataRange',
                boxLabel: '所有的数据',
                inputValue: 'AllData',
                hidden: !option.showAllData
            }]
        }, {
            xtype: 'container',
            html: '<hr  class="split-line" />',
            anchor: '100%'
        }, {
            xtype: 'CommonBindRadioGroup',
            fieldLabel: '[请选择导出数据文件的类型]',
            itemId: 'fileType',
            name: 'fileType',
            columnWidth: 1,
            labelAlign: 'top',
            items: [{
                name: 'fileType',
                columnWidth: 0.25,
                boxLabel: comboStaticData.getText(comboStaticData.exportFileType, 'Xls'),
                inputValue: comboStaticData.getValue(comboStaticData.exportFileType, 'Xls'),
                checked: true
            }, {
                name: 'fileType',
                columnWidth: 0.25,
                boxLabel: comboStaticData.getText(comboStaticData.exportFileType, 'Csv'),
                inputValue: comboStaticData.getValue(comboStaticData.exportFileType, 'Csv')
            }, {
                xtype: 'container',
                columnWidth: 0.5
            }]
        }, {
            xtype: 'container',
            html: '<hr  class="split-line" />',
            anchor: '100%'
        }]
    };
    winOption.submitCallBack = function (win, form) {

        var dataRange = form.down('#dataRange').getValue().dataRange;
        var fileType = form.down('#fileType').getValue().fileType;
        console.log(dataRange);
        console.log(fileType);
        if (Ext.isFunction(option.submitCallBack)) {
            option.submitCallBack(dataRange, fileType);
        }
    };
    var win = creareCommonWinForm(winOption);
};
/***创建统一的导出弹框**************************************************/

/***右下角的小贴士窗口**************************************************/
/**
* 右下角的小贴士窗口
* @params conf 参考Ext.Window
*         conf中添加autoHide配置项, 默认3秒自动隐藏, 设置自动隐藏的时间(单位:秒), 不需要自动隐藏时设置为false
* @注: 使用独立的window管理组(manager:new Ext.WindowGroup()), 达到总是显示在最前的效果
*/
(function ($) {
    //新建window组，避免被其它window影响显示在最前的效果
    var tipsGroupMgr = new Ext.WindowGroup();
    tipsGroupMgr.zseed = 99999;
    //将小贴士窗口前置

    $.TipsWindow = Ext.extend(Ext.Window, {
        width: 250,
        height: 150,
        layout: 'fit',
        modal: false,
        plain: false,
        border: 4,
        style: {
            borderColor: '#b5b8c8',
            borderStyle: 'solid'
        },
        shadow: false,
        //去除阴影
        draggable: true,
        //默认不可拖拽
        resizable: false,
        hidden: true,
        closable: true,
        closeAction: 'hide',
        //默认关闭为隐藏
        autoHide: 60,
        count: 1, //设置显示的是第几个tipwindow
        //n秒后自动隐藏，为false时,不自动隐藏
        manager: tipsGroupMgr,
        //设置window所属的组
        constructor: function (conf) {
            $.TipsWindow.superclass.constructor.call(this, conf);
            this.initPosition(true);
        },
        initEvents: function () {
            $.TipsWindow.superclass.initEvents.call(this);
            //自动隐藏
            if (this.autoHide && this.autoHide > 1) {
                var task = new Ext.util.DelayedTask(this.hide, this);
                var second = parseInt(this.autoHide) * 1000;
                this.on('show', function (self, eOpts) {
                    task.delay(second);
                });
            }

            this.on('beforeshow', this.showTips);
            this.on('beforehide', this.hideTips);

            Ext.EventManager.onWindowResize(this.initPosition, this);
            //window大小改变时，重新设置坐标
            Ext.EventManager.on(window, 'scroll', this.initPosition, this);
            //window移动滚动条时，重新设置坐标
        },
        //参数: flag - true时强制更新位置
        initPosition: function (flag) {
            if (true !== flag && this.hidden) {
                //不可见时，不调整坐标
                return false;
            }
            var doc = document, bd = (doc.body || doc.documentElement);
            var mainView = Ext.getCmp('sgapp_mainview');
            //ext取可视范围宽高(与上面方法取的值相同), 加上滚动坐标
            var left = bd.scrollLeft + mainView.getWidth() - 18 - this.width;
            var top = bd.scrollTop + mainView.getHeight() - 18 - this.height * this.count;
            this.setPosition(left, top);
        },
        showTips: function () {
            var self = this;
            if (!self.hidden) {
                return false;
            }

            self.initPosition(true);
            //初始化坐标
            self.el.slideIn('b', {
                callback: function () {
                    //显示完成后,手动触发show事件,并将hidden属性设置false,否则将不能触发hide事件
                    self.fireEvent('show', self);
                    self.hidden = false;
                }
            });
            return false;
            //不执行默认的show
        },
        hideTips: function () {
            var self = this;
            if (self.hidden) {
                return false;
            }

            self.el.slideOut('b', {
                callback: function () {
                    //渐隐动作执行完成时,手动触发hide事件,并将hidden属性设置true
                    self.fireEvent('hide', self);
                    self.hidden = true;
                }
            });
            return false;
            //不执行默认的hide
        }
    });
})(xf.Common);

//右下角消息唯一框实例
var curTipWin = null;
//显示消息唯一框
//title 标题
//contect 消息内容
var showTipWin = function (option) {
    if (Ext.isEmpty(option)) {
        option = {};
    }
    if (!Ext.isEmpty(curTipWin)) {
        curTipWin.close();
    }
    curTipWin = new xf.Common.TipsWindow({
        bbar: ['->', {
            xtype: 'button',
            text: '更多',
            iconCls: 'SJicon_all btn_add',
            handler: function () {
                loadMainTab('我的消息', '我的消息', '/Module/System/Message.js', '');
            }
        }],
        title: option.title,
        autoHide: -1,
        count: 1, //设置弹出的是第几个
        //5秒自动关闭
        html: option.content
    });
    curTipWin.show();
};
/***右下角的小贴士窗口**************************************************/

//开始启动获取通知数据
var startGetNotices = function () {
    //轮训时间
    var checkSec = 30 * 1000;
    var task = null;
    var getNotices = function () {
        var commuArgs = new serverNS.commuArgs();
        commuArgs.ajaxMethod = ajaxProMethodNS.GetNotices;
        commuArgs.callBack = function (data) {
            try {
                if (data.Success) {
                    if (Ext.isEmpty(data.Notices)) return;
                    var notice = data.Notices[data.Notices.length - 1];
                    showTipWin({
                        title: '系统消息',
                        content: notice.Msg
                    });
                }
            }
            finally {
                if (!Ext.isEmpty(task)) {
                    task.delay(checkSec);
                }
            }
        };
        serverNS.ajaxProSend(commuArgs);
    };
    task = new Ext.util.DelayedTask(getNotices, this);
    task.delay(checkSec);
}

/***创建统一的报表Grid**************************************************/
//获取指定报表的Grid控件
//rpKey为ReportDataObjType枚举标识值
//customGridConfig Grid自定义配置
//callBack回调函数function(gridView) gridView为最终配置后的grid容器配置对象
//customModelConfig自定义model配置 默认null
//customColConfig 自定义列配置集合  默认null
var getReportGrid = function (rpKey, customGridConfig, callBack, customModelConfig, customColConfig, quickSearchCols, reportObjType, bExecureProc, bShowAllData) {

    var rpActionName = comboStaticData.getValue(comboStaticData.ReportDataObjType, rpKey);
    var rpObjName = comboStaticData.getText(comboStaticData.ReportDataObjType, rpKey);
    //model名字
    var modelFullName = 'xf.data.ReportModel.' + rpKey;

    var columnCallBack = function (columnNames) {

        var modelConfig = {};
        var colConfig = {};
        //默认数据绑定
        modelConfig['ID'] = {
            name: 'ID',
            type: 'long'
        };
        console.log(columnNames);
        columnNames.forEach(function (element, index, array) {
            modelConfig[element] = {};
            modelConfig[element].name = element;
        });
        //合并自定义model参数
        if (!Ext.isEmpty(customModelConfig)) {
            modelConfig = Ext.merge(modelConfig, customModelConfig);
        }
        var fields = [];
        for (var key in modelConfig) {
            fields.push(modelConfig[key]);
        }

        //设置model
        Ext.define(modelFullName, {
            extend: 'Ext.data.Model',
            fields: fields,
            idProperty: 'ID'
        });

        //默认列设置
        colConfig['rownumberer'] = {
            xtype: 'rownumberer',
            width: 50,
            sortable: false,
            menuDisabled: true
        };
        colConfig['ID'] = {
            text: "PKID",
            dataIndex: 'ID',
            hidden: true,
            menuDisabled: true
        };
        columnNames.forEach(function (element, index, array) {
            if (element == 'ID')
                return;

            //查找客户是否已经自定义配置
            if (!Ext.isEmpty(customColConfig)) {
                for (var i = 0; i < customColConfig.length; i++) {
                    if (customColConfig[i].dataIndex == element) {
                        colConfig[element] = customColConfig[i];
                        return;
                    }
                }
            }

            colConfig[element] = {};
            colConfig[element].dataIndex = colConfig[element].text = element;
            colConfig[element].sortable = true;
            colConfig[element].width = 120;
        });

        var cols = [];
        for (var key in colConfig) {
            cols.push(colConfig[key]);
        }

        //默认grid配置
        var gridConfig = {
            xtype: 'sggrid',
            border: false,
            multiSel: true,
            modelName: modelFullName,
            quickSearchCols: quickSearchCols,
            columns: cols,
            tbar: [{
                xtype: 'button',
                text: '导出',
                iconCls: 'SJicon_all btn_export',
                handler: function () {
                    var sgView = this.up('SGView');
                    var grid = sgView.down('sggrid');

                    if (bShowAllData == null) {
                        bShowAllData = true;
                    }
                    option = {
                        showAllData: bShowAllData
                    };

                    option.submitCallBack = function (dataRange, fileType) {
                        var cacheCommuArgs = grid.getStore().getProxy().cacheCommuArgs;
                        if (!Ext.isObject(cacheCommuArgs))
                            return;
                        var commuArgs = cacheCommuArgs.deepCopy();
                        var dataArgs = commuArgs.dataArgs;
                        dataArgs.Query.Page.PageSize = -1;
                        dataArgs.AddExtraArg('OnlyExport', true);
                        dataArgs.AddExtraArg('ExportFileType', fileType);
                        switch (dataRange) {
                            case 'AllData':
                                //以后也许还要考虑固定过滤条件的问题
                                dataArgs.Query.Searchs = [];
                                break;
                            case 'QueryedData':
                                break;
                            case 'SelectedData':
                                //获得勾选所有ID
                                var selectedIDs = Ext.Array.map(grid.getSelectedRowsRecords(), function (e) {
                                    return e.ID;
                                });
                                if (Ext.isEmpty(selectedIDs))
                                    return;
                                var searchArgs = new serverNS.searchArgs();
                                searchArgs.FieldName = 'ID';
                                searchArgs.Values = selectedIDs;
                                searchArgs.Operator = serverNS.searchOperator.In;
                                //以后也许还要考虑固定过滤条件的问题
                                dataArgs.Query.Searchs = [searchArgs];
                                break;
                        }

                        commuArgs.callBack = function (data) {
                            try {
                                if (data.Success) {
                                    if (!Ext.isEmpty(data.ExportFileRelPath)) {
                                        serverNS.downLoad(data.ExportFileRelPath);
                                        return;
                                    }
                                }
                                throw data.Message;
                            } catch (e) {
                                var err = '异常' + e;
                                alert_error(err);
                                console.log(err);
                            } finally {
                                sgView.setLoading(false);
                            }
                        };

                        sgView.setLoading('Loading...');
                        serverNS.ajaxProSend(commuArgs);
                    };
                    showExportForm(option);
                }
            }]
        };
        if (!Ext.isEmpty(customGridConfig)) {
            gridConfig = Ext.merge(gridConfig, customGridConfig);
        }

        var gridView = {
            region: 'center',
            layout: 'fit',
            split: true,
            border: false,
            items: gridConfig
        }

        //console.log(gridView);

        if (!Ext.emptyFn(callBack)) {
            callBack(gridView, gridConfig);
        }
    };
    //请求列信息
    serverNS.getReportColumnInfo(rpKey, columnCallBack, reportObjType, bExecureProc);
};
/***创建统一的报表Grid**************************************************/

//js模块加载
Ext.define("SGLoader", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.sgloader',

    layout: 'fit',
    autoScroll: true,
    beforeshow: function (me) { },
    //远程加载的地址
    url: '',
    initComponent: function () {
        this.callParent(arguments);
        var url = this.url;

        Ext.Ajax.request({
            url: url,
            scope: this,
            success: function (d) {
                var text = d.responseText;
                var json = Ext.decode(text);
                var boot_data = json.boot();

                this.add(boot_data);
                this.beforeshow(this);
                //this.setLoading(false);
            }
        });
    }

});

//2015-11-24 新增高级查询

Ext.define("xf.Common.AdvSearchView", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.sg-advSearch',
    region: 'east',
    title: '查询和过滤',
    collapsible: true,
    collapsed: true,
    width: 300,
    modelName: '',
    doQuery: null,
    overflowY: 'auto',

    defaults: {
        border: false,
        bodyPadding: 5
    },
    layout: {
        type: 'vbox',
        padding: '5',
        align: 'stretch'
    },
    items: [],
    initComponent: function () {
        var me = this;
        me.items = [];
        me.items.push({
            html: '高级查询<hr />'
        });
        var gridAdv = Ext.create("xf.Common.GridAdvSearch", {
            doQuery: me.doQuery,
            modelName: me.modelName
        });
        me.items.push(gridAdv);
        this.callParent(arguments);
    }
});



/***************************工作日历*********************************/
Ext.define('SG.web.widget.MarkDatePicker', {
    extend: 'Ext.picker.Date',
    alias: 'widget.markdatepicker',
    markdays: [],
    minHeight: 165,
    markClsName: 'high-light-day',
    //enableYearSelect:true,
    showDisableDays: true,
    renderTpl: [
        '<div id="{id}-innerEl" data-ref="innerEl" role="grid">',
        '<div role="presentation" class="{baseCls}-header">',
        '<a id="{id}-prevEl" style="display:{monthBtnVisible}" data-ref="prevEl" class="{baseCls}-prev {baseCls}-arrow" role="button" title="{prevText}" hidefocus="on" ></a>',
        '<div id="{id}-middleBtnEl" data-ref="middleBtnEl" class="{baseCls}-month">{%this.renderMonthBtn(values, out)%}</div>',
        '<a id="{id}-nextEl" style="display:{monthBtnVisible}" data-ref="nextEl" class="{baseCls}-next {baseCls}-arrow" role="button" title="A{nextText}" hidefocus="on" ></a>',
        '</div>',
        '<table id="{id}-eventEl" data-ref="eventEl" class="{baseCls}-inner" cellspacing="0" role="grid">',
        '<thead role="presentation"><tr role="row">',
        '<tpl for="dayNames">',
        '<th role="columnheader" class="{parent.baseCls}-column-header" title="{.}">',
        '<div class="{parent.baseCls}-column-header-inner">{.:this.firstInitial}</div>',
        '</th>',
        '</tpl>',
        '</tr></thead>',
        '<tbody role="presentation"><tr role="row">',
        '<tpl for="days">',
        '{#:this.isEndOfWeek}',
        '<td role="gridcell" id="{[Ext.id()]}">',
        // The '#' is needed for keyboard navigation
        '<a href="#" role="button" hidefocus="on" class="{parent.baseCls}-date"></a>',
        '</td>',
        '</tpl>',
        '</tr></tbody>',
        '</table>',
        '<tpl if="showToday">',
        '<div id="{id}-footerEl" data-ref="footerEl" role="presentation" class="{baseCls}-footer">{%this.renderTodayBtn(values, out)%}</div>',
        '</tpl>',
        '</div>',
        {
            firstInitial: function (value) {
                return Ext.picker.Date.prototype.getDayInitial(value);
            },
            isEndOfWeek: function (value) {
                // convert from 1 based index to 0 based
                // by decrementing value once.
                value--;
                var end = value % 7 === 0 && value !== 0;
                return end ? '</tr><tr role="row">' : '';
            },
            renderTodayBtn: function (values, out) {
                Ext.DomHelper.generateMarkup(values.$comp.todayBtn.getRenderTree(), out);
            },
            renderMonthBtn: function (values, out) {
                Ext.DomHelper.generateMarkup(values.$comp.monthBtn.getRenderTree(), out);
            }
        }
    ],

    setMarks: function (marks) {
        this.markdays = marks;
        var me = this;
        Ext.Array.each(this.markdays, function (mark) {
            var date = Ext.Date.parse(mark, 'time');
            me.update(date, true);
        });
    },
    getMarks: function () {
        return this.markdays;
    },

    initComponent: function () {

        if (this.markdays && this.markdays.length > 0) {
            var fday = this.markdays[0];
            if (!Ext.isNumeric(fday)) {
                //console.log('format source date',this.markdays[0]);

                this.markdays = Ext.Array.map(this.markdays, function (d) {
                    //+eDate.clearTime(current, true);
                    return +Ext.Date.clearTime(d, true);
                });
            }
            //console.log(this.markdays);
        }

        Ext.apply(this, {
            monthYearFormat: 'F',
            showToday: false
        });

        this.callParent(arguments);
    },
    beforeRender: function () {

        var me = this,
            days = new Array(me.numDays),
            today = Ext.Date.format(new Date(), me.format);

        if (me.padding && !me.width) {
            me.cacheWidth();
        }

        var splitBtnCfg = {
            ownerCt: me,
            ownerLayout: me.getComponentLayout(),
            text: ''
        };


        me.monthBtn = new Ext.button.Split(splitBtnCfg);

        if (me.showToday) {
            me.todayBtn = new Ext.button.Button({
                ownerCt: me,
                ownerLayout: me.getComponentLayout(),
                text: Ext.String.format(me.todayText, today),
                tooltip: Ext.String.format(me.todayTip, today),
                tooltipType: 'title',
                handler: me.selectToday,
                scope: me
            });
        }

        //me.callParent();

        Ext.applyIf(me, {
            renderData: {}
        });

        Ext.apply(me.renderData, {
            dayNames: me.dayNames,
            showToday: me.showToday,
            prevText: me.prevText,
            nextText: me.nextText,
            monthBtnVisible: 'none',
            days: days
        });

        me.protoEl.unselectable();
    },

    handleMouseWheel: function (e) {
        e.stopEvent();
        return;
    },
    fullUpdate: function (date) {
        var me = this,
            cells = me.cells.elements,
            textNodes = me.textNodes,
            disabledCls = me.disabledCellCls,
            eDate = Ext.Date,
            i = 0,
            extraDays = 0,
            visible = me.isVisible(),
            newDate = +eDate.clearTime(date, true),
            today = +eDate.clearTime(new Date()),
            min = me.minDate ? eDate.clearTime(me.minDate, true) : Number.NEGATIVE_INFINITY,
            max = me.maxDate ? eDate.clearTime(me.maxDate, true) : Number.POSITIVE_INFINITY,
            ddMatch = me.disabledDatesRE,
            ddText = me.disabledDatesText,
            ddays = me.disabledDays ? me.disabledDays.join('') : false,
            ddaysText = me.disabledDaysText,
            format = me.format,
            days = eDate.getDaysInMonth(date),
            firstOfMonth = eDate.getFirstDateOfMonth(date),
            startingPos = firstOfMonth.getDay() - me.startDay,
            previousMonth = eDate.add(date, eDate.MONTH, -1),
            longDayFormat = me.longDayFormat,
            prevStart,
            current,
            disableToday,
            tempDate,
            setCellClass,
            html,
            cls,
            formatValue,
            value;

        if (startingPos < 0) {
            startingPos += 7;
        }

        days += startingPos;
        prevStart = eDate.getDaysInMonth(previousMonth) - startingPos;
        current = new Date(previousMonth.getFullYear(), previousMonth.getMonth(), prevStart, me.initHour);

        if (me.showToday) {
            tempDate = eDate.clearTime(new Date());
            disableToday = (tempDate < min || tempDate > max ||
                (ddMatch && format && ddMatch.test(eDate.dateFormat(tempDate, format))) ||
                (ddays && ddays.indexOf(tempDate.getDay()) != -1));

            if (!me.disabled) {
                me.todayBtn.setDisabled(disableToday);
                me.todayKeyListener.setDisabled(disableToday);
            }
        }

        setCellClass = function (cell, cls) {

            //console.log(current);//me.minDate,me.maxDate);

            value = +eDate.clearTime(current, true);
            cell.title = eDate.format(current, longDayFormat);
            // store dateValue number as an expando
            cell.firstChild.dateValue = value;
            //console.log(newDate);

            /*
            if(value == newDate) {
            cls += ' ' + me.selectedCls;
            me.fireEvent('highlightitem', me, cell);
            if (visible && me.floating) {
            Ext.fly(cell.firstChild).focus(50);
            }
            }*/

            if (me.markdays && me.markdays.length > 0 && (value >= min && value <= max)) {
                //console.log(current);
                if (Ext.Array.contains(me.markdays, value)) {
                    //console.log('found a date');
                    cls = me.markClsName;
                }
            }


            //console.log(mark,value,mark==value);

            if (value < min) {
                //console.log('value<min',current,me.minDate);
                //console.log('minvalue:',value);
                //console.log(cell);
                cls += ' ' + disabledCls;
                cell.innerHTML = '&nbsp;';
                //cell.style['display']='none';
                cell.title = me.minText;
            }
            else if (value > max) {
                //console.log('value>max',current,me.maxDate);
                cls += ' ' + disabledCls;
                cell.innerHTML = '&nbsp;';
                cell.title = me.maxText;
            }
            else if (ddays && ddays.indexOf(current.getDay()) !== -1) {


                cell.title = ddaysText;
                cls += ' ' + disabledCls;
            }
            else if (ddMatch && format) {
                formatValue = eDate.dateFormat(current, format);

            }
            cell.className = cls + ' ' + me.cellCls;


        };

        for (; i < me.numDays; ++i) {
            if (i < startingPos) {
                html = (++prevStart);
                cls = me.prevCls;
            } else if (i >= days) {
                html = (++extraDays);
                cls = me.nextCls;
            } else {
                html = i - startingPos + 1;
                cls = me.activeCls;
            }
            textNodes[i].innerHTML = html;
            current.setDate(current.getDate() + 1);
            setCellClass(cells[i], cls);
        }

        me.monthBtn.setText(Ext.Date.format(date, me.monthYearFormat));
    },
    listeners: {
        scope: this,
        select: function (picker, date) {

            var me = picker;
            var intDate = +Ext.Date.clearTime(date, true);
            if (Ext.Array.contains(me.markdays, intDate)) {
                //console.log('contains');
                picker.markdays = Ext.Array.remove(me.markdays, intDate);
            } else {
                //picker.markdays.push(intDate);
                Ext.Array.push(me.markdays, intDate);
            }
            me.update(date, true);
            //console.log(me.markdays);
            //picker.updateLayout();
        }
    }
});
/***************************工作日历*********************************/


Ext.define('xf.Common.SGButton', {
    extend: 'Ext.button.Button',
    alias: 'widget.SGButton',
    //是否开启权限
    enableRight: true,
    //按钮权限编码
    //rightCode: 'NONE',
    visible: true,
    //disabled: true,
    getMenuCode: function (me) {
        var spaceId = "";
        var space = this.up('.SGspacecontainerview');
        if (space != null) {
            spaceId = space.getCurrentSpace();
        } else {
            //当采用弹出框win时，默认无法up到标签页，故需要设置win的scope属性。
            var win = this.up('window');
            if (win != null && win.scope != null) {
                space = win.scope.up('.SGspacecontainerview');
                if (space != null) {
                    spaceId = space.getCurrentSpace();
                } else {
                    //网上找两层win，可改进为递归。
                    win = win.scope.up('window');
                    if (win != null && win.scope != null) {
                        space = win.scope.up('.SGspacecontainerview');
                        if (space != null) {
                            spaceId = space.getCurrentSpace();
                        } else {
                            console.log('未取得当前打开的窗体');
                        }
                    }
                    else {
                        throw '未取得当前打开的窗体';
                    }
                }
            }
            else {
                throw '未取得当前打开的窗体';
            }
        }

        return spaceId;
    },
    syncModel: function (me) {
        var menuCode = this.getMenuCode(me);
        if (menuCode == '') {
            return;
        }
        var commuArgs = new serverNS.commuArgs();
        commuArgs.ajaxMethod = ajaxProMethodNS.SyncButtonModel;
        commuArgs.dataArgs.ActionDes = '同步按钮模块';
        commuArgs.dataArgs.AddExtraArg("MenuCode", menuCode);
        //commuArgs.dataArgs.AddExtraArg("ButtonCode", me.rightCode);
        commuArgs.dataArgs.AddExtraArg("ButtonCode", me.text);
        commuArgs.dataArgs.AddExtraArg("ButtonName", me.text);
        commuArgs.callBack = function (data) {
            if (data.Success) {
                console.log("同步按钮模块(" + menuCode + "." + me.text + "." + me.text + ")成功!");
            } else {
                console.log("同步按钮模块(" + menuCode + "." + me.text + "." + me.text + ")失败!");
            }
        }
        serverNS.ajaxProSend(commuArgs);
    },
    initRight: function (me, eOpts) {
        //默认按钮未设置rightCode即有权限
        if (me.text == "NONE" || me.text == "") {
            //me.setDisabled(false);
            me.setVisible(true);
            return;
        }
        var menuCode = this.getMenuCode(me);
        //console.log("menuCode=", menuCode);
        if (menuCode == '') {
            return;
        }
        var curRightCode = menuCode + "." + me.text;
        //调试模式下启用同步按钮模块
        var enableSyncButton = 1;

        console.log("enableSyncButton=", enableSyncButton);
        if (enableSyncButton == 1) {
            this.syncModel(me);
        }

        if (ClientInfo.IsSuperAdmin) {
            //me.setDisabled(false);
            me.setVisible(true);
            return;
        }
        // console.log(serverNS.curUserButtonRights)
        if (serverNS.curUserButtonRights != null) {
            if (Ext.Array.contains(serverNS.curUserButtonRights, curRightCode)) {
                //me.hide();
                //me.setDisabled(false);
                me.setVisible(true);
                //console.log('无权限:' + me.rightCode);
            }
            return;
        } else {
            //TODO:通过查找当前按钮所属菜单。
            var commuArgs = new serverNS.commuArgs();
            commuArgs.dataArgs.Right.RightReaderName = "SG.Eap.Lib.Rule.Business.Right.ButtonModuleRightReader";
            commuArgs.ajaxMethod = ajaxProMethodNS.GetUserButtonRights;
            commuArgs.dataArgs.ActionDes = '获取按钮权限';
            commuArgs.callBack = function (data) {
                if (data.Success) {
                    if (data.RightCodes) {
                        if (Ext.Array.contains(data.RightCodes, curRightCode)) {
                            //me.hide();
                            //me.setDisabled(false);
                            me.setVisible(true);
                            //console.log('无权限:' + me.rightCode);
                        }
                    }
                }
            }
            serverNS.ajaxProSend(commuArgs);
        }
    },
    initComponent: function () {
        Ext.apply(this, {
            listeners: {
                scope: this,
                beforerender: function (me, eOpts) {

                    //判断全局配置是否启用按钮权限
                    var enableButtonRight = 1;
                    //if (serverNS.curGlobalSetting.EnableButtonRight == null) {
                    //    enableButtonRight = 1;
                    //} else {
                    //    enableButtonRight = serverNS.curGlobalSetting.EnableButtonRight;
                    //}
                    if (enableButtonRight == 1) {
                        //默认按钮禁止
                        //me.setDisabled(true);

                        me.setVisible(false);
                        this.initRight(me, eOpts);
                    } else {
                        me.setVisible(true);
                    }
                }
            }
        });
        this.callParent(arguments);
    }
});



function Rpc(option) {
    var rpcOption = {
        url: ajaxProMethodNS.Gets,
        fullname: '',
        desc: '默认AJAX调用',
        entitys: [],
        jsonData: {},
        done: null,
        scope: null
    };

    if (!Ext.isEmpty(option)) {
        rpcOption = Ext.merge(rpcOption, option);
    }

    var commuArgs = new serverNS.commuArgs();
    commuArgs.dataArgs.EntityTypeFullName = rpcOption.fullname;
    commuArgs.ajaxMethod = rpcOption.url;
    commuArgs.dataArgs.ActionDes = rpcOption.desc;
    commuArgs.dataArgs.Entitys = rpcOption.entitys;
    commuArgs.dataArgs.JsonExtraDatas = JSON.stringify(rpcOption.jsonData);
    commuArgs.callBack = function (data) {
        if (data.Success) {
            var fn = rpcOption['done'];
            if (fn) fn.call(this, data);
        } else {
            alert_error(data.Message);
        }
        if (!Ext.isEmpty(rpcOption.scope)) {
            rpcOption.scope.setLoading(false);
        }
    }
    serverNS.ajaxProSend(commuArgs);
    if (!Ext.isEmpty(rpcOption.scope)) {
        rpcOption.scope.setLoading('Loading...');
    }

}


Ext.define("Ext.window.SearchWindow", {
    extend: 'Ext.window.Window',
    width: 500,
    height: 300,
    layout: 'fit',
    title: '查询',
    groupIndex: 4,
    grid: null,
    quickSearch: function () {
        var me = this;
        var form = this.down("form").getForm();
        var fields = form.getFields().items;

        var option = {
            searchArgs: []
        };
        var isOk = true;

        Ext.each(fields, function (field, index) {
            if (!Ext.isEmpty(field.dtype)) {
                var dtype = field.dtype;
                if (dtype == "string") {
                    var fieldValue = me.trim(field.getValue());
                    if (Ext.isEmpty(fieldValue)) return true;
                    var result = me.getStringSearchArgs(field.getName(), fieldValue);

                    if (result instanceof Array) {
                        Ext.each(result, function (item) {
                            option.searchArgs.push(item);
                        });
                    }
                    else {
                        option.searchArgs.push(result);
                    }
                }
                else if (dtype == "date") {
                    var values = form.getValues();
                    var fieldValue = values[field.getName()];
                    console.log(fieldValue);
                    if (Ext.isEmpty(fieldValue)) return true;
                    if (fieldValue.length != 2) {
                        isOk = false;
                        alert_error("日期查询必须要输入起始和结束日期!");
                        return false;
                    }
                    if (Ext.isEmpty(fieldValue[0]) || Ext.isEmpty(fieldValue[1])) {
                        if (Ext.isEmpty(fieldValue[0]) && Ext.isEmpty(fieldValue[1])) {
                            return true;
                        }
                        else {
                            isOk = false;
                            alert_error("日期查询必须要输入起始和结束日期!");
                            return false;
                        }

                    }
                    var result = me.getDateSearchArgs(field.getName(), fieldValue);
                    Ext.each(result, function (item) {
                        option.searchArgs.push(item);
                    });
                }
                else if (dtype == "enum") {
                    var fieldValue = field.getValue();
                    if (Ext.isEmpty(fieldValue)) return true;
                    var result = me.getEnumSearchArgs(field.getName(), fieldValue);
                    option.searchArgs.push(result);
                }

            }
        });
        if (!isOk) return;
        me.groupIndex = 4;
        console.log(option);
        grid.search(option);
        //me.ownerCt.down("sggrid").search(option);
    },
    trim: function (str) {
        return str.replace(/(^\s*)|(\s*$)/g, "").replace(/[\r\n\t]/g, "");
    },
    getStringSearchArgs: function (fieldName, str) {
        str = this.trim(str);
        if (str.indexOf(' ') != -1) { //包含空格
            var array = [];
            var strArray = str.split(' ');
            var searchGroupID = this.groupIndex = ++this.groupIndex;
            Ext.each(strArray, function (item, index) {

                if (Ext.isEmpty(item)) { return true; }

                var searchArgs = new serverNS.searchArgs();
                searchArgs.FieldName = fieldName;
                searchArgs.Values.push(item);
                searchArgs.Operator = serverNS.searchOperator.Like;
                if (index != 0) {
                    searchArgs.RelOperator = serverNS.logicalRelOperator.Or;
                }

                searchArgs.SearchGroupID = searchGroupID;
                array.push(searchArgs);
            });
            return array;
        }
        else {
            var searchArgs = new serverNS.searchArgs();
            searchArgs.FieldName = fieldName;
            searchArgs.Values.push(str);
            searchArgs.Operator = serverNS.searchOperator.Like;
            return searchArgs;
        }
    },
    getDateSearchArgs: function (fieldName, dateArray) {

        var searchGroupID = this.groupIndex = ++this.groupIndex;
        var searchArgs = [];
        var searchArg = new serverNS.searchArgs();
        searchArg.FieldName = fieldName;
        searchArg.Values.push(new Date(dateArray[0]).pattern('yyyy-MM-dd') + ' 00:00:00');
        searchArg.Operator = serverNS.searchOperator.GreaterThanOrEqual;
        searchArg.SearchGroupID = searchGroupID;
        searchArgs.push(searchArg);

        searchArg = new serverNS.searchArgs();
        searchArg.FieldName = fieldName;
        searchArg.Values.push(new Date(dateArray[1]).dateAdd('d', 1).pattern('yyyy-MM-dd') + ' 00:00:00');
        searchArg.Operator = serverNS.searchOperator.LessThan;
        searchArg.SearchGroupID = searchGroupID;
        searchArgs.push(searchArg);
        return searchArgs;
    },
    getEnumSearchArgs: function (fieldName, dataArray) {
        var searchArgs = new serverNS.searchArgs();
        searchArgs.FieldName = fieldName;
        searchArgs.Values = dataArray;
        searchArgs.Operator = serverNS.searchOperator.In;
        return searchArgs;
    },
    buttons: [{
        text: '查询',
        handler: function () {
            var win = this.up("window");
            win.quickSearch();
        }
    }]
});


Ext.define("Ext.form.SearchForm", {
    extend: 'Ext.form.Panel',
    alias: 'widget.searchForm',
    title: '高级查询',
    autoScroll: true,
    collapsible: true,
    region: 'east',
    collapsed: true,
    width: 250,
    defaults: {
        margin: '5 5 0 2',
        xtype: 'textfield',
        labelAlign: 'top',
        columnWidth: .5,
        labelSeparator: '',
        msgTarget: 'side',
        columnWidth: 1
    },
    layout: 'column',
    modelName: '',
    tbar: [{
        text: '重置',
        iconCls: 'SJicon_all btn_refresh',
        handler: function () {
            var me = this.up("searchForm");
            me.getForm().reset();
        }
    }, '-', {
        text: '查询',
        iconCls: 'SJicon_all btn_runquery',
        handler: function () {
            var me = this.up("searchForm");
            me.quickSearch();
        }
    }],
    bbar: [{
        text: '重置',
        iconCls: 'SJicon_all btn_refresh',
        handler: function () {
            var me = this.up("searchForm");
            me.getForm().reset();
        }
    }, '-', {
        text: '查询',
        iconCls: 'SJicon_all btn_runquery',
        handler: function () {
            var me = this.up("searchForm");
            me.quickSearch();
        }
    }],
    groupIndex: 4,
    quickSearch: function () {
        var me = this;
        var form = this.getForm();
        console.log(me);
        var fields = form.getFields().items;

        var option = {
            searchArgs: []
        };
        var isOk = true;

        Ext.each(fields, function (field, index) {
            if (!Ext.isEmpty(field.dtype)) {
                var dtype = field.dtype;
                if (dtype == "string") {
                    var fieldValue = me.trim(field.getValue());
                    if (Ext.isEmpty(fieldValue)) return true;
                    var result = me.getStringSearchArgs(field.getName(), fieldValue);

                    if (result instanceof Array) {
                        Ext.each(result, function (item) {
                            option.searchArgs.push(item);
                        });
                    }
                    else {
                        option.searchArgs.push(result);
                    }
                }
                else if (dtype == "date") {
                    var values = form.getValues();
                    var fieldValue = values[field.getName()];
                    console.log(fieldValue);
                    if (Ext.isEmpty(fieldValue)) return true;
                    if (fieldValue.length != 2) {
                        isOk = false;
                        alert_error("日期查询必须要输入起始和结束日期!");
                        return false;
                    }
                    if (Ext.isEmpty(fieldValue[0]) || Ext.isEmpty(fieldValue[1])) {
                        if (Ext.isEmpty(fieldValue[0]) && Ext.isEmpty(fieldValue[1])) {
                            return true;
                        }
                        else {
                            isOk = false;
                            alert_error("日期查询必须要输入起始和结束日期!");
                            return false;
                        }

                    }
                    var result = me.getDateSearchArgs(field.getName(), fieldValue);
                    Ext.each(result, function (item) {
                        option.searchArgs.push(item);
                    });
                }
                else if (dtype == "enum") {
                    var fieldValue = field.getValue();
                    if (Ext.isEmpty(fieldValue)) return true;
                    var result = me.getEnumSearchArgs(field.getName(), fieldValue);
                    option.searchArgs.push(result);
                }

            }
        });
        if (!isOk) return;
        me.groupIndex = 4;
        console.log(option);
        me.ownerCt.down("sggrid").search(option);
    },
    trim: function (str) {
        return str.replace(/(^\s*)|(\s*$)/g, "").replace(/[\r\n\t]/g, "");
    },
    getStringSearchArgs: function (fieldName, str) {
        str = this.trim(str);
        if (str.indexOf(' ') != -1) { //包含空格
            var array = [];
            var strArray = str.split(' ');
            var searchGroupID = this.groupIndex = ++this.groupIndex;
            Ext.each(strArray, function (item, index) {

                if (Ext.isEmpty(item)) { return true; }

                var searchArgs = new serverNS.searchArgs();
                searchArgs.FieldName = fieldName;
                searchArgs.Values.push(item);
                searchArgs.Operator = serverNS.searchOperator.Like;
                if (index != 0) {
                    searchArgs.RelOperator = serverNS.logicalRelOperator.Or;
                }

                searchArgs.SearchGroupID = searchGroupID;
                array.push(searchArgs);
            });
            return array;
        }
        else {
            var searchArgs = new serverNS.searchArgs();
            searchArgs.FieldName = fieldName;
            searchArgs.Values.push(str);
            searchArgs.Operator = serverNS.searchOperator.Like;
            return searchArgs;
        }
    },
    getDateSearchArgs: function (fieldName, dateArray) {

        var searchGroupID = this.groupIndex = ++this.groupIndex;
        var searchArgs = [];
        var searchArg = new serverNS.searchArgs();
        searchArg.FieldName = fieldName;
        searchArg.Values.push(new Date(dateArray[0]).pattern('yyyy-MM-dd') + ' 00:00:00');
        searchArg.Operator = serverNS.searchOperator.GreaterThanOrEqual;
        searchArg.SearchGroupID = searchGroupID;
        searchArgs.push(searchArg);

        searchArg = new serverNS.searchArgs();
        searchArg.FieldName = fieldName;
        searchArg.Values.push(new Date(dateArray[1]).dateAdd('d', 1).pattern('yyyy-MM-dd') + ' 00:00:00');
        searchArg.Operator = serverNS.searchOperator.LessThan;
        searchArg.SearchGroupID = searchGroupID;
        searchArgs.push(searchArg);
        return searchArgs;
    },
    getEnumSearchArgs: function (fieldName, dataArray) {
        var searchArgs = new serverNS.searchArgs();
        searchArgs.FieldName = fieldName;
        searchArgs.Values = dataArray;
        searchArgs.Operator = serverNS.searchOperator.In;
        return searchArgs;
    },
    addFields: function () {
        if (!this.modelName) {
            console.log("没有为高级查询配置有效的modelName!");
            return;
        }
        var model = Ext.create(this.modelName);
        if (!model) {
            console.log("没有为高级查询配置有效的modelName!");
            return;
        }

        this.items = [];
        var items = [];

        var fields = model.fields.items;
        for (var i = 0; i < fields.length; i++) {
            var field = fields[i];
            if (!field.dtype || !field.text) {
                continue;
            }  //没配置text或type 则不加入高级搜索
            else {
                switch (field.dtype) {
                    case "string":
                        items.push({
                            xtype: 'textfield',
                            fieldLabel: field.text,
                            name: field.name,
                            dtype: 'string'
                        });
                        break;
                    case "date":
                        items.push({
                            xtype: 'datefield',
                            fieldLabel: field.text + '(开始)',
                            name: field.name
                        });
                        items.push({
                            xtype: 'datefield',
                            fieldLabel: field.text + '(结束)',
                            name: field.name,
                            dtype: 'date'
                        });

                        break;
                    case "enum":
                        items.push({
                            xtype: 'combo',
                            fieldLabel: field.text,
                            store: field.store,
                            displayField: 'name',
                            valueField: 'value',
                            dtype: 'enum',
                            name: field.name,
                            multiSelect: true
                        });
                        break;
                }
            }
        }
        Ext.apply(this, {
            items: items
        });
    },
    initComponent: function () {
        var me = this;

        me.addFields();

        me.callParent(arguments);
    }

});

Ext.define("Ext.form.SearchFormCustom", {
    extend: 'Ext.form.Panel',
    alias: 'widget.searchFormCustom',
    autoScroll: true,
    collapsible: true,
    region: 'north',
    collapsed: false,
    defaults: {
        margin: '5 5 0 2',
        xtype: 'textfield',
        labelAlign: 'top',
        columnWidth: .5,
        labelSeparator: '',
        msgTarget: 'side',
        columnWidth: 0.15
    },
    layout: 'column',
    modelName: '',
    tbar: [{
        text: '重置',
        iconCls: 'SJicon_all btn_refresh',
        handler: function () {
            var me = this.up("searchFormCustom");
            me.getForm().reset();
        }
    }, '-', {
        text: '查询',
        iconCls: 'SJicon_all btn_runquery',
        handler: function () {
            var me = this.up("searchFormCustom");
            me.quickSearch();
        }
    }],
    bbar: [{
        text: '重置',
        iconCls: 'SJicon_all btn_refresh',
        handler: function () {
            var me = this.up("searchFormCustom");
            me.getForm().reset();
        }
    }, '-', {
        text: '查询',
        iconCls: 'SJicon_all btn_runquery',
        handler: function () {
            var me = this.up("searchFormCustom");
            me.quickSearch();
        }
    }],
    groupIndex: 4,
    quickSearch: function () {
        var me = this;
        var form = this.getForm();
        console.log(me);
        var fields = form.getFields().items;

        var option = {
            searchArgs: []
        };
        var isOk = true;

        Ext.each(fields, function (field, index) {
            if (!Ext.isEmpty(field.dtype)) {
                var dtype = field.dtype;
                if (dtype == "string") {
                    var fieldValue = me.trim(field.getValue());
                    if (Ext.isEmpty(fieldValue)) return true;
                    var result = me.getStringSearchArgs(field.getName(), fieldValue);

                    if (result instanceof Array) {
                        Ext.each(result, function (item) {
                            option.searchArgs.push(item);
                        });
                    }
                    else {
                        option.searchArgs.push(result);
                    }
                }
                else if (dtype == "date") {
                    var values = form.getValues();
                    var fieldValue = values[field.getName()];
                    console.log(fieldValue);
                    if (Ext.isEmpty(fieldValue)) return true;
                    if (fieldValue.length != 2) {
                        isOk = false;
                        alert_error("日期查询必须要输入起始和结束日期!");
                        return false;
                    }
                    if (Ext.isEmpty(fieldValue[0]) || Ext.isEmpty(fieldValue[1])) {
                        if (Ext.isEmpty(fieldValue[0]) && Ext.isEmpty(fieldValue[1])) {
                            return true;
                        }
                        else {
                            isOk = false;
                            alert_error("日期查询必须要输入起始和结束日期!");
                            return false;
                        }

                    }
                    var result = me.getDateSearchArgs(field.getName(), fieldValue);
                    Ext.each(result, function (item) {
                        option.searchArgs.push(item);
                    });
                }
                else if (dtype == "enum") {
                    var fieldValue = field.getValue();
                    if (Ext.isEmpty(fieldValue)) return true;
                    var result = me.getEnumSearchArgs(field.getName(), fieldValue);
                    option.searchArgs.push(result);
                }

            }
        });
        if (!isOk) return;
        me.groupIndex = 4;
        console.log(option);
        me.ownerCt.down("sggrid").search(option);
    },
    trim: function (str) {
        return str.replace(/(^\s*)|(\s*$)/g, "").replace(/[\r\n\t]/g, "");
    },
    getStringSearchArgs: function (fieldName, str) {
        str = this.trim(str);
        if (str.indexOf(' ') != -1) { //包含空格
            var array = [];
            var strArray = str.split(' ');
            var searchGroupID = this.groupIndex = ++this.groupIndex;
            Ext.each(strArray, function (item, index) {

                if (Ext.isEmpty(item)) { return true; }

                var searchArgs = new serverNS.searchArgs();
                searchArgs.FieldName = fieldName;
                searchArgs.Values.push(item);
                searchArgs.Operator = serverNS.searchOperator.Like;
                if (index != 0) {
                    searchArgs.RelOperator = serverNS.logicalRelOperator.Or;
                }

                searchArgs.SearchGroupID = searchGroupID;
                array.push(searchArgs);
            });
            return array;
        }
        else {
            var searchArgs = new serverNS.searchArgs();
            searchArgs.FieldName = fieldName;
            searchArgs.Values.push(str);
            searchArgs.Operator = serverNS.searchOperator.Like;
            return searchArgs;
        }
    },
    getDateSearchArgs: function (fieldName, dateArray) {

        var searchGroupID = this.groupIndex = ++this.groupIndex;
        var searchArgs = [];
        var searchArg = new serverNS.searchArgs();
        searchArg.FieldName = fieldName;
        searchArg.Values.push(new Date(dateArray[0]).pattern('yyyy-MM-dd') + ' 00:00:00');
        searchArg.Operator = serverNS.searchOperator.GreaterThanOrEqual;
        searchArg.SearchGroupID = searchGroupID;
        searchArgs.push(searchArg);

        searchArg = new serverNS.searchArgs();
        searchArg.FieldName = fieldName;
        searchArg.Values.push(new Date(dateArray[1]).dateAdd('d', 1).pattern('yyyy-MM-dd') + ' 00:00:00');
        searchArg.Operator = serverNS.searchOperator.LessThan;
        searchArg.SearchGroupID = searchGroupID;
        searchArgs.push(searchArg);
        return searchArgs;
    },
    getEnumSearchArgs: function (fieldName, dataArray) {
        var searchArgs = new serverNS.searchArgs();
        searchArgs.FieldName = fieldName;
        searchArgs.Values = dataArray;
        searchArgs.Operator = serverNS.searchOperator.In;
        return searchArgs;
    },
    //需要的字段名  
    fieldNames: [],
    addFields: function () {
        if (!this.modelName) {
            console.log("没有为高级查询配置有效的modelName!");
            return;
        }
        var model = Ext.create(this.modelName);
        if (!model) {
            console.log("没有为高级查询配置有效的modelName!");
            return;
        }

        this.items = [];
        var items = [];

        var fields = model.fields.items;
        for (var i = 0; i < fields.length; i++) {
            var field = fields[i];

            if (this.fieldNames.indexOf(field.name) == -1) {
                continue;
            }

            if (!field.dtype || !field.text) {
                continue;
            }  //没配置text或type 则不加入高级搜索
            else {
                switch (field.dtype) {
                    case "string":
                        items.push({
                            xtype: 'textfield',
                            fieldLabel: field.text,
                            name: field.name,
                            dtype: 'string'
                        });
                        break;
                    case "date":
                        items.push({
                            xtype: 'datefield',
                            fieldLabel: field.text + '(开始)',
                            name: field.name
                        });
                        items.push({
                            xtype: 'datefield',
                            fieldLabel: field.text + '(结束)',
                            name: field.name,
                            dtype: 'date'
                        });

                        break;
                    case "enum":
                        items.push({
                            xtype: 'combo',
                            fieldLabel: field.text,
                            store: field.store,
                            displayField: 'name',
                            valueField: 'value',
                            dtype: 'enum',
                            name: field.name,
                            multiSelect: true
                        });
                        break;
                }
            }
        }
        Ext.apply(this, {
            items: items
        });
    },
    initComponent: function () {
        var me = this;

        me.addFields();

        me.callParent(arguments);
    }

});


Ext.ux.MonthPickerPlugin = function () {
    var picker;
    var oldDateDefaults;

    this.init = function (pk) {
        picker = pk;
        picker.onTriggerClick = picker.onTriggerClick.createSequence(onClick);
        picker.getValue = picker.getValue.createInterceptor(setDefaultMonthDay).createSequence(restoreDefaultMonthDay);
        picker.beforeBlur = picker.beforeBlur.createInterceptor(setDefaultMonthDay).createSequence(restoreDefaultMonthDay);
    };

    function setDefaultMonthDay() {
        oldDateDefaults = Date.defaults.d;
        Date.defaults.d = 1;
        return true;
    }

    function restoreDefaultMonthDay(ret) {
        Date.defaults.d = oldDateDefaults;
        return ret;
    }

    function onClick(e, el, opt) {
        var p = picker.menu.picker;
        p.activeDate = p.activeDate.getFirstDateOfMonth();
        if (p.value) {
            p.value = p.value.getFirstDateOfMonth();
        }

        p.showMonthPicker();

        if (!p.disabled) {
            p.monthPicker.stopFx();
            p.monthPicker.show();

            p.mun(p.monthPicker, 'click', p.onMonthClick, p);
            p.mun(p.monthPicker, 'dblclick', p.onMonthDblClick, p);
            p.onMonthClick = p.onMonthClick.createSequence(pickerClick);
            p.onMonthDblClick = p.onMonthDblClick.createSequence(pickerDblclick);
            p.mon(p.monthPicker, 'click', p.onMonthClick, p);
            p.mon(p.monthPicker, 'dblclick', p.onMonthDblClick, p);
        }
    }

    function pickerClick(e, t) {
        var el = new Ext.Element(t);
        if (el.is('button.x-date-mp-cancel')) {
            picker.menu.hide();
        } else if (el.is('button.x-date-mp-ok')) {
            var p = picker.menu.picker;
            p.setValue(p.activeDate);
            p.fireEvent('select', p, p.value);
        }
    }

    function pickerDblclick(e, t) {
        var el = new Ext.Element(t);
        if (el.parent()
            && (el.parent().is('td.x-date-mp-month')
                || el.parent().is('td.x-date-mp-year'))) {

            var p = picker.menu.picker;
            p.setValue(p.activeDate);
            p.fireEvent('select', p, p.value);
        }
    }
};

//Ext.preg('monthPickerPlugin', Ext.ux.MonthPickerPlugin);

Ext.define('Ext.form.field.Month', {
    extend: 'Ext.form.field.Date',
    alias: 'widget.monthfield',
    requires: ['Ext.picker.Month'],

    alternateClassName: ['Ext.form.MonthField', 'Ext.form.Month'],
    selectMonth: null,
    createPicker: function () {
        var me = this,
            format = Ext.String.format;
        return Ext.create('Ext.picker.Month', {
            pickerField: me,
            ownerCt: me.ownerCt,
            renderTo: document.body,
            floating: true,
            hidden: true,
            style: {
                height: '200px'
            },
            focusOnShow: true,
            minDate: me.minValue,
            maxDate: me.maxValue,
            disabledDatesRE: me.disabledDatesRE,
            disabledDatesText: me.disabledDatesText,
            disabledDays: me.disabledDays,
            disabledDaysText: me.disabledDaysText,
            format: me.format,
            showToday: me.showToday,
            startDay: me.startDay,
            minText: format(me.minText, me.formatDate(me.minValue)),
            maxText: format(me.maxText, me.formatDate(me.maxValue)),
            listeners: {
                select: {
                    scope: me,
                    fn: me.onSelect
                },
                monthdblclick: {
                    scope: me,
                    fn: me.onOKClick
                },
                yeardblclick: {
                    scope: me,
                    fn: me.onOKClick
                },
                OkClick: {
                    scope: me,
                    fn: me.onOKClick
                },
                CancelClick: {
                    scope: me,
                    fn: me.onCancelClick
                }
            },
            keyNavConfig: {
                esc: function () {
                    me.collapse();
                }
            }
        });
    },
    onCancelClick: function () {
        var me = this;
        me.selectMonth = null;
        me.collapse();
    },
    onOKClick: function () {
        var me = this;
        if (me.selectMonth) {
            me.setValue(me.selectMonth);
            me.fireEvent('select', me, me.selectMonth);
        }
        me.collapse();
    },
    onSelect: function (m, d) {
        var me = this;
        me.selectMonth = new Date((d[0] + 1) + '/1/' + d[1]);
    }
});






