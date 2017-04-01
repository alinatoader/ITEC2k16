using ITEC2016.DBModels;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITEC2016.Mappings
{
    internal class InterestMap:EntityTypeConfiguration<DBInterest>
    {
        public InterestMap()
        {
            ToTable("Interests");
            HasKey(i => i.Id);
            Property(i => i.Type);
            Property(i => i.Name);
        }
    }
}
