import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {
  Basket,
  IBasket,
  IBasketItem,
  IBasketTotals,
} from '../shared/models/basket';
import { IDeliveryMethod } from '../shared/models/deliveryMethod';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket | null>(null);
  basket$ = this.basketSource.asObservable();

  private basketTotalSource = new BehaviorSubject<IBasketTotals | null>(null);
  basketTotal$ = this.basketTotalSource.asObservable();

  shipping = 0;

  constructor(private httpClient: HttpClient) {}

  createPaymentIntent() {
    return this.httpClient.post<IBasket>(this.baseUrl + 'payments/' + 
                                this.getCurrentBasketValue()!.id, {})
            .pipe(
              map((basket: IBasket) => {
                this.basketSource.next(basket);
                // console.log('Basket value: ', this.getCurrentBasketValue());
              })
            );
  }

  setShippingPrice(deliveryMethod: IDeliveryMethod) {
      this.shipping = deliveryMethod.price;
      const basket = this.getCurrentBasketValue() as IBasket;
      basket.deliveryMethodId = deliveryMethod.id;
      basket.shippingPrice = deliveryMethod.price;
      this.calculateTotals();
      this.setBasket(basket);
  }

  getBasket(id: string) {
    return this.httpClient.get<IBasket>(this.baseUrl + 'basket?id=' + id).pipe(
      map((basket: IBasket) => {
        this.basketSource.next(basket);
        this.shipping = basket.shippingPrice as number;
        this.calculateTotals();
      })
    );
  }

  setBasket(basket: IBasket) {
    return this.httpClient
      .post<IBasket>(this.baseUrl + 'basket', basket)
      .subscribe(
        (response: IBasket) => {
          this.basketSource.next(response);
          this.calculateTotals();
        },
        (error) => {
          console.error(error);
        }
      );
  }

  getCurrentBasketValue() {
    /*console.info('Entering getCurrentBasketValue()');
    console.info('this.basketSource.value', this.basketSource.value);*/
    return this.basketSource.value;
  }

  addItemToBasket(item: IProduct, quantity = 1) {
    const itemToAdd: IBasketItem = this.mapProductItemToBasket(item, quantity);
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
  }

  incrementItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue() as IBasket;
    const foundItemIndex = basket.items.findIndex(
      (x) => x.id === item.id
    ) as number;
    if (basket.items[foundItemIndex].quantity >= 1) {
      basket.items[foundItemIndex].quantity++;
      this.setBasket(basket);
    } else {
      this.removeItemFromBasket(item);
    }
  }

  removeItemFromBasket(item: IBasketItem) {
    const basket = this.getCurrentBasketValue() as IBasket;
    if (basket.items.some((x) => x.id === item.id)) {
      basket.items = basket.items.filter((i) => i.id !== item.id);
      if (basket.items.length > 0) {
        this.setBasket(basket);
      } else {
        this.deleteBasket(basket);
      }
    }
  }

  /**
   * If an order is created successfully, it will also clear the basket in the backend.
   * So we need to manually remove any remaining basket info in the front end.
   * @param id 
   */
  deleteLocalBasket(id: string) {
    this.basketSource.next(null);
    this.basketTotalSource.next(null);
    localStorage.removeItem('basket_id');
  }

  deleteBasket(basket: IBasket) {
    return this.httpClient
      .delete(this.baseUrl + 'basket?id=' + basket.id)
      .subscribe(
        () => {
          this.basketSource.next(null);
          this.basketTotalSource.next(null);
          localStorage.removeItem('basket_id');
        },
        (error) => {
          console.log(error);
        }
      );
  }

  decrementItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue() as IBasket;
    const foundItemIndex = basket.items.findIndex(
      (x) => x.id === item.id
    ) as number;

    if (basket.items[foundItemIndex].quantity > 1) {
      basket.items[foundItemIndex].quantity--;
      this.setBasket(basket);
    } else {
      this.removeItemFromBasket(item);
    }
  }

  private calculateTotals() {
    const basket = this.getCurrentBasketValue() as IBasket;
    const shipping = this.shipping;
    const subtotal = basket.items.reduce((a, b) => b.price * b.quantity + a, 0);
    const total = subtotal + shipping;
    this.basketTotalSource.next({ shipping, total, subtotal });
  }

  private addOrUpdateItem(
    items: IBasketItem[],
    itemToAdd: IBasketItem,
    quantity: number
  ): IBasketItem[] {
    // console.log(items);
    const index = items.findIndex((i) => i.id === itemToAdd.id);
    if (index === -1) {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    } else {
      items[index].quantity += quantity;
    }
    return items;
  }

  private createBasket(): IBasket {
    // console.info('Entering createBasket()');
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    // console.info('creating basket id', basket.id);
    return basket;
  }

  private mapProductItemToBasket(
    item: IProduct,
    quantity: number
  ): IBasketItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      pictureUrl: item.pictureUrl,
      quantity,
      brand: item.productBrand,
      type: item.productType,
    };
  }
}
