using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yanjun.Framework.Code.Web.Dto
{
    public class EntityResponseDto : ResponseDtoBase
    {
        public int Count { get; set; }

        public Dictionary<string, object> Dic => new Dictionary<string, object>();
    }
}
