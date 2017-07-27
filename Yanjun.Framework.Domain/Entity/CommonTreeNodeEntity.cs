using System;

namespace Yanjun.Framework.Domain.Entity
{
    /// <summary>
    /// 常用树节点
    /// </summary>
    public class CommonTreeNodeEntity : BaseTreeNodeEntity
    {

        public CommonTreeNodeEntity()
        {
            this.Level = 1;
            this.Leaf = false;
        }

        /// <summary>
        /// 结点id
        /// </summary>
        public string id { get; set; }

        /// <summary>
        /// 是否根结点
        /// </summary>
        public bool IsRootNode
        {
            get
            {
                if (id == "root")
                    return true;
                return false;
            }
        }

        /// <summary>
        /// 是否查询结点
        /// </summary>
        /// <returns></returns>
        public bool IsSearchNode
        {
            get
            {
                if (QueryFromDate != null || QueryEndDate != null || !string.IsNullOrEmpty(QueryKeyword))
                    return true;
                return false;
            }
        }

        /// <summary>
        /// 业务ID
        /// </summary>
        public long CID { get; set; }

        /// <summary>
        /// 层级
        /// </summary>
        public int Level { get; set; }

        /// <summary>
        /// 其它数据
        /// </summary>
        public string Data { get; set; }

        /// <summary>
        /// 其它数据
        /// </summary>
        public string Data1 { get; set; }

        /// <summary>
        /// 其它数据
        /// </summary>
        public string Data2 { get; set; }

        /// <summary>
        /// 其它数据
        /// </summary>
        public string Data3 { get; set; }

        /// <summary>
        /// 日期结点时间值
        /// </summary>
        public DateTime? Date { get; set; }

        /// <summary>
        /// 查询开始日期
        /// </summary>
        public DateTime? QueryFromDate { get; set; }

        /// <summary>
        /// 查询结束日期
        /// </summary>
        public DateTime? QueryEndDate { get; set; }
                
        /// <summary>
        /// 查询关键字
        /// </summary>
        public string QueryKeyword { get; set; }
    }
}
