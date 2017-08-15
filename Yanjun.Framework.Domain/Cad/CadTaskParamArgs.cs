using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yanjun.Framework.Domain.Cad
{
    public class CadTaskParamArgs
    {
        public CadTaskParamArgs()
        {
            DataType = "string";
        }
        /// <summary>
        /// 参数代码
        /// </summary>
        public string ParamCode { get; set; }
        /// <summary>
        /// 参数值
        /// </summary>
        public dynamic ParamValue { get; set; }
        /// <summary>
        /// 参数值类型 double / string
        /// </summary>
        public string DataType { get; set; }
        /// <summary>
        /// 参数使用类型 属性 / 参数
        /// </summary>
        public DrawingTypeEnum DrawingType { get; set; }
    }


    public enum DrawingTypeEnum
    {
        /// <summary>
        /// 参数 - 特性
        /// </summary>
        Param = 0,

        /// <summary>
        /// 属性
        /// </summary>
        Attribute = 1
    }
}
