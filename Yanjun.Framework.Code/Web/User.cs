using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yanjun.Framework.Code.Web
{
    public class User
    {
        public long ID { get; set; }

        public string Name { get; set; }

        public string Code { get; set; }

        public string Email { get; set; }

        public long DeptID { get; set; }

        public string DeptName { get; set; }

        public string DeptCode { get; set; }

        public long CompanyID { get; set; }

        public string CompanyCode { get; set; }

        public string CompanyName { get; set; }
    }
}
