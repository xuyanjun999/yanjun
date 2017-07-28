using System.Web.Mvc;

namespace Yanjun.Framework.Mvc.Areas.Project
{
    public class ProjectAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "ProjectInfo";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "Project_default",
                "ProjectInfo/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}