using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using System.Web.Mvc;
using Yanjun.Framework.Code.Util;
using Yanjun.Framework.Code.Web;
using Yanjun.Framework.Code.Web.Dto;
using Yanjun.Framework.Data.Repository;
using static Yanjun.Framework.Code.Web.Dto.QueryArg;
using System.Text;
using Newtonsoft.Json;
using Yanjun.Framework.Domain.Entity;

namespace Yanjun.Framework.Mvc.Areas
{
    public class MyController<T> : Controller where T : BaseEntity, new()
    {
        /// <summary>
        /// 日志对象
        /// </summary>
        public ILog Log { get; set; }

        /// <summary>
        /// 存储操作对象
        /// </summary>
        public IRepositoryBase Repository { get; set; }

        [HttpGet]
        public virtual JsonResult Get(long id, string include)
        {
            RestResponseDto res = new RestResponseDto();
            try
            {
                var includes = string.IsNullOrEmpty(include) ? null : include.Split(new char[] { ',' });
                T entity = Repository.QueryFirst<T>(x => x.ID == id, includes);
                res.Entitys = new object[] { entity };
                res.Success = true;
            }
            catch (Exception ex)
            {
                res.Success = false;
                res.Message = ex.Message;
                Log.Error(ex);
            }

            return MyJson(res);
        }

        [HttpPost]
        public virtual JsonResult Add(T entity)
        {
            RestResponseDto res = new RestResponseDto();
            try
            {
                Repository.BeginTran();
                Repository.Insert(entity);
                res.Entitys = new object[] { Repository.QueryFirst<T>(x => x.ID == entity.ID) };
                Repository.Commit();
                res.Success = true;
            }
            catch (Exception ex)
            {
                Repository.Rollback();
                res.Success = false;
                res.Message = ex.Message;
                Log.Error(ex);
            }
            return MyJson(res);
        }

        [HttpPost]
        public virtual JsonResult Update(T entity)
        {
            RestResponseDto res = new RestResponseDto();
            try
            {
                Repository.BeginTran();
                Repository.Update<T>(entity);
                res.Entitys = new object[] { Repository.QueryFirst<T>(x => x.ID == entity.ID) };
                Repository.Commit();
                res.Success = true;
            }
            catch (Exception ex)
            {
                Repository.Rollback();
                res.Success = false;
                res.Message = ex.Message;
                Log.Error(ex);
            }
            return MyJson(res);
        }

        public virtual JsonResult Gets(CommonAjaxArgs args)
        {
            EntityResponseDto res = new EntityResponseDto();
            try
            {

                var predicate = ExpressionUtil.GetSearchExpression(typeof(T), args.Query.Searchs) as Expression<Func<T, bool>>;

                var page = args.Query.Page;

                if (page.PageSize <= 0)
                {
                    page.PageSize = 500;
                }

                Sorter sort = new Sorter() { SortField = "ID", SortOrder = System.Data.SqlClient.SortOrder.Descending };
                if (args.Query.Sorters != null && args.Query.Sorters.Count > 0)
                {
                    sort = args.Query.Sorters.First();
                }
                string[] includes = args.Query.IncludeEntityPaths == null ? null : args.Query.IncludeEntityPaths.ToArray();
                res.Count = Repository.GetQueryExp<T>(predicate, includes).Count();
                res.Entitys = Repository.QueryPage<T>(predicate, new Pagination() { page = page.PageIndex, rows = page.PageSize, sidx = sort.SortField, sord = sort.SortOrder == System.Data.SqlClient.SortOrder.Ascending ? "asc" : "desc" }, includes);
                res.Success = true;
            }
            catch (Exception ex)
            {
                res.Success = false;
                res.Message = ex.Message;
                Log.Error(ex);
            }
            return MyJson(res);
        }

        public JsonResult Delete(long[] ids)
        {
            EntityResponseDto res = new EntityResponseDto();
            try
            {
                Repository.BeginTran();
                Repository.Delete<T>(ids);
                Repository.Commit();
                res.Success = true;
            }
            catch (Exception ex)
            {
                Repository.Rollback();
                res.Success = false;
                res.Message = ex.Message;
                Log.Error(ex);
            }
            return MyJson(res);
        }


        public MyJsonResult MyJson(object data, JsonRequestBehavior jsonRequestBehavior = JsonRequestBehavior.AllowGet)
        {
            MyJsonResult result = new MyJsonResult() { Data = data, JsonRequestBehavior= jsonRequestBehavior };
            return result;
        }
    }

    public class MyJsonResult : System.Web.Mvc.JsonResult
    {
        public override void ExecuteResult(ControllerContext context)
        {
            if (context == null)
                throw new ArgumentNullException("context");

            var response = context.HttpContext.Response;

            response.ContentType = !String.IsNullOrEmpty(ContentType)
                ? ContentType
                : "application/json";

            if (ContentEncoding != null)
                response.ContentEncoding = ContentEncoding;


            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.DateFormatHandling = DateFormatHandling.IsoDateFormat;
            // If you need special handling, you can call another form of SerializeObject below
            var serializedObject = JsonConvert.SerializeObject(Data, settings);
            response.Write(serializedObject);
        }
    }
}