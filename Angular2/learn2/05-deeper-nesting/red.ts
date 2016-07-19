import {Component} from '@angular/core';

import {GreenCard} from './green';
import {BlueCard} from './blue';

@Component({
  selector: 'red-card',
  template: `
    <div class="card red" style="padding: 10px;">
      <h4>I am a red card</h4>
      <div style="display: flex">
        <green-card></green-card>
        <green-card></green-card>
        <blue-card></blue-card>
      </div>
    </div>
  `,
  directives: [GreenCard, BlueCard]
})
export class RedBox { }
