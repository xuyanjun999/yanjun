using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yanjun.Framework.Domain.Entity.Data
{
    public class ModelBlockEntity : BaseAcsRecTreeNodeEntity
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
        ///梯型分组ID
        ///</summary>
        [Description("梯型ID")]
        public long ModelGroupID { get; set; }

        /// <summary>
        /// 梯型分组
        /// </summary>
        public ModelEntity ModelGroup { get; set; }

        /// <summary>
        ///块
        ///</summary>
        [Description("块ID")]
        public long BlockID { get; set; }

        /// <summary>
        /// 块
        /// </summary>
        public BlockEntity Block { get; set; }

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
        /// <summary>
        ///描述
        ///</summary>
        [Description("描述")]
        public string Desc { get; set; }
    }
}
