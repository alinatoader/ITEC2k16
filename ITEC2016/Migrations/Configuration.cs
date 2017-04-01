using ITEC2016.DBModels;
using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITEC2016.Migrations
{
    internal sealed class Configuration : DbMigrationsConfiguration<DatabaseContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(DatabaseContext context)
        {
            var ali = new DBAccount { Id = 1, Username="ali",FirstName = "Alina", LastName = "Toader", Password = "alina"};
            var bogdi = new DBAccount { Id = 2, Username = "bogdi", FirstName = "Bogdan", LastName = "Vorobet", Password = "bogdan" };
            var interests = new DBInterest[] {
                new DBInterest { Id = 1,Type=TypeOfInterest.Food, Name = "Pizza" },
                new DBInterest { Id = 2,Type=TypeOfInterest.Location, Name = "City center" },
                new DBInterest { Id = 3,Type=TypeOfInterest.Eating_Place, Name = "Rex Pizza Restaurant" },
                new DBInterest { Id = 4,Type=TypeOfInterest.Eating_Place, Name = "Tina" },
                new DBInterest { Id = 5,Type=TypeOfInterest.Eating_Place, Name = "Toskana" },
                new DBInterest { Id = 6,Type=TypeOfInterest.Food, Name = "Lasagna" },
                new DBInterest { Id = 7,Type=TypeOfInterest.Food, Name = "Chicken soup" },
            };
            var events = new DBEvent[] {
                new DBEvent { Id = 1, Title="Italian lunch",Description="Come and join me!!",StartTime=new DateTime(2017,3,27,14,0,0) },
                new DBEvent { Id = 2, Title="Fancy event",Description="Party after. Don t miss!!",StartTime=new DateTime(2017,3,27,18,0,0) },
                new DBEvent { Id = 3, Title="Romanian dinner",Description="Best sausages ever <3",StartTime=new DateTime(2017,4,5,20,30,0) },
                new DBEvent { Id = 4, Title="Mexican lunch",Description="Salsa after. Come and show us your talent!!",StartTime=new DateTime(2017,4,7,14,45,0) },
                new DBEvent { Id = 5, Title="Wine degusting",Description="Don t miss the opportunity to taste the best wines in the town. Come with a partner and you may go home with a bottle for free!!!",StartTime=new DateTime(2017,5,1,21,45,0) },
            };

            var comment = new DBComment { EventId = 1, UserId = 1, Content = "Super tare!!! Ne vedem acolooo", Time = new DateTime(2017, 3, 27, 14, 30, 0) };
            ali.Events.Add(events[0]);
            events[1].Attendants.Add(ali);
            foreach (var i in interests)
                ali.Interests.Add(i);
            bogdi.Interests.Add(interests[0]);
            bogdi.Interests.Add(interests[1]);

            events[0].Tags.Add(interests[0]);
            events[0].Tags.Add(interests[1]);
            events[1].Tags.Add(interests[1]);
            events[0].Comments.Add(comment);

            context.Accounts.AddOrUpdate(ali);
            context.Accounts.AddOrUpdate(bogdi);
            context.Interests.AddOrUpdate(interests);
            context.Comments.AddOrUpdate(comment);
            context.Events.AddOrUpdate(events);
            
        }
    }
}
