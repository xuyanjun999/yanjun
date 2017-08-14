using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Yanjun.Framework.Code.Web;
using Yanjun.Framework.Domain.Entity.Data;
using Yanjun.Framework.Domain.Entity.Org;

namespace Yanjun.Framework.Mvc.Areas.Data.Controllers
{
    public class BlockController : Areas.MyController<BlockEntity>
    {
        public override JsonResult Add(BlockEntity entity)
        {
            var user = (StaffEntity)WebHelper.GetSessionObj(WebHelper.USER_LOGIN_SESSION);
            entity.CreateUser = user.Name;
            entity.CreateDate = DateTime.Now;
            return base.Add(entity);
        }
    }
}