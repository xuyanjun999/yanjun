using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yanjun.Framework.Code.Web.Dto
{
    public class CommonAjaxArgs : BaseAjaxArgs
    {
        /// <summary>
        /// 
        /// </summary>
        public CommonAjaxArgs()
        {
            //this.Query = new QueryArg();
            //this.ExtraEntityQuerys = new ExtraEntityQueryArg[] { };
            //this.Delete = new DeleteArg();
            //this.Add = new AddArg();
            //this.Right = new RightArg();
            //this.NeedValidate = true;
            //this.NeedPreAction = true;
            //this.NeedAfterAction = true;
        }


        /// <summary>
        /// 增删改时 后台是否触发验证 默认触发
        /// </summary>
        public bool NeedValidate { get; set; }
        /// <summary>
        /// 增删改时 后台是否触发验证 默认触发
        /// </summary>
        public bool NeedPreAction { get; set; }

        /// <summary>
        /// 增删改时 后台是否触发验证 默认触发
        /// </summary>
        public bool NeedAfterAction { get; set; }

        public string EntityTypeFullName { get; set; }

        /// <summary>
        /// 查询参数
        /// </summary>
        public QueryArg Query { get; set; }


        /// <summary>
        /// 删除参数
        /// </summary>
        public DeleteArg Delete { get; set; }

        /// <summary>
        /// 添加动作的参数
        /// </summary>
        public AddArg Add { get; set; }

        /// <summary>
        /// 权限配置
        /// </summary>
        public RightArg Right { get; set; }
    }

    /// <summary>
    /// 查询动作参数
    /// </summary>
    public class QueryArg
    {
        /// <summary>
        /// 
        /// </summary>
        public QueryArg()
        {
        }
        /// <summary>
        /// 排序方式组合
        /// </summary>
        public List<Sorter> Sorters { get; set; }
        /// <summary>
        /// 分页参数
        /// </summary>
        public PageArg Page { get; set; }
        /// <summary>
        /// 搜索参数
        /// </summary>s
        public List<BaseSearchItem> Searchs { get; set; }
        /// <summary>
        /// 包含的关联实体属性名路径集合
        /// </summary>
        public  List<string> IncludeEntityPaths { get; set; }
        /// <summary>
        /// 树节点参数配置属性
        /// </summary>
        public TreeNodeArg TreeNode { get; set; }
        /// <summary>
        /// 导出信息
        /// </summary>
        /// <summary>
        /// 排序器
        /// </summary>
        public class Sorter
        {
            /// <summary>
            /// 
            /// </summary>
            public Sorter()
            {
                //this.SortOrder = System.Data.SqlClient.SortOrder.Ascending;
            }

            /// <summary>
            /// 排序字段名
            /// </summary>
            public string SortField { get; set; }

            /// <summary>
            /// 排序方式
            /// </summary>
            public SortOrder SortOrder { get; set; }
        }

        /// <summary>
        /// 分页参数
        /// </summary>
        public class PageArg
        {
            /// <summary>
            /// 
            /// </summary>
            public PageArg()
            {
                this.PageIndex = 1;
                this.PageSize = -1;
            }
            /// <summary>
            /// 当前页
            /// </summary>
            public int PageIndex { get; set; }
            /// <summary>
            /// 页大小
            /// </summary>
            public int PageSize { get; set; }
        }

        /// <summary>
        /// 树节点参数
        /// </summary>
        public class TreeNodeArg
        {
            /// <summary>
            /// 假如是获取树节点时，指定请求的节点是不是叶节点，为false指由后台自动判断
            /// </summary>
            public bool Leaf { get; set; }
            /// <summary>
            /// 所请求节点图标资源名称
            /// </summary>
            public string IconResource { get; set; }
            /// <summary>
            /// 查询树模型的全名
            /// </summary>
            public string QueryModelFullName { get; set; }
            /// <summary>
            /// 查询树模型的查询关键字
            /// </summary>
            public string QueryKeywords { get; set; }
            /// <summary>
            /// 查询起始时间
            /// </summary>
            public DateTime? FromDate { get; set; }
            /// <summary>
            /// 查询结束时间
            /// </summary>
            public DateTime? ToDate { get; set; }
            /// <summary>
            /// 父节点ID
            /// </summary>
            public int? QueryParenID { get; set; }
            /// <summary>
            /// 父节点数据实体类型
            /// </summary>
            public string QueryParentNodeType { get; set; }
        }
    }

    /// <summary>
    /// 额外的Entity查询动作参数 查询的结果Entitys将合并到结果Entitys中
    /// </summary>
    public class ExtraEntityQueryArg : QueryArg
    {
        /// <summary>
        /// 数据实例
        /// </summary>
        public string EntityTypeFullName { get; set; }
    }

    /// <summary>
    /// 删除动作参数
    /// </summary>
    public class DeleteArg
    {
        /// <summary>
        /// 
        /// </summary>
        public DeleteArg()
        {

        }
    }

    /// <summary>
    /// 添加动作的参数
    /// </summary>
    public class AddArg
    {
        /// <summary>
        /// 
        /// </summary>
        public AddArg()
        {
            this.ReturnNewEntitys = false;
        }
        /// <summary>
        /// 返回新添加的实体 默认不返回
        /// </summary>
        public bool ReturnNewEntitys { get; set; }
    }

    /// <summary>
    /// 权限参数
    /// </summary>
    public class RightArg
    {
        /// <summary>
        /// 权限读取器名称
        /// </summary>
        public string RightReaderName = "";
    }
}

