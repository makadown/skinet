using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities.OrderAggregate
{
    /// <summary>
    /// This custom class allows us to take a 'snapshot' of the product item
    /// that was ordered, and this is just based on the fact that product names
    /// could change, the picture could change, but we always want to keep
    /// the order as the order was made rather than relating to another entity.
    /// </summary>
    public class ProductItemOrdered
    {
        public ProductItemOrdered()
        {
        }

        public ProductItemOrdered(int productItemId, string productName, string pictureUrl)
        {
            ProductItemId = productItemId;
            ProductName = productName;
            PictureUrl = pictureUrl;
        }

        public int ProductItemId { get; set; }
        public string ProductName { get; set; }
        public string PictureUrl { get; set; }
    }
}