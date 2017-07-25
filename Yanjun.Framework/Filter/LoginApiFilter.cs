using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using Yanjun.Framework.Code.Web;
using Yanjun.Framework.Domain.Entity.Org;
using Yanjun.Framework.Mvc.Filter.Attribute;

namespace Yanjun.Framework.Mvc.Filter
{
    public class LoginApiFilter: ActionFilterAttribute
    {
        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            var notChecks =actionContext.ActionDescriptor.GetCustomAttributes<NotCheckUserAttribute>();
            if (notChecks == null||notChecks.Count<=0)
            {
                StaffEntity staff = WebHelper.GetSessionObj(WebHelper.USER_LOGIN_SESSION) as StaffEntity;
                if (staff == null)
                {
                    actionContext.Response = new System.Net.Http.HttpResponseMessage(System.Net.HttpStatusCode.Forbidden);
                }
            }
            base.OnActionExecuting(actionContext);
        }
    }
}