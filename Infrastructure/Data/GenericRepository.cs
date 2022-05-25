using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
        private readonly StoreContext _context;

        public GenericRepository(StoreContext context)
        {
            _context = context;
        }

        public async Task<T> GetByIdAsync(int id)
        {
            return await _context.Set<T>().FindAsync(id);
        }

        public async Task<IReadOnlyList<T>> ListAllAsync()
        {
            return await _context.Set<T>().ToListAsync();
        }

        public async Task<T> GetEntityWithSpec(ISpecification<T> spec)
        {
            return await ApplySpecification(spec).FirstOrDefaultAsync();
        }

        public async Task<IReadOnlyList<T>> ListAsync(ISpecification<T> spec)
        {
            return await ApplySpecification(spec).ToListAsync();
        }

        public async Task<int> CountAsync(ISpecification<T> spec)
        {
            return await ApplySpecification(spec).CountAsync();
        }

        private IQueryable<T> ApplySpecification(ISpecification<T> spec)
        {
            return SpecificationEvaluator<T>.GetQuery(_context.Set<T>().AsQueryable(), spec);
        }

        /// <summary>
        /// Begins tracking the given entity, and any other reachable entities that are 
        /// not already being tracked, in the EntityState.Added state such that they will 
        /// be inserted into the database when _context.SaveChanges() is called.
        /// </summary>
        /// <param name="entity"></param>
        public void Add(T entity)
        {
            _context.Set<T>().Add(entity);
        }

        /// <summary>
        /// Begins tracking the given entity and entries reachable from the given entity 
        /// using the EntityState.Modified state.
        /// Generally, no database interaction will be performed until _context.SaveChanges() is called.
        /// A recursive search of the navigation properties will be performed to find 
        /// reachable entities that are not already being tracked by the context. 
        /// All entities found will be tracked by the context.
        /// </summary>
        /// <param name="entity"></param>
        public void Update(T entity)
        {
            _context.Set<T>().Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
        }

        /// <summary>
        /// Begins tracking the given entity in the EntityState.Deleted state such that it 
        /// will be removed from the database when _context.SaveChanges() is called.
        /// If the entity is already tracked in the EntityState.Added state then 
        /// the context will stop tracking the entity 
        /// (rather than marking it as EntityState.Deleted) since the entity was previously 
        /// added to the context and does not exist in the database.
        /// </summary>
        /// <param name="entity"></param>
        public void Delete(T entity)
        {
            _context.Set<T>().Remove(entity);
        }
    }
}