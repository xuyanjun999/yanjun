using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Yanjun.Framework.Code.Web;
using Yanjun.Framework.Code.Web.Dto;
using Yanjun.Framework.Domain.Entity.Data;
using Yanjun.Framework.Domain.Entity.Org;

namespace LiftNext.Areas.Data.Controllers
{
    public class ModelController : Areas.MyController<ModelEntity>
    {
        [HttpPost]
        public override JsonResult Add(ModelEntity entity)
        {
            RestResponseDto res = new RestResponseDto();
            try
            {
                Repository.BeginTran();
                entity.CreateUser = ((StaffEntity)WebHelper.GetSessionObj(WebHelper.USER_LOGIN_SESSION)).Name;
                entity.CreateDate = DateTime.Now;
                entity.LastUpdate = DateTime.Now;
                Repository.Insert(entity);
                res.Entitys = new object[] { Repository.QueryFirst<ModelEntity>(x => x.ID == entity.ID) };
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
            return MyJson(res);
        }
    }
}