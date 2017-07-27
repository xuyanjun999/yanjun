using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yanjun.Framework.Domain.Entity;
using Yanjun.Framework.Domain.Entity.Org;
using Yanjun.Framework.Domain.Service.TreeQuery;

namespace Yanjun.Framework.Service.TreeQuery
{
    public class OrgTreeService : ServiceBase, IOrgTreeService
    {
        public CommonTreeNodeEntity[] GetStaffTree(CommonTreeNodeEntity selectTreeNode)
        {
            IEnumerable<CommonTreeNodeEntity> result = null;
            if (selectTreeNode == null) //第一级
            {
                result = Repository.GetQueryExp<CompanyEntity>(null).OrderBy(x => x.Name).ToArray().Select(x =>
                {
                    return new CommonTreeNodeEntity()
                    {
                        Level = 1,
                        CID=x.ID,
                        Leaf = true,
                        Text = x.Name
                    };
                });
            }
            return result.ToArray();
        }
    }
}
