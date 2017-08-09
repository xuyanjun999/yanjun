using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Yanjun.Framework.Code.Web.Dto;
using Yanjun.Framework.Domain.Entity;
using Yanjun.Framework.Domain.Entity.Org;
using Yanjun.Framework.Domain.Service.TreeQuery;

namespace LiftNext.Areas.TreeQuery.Controllers
{
    public class OrgTreeController : Areas.MyController<CommonTreeNodeEntity>
    {

        public IOrgTreeService OrgTreeService { get; set; }

        /// <summary>
        /// 获取员工界面左边树
        /// </summary>
        /// <param name="args"></param>
        /// <returns></returns>
        public JsonResult GetStaffTree(CommonAjaxArgs args)
        {
            CommonTreeNodeEntity treeNode = JsonConvert.DeserializeObject<CommonTreeNodeEntity>(args.GetStr("treeNode"));
            var result = OrgTreeService.GetStaffTree(treeNode);
            return MyJson(result);
        }
    }
}