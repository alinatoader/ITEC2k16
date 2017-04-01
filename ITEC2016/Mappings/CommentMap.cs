using ITEC2016.DBModels;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITEC2016.Mappings
{
    internal class CommentMap:EntityTypeConfiguration<DBComment>
    {
        public CommentMap() {
            ToTable("Comments");
            HasKey(c =>c.Id);
            Property(c => c.Content);
            Property(c => c.Time);
            Property(c => c.EventId);
            Property(c => c.UserId);
            HasRequired(c => c.User).WithMany().HasForeignKey(c => c.UserId);
        }
    }
}
