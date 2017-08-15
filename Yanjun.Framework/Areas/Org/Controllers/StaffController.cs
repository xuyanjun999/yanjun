using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Yanjun.Framework.Code.Web;
using Yanjun.Framework.Code.Web.Dto;
using Yanjun.Framework.Domain.Entity.Org;
using Yanjun.Framework.Domain.Service;
using Yanjun.Framework.Mvc.Filter.Attribute;

namespace Yanjun.Framework.Mvc.Areas.Org.Controllers
{


    public class StaffController : MyController<StaffEntity>
    {
        public IStaffService StaffService { get; set; }
        // GET: Org/Staff
        [NotCheckUserAttribute]
        [NoTransaction]
        public virtual JsonResult IsLogin()
        {
            EntityResponseDto res = new EntityResponseDto();

            string ip = Request.UserHostAddress;
            User user = Repository.GetCurrentUser();
            if (user != null)
            {
                res.Success = true;
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        [NotCheckUserAttribute]
        // GET: Org/Staff
        public virtual JsonResult Login(string userName, string pwd)
        {
            EntityResponseDto res = new EntityResponseDto();
            string ip = Request.UserHostAddress;
            if (string.IsNullOrEmpty(userName) || string.IsNullOrEmpty(pwd))
            {
                throw new Exception("用户名和密码不能为空!");
            }
            StaffEntity staff = StaffService.Login(userName, pwd, ip);
            if (staff != null)
            {
                res.Dic.Add("user", staff);
            }
            else
            {
                throw new Exception("登录失败!");
            }
            res.Success = true;
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        [NotCheckUserAttribute]
        [NoTransaction]
        public virtual JsonResult Logout()
        {
            EntityResponseDto res = new EntityResponseDto();
                string ip = Request.UserHostAddress;
                WebHelper.RemoveUser();
                res.Success = true;

            return Json(res, JsonRequestBehavior.AllowGet);
        }
    }
}