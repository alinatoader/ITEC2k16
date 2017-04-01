using ITEC2016.DBModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Models;

namespace Business.EntitiesMapping
{
    public class InterestMapping:IModelsMapping<DBInterest,WebInterest>
    {
        public DBInterest ToDBModel(WebInterest model)
        {
            DBInterest interest = new DBInterest();
            interest.Id = model.Id;
            interest.Name = model.Name;
            interest.Type = (TypeOfInterest)Enum.Parse(typeof(TypeOfInterest), model.Type, true);

            return interest;
        }
        
        public WebInterest ToWebModel(DBInterest model)
        {
            WebInterest interest = new WebInterest();
            interest.Id = model.Id;
            interest.Name = model.Name;
            interest.Type = model.Type.ToString();
            return interest;
        }
    }
}
