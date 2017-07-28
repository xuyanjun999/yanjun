using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yanjun.Framework.Domain.Entity.Org;

namespace Yanjun.Framework.Domain.Entity.Project
{
    public class ProjectEntity : BaseAcsRecTreeNodeEntity
    {
        /// <summary>
        ///公司ID
        ///</summary>
        [Description("公司ID")]
        public long CompanyID { get; set; }


        public CompanyEntity Company { get; set; }

        /// <summary>
        ///用户ID
        ///</summary>
        [Description("用户ID")]
        public long UserID { get; set; }


        public StaffEntity User { get; set; }

        /// <summary>
        ///项目代码
        ///</summary>
        [Description("项目代码")]
        public string ProjectNo { get; set; }
        /// <summary>
        ///项目名称
        ///</summary>
        [Description("项目名称")]
        public string ProjectName { get; set; }
        /// <summary>
        ///
        ///</summary>
        [Description("")]
        public string ContractNo { get; set; }
        /// <summary>
        ///
        ///</summary>
        [Description("")]
        public string CustomerName { get; set; }
        /// <summary>
        ///创建用户
        ///</summary>
        [Description("创建用户")]
        public string CreateUser { get; set; }
        /// <summary>
        ///创建日期
        ///</summary>
        [Description("创建日期")]
        public DateTime CreateDate { get; set; }
        /// <summary>
        ///项目状态
        ///</summary>
        [Description("项目状态")]
        public int ProjectStatus { get; set; }
        /// <summary>
        ///井道模型ID
        ///</summary>
        [Description("井道模型ID")]
        public long? ModelID { get; set; }
        /// <summary>
        ///版本号
        ///</summary>
        [Description("版本号")]
        public string ProjectVerNo { get; set; }
        /// <summary>
        ///来源项目
        ///</summary>
        [Description("来源项目")]
        public long? ParentID { get; set; }
        /// <summary>
        ///
        ///</summary>
        [Description("")]
        public long? DrawingTaskID { get; set; }


        public DrawingTaskEntity DrawingTask { get; set; }

        /// <summary>
        ///描述
        ///</summary>
        [Description("描述")]
        public string Remark { get; set; }
    }
}

