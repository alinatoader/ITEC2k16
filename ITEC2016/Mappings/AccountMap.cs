using ITEC2016.DBModels;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITEC2016.Mappings
{
    internal class AccountMap: EntityTypeConfiguration<DBAccount>
    {
        public AccountMap()
        {
            ToTable("Accounts");
            HasKey(a => a.Id);
            Property(a => a.FirstName);
            Property(a => a.LastName);
            Property(a => a.Username);
            Property(a => a.Password);
            Property(a => a.LoggedIn);
            HasMany(a => a.Interests).WithMany(i=>i.Accounts).Map(a => a.MapLeftKey("AccountId").MapRightKey("InterestId").ToTable("Accounts_Interests"));
            
        }
    }
}
