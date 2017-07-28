using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yanjun.Framework.Domain.Entity.Project;

namespace Yanjun.Framework.Mapping.Project
{
    public class DrawingTaskMap : EntityMapBase<DrawingTaskEntity>
    {
        public DrawingTaskMap() : base("SGEAP_WELL_DrawingTask")
        {

        }
    }
}
