using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Yanjun.Framework.Code.Web;
using Yanjun.Framework.Code.Web.Dto;
using Yanjun.Framework.Domain.Entity.Org;
using Yanjun.Framework.Domain.Entity.Project;
using Yanjun.Framework.Domain.Service.ProjectInfo;
using Yanjun.Framework.Domain.Service.Sys;

namespace Yanjun.Framework.Mvc.Areas.Project.Controllers
{
    public class ProjectController : Areas.MyController<ProjectEntity>
    {
        public override JsonResult Add(ProjectEntity entity)
        {
            var user = (StaffEntity)WebHelper.GetSessionObj(WebHelper.USER_LOGIN_SESSION);
            entity.UserID = user.ID;
            entity.CompanyID = user.CompanyID;
            entity.CreateUser = user.Name;
            entity.CreateDate = DateTime.Now;
            return base.Add(entity);
        }

        public IProjectService ProjectService { get; set; }

        public IMenuService MenuService { get; set; }

        public JsonResult CreateTask(long projectId)
        {
            EntityResponseDto res = new EntityResponseDto();
            try
            {
                ProjectService.Repository.BeginTran();
                MenuService.Repository.QueryFirst<ProjectEntity>(x => x.ID == 10);
                ProjectService.CreateTask(projectId);
                ProjectService.Repository.Commit();
                res.Success = true;
            }
            catch (Exception ex)
            {
                ProjectService.Repository.Rollback();
                res.Success = false;
                Log.Error(ex);
            }
            return MyJson(res);
        }
    }
}