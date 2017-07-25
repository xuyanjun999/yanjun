using System.Web;
using System.Web.Mvc;
using Yanjun.Framework.Mvc.Filter;

namespace Yanjun.Framework.Mvc
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new LoginFilterAttribute());
            filters.Add(new HandleErrorAttribute());
        }
    }
}
