using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Yanjun.Framework.Code.Util;

namespace Yanjun.Framework.Data.SQL
{
    public class MSSQLBuilder : ISQLBuilder
    {

        #region 构造单个实体的insert语句 会返回ID
        /// <summary>
        /// 构造单个实体的insert语句 会返回ID
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="tableName"></param>
        /// <param name="entity"></param>
        /// <returns></returns>
        public StringBuilder BuildAddSql<T>(string tableName, T entity) where T : class
        {
            StringBuilder sql = new StringBuilder();

            var propertyInfos = GetNeedHandleProperty(entity);

            sql.AppendFormat(" insert into {0}(", tableName);

            sql.Append(string.Join(",", propertyInfos.Select(x => string.Format("[{0}]", x.Name))));

            sql.Append(") values(");

            sql.Append(string.Join(",", propertyInfos.Select(x => string.Format("{0}", GetSqlData(entity, x)))));

            sql.Append("); ");

            sql.Append(" select @@IDENTITY;");

            return sql;

        }
        #endregion

        #region 构造多个实体的insert语句 不会返回ID
        public StringBuilder BuildAddSql<T>(string tableName, IEnumerable<T> entitys) where T : class
        {
            StringBuilder sql = new StringBuilder();

            var propertyInfos = GetNeedHandleProperty(entitys.First());

            sql.AppendFormat(" insert into {0}(", tableName);

            sql.Append(string.Join(",", propertyInfos.Select(x => string.Format("[{0}]", x.Name))));

            sql.Append(") values");

            foreach (var entity in entitys)
            {
                sql.Append("(");
                sql.Append(string.Join(",", propertyInfos.Select(x => string.Format("{0}", GetSqlData(entity, x)))));
                sql.Append("),");
            }

            sql = sql.Remove(sql.Length - 1, 1);

            sql.Append("; ");

            return sql;
        }
        #endregion

        #region 构造删除语句
        /// <summary>
        /// 构造删除语句
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="tableName"></param>
        /// <param name="entity"></param>
        /// <returns></returns>
        public StringBuilder BuildDeleteSql<T>(string tableName, T entity) where T : class
        {
            PropertyInfo idPropertyInfo = ReflectionUtil.GetPropertyInfo(entity,"id");
            long id = (long)idPropertyInfo.GetValue(entity);
            return BuildDeleteSql(tableName, id);
        }
        #endregion

        #region 构造删除语句
        /// <summary>
        /// 构造删除语句
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="tableName"></param>
        /// <param name="entitys"></param>
        /// <returns></returns>
        public StringBuilder BuildDeleteSql<T>(string tableName, IEnumerable<T> entitys) where T : class
        {
            StringBuilder sql = new StringBuilder();
            PropertyInfo idPropertyInfo = ReflectionUtil.GetPropertyInfo(entitys.FirstOrDefault(), "id");
            long[] ids = entitys.Select(x => (long)idPropertyInfo.GetValue(x)).ToArray();
            return BuildDeleteSql(tableName, ids);
        }
        #endregion

        #region 构造删除语句
        /// <summary>
        /// 构造删除语句
        /// </summary>
        /// <param name="tableName"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        public StringBuilder BuildDeleteSql(string tableName, long id)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("update {0} set status=1 where id={1};", tableName, id);
            return sql;
        }
        #endregion

        #region 构造删除语句
        public StringBuilder BuildDeleteSql(string tableName, long[] ids)
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat("update {0} set status=1 where id in({1});", tableName, string.Join(",", ids));
            return sql;
        }
        #endregion

        #region 构造更新语句
        /// <summary>
        /// 构造更新语句
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="tableName"></param>
        /// <param name="entity"></param>
        /// <param name="columns"></param>
        /// <returns></returns>
        public StringBuilder BuildUpdateSql<T>(string tableName, T entity, params string[] columns) where T : class
        {
            StringBuilder sql = new StringBuilder();
            List<PropertyInfo> propertyInfos = new List<PropertyInfo>();
            if (columns == null || columns.Length <= 0)
            {
                propertyInfos = GetNeedHandleProperty(entity).ToList();
            }
            else
            {
                propertyInfos = ReflectionUtil.GetPropertyInfos(entity, columns).ToList();
            }

            sql.AppendFormat(" update {0} set ", tableName);

            sql.Append(string.Join(",", propertyInfos.Select(x => string.Format("[{0}]={1}", x.Name,GetSqlData(entity,x)))));

            PropertyInfo idPropertyInfo = ReflectionUtil.GetPropertyInfo(entity,"id");

            long id = (long)idPropertyInfo.GetValue(entity);

            sql.AppendFormat(" where id={0} ;", id);

            return sql;
        }
        #endregion

        #region 构造更新语句
        /// <summary>
        /// 构造更新语句
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="tableName"></param>
        /// <param name="entitys"></param>
        /// <param name="columns"></param>
        /// <returns></returns>

        public StringBuilder BuildUpdateSql<T>(string tableName, IEnumerable<T> entitys, params string[] columns) where T : class
        {
            StringBuilder resultSql = new StringBuilder();
            foreach(var entity in entitys)
            {
                StringBuilder sql = BuildUpdateSql<T>(tableName,entity,columns);
                resultSql.Append(sql.ToString());
            }
            return resultSql;
        }
        #endregion

        //#region 获取ID属性
        ///// <summary>
        ///// 获取ID属性
        ///// </summary>
        ///// <param name="entity"></param>
        ///// <returns></returns>
        //PropertyInfo GetIdPropertyInfo(object entity)
        //{
        //    var propertyInfos = entity.GetType().GetProperties();
        //    foreach (var propertyInfo in propertyInfos)
        //    {
        //        if (propertyInfo.Name.ToLower() == "id") return propertyInfo;
        //    }
        //    return null;
        //}
        //#endregion

        //#region 获取属性
        ///// <summary>
        ///// 获取属性
        ///// </summary>
        ///// <param name="entity"></param>
        ///// <returns></returns>
        //PropertyInfo[] GetPropertyInfos(object entity, string[] columns)
        //{
        //    List<PropertyInfo> result = new List<PropertyInfo>();
        //    var propertyInfos = entity.GetType().GetProperties();

        //    foreach (var propertyInfo in propertyInfos)
        //    {
        //        if (columns.FirstOrDefault(x => x.ToLower() == propertyInfo.Name.ToLower()) != null)
        //            result.Add(propertyInfo);
        //    }
        //    return result.ToArray();
        //}
        //#endregion

        #region 获取需要处理的字段信息
        /// <summary>
        /// 获取需要处理的字段信息
        /// </summary>
        /// <param name="entity"></param>
        PropertyInfo[] GetNeedHandleProperty(object entity)
        {
            List<PropertyInfo> result = new List<PropertyInfo>();
            var propertyInfos = entity.GetType().GetProperties();
            foreach (var propertyInfo in propertyInfos)
            {
                //过滤ID
                if (propertyInfo.Name.ToLower() == "id") continue;
                //过滤 notmapped
                var notMappeds = (NotMappedAttribute[])propertyInfo.GetCustomAttributes(typeof(NotMappedAttribute), false);
                if (notMappeds != null && notMappeds.Length > 0) continue;
                //过滤掉 实体
                if (propertyInfo.PropertyType.FullName.Contains("Yanjun.Framework")) continue;

                result.Add(propertyInfo);
            }
            return result.ToArray();
        }
        #endregion

        #region  C#字段值到SQL字段值的转换
        /// <summary>
        /// C#字段值到SQL字段值的转换
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="propertyInfo"></param>
        /// <returns>字段SQL</returns>
        string GetSqlData(object entity, PropertyInfo propertyInfo)
        {
            string typeName = propertyInfo.PropertyType.Name;
            string typeFullName = propertyInfo.PropertyType.FullName;
            object value = propertyInfo.GetValue(entity, null);



            if (typeFullName.Contains("Nullable"))
            {
                if (value == null)
                {
                    return "null";
                }
            }

            DbType dbType = GetDbTypeByCSType(typeFullName);
            if (dbType == DbType.String)
            {
                if (value != null && value.ToString().Contains("'"))
                {
                    value = value.ToString().Replace("'", "''");
                }

            }
            //Boolean类型
            if (typeFullName.Contains("Boolean"))
            {
                return Convert.ToInt32(value).ToString();
            }
            return string.Format("'{0}'", value);
        }
        #endregion

        #region 根据C#类型获取数据库类型
        /// <summary>
        /// 根据C#类型获取数据库类型
        /// </summary>
        /// <param name="typeFullName"></param>
        /// <returns></returns>
        DbType GetDbTypeByCSType(string typeFullName)
        {
            if (typeFullName.Contains("System.DateTime"))
            {
                return DbType.DateTime;
            }
            if (typeFullName.Contains("System.Boolean"))
            {
                return DbType.Boolean;
            }
            if (typeFullName.Contains("System.Byte"))
            {
                return DbType.Byte;
            }
            if (typeFullName.Contains("System.Int16"))
            {
                return DbType.Int16;
            }
            if (typeFullName.Contains("System.Int32"))
            {
                return DbType.Int32;
            }
            if (typeFullName.Contains("System.Int64"))
            {
                return DbType.Int64;
            }
            if (typeFullName.Contains("System.Single"))
            {
                return DbType.Single;
            }
            if (typeFullName.Contains("System.Double"))
            {
                return DbType.Double;
            }
            if (typeFullName.Contains("System.Decimal"))
            {
                return DbType.Decimal;
            }
            if (typeFullName.Contains("System.Guid"))
            {
                return DbType.Guid;
            }
            if (typeFullName.Contains("System.String"))
            {
                return DbType.String;
            }

            return DbType.String;

        }
        #endregion
    }
}
