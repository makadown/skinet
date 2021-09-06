import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Basket, IBasket, IBasketItem } from '../shared/models/basket';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket | null>(null);
  basket$ = this.basketSource.asObservable();

  constructor(private httpClient: HttpClient) {}

  getBasket(id: string) {
    return this.httpClient.get<IBasket>(this.baseUrl + 'basket?id=' + id).pipe(
      map((basket: IBasket) => {
        this.basketSource.next(basket);
        console.info('current basket value', this.getCurrentBasketValue());
      })
    );
  }

  setBasket(basket: IBasket) {
    return this.httpClient
      .post<IBasket>(this.baseUrl + 'basket', basket)
      .subscribe(
        (response: IBasket) => {
          this.basketSource.next(response);
          console.log(response);
        },
        (error) => {
          console.error(error);
        }
      );
  }

  getCurrentBasketValue() {
    console.info('Entering getCurrentBasketValue()');
    console.info('this.basketSource.value', this.basketSource.value);
    return this.basketSource.value;
  }

  addItemToBasket(item: IProduct, quantity = 1) {
    const itemToAdd: IBasketItem = this.mapProductItemToBasket(item, quantity);
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
  }

  private addOrUpdateItem(
    items: IBasketItem[],
    itemToAdd: IBasketItem,
    quantity: number
  ): IBasketItem[] {
    console.log(items);
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
    console.info('Entering createBasket()');
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    console.info('creating basket id', basket.id);
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
