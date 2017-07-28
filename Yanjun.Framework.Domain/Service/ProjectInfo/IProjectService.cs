using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yanjun.Framework.Domain.Service.ProjectInfo
{
    public interface IProjectService : IServiceBase
    {
        void CreateTask(long projectId);
    }
}
