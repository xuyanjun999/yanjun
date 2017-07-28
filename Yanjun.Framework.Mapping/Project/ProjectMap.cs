using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yanjun.Framework.Domain.Entity.Project;

namespace Yanjun.Framework.Mapping.Project
{
    public class ProjectMap : EntityMapBase<ProjectEntity>
    {
        public ProjectMap() : base("SGEAP_WELL_Project")
        {
            this.HasRequired(x => x.Company).WithMany().HasForeignKey<long>(x => x.CompanyID);
            this.HasRequired(x => x.User).WithMany().HasForeignKey<long>(x => x.UserID);
            this.HasOptional(x => x.DrawingTask).WithMany().HasForeignKey<long?>(x => x.DrawingTaskID);
        }
    }
}
