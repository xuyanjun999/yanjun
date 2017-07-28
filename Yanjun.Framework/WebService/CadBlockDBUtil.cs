using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yanjun.Framework.Data.DBContext;
using Yanjun.Framework.Domain.Entity.BaseData;
using Yanjun.Framework.Domain.Entity.Data;
using Yanjun.Framework.Domain.Entity.Project;

namespace SGEAP.CadDrawingEntity
{
    public class CadBlockDBUtil
    {
        /// <summary>
        /// 保存动态块
        /// </summary>
        /// <param name="dynamicBlock"></param>
        public static void UpdateDynamicBlock(DynamicBlockEntity[] dynamicBlocks)
        {
            using (var db = new MyDbContext())
            {
                foreach (var dynamicBlock in dynamicBlocks)
                {
                    var blockEntity = db.Set<DynamicBlockEntity>().FirstOrDefault(c => c.Name == dynamicBlock.Name);
                    if (blockEntity == null)
                    {
                        blockEntity = new DynamicBlockEntity()
                        {
                            Name = dynamicBlock.Name,
                            Code = dynamicBlock.Name
                        };
                        db.Set<DynamicBlockEntity>().Add(blockEntity);
                        db.SaveChanges();
                    }

                    foreach (var item in dynamicBlock.DynamicBlockParams)
                    {
                        var paramDefineEntity = db.Set<ParamDefineEntity>().FirstOrDefault(c => c.Code == item.ParamCode);
                        if (paramDefineEntity == null)
                        {
                            paramDefineEntity = new ParamDefineEntity()
                            {
                                Code = item.ParamCode,
                                Name = item.ParamCode,
                                DataType = item.DataType,
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
                        if (!db.Set<DynamicBlockParamEntity>().Any(c => c.DynamicBlockID == blockEntity.ID && c.ParamDefineID == paramDefineEntity.ID))
                        {
                            var dynamicBlockParamEntity = new DynamicBlockParamEntity()
                            {
                                DynamicBlockID = blockEntity.ID,
                                ParamDefineID = paramDefineEntity.ID,
                                DefaultValue = item.DefaultValue,
                                DrawingType = item.DrawingType
                            };
                            db.Set<DynamicBlockParamEntity>().Add(dynamicBlockParamEntity);
                            db.SaveChanges();
                        }
                    }
                }
            }
        }





        public static void UpdateDrawingTask(DrawingTaskEntity task)
        {
            using (var db = new MyDbContext())
            {
                var dbTask = db.Set<DrawingTaskEntity>().FirstOrDefault(c => c.ID == task.ID);
                dbTask.Output = task.Output;
                dbTask.TaskStatus = task.TaskStatus;
                dbTask.StartTime = task.StartTime;
                dbTask.EndTime = task.EndTime;
                db.SaveChanges();
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
