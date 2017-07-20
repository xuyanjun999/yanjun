using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

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
    }
}
