using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yanjun.Framework.Domain.Entity;

namespace Yanjun.Framework.Domain.Service.TreeQuery
{
    public interface IOrgTreeService : IServiceBase
    {
        /// <summary>
        /// 员工界面左边树
        /// </summary>
        /// <param name="selectTreeNode"></param>
        /// <returns></returns>
        CommonTreeNodeEntity[] GetStaffTree(CommonTreeNodeEntity selectTreeNode);
    }
}
