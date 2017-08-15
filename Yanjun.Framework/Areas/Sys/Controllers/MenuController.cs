using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Yanjun.Framework.Code.Web.Dto;
using Yanjun.Framework.Domain.Entity.Sys;
using Yanjun.Framework.Mvc.Filter.Attribute;

namespace Yanjun.Framework.Mvc.Areas.Sys.Controllers
{
    public class MenuController : MyController<MenuEntity>
    {

        [NoTransaction]
        public virtual JsonResult GetMenu(long? parentId)
        {
            EntityResponseDto res = new EntityResponseDto();
            res.Entitys = Repository.QueryAll<MenuEntity>(x => x.ParentID == parentId);
            res.Success = true;
            return MyJson(res, JsonRequestBehavior.AllowGet);
        }
    }
}