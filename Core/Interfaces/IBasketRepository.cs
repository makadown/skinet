using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    /// <summary>
    /// This repository is a unique repository since it manages a REDIS db.
    /// This will be the only repository that is going to be apart from the Unit of Work implementation in this app.
    /// </summary>
    public interface IBasketRepository
    {
        Task<CustomerBasket> GetBasketAsync(string basketId);
        Task<CustomerBasket> UpdateBasketAsync(CustomerBasket basket);
        Task<bool> DeleteBasketAsync(string basketId);
    }
}