import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBrand } from '../shared/models/brand';
import { IPagination } from '../shared/models/pagination';
import { IType } from '../shared/models/product-type';
import { map } from 'rxjs/operators';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) {}

  getProducts(shopParams: ShopParams): Observable<IPagination> {
    let params = new HttpParams();

    if (shopParams.brandId > 0) {
      params = params.append('brandId', shopParams.brandId.toString());
    }
    if (shopParams.typeId > 0) {
      params = params.append('typeId', shopParams.typeId.toString());
    }
    if (shopParams.sort && shopParams.sort.length > 0) {
      params = params.append('sort', shopParams.sort);
    }
    if (shopParams.search && shopParams.search.length > 0) {
      params = params.append('search', shopParams.search);
    }

    params = params.append('pageIndex', shopParams.pageNumber.toString());
    params = params.append('pageSize', shopParams.pageSize.toString());

    return this.http
      .get<IPagination>(`${this.baseUrl}products`, {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          if (response && response.body) {
            return response.body as IPagination;
          }
          return new Object() as IPagination;
        })
      );
  }

  getBrands(): Observable<IBrand[]> {
    return this.http.get<IBrand[]>(`${this.baseUrl}products/brands`);
  }

  getTypes(): Observable<IType[]> {
    return this.http.get<IType[]>(`${this.baseUrl}products/types`);
  }
}
