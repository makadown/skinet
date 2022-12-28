using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class CustomerBasketDto
    {
        [Required]
        public string Id { get; set; }
        [Required, MinLength(1, ErrorMessage = "The 'items' field should have a minimum length of 1")]
        public List<BasketItemDto> Items { get; set; } = new List<BasketItemDto>();

        #region still testing if these are gonna stay here 
        public int? DeliveryMethodId { get; set; }
        /// <summary>
        /// This is going to be used by Stripe so the user can confirm
        /// the payment's intent.
        /// </summary>
        /// <value></value>
        public string ClientSecret { get; set; }
        public string PaymentIntentId { get; set; }
        #endregion
    }
}