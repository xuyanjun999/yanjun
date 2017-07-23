using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel;
using Newtonsoft.Json;
using Yanjun.Framework.Domain.Entity.Sys;

namespace Yanjun.Framework.Domain.Entity.Org
{
    /// <summary>
    /// 公司表映射实例
    /// </summary>
    public class CompanyEntity : BaseAcsRecTreeNodeEntity
    {

        /// <summary>
        /// 英文名
        /// </summary>
        public string EnName { get; set; }
        /// <summary>
        /// 中文名
        /// </summary>
        public string CnName { get; set; }
        /// <summary>
        /// 公司简称
        /// </summary>
        public string ShortName { get; set; }
        /// <summary>
        /// 公司代码
        /// </summary>
        public string Code { get; set; }
        /// <summary>
        /// 公司描述
        /// </summary>
        public string Des { get; set; }
        /// <summary>
        /// 注册资金
        /// </summary>
        public Decimal? Capital { get; set; }
        /// <summary>
        /// 注册时间
        /// </summary>
        public DateTime? RegisterDate { get; set; }
        /// <summary>
        /// 公司类型
        /// </summary>
        public int CompType { get; set; }
        /// <summary>
        /// 公司类型枚举
        /// </summary>
        [JsonIgnore]
        [NotMapped]
        public CompanyTypeEnum CompTypeEnum
        {
            get
            {
                return (CompanyTypeEnum)CompType;
            }
            set
            {
                CompType = Convert.ToInt32(value);
            }
        }
        /// <summary>
        /// 财经年
        /// </summary>
        public int? FinanceYear { get; set; }
        /// <summary>
        /// Logo路径
        /// </summary>
        public string LogoPath { get; set; }
        /// <summary>
        /// 货币类型字典关系键
        /// </summary>
        public string CurrencyTypeKey { get; set; }
        /// <summary>
        /// 公司主页
        /// </summary>
        public string Homepage { get; set; }
        /// <summary>
        /// 公司邮编
        /// </summary>
        public string PostCode { get; set; }
        /// <summary>
        /// 公司电话
        /// </summary>
        public string Phone { get; set; }
        /// <summary>
        /// 传真
        /// </summary>
        public string Fax { get; set; }
        /// <summary>
        /// 开户银行
        /// </summary>
        public string Bank { get; set; }
        /// <summary>
        /// 银行账号
        /// </summary>
        public string Account { get; set; }
        /// <summary>
        /// 单位税号
        /// </summary>
        public string Tax { get; set; }
        /// <summary>
        /// 详细地址
        /// </summary>
        public string Address { get; set; }
        /// <summary>
        /// 联系人
        /// </summary>
        public string ContactPerson { get; set; }
        /// <summary>
        /// 联系人电话
        /// </summary>
        public string ContactTelephone { get; set; }
        /// <summary>
        /// 父公司ID
        /// </summary>
        public long? ParentID { get; set; }
        /// <summary>
        /// 法人代表
        /// </summary>
        public string LegalPer { get; set; }
        /// <summary>
        /// 委托人
        /// </summary>
        public string ConsignPer { get; set; }

       
        [NotMapped]
        public override string Text
        {
            get
            {
                return CnName;
            }
        }

        /// <summary>
        /// 国家类字典关系键ID
        /// </summary>
        public long? CountryDicID { get; set; }
        /// <summary>
        /// 国家
        /// </summary>
          [JsonIgnore]
        public  DicConfigEntity Country { get; set; }

        /// <summary>
        /// 省类字典关系键ID
        /// </summary>
        public long? ProvinceDicID { get; set; }
        /// <summary>
        /// 省
        /// </summary>
          [JsonIgnore]
        public  DicConfigEntity Province { get; set; }

        /// <summary>
        /// 城市类字典关系键ID
        /// </summary>
        public long? CityDicID { get; set; }
        /// <summary>
        /// 城市
        /// </summary>
          [JsonIgnore]
        public  DicConfigEntity City { get; set; }

        /// <summary>
        /// 父公司
        /// </summary>
        public  CompanyEntity Parent { get; set; }

    }

    /// <summary>
    /// 公司类型
    /// </summary>
    public enum CompanyTypeEnum
    {
        /// <summary>
        /// 本公司
        /// </summary>
        [DescriptionAttribute("本公司")]
        Owner = 0,
        /// <summary>
        /// 供应商
        /// </summary>
        [DescriptionAttribute("供应商")]
        Supplier = 2,
        /// <summary>
        /// 客户
        /// </summary>
        [DescriptionAttribute("客户")]
        Client = 4,
        /// <summary>
        /// 代理商
        /// </summary>
        [DescriptionAttribute("代理商")]
        Agent = 8,
        /// <summary>
        ///子公司 
        /// </summary>
        [DescriptionAttribute("子公司")]
        SubCompany = 16,
        /// <summary>
        /// 其他类型
        /// </summary>
        [DescriptionAttribute("其他类型")]
        Other = 32
    }
}
