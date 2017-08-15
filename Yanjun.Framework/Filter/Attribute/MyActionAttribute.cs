using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Yanjun.Framework.Code.Util;
using Yanjun.Framework.Data.Repository;

namespace Yanjun.Framework.Mvc.Filter.Attribute
{
    public class MyActionAttribute : ActionFilterAttribute
    {


        public override void OnResultExecuted(ResultExecutedContext filterContext)
        {
            var controller = filterContext.Controller;
            if (ReflectionUtil.HasPropertyInfo(controller, "Repository"))
            {
                var repository = ReflectionUtil.GetPropertyValue(controller, "Repository") as IRepositoryBase;
                if (repository != null)
                {
                    repository.Dispose();
                }
            }
        }

    }
}