using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Yanjun.Framework.Code.Util;
using Yanjun.Framework.Data.Repository;

namespace Yanjun.Framework.Mvc.Filter.Attribute
{
    public class MyExceptionHandleAttribute : FilterAttribute, IExceptionFilter
    {
        public void OnException(ExceptionContext filterContext)
        {
            if (filterContext.RequestContext.HttpContext.Request.IsAjaxRequest())
            {
                var controller = filterContext.Controller;
                if (ReflectionUtil.HasPropertyInfo(controller, "Repository"))
                {
                    var repository = ReflectionUtil.GetPropertyValue(controller, "Repository") as IRepositoryBase;
                    if (repository != null)
                    {
                        repository.Rollback();
                        repository.Dispose();
                    }
                }
                if (ReflectionUtil.HasPropertyInfo(controller, "Log"))
                {
                    var log = ReflectionUtil.GetPropertyValue(controller, "Log") as ILog;
                    if (log != null)
                    {
                        log.Error(filterContext.Exception);
                    }
                }

                filterContext.HttpContext.Response.StatusCode = (int)HttpStatusCode.OK;
                filterContext.ExceptionHandled = true;
                filterContext.Result = new JsonResult
                {
                    Data = new
                    {
                        Success = false,
                        Message = filterContext.Exception.Message
                    },
                    JsonRequestBehavior = JsonRequestBehavior.AllowGet
                };
            }

        }
    }
}