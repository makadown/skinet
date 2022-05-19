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
    }
}