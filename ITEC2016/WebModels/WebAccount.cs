using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class WebAccount
    {
        private int id;
        private string username;
        private string password;
        private string firstName;
        private string lastName;

        public int Id { get => id; set => id = value; }
        [Required]
        public string Username { get => username; set => username = value; }
        [Required]
        public string Password { get => password; set => password = value; }
        
        public string FirstName { get => firstName; set => firstName = value; }
        
        public string LastName { get => lastName; set => lastName = value; }
        public int LoggedIn { get; set; }
    }
}