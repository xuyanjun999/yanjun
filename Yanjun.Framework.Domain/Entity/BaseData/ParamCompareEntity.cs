using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yanjun.Framework.Domain.Entity.Org;

namespace Yanjun.Framework.Domain.Entity.BaseData
{
    public class ParamCompareEntity : BaseAcsRecTreeNodeEntity
    {
        /// <summary>
        /// 公司
        /// </summary>
        public long CompanyID { get; set; }

        public CompanyEntity Company { get; set; }
        /// <summary>
        /// 参数
        /// </summary>
        public long ParamDefineID { get; set; }

        public ParamDefineEntity ParamDefine { get; set; }
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
        public string ParamClass { get; set; }
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
        public ParamDefineUseTypeEnum UseTypeEnum
        {
            get { return (ParamDefineUseTypeEnum)UseType; }
            set { UseType = (int)value; }
        }
    }
}
