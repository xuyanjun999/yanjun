using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Yanjun.Framework.Code.Util;
using Yanjun.Framework.Code.Web;
using Yanjun.Framework.Data.DBContext;
using Yanjun.Framework.Data.SQL;
using System.Data.Entity;
using System.Text.RegularExpressions;
using Yanjun.Framework.Code.Web.Dto;
using System.IO;

namespace Yanjun.Framework.Data.Repository
{
    public class RepositoryBase : IRepositoryBase
    {
        /// <summary>
        /// 上下文
        /// </summary>
        public MyDbContext MyContext { get; set; }

        /// <summary>
        /// SQL语句构造器
        /// </summary>
        public ISQLBuilder SQLBuilder { get; set; }


        /// <summary>
        /// 当前原生Db连接
        /// </summary>
        public DbConnection Conn { get; set; }

        /// <summary>
        /// 当前原生Db连接的事务
        /// </summary>
        public DbTransaction Tran { get; set; }

        /// <summary>
        /// 开始事务
        /// </summary>
        public void BeginTran()
        {
            Conn = MyContext.Database.Connection;
            if (Conn.State == System.Data.ConnectionState.Closed)
                Conn.Open();
            Tran = Conn.BeginTransaction();
            MyContext.Database.UseTransaction(Tran);
        }

        /// <summary>
        /// 开始事务
        /// </summary>
        /// <param name="isolationLevel">事务隔离级别</param>

        public void BeginTran(IsolationLevel isolationLevel)
        {
            Conn = MyContext.Database.Connection;
            if (Conn.State == System.Data.ConnectionState.Closed)
                Conn.Open();
            Tran = Conn.BeginTransaction(isolationLevel);
        }

        /// <summary>
        /// 提交事务
        /// </summary>
        public void Commit()
        {
            if (Tran != null)
                Tran.Commit();
        }

        /// <summary>
        /// 提交事务
        /// </summary>
        public void Rollback()
        {
            if (Tran != null)
                Tran.Rollback();
        }


        public int Delete<TEntity>(TEntity entity) where TEntity : class
        {
            ReflectionUtil.SetPropertyValue(entity, "status", 1);

            SetCommonUpdateProperty(new object[] { entity });

            string[] columns = BuildUpdateColumns<TEntity>(entity, "status");

            string sql = SQLBuilder.BuildUpdateSql<TEntity>(MyContext.GetTableName(typeof(TEntity)), entity, columns).ToString();

            return ExecuteNonQuery(sql);

        }

        public int Delete<TEntity>(IEnumerable<TEntity> entitys) where TEntity : class
        {
            if (entitys == null || entitys.Count() <= 0) return 0;

            ReflectionUtil.SetPropertyValue(entitys, "status", 1);

            SetCommonUpdateProperty(entitys.ToArray());

            string[] columns = BuildUpdateColumns<TEntity>(entitys.FirstOrDefault(), "status");

            string sql = SQLBuilder.BuildUpdateSql<TEntity>(MyContext.GetTableName(typeof(TEntity)), entitys, columns).ToString();

            return ExecuteNonQuery(sql);

        }


        public int Delete<TEntity>(long id) where TEntity : class, new()
        {
            TEntity entity = new TEntity();

            ReflectionUtil.SetPropertyValue(entity, "id", id);

            ReflectionUtil.SetPropertyValue(entity, "status", 1);

            SetCommonUpdateProperty(new object[] { entity });

            string[] columns = BuildUpdateColumns<TEntity>(entity, "status");

            string sql = SQLBuilder.BuildUpdateSql<TEntity>(MyContext.GetTableName(typeof(TEntity)), entity, columns).ToString();

            return ExecuteNonQuery(sql);
        }

        private string[] BuildUpdateColumns<TEntity>(TEntity entity, params string[] columns) where TEntity : class
        {
            List<string> result = new List<string>();
            if (columns != null && columns.Length > 0) result.AddRange(columns);

            if (ReflectionUtil.HasPropertyInfo(entity, "updateon"))
            {
                result.Add("updateon");
            }

            if (ReflectionUtil.HasPropertyInfo(entity, "updateby"))
            {
                result.Add("updateby");
            }

            return result.ToArray();
        }

        public int Delete<TEntity>(long[] ids) where TEntity : class, new()
        {
            if (ids == null || ids.Length <= 0) return 0;

            List<TEntity> entitys = new List<TEntity>();
            foreach (var id in ids)
            {
                TEntity entity = new TEntity();
                ReflectionUtil.SetPropertyValue(entity, "id", id);
                entitys.Add(entity);
            }

            ReflectionUtil.SetPropertyValue(entitys, "status", 1);

            SetCommonUpdateProperty(entitys.ToArray());

            string[] columns = BuildUpdateColumns<TEntity>(entitys.FirstOrDefault(), "status");

            string sql = SQLBuilder.BuildUpdateSql<TEntity>(MyContext.GetTableName(typeof(TEntity)), entitys, columns).ToString();

            return ExecuteNonQuery(sql);
        }

        public int Delete<TEntity>(Expression<Func<TEntity, bool>> predicate) where TEntity : class
        {
            var entitys = this.GetQueryExp<TEntity>(predicate).ToArray();
            return Delete<TEntity>(entitys);
        }


        public TEntity QueryFirst<TEntity>(Expression<Func<TEntity, bool>> predicate, params string[] include) where TEntity : class
        {
            return this.GetQueryExp<TEntity>(predicate, include).FirstOrDefault();
        }

        public TEntity[] QueryAll<TEntity>(Expression<Func<TEntity, bool>> predicate, params string[] include) where TEntity : class
        {
            return this.GetQueryExp<TEntity>(predicate, include).ToArray();
        }

        public TEntity[] QueryAll<TEntity>(string strSql) where TEntity : class
        {
            return this.MyContext.Set<TEntity>().SqlQuery(strSql).ToArray();
        }

        public TEntity[] QueryAll<TEntity>(string strSql, DbParameter[] dbParameter) where TEntity : class
        {
            return this.MyContext.Set<TEntity>().SqlQuery(strSql, dbParameter).ToArray();
        }

        public TEntity[] QueryPage<TEntity>(Expression<Func<TEntity, bool>> predicate, Pagination pagination, params string[] include) where TEntity : class, new()
        {
            bool isAsc = pagination.sord.ToLower() == "asc" ? true : false;
            string orderField = pagination.sidx;
            MethodCallExpression resultExp = null;
            var tempData = this.GetQueryExp<TEntity>(predicate, include);

            var parameter = Expression.Parameter(typeof(TEntity), "t");
            var propertyAccess = ExpressionUtil.GetEntityAttrExp(parameter, orderField, false);

            var orderByExp = Expression.Lambda(propertyAccess, parameter);
            resultExp = Expression.Call(typeof(Queryable), isAsc ? "OrderBy" : "OrderByDescending", new Type[] { typeof(TEntity), propertyAccess.Type }, tempData.Expression, Expression.Quote(orderByExp));

            tempData = tempData.Provider.CreateQuery<TEntity>(resultExp);
            // pagination.records = tempData.Count();
            tempData = tempData.Skip<TEntity>(pagination.rows * (pagination.page - 1)).Take<TEntity>(pagination.rows).AsQueryable();
            return tempData.ToArray();
        }

        public long Insert<TEntity>(TEntity entity) where TEntity : class
        {
            SetCommonAddProperty(new object[] { entity });

            string sql = SQLBuilder.BuildAddSql<TEntity>(MyContext.GetTableName(typeof(TEntity)), entity).ToString();

            long id = Convert.ToInt64((ExecuteScalar(sql).ToString()));

            ReflectionUtil.SetPropertyValue(entity, "id", id);

            return id;
        }

        public void Insert<TEntity>(IEnumerable<TEntity> entitys) where TEntity : class
        {
            if (entitys == null || entitys.Count() <= 0) return;
            foreach (var entity in entitys)
            {
                Insert(entity);
            }
        }

        public int InsertNoId<TEntity>(IEnumerable<TEntity> entitys) where TEntity : class
        {
            if (entitys == null || entitys.Count() <= 0) return 0;

            SetCommonAddProperty(entitys.ToArray());

            string sql = SQLBuilder.BuildAddSql<TEntity>(MyContext.GetTableName(typeof(TEntity)), entitys).ToString();

            return ExecuteNonQuery(sql);
        }


        /// <summary>
        /// 获得查询表达对象
        /// </summary>
        /// <param name="predicate"></param>
        /// <param name="includePaths"></param>
        /// <returns></returns>
        public IQueryable<TEntity> GetQueryExp<TEntity>(Expression<Func<TEntity, bool>> predicate, params string[] include)
            where TEntity : class
        {
            var query = MyContext.Set<TEntity>().AsQueryable();
            //包含关联实例查询
            if (include != null && include.Length > 0)
            {
                foreach (string path in include)
                {
                    query = query.Include(path);
                }
            }
            query = FilterInvalidData(query);

            if (predicate == null)
            {
                return query;
            }
            return query.Where(predicate);
        }

        /// <summary>
        /// 过滤无效查询数据 数据库语句过滤
        /// </summary>
        /// <typeparam name="TEntity"></typeparam>
        /// <param name="query"></param>
        /// <returns></returns>
        public IQueryable<TEntity> FilterInvalidData<TEntity>(IQueryable<TEntity> query)
            where TEntity : class
        {
            BaseSearchItem searchItem = new BaseSearchItem()
            {
                FieldName = "Status",
                Operator = SearchOperator.Equal,
                Values = new object[] { 0 }
            };
            var list = new List<BaseSearchItem>();
            list.Add(searchItem);
            var expression = ExpressionUtil.GetSearchExpression(typeof(TEntity), list) as Expression<Func<TEntity, bool>>;
            return query.Where(expression);
        }


        public int Update<TEntity>(TEntity entity, params string[] columns) where TEntity : class
        {
            columns = BuildUpdateColumns<TEntity>(entity, columns);

            SetCommonUpdateProperty(new object[] { entity });

            string sql = SQLBuilder.BuildUpdateSql<TEntity>(MyContext.GetTableName(typeof(TEntity)), entity, columns).ToString();

            return ExecuteNonQuery(sql);
        }

        public int Update<TEntity>(TEntity entity) where TEntity : class
        {

            SetCommonUpdateProperty(new object[] { entity });

            string sql = SQLBuilder.BuildUpdateSql<TEntity>(MyContext.GetTableName(typeof(TEntity)), entity).ToString();

            return ExecuteNonQuery(sql);
        }

        public int Update<TEntity>(IEnumerable<TEntity> entitys) where TEntity : class
        {
            if (entitys == null || entitys.Count() <= 0) return 0;

            SetCommonUpdateProperty(entitys.ToArray());

            string sql = SQLBuilder.BuildUpdateSql<TEntity>(MyContext.GetTableName(typeof(TEntity)), entitys).ToString();

            return ExecuteNonQuery(sql);
        }

        public int Update<TEntity>(TEntity entity, params Expression<Func<TEntity, object>>[] expressions) where TEntity : class
        {
            return Update(new TEntity[] { entity }, expressions);
        }

        public int Update<TEntity>(IEnumerable<TEntity> entitys, params string[] columns) where TEntity : class
        {
            if (entitys == null || entitys.Count() <= 0) return 0;

            columns = BuildUpdateColumns<TEntity>(entitys.FirstOrDefault(), columns);

            SetCommonUpdateProperty(entitys.ToArray());

            string sql = SQLBuilder.BuildUpdateSql<TEntity>(MyContext.GetTableName(typeof(TEntity)), entitys, columns).ToString();

            return ExecuteNonQuery(sql);
        }

        public int Update<TEntity>(IEnumerable<TEntity> entitys, params Expression<Func<TEntity, object>>[] expressions) where TEntity : class
        {
            if (entitys == null || entitys.Count() <= 0) return 0;

            string sql = string.Empty;

            SetCommonUpdateProperty(entitys.ToArray());

            if (expressions != null && expressions.Length > 0)
            {
                List<string> columns = ExpressionUtil.GetPropertyName<TEntity>(expressions);

                string[] needUpdateColumns = BuildUpdateColumns<TEntity>(entitys.FirstOrDefault(), columns.ToArray());

                sql = SQLBuilder.BuildUpdateSql<TEntity>(MyContext.GetTableName(typeof(TEntity)), entitys, needUpdateColumns).ToString();
            }
            else
            {
                sql = SQLBuilder.BuildUpdateSql<TEntity>(MyContext.GetTableName(typeof(TEntity)), entitys).ToString();
            }
            return ExecuteNonQuery(sql);
        }

        #region  设置公共新增字段
        /// <summary>
        /// 设置公共新增字段
        /// </summary>
        /// <param name="objs"></param>
        void SetCommonAddProperty(object[] objs)
        {
            var user = WebHelper.GetSessionObj(WebHelper.USER_LOGIN_SESSION);
            if (user != null)
            {
                long id = (long)ReflectionUtil.GetPropertyValue(user, "id");
                ReflectionUtil.SetPropertyValue(objs, "createby", id);
                ReflectionUtil.SetPropertyValue(objs, "updateby", id);
            }
            ReflectionUtil.SetPropertyValue(objs, "createon", DateTime.Now);
            ReflectionUtil.SetPropertyValue(objs, "updateon", DateTime.Now);
        }
        #endregion

        #region  设置公共修改字段
        /// <summary>
        /// 设置公共新增字段
        /// </summary>
        /// <param name="objs"></param>
        void SetCommonUpdateProperty(object[] objs)
        {
            var user = WebHelper.GetSessionObj(WebHelper.USER_LOGIN_SESSION);
            if (user != null)
            {
                long id = (long)ReflectionUtil.GetPropertyValue(user, "id");
                ReflectionUtil.SetPropertyValue(objs, "updateby", id);

            }
            ReflectionUtil.SetPropertyValue(objs, "updateon", DateTime.Now);
        }
        #endregion


        public int ExecuteNonQuery(string sql, CommandType commandType = CommandType.Text, int timeout = 30)
        {
            var comm = Conn.CreateCommand();
            comm.CommandText = sql;
            comm.CommandType = commandType;
            comm.CommandTimeout = timeout;
            if (Tran != null)
                comm.Transaction = Tran;
            return comm.ExecuteNonQuery();
        }

        public object ExecuteScalar(string sql, CommandType commandType = CommandType.Text, int timeout = 30)
        {
            var comm = Conn.CreateCommand();
            comm.CommandText = sql;
            comm.CommandType = commandType;
            comm.CommandTimeout = timeout;
            if (Tran != null)
                comm.Transaction = Tran;
            return comm.ExecuteScalar();
        }

        public void Dispose()
        {
            if (MyContext != null)
            {
                MyContext.Dispose();
            }
        }
    }
}
