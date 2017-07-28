using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Results;
using System.Web.Mvc;
using Yanjun.Framework.Code.Web;
using Yanjun.Framework.Code.Web.Dto;
using Yanjun.Framework.Domain.Entity.Org;
using Yanjun.Framework.Domain.Entity.Project;

namespace Yanjun.Framework.Mvc.Api.ProjectInfo
{
    public class ProjectController : RestApiController<ProjectEntity>
    {
        [HttpPost]
        public override JsonResult<RestResponseDto> Post(ProjectEntity entity)
        {
            RestResponseDto res = new RestResponseDto();
            try
            {
                Repository.BeginTran();
                var user= (StaffEntity)WebHelper.GetSessionObj(WebHelper.USER_LOGIN_SESSION);
                entity.UserID = user.ID;
                entity.CompanyID = user.CompanyID;
                entity.CreateUser = user.Name;
                entity.CreateDate = DateTime.Now;
                Repository.Insert(entity);
                res.Entitys = new object[] { Repository.QueryFirst<ProjectEntity>(x => x.ID == entity.ID) };
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
            return Json<RestResponseDto>(res);
        }
    }
}