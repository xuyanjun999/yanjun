﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Yanjun.Framework.Code.Web.Dto;
using Yanjun.Framework.Domain.Entity.Project;
using Yanjun.Framework.Domain.Service.ProjectInfo;
using Yanjun.Framework.Domain.Service.Sys;

namespace Yanjun.Framework.Mvc.Areas.Project.Controllers
{
    public class ProjectController : Areas.MyController<ProjectEntity>
    {

        public IProjectService ProjectService { get; set; }

        public IMenuService MenuService { get; set; }

        public JsonResult CreateTask(long projectId)
        {
            EntityResponseDto res = new EntityResponseDto();
            try
            {
                ProjectService.Repository.BeginTran();
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