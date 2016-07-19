import {Component, Input} from '@angular/core';

import {IItem} from './apiTypes';

@Component({
  selector: 'order-items',
  template: `
  <div class="card">
    <div class="component-marker">
      OrderItems
    </div>
    <div class="card-content">
      <div class="card-title">Order Items</div>
      <ul class="collection">
        <li class="collection-item" *ngFor="let item of items">
          {{item.quantity}}:
          {{item.description}}</li>
      </ul>
    </div>
  </div>
  `
})
export class OrderItems {
  @Input() items: IItem[];
}
