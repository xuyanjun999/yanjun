using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yanjun.Framework.Code.Web.Dto
{
    public class BaseAjaxArgs
    {
        /// <summary>
        /// 
        /// </summary>
        public BaseAjaxArgs()
        {
            //this.ActionDes = "未知操作";
            //this.LogAction = true;
        }

        /// <summary>
        /// 操作动作描述 用于记录操作数据日志
        /// </summary>
        public string ActionDes { get; set; }

        /// <summary>
        /// 是否记录此动作操作
        /// </summary>
        public bool LogAction { get; set; }


        /// <summary>
        /// 对象形式的额外参数集
        /// </summary>
        public Dictionary<string, object> JsonExtraDatas = new Dictionary<string, object>();


        /// <summary>
        /// 是否存在此扩展属性
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public bool Contain(string key)
        {
            return JsonExtraDatas.ContainsKey(key);
        }

        /// <summary>
        /// 获得额外数据
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public object GetData(string key)
        {
            if (!Contain(key)) return null;
            return JsonExtraDatas[key];
        }

        /// <summary>
        /// 获得数组
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public object[] GetArray(string key)
        {
            var ret = GetData(key) as IEnumerable<object>;
            if (ret == null)
            {
                if (Contain(key))
                {
                    return new object[] { GetData(key) };
                }
                return new object[] { };
            }
            return ret.Cast<object>().ToArray();
        }

        /// <summary>
        /// 获得int型的额外数据 不存在或异常返回int最小值
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public int GetInt(string key)
        {
            try
            {
                return Convert.ToInt32(GetData(key));
            }
            catch
            {
                return int.MinValue;
            }
        }
        /// <summary>
        /// 获取长整形
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public long? GetLong(string key)
        {
            try
            {
                var d = GetData(key);
                if (d == null) return null;
                return Convert.ToInt32(d);
            }
            catch
            {
                return null;
            }
        }


        /// <summary>
        /// 获得DateTime型的额外数据 不存在或异常返回DateTime最小值
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public DateTime GetDateTime(string key)
        {
            try
            {
                return Convert.ToDateTime(GetData(key));
            }
            catch
            {
                return DateTime.MinValue;
            }
        }

        /// <summary>
        /// 获得string型的额外数据 不存在或异常返回string.empty
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public string GetStr(string key)
        {
            try
            {
                return GetData(key).ToString().Trim();
            }
            catch
            {
                return string.Empty;
            }
        }

        /// <summary>
        /// 获得bool型的额外数据 不存在或异常返回false
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public bool GetBool(string key)
        {
            try
            {
                return Convert.ToBoolean(GetData(key));
            }
            catch
            {
                return false;
            }
        }
    }
}