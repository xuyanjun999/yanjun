using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yanjun.Framework.Domain.Cad
{
    public class CadTaskBlockArgs
    {
        public CadTaskBlockArgs()
        {
            BlockParams = new List<CadTaskParamArgs>();
            InsertPoint = new double[3] { 0, 0, 0 };
        }
        /// <summary>
        /// 块名称
        /// </summary>
        public string BlockName { get; set; }
        /// <summary>
        /// 块插入坐标 double[3] {0,0,0}
        /// </summary>
        public double[] InsertPoint { get; set; }
        /// <summary>
        /// 块参数集合
        /// </summary>
        public List<CadTaskParamArgs> BlockParams { get; set; }
    }
}
