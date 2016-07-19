import {Component} from '@angular/core';

import {RedBox} from './red';
import {GreenCard} from './green';
import {YellowCard} from './yellow';

@Component({
  selector: 'my-app',
  template: `
    <h4>Example application showing component nesting</h4>
    <red-card></red-card>
    <green-card></green-card>
    <yellow-card></yellow-card>
  `,
  directives: [RedBox, GreenCard, YellowCard]
})
export class AppComponent { }
