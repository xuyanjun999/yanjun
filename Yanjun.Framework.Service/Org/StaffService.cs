using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yanjun.Framework.Code.Util;
using Yanjun.Framework.Code.Web;
using Yanjun.Framework.Domain.Entity.Org;
using Yanjun.Framework.Domain.Service;

namespace Yanjun.Framework.Service.Org
{

    public class StaffService : ServiceBase, IStaffService
    {
        public StaffEntity Login(string userName, string pwd, string ip)
        {
            //判断当前session钟存不存在此用户
            StaffEntity staff = WebHelper.GetSessionObj(WebHelper.USER_LOGIN_SESSION) as StaffEntity;
            if (staff != null)
            {
                //判断ip和此现在的登录ip是否相同
                if (staff.LastLoginIp != ip)
                {
                    WebHelper.RemoveSession(WebHelper.USER_LOGIN_SESSION);
                    throw new Exception(string.Format("此用户已登录,请重新登录。"));
                }
            }
            else
            {
                string encryptionPwd = EncryptionHelper.GetMd5HashStr(pwd);
                staff = Repository.QueryFirst<StaffEntity>(x => x.CnName == userName && x.Pwd == encryptionPwd);
                if (staff == null)
                {
                    throw new Exception(string.Format("用户[{0}]登录失败,请检查用户名和密码。"));
                }
                else
                {
                    staff.LastLoginIp = ip;
                    Repository.Update<StaffEntity>(staff, x => x.LastLoginIp);
                    WebHelper.WriteSession<StaffEntity>(WebHelper.USER_LOGIN_SESSION, staff);
                }
            }
            return staff;
            //  StaffEntity 
        }
    }
}
