import {Component, Input} from '@angular/core';

import {OrderHeader} from './order-header.component';
import {OrderItems} from './order-items.component';
import {IOrder} from './apiTypes';

@Component({
  selector: 'order-details',
  templateUrl: 'orderDetails.html',
  directives: [OrderHeader, OrderItems]
})
export class OrderDetails {
  @Input('selectedOrderDetails') sod: IOrder;
}
