using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yanjun.Framework.Data.Repository;

namespace Yanjun.Framework.Service
{
    public class ServiceBase : IDisposable
    {

        /// <summary>
        /// 日志对象
        /// </summary>
        public ILog Log { get; set; }

        /// <summary>
        /// 存储操作对象
        /// </summary>
        public IRepositoryBase Repository { get; set; }

        public void Dispose()
        {
           if(Repository!=null)
            {
                Repository.Dispose();
            }
        }
    }
}
