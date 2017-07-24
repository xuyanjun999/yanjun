using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;
using Yanjun.Framework.Domain.Entity;

namespace Yanjun.Framework.Domain.Entity.Org
{
    /// <summary>
    /// 员工表映射类
    /// </summary>
    public class StaffEntity : BaseAcsRecTreeNodeEntity
    {

        /// <summary>
        /// 员工工号
        /// </summary>
        public string Code { get; set; }

        /// <summary>
        /// 英文名
        /// </summary>
        public string EnName { get; set; }

        /// <summary>
        /// 密码
        /// </summary>
        public string Pwd { get; set; }
        /// <summary>
        /// 中文名
        /// </summary>
        public string CnName { get; set; }
        /// <summary>
        /// 性别
        /// </summary>
        public bool Gender { get; set; }

        /// <summary>
        /// 头像路径
        /// </summary>
        public string PortraitPath { get; set; }
        /// <summary>
        /// 电话
        /// </summary>
        public string Tel { get; set; }
        /// <summary>
        /// 邮箱
        /// </summary>
        public string Email { get; set; }
        /// <summary>
        /// 手机
        /// </summary>
        public string Mobile { get; set; }
        /// <summary>
        /// 地址
        /// </summary>
        public string Address { get; set; }
        /// <summary>

        public string LastLoginIp { get; set; }


        [NotMapped]
        public override string Text
        {
            get
            {
                return CnName;
            }
        }
    }
}
