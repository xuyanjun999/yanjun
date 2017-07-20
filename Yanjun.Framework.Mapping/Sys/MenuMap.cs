using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yanjun.Framework.Domain.Entity.Sys;

namespace Yanjun.Framework.Mapping.Sys
{
    public class MenuMap : EntityMapBase<MenuEntity>
    {
        public MenuMap():base("sys_menu")
        {
            this.HasOptional(x => x.Parent).WithMany().HasForeignKey<long?>(x => x.ParentID);
        }
    }
}
