using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities.OrderAggregate
{
    /// <summary>
    /// This custom class is going to allow the user to choose
    /// what sort of delivery they want.
    /// And this has a base entity because we want it to have an ID
    /// and we want our client to be able to retrieve the list of
    /// delivery methods.
    /// </summary>
    public class DeliveryMethod: BaseEntity
    {
        public string ShortName { get; set; }
        public string DeliveryTime { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
    }
}