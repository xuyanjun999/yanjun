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
            //判断当前session存不存在此用户
            StaffEntity staff = WebHelper.GetSessionObj(WebHelper.USER_LOGIN_SESSION) as StaffEntity;
            if (staff != null)
            {
                WebHelper.RemoveSession(WebHelper.USER_LOGIN_SESSION);
            }
            string encryptionPwd = EncryptionHelper.GetMd5HashStr(pwd);
            staff = Repository.QueryFirst<StaffEntity>(x => (x.Name == userName || x.Code == userName) && x.Pwd == encryptionPwd);
            if (staff == null)
            {
                throw new Exception(string.Format("用户[{0}]登录失败,请检查用户名和密码。", userName));
            }
            else
            {
                staff.LastLoginIp = ip;
                Repository.Update<StaffEntity>(staff, x => x.LastLoginIp);
                WebHelper.WriteSession<StaffEntity>(WebHelper.USER_LOGIN_SESSION, staff);
            }

            return staff;
            //  StaffEntity 
        }
    }
}
