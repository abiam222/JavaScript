import {Component} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';

@Component({
  selector: 'my-app',
  templateUrl: './template.html'
})
class AppComponent {
  version: string;
  // Implicit public, equivalent to
  // public version: string;
  // (public is the default in TypeScript.)
  // Angular.io style guide recommends implicit public.
  person: string;
  stringWithHtml: string;
  personObject: any;
  animal: string  = 'This is my made up string';
  private x: string = 'Only available inside';

  fooNum:number = calculate();

  constructor() {
    this.version = 'Other';
    this.person = 'everyone';
    this.stringWithHtml = `
      <button onClick='console.log('hello from old-school HTML/JS');'>
        Press Me
      </button>
      <i>Hello from <b>HTML</b></i>
    `;//the ticks are better because instead of " " and + we can just use these ticks
    //with long html anything longer than like 4/8 lines should be in its own file
    //you can add ${ something } above but is not recommended
    this.personObject = { mother: 'Jane' };
    this.x = 'Hello World';
  }

  calculate(): number {
    console.log('calculating');
    return 22 / 7;
  }//this is called multiple times, so Angular keeps this code updated for us
  //or anytime this could have changed,
}

//all the expressions under {{  }} grab the information
//from the component class


//{{ Math?.sqrt(2)}}
//says, "if this is defined(probably later on) make this work"


bootstrap(AppComponent);
