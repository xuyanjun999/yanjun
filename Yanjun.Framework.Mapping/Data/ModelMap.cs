using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yanjun.Framework.Domain.Entity.Data;

namespace Yanjun.Framework.Mapping.Data
{
    public class ModelMap : EntityMapBase<ModelEntity>
    {
        public ModelMap() : base("SGEAP_DATA_Model")
        {

        }
    }
}
