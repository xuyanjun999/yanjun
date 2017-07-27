using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yanjun.Framework.Domain.Entity.Data
{
    /// <summary>
    /// 动态块
    /// </summary>
    public class DynamicBlockEntity : BaseAcsRecTreeNodeEntity
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
        ///类别
        ///</summary>
        [Description("类别")]
        public string Category { get; set; }
        /// <summary>
        ///所属类型
        ///</summary>
        [Description("所属类型")]
        public int OwnerType { get; set; }

        [JsonIgnore]
        [NotMapped]
        public DynamicBlockOwnerTypeEnum DynamicBlockOwnerTypeEnum
        {
            get { return (DynamicBlockOwnerTypeEnum)OwnerType; }
            set { OwnerType = (int)value; }
        }

        /// <summary>
        ///块状态
        ///</summary>
        [Description("块状态")]
        public int BlockStatus { get; set; }
        /// <summary>
        ///缩略图
        ///</summary>
        [Description("缩略图")]
        public string Thumbnail { get; set; }
        /// <summary>
        ///权限级别
        ///</summary>
        [Description("权限级别")]
        public int RightLevel { get; set; }
        /// <summary>
        ///插入X坐标
        ///</summary>
        [Description("插入X坐标")]
        public string InsertPointX { get; set; }
        /// <summary>
        ///插入Y坐标
        ///</summary>
        [Description("插入Y坐标")]
        public string InsertPointY { get; set; }
        /// <summary>
        ///创建人员
        ///</summary>
        [Description("创建人员")]
        public string CreateUser { get; set; }

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

    /// <summary>
    /// 动态块所属类型枚举
    /// </summary>
    public enum DynamicBlockOwnerTypeEnum
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
