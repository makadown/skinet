using System.Collections.Generic;

namespace Core.Entities
{
    public class CustomerBasket
    {
        public CustomerBasket()
        {
            
        }
        public CustomerBasket(string id)
        {
            Id = id;
        }

        public string Id { get; set; }
        public List<BasketItem> Items { get; set; } = new List<BasketItem>();
        public int? DeliveryMethodId { get; set; }
        /// <summary>
        /// This is going to be used by Stripe so the user can confirm
        /// the payment's intent.
        /// </summary>
        /// <value></value>
        public string ClientSecret { get; set; }
        public string PaymentIntentId { get; set; }
    }
}