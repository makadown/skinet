import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createCheckoutForm();
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
}
