import {Component, Input} from '@angular/core';

@Component({
  selector: 'order-header',
  template: `
  <div class="card">
    <div class="component-marker">
      OrderHeader
    </div>
    <div class="card-content">
      <div class="card-title">{{customer}}</div>
    </div>
  </div>
  `
})
export class OrderHeader {
  @Input('customerName') customer: string;
}
