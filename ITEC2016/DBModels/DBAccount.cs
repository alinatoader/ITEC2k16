using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITEC2016.DBModels
{
    public class DBAccount
    {
        private int id;
        private string username;
        private string password;
        private string firstName;
        private string lastName;
        private int loggedIn;

        public int Id { get => id; set => id = value; }
        public string Username { get => username; set => username = value; }
        public string Password { get => password; set => password = value; }
        public string FirstName { get => firstName; set => firstName = value; }
        public string LastName { get => lastName; set => lastName = value; }

        public virtual ICollection<DBInterest> Interests { get; set; }
        public virtual  ICollection<DBEvent> Events { get; set; }
        public int LoggedIn { get => loggedIn; set => loggedIn = value; }

        public DBAccount()
        {
            Interests = new HashSet<DBInterest>();
            Events = new HashSet<DBEvent>();
        }
    }
}
