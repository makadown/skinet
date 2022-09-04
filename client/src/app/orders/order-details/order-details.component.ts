import { Component, OnInit } from '@angular/core';
import { IOrder } from '../../shared/models/order';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  order: IOrder;
  constructor(private bcService: BreadcrumbService, private orderService: OrdersService,
    private activatedRoute: ActivatedRoute, private router: Router) {
   }

  ngOnInit(): void {
    const id = this.activatedRoute?.snapshot?.paramMap?.get('id');
    if (id !== null) {
      this.loadOrder(id);
    }
  }

  private loadOrder(id: string) {
    this.orderService.getOrder(id).subscribe((state: IOrder) => {
      this.order = state as IOrder;
      this.bcService.set('@orderDetails', 'Order #' + this.order.id + ' - ' + this.order.status);
    });
  }

}
