using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yanjun.Framework.Domain.Entity.Project
{
    public class DrawingTaskEntity : BaseAcsRecTreeNodeEntity
    {
        /// <summary>
        ///任务类型
        ///</summary>
        [Description("任务类型")]
        public int TaskType { get; set; }
        /// <summary>
        ///任务标识
        ///</summary>
        [Description("任务标识")]
        public string TaskCode { get; set; }
        /// <summary>
        ///所属公司
        ///</summary>
        [Description("所属公司")]
        public string CompanyName { get; set; }
        /// <summary>
        ///任务时间
        ///</summary>
        [Description("任务时间")]
        public DateTime TaskDate { get; set; }
        /// <summary>
        ///所属用户
        ///</summary>
        [Description("所属用户")]
        public string TaskOwner { get; set; }
        /// <summary>
        ///任务状态
        ///</summary>
        [Description("任务状态")]
        public int TaskStatus { get; set; }
        /// <summary>
        ///失败次数
        ///</summary>
        [Description("失败次数")]
        public int ErrorCount { get; set; }
        /// <summary>
        ///开始时间
        ///</summary>
        [Description("开始时间")]
        public DateTime? StartTime { get; set; }
        /// <summary>
        ///结束时间
        ///</summary>
        [Description("结束时间")]
        public DateTime? EndTime { get; set; }
        /// <summary>
        ///输出文件
        ///</summary>
        [Description("输出文件")]
        public string Output { get; set; }
        /// <summary>
        ///原始文件
        ///</summary>
        [Description("原始文件")]
        public string SourceFile { get; set; }
    }

}
