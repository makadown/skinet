import { Component, OnInit } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IPagination } from '../shared/models/pagination';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/product-type';
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
  brandIdSelected = 0;
  typeIdSelected = 0;
  sortSelected = 'name';
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
      .getProducts(this.brandIdSelected, this.typeIdSelected, this.sortSelected)
      .subscribe(
        (response: IPagination) => {
          this.products = response.data;
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
    this.brandIdSelected = brand.id;
    this.getProducts();
  }
  filterByType(pType: IType) {
    this.typeIdSelected = pType.id;
    this.getProducts();
  }

  onSortSelected(sort: string) {
    this.sortSelected = sort;
    this.getProducts();
  }
}
