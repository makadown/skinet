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
  @ViewChild('search', { static: true }) searchTerm!: ElementRef;
  title = 'SkiNet';
  products: IProduct[] = [];
  brands: IBrand[] = [];
  types: IType[] = [];
  totalCount = 0;

  shopParams = new ShopParams();
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' },
  ];

  constructor(private _shopService: ShopService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this._shopService.getProducts(this.shopParams).subscribe(
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
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  filterByType(pType: IType) {
    this.shopParams.typeId = pType.id;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(sort: string) {
    this.shopParams.sort = sort;
    this.getProducts();
  }

  onPageChanged(event: any) {
    if (this.shopParams.pageNumber !== event) {
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }

  onSearch() {
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams.pageNumber = 1;
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
