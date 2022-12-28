using System;
using System.Collections.Generic;
using System.Linq;
using Core.Entities;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Core.Interfaces;

namespace API.Controllers
{
    public class PaymentsController: BaseApiController
    {
        private readonly IPaymentService _paymentService;

        public PaymentsController(IPaymentService paymentService)
        {
            _paymentService = paymentService;            
        }

        [Authorize]
        [HttpPost("{basketId}")]
        public async Task<ActionResult<CustomerBasket>> CreateOrUpdatePaymentIntent(string basketId)
        {
            return await _paymentService.CreateOrUpdatePaymentIntent(basketId);
        }
    }
}