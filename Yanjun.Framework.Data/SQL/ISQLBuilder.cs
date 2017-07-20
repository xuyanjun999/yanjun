using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yanjun.Framework.Data.SQL
{
    public interface ISQLBuilder
    {
        StringBuilder BuildAddSql<T>(string tableName, T entity) where T : class;

        StringBuilder BuildAddSql<T>(string tableName, IEnumerable<T> entitys) where T : class;

        StringBuilder BuildUpdateSql<T>(string tableName, T entity,params string[] columns) where T : class;

        StringBuilder BuildUpdateSql<T>(string tableName, IEnumerable<T> entitys, params string[] columns) where T : class;

        StringBuilder BuildDeleteSql<T>(string tableName, T entity) where T : class;

        StringBuilder BuildDeleteSql<T>(string tableName, IEnumerable<T> entitys) where T : class;

        StringBuilder BuildDeleteSql(string tableName, long id);

        StringBuilder BuildDeleteSql(string tableName, long[] ids);
    }
}
