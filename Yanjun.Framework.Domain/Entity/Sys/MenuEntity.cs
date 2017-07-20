using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yanjun.Framework.Domain.Entity.Sys
{
    public class MenuEntity : BaseAcsRecTreeNodeEntity
    {
        /// <summary>
        /// 菜单名字
        /// </summary>

        public string Name { get; set; }
        /// <summary>
        /// 图标资源
        /// </summary>
        public string IconResource { get; set; }
        /// <summary>
        /// 是否可见
        /// </summary>
        public bool IsVisible { get; set; }
        /// <summary>
        /// 菜单描述
        /// </summary>
        public string Remark { get; set; }
        /// <summary>
        /// 菜单次序
        /// </summary>
        public int SequenceIndex { get; set; }
        /// <summary>
        /// 菜单标识码
        /// </summary>
        public string Code { get; set; }
        /// <summary>
        /// 菜单模块相对位置
        /// </summary>
        public string Url { get; set; }

        /// <summary>
        /// 父菜单ID
        /// </summary>
        public long? ParentID { get; set; }

        /// <summary>
        /// 父菜单对象
        /// </summary>
        public MenuEntity Parent { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [NotMapped]
        public override string Text
        {
            get
            {
                return this.Name;
            }
        }
        /// <summary>
        /// 
        /// </summary>
        [NotMapped]
        public override string IconRes
        {
            get
            {
                return this.IconResource;
            }
        }
    }
}
