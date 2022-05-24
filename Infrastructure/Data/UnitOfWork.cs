using System.Collections;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;

namespace Infrastructure.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly StoreContext _context;
        private Hashtable _repositories;

        public UnitOfWork(StoreContext context)
        {
            _context = context;
        }

        public async Task<int> Complete()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }

        /// <summary>
        /// Whenever we use this method:
        /// 1 - We are going to give it the type of the entity that's 
        ///     going to check to see if there's already a hash table created because we have
        ///     already created another instance of another repository. 
        /// 2 - It's going to check the TEntity, what its name is, let's say its "Products".
        /// 3 - It's going to check to see if our repositories hash table already contains
        ///     a repository with this particular type (i.e. "Products"). 
        ///     If it doesn't, then we are going to create a repository type of generic repository,
        ///     and then we are going to generate or create an instance of this repository of the 
        ///     product (TEntity) and pass in the context that we are going to get from our unit of work,
        ///     and then we add this repository to the hash table.
        /// 4 - We return the hash table element corresponding to the Product.
        /// 
        /// Rather than using or creating an instance of our context, 
        /// when we create a repository instance, we are going to be passing in the context
        /// that our units of work owns as a parameter into that repository.
        /// </summary>
        /// <typeparam name="TEntity"></typeparam>
        /// <returns></returns>
        public IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity
        {
            if (_repositories == null) _repositories = new Hashtable();

            var typeName = typeof(TEntity).Name;

            if(!_repositories.ContainsKey(typeName))
            {
                var repositoryType = typeof(GenericRepository<>);                
                var repositoryInstance = Activator
                    .CreateInstance(repositoryType.MakeGenericType( typeof(TEntity)), _context);

                _repositories.Add(typeName, repositoryInstance);
            }

            return (IGenericRepository<TEntity>) _repositories[typeName];
        }
    }
}