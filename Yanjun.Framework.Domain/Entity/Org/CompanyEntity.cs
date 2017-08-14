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
        ///编号
        ///</summary>
        [Description("编号")]
        public string Code { get; set; }
        /// <summary>
        ///名称
        ///</summary>
        [Description("名称")]
        public string Name { get; set; }
        /// <summary>
        ///地址
        ///</summary>
        [Description("地址")]
        public string Address { get; set; }
        /// <summary>
        ///电话
        ///</summary>
        [Description("电话")]
        public string Tel { get; set; }
        /// <summary>
        ///邮件
        ///</summary>
        [Description("邮件")]
        public string Email { get; set; }
        /// <summary>
        ///规模
        ///</summary>
        [Description("规模")]
        public string Scale { get; set; }
        /// <summary>
        ///级别
        ///</summary>
        [Description("级别")]
        public int Level { get; set; }
        /// <summary>
        ///描述
        ///</summary>
        [Description("描述")]
        public string Desc { get; set; }
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
