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
        public virtual JsonResult IsLogin()
        {
            EntityResponseDto res = new EntityResponseDto();
            try
            {
                string ip = Request.UserHostAddress;
                StaffEntity staff = WebHelper.GetSessionObj(WebHelper.USER_LOGIN_SESSION) as StaffEntity;
                if (staff != null)
                {
                    res.Success = true;
                }
                else
                {
                    res.Success = false;
                }

            }
            catch (Exception ex)
            {
                res.Success = false;
                res.Message = ex.Message;
                Log.Error(ex);
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        [NotCheckUserAttribute]
        // GET: Org/Staff
        public virtual JsonResult Login(string userName, string pwd)
        {
            EntityResponseDto res = new EntityResponseDto();
            try
            {
                string ip = Request.UserHostAddress;
                if (string.IsNullOrEmpty(userName) || string.IsNullOrEmpty(pwd))
                {
                    throw new Exception("用户名和密码不能为空!");
                }
                StaffService.Repository.BeginTran();
                StaffEntity staff = StaffService.Login(userName, pwd, ip);
                if (staff != null)
                {
                    res.Dic.Add("user", staff);
                }
                else
                {
                    throw new Exception("登陆失败!");
                }

                StaffService.Repository.Commit();
                res.Success = true;
            }
            catch (Exception ex)
            {
                StaffService.Repository.Rollback();
                res.Success = false;
                res.Message = ex.Message;
                Log.Error(ex);
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        [NotCheckUserAttribute]
        public virtual JsonResult Logout()
        {
            EntityResponseDto res = new EntityResponseDto();
            try
            {
                string ip = Request.UserHostAddress;
                WebHelper.RemoveSession(WebHelper.USER_LOGIN_SESSION);
                res.Success = true;
            }
            catch (Exception ex)
            {
                res.Success = false;
                res.Message = ex.Message;
                Log.Error(ex);
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }
    }
}