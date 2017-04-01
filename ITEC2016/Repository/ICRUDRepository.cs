using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITEC2016
{
    interface ICRUDRepository<E>
    {
        E get(int id);
        IEnumerable<E> getAll();
        void save(E item);
        void remove(int id);
        void update(int id,E newItem);
        

    }
}
