using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITEC2016.DBModels
{
    public class DBInterest
    {
        private int id;
        private TypeOfInterest type;
        private string name;

        public DBInterest()
        {
            Accounts = new HashSet<DBAccount>();
        }

        public int Id { get => id; set => id = value; }
        public TypeOfInterest Type { get => type; set => type = value; }
        public string Name { get => name; set => name = value; }
        public virtual ICollection<DBAccount> Accounts { get; set; }
    }
}
