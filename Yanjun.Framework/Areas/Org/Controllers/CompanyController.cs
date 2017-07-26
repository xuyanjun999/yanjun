using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Yanjun.Framework.Code.Web.Dto;
using Yanjun.Framework.Domain.Entity.Org;

namespace Yanjun.Framework.Mvc.Areas.Org.Controllers
{
    public class CompanyController : Areas.MyController<CompanyEntity>
    {
        // GET: Org/Company

        public  JsonResult Delete(long[] ids)
        {
            EntityResponseDto res = new EntityResponseDto();
            try
            {
                Repository.BeginTran();
                Repository.Delete<CompanyEntity>(ids);
                Repository.Commit();
                res.Success = true;
            }
            catch (Exception ex)
            {
                Repository.Rollback();
                res.Success = false;
                res.Message = ex.Message;
                Log.Error(ex);
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }
    }
}