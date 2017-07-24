using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Yanjun.Framework.Code.Web;
using Yanjun.Framework.Code.Web.Dto;
using Yanjun.Framework.Domain.Entity.Org;
using Yanjun.Framework.Domain.Service;

namespace Yanjun.Framework.Mvc.Areas.Org.Controllers
{
    public class StaffController : MyController<StaffEntity>
    {
        IStaffService StaffService { get; set; }
        // GET: Org/Staff
        public virtual JsonResult IsLogin(CommonAjaxArgs args)
        {
            EntityResponseDto res = new EntityResponseDto();
            try
            {
                long id = args.GetLong("id").Value;
                string ip = Request.UserHostAddress;
                StaffEntity staff = WebHelper.GetSessionObj(WebHelper.USER_LOGIN_SESSION) as StaffEntity;
                if (staff == null)
                {
                    res.Dic.Add("isLogin", false);
                }
                else
                {
                    if (staff.LastLoginIp == ip)
                    {
                        res.Dic.Add("isLogin", true);
                    }
                    else
                    {
                        res.Dic.Add("isLogin", false);
                    }

                }
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

        // GET: Org/Staff
        public virtual JsonResult Login(CommonAjaxArgs args)
        {
            EntityResponseDto res = new EntityResponseDto();
            try
            {
                StaffService.Repository.BeginTran();
                string userName = args.GetStr("userName");
                string pwd = args.GetStr("pwd");
                string ip = Request.UserHostAddress;
                if(string.IsNullOrEmpty(userName)||string.IsNullOrEmpty(pwd))
                {
                    throw new Exception("用户名和密码不能为空!");
                }
                StaffService.Login(userName,pwd,ip);

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
    }
}