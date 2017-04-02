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
    public class CommentService
    {
        private CommentMapping cm;
        public CommentService()
        {
            cm = new CommentMapping();
        }

        public WebComment save(WebComment model)
        {
            using (var uow = new UnitOfWork())
            {
                var repo = uow.getRepository<DBComment>();
                var existing = repo.getAll().FirstOrDefault(c => c.EventId == model.EventId && c.UserId == model.UserId);
                if (existing != null)
                    return null;
                if (uow.getRepository<DBAccount>().get(model.UserId) == null || uow.getRepository<DBEvent>().get(model.EventId) == null)
                    return null;
                repo.save(cm.ToDBModel(model));
                uow.saveChanges();
                return cm.ToWebModel(repo.getAll().FirstOrDefault(c => c.EventId == model.EventId && c.UserId == model.UserId));
            }
        }
        public WebComment remove(int id)
        {
            using (var uow = new UnitOfWork())
            {
                var repo = uow.getRepository<DBComment>();
                var exist = repo.get(id);
                if (exist == null)
                    return null;
                repo.remove(id);
                uow.saveChanges();
                return cm.ToWebModel(exist);
            }
        }
        public WebComment update(WebComment newComment)
        {
            using(var uow = new UnitOfWork())
            {
                var repo = uow.getRepository<DBComment>();
                var exist = repo.get(newComment.Id);
                if (exist == null)
                    return null;
                repo.update(newComment.Id, cm.ToDBModel(newComment));
                uow.saveChanges();
                return cm.ToWebModel(repo.getAll().FirstOrDefault(c=>c.Id==newComment.Id));
            }
        }
        public List<WebComment> getAllByEventId(int id)
        {
            using(var uow= new UnitOfWork())
            {
                var Event = uow.getRepository<DBEvent>().get(id);
                if (Event == null)
                    return null;
                List<DBComment> comments = Event.Comments.ToList();
                Comparison<DBComment> cmp = (DBComment c1, DBComment c2) =>
                {
                    return c2.Time.CompareTo(c1.Time);
                };
                comments.Sort(cmp);
                List<WebComment> list = new List<WebComment>();
                foreach (var c in comments)
                    list.Add(cm.ToWebModel(c));
                return list;
            }
        }
    }
}
