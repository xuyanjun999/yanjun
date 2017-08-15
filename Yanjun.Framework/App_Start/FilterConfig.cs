using System.Web;
using System.Web.Mvc;
using Yanjun.Framework.Mvc.Filter;
using Yanjun.Framework.Mvc.Filter.Attribute;

namespace Yanjun.Framework.Mvc
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {

            filters.Add(new MyActionAttribute());
            filters.Add(new LoginFilterAttribute());
            filters.Add(new MyExceptionHandleAttribute());
            // filters.Add(new HandleErrorAttribute());
        }
    }
}
