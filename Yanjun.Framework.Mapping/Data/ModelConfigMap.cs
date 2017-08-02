using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yanjun.Framework.Domain.Entity.Data;

namespace Yanjun.Framework.Mapping.Data
{
    public class ModelConfigMap : EntityMapBase<ModelConfigEntity>
    {
        public ModelConfigMap() : base("SGEAP_DATA_ModelConfig")
        {
            this.HasRequired(x => x.Model).WithMany().HasForeignKey<long>(x => x.ModelID);
        }
    }
}
