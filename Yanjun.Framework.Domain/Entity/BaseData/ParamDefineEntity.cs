using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yanjun.Framework.Domain.Entity.BaseData
{
    public class ParamDefineEntity : BaseAcsRecTreeNodeEntity
    {
        /// <summary>
        ///代码
        ///</summary>
        [Description("代码")]
        public string Code { get; set; }
        /// <summary>
        ///名称
        ///</summary>
        [Description("名称")]
        public string Name { get; set; }
        /// <summary>
        ///描述
        ///</summary>
        [Description("描述")]
        public string Desc { get; set; }
        /// <summary>
        ///单位
        ///</summary>
        [Description("单位")]
        public string Unit { get; set; }
        /// <summary>
        ///类别
        ///</summary>
        [Description("类别")]
        public string Category { get; set; }
        /// <summary>
        ///默认值
        ///</summary>
        [Description("默认值")]
        public string DefaultValue { get; set; }
        /// <summary>
        ///数据类型
        ///</summary>
        [Description("数据类型")]
        public string DataType { get; set; }
        /// <summary>
        ///使用类型
        ///</summary>
        [Description("使用类型")]
        public int UseType { get; set; }

        [JsonIgnore]
        [NotMapped]
        public ParamDefineUseTypeEnum ParamDefineUseTypeEnum
        {
            get { return (ParamDefineUseTypeEnum)UseType; }
            set { UseType = (int)value; }
        }

        /// <summary>
        ///所属类型
        ///</summary>
        [Description("所属类型")]
        public int OwnerType { get; set; }

        [JsonIgnore]
        [NotMapped]
        public ParamDefineOwnerTypeEnum ParamDefineOwnerTypeEnum
        {
            get { return (ParamDefineOwnerTypeEnum)OwnerType; }
            set { OwnerType = (int)value; }
        }
    }

    /// <summary>
    /// 参数定义使用类型枚举
    /// </summary>
    public enum ParamDefineUseTypeEnum
    {
        /// <summary>
        /// 输入参数
        /// </summary>
        [Description("输入参数")]
        InputParam = 0,

        /// <summary>
        /// 系统参数
        /// </summary>
        [Description("系统参数")]
        SystemParam = 10
    }

    /// <summary>
    /// 参数定义所属类型枚举
    /// </summary>
    public enum ParamDefineOwnerTypeEnum
    {
        // <summary>
        /// 所有
        /// </summary>
        [Description("所有")]
        All = 0,

        /// <summary>
        /// 系统参数
        /// </summary>
        [Description("公司")]
        Company = 10
    }
}
