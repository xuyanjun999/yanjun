using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yanjun.Framework.Domain.Entity.Data;

namespace Yanjun.Framework.Mapping.Data
{
    public class ModelGroupMap : EntityMapBase<ModelGroupEntity>
    {
        public ModelGroupMap() : base("SGEAP_DATA_ModelGroup")
        {
            this.HasRequired(x => x.Model).WithMany().HasForeignKey<long>(x => x.ModelID);
        }
    }
}
