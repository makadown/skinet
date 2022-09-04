import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderRoutingModule } from './order-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    OrdersComponent,
    OrderDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    OrderRoutingModule
  ]
})
export class OrdersModule { }
