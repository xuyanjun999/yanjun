using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Yanjun.Framework.Domain.Cad
{
    public class CadTaskArgs
    {
        public CadTaskArgs()
        {
            Blocks = new List<CadTaskBlockArgs>();
            TaskMsg = "等待";
        }
        /// <summary>
        /// ID (必输项)
        /// </summary>
        public long TaskID { get; set; }
        /// <summary>
        /// 任务类型 默认绘制CAD
        /// </summary>
        public TaskTypeEnum TaskType { get; set; }
        /// <summary>
        /// 任务编号 (必输项)
        /// </summary>
        public string TaskCode { get; set; }
        /// <summary>
        /// 所属公司 (必输项)
        /// </summary>
        public string CompanyName { get; set; }
        /// <summary>
        /// 任务时间 (必输项)
        /// </summary>
        public DateTime TaskDate { get; set; }
        /// <summary>
        /// 所属用户 (必输项)
        /// </summary>
        public string TaskOwner { get; set; }
        /// <summary>
        /// 包含块 (必输项)
        /// </summary>
        public List<CadTaskBlockArgs> Blocks { get; set; }
        /// <summary>
        /// 任务状态 默认
        /// </summary>
        public TaskStatusEnum TaskStatus { get; set; }
        /// <summary>
        /// 任务处理异常重试次数 
        /// </summary>
        public int ErrorCount { get; set; }
        /// <summary>
        /// 处理信息
        /// </summary>
        public string TaskMsg { get; set; }
        /// <summary>
        /// 任务处理开始时间
        /// </summary>
        public DateTime? StartTime { get; set; }
        /// <summary>
        /// 任务处理完成时间
        /// </summary>
        public DateTime? EndTime { get; set; }
        /// <summary>
        /// 输出文件路径
        /// </summary>
        public string Output { get; set; }
        /// <summary>
        /// 待处理任务源文件路径
        /// </summary>
        public string SourceFile { get; set; }

        public void Start()
        {
            this.TaskStatus = TaskStatusEnum.Doing;
            this.TaskMsg = "执行";
        }

        public void Complete()
        {
            this.TaskStatus = TaskStatusEnum.Complete;
            this.TaskMsg = "完毕";
        }

        public void TryAgain(string msg)
        {
            this.ErrorCount++;
            this.TaskStatus = TaskStatusEnum.TryAgain;
            this.TaskMsg = msg;
        }

        public void Error(string msg)
        {
            this.TaskStatus = TaskStatusEnum.Error;
            this.TaskMsg = msg;
        }
    }

    /// <summary>
    /// CAD 绘图任务状态
    /// </summary>
    public enum TaskStatusEnum
    {
        /// <summary>
        /// 默认状态
        /// </summary>
        Created = 0,

        /// <summary>
        /// 重试中
        /// </summary>
        TryAgain = 2,

        /// <summary>
        /// 处理中
        /// </summary>
        Doing = 4,

        /// <summary>
        /// 完成
        /// </summary>
        Complete = 6,

        /// <summary>
        /// 异常
        /// </summary>
        Error = 9
    }

    public enum TaskTypeEnum
    {
        /// <summary>
        /// 生成井道图
        /// </summary>
        Drawing = 0,

        /// <summary>
        /// 读取块属性
        /// </summary>
        ReadBlock = 1
    }
}
