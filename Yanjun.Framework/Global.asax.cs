using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Yanjun.Framework.Mvc.App_Start;

namespace Yanjun.Framework.Mvc
{

 

    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AutoFacConfig.Register();

            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }


        //private const string WebApiPrefix = "APi";
        //private static string WebApiExecutePath = string.Format("~/{0}", WebApiPrefix);

        //private bool isWebAPiRequest()
        //{
        //    return HttpContext.Current.Request.AppRelativeCurrentExecutionFilePath.StartsWith(WebApiExecutePath, StringComparison.CurrentCultureIgnoreCase);
        //}

        //protected void Application_PostAuthorizeRequest()
        //{
        //    if (isWebAPiRequest())
        //    {
        //        HttpContext.Current.SetSessionStateBehavior(System.Web.SessionState.SessionStateBehavior.Required);
        //    }
        //}
    }
}
