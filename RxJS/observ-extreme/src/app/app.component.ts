import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { fromEvent } from 'rxjs';
import { retry, map, catchError, filter, take} from "rxjs/operators";
import {
  throwError as observableThrowError,
  Observable,
  of,
  range,
  from,
  pipe
} from "rxjs";
import { IUser } from "src/app/interfaces/default.interface";
import { isBuffer } from "util";
import { getOrCreateInjectable } from "@angular/core/src/render3/di";

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
    // self.getNewObservable();
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
    self.getXYPointObservable();
  }


/* Mar 28 2020 */
  getXYPointDefault() {
    const ​ registerClicks = e => { ​ console.log(e.clientX, e.clientY); ​ }; ​ document.body.addEventListener(​ "click" ​, registerClicks); 
  }

  getXYPointObservable() {
    fromEvent(document, ​ "click" ​) 
      .pipe(
        filter(c => c.clientX > window.innerWidth / 2),
        take(10)
      )
      .subscribe(c => console.log(c.clientX, c.clientY))
  }



  /* old */

  getNewPromise() {
    // return new Promise()
  }

  getNewObservable() {
    return of(1, 2, 3).subscribe(res => console.log(res));
  }

  getNewArrayObser() {
    return from([1, 2, 3]).subscribe(res => console.log(res));
    //of [1,2,3] array
    //from 1, 2, 3 seperated. Turns array to single values
  }

  getStockBookPromise() {
    this.http
      .get("https://api.iextrading.com/1.0/stock/aapl/book", {
        responseType: "json",
        observe: "response"
      })
      .toPromise()
      .then(res => console.log(res));
    //I can chain everything by the .then() function
    //does not return an observable, returns a Promise
  }

  getStockBookObserv() {
    this.http
      .get("https://api.iextrading.com/1.0/stock/aapl/book", {
        responseType: "json",
        observe: "response"
      })
      .pipe(
        //   // map(res => console.log(res))
        catchError(e => {
          throw new Error(e.message);
        }),
        map(res => console.log(res))
      ) //observable as of now
      // .subscribe(     //return that observable by subscribing to it
      //   res => console.log(res)
      // )
      .subscribe(); //need to subscribe to pipe to get details
  }

  getExample1() {
    const source = range(0, 10);

    source.pipe(filter(x => x % 2 == 0)).subscribe(x => console.log(x));
  }

  getEnumExample() {
    /*
    enumerations to describe finite sets of discrete values.
    Discrete, Immutable, Cardinality
    */
    /* Enums are immutable (are readonly in typescript)
    If you wanted to do the same thing but with an object you would need 
    to use the Object.freeze() method. 
    */
    enum Compass {
      North, East, South, West
    }

    //we can make it start with a certain value
    /*
    enum Compass { North=2, East, ...}
    write const enum Compass { ... } it will remove this from compilation

    **Note some things don't work with strings (I think initializing string with below code )
    */

    /*
    Typescript also supports

    TypeScript also supports String enums, Heterogeneous enums, Union enums, and Ambient enums
    */
    const foo : Compass = Compass.North;
    console.log('in this getEnumExample as well')
    console.log(Compass.North)
    console.log(Compass.West)
  }


}

// public get<T>(url: string, id?: string): Observable<T> {
//   return this.http
//     .get(this.buildUrl(url, null), {
//       responseType: "json",
//       observe: "response"
//     })
//     .pipe(
//       catchError(this.handleError),
//       map(resp => <T>resp.body)
//     );
// }


