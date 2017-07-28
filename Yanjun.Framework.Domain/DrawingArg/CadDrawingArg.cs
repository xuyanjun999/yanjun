using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yanjun.Framework.Domain.DrawingArg
{
    /// <summary>
    /// CAD 绘图信息
    /// </summary>
    public class CadDrawingArgs
    {
        public CadDrawingArgs()
        {
            Blocks = new List<CadDrawingBlockArgs>();
        }
        /// <summary>
        /// ID (必输项)
        /// </summary>
        public long ID { get; set; }
        /// <summary>
        /// 任务类型 默认绘制CAD
        /// </summary>
        public TaskType TaskType { get; set; }
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
        [NotMapped]
        public List<CadDrawingBlockArgs> Blocks { get; set; }
        /// <summary>
        /// 任务状态 默认
        /// </summary>
        public TaskStatus TaskStatus { get; set; }
        /// <summary>
        /// 任务处理异常重试次数 
        /// </summary>
        public int ErrorCount { get; set; }
        /// <summary>
        /// 任务处理开始时间
        /// </summary>
        public DateTime? StartTime { get; set; }
        /// <summary>
        /// 任务处理完成时间
        /// </summary>
        public DateTime? EndTime { get; set; }
        /// <summary>
        /// 输出文件
        /// </summary>
        public string Output { get; set; }
        /// <summary>
        /// 待处理任务源文件名
        /// </summary>
        [NotMapped]
        public string FileName {
            get {
                if (File.Exists(SourceFile))
                    return new FileInfo(SourceFile).Name;
                return SourceFile;
            }
            set { }
        }
        /// <summary>
        /// 待处理任务源文件路径
        /// </summary>
        public string SourceFile { get; set; }
    }

    /// <summary>
    /// CAD 绘图块信息
    /// </summary>
    public class CadDrawingBlockArgs
    {
        public CadDrawingBlockArgs()
        {
            BlockParams = new List<CadDrawingParamArgs>();
            BlockPoint = new double[3] { 0, 0, 0 };
        }
        public string BlockName { get; set; }
        public double[] BlockPoint { get; set; }

        public List<CadDrawingParamArgs> BlockParams { get; set; }
    }

    /// <summary>
    /// CAD 绘图块参数信息
    /// </summary>
    public class CadDrawingParamArgs
    {
        public CadDrawingParamArgs()
        {
            DataType = "string";
        }
        public string ParamCode { get; set; }
        public dynamic ParamValue { get; set; }
        /// <summary>
        /// double / string
        /// </summary>
        public string DataType { get; set; }
        public int DrawingType { get; set; }
    }

    /// <summary>
    /// CAD 绘图任务状态
    /// </summary>
    public enum TaskStatus
    {
        /// <summary>
        /// 默认状态
        /// </summary>
        Created = 0,

        /// <summary>
        /// 执行中
        /// </summary>
        Doing = 1,

        /// <summary>
        /// 完成
        /// </summary>
        Complete = 2,

        /// <summary>
        /// 异常
        /// </summary>
        Error = 3
    }
    
    /// <summary>
    /// CAD 绘图任务类型
    /// </summary>
    public enum TaskType
    {
        /// <summary>
        /// 绘图
        /// </summary>
        Drawing = 0,

        /// <summary>
        /// 读取块属性
        /// </summary>
        ReadBlock = 1
    }
}
