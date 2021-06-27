using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Core.Specifications
{
    /// <summary>
    /// Interface for Specification.
    /// Study this concept with caution!
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public interface ISpecification<T>
    {
        /// <summary>
        /// For "WHERE" expressions
        /// </summary>
        /// <value></value>
        Expression<Func<T, bool>> Criteria { get; }
        /// <summary>
        /// For Include(s) that an entity may have
        /// </summary>
        /// <value></value>
        List<Expression<Func<T, object>>> Includes { get; }
        Expression<Func<T, object>> OrderBy { get; }
        Expression<Func<T, object>> OrderByDescending { get; }
    }
}