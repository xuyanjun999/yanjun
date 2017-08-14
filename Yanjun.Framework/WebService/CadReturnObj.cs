using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SGEAP.CadDrawingEntity
{
    public class CadReturnObj
    {
        public CadReturnObj()
        {
            Success = true;
        }
        public bool Success { get; set; }
        public string Message { get; set; }
        public bool TryAgain { get; set; }
    }
}
