using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITEC2016.DBModels
{
    public class DBComment
    {
        private int id,eventId, userId;
        private string content;
        private DateTime time;
        public int Id { get => id; set => id = value; }
        public int EventId { get => eventId; set => eventId = value; }
        public int UserId { get => userId; set => userId = value; }
        public string Content { get => content; set => content = value; }
        public DateTime Time { get => time; set => time = value; }
        public virtual DBAccount User { get; set; }
        public virtual DBEvent Event { get; set; }
    }
}
