import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IOrder } from '../../shared/models/order';
import { BasketService } from '../../basket/basket.service';
import { IBasket } from '../../shared/models/basket';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit {
  @Input() checkoutForm: FormGroup;

  constructor(private basketService: BasketService, 
    private checkoutService: CheckoutService,
    private toastrService: ToastrService) {

    }

  ngOnInit(): void {
  }

  submitOrder() {
    const basket = this.basketService.getCurrentBasketValue();
    const orderToCreate = this.getOrderToCreate(basket as IBasket);
    this.checkoutService.createOrder(orderToCreate)
      .subscribe((order: IOrder) => {
          this.toastrService.success('Order created succesfully.');
          this.basketService.deleteLocalBasket(basket!.id);
          console.log(order);
      }, error => {
        this.toastrService.error(error.message);
        console.error(error);
      });
  }
  
  getOrderToCreate(basket: IBasket) {
    return {
      basketId: basket.id,
      deliveryMethodId: +this.checkoutForm.get('deliveryForm')?.get('deliveryMethod')?.value,
      shipToAddress: this.checkoutForm.get('addressForm')?.value
    };
  }

}
