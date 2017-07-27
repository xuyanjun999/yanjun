using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yanjun.Framework.Domain.Entity.Org;

namespace Yanjun.Framework.Mapping.Org
{
    public class StaffMap : EntityMapBase<StaffEntity>
    {
        public StaffMap() : base("SGEAP_CORE_User")
        {
            this.HasRequired(x => x.Company).WithMany().HasForeignKey<long>(x => x.CompanyID);
        }
    }
}
