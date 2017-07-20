using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Yanjun.Framework.Code.Web;

namespace Yanjun.Framework.Data.Repository
{
    public interface IRepositoryBase : IDisposable
    {

        void BeginTran();

        void BeginTran(IsolationLevel isolationLevel);
        void Commit();
        long Insert<TEntity>(TEntity entity) where TEntity : class;
        void Insert<TEntity>(IEnumerable<TEntity> entitys) where TEntity : class;

        int InsertNoId<TEntity>(IEnumerable<TEntity> entitys) where TEntity : class;

        int Update<TEntity>(TEntity entity, params string[] columns) where TEntity : class;

        int Update<TEntity>(TEntity entity, params Expression<Func<TEntity, object>>[] expressions) where TEntity : class;

        int Update<TEntity>(IEnumerable<TEntity> entitys, params string[] columns) where TEntity : class;

        int Update<TEntity>(IEnumerable<TEntity> entitys, params Expression<Func<TEntity, object>>[] expressions) where TEntity : class;

        int Delete<TEntity>(TEntity entity) where TEntity : class;

        int Delete<TEntity>(IEnumerable<TEntity> entitys) where TEntity : class;


       int Delete<TEntity>(long id) where TEntity : class, new();

        int Delete<TEntity>(long[] ids) where TEntity : class, new();

        int Delete<TEntity>(Expression<Func<TEntity, bool>> predicate) where TEntity : class;


        TEntity QueryFirst<TEntity>(Expression<Func<TEntity, bool>> predicate, params string[] include) where TEntity : class;

        IQueryable<TEntity> GetQueryExp<TEntity>(Expression<Func<TEntity, bool>> predicate, params string[] include)
          where TEntity : class;

        TEntity[] QueryAll<TEntity>(Expression<Func<TEntity, bool>> predicate, params string[] include) where TEntity : class;

        TEntity[] QueryAll<TEntity>(string strSql) where TEntity : class;

        TEntity[] QueryAll<TEntity>(string strSql, DbParameter[] dbParameter) where TEntity : class;

        TEntity[] QueryPage<TEntity>(Expression<Func<TEntity, bool>> predicate, Pagination pagination, params string[] include) where TEntity : class, new();
    }
}
