//Utils.js



Ext.define('sef.core.utils.Utils', {
        //检测是否为中文
        isCnText: function(str) {
            var reg = /^[\u4E00-\u9FA5]+$/;
            return reg.test(str);
        },
        //设置浏览器标题
        setDocTitle: function(title) {
            document.title = title;
        },

        formatError: function(errResult) {
            var err = {
                code: 0,
                message: '',
                source: errResult
            }
            //debugger;
            if (errResult) {
                if (errResult.$className === 'Ext.data.Batch') {
                    var berr = errResult.exceptions[0];
                    if (Ext.isObject(berr.error)) {
                        err.code = berr.error['status'];
                        if (err.code === 404) {
                            err.message = Ext.String.format('未找到指定的服务');//, errResult.request.url);
                        }
                    }else if(Ext.isString(berr.error)){
                        err.message=berr.error;
                    }
                }else if (errResult['responseText'] && errResult['request']) {
                    //原生请求
                    err.code = errResult['status'];
                    //err.message=errResult['statusText'];
                    if (err.code === 404) {
                        err.message = Ext.String.format('未找到指定的服务\n{0}', errResult.request.url);
                    }
                } else {
                    err.message = errResult.Message;
                }

            }

            return err;
        },

        makeTokenHash: function(token, appendTicks) {
            if (Ext.isEmpty(token)) {
                token = '/Home';
            } else if (/^sef\./.test(token)) {
                //with a class name
                token = token.replace(/^sef\.app/g, '.app');
                token = token.replace(/^sef\.core/g, '.core');
                token = token.replace(/\./gi, '/');
            }
            if (appendTicks === true) {
                token += '?_t=' + (+new Date());
            }
            return token;
        },

        //将字符型HASH值转换成对象
        decodeHash: function(hashStr) {
            /*
            HASH SAMPLE
            =======================
            /app/sys/User
            /app/sys/User?view=List&Id=1

            /core/view/Setting
            /core/view/Setting?view=Form&Id=2

            */

            var hObj = {
                str: hashStr,
                qObj: {},
                appName: '',
                appCls: '',
                appId: '',
                viewName: '' //Form|List|Report
            };

            if (Ext.isEmpty(hashStr)) return hObj;

            var hashArr = hashStr.split('?');

            hObj.appName = hashArr[0];
            if (hashArr.length > 1) {
                //hObj.qObj=hashArr[1];
                var qStr = hashArr[1];
                var qObj = Ext.Object.fromQueryString(qStr);
                //hObj.qObj = {};
                for (var p in qObj) {
                    var cp = p.toLowerCase();
                    hObj.qObj[cp] = qObj[p];
                }
                delete qObj;
                qObj = null;
                hObj.viewName = hObj.qObj['viewname'];
            }

            if (/^\/app/.test(hObj.appName) || /^\/core/.test(hObj.appName)) {
                var name = hObj.appName.replace(/^\/app/, 'sef/app');
                name = name.replace(/^\/core/, "sef.core");
                hObj.appName = name;
                hObj.appCls = name.replace(/\//g, ".");
                hObj.appId = hObj.appCls.replace(/\./g, '_').toLowerCase();
            }

            return hObj;

        },

        //将对象转换成字符串
        encodeHash: function(hashObj, qObj) {
            if (!hashObj) return '';
            if (Ext.isString(hashObj)) {
                var str = hashObj;
                hashObj = {
                    str: '',
                    qObj: {}
                };

                //sef.app.sys.User
                str = str.replace(/^sef\.app/, '.app');
                str = str.replace(/^sef\.core/, '.core');
                str = str.replace(/\./g, '/');
                hashObj.str = str;

            }

            var _qobj = Ext.merge({}, hashObj.qObj);
            qObj = qObj || {};
            for (var p in qObj) {
                //_qobj[p.toLowerCase()]=qObj[p];
                var lp = p.toLowerCase();
                var o = {};
                o[lp] = qObj[p];
                Ext.apply(_qobj, o);
            }

            var qString = Ext.Object.toQueryString(_qobj);

            var oldStr = hashObj.str.split('?')[0];
            if (Ext.isEmpty(qString)) {
                return oldStr;
            }
            return oldStr + '?' + qString;
        },

        getModelMeta: function(model) {
            var entity = null;
            if (Ext.isString(model)) {
                entity = Ext.data.schema.Schema.instances.default.getEntity(model);
            } else {
                entity = model;
            }

            var fields = entity.getFields();
            var metas = [];
            fields.forEach(function(f, i) {
                var ctype = f.getSType();

                var cfg = {
                    isId: f.name === entity.idProperty,
                    invisible:f.invisible===true,
                    name: f.name,
                    text: f.text || f.name,
                    type: ctype,
                    sassb: f.sassb,
                    index: f.index,
                    assoName: ''
                };

                if (ctype === 'DateTime') {
                    cfg['renderer'] = sef.utils.dateRenderer;
                }

                metas.push(cfg);
            });

            metas.sort(function(m1, m2) {
                return m1.index - m2.index;
            });

            //console.log('metas#',metas);

            return metas;
        },

        // month/day/year
        dateRenderer: function(v) {
            return Ext.util.Format.date(v, 'm/d/Y');
        },
        //hour:min:sec
        timeRenderer: function(v) {
            return Ext.util.Format.date(v, 'H:i:s');
        },

        relRenderer: function(field) {
            return function(v) {
                if (v) return v[field];
                return 'N/A';
            }
        },

        // month/day/year h:m:s
        dateTimeRenderer: function(v) {
            return Ext.util.Format.date(v, 'm/d/Y H:i:s');
        },

        ajax: function(opt) {
                var cfg = Ext.merge({
                    method: 'POST',
                    defaultHeaders: {
                        'x-sef': 'true',
                        'ID': sef.runningCfg.getUser().ID,
                        'TOKEN': sef.runningCfg.getUser().Token
                    }
                }, opt);
                var success = cfg['success'];
                var failure = cfg['failure'];
                var scope = cfg['scope'];
                delete cfg['success'];
                delete cfg['failure'];
                delete cfg['scope'];

                return Ext.Ajax.request(cfg)
                    .then(function(resp, opts) {
                        //console.log(resp,opts);
                        var o = Ext.JSON.decode(resp.responseText);
                        if (o.Success === true) {
                            if (success) {
                                success.call(scope, o.Result);
                            }
                        } else {
                            failure && failure.call(scope, sef.utils.formatError(o));
                        }
                        //console.log(o);

                    }, function(errResp, opts) {
                        //console.log('failure#', errResp);
                        if (failure) {
                            failure.call(scope, sef.utils.formatError(errResp));
                        }
                    });
            } //end ajax

    },
    function(cls) {
        if (!sef.utils) {
            sef.utils = new cls();
        }
    })