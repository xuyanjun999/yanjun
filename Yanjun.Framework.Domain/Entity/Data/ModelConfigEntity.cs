using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yanjun.Framework.Domain.Entity.Data
{
    public class ModelConfigEntity : BaseAcsRecTreeNodeEntity
    {
        /// <summary>
        ///井道模型ID
        ///</summary>
        [Description("井道模型ID")]
        public long ModelID { get; set; }

        /// <summary>
        /// 井道模型
        /// </summary>
        public ModelEntity Model { get; set; }

        /// <summary>
        ///序号
        ///</summary>
        [Description("序号")]
        public decimal Seq { get; set; }
        /// <summary>
        ///块名称
        ///</summary>
        [Description("块名称")]
        public string Name { get; set; }
        /// <summary>
        ///块规则
        ///</summary>
        [Description("块规则")]
        public string BlockConfig { get; set; }
        /// <summary>
        ///插入点X坐标
        ///</summary>
        [Description("插入点X坐标")]
        public string InsertPointX { get; set; }
        /// <summary>
        ///插入点Y坐标
        ///</summary>
        [Description("插入点Y坐标")]
        public string InsertPointY { get; set; }
    }
}
