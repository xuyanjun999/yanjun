using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yanjun.Framework.Code.Web.Dto
{
    public class ResponseDtoBase
    {
        public bool Success { get; set; }

        public string Message { get; set; }

        public object Entitys { get; set; }
    }
}
