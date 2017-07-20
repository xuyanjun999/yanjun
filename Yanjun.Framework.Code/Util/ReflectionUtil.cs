using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Yanjun.Framework.Code.Util
{
    public class ReflectionUtil
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="obj"></param>
        /// <param name="propertyName"></param>
        /// <returns></returns>
        public static PropertyInfo GetPropertyInfo(object obj, string propertyName)
        {
            var propertyInfos = obj.GetType().GetProperties();
            foreach (var propertyInfo in propertyInfos)
            {
                if (propertyInfo.Name.ToLower() == propertyName.ToLower()) return propertyInfo;
            }
            return null;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="obj"></param>
        /// <param name="propertyName"></param>
        /// <returns></returns>
        public static object GetPropertyValue(object obj, string propertyName)
        {
            var propertyInfos = obj.GetType().GetProperties();
            foreach (var propertyInfo in propertyInfos)
            {
                if (propertyInfo.Name.ToLower() == propertyName.ToLower()) return propertyInfo.GetValue(obj);
            }
            return null;
        }


        public static void SetPropertyValue(object obj, string propertyName, object propertyValue)
        {
            var propertyInfo = GetPropertyInfo(obj, propertyName);
            if (propertyInfo != null)
            {
                propertyInfo.SetValue(obj, propertyValue);
            }
        }

        public static void SetPropertyValue(IEnumerable<object> objs, string propertyName, object propertyValue)
        {
            var propertyInfo = GetPropertyInfo(objs.FirstOrDefault(), propertyName);
            if (propertyInfo != null)
            {
                foreach(var obj in objs)
                {
                    propertyInfo.SetValue(obj, propertyValue);
                }
                
            }
        }

        #region 获取属性
        /// <summary>
        /// 获取属性
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static PropertyInfo[] GetPropertyInfos(object obj, string[] propertyNames)
        {
            List<PropertyInfo> result = new List<PropertyInfo>();
            var propertyInfos = obj.GetType().GetProperties();

            foreach (var propertyInfo in propertyInfos)
            {
                if (propertyNames.FirstOrDefault(x => x.ToLower() == propertyInfo.Name.ToLower()) != null)
                    result.Add(propertyInfo);
            }
            return result.ToArray();
        }
        #endregion
    }
}
