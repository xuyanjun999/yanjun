using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yanjun.Framework.Data.DBContext;
using Yanjun.Framework.Data.Repository;
using Yanjun.Framework.Data.SQL;
using Yanjun.Framework.Domain.Entity.BaseData;
using Yanjun.Framework.Domain.Entity.Data;
using Yanjun.Framework.Domain.Entity.Org;
using Yanjun.Framework.Domain.Entity.Project;

namespace SGEAP.CadDrawingEntity
{
    public class CadBlockDBUtil
    {
        /// <summary>
        /// 保存动态块
        /// </summary>
        /// <param name="dynamicBlock"></param>
        public static void UpdateReadBlockResult(BlockEntity[] blocks, string user)
        {
            using (var db = new MyDbContext())
            {
                foreach (var block in blocks)
                {
                    var blockEntity = db.Set<BlockEntity>().FirstOrDefault(c => c.Name == block.Name);
                    if (blockEntity == null)
                    {
                        blockEntity = new BlockEntity()
                        {
                            CreateOn = DateTime.Now,
                            UpdateOn = DateTime.Now,
                            Name = block.Name,
                            Code = block.Name,
                            CreateDate = DateTime.Now,
                            CreateUser = user,
                            BlockGroup = "未设置"
                        };
                        db.Set<BlockEntity>().Add(blockEntity);
                        db.SaveChanges();
                    }

                    foreach (var item in block.BlockParams)
                    {
                        var paramDefineEntity = db.Set<ParamDefineEntity>().FirstOrDefault(c => c.Code == item.ParamCode);
                        if (paramDefineEntity == null)
                        {
                            paramDefineEntity = new ParamDefineEntity()
                            {
                                CreateOn = DateTime.Now,
                                UpdateOn = DateTime.Now,
                                Code = item.ParamCode,
                                Name = item.ParamCode,
                                DataType = item.DataType,
                                ParamClass = "未设置"
                            };
                            db.Set<ParamDefineEntity>().Add(paramDefineEntity);
                            db.SaveChanges();
                        }
                        else
                        {
                            paramDefineEntity.Code = item.ParamCode;
                            paramDefineEntity.Name = item.ParamCode;
                            paramDefineEntity.DataType = item.DataType;
                            db.SaveChanges();
                        }
                        if (!db.Set<BlockParamEntity>().Any(c => c.BlockID == blockEntity.ID && c.ParamDefineID == paramDefineEntity.ID))
                        {
                            var blockParamEntity = new BlockParamEntity()
                            {
                                CreateOn = DateTime.Now,
                                UpdateOn = DateTime.Now,
                                BlockID = blockEntity.ID,
                                ParamDefineID = paramDefineEntity.ID,
                                DefaultValue = item.DefaultValue,
                                DrawingType = item.DrawingType
                            };
                            db.Set<BlockParamEntity>().Add(blockParamEntity);
                            db.SaveChanges();
                        }
                    }
                }
            }
        }





        public static void UpdateDrawingTask(DrawingTaskEntity task)
        {


            using (RepositoryBase repository = new RepositoryBase())
            {
                try
                {
                    repository.MyContext = new MyDbContext();
                    repository.SQLBuilder = new MSSQLBuilder();
                    repository.BeginTran();

                    var dbTask = repository.QueryFirst<DrawingTaskEntity>(c => c.ID == task.ID);
                    dbTask.Output = task.Output;
                    dbTask.TaskStatus = task.TaskStatus;
                    //  dbTask.StartTime = task.StartTime;
                    dbTask.EndTime = task.EndTime;
                    repository.Update<DrawingTaskEntity>(dbTask);
                    repository.Commit();
                }
                catch (Exception ex)
                {
                    repository.Rollback();
                    throw ex;
                }
                finally
                {

                }

            }
        }

        public static DrawingTaskEntity GetDrawingTask(long id)
        {
            using (var db = new MyDbContext())
            {
                return db.Set<DrawingTaskEntity>().FirstOrDefault(x => x.ID == id);
            }
        }
    }
}
