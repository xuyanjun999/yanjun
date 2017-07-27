using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yanjun.Framework.Domain.Entity.BaseData;

namespace Yanjun.Framework.Domain.Entity.Data
{
    /// <summary>
    /// 动态块参数
    /// </summary>
    public class DynamicBlockParamEntity : BaseAcsRecTreeNodeEntity
    {
        /// <summary>
        ///块ID
        ///</summary>
        [Description("块ID")]
        public long DynamicBlockID { get; set; }

        /// <summary>
        /// 动态块
        /// </summary>
        public DynamicBlockEntity DynamicBlock { get; set; }

        /// <summary>
        ///参数ID
        ///</summary>
        [Description("参数ID")]
        public long ParamDefineID { get; set; }


        public ParamDefineEntity ParamDefine { get; set; }

        /// <summary>
        ///默认值
        ///</summary>
        [Description("默认值")]
        public string DefaultValue { get; set; }
    }
}
