using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yanjun.Framework.Domain.Entity.Data
{
    public class ModelEntity : BaseAcsRecTreeNodeEntity
    {
        /// <summary>
        ///编码
        ///</summary>
        [Description("编码")]
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
        ///状态
        ///</summary>
        [Description("状态")]
        public int ModelStatus { get; set; }
        /// <summary>
        ///创建人员
        ///</summary>
        [Description("创建人员")]
        public string CreateUser { get; set; }
        /// <summary>
        ///创建日期
        ///</summary>
        [Description("创建日期")]
        public DateTime CreateDate { get; set; }
        /// <summary>
        ///最后更新日期
        ///</summary>
        [Description("最后更新日期")]
        public DateTime LastUpdate { get; set; }
        /// <summary>
        ///权限级别
        ///</summary>
        [Description("权限级别")]
        public int RightLevel { get; set; }
        /// <summary>
        ///审核人员
        ///</summary>
        [Description("审核人员")]
        public string AuditUser { get; set; }
        /// <summary>
        ///审核日期
        ///</summary>
        [Description("审核日期")]
        public DateTime? AuditDate { get; set; }
    }
}
