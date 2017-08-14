using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Yanjun.Framework.Code.Web.Dto;
using Yanjun.Framework.Domain.Entity.Sys;

namespace LiftNext.Areas.Sys.Controllers
{
    public class MenuController : MyController<MenuEntity>
    {
        // GET: Sys/Menu
        public virtual JsonResult GetMenu(long? parentId)
        {
            EntityResponseDto res = new EntityResponseDto();
            try
            {
                res.Entitys = Repository.QueryAll<MenuEntity>(x => x.ParentID == parentId);
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