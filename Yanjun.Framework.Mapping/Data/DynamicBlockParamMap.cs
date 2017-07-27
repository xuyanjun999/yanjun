using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yanjun.Framework.Domain.Entity.Data;

namespace Yanjun.Framework.Mapping.Data
{
    public class DynamicBlockParamMap : EntityMapBase<DynamicBlockParamEntity>
    {
        public DynamicBlockParamMap() : base("SGEAP_DATA_DynamicBlockParam")
        {
            this.HasRequired(x => x.DynamicBlock).WithMany().HasForeignKey<long>(x => x.DynamicBlockID);
            this.HasRequired(x => x.ParamDefine).WithMany().HasForeignKey<long>(x => x.ParamDefineID);
        }
    }
}
