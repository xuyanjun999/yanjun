/*! ext-app.js based on ExtJs 4.2.0 | (c) 2006, 2026 SEUNGEE, Inc. | SEUNGEE.COM/license
//@
//@
//@
*/

var isDebug = false;
//标记为记录密码
var IS_REM_PWD_ID = '(+)';
//用于侦测当前环境是否测试环境
var WEB_APP_ASSEMBLY_NAME = 'SG.Eap.App.ashx';
//WEB应用程序集名称
var WEB_APP_BASE_ASSEMBLY_NAME = 'SG.Eap.Lib.Rule.Page.ashx';
//WEB应用基类程序集名称
var WEB_APP_NS_NAME = 'SG.Eap.App';
//WEB应用程序集类名前缀
var AJAXPRO_METHOD_HEADER_NAME = 'X-AjaxPro-Method';
//AJAXPRO类库需要的HEADER名称
var EDIT_PANEL_BACK_ITEMID = "SG_EDITPANEL_BACK";
//编辑区返回用的ITEMID
var REQUIRED_LABEL_TPL = '<span style="color:red;" data-qtip="Required">*</span>';

//登录页名称
var LOGIN_PAGE_NAME = 'userlogin.aspx';
//登录页路径
var LOGIN_PAGE_LOCATION = './' + LOGIN_PAGE_NAME;
//登录页名称
var MAIN_PAGE_NAME = 'main.aspx';
//登录页路径
var MAIN_PAGE_LOCATION = './' + MAIN_PAGE_NAME;
//ajax 超时时间 毫秒
var AJAX_TIMEOUT = 60 * 60 * 1000;


//标准弹出框大小
var defaultWinArgs = {
    height: Math.ceil(document.documentElement.clientHeight * 0.8),
    width: Math.ceil(document.documentElement.clientWidth * 0.6)
};

//mini弹出框大小
var defaultMinWinArgs = {
    height: Math.ceil(document.documentElement.clientHeight * 0.4),
    width: Math.ceil(document.documentElement.clientWidth * 0.4)
};

//mid弹出框大小
var defaultMidWinArgs = {
    height: Math.ceil(document.documentElement.clientHeight * 0.8),
    width: Math.ceil(document.documentElement.clientWidth * 0.8)
};

//max弹出框大小
var defaultMaxWinArgs = {
    height: Math.ceil(document.documentElement.clientHeight),
    width: Math.ceil(document.documentElement.clientWidth)
};


//默认容器参数
var defaultWidgetArgs = {
    margin: "2 5 0 2",
    xtype: 'textfield',
    labelAlign: 'top',
    columnWidth: .5,
    bodyPadding: 5,
    labelSeparator: '',
    msgTarget: 'side'
};



if (!console) {
    var console = {
        log: function (txt) {
        	if(!isDebug) return;
            document.writeln("当前浏览器版本不支持console.log()函数.");
            document.writeln(txt);
        }
    }
}

Array.prototype.clear = function () {
    this.length = 0;
}
Array.prototype.insertAt = function (index, obj) {
    this.splice(index, 0, obj);
}
Array.prototype.removeAt = function (index) {
    this.splice(index, 1);
}
Array.prototype.remove = function (obj) {
    var index = this.indexOf(obj);
    if (index >= 0) {
        this.removeAt(index);
    }
}


function deepCopy(obj) { 
    if (Object.prototype.toString.call(obj) === '[object Array]') {
        var out = [], i = 0, len = obj.length;
        for ( ; i < len; i++ ) {
            out[i] = deepCopy(obj[i]);
        }
        return out;
    }
    if (typeof obj === 'object') {
    	if(obj == null){
    		return null;
        }
        if (obj instanceof Date) {
            var copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        } 
        var out = {}, i;
        for ( i in obj ) {
            out[i] = deepCopy(obj[i]);
        }
        return out;
    }
    return obj;
}

//取消UTC的格式化
Date.prototype.toJSON = function () {
    return this.pattern('yyyy-MM-dd HH:mm:ss.S');
};



Date.prototype.dateAdd = function (interval, number) {
    var d = this;
    var k = {
        'y': 'FullYear',
        'q': 'Month',
        'm': 'Month',
        'w': 'Date',
        'd': 'Date',
        'h': 'Hours',
        'n': 'Minutes',
        's': 'Seconds',
        'ms': 'MilliSeconds'
    };
    var n = {
        'q': 3,
        'w': 7
    };
    eval('d.set' + k[interval] + '(d.get' + k[interval] + '()+' + ((n[interval] || 1) * number) + ')');
    return d;
}
/* 计算两日期相差的日期年月日等 */
Date.prototype.dateDiff = function (interval, objDate2) {
    var d = this, i = {}, t = d.getTime(), t2 = objDate2.getTime();
    i['y'] = objDate2.getFullYear() - d.getFullYear();
    i['q'] = i['y'] * 4 + Math.floor(objDate2.getMonth() / 4) - Math.floor(d.getMonth() / 4);
    i['m'] = i['y'] * 12 + objDate2.getMonth() - d.getMonth();
    i['ms'] = objDate2.getTime() - d.getTime();
    i['w'] = Math.floor((t2 + 345600000) / (604800000)) - Math.floor((t + 345600000) / (604800000));
    i['d'] = Math.floor(t2 / 86400000) - Math.floor(t / 86400000);
    i['h'] = Math.floor(t2 / 3600000) - Math.floor(t / 3600000);
    i['n'] = Math.floor(t2 / 60000) - Math.floor(t / 60000);
    i['s'] = Math.floor(t2 / 1000) - Math.floor(t / 1000);
    return i[interval];
}
//日期格式化
Date.prototype.pattern = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    var week = {
        "0": "\u65e5",
        "1": "\u4e00",
        "2": "\u4e8c",
        "3": "\u4e09",
        "4": "\u56db",
        "5": "\u4e94",
        "6": "\u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}
//统一格式化日期部分
Date.prototype.CommonPatternDate = function () {
    return this.pattern('MM/dd/yyyy');
};
//统一格式化日期时间部分
Date.prototype.CommonPatternDateTime = function () {
    return this.pattern('MM/dd/yyyy HH:mm:ss');
};

function cny_format(value) {
    if (!value)
        value = 0;
    return Ext.util.Format.currency(value, '￥', 2);
}

//i18n support function
function gettext(text) {
    return text;
}

function buildUrl(url) {
    return url;
}


var openPartFile = function (partno, sono) {
    var commuArgs = new serverNS.commuArgs();
    var dataArgs = commuArgs.dataArgs;
    dataArgs.ActionDes = '下载非标图纸附件';
    dataArgs.AddExtraArg("PartNo", partno);
    dataArgs.AddExtraArg("SONo", sono);
    commuArgs.ajaxMethod = 'SG.Eap.Lib.Rule.Page.Controller.ScmController.DownloadNpoPartFile';
    commuArgs.callBack = function (data) {
        if (data.Success) {
            if (Ext.isEmpty(data.path)) {
                alert_info("无有效的图纸文件.");
                return;
            }
            window.open(data.path);
        }
        else {
            alert_error(data.Message);
        }
    }
    serverNS.ajaxProSend(commuArgs);
}


