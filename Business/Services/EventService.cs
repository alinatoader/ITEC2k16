using Business.EntitiesMapping;
using ITEC2016.DBModels;
using ITEC2016.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Models;

namespace Business.Services
{
    public class EventService
    {
        private EventMapping em;

        public EventService()
        {
            em = new EventMapping();
        }
        
        public WebEvent save(WebEvent model)
        {
            using (var uow = new UnitOfWork())
            {
                var repo = uow.getRepository<DBEvent>();
                var existing = repo.getAll().FirstOrDefault(a => a.StartTime.ToString() == model.StartTime && a.Title == model.Title);
                if (existing != null)
                    return null;
                repo.save(em.ToDBModel(model));
                uow.saveChanges();
                existing = repo.getAll().FirstOrDefault(a => a.StartTime.ToString() == model.StartTime && a.Title == model.Title);
                return em.ToWebModel(existing);
            }
        }

        public WebEvent remove(int id)
        {
            using (var uow = new UnitOfWork())
            {
                var repo = uow.getRepository<DBEvent>();
                var existing = repo.get(id);
                if (existing != null)
                {
                    repo.remove(id);
                    uow.saveChanges();
                    return em.ToWebModel(existing);
                }
                return null;
            }
        }
        public WebEvent update(WebEvent model)
        {
            using (var uow = new UnitOfWork())
            {
                var repo = uow.getRepository<DBEvent>();
                var existing = repo.get(model.Id);
                if (existing == null)
                    return null;
                repo.update(existing.Id, em.ToDBModel(model));
                uow.saveChanges();
                return model;
            }
        }
        public List<WebEvent> getAll()
        {
            using (var uow = new UnitOfWork())
            {
                var events = uow.getRepository<DBEvent>().getAll().Where(e=>e.StartTime>DateTime.Now);
                List<WebEvent> list = new List<WebEvent>();
                foreach (var e in events)
                    list.Add(em.ToWebModel(e));
                return list;
            }
        }
        public List<WebAccount> getAllAttenders(int idEvent)
        {
            using (var uow = new UnitOfWork())
            {
                var Event = uow.getRepository<DBEvent>().get(idEvent);
                if (Event == null)
                    return null;
                var am = new AccountMapping();
                List<WebAccount> list = new List<WebAccount>();
                var List = Event.Attendants.ToList();
                if (List == null)
                    return list;
                foreach (var a in List)
                    list.Add(am.ToWebModel(a));
                return list;
            }
        }
        public List<WebEvent> getTopEvents()
        {
            using (var uow = new UnitOfWork())
            {
                var events = uow.getRepository<DBEvent>().getAll();
                events=events.OrderByDescending(e => e.Attendants.Count).ToList();
                List<WebEvent> list = new List<WebEvent>();
                foreach (var e in events)
                    list.Add(em.ToWebModel(e));
                return list;
             }
        }

        
    }
}

