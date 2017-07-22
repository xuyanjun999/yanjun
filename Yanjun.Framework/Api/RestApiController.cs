using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Results;
using Yanjun.Framework.Code.Web.Dto;
using Yanjun.Framework.Domain.Entity;

namespace Yanjun.Framework.Mvc.Api
{
    public class RestApiController<T> : ApiControllerBase where T : BaseEntity, new()
    {

        [HttpGet]
        public virtual JsonResult<RestResponseDto> Get(long id,string include)
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
            return Json<RestResponseDto>(res);
        }

        [HttpPost]
        public virtual JsonResult<RestResponseDto> Post(T entity)
        {
            RestResponseDto res = new RestResponseDto();
            try
            {
                Repository.Insert(entity);
                res.Entitys = new object[] { Repository.QueryFirst<T>(x => x.ID == entity.ID) };
                res.Success = true;
            }
            catch (Exception ex)
            {
                res.Success = false;
                res.Message = ex.Message;
                Log.Error(ex);
            }
            return Json<RestResponseDto>(res);
        }

        [HttpPut]
        public virtual JsonResult<RestResponseDto> Put(T entity)
        {
            RestResponseDto res = new RestResponseDto();
            try
            {
                Repository.Update<T>(entity);
                res.Entitys = new object[] { Repository.QueryFirst<T>(x => x.ID == entity.ID) };
                res.Success = true;
            }
            catch (Exception ex)
            {
                res.Success = false;
                res.Message = ex.Message;
                Log.Error(ex);
            }
            return Json<RestResponseDto>(res);
        }

        [HttpDelete]
        public virtual JsonResult<RestResponseDto> Delete(T entity)
        {
            RestResponseDto res = new RestResponseDto();
            try
            {
                entity.StatusEnum = BaseEntityStatus.Delete;
                Repository.Update(entity);
                res.Success = true;
            }
            catch (Exception ex)
            {
                res.Success = false;
                res.Message = ex.Message;
                Log.Error(ex);
            }
            return Json<RestResponseDto>(res);
        }

    }
}