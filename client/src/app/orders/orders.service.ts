import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IOrder } from '../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  getOrder(id: string) {
    return this.httpClient.get<IOrder>(this.baseUrl + 'Orders/' + id);
  }

  getOrders() {
    return this.httpClient.get<IOrder[]>(this.baseUrl + 'Orders');
  }
}
