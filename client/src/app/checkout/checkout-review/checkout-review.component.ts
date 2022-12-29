import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from '../../shared/models/basket';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss']
})
export class CheckoutReviewComponent implements OnInit {
   basket$: Observable<IBasket>;
  constructor(private basketService: BasketService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$ as Observable<IBasket>;
  }

  createPaymentIntent() {
    return this.basketService.createPaymentIntent()
        .subscribe( (response:any) => {
           this.toastr.success('Payment intent created');
        }, error => {
          console.error(error);
          this.toastr.error(error.message);
        });
  }
}
