﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Yanjun.Framework.Code.Web
{
    public class WebHelper
    {

        public static readonly string USER_LOGIN_SESSION = "user_login_session";

        #region Session操作
        /// <summary>
        /// 写Session
        /// </summary>
        /// <typeparam name="T">Session键值的类型</typeparam>
        /// <param name="key">Session的键名</param>
        /// <param name="value">Session的键值</param>
        public static void WriteSession<T>(string key, T value)
        {
            if (string.IsNullOrEmpty(key))
                return;
           HttpContext.Current.Session[key] = value;
        }

        /// <summary>
        /// 写Session
        /// </summary>
        /// <param name="key">Session的键名</param>
        /// <param name="value">Session的键值</param>
        public static void WriteSession(string key, string value)
        {
            WriteSession<string>(key, value);
        }

        /// <summary>
        /// 读取Session的值
        /// </summary>
        /// <param name="key">Session的键名</param>        
        public static string GetSession(string key)
        {
            if (string.IsNullOrEmpty(key))
                return string.Empty;
            return HttpContext.Current.Session[key] as string;
        }

        /// <summary>
        /// 读取Session的值
        /// </summary>
        /// <param name="key">Session的键名</param>        
        public static object GetSessionObj(string key)
        {
            if (string.IsNullOrEmpty(key))
                return null;
            if (HttpContext.Current.Session == null)
                return null;
            return HttpContext.Current.Session[key];
        }

        /// <summary>
        /// 删除指定Session
        /// </summary>
        /// <param name="key">Session的键名</param>
        public static void RemoveSession(string key)
        {
            if (string.IsNullOrEmpty(key))
                return;
            HttpContext.Current.Session.Contents.Remove(key);
        }

        #endregion
    }
}
