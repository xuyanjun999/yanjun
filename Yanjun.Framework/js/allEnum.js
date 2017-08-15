//基础数据相关
var BaseDataStaticData = {
    //参数定义使用类型枚举
    ParamDefineUseType: [['输入参数', 0], ['系统参数', 10]],
    //参数定义所属类型枚举
    OwnerType: [['系统', 0], ['公司', 10]],
    //参数定义数据类型枚举
    ParamDefineDataType: [['字符串', 'string'], ['数字', 'double']],

    BlockParamDrawingType: [['参数', 0], ['属性'], 1],
    BlockStatus: [['默认', 0], ['已审核'], 10],
    ModelStatus: [['默认', 0], ['已审核'], 10],
}

var ProjectInfoStaticData = {
    //画图任务状态
    DrawingTaskStatus: [['默认', 0], ['重试', 2], ['处理中', 4], ['已生成', 6], ['异常', 9]],
}