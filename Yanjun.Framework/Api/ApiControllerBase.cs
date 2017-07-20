using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Results;
using Yanjun.Framework.Data.Repository;

namespace Yanjun.Framework.Mvc.Api
{

    public class ApiControllerBase : ApiController
    {
        /// <summary>
        /// 日志对象
        /// </summary>
        public ILog Log { get; set; }

        /// <summary>
        /// 存储操作对象
        /// </summary>
        public IRepositoryBase Repository { get; set; }
    }
}