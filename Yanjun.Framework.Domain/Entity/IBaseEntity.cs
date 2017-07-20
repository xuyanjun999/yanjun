using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Yanjun.Framework.Domain.Entity
{
    /// <summary>
    /// 基实例接口
    /// </summary>
    public interface IBaseEntity<TKeyID> where TKeyID : IComparable
    {



        /// <summary>
        /// 每个表实例映射主键ID
        /// </summary>
        TKeyID ID { get; set; }
        /// <summary>
        /// StatusEnum的EF映射辅助字段
        /// </summary>
        int Status { get;}
        /// <summary>
        /// 数据记录状态
        /// </summary>
        BaseEntityStatus StatusEnum { get; set; }
    }

    /// <summary>
    /// 数据记录状态
    /// </summary>
    public enum BaseEntityStatus:int
    {
        /// <summary>
        /// 未指定标识
        /// </summary>
        Default = 0,
        /// <summary>
        /// 是否删除
        /// </summary>
        Delete = 1,
        /// <summary>
        /// 是否归档
        /// </summary>
        Archive = 2
    }
}
