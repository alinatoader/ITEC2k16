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
    public class InterestService
    {
        private InterestMapping im;
        public InterestService()
        {
            im = new InterestMapping();
        }

        public WebInterest add(WebInterest model)
        {
            using (var uow = new UnitOfWork())
            {
                var repo = uow.getRepository<DBInterest>();
                var co = im.ToDBModel(model);
                repo.save(co);
                uow.saveChanges();
                var i = repo.getAll().FirstOrDefault(x => x.Type == co.Type && x.Name == co.Name);
                return im.ToWebModel(i);
            }
        }
        public int add(int interestId,int accountId)
        {
            using (var uow = new UnitOfWork())
            {
                var interest = uow.getRepository<DBInterest>().get(interestId);
                var account = uow.getRepository<DBAccount>().get(accountId);
                if (interest == null)
                    return -1;
                if (account == null)
                    return -1;
                account.Interests.Add(interest);
                uow.saveChanges();
                return 0;

            }
        }
        public int remove(int interestId, int accountId)
        {
            using(var uow =new UnitOfWork())
            {
                var interest = uow.getRepository<DBInterest>().get(interestId);
                var account = uow.getRepository<DBAccount>().get(accountId);
                if (interest == null)
                    return -1;
                if (account == null)
                    return -1;
                account.Interests.Remove(interest);
                uow.saveChanges();
                return 0;
            }
        }
        public List<WebInterest> getTopInterest(int id)
        {
            using (var uow = new UnitOfWork())
            {
                var interests = uow.getRepository<DBInterest>().getAll().Where(i=>i.Type==(TypeOfInterest)id);
                interests = interests.OrderByDescending(i => i.Accounts.Count);
                List<WebInterest> list = new List<WebInterest>();
                foreach (var i in interests)
                    list.Add(im.ToWebModel(i));
                return list;
            }
        }
        public List<WebInterest> getByAccountId(int id)
        {
            using (var uow = new UnitOfWork())
            {
                List<WebInterest> list = new List<WebInterest>();
                var account = uow.getRepository<DBAccount>().get(id);
                if (account == null)
                    return null;
                foreach (var i in account.Interests)
                    list.Add(im.ToWebModel(i));
                return list;
            }
        }
        public List<WebInterest> getAll()
        {
            
                using (var uow = new UnitOfWork())
                {
                    var r = uow.getRepository<DBInterest>().getAll();
                    List<WebInterest> list = new List<WebInterest>();
                    foreach (var rr in r)
                    {
                        list.Add(im.ToWebModel(rr));
                    }
                return list;
                }
            
        }

        public List<WebInterest> getByEventId(int id)
        {
            using (var uow = new UnitOfWork())
            {
                List<WebInterest> list = new List<WebInterest>();
                var ev = uow.getRepository<DBEvent>().get(id);
                if (ev == null)
                    return null;
                foreach (var i in ev.Tags)
                    list.Add(im.ToWebModel(i));
                return list;
            }
        }


    }
}
