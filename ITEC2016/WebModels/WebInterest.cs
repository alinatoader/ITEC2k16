using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class WebInterest
    {
        private int id;
        private string type;
        private string name;

        public int Id { get => id; set => id = value; }
        [Required]
        public string Type { get => type; set => type = value; }
        [Required]
        public string Name { get => name; set => name = value; }
        
    }
}