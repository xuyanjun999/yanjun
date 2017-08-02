using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Mvc;
using Yanjun.Framework.Code.Web;
using Yanjun.Framework.Domain.Entity.Org;
using Yanjun.Framework.Mvc.Filter.Attribute;

namespace Yanjun.Framework.Mvc.Filter
{
    public class LoginFilterAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var notChecks = (NotCheckUserAttribute[])filterContext.ActionDescriptor.GetCustomAttributes(typeof(NotCheckUserAttribute), true);
            if (notChecks == null || notChecks.Length <= 0)
            {
                StaffEntity staff = WebHelper.GetSessionObj(WebHelper.USER_LOGIN_SESSION) as StaffEntity;
                if (staff == null)
                {
                    ViewResult loginView = new ViewResult();
                    loginView.ViewName = "/Views/Home/Login.cshtml";
                    filterContext.Result = loginView;
                }
            }
            // if(filterContext.Controller.ControllerContext.)
            base.OnActionExecuting(filterContext);
        }
    }
}