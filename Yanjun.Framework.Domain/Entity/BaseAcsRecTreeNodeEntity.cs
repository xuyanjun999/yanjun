using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;

namespace Yanjun.Framework.Domain.Entity
{
    /// <summary>
    /// 实现树节点接口和操作信息记录接口的实体基类
    /// </summary>
    public class BaseAcsRecTreeNodeEntity : BaseAcsRecEntity,ITreeNodeEntity
    {
        #region ITreeNodeEntity接口数据
        /// <summary>
        /// 是否末节点  节点数量大的，请不要判断是否是叶节点
        /// </summary>
        [NotMapped]
        public virtual bool Leaf { get; set; }
        /// <summary>
        /// 
        /// </summary>
        [NotMapped]
        public virtual string Text { get; set; }
        /// <summary>
        /// 
        /// </summary>
        [NotMapped]
        public virtual string IconRes { get; set; }
        /// <summary>
        /// 
        /// </summary>
        [NotMapped]
        public virtual bool Checked { get; set; }

        /// <summary>
        /// 是否展开
        /// </summary>
        [NotMapped]
        public virtual bool Expanded { get; set; }

        public virtual void FormatTreeNodeValue(object context)
        {
            
        }
        #endregion
    }
}
