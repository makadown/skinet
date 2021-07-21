import { Component, OnInit } from '@angular/core';
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
  title = 'SkiNet';
  products: IProduct[] = [];
  brands: IBrand[] = [];
  types: IType[] = [];
  totalCount = 0;

  shopParams = new ShopParams();
  sortOptions = [
    { name: 'Alphabetical', value: 'name'},
    { name: 'Price: Low to High', value: 'priceAsc'},
    { name: 'Price: High to Low', value: 'priceDesc'}
  ];

  constructor(private _shopService: ShopService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this._shopService
      .getProducts(this.shopParams)
      .subscribe(
        (response: IPagination) => {
          this.products = response.data;
          this.shopParams.pageNumber = response.pageIndex;
          this.shopParams.pageSize = response.pageSize;
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
    this.shopParams.brandId = brand.id;
    this.getProducts();
  }
  filterByType(pType: IType) {
    this.shopParams.typeId = pType.id;
    this.getProducts();
  }

  onSortSelected(sort: string) {
    this.shopParams.sort = sort;
    this.getProducts();
  }

  onPageChanged(event: any) {
    this.shopParams.pageNumber = event.page;
    this.getProducts();
  }
}
