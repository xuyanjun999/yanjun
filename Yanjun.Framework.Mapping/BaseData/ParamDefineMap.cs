using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yanjun.Framework.Domain.Entity.BaseData;

namespace Yanjun.Framework.Mapping.BaseData
{
    public class ParamDefineMap : EntityMapBase<ParamDefineEntity>
    {
        public ParamDefineMap() : base("SGEAP_DATA_ParamDefine")
        {
            //this.HasOptional(x => x.Parent).WithMany().HasForeignKey<long?>(x => x.ParentID);
        }
    }
}

