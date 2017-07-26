using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yanjun.Framework.Domain.Entity.Org;

namespace Yanjun.Framework.Mapping.Org
{
    public class CompanyMap : EntityMapBase<CompanyEntity>
    {
        public CompanyMap() : base("SGEAP_CORE_Company")
        {
            //this.HasOptional(x => x.Parent).WithMany().HasForeignKey<long?>(x => x.ParentID);
        }
    }
}
