import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { IDeliveryMethod } from '../shared/models/deliveryMethod';
import { IOrder, IOrderToCreate } from '../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * This will create order in the backend.
   * If the order is created successfully, it will also clear the basket.
   * So we need to manually remove any remaining basket info in the front end.
   */
  createOrder(order: IOrderToCreate): Observable<IOrder> {
    return this.http.post<IOrder>(this.baseUrl + 'orders', order);
  }

  getDeliveryMethods() {
    return this.http.get<IDeliveryMethod[]>(this.baseUrl + 'orders/deliveryMethods').pipe(
      map(( dm: IDeliveryMethod[]) =>{
         return dm.sort( (a,b) => b.price - a.price );
      })
    );
  }
}
