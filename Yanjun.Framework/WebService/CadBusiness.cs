using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.IO;
using Newtonsoft.Json;
using Yanjun.Framework.Domain.Entity.Data;
using SGEAP.CadDrawingEntity;
using Yanjun.Framework.Domain.DrawingArg;
using log4net;
using Yanjun.Framework.Domain.Entity.Org;

namespace SGEAP.CadDrawingEntity
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
        public CadReturnObj UpdateReadBlockResult(string blockJson, string user)
        {
            var retObj = new CadReturnObj();

            var blocks = JsonConvert.DeserializeObject<List<BlockEntity>>(blockJson);
            if (blocks != null && blocks.Count > 0)
            {
                CadBlockDBUtil.UpdateReadBlockResult(blocks.ToArray(), user);
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

        public CadReturnObj UpdateDrawingTaskResult(string jsonData, HttpFileCollectionBase files)
        {
            var retObj = new CadReturnObj();
            try
            {
                var taskArgs = Newtonsoft.Json.JsonConvert.DeserializeObject<CadDrawingArgs>(jsonData);

                var task = CadBlockDBUtil.GetDrawingTask(taskArgs.ID);
                if (task == null)
                {
                    retObj.Success = false;
                    retObj.Message = "无效的处理任务[ID=" + taskArgs.ID + "]";
                    return retObj;
                }
                var phyPath = GetTaskResultPhyPath();
                var relPath = GetTaskResulRelath();

                //如果存在文件则自动存储
                foreach (string file in files)
                {
                    var postFile = files[file] as HttpPostedFileBase;
                  
                    var fileName = Path.Combine(phyPath, postFile.FileName);
                    postFile.SaveAs(fileName);

                    task.Output = relPath + postFile.FileName;
                    task.EndTime = DateTime.Now;
                    task.TaskStatus = (int)TaskStatus.Complete;
                    CadBlockDBUtil.UpdateDrawingTask(task);
                }
                if (files.Count == 0)
                {
                    task.Output = null;
                    task.EndTime = DateTime.Now;
                    task.TaskStatus = (int)TaskStatus.Error;
                    CadBlockDBUtil.UpdateDrawingTask(task);
                }
            }
            catch (Exception ex)
            {
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