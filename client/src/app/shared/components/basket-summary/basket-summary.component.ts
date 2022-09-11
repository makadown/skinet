import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from '../../../basket/basket.service';
import { IBasket, IBasketItem } from '../../models/basket';
import { IOrder, IOrderItem } from '../../models/order';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss']
})
export class BasketSummaryComponent implements OnInit {
  basket$!: Observable<IBasket | null>;
  @Input() isBasket = true;
  @Output() decrement: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Output() increment: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Output() remove: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  /**
   * Use only when showing order details
   */
  @Input() order: IOrder;

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  removeBasketItem(item: IBasketItem) {
    this.remove.emit(item);
  }

  decrementItemQuantity(item: IBasketItem) {
    this.decrement.emit(item);
  }

  incrementItemQuantity(item: IBasketItem) {
    this.increment.emit(item);
  }

}
