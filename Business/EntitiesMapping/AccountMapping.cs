using ITEC2016.DBModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Models;

namespace Business.EntitiesMapping
{
    public class AccountMapping:IModelsMapping<DBAccount,WebAccount>
    {

        public DBAccount ToDBModel(WebAccount model)
        {
            DBAccount account = new DBAccount();
            account.Id = model.Id;
            account.FirstName = model.FirstName;
            account.LastName = model.LastName;
            account.Username = model.Username;
            account.Password = model.Password;
            account.LoggedIn = model.LoggedIn;
            return account;
        }
        public WebAccount ToWebModel(DBAccount model)
        {
            WebAccount account = new WebAccount();
            account.Id = model.Id;
            account.FirstName = model.FirstName;
            account.LastName = model.LastName;
            account.Username = model.Username;
            account.Password = model.Password;
            account.LoggedIn = model.LoggedIn;
            return account;
        }
    }
}
