import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagerComponent } from './components/pager/pager.component';
import { OrderTotalsComponent } from './components/order-totals/order-totals.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TextInputComponent } from './components/text-input/text-input.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { StepperComponent } from './components/stepper/stepper.component';

/**
 * This Custom Module will be shared amongst every module! :D
 * YEAH BABY!
 */
@NgModule({
  declarations: [PagingHeaderComponent, PagerComponent, OrderTotalsComponent, TextInputComponent, StepperComponent],
  imports: [CommonModule, PaginationModule.forRoot(), CarouselModule.forRoot(), 
     ReactiveFormsModule, BsDropdownModule.forRoot(), CdkStepperModule],
  exports: [PaginationModule, PagingHeaderComponent, 
    OrderTotalsComponent, PagerComponent, CarouselModule,
    ReactiveFormsModule, BsDropdownModule, TextInputComponent, CdkStepperModule, StepperComponent],
})
export class SharedModule {}
