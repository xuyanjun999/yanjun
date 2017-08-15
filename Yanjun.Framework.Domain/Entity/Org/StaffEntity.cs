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
        /// 密码
        /// </summary>
        public string Pwd { get; set; }
        /// <summary>
        /// 中文名
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 部门
        /// </summary>
        public string Dept { get; set; }

        /// <summary>
        /// 电话
        /// </summary>
        /// <summary>
        /// 邮箱
        /// </summary>
        public string Email { get; set; }

        /// <summary>

        public string LastLoginIp { get; set; }



        public long CompanyID { get; set; }


        public CompanyEntity Company { get; set; }


        [NotMapped]
        public override string Text
        {
            get
            {
                return Name;
            }
        }
    }
}
