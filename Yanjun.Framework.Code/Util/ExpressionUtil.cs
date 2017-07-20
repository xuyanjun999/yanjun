using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Yanjun.Framework.Code.Web.Dto;

namespace Yanjun.Framework.Code.Util
{
    public class ExpressionUtil
    {
        public static List<string> GetPropertyName<T>(Expression<Func<T, object>>[] expressions)
        {
            List<string> columns = new List<string>();
            if (expressions != null && expressions.Length > 0)
            {
                foreach (Expression<Func<T, object>> expression in expressions)
                {

                    MemberExpression memberExpression = null;
                    memberExpression = expression.Body as MemberExpression;
                    if (memberExpression == null)
                    {
                        //判断是否为可控操作符
                        var unaryExp = expression.Body as UnaryExpression;
                        if (unaryExp != null)
                        {
                            memberExpression = unaryExp.Operand as MemberExpression;
                        }
                    }
                    string columnName = memberExpression.Member.Name;
                    columns.Add(columnName);
                }
            }
            return columns;
        }

        #region 表达式相关功能

        /// <summary>
        /// 获取每个查询条件单元
        /// </summary>
        /// <param name="fieldName"></param>
        /// <param name="values"></param>
        /// <param name="param"></param>
        /// <returns></returns>
        public static Expression GetSearchItemExpression(SearchOperator op, string fieldName, string rightFieldName, object[] values, ParameterExpression param)
        {
            if (string.IsNullOrEmpty(fieldName))
            {
                return null;
            }
            if (values == null || values.Length == 0)
            {
                values = new object[] { null };
            }
            switch (op)
            {
                case SearchOperator.Like:
                    return GetLikeExpression(param, fieldName, values[0].ToString());
                case SearchOperator.Equal:
                    return GetEquelExpression(param, fieldName, rightFieldName, values[0]);
                case SearchOperator.NotEqual:
                    return GetNotEquelExpression(param, fieldName, rightFieldName, values[0]);
                case SearchOperator.GreaterThan:
                    return GetGreaterExpression(param, false, fieldName, values[0]);
                case SearchOperator.GreaterThanOrEqual:
                    return GetGreaterExpression(param, true, fieldName, values[0]);
                case SearchOperator.LessThan:
                    return GetLessExpression(param, false, fieldName, values[0]);
                case SearchOperator.LessThanOrEqual:
                    return GetLessExpression(param, true, fieldName, values[0]);
                case SearchOperator.In:
                    return GetInExpression(param, fieldName, values);
                case SearchOperator.NotIn:
                    return GetNotInExpression(param, fieldName, values);
            }
            return null;
        }
        /// <summary>
        /// 获取搜索表达式
        /// </summary>
        /// <returns></returns>
        public static Expression GetSearchExpression(Type entityType, List<BaseSearchItem> searchItems)
        {
            if (searchItems == null || searchItems.Count == 0) return null;
            searchItems = searchItems.OrderBy(item => item.SearchGroupID).ToList();
            var param = GetEntityTypeParamPre(entityType);

            List<Expression> expGroupList = new List<Expression>();
            //组之间的逻辑关系
            List<LogicalRelOperator> groupRelList = new List<LogicalRelOperator>();
            Expression exp = null;
            int? curGroupID = null;
            foreach (var search in searchItems)
            {
                if (!curGroupID.HasValue)
                {
                    curGroupID = search.SearchGroupID;
                    groupRelList.Add(search.RelOperator);
                }

                Expression rightExp =
                    GetSearchItemExpression(search.Operator, search.FieldName, search.RightFieldName, search.Values, param);
                if (rightExp == null) continue;

                //判断是否在同一组 如果不是启动另外分组
                if (curGroupID != search.SearchGroupID && exp != null)
                {
                    groupRelList.Add(search.RelOperator);
                    expGroupList.Add(exp);
                    curGroupID = search.SearchGroupID;
                    exp = null;
                }

                if (exp == null)
                {
                    exp = rightExp;
                    continue;
                }

                if (search.RelOperator == LogicalRelOperator.And)
                {
                    exp = Expression.And(exp, rightExp);
                }
                else if (search.RelOperator == LogicalRelOperator.Or)
                {
                    exp = Expression.Or(exp, rightExp);
                }
                else if (search.RelOperator == LogicalRelOperator.Not)
                {
                    //leftExp = Expression.Not(leftExp, exp);
                }
            }
            if (exp != null)
            {
                expGroupList.Add(exp);
                exp = null;
            }
            if (expGroupList.Count == 0) return null;

            for (var i = 0; i < expGroupList.Count; i++)
            {
                var expItem = expGroupList[i];
                var rel = groupRelList[i];
                if (exp == null)
                {
                    exp = expItem;
                    continue;
                }
                if (rel == LogicalRelOperator.Or)
                {
                    exp = Expression.Or(exp, expItem);
                }
                else
                {
                    exp = Expression.And(exp, expItem);
                }
            }

            //暂且使用and拼接所有组

            return Expression.Lambda(exp, param);
        }


        /// <summary>
        /// 获得实例数据属性的表达式 会自动嵌套获取
        /// </summary>
        /// <param name="entityTypeParam"></param>
        /// <param name="fieldName"></param>
        /// <returns></returns>
        public static MemberExpression GetEntityAttrExp(ParameterExpression entityTypeParam, string fieldName, bool nullValue)
        {
            string[] fieldNames = fieldName.Split('.');
            MemberExpression body = null;
            for (int i = 0; i < fieldNames.Length; i++)
            {
                if (body == null)
                {
                    body = LambdaExpression.Property(entityTypeParam, fieldNames[i]);
                }
                else
                {
                    body = LambdaExpression.Property(body, fieldNames[i]);
                }
            }

            if (nullValue)
            {
                return body;
            }

            if (Nullable.GetUnderlyingType(body.Type) != null)
            {
                body = LambdaExpression.Property(body, "Value");
            }
            return body;
        }
        /// <summary>
        /// 获得数据类型的参数表达式
        /// </summary>
        /// <param name="entityType"></param>
        /// <returns></returns>
        private static ParameterExpression GetEntityTypeParamPre(Type entityType)
        {
            return LambdaExpression.Parameter(entityType);
        }

        /// <summary>
        /// 根据表达式属性类型 获得 常量表达式
        /// </summary>
        /// <param name="value"></param>
        /// <param name="valueType"></param>
        /// <returns></returns>
        private static ConstantExpression GetConstExp(object value, Type valueType)
        {
            if (valueType == value.GetType())
            {
                return LambdaExpression.Constant(value, valueType);
            }
            try
            {
                //把常量转化成相对应的字段属性类型
                object newObj = Convert.ChangeType(value, valueType);
                return LambdaExpression.Constant(newObj, valueType);
            }
            catch
            {
                return LambdaExpression.Constant(value, valueType);
            }
        }
        /// <summary>
        /// 获得Like的表达式 
        /// </summary>
        private static Expression GetLikeExpression(ParameterExpression entityTypeParam, string fieldName, string value)
        {
            var body = GetEntityAttrExp(entityTypeParam, fieldName, value == null);
            var constant = LambdaExpression.Constant(value, typeof(string));
            return Expression.Call(body, typeof(string).GetMethod("Contains", new Type[] { typeof(string) }), constant);
        }

        /// <summary>
        /// 获得Equel的表达式 
        /// </summary>
        private static Expression GetEquelExpression(ParameterExpression entityTypeParam, string fieldName, string rightFieldName, object value)
        {
            //查询是否 join条件查询
            if (!string.IsNullOrEmpty(rightFieldName))
            {
                var fieldExp = GetEntityAttrExp(entityTypeParam, fieldName, false);
                var joinFieldExp = GetEntityAttrExp(entityTypeParam, rightFieldName, false);
                return Expression.Equal(fieldExp, joinFieldExp);
            }

            var body = GetEntityAttrExp(entityTypeParam, fieldName, value == null);
            //排除空值情况
            if (value == null)
            {
                return Expression.Equal(body, LambdaExpression.Constant(null));
            }
            var constant = GetConstExp(value, body.Type);
            return Expression.Equal(body, constant);
        }

        /// <summary>
        /// 获得NotEquel的表达式 
        /// </summary>
        private static Expression GetNotEquelExpression(ParameterExpression entityTypeParam, string fieldName, string rightFieldName, object value)
        {
            //查询是否 join条件查询
            if (!string.IsNullOrEmpty(rightFieldName))
            {
                var fieldExp = GetEntityAttrExp(entityTypeParam, fieldName, false);
                var joinFieldExp = GetEntityAttrExp(entityTypeParam, rightFieldName, false);
                return Expression.NotEqual(fieldExp, joinFieldExp);
            }

            var body = GetEntityAttrExp(entityTypeParam, fieldName, value == null);
            //排除空值情况
            if (value == null)
            {
                return Expression.NotEqual(body, LambdaExpression.Constant(null));
            }
            var constant = GetConstExp(value, body.Type);
            return Expression.NotEqual(body, constant);
        }

        /// <summary>
        /// 获得Greater的表达式 containEquel 是否包含等于
        /// </summary>
        private static Expression GetGreaterExpression(
            ParameterExpression entityTypeParam, bool containEquel, string fieldName, object value)
        {
            var body = GetEntityAttrExp(entityTypeParam, fieldName, value == null);

            var constant = GetConstExp(value, body.Type);
            if (containEquel)
            {
                return Expression.GreaterThanOrEqual(body, constant);
            }
            return Expression.GreaterThan(body, constant);
        }
        /// <summary>
        /// 获得Less的表达式 containEquel 是否包含等于
        /// </summary>
        private static Expression GetLessExpression(
            ParameterExpression entityTypeParam, bool containEquel, string fieldName, object value)
        {
            var body = GetEntityAttrExp(entityTypeParam, fieldName, value == null);
            var constant = GetConstExp(value, body.Type);
            if (containEquel)
            {
                return Expression.LessThanOrEqual(body, constant);
            }
            return Expression.LessThan(body, constant);
        }
        /// <summary>
        /// in的表达式
        /// </summary>
        /// <param name="entityTypeParam"></param>
        /// <param name="fieldName"></param>
        /// <param name="values"></param>
        /// <returns></returns>
        private static Expression GetInExpression(ParameterExpression entityTypeParam, string fieldName, object[] values)
        {
            if (values == null || values.Length == 0)
            {
                throw new Exception("IN表表达式条件值不能为空.");
            }
            var body = GetEntityAttrExp(entityTypeParam, fieldName, false);
            var type = values[0].GetType();

            if (body.Type.FullName == "System.Int32")
            {
                var equals = values.Select(value => (Expression)Expression.Equal(body, Expression.Constant(Convert.ToInt32(value), typeof(Int32))));
                return equals.Aggregate<Expression>((accumulate, equal) => Expression.Or(accumulate, equal));
            }
            else
            {
                var equals = values.Select(value => (Expression)Expression.Equal(body, Expression.Constant(value, body.Type)));
                return equals.Aggregate<Expression>((accumulate, equal) => Expression.Or(accumulate, equal));
            }


        }
        /// <summary>
        /// NotIn的表达式
        /// </summary>
        /// <param name="entityTypeParam"></param>
        /// <param name="fieldName"></param>
        /// <param name="values"></param>
        /// <returns></returns>
        private static Expression GetNotInExpression(ParameterExpression entityTypeParam, string fieldName, object[] values)
        {
            if (values == null || values.Length == 0)
            {
                throw new Exception("NotIn表表达式条件值不能为空.");
            }
            var body = GetEntityAttrExp(entityTypeParam, fieldName, false);
            var equals = values.Select(value => (Expression)Expression.NotEqual(body, Expression.Constant(value, body.Type)));
            return equals.Aggregate<Expression>((accumulate, equal) => Expression.And(accumulate, equal));
        }
        /// <summary>
        /// 根据属性表达式获取属性名字
        /// </summary>
        /// <param name="property"></param>
        /// <returns></returns>
        public string GetNameByPropertyExp<TEntity>(Expression<Func<TEntity, object>> property)
            where TEntity : class
        {
            MemberExpression memberExp = null;

            memberExp = property.Body as MemberExpression;
            if (memberExp == null)
            {
                //判断是否为可控操作符
                var unaryExp = property.Body as UnaryExpression;
                if (unaryExp != null)
                {
                    memberExp = unaryExp.Operand as MemberExpression;
                }
            }
            if (memberExp == null)
            {

                throw new System.FormatException("propertys必须为属性表达式.");
            }
            return memberExp.Member.Name;
        }
        #endregion
    }
}
