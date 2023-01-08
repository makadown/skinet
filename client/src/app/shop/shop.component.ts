import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IPagination } from '../shared/models/pagination';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/product-type';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-7.html#definite-assignment-assertions
  @ViewChild('search', { static: false }) searchTerm!: ElementRef;
  title = 'SkiNet';
  products: IProduct[] = [];
  brands: IBrand[] = [];
  types: IType[] = [];
  totalCount = 0;

  shopParams: ShopParams;
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' },
  ];

  constructor(private _shopService: ShopService) {
    this.shopParams = this._shopService.getShopParams();
  }

  ngOnInit(): void {
    this.getProducts(true);
    this.getBrands();
    this.getTypes();
  }

  getProducts(useCache = false) {
    this._shopService.getProducts(useCache).subscribe(
      (response: IPagination) => {
        this.products = response.data;
        this.totalCount = response.count;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getBrands() {
    this._shopService.getBrands().subscribe(
      (brands: IBrand[]) => {
        this.brands = [{ id: 0, name: 'All' }, ...brands];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getTypes() {
    this._shopService.getTypes().subscribe(
      (types: IType[]) => {
        this.types = [{ id: 0, name: 'All' }, ...types];
      },
      (error) => {
        console.log(error);
      }
    );
  }
  filterByBrand(brand: IBrand) {
    const params = this._shopService.getShopParams();
    params.brandId = brand.id;
    params.pageNumber = 1;
    this._shopService.setShopParams(params);
    this.getProducts();
  }
  filterByType(pType: IType) {
    const params = this._shopService.getShopParams();
    params.typeId = pType.id;
    params.pageNumber = 1;
    this._shopService.setShopParams(params);
    this.getProducts();
  }

  onSortSelected(sort: string) {
    const params = this._shopService.getShopParams();
    params.sort = sort;
    this._shopService.setShopParams(params);
    this.getProducts();
  }

  onPageChanged(event: any) {
    const params = this._shopService.getShopParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this._shopService.setShopParams(params);
      this.getProducts(true);
    }
  }

  onSearch() {
    const params = this._shopService.getShopParams();
    params.search = this.searchTerm.nativeElement.value;
    params.pageNumber = 1;
    this._shopService.setShopParams(params);
    this.getProducts();
  }

  onReset() {    
    this.searchTerm.nativeElement.value = '';    
    this.shopParams = new ShopParams();
    this.shopParams.pageNumber = 1;
    this._shopService.setShopParams(this.shopParams);
    this.getProducts();
  }
}
