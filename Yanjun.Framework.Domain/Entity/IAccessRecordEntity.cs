using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Yanjun.Framework.Domain.Entity
{
    /// <summary>
    /// 表操作记录接口
    /// </summary>
    public interface IAccessRecordEntity<TKeyID>
    {
        /// <summary>
        /// 创建人相关ID
        /// </summary>
        TKeyID CreateBy { get; set; }
        /// <summary>
        /// 创建相关时间
        /// </summary>
        DateTime CreateOn { get; set; }
        /// <summary>
        /// 更新人相关ID
        /// </summary>
        TKeyID UpdateBy { get; set; }
        /// <summary>
        /// 更新相关时间
        /// </summary>
        DateTime UpdateOn { get; set; }
    }
}
