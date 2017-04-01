using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITEC2016.DBModels
{
    public class DBEvent
    {
        private int id;
        private string title;
        private string description;
        private DateTime startTime;


        public int Id { get => id; set => id = value; }
        public string Title { get => title; set => title = value; }
        public string Description { get => description; set => description = value; }
        public DateTime StartTime { get => startTime; set => startTime = value; }

        public virtual ICollection<DBAccount> Attendants { get; set; }
        public virtual ICollection<DBInterest> Tags { get; set; }
        public virtual ICollection<DBComment> Comments { get; set; }

        public DBEvent()
        {
            Attendants = new HashSet<DBAccount>();
            Tags = new HashSet<DBInterest>();
            Comments = new HashSet<DBComment>();
        }
    }
}
