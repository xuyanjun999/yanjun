using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yanjun.Framework.Domain.Entity.Data;

namespace Yanjun.Framework.Mapping.Data
{
    public class BlockParamMap : EntityMapBase<BlockParamEntity>
    {
        public BlockParamMap() : base("SGEAP_DATA_BlockParam")
        {
            this.HasRequired(x => x.Block).WithMany().HasForeignKey<long>(x => x.BlockID);
            this.HasRequired(x => x.ParamDefine).WithMany().HasForeignKey<long>(x => x.ParamDefineID);
        }
    }
}
