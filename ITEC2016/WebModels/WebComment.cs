using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class WebComment
    {
        private int id, eventId, userId;
        private string content;
        private DateTime time;
        public int Id { get => id; set => id = value; }

        [Required]
        public int EventId { get => eventId; set => eventId = value; }
        [Required]
        public int UserId { get => userId; set => userId = value; }
        [Required]
        public string Content { get => content; set => content = value; }
        [Required]
        public DateTime Time { get => time; set => time = value; }
    }
}