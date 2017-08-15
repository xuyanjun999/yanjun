using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yanjun.Framework.Domain.Cad;
using Yanjun.Framework.Domain.Entity.Data;
using Yanjun.Framework.Domain.Entity.Project;
using Yanjun.Framework.Domain.Service.ProjectInfo;

namespace Yanjun.Framework.Service.ProjectInfo
{
    public class ProjectService : ServiceBase, IProjectService
    {
        public void CreateTask(long projectId)
        {
            ProjectEntity project = Repository.QueryFirst<ProjectEntity>(x => x.ID == projectId, new string[] { "Company" });
            DrawingTaskEntity task = new DrawingTaskEntity()
            {
                CompanyName = project.Company.Name,
                TaskCode = project.ProjectNo,
                TaskDate = DateTime.Now,
                TaskOwner = project.CreateUser
            };
            Repository.Insert<DrawingTaskEntity>(task);
            project.DrawingTaskID = task.ID;
            Repository.Update<ProjectEntity>(project, x => x.DrawingTaskID);

            CadTaskArgs drawingArg = new CadTaskArgs()
            {
                TaskID = task.ID,
                CompanyName = task.CompanyName,
                TaskCode = task.TaskCode,
                TaskDate = task.TaskDate,
                TaskOwner = task.TaskOwner
            };

            List<BlockEntity> blocks = Repository.QueryAll<BlockEntity>(c=>c.Status == 0).Take(10).ToList();
            foreach (var item in blocks)
            {
                drawingArg.Blocks.Add(new CadTaskBlockArgs()
                {
                    BlockName = item.Name,
                });
            }

            JsonSerializerSettings setting = new JsonSerializerSettings();
            setting.NullValueHandling = NullValueHandling.Ignore;

            string json = JsonConvert.SerializeObject(drawingArg, setting);

            WebReference.CadClientService service = new WebReference.CadClientService();
            service.CreateCadDrawingTask(json, task.ID.ToString());
        }
    }
}
