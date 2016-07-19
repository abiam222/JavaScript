import {Component} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';

@Component({
  selector: 'my-app',
  templateUrl: './template.html'
})
class AppComponent {
  n: number = 0;

  increment() {
    this.n ++;
  }

  typed(x: KeyboardEvent) {
    console.log('value', x);
  }
}//end of class AppComponent

bootstrap(AppComponent);
