using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yanjun.Framework.Domain.Entity.Data;

namespace Yanjun.Framework.Mapping.Data
{
    public class BlockMap : EntityMapBase<BlockEntity>
    {
        public BlockMap():base("SGEAP_DATA_Block")
        {

        }
    }
}
