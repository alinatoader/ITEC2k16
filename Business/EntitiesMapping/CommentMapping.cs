using ITEC2016.DBModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Models;

namespace Business.EntitiesMapping
{
    public class CommentMapping:IModelsMapping<DBComment,WebComment>
    {
        public DBComment ToDBModel(WebComment model)
        {
            DBComment comment = new DBComment();

            comment.Id = model.Id;
            comment.EventId = model.EventId;
            comment.UserId = model.UserId;
            comment.Content = model.Content;
            comment.Time = model.Time;

            return comment;
        }

        public WebComment ToWebModel(DBComment model)
        {
            WebComment comment = new WebComment();

            comment.Id = model.Id;
            comment.EventId = model.EventId;
            comment.UserId = model.UserId;
            comment.Content = model.Content;
            comment.Time = model.Time;
            return comment;
        }
    }
}
