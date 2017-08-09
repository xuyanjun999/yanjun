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
    /// 块
    /// </summary>
    public class BlockEntity : BaseAcsRecTreeNodeEntity
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
        ///块分组
        ///</summary>
        [Description("块分组")]
        public string BlockGroup { get; set; }
        /// <summary>
        ///所属类型
        ///</summary>
        [Description("所属类型")]
        public int OwnerType { get; set; }

        [JsonIgnore]
        [NotMapped]
        public OwnerTypeEnum OwnerTypeEnum
        {
            get { return (OwnerTypeEnum)OwnerType; }
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
        ///块规格
        ///</summary>
        [Description("块规格")]
        public string BlockConfig { get; set; }
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
        /// 创建日期
        /// </summary>
        public DateTime CreateDate { get; set; }

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

        public IEnumerable<BlockParamEntity> BlockParams { get; set; }
    }

    /// <summary>
    /// 动态块所属类型枚举
    /// </summary>
    public enum OwnerTypeEnum
    {
        // <summary>
        /// 所有
        /// </summary>
        [Description("系统")]
        Default = 0,

        /// <summary>
        /// 系统参数
        /// </summary>
        [Description("公司")]
        Company = 10
    }
}
