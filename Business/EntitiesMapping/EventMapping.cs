using ITEC2016.DBModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Models;

namespace Business.EntitiesMapping
{
    public class EventMapping:IModelsMapping<DBEvent,WebEvent>
    {
        public DBEvent ToDBModel(WebEvent model)
        {
            DBEvent Event = new DBEvent();

            Event.Id = model.Id;
            Event.StartTime = DateTime.Parse(model.StartTime);
            Event.Description = model.Description;
            Event.Title = model.Title;
            return Event;
        }
        public WebEvent ToWebModel(DBEvent model)
        {
            WebEvent Event = new WebEvent();

            Event.Id = model.Id;
            Event.StartTime = model.StartTime.ToString();
            Event.Description = model.Description;
            Event.Title = model.Title;
            return Event;
        }
    }
}
