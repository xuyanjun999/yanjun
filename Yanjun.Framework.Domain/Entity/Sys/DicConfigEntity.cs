using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yanjun.Framework.Domain.Entity.Sys
{
    public class DicConfigEntity : BaseTreeNodeEntity
    {
        /// <summary>
        /// 键名
        /// </summary>
        public string KeyName { get; set; }
        /// <summary>
        /// 键类型
        /// </summary>
        public int KeyType { get; set; }
        /// <summary>
        /// 键类型枚举
        /// </summary>
        [JsonIgnore]
        [NotMapped]
        public DicConfigKeyTypeEnum KeyTypeEnum
        {
            get
            {
                return (DicConfigKeyTypeEnum)KeyType;
            }
            set
            {
                KeyType = Convert.ToInt32(value);
            }
        }
        /// <summary>
        /// 英文键值
        /// </summary>
        public string EnKeyValue { get; set; }
        /// <summary>
        /// 中文键值
        /// </summary>
        public string CnKeyValue { get; set; }
        /// <summary>
        /// 父键值ID
        /// </summary>
        public long? ParentID { get; set; }
        /// <summary>
        /// 键显示次序
        /// </summary>
        public int SeqID { get; set; }
        /// <summary>
        /// 描述
        /// </summary>
        public string Des { get; set; }

        /// <summary>
        /// 获得父键
        /// </summary>
        public  DicConfigEntity Parent { get; set; }
        

        /// <summary>
        /// 节点显示名
        /// </summary>
        [NotMapped]
        public override string Text
        {
            get
            {
                return this.CnKeyValue;
            }
        }
    }

    public enum DicConfigKeyTypeEnum
    {
        /// <summary>
        /// 无
        /// </summary>
        [DescriptionAttribute("无")]
        None = 0,
        /// <summary>
        /// 国家
        /// </summary>
        [DescriptionAttribute("国家")]
        Country = 1,
        /// <summary>
        /// 省或辖市
        /// </summary>
        [DescriptionAttribute("省或辖市")]
        Province = 2,
        /// <summary>
        /// 市
        /// </summary>
        [DescriptionAttribute("城市")]
        City = 3,
        /// <summary>
        /// 货币
        /// </summary>
        [DescriptionAttribute("货币")]
        Currency = 4,
        /// <summary>
        /// 单位
        /// </summary>
        [DescriptionAttribute("单位")]
        Unit = 5,

        #region 配方范畴，1200+
        /// <summary>
        /// BOM模型类别
        /// </summary>
        [DescriptionAttribute("BOM模型类别")]
        ModelType = 1200,
        /// <summary>
        /// 工地模块类别
        /// </summary>
        [DescriptionAttribute("工地模块类别")]
        ModuleType = 1202,
        /// <summary>
        /// ODS类别
        /// </summary>
        [DescriptionAttribute("ODS类别")]
        OdsType = 1203,
        /// <summary>
        /// 组件类别
        /// </summary>
        [DescriptionAttribute("组件类别")]
        CompentType = 1204,
        /// <summary>
        /// 物料类别
        /// </summary>
        [DescriptionAttribute("物料类别")]
        PartType = 1205,
        /// <summary>
        /// 物料采购属性
        /// </summary>
        [DescriptionAttribute("物料采购属性")]
        PartPurchaseType = 1210,
        /// <summary>
        /// 物料包装状态
        /// </summary>
        [DescriptionAttribute("物料包装状态")]
        PartPackType = 1211,
        /// <summary>
        /// 参数类别
        /// </summary>
        [DescriptionAttribute("参数类别")]
        ParamType = 1220,
        /// <summary>
        /// 件号类别
        /// </summary>
        [DescriptionAttribute("件号类别")]
        PartNameType = 6,
        #endregion

        /// <summary>
        /// 厅门材料
        /// </summary>
        [DescriptionAttribute("厅门材料")]
        PSType = 2000,

        /// <summary>
        /// 钣金工单类型
        /// </summary>
        [DescriptionAttribute("钣金工单类型")]
        BJWOType = 2050,

    }
}
