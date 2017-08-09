using System.Web.Mvc;

namespace LiftNext.Areas.TreeQuery
{
    public class TreeQueryAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "TreeQuery";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "TreeQuery_default",
                "TreeQuery/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}