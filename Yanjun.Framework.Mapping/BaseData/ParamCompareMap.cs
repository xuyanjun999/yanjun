using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yanjun.Framework.Domain.Entity.BaseData;
using Yanjun.Framework.Domain.Entity.Data;

namespace Yanjun.Framework.Mapping.BaseData
{
    public class ParamCompareMap : EntityMapBase<ParamCompareEntity>
    {
        public ParamCompareMap() : base("SGEAP_DATA_ParamCompare")
        {
            this.HasRequired(x => x.ParamDefine).WithMany().HasForeignKey<long>(x => x.ParamDefineID);
        }
    }
}
