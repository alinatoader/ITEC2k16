using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.EntitiesMapping
{
    interface IModelsMapping<Db,Web>
    {
        Db ToDBModel(Web model);
        Web ToWebModel(Db model);
    }
}
