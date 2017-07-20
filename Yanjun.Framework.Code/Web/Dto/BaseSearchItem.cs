using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yanjun.Framework.Code.Web.Dto
{
    public class BaseSearchItem
    {
        /// <summary>
        /// 
        /// </summary>
        public BaseSearchItem()
        {
            this.RelOperator = LogicalRelOperator.And;
            this.Operator = SearchOperator.Equal;
            this.SearchGroupID = 0;
        }

        /// <summary>
        /// 查询字段名称
        /// </summary>
        public string FieldName { get; set; }
        /// <summary>
        /// 右查询字段名称
        /// </summary>
        public string RightFieldName { get; set; }
        /// <summary>
        /// 搜索操作数
        /// </summary>
        public object[] Values { get; set; }
        /// <summary>
        /// 搜索操作符
        /// </summary>
        public SearchOperator Operator { get; set; }
        /// <summary>
        /// 逻辑关系符
        /// </summary>
        public LogicalRelOperator RelOperator { get; set; }
        /// <summary>
        /// 搜索组ID默认0 分组查询用 慎用 后台值必须大于10
        /// 权限组合条件：11
        /// </summary>
        public int SearchGroupID { get; set; }
    }

    /// <summary>
    /// 操作符枚举
    /// </summary>
    public enum SearchOperator
    {
        /// <summary>
        /// 小于
        /// </summary>
        LessThan = 1,
        /// <summary>
        /// 小于等于
        /// </summary>
        LessThanOrEqual = 2,
        /// <summary>
        /// 大于
        /// </summary>
        GreaterThan = 3,
        /// <summary>
        /// 大于等于
        /// </summary>
        GreaterThanOrEqual = 4,
        /// <summary>
        /// 等于
        /// </summary>
        Equal = 5,
        /// <summary>
        /// sql的like语法
        /// </summary>
        Like = 6,
        /// <summary>
        /// sql的in语法
        /// </summary>
        In = 7,
        /// <summary>
        /// sql的not in语法
        /// </summary>
        NotIn = 8,
        /// <summary>
        /// 不等于
        /// </summary>
        NotEqual = 9
    }

    /// <summary>
    /// 逻辑关系枚举
    /// </summary>
    public enum LogicalRelOperator
    {
        /// <summary>
        /// 且
        /// </summary>
        And = 1,
        /// <summary>
        /// 或
        /// </summary>
        Or = 2,
        /// <summary>
        /// 非
        /// </summary>
        Not = 3
    }

}
