using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using Yanjun.Framework.Domain.Service;

namespace Yanjun.Framework.Mvc.Controllers
{
    public class HomeController : Controller
    {
        public IStaffService StaffService { get; set; }

        public ActionResult Index()
        {
            var c = GlobalConfiguration.Configuration;
            int a = c.Formatters.JsonFormatter.GetHashCode();
            return View();
        }

        public ActionResult Login()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}