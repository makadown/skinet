import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagerComponent } from './components/pager/pager.component';
import { OrderTotalsComponent } from './components/order-totals/order-totals.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

/**
 * This Custom Module will be shared amongst every module! :D
 * YEAH BABY!
 */
@NgModule({
  declarations: [PagingHeaderComponent, PagerComponent, OrderTotalsComponent],
  imports: [CommonModule, PaginationModule.forRoot(), CarouselModule.forRoot(), 
     ReactiveFormsModule, BsDropdownModule.forRoot()],
  exports: [PaginationModule, PagingHeaderComponent, 
    OrderTotalsComponent, PagerComponent, CarouselModule,
    ReactiveFormsModule, BsDropdownModule],
})
export class SharedModule {}
