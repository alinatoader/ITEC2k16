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
    public class AccountService
    {
        private AccountMapping am;
        public AccountService()
        {
            am = new AccountMapping();
        }

        public WebAccount save(WebAccount model)
        {
            using (var uow = new UnitOfWork())
            {
                var repo = uow.getRepository<DBAccount>();
                var existing = repo.getAll().FirstOrDefault(a => a.Username == model.Username);
                if (existing != null)
                    return null;
                repo.save(am.ToDBModel(model));
                uow.saveChanges();
                existing = repo.getAll().FirstOrDefault(a => a.Username == model.Username);
                return am.ToWebModel(existing);
            }
        }

        public WebAccount update(WebAccount model)
        {
            using(var uow=new UnitOfWork())
            {
                var repo = uow.getRepository<DBAccount>();
                var accounts = repo.getAll();
                if (model.FirstName == null)
                {
                    var existing = accounts.FirstOrDefault(a => a.Username == model.Username && a.Password == model.Password);
                    if (existing == null)
                        return null;
                    var aa = am.ToDBModel(model);
                    aa.Id = existing.Id;
                    aa.FirstName = existing.FirstName;
                    aa.LastName = existing.LastName;
                    repo.update(existing.Id,aa );
                    uow.saveChanges();
                    var acc = am.ToWebModel(aa);
                    return acc;
                }
                else
                {
                    var newA = am.ToDBModel(model);
                    repo.update(newA.Id, newA);
                    uow.saveChanges();
                    return am.ToWebModel(newA);
                }
            }
        }

        public bool checkAttendingEvent(int accountId,DateTime time)
        {
            using(var uow=new UnitOfWork())
            {
                var account = uow.getRepository<DBAccount>().get(accountId);
                var ev = account.Events.FirstOrDefault(e => e.StartTime == time);
                if (ev != null)
                    return true;
                return false;
            }
        }

        public int joinEvent(int accountId,int eventId)
        {
            using (var uow = new UnitOfWork())
            {
                var ev = uow.getRepository<DBEvent>().get(eventId);
                if (ev == null)
                    return -1;
                if (ev.StartTime.CompareTo(DateTime.Now) < 0)
                    return -2;
                var account = uow.getRepository<DBAccount>().get(accountId);
                if (account == null)
                    return -1;
                var ok = checkAttendingEvent(accountId, ev.StartTime);
                if (ok == true)
                    return -3;
                ev.Attendants.Add(account);
                uow.saveChanges();
                return 0;
            }
        }
        public int unjoinEvent(int accountId, int eventId)
        {
            using (var uow = new UnitOfWork())
            {
                var ev = uow.getRepository<DBEvent>().get(eventId);
                if (ev == null)
                    return -1;
                var account = uow.getRepository<DBAccount>().get(accountId);
                if (account == null)
                    return -1;
                ev.Attendants.Remove(account);
                uow.saveChanges();
                return 0;
            }
        }

        public List<WebEvent> getEvents(int accountId)
        {
            using (var uow = new UnitOfWork())
            {
                EventMapping em = new EventMapping();
                var account = uow.getRepository<DBAccount>().get(accountId);
                if (account == null)
                    return null;
                List<WebEvent> events = new List<WebEvent>();
                foreach (var e in account.Events)
                    events.Add(em.ToWebModel(e));
                return events;
            }
        }

        public WebAccount get(int id)
        {
            using(var uow=new UnitOfWork())
            {
                var account = uow.getRepository<DBAccount>().get(id);
                if (account == null)
                    return null;
                return am.ToWebModel(account);
            }
        }
    }
}
