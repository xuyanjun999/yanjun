using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yanjun.Framework.Data.Repository;

namespace Yanjun.Framework.Domain.Service
{
    public interface IServiceBase
    {
        /// <summary>
        /// 日志对象
        /// </summary>
         ILog Log { get; set; }

        /// <summary>
        /// 存储操作对象
        /// </summary>
        IRepositoryBase Repository { get; set; }
    }
}
