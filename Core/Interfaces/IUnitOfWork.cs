using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IUnitOfWork: IDisposable
    {
        IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity;
        /// <summary>
        /// Any changes that attracts by entity framework are going to be saved into a DB at this point.
        /// If This fails, then any changes that have taken place inside the method where this was invoked is
        /// going to be rolled back and send an error.
        /// </summary>
        /// <returns></returns>
        Task<int> Complete();
    }
}