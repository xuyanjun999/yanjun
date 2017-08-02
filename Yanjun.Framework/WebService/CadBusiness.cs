using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.IO;
using Newtonsoft.Json;
using Yanjun.Framework.Mvc.WebService;
using Yanjun.Framework.Domain.Entity.Data;
using SGEAP.CadDrawingEntity;
using Yanjun.Framework.Domain.DrawingArg;
using log4net;

namespace SGEAP.CadDrawingHostService
{
    public class CadBusiness
    {
        public ILog Log { get; set; }
        /// <summary>
        /// CAD服务程序根目录
        /// </summary>
        public string TaskResultOutput
        {
            get
            {
                return "TaskResultOutput";
            }
        }

        public CadBusiness()
        {
        }

        /// <summary>
        /// 更新块信息到服务器数据库
        /// </summary>
        /// <param name="blockDwgFileUrl"></param>
        /// <returns></returns>
        public CadDrawingReturnObj UpdateDynamicBlock(string blockJson)
        {
            var retObj = new CadDrawingReturnObj();

            var dynamicBlocks = JsonConvert.DeserializeObject<List<DynamicBlockEntity>>(blockJson);
            if (dynamicBlocks != null && dynamicBlocks.Count > 0)
            {
                CadBlockDBUtil.UpdateDynamicBlock(dynamicBlocks.ToArray());
            }
            retObj.Success = true;
            return retObj;
        }

        public string GetTaskResultPhyPath()
        {
            var taskResult = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, TaskResultOutput);
            if (!Directory.Exists(taskResult))
            {
                Directory.CreateDirectory(taskResult);
            }

            var resPath = Path.Combine(taskResult, DateTime.Now.ToString("yyyy-MM-dd"));
            if (!Directory.Exists(resPath))
            {
                Directory.CreateDirectory(resPath);
            }
            return resPath;
        }

        public string GetTaskResulRelath()
        {
            var resPath = string.Format("/{0}/{1}/", TaskResultOutput, DateTime.Now.ToString("yyyy-MM-dd"));
            return resPath;
        }

        public CadDrawingReturnObj UpdateDrawingTaskResult(long taskId, byte[] bytes)
        {

            var retObj = new CadDrawingReturnObj();
            try
            {
                var task = CadBlockDBUtil.GetDrawingTask(taskId);
                if (task == null)
                {
                    retObj.Success = false;
                    retObj.Message = "未找到处理任务ID:" + taskId;
                    return retObj;
                }
                if (bytes != null)
                {

                    var phyPath = GetTaskResultPhyPath();
                    var relPath = GetTaskResulRelath();

                    var fileName = DateTime.Now.Ticks + ".zip";
                    var fileFullName = Path.Combine(phyPath, fileName);
                    File.WriteAllBytes(fileFullName, bytes);

                    task.Output = relPath + fileName;
                    task.EndTime = DateTime.Now;
                    task.TaskStatus = (int)TaskStatus.Complete;
                    CadBlockDBUtil.UpdateDrawingTask(task);
                }
                else
                {
                    task.Output = null;
                    task.EndTime = DateTime.Now;
                    task.TaskStatus = (int)TaskStatus.Error;
                    CadBlockDBUtil.UpdateDrawingTask(task);
                }
            }
            catch (Exception ex)
            {
                File.AppendAllText(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Log", "test.txt"), GetMessage(ex));
                retObj.Success = false;
                retObj.Message = ex.Message;
            }
            return retObj;
        }

        public string GetMessage(Exception ex)
        {
            if (ex.InnerException == null)
            {
                return ex.Message;
            }
            else
            {
                return GetMessage(ex.InnerException);
            }
        }
    }
}