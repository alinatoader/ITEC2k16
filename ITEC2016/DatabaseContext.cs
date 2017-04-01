using ITEC2016.DBModels;
using ITEC2016.Mappings;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITEC2016
{
    public class DatabaseContext : DbContext
    {
        public DbSet<DBAccount> Accounts { get; set; }
        public DbSet<DBComment> Comments { get; set; }
        public DbSet<DBEvent> Events { get; set; }
        public DbSet<DBInterest> Interests { get; set; }
        public object ObjectStateManager { get; set; }

        public DatabaseContext() : base("DatabaseContext")
        {
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();
            modelBuilder.Conventions.Remove<NavigationPropertyNameForeignKeyDiscoveryConvention>();


            modelBuilder.Configurations.Add(new AccountMap());
            modelBuilder.Configurations.Add(new CommentMap());
            modelBuilder.Configurations.Add(new EventMap());
            modelBuilder.Configurations.Add(new InterestMap());
    
        }
    }
}
