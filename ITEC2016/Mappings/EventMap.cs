using ITEC2016.DBModels;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITEC2016.Mappings
{
    internal class EventMap: EntityTypeConfiguration<DBEvent>
    {
        public EventMap()
        {
            ToTable("Events");
            HasKey(e => e.Id);
            Property(e => e.Title);
            Property(e => e.Description);
            Property(e => e.StartTime);
            HasMany(e => e.Tags).WithMany().Map(a => a.MapLeftKey("EventId").MapRightKey("InterestId").ToTable("Events_Interests"));
            HasMany(e => e.Comments).WithRequired(c=>c.Event).HasForeignKey(c=>c.EventId);
            HasMany(e => e.Attendants).WithMany(a=>a.Events).Map(a => a.MapLeftKey("EventId").MapRightKey("AccountId").ToTable("Accounts_Events"));
        }
    }
}
