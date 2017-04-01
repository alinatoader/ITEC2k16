using ITEC2016.DBModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services
{
    public class TypeOfInterestService
    {
        public string getTypesOfInterest()
        {
            List < string > list= new List<string>();
            foreach (var item in Enum.GetNames(typeof(TypeOfInterest)))
            {
                string name = item;
                int id=(int)Enum.Parse(typeof(TypeOfInterest), item);
                string obj = "{\"Id\":\""+id+"\", \"Name\":\""+name+"\"}";
                list.Add(obj);
            }
            string json = "[";
            foreach (string o in list)
                json = json + o + ",";
            json=json.Remove(json.Length - 1, 1);
            json = json + "]";
            return json;
        }
    }
}
