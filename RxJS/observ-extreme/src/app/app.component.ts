import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { fromEvent, Subscriber, merge } from 'rxjs';
import { retry, map, catchError, filter, take, reduce, scan, flatMap, concatAll} from "rxjs/operators";
import {
  throwError as observableThrowError,
  Observable,
  of,
  range,
  from,
  pipe,
  bindNodeCallback,
  interval,
  Subject
} from "rxjs";
import { IUser } from "src/app/interfaces/default.interface";
import { isBuffer } from "util";
import L from "leaflet";
import { getOrCreateInjectable } from "@angular/core/src/render3/di";
//check data.json file import data from './data.json' ?? would that work
//import  *  as  data  from  './data.json';


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.sass"]
})
export class AppComponent implements OnInit {
  title = "observ-extreme";

  //The whole point is creating the object. Interface is just the type
  //You can always add properties, you just have to include what its
  //in the interface
  user = {} as IUser;
  user7 = [] as Array<IUser>; //array of IUsers
  user2: IUser = {
    name: "",
    lastName: ""
  };
  user3 = <IUser>{ name: "Abiam", lastName: "Velazquez" }; //with out without : IUser
  user4: IUser = Object.create({}); //why no error?
  user5: IUser = {
    name: "",
    lastName: "",
    stocks: [{ name: "AAPL", value: 4 }, { name: "CGC", value: 8 }]
  };
  user6: IUser = <IUser>{}; //with or without : IUser it will work
  //user <>  <= why not brackets before, maybe not. I feel like I have seen it before
  //user4: IUser = new Object({ name: "df", lastName: "adf" });
 
  //OR!! you can do it like a class
  //Do an interface, then create a class from the interface 
  //so you can do
  //1. Initializa object
  //2. So those values have to be in the class
  //3. To have a TYPE (though you can do it with a class too)
  //The reason you rather have an interface would be because
  //what if you don't need an instance, no point for the runtime to compile
  //and run a whole class when it can use read an interface 
  // user = new User()

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const self = this;
    //I still need to learn how to get these in order
    //you can do try catch here??
    // self.getStockBookPromise();
   
    // self.getStockBookObserv();
    // self.getNewArrayObser();
    // self.getExample1();
    // self.getEnumExample();

    // console.log("reading users");
    // console.log(self.user);
    // console.log(self.user2);
    // console.log(self.user3);
    // console.log(self.user4);
    // console.log(self.user5);
    // console.log(self.user6);

    /* Mar 28 2020 */
    //self.getNewObservable();
    //self.getNewArrayObservable();
    //self.getXYPointJS();
    //self.getXYPointObservable();
    //self.createObservable();
    //self.getDataExample1();
    //self.getObsUsingFrom();
    //self.getMoreEventJS();
    //self. mergeObservables();
    //self.mapObservable();
   // self.filterObservable();
    //self.reduceObservable();
    //self.example2();
   // self.example3();
    //self.example5();
    //self.example6();
    //self.example7();
   // self.example8();
  // self.earthquake();
    self.example11();
  }

  getNewObservable() {
    //Each argument becomes a next notification.
    //return of(1, 2, 3).subscribe(res => console.log(res));
    return of([1, 2, 3]).subscribe(res => console.log(typeof res));
  }

  getNewArrayObservable() {
    //from converts anything to observable
    //Creates an Observable from an Array, an array-like object, a Promise, an iterable object, or an Observable-like object.
    return from([1, 2, 3]).subscribe(res => console.log(res));
    //of [1,2,3] but array
    //from 1, 2, 3 seperated. Turns array to single values
    //from is very popular since it turns almost anything into an observable
  }

  public getXYPointJS() {
    const ​ registerClicks = e => { ​ 
      console.log(e.clientX, e.clientY); ​ 
    }; ​ 
    document.body.addEventListener(​ "click" ​, registerClicks); 
  }

  public  getXYPointObservable() {
    let obj;
    //observable from JS event
    fromEvent(document, ​ "click" ​)
      .pipe( ​ 
        filter( (c:MouseEvent) => c.clientX > window.innerWidth / 2), 
        take(10) ​ 
      ) //this is observable
      .subscribe(
        (c:MouseEvent) => {
          console.log(c.clientX, c.clientY);
          obj = c;
        },
        () => (console.log(obj))
        ); //subscribe to observable
        //console.log(obj)
        //I want to see if I can print the whole object with all the data
  }

  public createObservable() {
    //observable
    const observable = Observable.create( observer => {
      observer.next("Simon");
      observer.next("Jen");
      observer.next("Sergi");
      observer.complete();
    });

    //observer
    const subscriber = Subscriber.create(
      value => console.log(`Next: ${value}`),
      error => console.log(`Error: ${error}`),
      () => console.log("Completed")
    )

    //observable.subscribe( //subscriber implements Observer interface
    //  res => console.log(res)
   //)

    //subscriber.next("abiam");
  }

  getObsUsingFrom() {
    //create observable from Array
    from​([​ "Adrià" ​, ​ "Julian" ​, ​ "Jen" ​, ​ "Sergi" ​]).subscribe( ​ 
      x => console.log(​ `Next: ​${x}​ ` ​), ​ 
      err => console.log(​ "Error:" ​, err), ​ 
      () => console.log(​ "Completed" ​) ​ );
  }

  createObservableFromCallbackFunction() {
    //const Observable = Rx.Observable;
    // const readdir$ = bindNodeCallback(fs.readdir);
    // const source$ = readdir$("/Users/sergi");//send delayed method
    // const subscription = source$.subscribe(
    //   res => console.log(`List of directories: ${res}`),
    //   error => console.log(`Error: ${error}`),
    //   () => console.log("Done!")
    // );
  }

  public getDataExample1() {
    const self = this;
    //can't get to data.json so not working 
    // self.http.get('../data.json').subscribe(
    //   data => console.log(data),
    //   err => console.log(err)
    // )
  }

  public mergeObservables() {
    const a$ = interval(200) //runs every 200ms
    .pipe(
      map(i => `A${i}`)
    );

    const b$ = interval(100)//runs every 100ms
    .pipe(
      map(i => `B${i}`)
    )

    merge(a$,b$).subscribe( x => { //merge both observable
      console.log(x);
    });
  }

  public mapObservable() {
    range(1,5)
    .pipe(
      map(name => name * 2)
    )
    .subscribe( x => console.log(x))
  }

  public filterObservable() {
    range(1,20)
    .pipe(
      filter(x => this.isEven(x))
    )
    .subscribe( x => console.log(x))
  }

  isEven(number) {
    if (number % 2 == 0) return true;
    return false;
  }

  public reduceObservable() {
    range(1,5)
    .pipe(
      reduce( (acc,x) => acc + x)
    )
    .subscribe( x => console.log(x))
  }

  public averageReduceObservable() {
    // range(0,5)
    // .pipe(
    //   reduce( (prev, curr) => {
    //     return {
    //       sum: prev.sum + curr,
    //       count: prev.count + 1
    //     };
    //   },
    //   { sum: 0, count: 0 }
    //   )
    //   map(result => result.sum / result.count);
    // )
    // .subscribe(x => console.log("Average is: ", x));
  }

  public example2() {
    const values = from([
      of(1,2,3),
      of(4,5,6),
      of(7,8,9)
    ]);

    //values.pipe(flatMap(v => v)).subscribe(v => console.log(v));
    values.pipe(concatAll()).subscribe(v => console.log(v));
  }

  getMoreEventJS() {
    const​ allMoves$ = fromEvent(document, ​ "mousemove" ​); ​ 
    allMoves$.subscribe( (e:MouseEvent) => console.log(e.clientX, e.clientY)); 
  }

  //canceling Observables (implicit and explicit)
  example3() { //Explicit
    const counter = interval(1000);

    const sub1 = counter.subscribe(i => { console.log('Subscription 1:', i)});
    const sub2 = counter.subscribe(i => { console.log('Subscription 2:', i)});

    setTimeout(
      () => {
        console.log('Canceling subscription2!');
        sub2.unsubscribe();
      },
      2000
    );
  }

  example4() { //implicit
    //Often, operators will cancel
    //subscriptions for you. Operators such as range or take will cancel the subscription when the
    //sequence finishes or when the operator conditions are met.
    //Advanced operators such as withLatestFrom or switchMap will create and
    //destroy subscriptions as needed, since they handle several
    //Observables in motion. In short, don’t worry about
    //canceling most subscriptions yourself.
  }

  //observables that wrap external apis
  example5() {
    const p = new Promise((resolve, reject) => {
      window.setTimeout(resolve, 5000);
    });

    p.then(() => console.log("Potential side effect!"));

    const subscription = from(p) //fromPromise - im sure its deprecated
      .subscribe(msg => console.log('Observable resolved!'));

      subscription.unsubscribe();
  }

  getJSON(arr) {
    //return from(arr).pipe(map(JSON.parse("")));
    //let arr = ['{"1": 1, "2": 2}' ​, ​'{"1": 1}'];
    return from(arr).pipe(
         //map( x => JSON.parse(x))
         map( (x:string) => JSON.parse(x))
       )
    //   .subscribe(
    //     x => console.log(x)
    //   )
  }

  example6() {
    //error handling
    //subscribe( ..., err => console.log(err.message))
    this.getJSON([ ​ ​ 
      '{"1": 1, "2": 2}' ​, ​ ​ 
      '{"success: true}' ​, ​ // Invalid JSON string ​ ​ ​ 
      '{"enabled": true}' ​ ​ ])
      .subscribe( ​ 
        json => console.log(​ "Parsed JSON: " ​, json), ​ 
        err => console.log(err.message) ​ 
      ); 
  }

  //instead of Handling errors we are catching error
  //catchError - instead of just breaking at first
  //it goes all the way through and prints those objects
  //until it breaks
  example7() {
    this.getJSON([ ​ ​ 
      '{"1": 1, "2": 2}' ​, ​ ​ 
      '{"1": 1}',
      '{"success", true}',
      '{"2": 2}'
    ])
    .pipe(
      catchError( err =>
        of({
          error: "There was an error parsing JSON"
        })
      ) 
    )
    .subscribe(
      json => console.log("Parsed JSON Example 7: ", json),
      err => console.log(err.message)
    );

    /*catch is useful for reacting to errors in a
    sequence, and it behaves much like the traditional
    try/catch block. In some cases, though, it would be very
    convenient to ignore an error that happens with an item in the Observable
    and let the sequence continue. In those cases, we can use the
    retry operator.*/
  }

  //Retrying sequences
  example8() {
    //retry will always retry the whole observable sequence again
    //even if some of the items didn't error
    this.getJSON([ ​ ​ 
      '{"1": 1, "2": 2}' ​, ​ ​ 
      '{"1": 1}',
      '{"success", true}',
      '{"2": 2}'
    ])
      .pipe(
        retry(5)
      )
      .subscribe(
        xhr => console.log(xhr),
        err => console.log("ERROR: ", err)
      );
  }

  // getStockBookPromise() {
  //   this.http
  //     .get("https://api.iextrading.com/1.0/stock/aapl/book", {
  //       responseType: "json",
  //       observe: "response"
  //     })
  //     .toPromise()
  //     .then(res => console.log(res));
  //   //I can chain everything by the .then() function
  //   //does not return an observable, returns a Promise
  // }

  // getStockBookObserv() {
  //   this.http
  //     .get("https://api.iextrading.com/1.0/stock/aapl/book", {
  //       responseType: "json",
  //       observe: "response"
  //     })
  //     .pipe(
  //       //   // map(res => console.log(res))
  //       catchError(e => {
  //         throw new Error(e.message);
  //       }),
  //       map(res => console.log(res))
  //     ) //observable as of now
  //     // .subscribe(     //return that observable by subscribing to it
  //     //   res => console.log(res)
  //     // )
  //     .subscribe(); //need to subscribe to pipe to get details
  // }

  // getEnumExample() {
  //   /*
  //   enumerations to describe finite sets of discrete values.
  //   Discrete, Immutable, Cardinality
  //   */
  //   /* Enums are immutable (are readonly in typescript)
  //   If you wanted to do the same thing but with an object you would need 
  //   to use the Object.freeze() method. 
  //   */
  //   enum Compass {
  //     North, East, South, West
  //   }

  //   //we can make it start with a certain value
  //   /*
  //   enum Compass { North=2, East, ...}
  //   write const enum Compass { ... } it will remove this from compilation

  //   **Note some things don't work with strings (I think initializing string with below code )
  //   */

  //   /*
  //   Typescript also supports

  //   TypeScript also supports String enums, Heterogeneous enums, Union enums, and Ambient enums
  //   */
  //   const foo : Compass = Compass.North;
  //   console.log('in this getEnumExample as well')
  //   console.log(Compass.North)
  //   console.log(Compass.West)
  // }

  earthquake() {
    const QUAKE_URL = `http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojsonp`;
    //loadJSONP(QUAKE_URL);
    function loadJSONP(url) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = url;

      const head = document.getElementsByTagName("head")[0];
      head.appendChild(script);
    }

    const mapContainer = document.createElement("div");
    mapContainer.id = "map";
    document.body.appendChild(mapContainer);

    const map = L.map("map").setView([33.858631, -118.279602], 7);
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(map);

    ​// eqfeed_callback( ​{ ​ ​ "type" ​: ​ "FeatureCollection" ​, ​ ​ "metadata" ​: { ​ ​ "generated" ​: 1408030886000, ​ ​ "url" ​: ​ "http://earthquake.usgs.gov/earthquakes/..." ​, 

    // ​ const ​quakes$ = Observable.create(
    //   observer => { ​ 
    //     window.eqfeed_callback = response => { ​ 
    //       response.features.forEach(observer.next); ​ 
    //     }; ​ ​ loadJSONP(QUAKE_URL); ​ }); ​ ​ 
        
    //   quakes$.subscribe(
    //     quake => { ​ 
    //       const ​ coords = quake.geometry.coordinates; ​ ​ 
    //       const ​ size = quake.properties.mag * 10000; ​ ​ 
    //       L.circle([coords[1], coords[0]], size).addTo(map); ​ 
    //   }); 
  }

  example10() {
    let evenTicks = 0;

    function updateDistance(i) {
      if (i%2===0) evenTicks += 1;
      return evenTicks;
    }
    
    const ticksObservable = interval(1000)
    .pipe(
      //map(updateDistance)
      scan(updateDistance, 0)//using scan we avoid external state
    )

    ticksObservable.subscribe(() => {
      console.log(`Subscriber 1 - evenTicks: ${evenTicks} so far`);
    });

    ticksObservable.subscribe(() => {
      console.log(`Subscriber 2 - evenTicks: ${evenTicks} so far`);
    });

    //we can avoid relying on external statebundleRenderer.renderToStream
    //if we need to cache values RxJS subject class can help a lot
    //when we need to keep track of prev state we can use methods like scan
  }

  /* 
  Observable pipelines look extremely similar to array chains, but their
  similarities end here. In an Observable, nothing ever happens until we
  subscribe to it, no matter how many queries and transformations we
  apply to it. When we chain a transformation like map ,
  we’re composing a single function that will operate on every
  item of the array once. So, in the preceding code, this is what will
  happen:

  stringObservable$ ​ .map(str => str.toUpperCase()) ​ 
  .filter(​ /^ ​​ [ ​​ A-Z ​​ ] ​​ +$/ ​.test) ​
  .take(5) ​ .subscribe(str => console.log(str)); 
  take makes the Observable emit only the first
  n items we specify. In our case,
  n is five, so 

  out of the thousand strings, we’ll
  receive only the first five. The cool part is that our code will never
  traverse all the items; it will apply our transformations to only the
  first five.
  This makes the developer’s life much easier. You can rest assured
  that when manipulating sequences, RxJS will do only as much work as necessary. This way of operating is called lazy
  evaluation , and it is very common in functional languages such as
  Haskell and Miranda.
  */

  example11() {
    const ​ subject$ = ​ new ​ Subject(); ​ ​ 
    
    interval(300) ​ 
    .pipe(
      map(v => ​ `Interval message # ​${v}​ `​), 
      take(5) 
    )
    .subscribe(subject$); ​ ​ 
    
    subject$.subscribe( ​ 
      next => console.log(​ `Next: ​${next}​ ` ​), ​ 
      error => console.log(​ `Error: ​${error.message}​ ` ​), ​ 
      () => console.log(​ 'Completed!' ​) ​ 
    ); ​ ​ 
      
    subject$.next(​ 'Our message #1' ​); ​ 
    subject$.next(​ 'Our message #2' ​); ​ ​ 
    setTimeout(subject$.complete, 1000); 
  }

}