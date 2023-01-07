import {
  Component,
  Input,
  AfterViewInit,
  ElementRef,
  ViewChild,
  OnDestroy,
} from '@angular/core';
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
  styleUrls: ['./checkout-payment.component.scss'],
})
export class CheckoutPaymentComponent implements AfterViewInit, OnDestroy {
  @Input() checkoutForm: FormGroup;
  @ViewChild('cardNumber', { static: true }) cardNumberElement: ElementRef;
  @ViewChild('cardExpiry', { static: true }) cardExpiryElement: ElementRef;
  @ViewChild('cardCvc', { static: true }) cardCvcElement: ElementRef;
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
  cardHandler = this.onChange.bind(this);
  loading = false;
  cardNumberValid = false;
  cardExpiryValid = false;
  cardCvcValid = false;

  constructor(
    private basketService: BasketService,
    private checkoutService: CheckoutService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

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
    this.cardNumber.addEventListener('change', this.cardHandler);

    this.cardExpiry = elements.create('cardExpiry');
    this.cardExpiry.mount(this.cardExpiryElement.nativeElement);
    this.cardExpiry.addEventListener('change', this.cardHandler);

    this.cardCvc = elements.create('cardCvc');
    this.cardCvc.mount(this.cardCvcElement.nativeElement);
    this.cardCvc.addEventListener('change', this.cardHandler);
  }

  onChange(event: any): void {
    console.log(event);
    if (event.error) {
      this.cardErrors = event.error.message;
    } else {
      this.cardErrors = null;
    }
    switch(event.elementType) {
      case 'cardNumber':
          this.cardNumberValid = event.complete;
          break;
      case 'cardExpiry':
          this.cardExpiryValid = event.complete;
          break;
      case 'cardCvc':
          this.cardCvcValid = event.complete;
          break;
    }
  }

  async submitOrder() {
    this.loading = true;
    const basket = this.basketService.getCurrentBasketValue();
    try {
          const createdOrder = await this.createOrder(basket);
          const paymentResult = await this.confirmPaymentWithStripe(basket as IBasket);

          if (paymentResult.paymentIntent) {
            this.basketService.deleteLocalBasket(basket!.id);
            const navigationExtras: NavigationExtras = { state: createdOrder };
            this.router.navigate(['checkout/success'], navigationExtras);
          } else {
            this.toastrService.error(paymentResult.error.message);
          }
          this.loading = false;
    } catch(error) {
      console.error(error);
      this.loading = false;
    }    
  }

  private async confirmPaymentWithStripe(basket: IBasket) {
    return this.stripe.confirmCardPayment(basket?.clientSecret, {
      payment_method: {
        card: this.cardNumber,
        billing_details: {
          name: this.checkoutForm.get('paymentForm')?.get('nameOnCard')!.value,
        },
      },
    });
  }

  private async createOrder(basket: IBasket | null) {
    const orderToCreate = this.getOrderToCreate(basket as IBasket);
    return this.checkoutService.createOrder(orderToCreate).toPromise();
  }

  getOrderToCreate(basket: IBasket) {
    return {
      basketId: basket.id,
      deliveryMethodId: +this.checkoutForm
        .get('deliveryForm')
        ?.get('deliveryMethod')?.value,
      shipToAddress: this.checkoutForm.get('addressForm')?.value,
    };
  }
}
