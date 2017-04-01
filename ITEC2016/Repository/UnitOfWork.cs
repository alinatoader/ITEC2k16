using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITEC2016.Repository
{
    public class UnitOfWork : IDisposable
    {
        private DatabaseContext context;

        public UnitOfWork()
        {
            context = new DatabaseContext();
        }

        public void Dispose()
        {
            context.Dispose();
            GC.SuppressFinalize(this);
        }

        public CRUDRepository<E> getRepository<E>() where E:class
        {
            return new CRUDRepository<E>(context);
        }

        public void saveChanges()
        {
            context.SaveChanges();
        }

    }
}
