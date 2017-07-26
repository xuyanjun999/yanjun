/*! ext-app.js based on ExtJs 4.2.0 | (c) 2006, 2026 SEUNGEE, Inc. | SEUNGEE.COM/license
//@
//@
//@
*/

//服务通讯的命名空间
var serverNS = {
    //当前登录用户
    curUserInfo: null,
    curGlobalSetting: null,
    convertToSerDT: function (date) {
        if (typeof date == 'string')
            return date;
        return date.pattern('yyyy-MM-dd HH:mm:ss.S');
        //        return
    },

    //设置可以使用ajaxPro通讯的dll模块集合DeletePO
    ajaxProBlls: {
        libPageBll: 'SG.Eap.Lib.Rule.Page.ashx',
        appPageBll: 'SG.Eap.App.ashx'
    },

    //排序方式
    sortOrder: {
        Asc: 0,
        Desc: 1
    },

    //搜索操作符
    searchOperator: {
        LessThan: 1, //小于
        LessThanOrEqual: 2, //小于或等于
        GreaterThan: 3, //大于
        GreaterThanOrEqual: 4, //大于或等于
        Equal: 5, //等于
        Like: 6, //类似..
        In: 7, //在...范围区间
        NotIn: 8, //不在...范围区间
        NotEqual: 9//不等于
    },

    //逻辑关系枚举
    logicalRelOperator: {
        And: 1,
        Or: 2,
        Not: 3
    },

    //排序器
    sorter: function () {
        this.SortField = '';
        //值为serverNS.sortOrder
        this.SortOrder = serverNS.sortOrder.Asc;
    },

    //分页参数
    pageArgs: function () {
        this.PageIndex = 1;
        this.PageSize = -1;
    },

    //查询参数
    searchArgs: function () {
        //需要配的字段名
        this.FieldName = '';
        //需要配的右字段名
        this.RightFieldName = '';
        //查询匹配值
        this.Values = new Array();
        //操作符  serverNS.searchOperator
        this.Operator = serverNS.searchOperator.Equal;
        //逻辑操作符 serverNS.logicalRelOperator
        this.RelOperator = serverNS.logicalRelOperator.And;
        //搜索组  ID默认0 分组查询用 js端必须小于10 条件查询：1,日期查询组合：2
        this.SearchGroupID = 0;
    },

    //获得日期查询 比如 2013-12-15  变成  大于等于2013-12-15 00:00:00 ,小于2013-12-16 00:00:00 组合条件
    getDateSearchArgsGroup: function (field, date) {
        date = Ext.clone(date);
        var searchArgsEs = [];

        var searchArg = new serverNS.searchArgs();
        searchArg.FieldName = field;
        searchArg.Values.push(date.pattern('yyyy-MM-dd') + ' 00:00:00');
        searchArg.Operator = serverNS.searchOperator.GreaterThanOrEqual;
        searchArg.SearchGroupID = 2;
        searchArgsEs.push(searchArg);

        searchArg = new serverNS.searchArgs();
        searchArg.FieldName = field;
        searchArg.Values.push(date.dateAdd('d', 1).pattern('yyyy-MM-dd') + ' 00:00:00');
        searchArg.Operator = serverNS.searchOperator.LessThan;
        searchArg.SearchGroupID = 2;
        searchArgsEs.push(searchArg);

        return searchArgsEs;
    },

    //树结构参数
    treeNodeArgs: function () {
        //指定请求的节点是不是叶节点，为false指由后台自动判断
        this.Leaf = false;
        //所请求节点图标样式名称
        this.IconResource = '';
        //查询树模型的全名
        this.QueryModelFullName = '';
        //查询树模型的查询关键字
        this.QueryKeywords = '';
        // 查询起始时间
        this.FromDate = null;
        // 查询结束时间
        this.ToDate = null;
        //父节点ID
        this.QueryParenID = null;
        //父节点数据实体类型
        this.QueryParentNodeType = '';
    },

    //导出文件类型
    exportFileType: {
        //Excel2003
        Xls: 1,
        //Csv数据文件
        Csv: 10
    },
    //导出列参数对象
    exportColArg: function () {
        //导出列真实名称
        this.Name = '';
        // 导出列显示文本
        this.Text = '';
        //导出顺序
        this.ExportIndex = 0;
    },

    //导出参数
    exportArg: function () {
        //导出文件类型  枚举exportFileType值
        this.ExportFileType = serverNS.exportFileType.Xls;
        //导出文件名
        this.ExportFileName = '';
        //exportColArg 的数组数据
        this.ExportCols = [];
    },

    //查询参数类
    queryArgs: function () {
        //排序器集合 值为serverNS.sorter
        this.Sorters = new Array();
        //分类数据 值为serverNS.pageArgs
        this.Page = new serverNS.pageArgs();
        //搜索参数 值为serverNS.searchArgs
        this.Searchs = new Array();
        //组合查询包含的关联实例路径
        this.IncludeEntityPaths = new Array();
        //树节点参数serverNS.treeNodeArgs
        this.TreeNode = new serverNS.treeNodeArgs();
        //导出参数  exportArg对象
        this.Export = null;
    },

    // 添加动作的参数
    addArgs: function () {
        // 返回新添加的实体 默认不返回
        this.ReturnNewEntitys = false;
    },

    //权限参数
    rightArgs: function () {
        //权限读取器名称
        this.RightReaderName = '';
        //使用权限 默认true
        this.UseRight = true;
    },

    //额外的Entity查询动作参数 查询的结果Entitys将合并到结果Entitys中
    extraEntityQueryArgs: function () {
        //继承serverNS.queryArgs 组合语法
        this.query = serverNS.queryArgs;
        this.query();
        delete this.query;

        //额外的实例数据类型全称
        this.EntityTypeFullName = 'SG.Eap.Lib.Rule.Entity.BaseEntity';
    },

    //删除参数类
    deleteArgs: function () {

    },

    //通讯中实际数据参数 属性必须用pascal命名方式，与服务端对象映射
    dataArgs: function () {
        //操作动作名称
        this.ActionDes = '未知操作';
        // 是否记录此动作操作
        this.LogAction = true;
        //操作实例数据集
        this.Entitys = new Array();
        //实例数据类型全称
        this.EntityTypeFullName = 'SG.Eap.Lib.Rule.Entity.BaseEntity';
        //查询动作参数
        this.Query = new serverNS.queryArgs();
        //serverNS.extraEntityQueryArgs数组
        this.ExtraEntityQuerys = [];
        //增删改时 后台是否触发验证 默认触发
        this.NeedValidate = true;
        //添加动作的参数
        this.Add = new serverNS.addArgs();
        //删除动作参数
        this.Delete = new serverNS.deleteArgs();
        //权限参数
        this.Right = new serverNS.rightArgs();

        //额外参数数据 【使用字典对象后台无法转换  以后解决
        //额外参数数据对实际对象
        this.JsonExtraDatas = '';
        var extraDatas = {};
        //额外参数数据函数
        this.AddExtraArg = function (key, value) {
            extraDatas[key] = value;
            this.JsonExtraDatas = JSON.stringify(extraDatas);
        }
    },

    //私有变量 包装通讯参数数据直接用于发射 data可以为json字符串
    packDataArgs: function (data, argName) {
        try {
            if (!argName) {
                argName = 'args';
            }
            if (typeof data == 'object') {
                return '{"' + argName + '":' + JSON.stringify(data) + '}';
            } else {
                return '{"' + argName + '":' + data + '}';
            }
        } catch (err) {
            throw '包装通讯的发送数据时出错：' + err;
        }
    },

    //私有变量 包装通讯参数数据直接用于发射 data可以为json字符串
    packDataArgsN: function (data, argName) {
        try {
            return JSON.stringify(data);
        } catch (err) {
            throw '包装通讯的发送数据时出错：' + err;
        }
    },

    //通讯参数
    commuArgs: function () {
        //是否可以调用reset重置参数
        this.canReset = true;
        //重置commuArgs参数数据
        this.reset = function () {
            if (!this.canReset)
                return;
            //通讯使用的通讯模块 默认libPageBll
            this.ajaxProBll = serverNS.ajaxProBlls.libPageBll;
            this.ajaxMethod = ajaxProMethodNS.Gets;
            //通讯数据参数
            this.dataArgs = new serverNS.dataArgs();
            //服务器返回后的执行的回调函数 data：回调数据对象参数
            this.callBack = function (data) {
            };
            //自定义json的转化器   因为jQuery.parseJSON无法转化ajaxpro的时间对象所以提供解析重载
            if (typeof (Ext) == 'undefined') {
                this.respjsonconverter = function (json) {
                    return eval('(' + json + ')');
                };
            } else {
                this.respjsonconverter = Ext.decode;
            }
        }
        ///深度拷贝通讯类
        this.deepCopy = function () {
            return deepCopy(this);
        };
        this.reset();
    },

    //Jquery和ext 兼容发送ajax通讯 参数为commuArgs对象
    ajaxProSend: function (refcommuArgs, method, onlyData) {
        if (typeof (Ext) == "object") {
            this.extAjaxProSend(refcommuArgs, method, onlyData);
        } else {
            this.$ajaxProSend(refcommuArgs);
        }
    },

    //ext  发送ajax通讯 参数为commuArgs对象
    extAjaxProSend: function (refcommuArgs, method, onlyData) {
        //Ext.decode(Ext.encode(refcommuArgs ));
        var commuArgs = refcommuArgs.deepCopy();
        //重置通讯参数
        refcommuArgs.reset();
        if (commuArgs.ajaxMethod == 'undefined' || commuArgs.ajaxMethod == '') {
            throw '没有设置异步通讯方式:ajaxMethod.';
        };

        //full_ns = WEB_APP_NS_NAME + '.' + full_ns;
        var url = commuArgs.ajaxMethod;

        var headerParams = {};
        headerParams['Content-Type'] = 'application/json';
        //headerParams[AJAXPRO_METHOD_HEADER_NAME] = method_name;
        if (!method) method = "POST";

        var data = serverNS.packDataArgs(commuArgs.dataArgs);
        if (onlyData)
            data = serverNS.packDataArgsN(commuArgs.dataArgs.Entitys[0]);

        Ext.Ajax.request({
            method: method,
            url: url,
            timeout: AJAX_TIMEOUT,
            disableCaching: true,
            headers: headerParams,
            jsonData: data,
            success: function (response, reqOption) {
                try {
                    var data = Ext.decode(response.responseText);
                    if (!data) {
                        console.log(data);
                        throw '服务端返回数据错误.';
                    }
                    if (commuArgs.callBack) {
                        serverNS.packRespData(data);
                    }
                    try {
                        commuArgs.callBack(data);
                    } catch (e) {
                        console.log('获取服务器信息后，回调处理异常:' + e);
                    }

                } catch (e) {
                    console.log("解析获得服务器数据格式错误:" + e);
                    serverNS.isLogin();
                }
            },
            failure: function (response, reqOption) {
                console.log(response);
                var data = {};
                data.Success = false;
                data.Message = response.responseText;
                if (response.status == 403) {
                    Ext.Msg.show({
                        title: "消息",
                        msg: '登录状态失效,请重新登录!',
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                }
                else {
                    if (commuArgs.callBack) {
                        commuArgs.callBack(data);
                    }
                    console.log(data.Message);
                }


            }
        });
    },

    //Jquery 发送ajax通讯 参数为commuArgs对象
    $ajaxProSend: function (refcommuArgs) {
        var commuArgs = refcommuArgs.deepCopy();
        //重置通讯参数
        refcommuArgs.reset();
        if (commuArgs.ajaxMethod == 'undefined' || commuArgs.ajaxMethod == '') {
            throw '没有设置异步通讯方式:ajaxMethod.';
        };
        var ns = commuArgs.ajaxMethod.split('.');
        var method_name = ns[ns.length - 1];
        var full_ns = commuArgs.ajaxMethod.replace('.' + method_name, '');
        //full_ns = WEB_APP_NS_NAME + '.' + full_ns;
        var url = '/ajaxpro/' + full_ns + ',' + commuArgs.ajaxProBll;
        $.ajax({
            type: "POST",
            url: url,
            timeout: AJAX_TIMEOUT,
            cache: false,
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader(AJAXPRO_METHOD_HEADER_NAME, method_name);
                XMLHttpRequest.setRequestHeader("Content-Type", "application/json");
            },
            data: serverNS.packDataArgs(commuArgs.dataArgs),
            dataType: 'json',
            converters: {
                "text json": commuArgs.respjsonconverter
            },
            success: function (data) {
                try {
                    if (!data.value) {
                        console.log(data);
                        throw '服务端返回数据错误.';
                    }
                    if (commuArgs.callBack) {
                        serverNS.packRespData(data.value);
                        try {
                            commuArgs.callBack(data.value);
                        } catch (e) {
                            console.log('获取服务器信息后，回调处理异常:' + e);
                        }
                    }
                } catch (e) {
                    console.log("解析获得服务器数据格式错误:" + e);
                    if (!isDebug && commuArgs.ajaxMethod != ajaxProMethodNS.IsLogin && commuArgs.ajaxMethod != ajaxProMethodNS.Login) {
                        serverNS.isLogin();
                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                var data = {};
                data.Success = false;
                data.Message = textStatus + ' ' + errorThrown;
                if (commuArgs.callBack) {
                    commuArgs.callBack(data);
                }
                console.log(data.Message);
            }
        });
    },

    //包装服务器返回数据  CommonJsonReturn 为服务端返回数据类
    packRespData: function (commonJsonReturn) {
        try {
            if (!Ext.isEmpty(commonJsonReturn.Entitys)) {
                Ext.each(commonJsonReturn.Entitys, function (item, index) {
                    item = serverNS.packRespDataN(item);
                    commonJsonReturn.Entitys[index] = item;
                });

            }
            return commonJsonReturn;
        } catch (e) {
            throw '包装服务器返回额外数据异常:' + e
        }
    },

    packRespDataN: function (obj, namespace, newObj = {}) {
        for (var k in obj) {
            var thisNamespace = namespace ? `${namespace}.${k}` : k;
            if (typeof obj[k] == 'object') {
                serverNS.packRespDataN(obj[k], thisNamespace, newObj)
            } else {
                newObj[thisNamespace] = obj[k];
            }
        };
        return newObj;
    },

    //把一个对象的属性和值扩展另外对象的属性 sObj扩展的模板对象,可以为json字符串，tObj待扩展的目标对象
    extendObjAttr: function (sObj, tObj) {
        if (typeof tObj != 'object')
            return;
        if (typeof sObj == 'string') {
            if (sObj == '[]') {
                sObj = new Array();
            } else {
                sObj = eval('(' + sObj + ')');
            }
        }
        for (var attrName in sObj) {
            if (typeof attrName != 'string') {
                continue;
            }
            tObj[attrName] = sObj[attrName];
        }
    },

    //检查是否登录 如果未登录就导航到登录界面 否则导航到主页面
    isLogin: function () {
        Ext.Ajax.request({
            method: 'get',
            url: '/Staff/IsLogin',
            success: function (response, opts) {
                var obj = Ext.decode(response.responseText);
                if (!obj.Success) {
                    location.href = "/Home/Login";
                }
            },
            failure: function (response, opts) {
                Ext.Msg.show({
                    title: '消息',
                    msg: '服务器返回异常,请检查服务器是否正常!',
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.ERROR
                });
            }
        });
    },

    //退出登录 needConfirm 是否需要用户手动确认
    logout: function (needConfirm) {

        var logoutFunc = function () {

            var commuArgs = new serverNS.commuArgs();

            var dataArgs = commuArgs.dataArgs;
            dataArgs.ActionDes = "退出登录";

            commuArgs.ajaxMethod = ajaxProMethodNS.Logout;
            commuArgs.callBack = function (data) {
                try {
                    if (data.Success) {
                        location.href = LOGIN_PAGE_LOCATION;
                        return;
                    }
                    throw data.Message;
                } catch (e) {
                    console.log('异常:' + e);
                }
            };
            serverNS.ajaxProSend(commuArgs);

        };

        if (needConfirm) {
            alert_confirm(gettext('是否确定退出系统?'), function (rtn) {
                if (rtn == 'yes') {
                    logoutFunc();
                }
            });
        } else {
            logoutFunc();
        }
    },

    //获得下拉框静态数据store 参数：comboStaticData枚举
    getComboStaticStore: function (comboStaticData) {
        var data = [];
        for (var i = 0; i < comboStaticData.length; i++) {
            var item = {};
            item.name = comboStaticData[i][0];
            item.value = comboStaticData[i][1];
            data.push(item);
        }

        return Ext.create('Ext.data.Store', {
            fields: ['name', 'value'],
            isStatic: true,
            data: data
        });
    },
    //工单生成状态
    getWOStatus: function (index, text) {
        if (text == null || text.length == 0) return '<span style="color:red;">未生成</span>';
        //console.log(text);
        var result = text.split(',');
        if (result[index] == 0)
            return '<span style="color:red;">未生成</span>';
        if (result[index] == 1)
            return '<span style="color:blue;">部分生成</span>';
        if (result[index] == 2)
            return '<span style="color:green;">已生成</span>';

        return '未生成';

    },
    //获取静态枚举的值
    getComboStaticValue: function (comboStaticData, value, record) {
        var record = this.getComboStaticStore(comboStaticData).findRecord('value', value);
        //  console.log(comboStaticData);
        if (record != null && record.raw != null) {
            return record.raw.name;
        }
        return "<系统未定义>";
    },

    //字典表Store通用缓存
    dicStoreCache: [],
    //异步通用获取字典表下拉框的store
    asycCommonGetDicStore: function (setStoreCallBack, dicKeyType, parentID) {
        for (var i = 0; i < serverNS.dicStoreCache.length; i++) {
            if (serverNS.dicStoreCache[i].dicType == dicKeyType && serverNS.dicStoreCache[i].parentID == parentID) {
                setStoreCallBack(serverNS.dicStoreCache[i].store);
                return;
            }
        }
        var func = function (rawdata) {
            var data = [];
            for (var i = 0; i < rawdata.Entitys.length; i++) {
                var entity = rawdata.Entitys[i];
                var item = {};
                item['name'] = entity.CnKeyValue;
                item['value'] = entity.ID;
                data.push(item);
            }
            if (Ext.isEmpty(data))
                return;
            var store = Ext.create('Ext.data.Store', {
                fields: ['name', 'value'],
                data: data
            });
            //添加缓存
            serverNS.dicStoreCache.push({
                dicType: dicKeyType,
                parentID: parentID,
                store: store
            });
            setStoreCallBack(store);
        };

        //发送请求
        var commuArgs = new serverNS.commuArgs();

        var dataArgs = commuArgs.dataArgs;
        dataArgs.ActionDes = "获取类型为" + dicKeyType + "所有字典项";
        dataArgs.EntityTypeFullName = serverEntityTypeNS.GlobalConfig;

        var searchArgs = new serverNS.searchArgs();
        searchArgs.FieldName = "KeyType";
        searchArgs.Values.push(dicKeyType);
        dataArgs.Query.Searchs.push(searchArgs);

        searchArgs = new serverNS.searchArgs();
        searchArgs.FieldName = "ParentID";
        searchArgs.Values.push(parentID);
        dataArgs.Query.Searchs.push(searchArgs);

        commuArgs.callBack = func;
        serverNS.ajaxProSend(commuArgs);
    },

    //字典表(字典类型)Store通用缓存
    dicKeyTypeStoreCache: [],
    //异步通用获取字典表下拉框的store
    asycCommonGetDicKeyTypeStore: function (setStoreCallBack, dicKeyType, parentID) {
        for (var i = 0; i < serverNS.dicKeyTypeStoreCache.length; i++) {
            if (serverNS.dicKeyTypeStoreCache[i].dicType == dicKeyType && serverNS.dicKeyTypeStoreCache[i].parentID == parentID) {
                setStoreCallBack(serverNS.dicKeyTypeStoreCache[i].store);
                return;
            }
        }
        var func = function (rawdata) {
            var data = [];
            for (var i = 0; i < rawdata.Entitys.length; i++) {
                var entity = rawdata.Entitys[i];
                var item = {};
                item['name'] = entity.CnKeyValue;
                item['value'] = entity.KeyType;
                data.push(item);
            }
            if (Ext.isEmpty(data))
                return;
            var store = Ext.create('Ext.data.Store', {
                fields: ['name', 'value'],
                data: data
            });
            //添加缓存
            serverNS.dicKeyTypeStoreCache.push({
                dicType: dicKeyType,
                parentID: parentID,
                store: store
            });
            setStoreCallBack(store);
        };

        //发送请求
        var commuArgs = new serverNS.commuArgs();
        var dataArgs = commuArgs.dataArgs;
        dataArgs.ActionDes = "获取类型为" + dicKeyType + "所有字典项";
        dataArgs.EntityTypeFullName = serverEntityTypeNS.GlobalConfig;
        commuArgs.callBack = func;
        serverNS.ajaxProSend(commuArgs);
    },
    asycCommonGetDicKeyTypeStores: function (setStoreCallBack, dicKeyType, parentID) {
        for (var i = 0; i < serverNS.dicKeyTypeStoreCache.length; i++) {
            if (serverNS.dicKeyTypeStoreCache[i].dicType == dicKeyType && serverNS.dicKeyTypeStoreCache[i].parentID == parentID) {
                setStoreCallBack(serverNS.dicKeyTypeStoreCache[i].store);
                return;
            }
        }
        var func = function (rawdata) {
            var data = [];
            for (var i = 0; i < rawdata.Entitys.length; i++) {
                var entity = rawdata.Entitys[i];
                var item = {};
                item['name'] = entity.CnKeyValue;
                item['value'] = entity.CnKeyValue;
                data.push(item);
            }
            if (Ext.isEmpty(data))
                return;
            var store = Ext.create('Ext.data.Store', {
                fields: ['name', 'value'],
                data: data
            });
            //添加缓存
            serverNS.dicKeyTypeStoreCache.push({
                dicType: dicKeyType,
                parentID: parentID,
                store: store
            });
            setStoreCallBack(store);
        };

        //发送请求
        var commuArgs = new serverNS.commuArgs();
        var dataArgs = commuArgs.dataArgs;
        dataArgs.ActionDes = "获取类型为" + dicKeyType + "所有字典项";
        dataArgs.EntityTypeFullName = serverEntityTypeNS.GlobalConfig;
        var searchArgs = new serverNS.searchArgs();
        searchArgs.FieldName = "KeyType";
        searchArgs.Values.push(dicKeyType);
        dataArgs.Query.Searchs.push(searchArgs);
        commuArgs.callBack = func;
        serverNS.ajaxProSend(commuArgs);
    },
    //梯形参数Store通用缓存
    paramOptionStoreCache: [],
    //获取梯形参数列表
    //RelKey这个表示电梯的名称
    asycParamOptionGetDicStore: function (setStoreCallBack, paramOptionKeyName, paramOption, RelKey) {
        var func = function (rawdata) {
            var data = [];
            for (var i = 0; i < rawdata.Entitys.length; i++) {
                var entity = rawdata.Entitys[i];
                var item = {};
                item['name'] = entity.Name;
                item['value'] = entity.Name;
                data.push(item);
            }
            if (Ext.isEmpty(data))
                return;
            var store = Ext.create('Ext.data.Store', {
                fields: ['name', 'value'],
                data: data
            });
            //添加缓存
            serverNS.paramOptionStoreCache.push({
                paramOptionName: paramOptionKeyName,
                paramOptionID: paramOptionKeyName,
                store: store
            });
            setStoreCallBack(store);
        };

        //发送请求
        //发送请求
        var commuArgs = new serverNS.commuArgs();

        var dataArgs = commuArgs.dataArgs;
        dataArgs.ActionDes = "获取类型为" + paramOptionKeyName + "所有梯形参数值";
        dataArgs.EntityTypeFullName = serverEntityTypeNS.ParamOption;
        dataArgs.Query.IncludeEntityPaths.push("ParamDefine");


        searchArgs = new serverNS.searchArgs();
        searchArgs.FieldName = 'ParamDefine.Code';
        searchArgs.Values.push(paramOptionKeyName);
        dataArgs.Query.Searchs.push(searchArgs);

        searchArgs = new serverNS.searchArgs();
        searchArgs.FieldName = 'RelKey';
        if (!Ext.isEmpty(RelKey)) {
            searchArgs.Values.push(RelKey);
        } else {
            searchArgs.Values.push('null');
        }
        dataArgs.Query.Searchs.push(searchArgs);
        var sorters = new serverNS.sorter();
        sorters.SortField = 'Sort';
        sorters.SortOrder = serverNS.sortOrder.Asc;
        dataArgs.Query.Sorters.push(sorters);
        if (paramOption != null) {
            searchArgs = new serverNS.searchArgs();
            searchArgs.FieldName = 'ParamType';
            searchArgs.Values.push(paramOption[1]);
            dataArgs.Query.Searchs.push(searchArgs);
        }
        commuArgs.callBack = func;
        serverNS.ajaxProSend(commuArgs);
    },
    //获取报表列信息
    //rpKey为ReportDataObjType枚举标识值
    //callBack回调函数function(columnNames)
    getReportColumnInfo: function (rpKey, callBack, reportObjType, bExecuteProc) {
        var rpActionName = comboStaticData.getValue(comboStaticData.ReportDataObjType, rpKey);
        var rpObjName = comboStaticData.getText(comboStaticData.ReportDataObjType, rpKey);
        //发送请求
        var commuArgs = new serverNS.commuArgs();
        var dataArgs = commuArgs.dataArgs;
        dataArgs.AddExtraArg('ReportAction', rpActionName);
        dataArgs.AddExtraArg('TableViewName', rpObjName);
        dataArgs.AddExtraArg('OnlyColumnInfo', true);
        dataArgs.AddExtraArg('IsExecuteProc', bExecuteProc);
        dataArgs.ActionDes = '获取报表' + rpActionName;

        commuArgs.ajaxMethod = ajaxProMethodNS.Report;
        commuArgs.callBack = function (data) {
            if (callBack != null) {
                callBack(data['ColumnNames']);
            }
        };
        serverNS.ajaxProSend(commuArgs);
    },

    //下载文件
    downLoad: function (url) {
        ////        var pos = str.lastIndexOf(".");
        ////        var lastname = str.substring(pos, str.length);
        ////        if (lastname.toLowerCase() != ".PDF") { }
        window.open(url, "newwindows");
    }
}

//服务端实例对应类型的命名空间
var serverEntityTypeNS = {

    DateVirtual: "SG.Eap.Lib.Rule.Entity.VirtualEntity.DateVirtualEntity",
    //工序绑定员工（工单信息）
    WOEmployeeBindProcessEntity: 'SG.Eap.Lib.Rule.Entity.WO.WOEmployeeBindProcessEntity',
    //全局实力类型
    AutoCode: 'SG.Eap.Lib.Rule.Entity.Sys.AutoCodeEntity',
    Message: 'SG.Eap.Lib.Rule.Entity.Sys.MessageEntity',
    ReceiveInfo: 'SG.Eap.Lib.Rule.Entity.Sys.ReceiveInfoEntity',
    //公司实例类型
    Company: 'SG.Eap.Lib.Rule.Entity.CompanyOrg.CompanyEntity',
    DeptView: 'SG.Eap.Lib.Rule.Entity.CompanyOrg.DepartmentEntity',
    Staff: 'SG.Eap.Lib.Rule.Entity.CompanyOrg.StaffEntity',
    User: 'SG.Eap.Lib.Rule.Entity.Security.UserEntity',
    Right: 'SG.Eap.Lib.Rule.Entity.Security.RightEntity',
    RightRel: 'SG.Eap.Lib.Rule.Entity.Security.RightRelEntity',
    //系统级
    SysMenu: 'SG.Eap.Lib.Rule.Entity.Sys.FuncMenuEntity',
    BusinessLog: 'SG.Eap.Lib.Rule.Entity.Security.BusinessLogEntity',
    MainMenu: 'SG.Eap.Lib.Rule.Page.JsonData.SysFunc.JsonFuncMenuEntity',
    GlobalConfig: 'SG.Eap.Lib.Rule.Page.JsonData.SysFunc.JsonGlobalConfigEntity',
    GlobalSetting: 'SG.Eap.Lib.Rule.Entity.Sys.GlobalSettingEntity',
    DicConfig: 'SG.Eap.Lib.Rule.Entity.Sys.DicConfigEntity',
    PartType: 'SG.Eap.Lib.Rule.Entity.Bom.PartTypeEntity',
    Part: 'SG.Eap.Lib.Rule.Entity.Bom.PartEntity',
    PartStatus: 'SG.Eap.Lib.Rule.Entity.Bom.PartStatusEntity',
    PackagePart: 'SG.Eap.Lib.Rule.Entity.Bom.PackagePartEntity',
    Model: 'SG.Eap.Lib.Rule.Entity.Bom.ModelEntity',
    Module: 'SG.Eap.Lib.Rule.Entity.Bom.ModuleEntity',
    ModuleOds: 'SG.Eap.Lib.Rule.Entity.Bom.ModuleOdsEntity',
    ModelModule: 'SG.Eap.Lib.Rule.Entity.Bom.ModelModuleEntity',

    //工作流程
    WorkFlowRecord: 'SG.Eap.Lib.Rule.Entity.WorkFlow.WorkFlowRecordsEntity',
    WorkFlow: 'SG.Eap.Lib.Rule.Entity.WorkFlow.WorkFlowsEntity',
    WorkFlowStep: 'SG.Eap.Lib.Rule.Entity.WorkFlow.WorkFlowStepsEntity',
    WorkFlowRole: 'SG.Eap.Lib.Rule.Entity.WorkFlow.WorkFlowRoleEntity',
    WorkFlowRoleUser: 'SG.Eap.Lib.Rule.Entity.WorkFlow.WorkFlowRoleUserEntity',

    Ods: 'SG.Eap.Lib.Rule.Entity.Bom.OdsEntity',
    OdsPart: 'SG.Eap.Lib.Rule.Entity.Bom.OdsPartEntity',
    Component: 'SG.Eap.Lib.Rule.Entity.Bom.ComponentEntity',

    BomData: 'SG.Eap.Lib.Rule.Entity.Bom.BomDataEntity',
    BomFormula: 'SG.Eap.Lib.Rule.Entity.Bom.BomFormulaEntity',

    Carriage: 'SG.Eap.Lib.Rule.Entity.Delivery.CarrierEntity',
    CarRegiste: 'SG.Eap.Lib.Rule.Entity.Delivery.CarRegisteEntity',
    LabelPrint: 'SG.Eap.Lib.Rule.Entity.BarCodePrint.LabelPrintEntity',
    ShipBarcode: 'SG.Eap.Lib.Rule.Entity.Delivery.ShipBarcodeEntity',

    ParamDefine: 'SG.Eap.Lib.Rule.Entity.Option.ParamDefineEntity',
    ParamOption: 'SG.Eap.Lib.Rule.Entity.Option.ParamOptionEntity',
    ParamStand: 'SG.Eap.Lib.Rule.Entity.Option.ParamStandEntity',
    Pack: 'SG.Eap.Lib.Rule.Entity.Option.PackEntity',

    //合同的
    Contract: 'SG.Eap.Lib.Rule.Entity.Contract.ContractEntity',
    ContractPayment: 'SG.Eap.Lib.Rule.Entity.Contract.ContractPaymentEntity',
    ContractPayitem: 'SG.Eap.Lib.Rule.Entity.Contract.ContractPayitemEntity',
    ContractPaymoney: 'SG.Eap.Lib.Rule.Entity.Contract.ContractPaymoneyEntity',
    ContractSuspend: 'SG.Eap.Lib.Rule.Entity.Contract.ContractSuspendEntity',
    ContractChange: 'SG.Eap.Lib.Rule.Entity.Contract.ContractChangeEntity',
    ContractChangeSO: 'SG.Eap.Lib.Rule.Entity.Contract.ContractChangeSOEntity',
    ContractSuspendSO: 'SG.Eap.Lib.Rule.Entity.Contract.ContractSuspendSOEntity',
    ContractSpecialApproval: 'SG.Eap.Lib.Rule.Entity.Contract.ContractSpecialApprovalEntity',
    ContractSpecialApprovalSO: 'SG.Eap.Lib.Rule.Entity.Contract.ContractSpecialApprovalSOEntity',
    //技术文件视图
    ContractActScheduleEntity: 'SG.Eap.Lib.Rule.Entity.SO.Report.ContractActScheduleEntity',
    //合同货款
    ContractPayitemHis: 'SG.Eap.Lib.Rule.Entity.Contract.ContractPayitemHisEntity',
    //合同参数表
    ContractParamTable: 'SG.Eap.Lib.Rule.Entity.Contract.ContractParamTableEntity',
    //合同文件上传
    ContractFile: 'SG.Eap.Lib.Rule.Entity.Contract.ContractFileEntity',
    //合同条款
    ContractItem: 'SG.Eap.Lib.Rule.Entity.Option.ContractItemEntity',
    //SO
    SO: 'SG.Eap.Lib.Rule.Entity.SO.SOEntity',
    SOSort: 'SG.Eap.Lib.Rule.Entity.SO.SOSortEntity',
    //合格证
    Certificate: 'SG.Eap.Lib.Rule.Entity.Delivery.CertificateEntity',
    //SOParam
    SOParam: 'SG.Eap.Lib.Rule.Entity.SO.SOParamEntity',
    //SOFormula
    SOFormula: 'SG.Eap.Lib.Rule.Entity.SO.SOFormulaEntity',
    // SOFormulaPartEntity
    SOFormulaPart: 'SG.Eap.Lib.Rule.Entity.SO.SOFormulaPartEntity',
    //SO 副本
    SODuplicate: 'SG.Eap.Lib.Rule.Entity.SO.SODuplicateEntity',
    //SO参数 副本
    SOParamDuplicate: 'SG.Eap.Lib.Rule.Entity.SO.SOParamDuplicateEntity',
    //SO配方副本
    SOFormulaDuplicate: 'SG.Eap.Lib.Rule.Entity.SO.SOFormulaDuplicateEntity',
    //SO配方物料副本
    SOFormulaPartDuplicate: 'SG.Eap.Lib.Rule.Entity.SO.SOFormulaPartDuplicateEntity',
    ContractByShippedSO: 'SG.Eap.Lib.Rule.Entity.VirtualEntity.ContractByShippedSOVirEntity',
    //配方日志
    SOFormulaLog: 'SG.Eap.Lib.Rule.Entity.SO.SOFormulaLogEntity',
    //箱子列表
    SOFM: 'SG.Eap.Lib.Rule.Entity.SO.SOFMEntity',
    //箱子下的物料
    SOFMPart: 'SG.Eap.Lib.Rule.Entity.SO.SOFMPartEntity',
    //箱子下的条码
    SOFMLabel: 'SG.Eap.Lib.Rule.Entity.SO.SOFMLabelEntity',
    //合同条款
    ContractTerm: 'SG.Eap.Lib.Rule.Entity.Option.ContractTermEntity',
    //供应商物料
    SupplierPart: 'SG.Eap.Lib.Rule.Entity.Scm.SupplierPartEntity',
    PartSummary: 'SG.Eap.Lib.Rule.Entity.Scm.PartSummaryEntity',
    Po: 'SG.Eap.Lib.Rule.Entity.Scm.POEntity',
    PoPart: 'SG.Eap.Lib.Rule.Entity.Scm.POPartEntity',

    //总物料
    MaterialSummary: 'SG.Eap.Lib.Rule.Entity.Scm.MaterialSummaryEntity',
    //于A3对接的主表
    Purmst: 'SG.Eap.Lib.Rule.Entity.Scm.PurmstEntity',
    //A3的子表
    Purdec: 'SG.Eap.Lib.Rule.Entity.Scm.PurdecEntity',

    /***虚拟实体*********************************************************/
    //合同虚拟日期实体
    ContractDate: 'SG.Eap.Lib.Rule.Entity.VirtualEntity.ContractDateVirEntity',
    //数据字典枚举实体
    DicVirtual: 'SG.Eap.Lib.Rule.Entity.VirtualEntity.DicVirtualEntity',
    //枚举树节点
    EnumTreeNodeVirEnity: 'SG.Eap.Lib.Rule.Entity.VirtualEntity.EnumTreeNodeVirEntity',
    /***虚拟实体*********************************************************/

    //角色实体
    Role: 'SG.Eap.Lib.Rule.Entity.Security.RoleEntity',
    RoleUser: 'SG.Eap.Lib.Rule.Entity.Security.RoleUserEntity',

    //所有合同变更操作所需要的实体
    ContractParamTableDuplicate: 'SG.Eap.Lib.Rule.Entity.Contract.ContractParamTableDuplicateEntity',
    ContractDuplicate: 'SG.Eap.Lib.Rule.Entity.Contract.ContractDuplicateEntity',
    //变更的历史记录
    ContractChangeRecord: 'SG.Eap.Lib.Rule.Entity.Contract.ContractChangeRecordEntuty',

    ChangePartSummary: 'SG.Eap.Lib.Rule.Entity.Scm.ChangePartSummaryEntity',
    //装箱单
    PackingList: 'SG.Eap.Lib.Rule.Entity.Scm.PackingListEntity',
    //扫描情况
    FMLabelScanning: 'SG.Eap.Lib.Rule.Entity.SO.FMLabelScanningEntity',
    //装箱单打印

    //扶梯装箱单数据维护主表
    PackingListMaintenance: 'SG.Eap.Lib.Rule.Entity.Scm.PackingListMaintenanceEntity',
    //
    PackingParameters: 'SG.Eap.Lib.Rule.Entity.Scm.PackingParametersEntity',
    ShipMent: 'SG.Eap.Lib.Rule.Entity.Delivery.ShipMentEntity',
    ShopMaintenance: 'SG.Eap.Lib.Rule.Entity.WO.ShopMaintenanceEntity',
    ProcessMaintenance: 'SG.Eap.Lib.Rule.Entity.WO.ProcessMaintenanceEntity',

    GroupData: 'SG.Eap.Lib.Rule.Entity.WO.GroupDataEntity',

    SingleScan: 'SG.Eap.Lib.Rule.Entity.WO.SingleScanEntity',
    //扫描枪菜单实体
    ScanMenuEntity: 'SG.Eap.Lib.Rule.Entity.Sys.ScanMenuEntity',
    // 用户扫描枪菜单实体
    UserScanMenuEntity: 'SG.Eap.Lib.Rule.Entity.Sys.UserScanMenuEntity',

    EscalatorFile: 'SG.Eap.Lib.Rule.Entity.Security.EscalatorFileEntity',
    TingmenSystem: 'SG.Eap.Lib.Rule.Entity.Bom.TingmenSystemEntity',
    NonStandard: 'SG.Eap.Lib.Rule.Entity.SO.NonStandardEntity',
    CommonVirEntity: 'SG.Eap.Lib.Rule.Entity.VirtualEntity.CommonVirEntity',
    WoEntity: 'SG.Eap.Lib.Rule.Entity.WO.WOEntity',
    WosDetialEntity: 'SG.Eap.Lib.Rule.Entity.WO.WOsDetialEntity',
    DrawingEntity: 'SG.Eap.Lib.Rule.Entity.Bom.DrawingEntity',
    DrawingProcessEntity: 'SG.Eap.Lib.Rule.Entity.Bom.DrawingProcessEntity',
    BatchMaintenance: 'SG.Eap.Lib.Rule.Entity.SO.BatchMaintenanceEntity',
    TM: 'SG.Eap.Lib.Rule.Entity.SO.Report.TMEntity',
    MT: 'SG.Eap.Lib.Rule.Entity.SO.Report.MTEntity',
    DQ: 'SG.Eap.Lib.Rule.Entity.SO.Report.DQEntity',
    DQDoorMachine: 'SG.Eap.Lib.Rule.Entity.SO.Report.DoorMachineEntity',
    HostingPlan: 'SG.Eap.Lib.Rule.Entity.SO.Report.HostingPlanEntity',
    OnThreshold: 'SG.Eap.Lib.Rule.Entity.SO.Report.OnThresholdEntity',
    SheetMetalPlan: 'SG.Eap.Lib.Rule.Entity.SO.Report.SheetMetalPlanEntity',
    Escalator: 'SG.Eap.Lib.Rule.Entity.SO.Report.EscalatorEntity',
    RegionalResultsRP: 'SG.Eap.Lib.Rule.Entity.SO.Report.RegionalResultsRPEntity',
    EscalatorRandomFileEntity: 'SG.Eap.Lib.Rule.Entity.SO.Report.EscalatorRandomFileEntity',
    InventoryShipmentStatisticsEntity: 'SG.Eap.Lib.Rule.Entity.SO.Report.InventoryShipmentStatisticsEntity',
    ConteactPlanEntity: 'SG.Eap.Lib.Rule.Entity.SO.Report.ConteactPlanEntity',
    MissSOFMPartEntity: 'SG.Eap.Lib.Rule.Entity.SO.MissSOFMPartEntity',
    ComplateFormulaEntity: 'SG.Eap.Lib.Rule.Entity.SO.Report.ComplateFormulaEntity',
    PlanParamTempEntity: 'SG.Eap.Lib.Rule.Entity.SO.Report.PlanParamTempEntity',
    SafeDoor: 'SG.Eap.Lib.Rule.Entity.SO.Report.SafeDoorEntity',
}

//通讯接口配置的命名空间
var ajaxProMethodNS = {
    //设置计划开工日期（工单信息）
    SetPlanStartWorkTime: 'SG.Eap.Lib.Rule.Page.Controller.WOController.SetPlanStartWorkTime',
    //BaseController基本通讯接口
    Get: 'SG.Eap.Lib.Rule.Page.Controller.BaseController.Get',
    Gets: 'SG.Eap.Lib.Rule.Page.Controller.BaseController.Gets',
    Add: 'SG.Eap.Lib.Rule.Page.Controller.BaseController.Add',
    Update: 'SG.Eap.Lib.Rule.Page.Controller.BaseController.Update',
    Delete: 'SG.Eap.Lib.Rule.Page.Controller.BaseController.Delete',
    Report: 'SG.Eap.Lib.Rule.Page.Controller.BaseController.GetReportData',
    QuickCallBusiness: 'SG.Eap.Lib.Rule.Page.Controller.BaseController.QuickCallBusiness',
    GetPracticalSchedulingBatchDatas: 'SG.Eap.Lib.Rule.Page.Controller.WOController.GetPracticalSchedulingBatchDatas',
    QueryTree: 'SG.Eap.Lib.Rule.Page.Controller.BaseController.QueryTreeNodes',
    GetEnumTreeNodes: 'SG.Eap.Lib.Rule.Page.Controller.BaseController.GetEnumTreeNodes',

    //发送消息
    SendMsg: 'SG.Eap.Lib.Rule.Page.Controller.MessageController.SendMsg',
    //获得通知中心数据
    GetNotices: 'SG.Eap.Lib.Rule.Page.Controller.MessageController.GetNotices',

    //BaseController基本通讯接口
    //复制方法
    Copy: 'SG.Eap.Lib.Rule.Page.Controller.SysFuncController.Copy',
    //SecurityController
    Login: 'SG.Eap.Lib.Rule.Page.Controller.SecurityController.Login',
    IsLogin: 'SG.Eap.Lib.Rule.Page.Controller.SecurityController.IsLogin',
    Logout: 'SG.Eap.Lib.Rule.Page.Controller.SecurityController.Logout',
    ChangePwd: 'SG.Eap.Lib.Rule.Page.Controller.SecurityController.ChangePwd',
    AddUser: 'SG.Eap.Lib.Rule.Page.Controller.SecurityController.AddUser',
    ResetPwd: 'SG.Eap.Lib.Rule.Page.Controller.SecurityController.ResetPwd',
    UpdateUser: 'SG.Eap.Lib.Rule.Page.Controller.SecurityController.UpdateUser',

    AddUserRole: 'SG.Eap.Lib.Rule.Page.Controller.SecurityController.AddUserRole',
    AddRoleUser: 'SG.Eap.Lib.Rule.Page.Controller.SecurityController.AddRoleUser',
    AddRightUser: 'SG.Eap.Lib.Rule.Page.Controller.SecurityController.AddRightUser',
    AddRoleRight: 'SG.Eap.Lib.Rule.Page.Controller.SecurityController.AddRoleRight',
    AddRightRole: 'SG.Eap.Lib.Rule.Page.Controller.SecurityController.AddRightRole',
    AddUserRight: 'SG.Eap.Lib.Rule.Page.Controller.SecurityController.AddUserRight',

    AddUserRights: 'SG.Eap.Lib.Rule.Page.Controller.SecurityController.AddUserRights',
    AddRoleRights: 'SG.Eap.Lib.Rule.Page.Controller.SecurityController.AddRoleRights',

    //SecurityController

    //CopyContract: 'SG.Eap.Lib.Rule.Page.Controller.ContractController.CopyContract',
    //技术商务变更交叉提交时的判断（将上面的方法移到下面的方法2015-04-28）
    CopyContract: 'SG.Eap.App.Controller.ContractController.CopyContract',
    //SysFuncController
    GetEnumList: 'SG.Eap.Lib.Rule.Page.Controller.SysFuncController.GetEnumList',
    //SysFuncController
    GetMyContractInfo: 'SG.Eap.Lib.Rule.Page.Controller.ContractController.GetMyContractInfo',
    //合同参数的保存
    ContractParamTableAdd: 'SG.Eap.Lib.Rule.Page.Controller.ContractController.AddTableParam',
    //合同的保存
    UpdateContract: 'SG.Eap.Lib.Rule.Page.Controller.ContractController.UpdateContract',
    //合同下财务确认审核（定金）
    UpdateContractPayitemFirstStatus: 'SG.Eap.Lib.Rule.Page.Controller.SOController.UpdateContractPayitemFirstStatus',
    //合同下财务确认审核（提货款）
    UpdateContractPayitemSecondStatus: 'SG.Eap.Lib.Rule.Page.Controller.SOController.UpdateContractPayitemSecondStatus',
    //合同排产操作（更新）-预排产
    PreScheduleSO: 'SG.Eap.Lib.Rule.Page.Controller.SOController.PreScheduleSO',
    //排产确认操作（更新）-排产确认
    ScheduleConfirmSO: 'SG.Eap.Lib.Rule.Page.Controller.SOController.ScheduleConfirmSO',
    //合同排产操作（更新）-实际排产
    RealScheduledSO: 'SG.Eap.Lib.Rule.Page.Controller.SOController.RealScheduledSO',
    //合同货款批量修改（更新）
    UpdateContractPayment: 'SG.Eap.Lib.Rule.Page.Controller.SOController.UpdateContractPayment',
    //货款详细表修改操作
    UpdateContractPaymoney: 'SG.Eap.Lib.Rule.Page.Controller.SOController.UpdateContractPaymoney',
    //添加合同货款详细
    AddContractPaymoney: 'SG.Eap.Lib.Rule.Page.Controller.SOController.AddContractPaymoney',
    //合同参数的编辑数据获取
    ContractParamTableGet: 'SG.Eap.Lib.Rule.Page.Controller.ContractController.GetTableParam',
    //梯形参数的编辑
    UpdateTableParam: 'SG.Eap.Lib.Rule.Page.Controller.ContractController.UpdateTableParam',
    //确认定金
    ConfirmationDeposit: 'SG.Eap.Lib.Rule.Page.Controller.ContractController.ConfirmationDeposit',
    //确认提货款
    PaymentConfirmation: 'SG.Eap.Lib.Rule.Page.Controller.ContractController.PaymentConfirmation',
    //合同变更打印
    PrintContractChange: 'SG.Eap.Lib.Rule.Page.Controller.ContractController.PrintContractChange',
    //合同变更预览
    //PrintContractChangeWF : 'SG.Eap.Lib.Rule.Page.Controller.ContractController.PrintContractChangeWF',
    PrintContractChangeWF: 'SG.Eap.App.Controller.PrintAgreement.PrintContractChangeWF',
    //查看总金额
    Allamounts: 'SG.Eap.Lib.Rule.Page.Controller.SOController.Allamounts',
    //对接订单
    OrdersSync: 'SG.Eap.Lib.Rule.Page.Controller.ScmController.OrdersSync',
    //拷贝订单
    CopyPo: 'SG.Eap.Lib.Rule.Page.Controller.ScmController.CopyPo',
    //拷贝配方物料
    CopyPart: 'SG.Eap.Lib.Rule.Page.Controller.ScmController.CopyPart',
    ////////////////////////////////////////////////////////工作流程////////////////////////////////////////////////////
    //==============================================流程图相关方法===============================================
    //加载流程状态
    GetWorkFlowCurrentStep: 'SG.Eap.Lib.Rule.Page.Controller.WorkFlowController.GetWorkFlowCurrentStep',

    //加载节点审批信息
    GetWorkFlowNodeData: 'SG.Eap.Lib.Rule.Page.Controller.WorkFlowController.GetWorkFlowNodeData',

    //判断流程环节是否有权限
    HasRightWorkFlowStep: 'SG.Eap.Lib.Rule.Page.Controller.WorkFlowController.HasRightWorkFlowStep',

    //修改流程角色用户信息
    UpdateWorkFlowRoleUser: 'SG.Eap.Lib.Rule.Page.Controller.ContractController.UpdateWorkFlowRoleUser',
    //为流程角色添加用户信息
    AddWorkFlowRoleUser: 'SG.Eap.Lib.Rule.Page.Controller.ContractController.AddWorkFlowRoleUser',

    //=============================================合同评审相关方法===============================================
    //提交合同评审流程
    SubmitContractReviewWF: 'SG.Eap.Lib.Rule.Page.Controller.WorkFlowController.SubmitContractReviewWF',
    //驳回合同评审流程
    RejectContractReviewWF: 'SG.Eap.Lib.Rule.Page.Controller.WorkFlowController.RejectContractReviewWF',
    //撤回合同评审流程
    CancelContractReviewWF: 'SG.Eap.Lib.Rule.Page.Controller.WorkFlowController.CancelContractReviewWF',
    //合同评审（电梯技术评审）
    ContractPreviewFJPDFElevator: 'SG.Eap.Lib.Rule.Page.Controller.ContractController.ContractPreviewFJPDFElevator',
    //合同评审（扶梯技术评审）
    ContractPreviewFJPDFEscalator: 'SG.Eap.Lib.Rule.Page.Controller.ContractController.ContractPreviewFJPDFEscalator',
    //=============================================配方审核相关方法===============================================

    //配方审核评审流程
    SubmitSOFormulaWF: 'SG.Eap.Lib.Rule.Page.Controller.WorkFlowController.SubmitSOFormulaWF',
    //配方审核驳回流程
    RejectSOFormulaWF: 'SG.Eap.Lib.Rule.Page.Controller.WorkFlowController.RejectSOFormulaWF',
    //配方审核撤回流程
    BomApproval: 'SG.Eap.Lib.Rule.Page.Controller.WorkFlowController.CancelSOFormulaWF',
    //=============================================合同变更相关方法===============================================

    //提交合同变更
    CreateContractChangeWF: 'SG.Eap.Lib.Rule.Page.Controller.ContractController.CreateContractChangeWF',
    //合同变更评审流程
    SubmitContractChangeWF: 'SG.Eap.Lib.Rule.Page.Controller.WorkFlowController.SubmitContractChangeWF',
    //合同变更驳回流程
    RejectContractChangeWF: 'SG.Eap.Lib.Rule.Page.Controller.WorkFlowController.RejectContractChangeWF',
    //添加合同变更下SO
    AddContractChangeSO: 'SG.Eap.Lib.Rule.Page.Controller.ContractController.AddContractChangeSO',
    //合同变更撤回
    CancelContractChangeWF: 'SG.Eap.Lib.Rule.Page.Controller.WorkFlowController.CancelContractChangeWF',
    //=============================================合同暂停相关方法===============================================

    //提交合同暂停
    CreateContractSuspendWF: 'SG.Eap.Lib.Rule.Page.Controller.ContractController.CreateContractSuspendWF',

    //合同暂停评审流程
    SubmitContractSuspendWF: 'SG.Eap.Lib.Rule.Page.Controller.WorkFlowController.SubmitContractSuspendWF',
    //合同暂停驳回流程
    RejectContractSuspendWF: 'SG.Eap.Lib.Rule.Page.Controller.WorkFlowController.RejectContractSuspendWF',
    //添加合同暂停下SO
    AddContractSuspendSO: 'SG.Eap.Lib.Rule.Page.Controller.ContractController.AddContractSuspendSO',
    //合同变更撤回
    CancelContractSuspendeWF: 'SG.Eap.Lib.Rule.Page.Controller.WorkFlowController.CancelContractSuspendeWF',

    //=============================================合同特批相关方法===============================================

    //提交合同特批
    CreateContractSpecialApprovalWF: 'SG.Eap.Lib.Rule.Page.Controller.ContractController.CreateContractSpecialApprovalWF',
    //添加合同特批下SO
    AddContractSpecialApprovalSO: 'SG.Eap.Lib.Rule.Page.Controller.ContractController.AddContractSpecialApprovalSO',
    //合同暂停评审流程
    SubmitContractSpecialApprovalWF: 'SG.Eap.Lib.Rule.Page.Controller.WorkFlowController.SubmitContractSpecialApprovalWF',
    //合同暂停驳回流程
    RejectContractSpecialApprovalWF: 'SG.Eap.Lib.Rule.Page.Controller.WorkFlowController.RejectContractSpecialApprovalWF',
    //合同变更撤回
    CancelContractSpecialApprovalWF: 'SG.Eap.Lib.Rule.Page.Controller.WorkFlowController.CancelContractSpecialApprovalWF',

    //=============================================合同评审相关方法===============================================
    //提交合同评审流程
    SubmitContractDuplicateReviewWF: 'SG.Eap.Lib.Rule.Page.Controller.WorkFlowController.SubmitContractDuplicateReviewWF',
    //驳回合同评审流程
    RejectContractDuplicateReviewWF: 'SG.Eap.Lib.Rule.Page.Controller.WorkFlowController.RejectContractDuplicateReviewWF',
    //撤回合同评审流程
    CancelContractDuplicateReviewWF: 'SG.Eap.Lib.Rule.Page.Controller.WorkFlowController.CancelContractDuplicateReviewWF',

    //============================================================================================================

    //提交合同拆分SO
    CreateSO: 'SG.Eap.Lib.Rule.Page.Controller.ContractController.CreateSO',
    //添加合同货款
    AddPaymentItem: 'SG.Eap.Lib.Rule.Page.Controller.ContractController.AddPaymentItem',
    AddSalesOrder: 'SG.Eap.Lib.Rule.Page.Controller.ContractController.AddSalesOrder',
    //获取梯形下拉框的数据
    GetParamOptionItems: 'SG.Eap.Lib.Rule.Page.Controller.ContractController.GetParamOptionItem',
    //梯形参数的保存
    UpdateContractTableParams: 'SG.Eap.Lib.Rule.Page.Controller.ContractController.UpdateContractTableParams',
    //获取SO参数
    GetSOParams: 'SG.Eap.Lib.Rule.Page.Controller.SOController.GetSOParams',
    //编辑SO参数
    UpdateSOParams: 'SG.Eap.Lib.Rule.Page.Controller.SOController.UpdateSOParams',
    //预览配方
    PreCreateFormula: 'SG.Eap.Lib.Rule.Page.Controller.SOController.PreCreateFormula',
    //生成装箱单
    CreatePackList: 'SG.Eap.Lib.Rule.Page.Controller.SOController.CreatePackList',
    //物料清单
    BOM: 'SG.Eap.Lib.Rule.Page.Controller.SOController.BOM',
    //桁架
    Truss: 'SG.Eap.Lib.Rule.Page.Controller.SOController.Truss',
    //配方释放
    ReleaseFormula: 'SG.Eap.Lib.Rule.Page.Controller.SOController.ReleaseFormula',
    //配方提交
    SubmitedFormula: 'SG.Eap.Lib.Rule.Page.Controller.SOController.SubmitedFormula',
    //获取合同日期节点
    GetContractDateNodes: 'SG.Eap.Lib.Rule.Page.Controller.ContractController.GetContractDateNodes',
    GetContractSchedulingTime: 'SG.Eap.Lib.Rule.Page.Controller.ContractController.GetContractSchedulingTime',
    //根据计划排产日期获取合同
    GetPlanDeliverContractByDates: 'SG.Eap.Lib.Rule.Page.Controller.ScmController.GetPlanDeliverContractByDates',
    //生成物料汇总
    SummaryMaterial: 'SG.Eap.Lib.Rule.Page.Controller.ScmController.SummaryMaterial',
    //根据计划排产日期获取合同
    GetContractByShippedSODates: 'SG.Eap.Lib.Rule.Page.Controller.ScmController.GetContractByShippedSODates',
    GetContractBy3: 'SG.Eap.Lib.Rule.Page.Controller.ScmController.GetContractBy3',
    GetContractBy30: 'SG.Eap.Lib.Rule.Page.Controller.ScmController.GetContractBy30',
    GetContractBy: 'SG.Eap.Lib.Rule.Page.Controller.ScmController.GetContractBy',
    GetContractBy1: 'SG.Eap.Lib.Rule.Page.Controller.ScmController.GetContractBy1',
    GetContractBy2: 'SG.Eap.Lib.Rule.Page.Controller.ScmController.GetContractBy2',
    GetContractBy31: 'SG.Eap.Lib.Rule.Page.Controller.ScmController.GetContractBy31',
    GeSingleScanBy: 'SG.Eap.Lib.Rule.Page.Controller.ScmController.GetSingleScanBy',

    GetToCarDateBy: 'SG.Eap.Lib.Rule.Page.Controller.ShipMentController.GetToCarDateBy',

    GetContract3U: 'SG.Eap.Lib.Rule.Page.Controller.ScmController.GetContract3U',
    //获取合同条款内容
    Provision: 'SG.Eap.Lib.Rule.Page.Controller.ContractController.Provision',
    //获取合同条款内容
    ProvisionCopy: 'SG.Eap.Lib.Rule.Page.Controller.ContractController.ProvisionCopy',
    //删除物料操作
    DeletePart: 'SG.Eap.Lib.Rule.Page.Controller.BomController.DeletePart',
    //添加物料包
    AddPackagePart: 'SG.Eap.Lib.Rule.Page.Controller.BomController.AddPackagePart',
    //批量编辑物料包
    UpdatePackagePart: 'SG.Eap.Lib.Rule.Page.Controller.BomController.UpdatePackagePart',
    //根据所填参数加载其余参数
    ConfigurationParameters: 'SG.Eap.Lib.Rule.Page.Controller.ContractController.ConfigurationParameters',
    //预览/打印合同样板PDF
    ContractPreviewPDF: 'SG.Eap.Lib.Rule.Page.Controller.ContractController.ContractPreviewPDF',
    //预览/打印合同基本信息PDF
    ContractPreviewInfoPDF: 'SG.Eap.Lib.Rule.Page.Controller.ContractController.ContractPreviewInfoPDF',
    //预览/打印合同附件PDF
    ContractPreviewFjPDF: 'SG.Eap.Lib.Rule.Page.Controller.ContractController.ContractPreviewFjPDF',
    //预览/打印合同特批PDF
    ContractSpecialPreviewPDF: 'SG.Eap.Lib.Rule.Page.Controller.ContractController.ContractSpecialPreviewPDF',
    //编辑so的PDF
    SOFormulaPDF: 'SG.Eap.Lib.Rule.Page.Controller.SOController.SOFormulaPDF',
    //生成EXECL
    GenerateExecl: 'SG.Eap.Lib.Rule.Page.Controller.ScmController.GenerateExecl',
    //生成合格证
    Certificate: 'SG.Eap.Lib.Rule.Page.Controller.SOController.Certificate',
    //完成合格证
    CompleteCertificate: 'SG.Eap.Lib.Rule.Page.Controller.SOController.CompleteCertificate',
    //so配方物料 副本add
    SOFormulaPartDuplicateAdd: 'SG.Eap.Lib.Rule.Page.Controller.SOController.SOFormulaPartDuplicateAdd',

    //so配方物料 副本Del
    SOFormulaPartDuplicateDel: 'SG.Eap.Lib.Rule.Page.Controller.SOController.SOFormulaPartDuplicateDel',
    //批量生成配方
    BatchGeneration: 'SG.Eap.Lib.Rule.Page.Controller.SOController.BatchGeneration',
    //so配方物料 副本update
    SOFormulaPartDuplicateUp: 'SG.Eap.Lib.Rule.Page.Controller.SOController.SOFormulaPartDuplicateUp',
    //so副本的修改
    SoPartDuplicateGet: 'SG.Eap.Lib.Rule.Page.Controller.ChangeContractController.SoPartDuplicateGet',
    //SO副本的参数保存
    SoUpdateSoPartDuplicate: 'SG.Eap.Lib.Rule.Page.Controller.ChangeContractController.UpdateSoPartDuplicate',
    //测试so配方的PDF
    SOFormulaPDFtest: 'SG.Eap.Lib.Rule.Page.Controller.SOController.SOFormulaPDFtest',
    //获取数据字典节点
    GetDicKeyTypeNodes: 'SG.Eap.Lib.Rule.Page.Controller.GlobalDicConfigController.GetDicKeyTypeNodes',
    //更改配方状态
    ChangeFormulaStatus: 'SG.Eap.Lib.Rule.Page.Controller.SOController.ChangeFormulaStatus',
    //scm  生成订单
    CreatePO: 'SG.Eap.Lib.Rule.Page.Controller.ScmController.CreatePO',
    //删除po
    //DeletePo : 'SG.Eap.Lib.Rule.Page.Controller.ScmController.DeletePo',
    //删除供应商
    DeleteSupplier: 'SG.Eap.Lib.Rule.Page.Controller.ScmController.DeleteSupplier',
    //打印订单
    POPreviewPDF: 'SG.Eap.Lib.Rule.Page.Controller.ScmController.POPreviewPDF',
    //生成订单
    GenerateOrders: 'SG.Eap.Lib.Rule.Page.Controller.ScmController.GenerateOrders',
    //删除订单
    DeletePO: 'SG.Eap.Lib.Rule.Page.Controller.ScmController.DeletePO',
    //合格证打印
    PrintCertificate: 'SG.Eap.Lib.Rule.Page.Controller.SOController.PrintCertificate',

    //所有关于合同变更的操作
    CreateChangeContract: 'SG.Eap.Lib.Rule.Page.Controller.ChangeContractController.GetTableParam',
    ChangeUpdateTableParams: 'SG.Eap.Lib.Rule.Page.Controller.ChangeContractController.UpdateContractTableParams',
    ChangeContractAddTableParam: 'SG.Eap.Lib.Rule.Page.Controller.ChangeContractController.AddTableParam',

    //打印合同PDF
    PrintContractPDF: 'SG.Eap.Lib.Rule.Page.Controller.ContractController.PrintContractPDF',
    //打印合同参数信息--电梯.扶梯PDF
    PrintContractParamTablePDF: 'SG.Eap.Lib.Rule.Page.Controller.ContractController.PrintContractParamTablePDF',
    //打印合同参数信息--商务
    PrintContractHeadPDF: 'SG.Eap.Lib.Rule.Page.Controller.ContractController.PrintContractHeadPDF',
    //历史PDF
    ChangeContractPreviewPDF: 'SG.Eap.Lib.Rule.Page.Controller.ChangeContractController.ContractPreviewPDF',
    //原始合同PDF
    OriginalContract: 'SG.Eap.Lib.Rule.Page.Controller.ContractController.OriginalContract',
    ContractCopyTerm: 'SG.Eap.Lib.Rule.Page.Controller.ContractController.ContractCopyTerm',
    //复制配方物料
    CopySummaryPart: 'SG.Eap.Lib.Rule.Page.Controller.OrdersController.CopySummaryPart',
    //拆分订单
    SplitOrders: 'SG.Eap.Lib.Rule.Page.Controller.OrdersController.SplitOrders',
    //重新生成订单
    Regenerate: 'SG.Eap.Lib.Rule.Page.Controller.OrdersController.Regenerate',
    //同步数据
    SynchronousA3: 'SG.Eap.Lib.Rule.Page.Controller.ScmController.SynchronousA3',
    //暂停订单
    PauseSo: 'SG.Eap.Lib.Rule.Page.Controller.ScmController.PauseSo',

    GenerateLabels: 'SG.Eap.Lib.Rule.Page.Controller.ScmController.GenerateLabels',
    //打印箱子唛头
    BoxMarks: 'SG.Eap.Lib.Rule.Page.Controller.ScmController.BoxMarks',
    //获取装箱数据
    GetPackingData: 'SG.Eap.Lib.Rule.Page.Controller.ScmController.GetPackingData',
    //装箱单打印
    PrintPacking: 'SG.Eap.Lib.Rule.Page.Controller.ScmController.PrintPacking',
    DeliveryPlan: 'SG.Eap.Lib.Rule.Page.Controller.ScmController.DeliveryPlan',
    ShipmentNotification: 'SG.Eap.Lib.Rule.Page.Controller.SOController.ShipmentNotification',
    ConfirmSO2Delivery: 'SG.Eap.Lib.Rule.Page.Controller.SOController.ConfirmSO2Delivery',
    CancelSO2Delivery: 'SG.Eap.Lib.Rule.Page.Controller.SOController.CancelSO2Delivery',
    ProcessPrinting: 'SG.Eap.Lib.Rule.Page.Controller.ScmController.ProcessPrinting',
    ProcessPrinting1: 'SG.Eap.Lib.Rule.Page.Controller.ScmController.ProcessPrinting1',
    AddUserScanMenu: 'SG.Eap.Lib.Rule.Page.Controller.CompanyOrgController.AddUserScanMenu',
    soPrintReport: 'SG.Eap.Lib.Rule.Page.Controller.ScmController.soPrintReport',
    PrintControlCabinet: 'SG.Eap.Lib.Rule.Page.Controller.ScmController.PrintControlCabinet',
    AnalyzeImportMileageExcel: 'SG.Eap.Lib.Rule.Page.Controller.TemporaryTreatmentController.AnalyzeImportMileageExcel',
    AnalyzeBoxMarks: 'SG.Eap.Lib.Rule.Page.Controller.TemporaryTreatmentController.AnalyzeBoxMarks',
    DeleteBoxMarks: 'SG.Eap.Lib.Rule.Page.Controller.TemporaryTreatmentController.DeleteBoxMarks',
    ProductionPlan: 'SG.Eap.Lib.Rule.Page.Controller.ScmController.ProductionPlan',
    AddSOParams: 'SG.Eap.Lib.Rule.Page.Controller.SOController.AddSOParams',
    ElevatorPreCreateFormula: 'SG.Eap.Lib.Rule.Page.Controller.SOController.ElevatorPreCreateFormula',

    ParameterHandling: 'SG.Eap.Lib.Rule.Page.Controller.SOController.ParameterHandling',

    Back: 'SG.Eap.Lib.Rule.Page.Controller.SOController.Back',
    StandardlistBox: 'SG.Eap.Lib.Rule.Page.Controller.SOController.StandardlistBox',
    OutsourcingMachine: 'SG.Eap.Lib.Rule.Page.Controller.SOController.OutsourcingMachine',
    CarWall: 'SG.Eap.Lib.Rule.Page.Controller.SOController.CarWall',
    GetRealDeliveryDateBindTree: 'SG.Eap.Lib.Rule.Page.Controller.ScmController.GetRealDeliveryDatesBindTree',
    //只用于电梯的树
    GetDTRealDeliveryDatesBindTree: 'SG.Eap.Lib.Rule.Page.Controller.ScmController.GetDTRealDeliveryDatesBindTree',
    //只用于电梯的树【门套】
    GetDTMTRealDeliveryDatesBindTree: 'SG.Eap.Lib.Rule.Page.Controller.ScmController.GetDTMTRealDeliveryDatesBindTree',
    //只用于电梯的树【厅门】
    GetDTTMRealDeliveryDatesBindTree: 'SG.Eap.Lib.Rule.Page.Controller.ScmController.GetDTTMRealDeliveryDatesBindTree',
    //箱外标签
    GetLabelPrintRealDeliveryDatesBindTree: 'SG.Eap.Lib.Rule.Page.Controller.ScmController.GetLabelPrintRealDeliveryDatesBindTree',
    //(只用于扶梯)
    GetFTRealDeliveryDatesBindTree: 'SG.Eap.Lib.Rule.Page.Controller.ScmController.GetFTRealDeliveryDatesBindTree',
    //添加SO副本
    AddSO: 'SG.Eap.Lib.Rule.Page.Controller.SOController.AddSO',
    GetRealDeliveryDateBindTree: 'SG.Eap.Lib.Rule.Page.Controller.ScmController.GetRealDeliveryDatesBindTree',
    GetRealSchedulingDatasBindTree: 'SG.Eap.Lib.Rule.Page.Controller.WOController.GetRealSchedulingDatasBindTree',
    GetEscalatorRealSchedulingDatasBindTree: 'SG.Eap.Lib.Rule.Page.Controller.WOController.GetEscalatorRealSchedulingDatasBindTree',
    /*==============================================工单信息 Begin ================================================*/
    CreateWoData: 'SG.Eap.Lib.Rule.Page.Controller.WOController.CreateWoData',
    //打印工单
    PrintWoDatas: 'SG.Eap.Lib.Rule.Page.Controller.WOController.PrintWoDatas',
    //删除工单
    DeleteWODatas: 'SG.Eap.Lib.Rule.Page.Controller.WOController.DeleteWODatas',
    //电梯钣金页面树节点数据绑定
    GetElevatorMetalCreateDatesBindTree: 'SG.Eap.Lib.Rule.Page.Controller.WOController.GetElevatorMetalCreateDatesBindTree',
    //江东车间信息页面树节点数据绑定
    GetJDElevatorMetalCreateDatesBindTree: 'SG.Eap.Lib.Rule.Page.Controller.WOController.GetJDElevatorMetalCreateDatesBindTree',
    //电梯电气页面树节点数据绑定
    GetElevatorElectricCreateDatesBindTree: 'SG.Eap.Lib.Rule.Page.Controller.WOController.GetElevatorElectricCreateDatesBindTree',
    //电梯主机门机车间信息查询页面树节点数据绑定
    GetElevatorEngineDoorCreateDatesBindTree: 'SG.Eap.Lib.Rule.Page.Controller.WOController.GetElevatorEngineDoorCreateDatesBindTree',
    //扶梯钣金车间信息查询页面树节点数据绑定
    GetEscalatorMetalCreateDatesBindTree: 'SG.Eap.Lib.Rule.Page.Controller.WOController.GetEscalatorMetalCreateDatesBindTree',
    //扶梯电气车间信息查询页面树节点数据绑定
    GetEscalatorElectricCreateDatesBindTree: 'SG.Eap.Lib.Rule.Page.Controller.WOController.GetEscalatorElectricCreateDatesBindTree',
    //扶梯装配车间信息查询页面树节点数据绑定
    GetEscalatorAssemblyCreateDatesBindTree: 'SG.Eap.Lib.Rule.Page.Controller.WOController.GetEscalatorAssemblyCreateDatesBindTree',
    //扶梯桁架车间信息查询页面树节点数据绑定
    GetEscalatorTrussCreateDatesBindTree: 'SG.Eap.Lib.Rule.Page.Controller.WOController.GetEscalatorTrussCreateDatesBindTree',
    /*==============================================工单信息 End ==================================================*/

    /*==============================================工单扫描  Begin =================================================*/
    GetWOScanInfoBindTree: 'SG.Eap.Lib.Rule.Page.Controller.WOController.GetWOScanInfoBindTree',

    /*==============================================工单扫描  Begin =================================================*/
    Paymenthasbeen: 'SG.Eap.Lib.Rule.Page.Controller.SOController.Paymenthasbeen',
    SuspendResume: 'SG.Eap.Lib.Rule.Page.Controller.SOController.SuspendResume',
    VolumeChange: 'SG.Eap.Lib.Rule.Page.Controller.ChangeContractController.VolumeChange',
    VolumeChangeQ: 'SG.Eap.Lib.Rule.Page.Controller.ChangeContractController.VolumeChangeQ',
    ChangeUnStandSO: 'SG.Eap.Lib.Rule.Page.Controller.ChangeContractController.ChangeUnStandSO',
    ModifiedState: 'SG.Eap.App.Controller.ContractController.ModifiedState',
    //so参数信息
    PrintSOParamTablePDF: 'SG.Eap.Lib.Rule.Page.Controller.ContractController.PrintSOParamTablePDF',
    //复制BOM模型
    BomCopy: 'SG.Eap.Lib.Rule.Page.Controller.BomController.BomCopy',
    Parameters: 'SG.Eap.Lib.Rule.Page.Controller.SOController.Parameters',
    GetLineDate: 'SG.Eap.Lib.Rule.Page.Controller.SOController.GetLineDate',
    PackageGeneration: 'SG.Eap.Lib.Rule.Page.Controller.SOController.PackageGeneration',
    MaterialRequisition: 'SG.Eap.Lib.Rule.Page.Controller.SOController.MaterialRequisition',
    ReMatching: 'SG.Eap.Lib.Rule.Page.Controller.ScmController.ReMatching',
    MaterialSummaryPackageGeneration: 'SG.Eap.Lib.Rule.Page.Controller.SOController.MaterialSummaryPackageGeneration',
    CheXiao: 'SG.Eap.Lib.Rule.Page.Controller.SOController.CheXiao',
    PackingCompletion: 'SG.Eap.Lib.Rule.Page.Controller.SOController.PackingCompletion',
    GetComplateFormulaBySchedule: 'SG.Eap.Lib.Rule.Page.Controller.ScmController.GetComplateFormulaBySchedule',
    WBCheXiao: 'SG.Eap.App.Controller.FormulaController.CheXiao',
    GetSORealDeliveryDateExcelBindTree: 'SG.Eap.Lib.Rule.Page.Controller.ScmController.GetSORealDeliveryDateExcelBindTree',
    GetScheduleConfirmDateBindTree: 'SG.Eap.Lib.Rule.Page.Controller.ScmController.GetScheduleConfirmDateBindTree',
    GetEVLabelPrintRealDeliveryDatesBindTree: 'SG.Eap.Lib.Rule.Page.Controller.ScmController.GetEVLabelPrintRealDeliveryDatesBindTree',
    CratePartSummary: 'SG.Eap.Lib.Rule.Page.Controller.ScmController.CratePartSummary',
    DeleteContractFile: 'SG.Eap.Lib.Rule.Page.Controller.SOController.DeleteContractFile',

    SyncButtonModel: 'SG.Eap.Lib.Rule.Page.Controller.SysFuncController.SyncButtonModel',

    GetUserButtonRights: 'SG.Eap.Lib.Rule.Page.Controller.SecurityController.GetUserButtonRights'
};

///业务名
var businessName = {
    //省台量相关年份
    ConfirmedContractDateYears: 'SG.Eap.App.Business.Report.ProvElevatorReportBusiness.GetConfirmedContractDateYears'
};

//查询树模型名字
var queryTreeModelName = {
    Ods: 'SG.Eap.Lib.Rule.Page.TreeQuery.OdsQueryTreeViewModel',
    BOM: 'SG.Eap.Lib.Rule.Page.TreeQuery.BomQueryTreeViewModel',
    Comp: 'SG.Eap.Lib.Rule.Page.TreeQuery.CompQueryTreeViewModel',
    Component: 'SG.Eap.Lib.Rule.Page.TreeQuery.BomComponentQueryTreeViewModel',
    SureDvrSoDate: 'SG.Eap.Lib.Rule.Page.TreeQuery.SureDvrSoQueryTreeViewModel',
    ContractSchedulingTime: 'SG.Eap.Lib.Rule.Page.TreeQuery.ContractSchedulingTimeTreeViewModel',
    WOsTreeViewModel: 'SG.Eap.Lib.Rule.Page.TreeQuery.WOsElectricQueryTreeViewModel',
    WOsElevatorMetalQueryTreeViewModel: 'SG.Eap.Lib.Rule.Page.TreeQuery.WOsElevatorMetalQueryTreeViewModel',
    WOsElevatorEngineDoorQueryTreeViewModel: 'SG.Eap.Lib.Rule.Page.TreeQuery.WOsElevatorEngineDoorQueryTreeViewModel',
    WOsEscalatorMetalQueryTreeViewModel: 'SG.Eap.Lib.Rule.Page.TreeQuery.WOsEscalatorMetalQueryTreeViewModel',
    WOsEscalatorElectricQueryTreeViewModel: 'SG.Eap.Lib.Rule.Page.TreeQuery.WOsEscalatorElectricQueryTreeViewModel',
    WOsEscalatorAssemblyQueryTreeViewModel: 'SG.Eap.Lib.Rule.Page.TreeQuery.WOsEscalatorAssemblyQueryTreeViewModel',
    WOsEscalatorTrussQueryTreeViewModel: 'SG.Eap.Lib.Rule.Page.TreeQuery.WOsEscalatorAssemblyQueryTreeViewModel',
    ShipMentQueryTreeViewModel: 'SG.Eap.Lib.Rule.Page.TreeQuery.ShipMentQueryTreeViewModel',
    LableSureDvrSoQueryTreeViewModel: 'SG.Eap.Lib.Rule.Page.TreeQuery.LableSureDvrSoQueryTreeViewModel',
    ComplateFormulaQueryTreeViewModel: 'SG.Eap.Lib.Rule.Page.TreeQuery.ComplateFormulaQueryTreeViewModel',
    EscalatorComplateFormulaQueryTreeViewModel: 'SG.Eap.Lib.Rule.Page.TreeQuery.EscalatorComplateFormulaQueryTreeViewModel',
    ElavatorSureDvrSoQueryTreeViewModel: 'SG.Eap.Lib.Rule.Page.TreeQuery.ElavatorSureDvrSoQueryTreeViewModel',
    EscalatorSureDvrSoQueryTreeViewModel: 'SG.Eap.Lib.Rule.Page.TreeQuery.EscalatorSureDvrSoQueryTreeViewModel',
    JDWOQueryTreeViewModel: 'SG.Eap.Lib.Rule.Page.TreeQuery.JDWOQueryTreeViewModel',
    SODevilyDateExcelTreeViewModel: 'SG.Eap.Lib.Rule.Page.TreeQuery.SODevilyDateExcelTreeViewModel',
    EsSODevilyDateExcelTreeViewModel: 'SG.Eap.Lib.Rule.Page.TreeQuery.EsSODevilyDateExcelTreeViewModel',
    SOScheduleConfirmDateQueryTreeViewModel: 'SG.Eap.Lib.Rule.Page.TreeQuery.SOScheduleConfirmDateQueryTreeViewModel',
    EVLableSureDvrSoQueryTreeViewModel: 'SG.Eap.Lib.Rule.Page.TreeQuery.EVLableSureDvrSoQueryTreeViewModel',
    ESLableSureDvrSoQueryTreeViewModel: 'SG.Eap.Lib.Rule.Page.TreeQuery.ESLableSureDvrSoQueryTreeViewModel'
};

//全局字典枚举类型
var globalDicConfigKeyType = {
    None: 0, //无
    Country: 1, //国家
    Province: 2, //省或辖市
    City: 3, //市
    Currency: 4, //货币
    Unit: 5, //单位
    ModelType: 1200, //BOM模型类别
    ModuleType: 1202, //工地模块类别
    OdsType: 1203, //ODS类别
    ComponentType: 1204, //组件类别
    PartType: 1205, //物料类别
    PartPurchaseType: 1210, //物料采购属性
    PartPackType: 1211, //物料包装状态
    ParamType: 1220, //参数类别
    PartNameType: 6,
    BJWOType: 2050
};

//全局工作流程编号
var globalWorkflowType = {
    //合同评审
    ContractReview: "WF001",
    //配方审批
    BomApproval: "WF002",
    //合同变更
    ContractChange: "WF003",
    //合同暂停
    ContractSuspend: "WF004",
    //合同特批
    ContractSpecialApproval: "WF005",
    //协议确认评审
    ContractDuplicateReview: "WF006"
};
//下拉框静态数据  每个数组的第一个为name，第二个为value, 第三个是 标识码（可选）
var comboStaticData = {
    IsStandard: [['正常物料', '正常物料'], ['非标物料', '非标物料']],
    BaseStation: [['有', '有'], ['无', '无'], ['基站', '基站']],
    //是否成套部件
    Complete: [['是', 1], ['否', 0]],
    //判断运算符
    yesNo: [['否', false], ['是', true]],
    //判断性别
    sex: [['男', true], ['女', false]],
    //有无
    haveOrNot: [['有', '有'], ['无', '无']],
    //导出文件类型
    exportFileType: [['.xls', 1, 'Xls'], ['.csv', 10, 'Csv']],
    //合同类型
    contractType: [['常规', 10, 'Normal'], ['三方合同', 20, 'Three'], ['大包合同', 30, 'Large'], ['别墅梯合同', 40, 'Villa']],
    //运输及保险
    Transport: [['甲方承担', '甲方承担', '甲方承担'], ['乙方承担', '乙方承担', '乙方承担'], ['乙方代办', '乙方代办', '乙方代办'], ['丙方承担', '丙方承担', '丙方承担']],
    //价格类型
    PriceType: [['含税设备价', 10, 'EquipmentPrice'], ['运输设备价', 20, 'TransportationPrice'], ['安装设备价', 30, 'InstallationPrice']],
    //公司类型
    companyType: [['本公司', 1, 'Default'], ['供应商', 2, 'Supplier'], ['客户公司', 4, 'Client'], ['代理商', 8, 'Agent'], ['子公司', 16, 'SubCompany']],
    //物料类型
    partType: [['常规物料', 2], ['组件', 4]],
    //参数数据类型
    dataType: [['字符串', 'string'], ['数字', 'numeric']],
    //发票类型
    invoice: [['增值税普通发票', '增值税普通发票'], ['增值税专用发票', '增值税专用发票']],
    contractNature: [["常规", "常规"], ["技术非标", "技术非标"], ["交货期非标", "交货期非标"]],
    //收款状态
    paymentStatus: [['已收款', 10, 'Payed'], ['已提交', 20, 'Submited'], ['已确认', 30, 'Confirmed']],

    //合同状态
    contractStatus: [['已创建', 10, 'Created'], ['已驳回', 15, 'Rejected'], ['提交评审', 20, 'Submited'], ['已评审', 30, 'Reviewed'], ['执行', 50, 'Execute'], ['暂停', 90, 'Stopd'], ['取消', 100, 'Cancel'], ['完成', 900, 'Completed']],

    //SO状态
    soStatus: [['已创建', 10, 'Created'], ['定金已确认', 40, 'Earnested'], ['提货款已确认', 60, 'Raised'], ['已确认可排产', 70, 'ConfirmScheduled'], ['执行', 90, 'Execute'], ['装箱完工中', 130, 'Packing'], ['已装箱完工', 150, 'PackCompleted'], ['入库中', 170, 'Stocking'], ['已入库', 190, 'Stocked'], ['发运中', 210, 'Shipping'], ['已发运', 230, 'Shipped']],

    //SO排产状态
    soScheduleStatus: [['未排产', 10, 'Created'], ['已预排产', 30, 'PreScheduled'], ['可排产', 35, 'Scheduled'], ['已释放配方', 40, 'FormulaReleased'], ['已正式排产', 50, 'RealScheduled'], ['执行', 80, 'Execute'], ['暂停', 90, 'Stopd'], ['取消', 100, 'Cancel'], ['待重新生成配方', 110, 'ToBeGenerated']],

    soPurchaseStatus: [['未生成采购单', 0], ['部分生成采购单', 5], ['已生成采购单', 10]],

    //配方状态
    formulaStatus: [['已失效', 0, 'Invalid'], ['已创建', 10, 'Created'], ['已提交', 20, 'Submited'], ['审核', 30, 'Audited'], ['审批', 40, 'Approvaled'], ['已释放', 50, 'Released'], ['标签生成', 60, 'LabelGeneration'], ['已打印', 70, 'Printed']],

    //当前合同状态
    curContractStatus: [['未签合同', 10, 'NoSignature'], ['已签合同', 30, 'Signatured'], ['已预排产', 50, 'PreScheduled'], ['已生产', 70, 'Produced'], ['已发运', 90, 'Shipped']],
    //变更类型枚举
    changeType: [['商务变更', 10, 'CommerceChange'], ['参数变更', 20, 'ParamChange'], ['收款后参数变更', 30, 'FormulaChange']],
    //SO变更类型枚举
    soChangeType: [['电梯变更', 10, 'ElevatorChange'], ['扶梯变更', 20, 'EscalatorChange'], ['全部变更', 30, 'AllChange']],

    //合同暂停变更后状态
    newContractStatus: [['合同暂停', 10, 'ContractSuspend'], ['合同恢复', 30, 'ContractRecover'], ['合同取消', 20, 'ContractCancel']],

    //================================================================================================
    //流程图流程枚举

    //合同变更状态
    changeStatus: [['申请变更', 10, 'Created'], ['计划确认', 20, 'PlanConfirmation'], ['电梯技术确认', 30, 'ElevatorTechnicalConfirmation'], ['扶梯技术确认', 30, 'EscalatorTechnicalConfirmation'], ['技术确认', 30, 'TechnicalConfirmation'], ['采购核价', 40, 'ProcurementNuclearPrice'], ['销售报价', 50, 'SalesQuote'], ['补充协议确认', 60, 'SupplementalAgreementConfirm'], ['电梯售前技术评审', 70, 'ElevatorProSellReview'], ['扶梯售前技术评审', 80, 'EscalatorProSellReview'], ['售前技术评审', 90, 'ProSellReview'], ['电梯技术评审', 100, 'ElevatorTechReview'], ['扶梯技术评审', 110, 'EscalatorTechReview'], ['计划评审', 120, 'PlanReview'], ['能力评审', 130, 'AbilityReview'], ['商务评审', 140, 'CommerceReview'], ['合同部确认', 150, 'ContractsConfirmed'], ['合同管理员发起变更', 160, 'ContractAdministrator'], ['合同部确认', 200, 'ContractsConfirmedAgain'], ['下发技术部', 210, 'IssuedDepartment'], ['完成', 900, 'Completed']],

    //合同评审状态
    reviewStatus: [['已创建', 10, 'Created'], ['电梯售前技术评审', 20, 'ElevatorProSellReview'], ['扶梯售前技术评审', 30, 'EscalatorProSellReview'], ['售前技术评审', 40, 'ProSellReview'], ['电梯技术评审', 50, 'ElevatorTechReview'], ['扶梯技术评审', 60, 'EscalatorTechReview'], ['计划评审', 70, 'PlanReview'], ['能力评审', 80, 'AbilityReview'], ['商务评审', 90, 'CommerceReview'], ['法务评审', 100, 'LegalReview'], ['部门评审', 110, 'DeptReview'], ['合同管理员确认', 120, 'ContractAdministrator'], ['完成', 900, 'Completed']],
    //协议确认状态
    ProtocolVerificationStatus: [['已创建', 10, 'Created'], ['电梯售前技术评审', 20, 'ElevatorProSellReview'], ['扶梯售前技术评审', 30, 'EscalatorProSellReview'], ['售前技术评审', 40, 'ProSellReview'], ['电梯技术评审', 50, 'ElevatorTechReview'], ['扶梯技术评审', 60, 'EscalatorTechReview'], ['计划评审', 70, 'PlanReview'], ['能力评审', 80, 'AbilityReview'], ['商务评审', 90, 'CommerceReview'], ['法务评审', 100, 'LegalReview'], ['部门评审', 110, 'DeptReview'], ['完成', 900, 'Completed']],
    //合同暂停状态
    suspendStatus: [['已创建', 10, 'Created'], ['计划确认', 20, 'PlanConfirmation'], ['营销中心评审1', 30, 'FirstMarketingCenterReview'], ['营销中心评审2', 40, 'SecondMarketingCenterReview'], ['营销中心评审', 50, 'MarketingCenterReview'], ['提交人确认', 70, 'TheAuthorsConfirm'], ['完成', 900, 'Completed']],

    //特批流程
    specialApprovalStatus: [['申请特批', 10, 'Created'], ['营销中心评审', 20, 'MarketingCenterReview'], ['提交人确认', 30, 'SubmitConfirm'], ['完成', 900, 'Completed']],

    //================================================================================================

    //字典类型
    configKeyType: [['无', 0], ['国家', 1], ['省份', 2], ['城市', 3], ['单位', 5], ['货币', 4], ['模型类别', 1200], ['工地模块类别', 1202], ['ODS类别', 1203], ['组件类别', 1204], ['物料类别', 1205], ['采购属性', 1210], ['包装状态', 1211], ['参数类别', 1220], ['件号类型', 6]],
    //包装箱类型
    packType: [['自制', 10], ['外购', 20]],
    //物料类型
    partFlag: [['常规物料', 10], ['虚拟件', 20], ['采购打包件', 30], ['装箱打包件', 40]],
    packagePartFlag: [['采购打包件', 30], ['装箱打包件', 40]],
    //物料状态
    partStatus: [['None', 0], ['M', 10], ['MP-原材料', 20], ['CP-参数化外购件', 100], ['P', 110], ['PV-VMI物料', 150]],

    //包装状态
    packStatus: [['None', 0, 'None'], ['装箱件', 10, 'PackingPiece'], ['非装箱件', 40, 'NonPackingPiece']],
    //采购属性
    //purchaseType: [['自制件', 10], ['外购件', 20], ['参数化件', 30]],
    //采购方式
    purchaseModus: [['None', 0], ['BTO', 10], ['BTS', 20]],

    //参数类别
    paramType: [['扶梯参数', 10, 'Escalator'], ['电梯参数', 20, 'Elevator'], ['公共参数', 30, 'Common']],
    //参数使用类别
    paramUseType: [['合同参数', 10, 'Contract'], ['配方参数', 20, 'Formula'], ['虚拟参数', 30, 'Virtual'], ['土建参数', 40, 'Parameters']],
    //工作流程操作类型
    operateType: [['提交', 10, 'Submit'], ['驳回', 20, 'Reject'], ['通知', 30, 'Notice']],
    //国内国外
    domesticForeign: [['国内', '国内'], ['国外', '国外']],
    //订单状态
    POStatus: [['已创建', 10, 'Created'], ['已对接', 20, 'Reviewed'], ['已接收', 30, 'accept']],
    //订单类型
    OrderType: [['BTO', 10], ['BTS', 20]],
    //送货位置
    LocationType: [['车间', 10, 'Workshop'], ['仓库', 20, 'Warehouse'], ['工地', 30, 'ConstructionSite']],
    //合同登记中用到的电梯枚举
    deviceType: [['电梯参数', 20], ['扶梯参数', 10]],
    //自动编号枚举
    //电梯或者扶梯
    elevatororOrEscalator: [['电梯', '20', 'Elevator'], ['扶梯', '10', 'Escalator']],
    amountType: [['定金', 10], ['提货款', 20]],
    //自动编号枚举
    autoCodeType: [['参数编号', 10], ['收款编号', 20], ['订单编号', 50], ['合同变更编号', 70], ['合同暂停编号', 80]],
    //品牌
    brand: [['西尼', '西尼'], ['其它', '其它']],
    //区域性质
    regionalNature: [['本区域', '本区域'], ['跨区域', '跨区域']],
    //角色类型
    roleType: [['系统角色', 1, 'Sys'], ['普通角色', 2, 'Normal'], ['工作流角色', 3, 'WorkFlow']],

    //权限类型
    rightType: [['权限分类授权', 0, 'RightTypeModule'], ['菜单模块', 10, 'MenuModule'], ['按钮模块', 20, 'ButtonModule'], ['合同数据模块', 30, 'ContractModule'], ['工作流程模块', 40, 'WorkflowModule'], ['供应商模块', 50, 'Supplier'], ['合同附件模块', 60, 'ContractAttachModule'], ['代理商模块', 70, 'AgencyModule'], ['客户模块', 80, 'ClientModule'], ['梯型模块', 90, 'LadderTypeModule'], ['公司分类授权模块', 100, 'CompanyTypeModule']],
    //合同附件类型
    contractUploadType: [['普通合同文件', 10, 'OrdinaryDoc'], ['商务文件', 20, 'BusinessDoc'], ['技术文件', 30, 'TechnicalDoc']],

    //权限用户类型
    rightUserType: [['用户', 1, 'User'], ['角色', 2, 'Role']],
    //合同变更记录枚举
    ContractChangeType: [['参数变更', 10], ['合同变更', 20]],

    //SGEAP_CORE_SECURITY_BusinessLog 
    //报表数据对象
    ReportDataObjType: [['RP_Show_合同信息汇总表', 'GetCommonReport', 'ContractSummary'],
    ['Get_ContractSaler', 'GetCommonReport', 'GetContractSaler'],
    ['Get_ContractSaler1', 'GetCommonReport', 'ContractSaler1'],
    ['RP_Item_合同操作', 'GetCommonReport', 'ConteactPlan'],
    ['RP_Show_电梯合同', 'GetCommonReport', 'ContractSummary_E'],
    ['RP_Show_扶梯合同', 'GetCommonReport', 'ContractSummary_F'],
    ['RP_Show_门套参数', 'GetCommonReport', 'DailyMJ'],
    ['RP_Show_厅门参数', 'GetCommonReport', 'DailyTM'],
    ['RP_Show_电梯物料结存', 'GetCommonReport', 'ElevatorPartStockRP'],
    ['RP_Show_扶梯物料结存', 'GetCommonReport', 'EscalatorPartStockRP'],
    ['V_InventoryDetailAddressSummary_zh_cn', 'GetCommonReport', 'V_InventoryDetailAddressSummary_zh_cn'],
    ['V_VmiInventoryDetailAddressSummary_zh_cn', 'GetCommonReport', 'V_VmiInventoryDetailAddressSummary_zh_cn']
    ],
    //消息模块
    messageClassificationType: [['接收消息', 1, 'ReceiveMessages'], ['发送消息', 2, 'SendMessage']],
    //消息类型
    messageType: [['系统消息', 1, 'SystemMessage'], ['流程消息', 2, 'WorkFlowMessage']],
    //收款银行
    receivingBank: [['Z工行', '1'], ['工行', '2'], ['建行', '3'], ['徐工行', '4'], ['杨中行', '5'], ['蒋建行', '6'], ['王农行', '7'], ['公司农行', '8'], ['何斌工行', '9'], ['冯涛工行', '10'], ['中行美元', '11'], ['德国西尼美元', '12']],
    //工单状态
    WoStatus: [['失效', -1], ['未打印', 0], ['已打印', 1], ['已开工', 2], ['已完工', 4], ['已入库', 8]],
    //收款方式
    paymentMethod: [['现金', '1'], ['转账', '2'], ['承兑', '3'], ['信用证', '4']],
    //汇总物料状态
    MaterialStatus: [['创建', 10, 'Created'], ['完成', 60, 'Complete'], ['失效', 90, 'Fail']],
    //参数下发部门
    ParamDepartmentType: [['车间', 10, 'Workshop'], ['供应商', 20, 'Supplier'], ['车间和供应商', 30, 'WorkshopAndSupplier']],
    //A3数据状态
    A3AuditStatus: [['创建', 0, 'Create'], ['审核', 1, 'Audit']],
    //打印状态
    PrintStatus: [['未打印', 10, 'Unprinted'], ['已打印', 20, 'Printed']],
    //合格证状态
    CertificateStatus: [['创建', 10, 'Create'], ['完成', 100, 'Complete']],
    //本公司开户银行
    TheBank: [['中国建设银行杭州义蓬支行', '中国建设银行杭州义蓬支行', '中国建设银行杭州义蓬支行']],
    //本公司开户账号
    TheAccount: [['3305 0161 7093 0000 0045', '3305 0161 7093 0000 0045', '3305 0161 7093 0000 0045']],
    //公司名称
    AccountName: [['西尼机电（杭州）有限公司', '西尼机电（杭州）有限公司', '西尼机电（杭州）有限公司']],
    //扫描状态
    ScanStatusType: [['已装箱', 0, 'Components'], ['完工', 10, 'Completion'], ['入库', 20, 'Storage'], ['发货', 30, 'Ship']],
    PackingListMaintenance: [['XNS自动扶梯', 'XNS自动扶梯'], ['XNR自动人行道', 'XNR自动人行道']],
    VehicleStatus: [['入场', 10, 'Admittance'], ['出厂', 20, 'Factory']],
    LackStatus: [['是', 10], ['否', 20]],
    ScanType: [['完工', 10, 'Completion'], ['开工', 20, 'Start']],
    //车间类型
    WorkshopType: [['XNR自动人行道', 'XNR自动人行道'], ['XNT自动扶梯', 'XNT自动扶梯'], ['XNT自动扶梯(E111)', 'XNT自动扶梯(E111)']],
    ScanMenuType: [['8475', 10], ['X3', 20], ['其它', 30]],
    ScanMenuTypeMenu: [['车间', 10], ['发运', 20], ['仓库', 30], ['检验', 40], ['其它', 50]],
    ShipmentWay: [['我司', '我司'], ['自提', '自提'], ['快递', '快递']],
    ShipScanType: [['发运', 90], ['发运回退', 990]],
    //工单打印 所属车间
    WorkCententData: [
        ['100-电梯钣金车间', 100],
        ['200-电梯电气车间', 200],
        ['300-电梯主机门机车间', 300],
        ['400-扶梯钣金车间', 400],
        ['500-扶梯电气车间', 500],
        ['600-扶梯装配车间', 600],
        ['700-扶梯桁架车间', 700],
        ['800-电梯江东车间', 800]
    ],
    ElevatorMetail: [['所有模板', 0],
    ['吊顶', 101],
    ['轿顶', 102],
    ['不锈钢轿壁板含前壁操纵壁门楣', 103],
    ['一体式轿顶', 104],
    ['轿底托架', 105],
    ['不锈钢厅轿门板', 106],
    ['轿底平台', 107],
    ['门机门头', 108],
    ['发泡轿壁彩钢盖板', 109],
    ['喷粉轿壁板含前壁操纵门楣', 110],
    ['喷粉厅轿门板', 111]],
    //工单打印PDF模板选择
    PdfModelData: [
        ['101-吊顶', 101],
        ['102-轿顶', 102],
        ['103-不锈钢轿壁板含前壁操纵壁门楣', 103],
        ['104-一体式轿顶', 104],
        ['105-轿底托架', 105],
        ['106-不锈钢厅轿门板', 106],
        ['107-轿底平台', 107],
        ['108-门机门头', 108],
        ['109-发泡轿壁彩钢盖板', 109],
        ['110-喷粉轿壁板含前壁操纵门楣', 110],
        ['111-喷粉厅轿门板', 111],
        ['112-门机', 112],
        ['201-直梯召唤盒', 201],
        ['202-直梯操纵箱残疾人', 202],
        ['203-直梯操纵箱主操纵箱', 203],
        ['204-直梯控制柜', 204],
        ['205-直梯操纵箱副操纵箱', 205],
        ['801-电梯江东车间', 801],
        ['301-门机装配', 301],
        ['302-主机装配', 302],
        ['303-上坎', 303],
        ['401-扶梯人行道裙盖板(裙板)', 401],
        ['402-扶梯人行道裙盖板(盖板)', 402],
        ['501-扶梯控制柜', 501],
        ['601-XNT系列自动扶梯装配工单', 601],
        ['602-XNR系列自动人行道装配工单', 602],
        ['603-XNT系列自动扶梯装配参数', 603],
        ['604-XNR系列自动人行道装配参数', 604],
        ['701-人行道桁架', 701],
        ['702-扶梯桁架', 702]
    ],

    EscalatorFile: [['发运物料清单', 10], ['配置表', 20], ['附件箱', 30]],
    //获取静态下拉选择项对象  必须分配标识码的静态下拉框数据组 才能获取 comboStaticData 下拉框类型
    getItem: function (comboStaticData, code) {
        if (Ext.isEmpty(code))
            return null;
        for (var i = 0; i < comboStaticData.length; i++) {
            var item = comboStaticData[i];
            if (item.length < 3)
                continue;
            if (code == item[2])
                return item;
        }
    },
    //获取静态类别的值
    getValue: function (comboStaticData, code) {
        return this.getItem(comboStaticData, code)[1];
    },
    //获取静态类别的显示文本
    getText: function (comboStaticData, code) {
        return this.getItem(comboStaticData, code)[0];
    },
    //获取静态下拉选择项对象  必须分配标识码的静态下拉框数据组 才能获取 comboStaticData 下拉框类型
    getItemById: function (comboStaticData, id) {
        if (Ext.isEmpty(id))
            return null;
        for (var i = 0; i < comboStaticData.length; i++) {
            var item = comboStaticData[i];
            if (item.length < 2)
                continue;
            if (id == item[1])
                return item;
        }
    },
    //获取静态类别的显示文本
    getTextById: function (comboStaticData, id) {
        return this.getItemById(comboStaticData, id)[0];
    }
};

//权限读取器名称
var rightReaderName = {
    //主菜单权限读取器
    MainMenuRN: 'SG.Eap.Lib.Rule.Business.Right.MenuModuleRightReader',
    //合同权限读取器
    ContractRN: 'SG.Eap.Lib.Rule.Business.Right.Contract.ContractRightReader',
    //评审权限
    Accreditation: 'SG.Eap.Lib.Rule.Business.Right.Contract.Accreditation',
    //流程权限
    ProcessRole: 'SG.Eap.Lib.Rule.Business.Right.Contract.ProcessRole',
    //权限分类的授予
    RightTypeSettingRN: 'SG.Eap.Lib.Rule.Business.Right.RightTypeSettingRightReader',
    //订单权限分类
    PORN: 'SG.Eap.Lib.Rule.Business.Right.Support.PORightReader',
    //公司权限读取器
    CompanyRN: 'SG.Eap.Lib.Rule.Business.Right.Company.CompanyRightReader',
    //公司分类权限读取器
    CompanyTypeRN: 'SG.Eap.Lib.Rule.Business.Right.Company.CompanyTypeRightReader',
    //SO权限读取器
    SORN: 'SG.Eap.Lib.Rule.Business.Right.SO.SORightReader',
    //SO权限读取器(排产确认)
    CARN: 'SG.Eap.Lib.Rule.Business.Right.SO.ContractActRightReader',
    //SO权限读取器
    SOFormulaRN: 'SG.Eap.Lib.Rule.Business.Right.SO.SOFormulaRightReader',
    SOFormulaRightRN: 'SG.Eap.Lib.Rule.Business.Right.SO.SOFormulaRight',
    //关键部件
    SOFMPartRightR: 'SG.Eap.Lib.Rule.Business.Right.SOFMPartRightReader'
};

//枚举类型全称
var enumTypeFullName = {
    //角色类型
    RoleType: 'SG.Eap.Lib.Rule.Entity.Security.RoleType',
    //权限类型
    RightType: 'SG.Eap.Lib.Rule.Entity.Security.RightType',
    //公司类型
    CompanyType: 'SG.Eap.Lib.Rule.Entity.CompanyOrg.BaseCompType',
    //合同上传文件类型
    ContractUploadType: 'SG.Eap.Lib.Rule.Entity.Contract.ContractUploadType',
    //消息类型
    MessageClassificationType: 'SG.Eap.Lib.Rule.Entity.Sys.MessageClassificationType'

};
