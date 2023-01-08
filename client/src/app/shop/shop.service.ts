import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IBrand } from '../shared/models/brand';
import { IPagination, Pagination } from '../shared/models/pagination';
import { IType } from '../shared/models/product-type';
import { map } from 'rxjs/operators';
import { ShopParams } from '../shared/models/shopParams';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';
  // products: IProduct[] = [];
  brands: IBrand[] = [];
  types: IType[] = [];
  pagination = new Pagination();
  shopParams = new ShopParams();
  productCache = new Map();

  constructor(private http: HttpClient) {}

  getProducts(useCache: boolean): Observable<IPagination> {
    if (useCache === false) {
      this.productCache = new Map();
    }

    const key = Object.values(this.shopParams).join('-');
    if(this.productCache.size > 0 && useCache === true) {
      if (this.productCache.has(key)) {
          this.pagination.data = this.productCache.get(key);
          return of(this.pagination);
      }
    }

    let params = new HttpParams();

    if (this.shopParams.brandId > 0) {
      params = params.append('brandId', this.shopParams.brandId.toString());
    }
    if (this.shopParams.typeId > 0) {
      params = params.append('typeId', this.shopParams.typeId.toString());
    }
    if (this.shopParams.sort && this.shopParams.sort.length > 0) {
      params = params.append('sort', this.shopParams.sort);
    }
    if (this.shopParams.search && this.shopParams.search.length > 0) {
      params = params.append('search', this.shopParams.search);
    }

    params = params.append('pageIndex', this.shopParams.pageNumber.toString());
    params = params.append('pageSize', this.shopParams.pageSize.toString());

    return this.http
      .get<IPagination>(`${this.baseUrl}products`, {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {          
          if (response && response.body) {
            this.productCache.set(key,response.body.data);
            this.pagination = response.body;
            return this.pagination as IPagination;
          }
          return new Object() as IPagination;
        })
      );
  }

  setShopParams(params: ShopParams) {
    this.shopParams = params;
  }

  getShopParams() {
    return this.shopParams;
  }

  getProduct(id: number): Observable<IProduct> {
    let product: IProduct;
    this.productCache.forEach((products: IProduct[]) => {
      product = (products.find(p => p.id === id)) as IProduct;
    });
    
    if (product!) {
      return of(product);
    }

    return this.http.get<IProduct>(this.baseUrl + 'products/' + id);
  }

  getBrands(): Observable<IBrand[]> {
    if(this.brands.length > 0) {
      return of(this.brands);
    }
    return this.http.get<IBrand[]>(`${this.baseUrl}products/brands`).pipe(
      map(response => {
        this.brands = response;
        return response;
      })
    );
  }

  getTypes(): Observable<IType[]> {
    if(this.types.length>0){
      return of(this.types);
    }
    return this.http.get<IType[]>(`${this.baseUrl}products/types`).pipe(
      map(response => {
        this.types = response;
        return response;
      })
    );
  }
}
