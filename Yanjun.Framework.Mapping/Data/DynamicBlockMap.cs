using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yanjun.Framework.Domain.Entity.Data;

namespace Yanjun.Framework.Mapping.Data
{
    public class DynamicBlockMap : EntityMapBase<DynamicBlockEntity>
    {
        public DynamicBlockMap():base("SGEAP_DATA_DynamicBlock")
        {

        }
    }
}
