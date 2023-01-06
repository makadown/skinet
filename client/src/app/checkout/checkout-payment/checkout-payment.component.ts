import { Component, Input, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IOrder } from '../../shared/models/order';
import { BasketService } from '../../basket/basket.service';
import { IBasket } from '../../shared/models/basket';
import { CheckoutService } from '../checkout.service';
import { NavigationExtras, Router } from '@angular/router';

declare var Stripe: (arg0: string) => any;

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements AfterViewInit, OnDestroy {
  @Input() checkoutForm: FormGroup;
  @ViewChild('cardNumber', {static: true}) cardNumberElement: ElementRef;
  @ViewChild('cardExpiry', {static: true}) cardExpiryElement: ElementRef;
  @ViewChild('cardCvc', {static: true}) cardCvcElement: ElementRef;
  /**
   * Object to access remote stripe js functionality from
   * https://js.stripe.com/v3/
   * which is in index.html
   */
  stripe: any;
  cardNumber: any;
  cardExpiry: any;
  cardCvc: any;
  cardErrors: any;

  constructor(private basketService: BasketService, 
    private checkoutService: CheckoutService,
    private toastrService: ToastrService,
    private router: Router) {

    }

  ngOnDestroy(): void {
    this.cardNumber.destroy();
    this.cardExpiry.destroy();
    this.cardCvc.destroy();
  }

  ngAfterViewInit(): void {
    this.stripe = Stripe('pk_test_vWNlHoiyr6xkKaTAWWtfMQy300sw223fuY');
    const elements = this.stripe.elements();

    this.cardNumber = elements.create('cardNumber');
    this.cardNumber.mount(this.cardNumberElement.nativeElement);

    this.cardExpiry = elements.create('cardExpiry');
    this.cardExpiry.mount(this.cardExpiryElement.nativeElement);

    this.cardCvc = elements.create('cardCvc');
    this.cardCvc.mount(this.cardCvcElement.nativeElement);
  }

  submitOrder() {
    const basket = this.basketService.getCurrentBasketValue();
    const orderToCreate = this.getOrderToCreate(basket as IBasket);
    this.checkoutService.createOrder(orderToCreate)
      .subscribe((order: IOrder) => {
          this.toastrService.success('Order created succesfully.');
          this.basketService.deleteLocalBasket(basket!.id);
          const navigationExtras: NavigationExtras = {state: order};
          this.router.navigate(['checkout/success'], navigationExtras);
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
