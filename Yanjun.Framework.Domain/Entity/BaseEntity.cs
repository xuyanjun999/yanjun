using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using Newtonsoft.Json;

namespace Yanjun.Framework.Domain.Entity
{
    /// <summary>
    /// 数据表映射实体基类
    /// </summary>
    public class BaseEntity : IBaseEntity<long>
    {
        /// <summary>
        /// 每个表实例映射主键ID
        /// </summary>
        public long ID { get; set; }

        /// <summary>
        /// StatusEnum的EF映射辅助字段
        /// </summary>
        public int Status { get; set; }
        /// <summary>
        /// 数据记录状态
        /// </summary>
        [NotMapped]
        [JsonIgnore]
        public BaseEntityStatus StatusEnum
        {
            get
            {
                return (BaseEntityStatus)Status;
            }
            set
            {
                Status = Convert.ToInt32(value);
            }
        }
    }

}
