using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yanjun.Framework.Domain.Entity.Data;

namespace Yanjun.Framework.Mapping.Data
{
    public class ModelBlockMap : EntityMapBase<ModelBlockEntity>
    {
        public ModelBlockMap() : base("SGEAP_DATA_ModelBlock")
        {
            this.HasRequired(x => x.Model).WithMany().HasForeignKey<long>(x => x.ModelID);
            this.HasRequired(x => x.ModelGroup).WithMany().HasForeignKey<long>(x => x.ModelGroupID);
            this.HasRequired(x => x.Block).WithMany().HasForeignKey<long>(x => x.BlockID);
        }
    }
}
