using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yanjun.Framework.Domain.Entity.Org;

namespace Yanjun.Framework.Domain.Service
{
    public interface IStaffService:IServiceBase
    {
        
        StaffEntity Login(string userName, string pwd, string ip);

    }
}
