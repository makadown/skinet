import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account/account.service';
import { BasketService } from '../basket/basket.service';
import { IBasket } from '../shared/models/basket';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  constructor(private fb: FormBuilder, private accountService: AccountService,
      private basketService: BasketService) {}

  ngOnInit(): void {
    this.createCheckoutForm();
    this.getDeliveryMethodValue();
    this.getAddressFormValues();
  }

  createCheckoutForm() {
    this.checkoutForm = this.fb.group({
      // make sure checkout-address.component.html has a formGroupName with exactly this name and
      // its control names match the controls from addressForm
      addressForm: this.fb.group({
          firstName: [null, Validators.required],
          lastName: [null, Validators.required],
          street: [null, Validators.required],
          city: [null, Validators.required],
          state: [null, Validators.required],
          zipCode: [null, Validators.required]
      }),
      deliveryForm: this.fb.group({
        deliveryMethod: [null, Validators.required],
      }),
      paymentForm: this.fb.group({
        nameOnCard: [null, Validators.required]
      })
    });
  }

  getAddressFormValues() {
    this.accountService
        .getUserAddress()
        .subscribe(address => {
          if(address) {
            this.checkoutForm.get('addressForm')?.patchValue(address);
          }
        }, console.error);
  }

  getDeliveryMethodValue() {
    const basket = this.basketService.getCurrentBasketValue() as IBasket;
    if (basket.deliveryMethodId !== null)  {
      this.checkoutForm.get('deliveryForm')?.get('deliveryMethod')?.patchValue(basket.deliveryMethodId?.toString());
    }
  }
}
