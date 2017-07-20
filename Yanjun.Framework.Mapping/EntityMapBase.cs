using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yanjun.Framework.Domain.Entity;

namespace Yanjun.Framework.Mapping
{
    public class EntityMapBase<T> : EntityTypeConfiguration<T> where T : BaseEntity
    {
        public EntityMapBase(string tableName)
        {
            this.ToTable(tableName);
            this.HasKey(x => x.ID);
            this.Property(x => x.ID).HasDatabaseGeneratedOption(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity);
        }
    }
}
