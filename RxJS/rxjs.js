// function B(callback){
//     callback('Done')
// }

// function A(message){
//     console.log(message)
// }

// B(A);

/*
CallBacks

Callbacks are used to manage asynchronous flows such as 
network I/0, database access, or user input

cons
Callback hell
Can run more than once
Change error semantics (callbacks break the traditional try/catch mechanism
    and rely on the programmer to chekc for errors and pass them around)
Concurrency get increasingly complicated 

//////////////////////////

Promises 

Can save us from callbacks.
Calling an asynchronous function immediately returns a "promise" that will eventually be
either esolved with the result of the operation or rejected with an error. The pending 
promise can be used as a placeholder for the final vlaue. 

pros
More clear code (looks more synchronous)
no need for nesting blocks (less state)

cons
yield only a single value 
useless for recurrent events (e.g. mouse clicks, streams of data coming from server, because
    we will have to create a promise for each separate event instead of creating a promise
    that handles the stream of events as it comes )


////////////////////////////
Event Emitters

In JS event programming is commong and generally a good practice

cons
Events force side effects (ignore their return values)
Not first-class values (click events can't be passed as a param or manipulated)
It's easy to miss events if we start litening too late

//////////////////////
Reactive Programming

Create, Transform and React to streams of data. 
e.g. Mouse clicks, network request, arrays of strings , etc 

Focuses on propagating changes without our having to explicitly how the propagation ahppens.


*/


 const Rx = require('rxjs/Rx');

// const arr = [1,2,3]
// const arr2 = [4,5,6]

// Rx.Observable.of(arr,arr2).subscribe(value => {
//     console.log(value);
// });


/*

You write async code to keep apps responsive

*/

//Create Observable

//Observables = streams of events 

//import { Observable } from "rxjs";
//const Observable = require('rxjs/Observable').Observable;
// const Subscriber = require('rxjs/Subscriber').Subscriber;

// const observable = Observable.create(observer => {
//     observer.next("Simon");
//     observer.next("Jen");
//     observer.next("Sergi");
//     observer.complete();
// });

// const subscriber = Subscriber.create(
//     value => console.log(`Next: ${value}`),
//     error => console.log(`Error: ${error}`),
//     () => console.log("Completed")
// );

// observable.subscribe( //subscriber implements Observer interface
//     res => console.log(res)
// )

// subscriber.next("abiam")


//Create Observables from Arrays

// Rx.Observable.from(["Adria","Julian","Jen","Sergi"]).subscribe(
//     x => console.log(`Next: ${x}`),
//     err => console.log("Error:", err),
//     () => console.log("Completed")
// );



