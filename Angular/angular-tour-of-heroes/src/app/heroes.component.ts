import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
//import { AppComponent } from './app.component';
import { HeroService } from './hero.service'; 
import { Router } from '@angular/router';



//Routing is another name for navigation. Router is the mechanism from navigating from view to view 
//AppComponent should only handle navigation (idk if this is a practice or just for this application)

// const HEROES: Hero[] = [ //we will get this from a service eventually (this isn't the components job)
//   { id: 11, name: 'Mr. Nice' },
//   { id: 12, name: 'Narco' },
//   { id: 13, name: 'Bombasto' },
//   { id: 14, name: 'Celeritas' },
//   { id: 15, name: 'Magneta' },
//   { id: 16, name: 'RubberMan' },
//   { id: 17, name: 'Dynama' },
//   { id: 18, name: 'Dr IQ' },
//   { id: 19, name: 'Magma' },
//   { id: 20, name: 'Tornado' }
// ];

@Component({
  moduleId : module.id, //so template URL and styleURL are relative to the component
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  //providers: [HeroService] //We have to teach the injector how to make a HeroService by registering a HeroService provider
  //providers has also been promoted
})
// The providers array tells Angular to create a fresh instance of the HeroService when it creates a 
// new AppComponent. The AppComponent can use that service to get heroes and so can every child component 
// of its component tree.



export class HeroesComponent implements OnInit {
 
  heroes : Hero[];
  // hero: Hero = {
  //   id: 1,
  //   name: 'Windstorm'
  // }; //1
  //heroes = HEROES; 
  selectedHero: Hero;

//The constructor itself does nothing. The parameter 
//simultaneously defines a private heroService property and identifies it as a HeroService injection site.
//Now Angular will know to supply an instance of the HeroService when it creates a new AppComponent.
 
 //constructor(private heroService: HeroService) {} 
 constructor( //inject 
    private router: Router,
    private heroService: HeroService) { }

   getHeroes(): void {
    //this.heroes = this.heroService.getHeroes();
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
   // this.heroService.getHeroes().then(heroes => console.log( heroes ));
  }

  ngOnInit(): void { //kind of like resolve in our angular-ui-router in Angular 1.x
    this.getHeroes();
  }

  onSelect( hero: Hero ) : void {
    this.selectedHero = hero;
  }

gotoDetail(): void {
  this.router.navigate(['/detail', this.selectedHero.id]);
}


}


// export class AppComponent implements OnInit {
//     ngOnInit(): void {
//     this.getHeroes();
//   }

// }


//VARIABLES
  // : for class or data type
  // = actually declaration of value
  //hence,  num : number = 0
  //I can also have public private etc


//FUNCTIONS 
  /*
   getHeroes(): Hero[] {
        return HEROES;
    } 

    getHeroes() : <return Type> { //continue

    }

  */

  
  // [](bracket) bind to data          e.g. [data] - holds my data
  // ()(ellipses) binding to events    e.g. (click) - click event

/*
<!-- To bind to a raw string -->
<!-- <my-hero-detail hero="selectedHero"></my-hero-detail>-->
<!-- Kind of like @ & = in Angular 1.x -->

<!-- TO bind to a variable in the parent scope -->
<!-- <my-hero-detail [hero]="selectedHero"></my-hero-detail>-->

*/

  /* 
  Two-Way Data binding combines input and output bindings
  into a single notations using the ngModel directive

  <input [(ngModel)]="name">
  */


//=============Components==============


  //Structural Directives

  /*
  Change the layout by adding/removing DOM elements

  <div *ngIf="hero">{{ hero }}</div>

  <div *ngFor="#hero of heroes">{{ hero }}</div> <!-- ng-repeat has been replaced by ngFor -->

  <div [ngSwitch]="status">
    <template [ngSwtichWhen]="'in-mission'">In Mission</template>
    <template [ngSwitchWhen]="'ready'">ready</template>
    <template ngSwitchDefault>Unknown</template>
  </div>
  */


//Projection

/* 
@Component({
  selector: 'child',
  template: `
    <ng-content></ng-content>
  `
})
class Child() {}
*/



//=====================Observables=================

/*
*Open up a continuos channel of communication in which multiple values of data can be emitted over time
*We can deal with data by using array like operations: map, filter, merge, etc
*HTTP service and EventEmitter return Observables
*rxmarbles 

Both Promises and Observables provide us with abstractoins that help us deal with the asynchronous nature
of our applications.  However there are important differences between the Two
  *Observables can define both the setup and teardown aspects of asynchronous behavior
  *Observables are cancellable
  *Observables can be retried using one of the retry operators provided by the API, such as 
    retry and retryWhen.  On the other hand, Promises require the caller to have access to the 
    original function that returned the promise in order to have a retry capability.  


  Reactive Programming - programming paradigm, oriented around data flows and the propagation of change.  
  Observer pattern - design pattern in which an object, called the subject maintains a list of its dependents
    called observers, and notifies them automaticallly of any state changes, usually by calling one of their methods.  

  Reactive programming has principal similarities with the observer pattern commonly used in OOP.  However, integrating the data flows
  concepts into the programming language would make it easier to express them and could therefore increase the granularity of the data flow graph.  
  The observer pattern commonly describes data-flows between whole objects/classes, whereas OO reactive programming could target the members of objects/classes


  OO reactive programming is a combination of OOP and Reactive programming.  Perhaps the most natural way to make such a combination is as follows: Instead of methods
  and fields, objects have reactions that automatically re-evaluate when the other reactions they depend on have been modified.  

  Hence this is used a lot in programming (e.g. Angular) for asynchronous programming.

  Reactive X (aka RxJs) for example is an API for asynchronous programming with observable streams.
  ReactiveX is a combination of the best ideas from the Observer pattern, Iterator pattern, and functional programming.

  Angular doesn't import observables themselves, so you have to call RxJs. So in Angular you return
  an observable instead of a promise. 

  */


  //====================Dependency Injection=========================

  /*

  It was a core feature in Angular 1.x and that has not changed in Angular 2

  Angular 2 simplifies DI even further.  Developers almost never have to get bogged down 
  with injection details.

  Angular 2's DI allos for multiple namespaces, and other advanced features

  Angular 2 assumes is receiving a class 


 @Injectable() - Decorator (not mandatory)
  *Lets Angular 2 know that a class can be used with the DI
  * Not strictly required if the class has other Angular 2 decorators on it
  * Do not forget the trailing brackets()

  @Inject - 
    *A manual mechanism for letting Angular 2 know that a parameter need to be injected
    * Only needed for injecting primitives ( aka string, number, 3rd party) when using TypeScript
    *Supports referencing @Injectable() by strings or by class name (ES5 constructor functions)

    Angular 2 has an optional "provide" method that registers @Injectable()s 
    "provide" allows for @Injectables()s taht are not classes
    "provide" can be used during bootstrap or on @Component()s

  */



  //==============Routing====================

  /*
    There are 3 main components used to configure routing:

    *RouteConfig
    *RouterOutlet
    *RouterLink
   ( *@angular/router )


    Angular 2's component router, also allows for:
    *Child routes
    *Lazy loading of routing data
    *Auxiliray Routes 
  */

  /*
  Angular 2 data bindings only go one way
  Even Angulars 2 way data bindings only go one way
  Change detection scales in Angular 2
  Angular 2 provides several different change detection strategies
  Default, DefaultObserver, Checked, CheckOnce, CheckAlways, Detached, OnPush
  Immutable style change detection is supported

  */


  //=========Immutability================

  /*

  *Immutability is a design pattern where something can't be modifird after being instantiated

  *ES6 has new featrues that allow for easier implementation of immutable design patterns 

  *ImmutableJS allows us to easier work with, and enforce mutable data structures 


  //The Case for Ummutability
  *Managing application state is difficult
  *Immutability attempts to solve this by controlling how and where the state can be modified
  *Can be unclear where changes are happening
  *OnPush Change detection works well with immutable patterns 

  e.g. 
  let movie1 = { name: 'Star Wars', episode: 7 };
  let movie2 = movie1;
  movie2.episode = 8;
  console.log(movie1.episode, movie2.episode); //outputs 8,8 

  In ES6/TypeScript
  *Object.assign - useful for simple objects

  let movie = { name: 'Star Wars, episode: 7 }
  let movie2 = Object.assign({}, movie1, { episode: 8});
  console.log( movie.episode, movie2.episode); //outputs: 7,8

  Immutable data structures for Javascript (i.e. Map, List, etc)
  Able to do deep updates without mutations 

  */


 // ImmutableJs, RxJs, Typescript, ES6
 // Angular 2 has automatic lazy loading 


//==========Forms===============

/*
You can create forms in a few different ways:
*Using form Directives
*Using Control/ControlGroup/ControlArray
*Using FormBuilder

//FormsModule
FormControl
FormGroup (outside FormControl)
FormArray (outside FormControl)

*/