using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yanjun.Framework.Domain.Entity.Data
{
    public class ModelGroupEntity : BaseAcsRecTreeNodeEntity
    {
        /// <summary>
        ///梯型ID
        ///</summary>
        [Description("梯型ID")]
        public long ModelID { get; set; }

        /// <summary>
        /// 梯型
        /// </summary>
        public ModelEntity Model { get; set; }

        /// <summary>
        ///序号
        ///</summary>
        [Description("序号")]
        public decimal Seq { get; set; }
        /// <summary>
        ///块分组
        ///</summary>
        [Description("块分组")]
        public string BlockGroup { get; set; }
        /// <summary>
        ///检测规则
        ///</summary>
        [Description("检测规则")]
        public string CheckConfig { get; set; }
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
        /// <summary>
        ///描述
        ///</summary>
        [Description("描述")]
        public string Desc { get; set; }
    }
}
