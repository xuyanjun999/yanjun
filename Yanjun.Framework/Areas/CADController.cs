using log4net;
using SGEAP.CadDrawingEntity;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using Yanjun.Framework.Code.Web;
using Yanjun.Framework.Data.Repository;
using Yanjun.Framework.Domain.DrawingArg;
using Yanjun.Framework.Domain.Entity.Org;
using Yanjun.Framework.Mvc.Filter.Attribute;

namespace Yanjun.Framework.Mvc.Areas
{
    public class CADController : MyController<StaffEntity>
    {
        [NotCheckUserAttribute]
        public ActionResult UpdateReadBlockResult(string jsonData, string user)
        {
            var retObj = new CadReturnObj();
            try
            {
                var bus = new CadBusiness();

                retObj = bus.UpdateReadBlockResult(jsonData, user);
                if (!retObj.Success)
                {
                    Log.Error(retObj.Message);
                }
            }
            catch (Exception ex)
            {
                Log.Error(ex);
                retObj.Success = false;
                retObj.Message = ex.Message;
            }
            return MyJson(retObj);
        }

        [NotCheckUserAttribute]
        public ActionResult UpdateDrawingTaskResult(string jsonData)
        {
            var retObj = new CadReturnObj();
            try
            {
                var bus = new CadBusiness();
                retObj = bus.UpdateDrawingTaskResult(jsonData, Request.Files);
                if (!retObj.Success)
                {
                    Log.Error(retObj.Message);
                }
            }
            catch (Exception ex)
            {
                Log.Error(ex);
                retObj.Success = false;
                retObj.Message = ex.Message;
            }
            return MyJson(retObj); 
        }
    }
}