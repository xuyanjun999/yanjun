using SGEAP.CadDrawingHostService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

namespace Yanjun.Framework.Mvc.WebService
{
    /// <summary>
    /// CadHostService 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消注释以下行。 
    // [System.Web.Script.Services.ScriptService]
    public class CadHostService : System.Web.Services.WebService
    {

        [WebMethod]
        public string HelloWorld()
        {
            return "Hello World";
        }

        /// <summary>
        /// 更新块信息到服务器数据库
        /// </summary>
        /// <param name="blockDwgFileUrl"></param>
        /// <returns></returns>
        [WebMethod(Description = "更新块信息到服务器数据库")]
        public CadDrawingReturnObj UpdateDynamicBlock(string blockJson)
        {
            var retObj = new CadDrawingReturnObj();
            try
            {
                var bus = new CadBusiness();
                retObj = bus.UpdateDynamicBlock(blockJson);
                if (!retObj.Success)
                {
                   // Logger.Error(retObj.Message);
                }
            }
            catch (Exception ex)
            {
               // Logger.Error(ex);
                retObj.Success = false;
                retObj.Message = ex.Message;
            }
            return retObj;
        }

        [WebMethod(Description = "更新绘图任务处理结果")]
        public CadDrawingReturnObj UpdateDrawingTaskResult(long taskId, byte[] bytes)
        {
            var retObj = new CadDrawingReturnObj();
            try
            {
                var bus = new CadBusiness();
                retObj = bus.UpdateDrawingTaskResult(taskId, bytes);
                if (!retObj.Success)
                {
                   // Logger.Error(retObj.Message);
                }
            }
            catch (Exception ex)
            {
               // Logger.Error(ex);
                retObj.Success = false;
                retObj.Message = ex.Message;
            }
            return retObj;
        }

    }

    public class CadDrawingReturnObj
    {
        public CadDrawingReturnObj()
        {
            Success = true;
        }
        public bool Success { get; set; }

        public string Message { get; set; }
        public string ReturnString { get; set; }
    }
}
