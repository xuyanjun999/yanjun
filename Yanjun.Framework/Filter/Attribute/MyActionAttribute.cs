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
                    repository.Commit();
                    repository.Dispose();
                }
            }
        }

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var controller = filterContext.Controller;

            var noTransaction = (NoTransactionAttribute[])filterContext.ActionDescriptor.GetCustomAttributes(typeof(NoTransactionAttribute), true);
            if (noTransaction == null || noTransaction.Length <= 0)
            {
                if (ReflectionUtil.HasPropertyInfo(controller, "Repository"))
                {
                    var repository = ReflectionUtil.GetPropertyValue(controller, "Repository") as IRepositoryBase;
                    if (repository != null)
                    {
                        repository.BeginTran();
                    }
                }
            }
        }

    }
}