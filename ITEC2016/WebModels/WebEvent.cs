using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class WebEvent
    {
        private int id;
        private string title;
        private string description;
        private string startTime;

        public int Id { get => id; set => id = value; }
        [Required]
        public string Title { get => title; set => title = value; }
        [Required]
        public string Description { get => description; set => description = value; }
        [Required]
        public string StartTime { get => startTime; set => startTime = value; }
    }
}