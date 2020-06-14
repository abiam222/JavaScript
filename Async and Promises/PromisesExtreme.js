//https://angular.io/guide/comparing-observables
//https://stackoverflow.com/questions/37364973/what-is-the-difference-between-promises-and-observables
//https://tylermcginnis.com/async-javascript-from-callbacks-to-promises-to-async-await/

//
/*
**Node is the JS engine. So the event loop runs the same

JS is single threaded async (not really asyn though)
ASYN because is non-blocking. So if you call an AJAX it will
continue with the code until the API call comes back and runs
that. Hence you need callbacks so that doesn't happen and yor
code can run "sync"

//what happens if
// api('asdfsf', function callback(
//	api('adfasf', function callback)
//))
//how does the pool and queue work? is it FIFO
//in the sense of callback or messages coming back 
//is it in perfect order?

ASYNC=NON BLOCKING 

events, callback
timeout, reading DB, reading/writing files
API calls 

A very interesting property of the event loop model is that JavaScript, 
unlike a lot of other languages, never blocks. Handling I/O is typically 
performed via events and callbacks, so when the application is waiting for
 an IndexedDB query to return or an XHR request to return, it can still 
 process other things like user input. 

 /////


JavaScript is always synchronous and single-threaded. 
If you're executing a JavaScript block of code on a page then 
no other JavaScript on that page will currently be executed.

JavaScript is only asynchronous in the sense that it can make, 
for example, Ajax calls (our user interactions, events). The Ajax call will stop executing and other 
code will be able to execute until the call returns (successfully or 
otherwise), at which point the callback will run synchronously. 
No other code will be running at this point. It won't interrupt 
any other code that's currently running.

JavaScript timers operate with this same kind of callback.

Describing JavaScript as asynchronous is perhaps misleading. 
It's more accurate to say that JavaScript is synchronous and
 single-threaded with various callback mechanisms.

jQuery has an option on Ajax calls to make them synchronously
(with the async: false option). Beginners might be tempted
to use this incorrectly because it allows a more traditional
programming model that one might be more used to.
The reason it's problematic is that this option will block all
JavaScript on the page until it finishes, including all event
handlers and timers.

///////

To someone who really understands how JS works this question might seem off, however most people who use JS do not have such a deep level of insight (and don't necessarily need it) and to them this is a fairly confusing point, I will try to answer from that perspective.

JS is synchronous in the way its code is executed. each line only runs after the line before it has completed and if that line calls a function after that is complete ect...

The main point of confusion arises from the fact that your browser is able to tell JS to excute more code at anytime (simmlar to how you can excute more JS code on a page from the console). As an example JS has Callback functions who's purpose is to allow JS to BEHAVE asynchronously so further parts of JS can run while waiting for a JS function that has been executed (I.E. a GET call) to return back an answer, JS will continue to run until the browser has an answer at that point the event loop (browser) will execute the JS code that calls the callback function.

Since the event loop (browser) can input more JS to be executed at any point in that sense JS is asynchronous (the primary things that will cause a browser to input JS code are timeouts, callbacks and events)

I hope this is clear enough to be helpful to somebody.
*/

/*
var async = true;
var xhr = new XMLHttpRequest();
xhr.open('get','data.json', async);
xhr.send();

//Create a three second delay(don't do this in real life)
var timestamp = Date.now() + 3000;
while (Date.now() < timestamp);


//Now that three seconds have passed,
//add a listener to the xhr.load and xhr.error events
function listener(){
	console.log('greetings from listener');
}


xhr.addEventListener('load', listener);
xhr.addEventListener('error', listener);

 


//CallBacks:::::::::::::::::::::::::::::::::::::::::::::::::::::::
/* 
Are the cornerstone of asynchronous JS programming.  

e.g.
*/


//callback is a function that is to be executed after another function has finished 
//executing — hence the name ‘call back’.

//More complexly put: In JavaScript, functions are objects. Because of this, 
//functions can take functions as arguments, and can be returned by other functions. 
//Functions that do this are called higher-order functions. Any function that is passed
//as an argument is called a callback function

//https://codeburst.io/javascript-what-the-heck-is-a-callback-aba4da2deced

/*
Hence callback
1. Function that is executed after another function has finished executing
2. Any function that is passed as an argument
3. Callbacks are a way to make sure certain code doesn’t execute until other code has already finished execution. 
(because JS is event driven and it doesn't wait for code that needs more time to be executed)
e.g that's why in the below example "forEach" has a call back, if not we wouldn't get out
data until we were finished and other code could have run after we made our call but our method wasn't
displayed 
*/

var cities = [ 'Tokyo', 
				'London', 
				'Boston', 
				'Berlin', 
				'Chicago',
				'New York'];

var cities2 = [ 'Los Angeles'];


// cities.forEach(function callback(city){
// 	console.log(city);
// });
// for(var i=0;i<cities.length;i++) {
// 	console.log( cities[i] )
// }

/*Whether your callbacks are inline functions or predefined is a matter of 
choice.  As long as you have a reference to a function, you can use 
it as a callback */


//Passing a callback as a predefined function
// function callback(city){
// 	console.log(city);
// }


//Example this runs LA first because since JS in naturally ASync (non blocking)
//it runs citiesLoop2 because citiesLoop is waiting 500 seconds, to stop this
//and run in order, you have to use a callback
// function citiesLoop(c) {
// 	setTimeout(function(){
// 		for (var i=0;i<c.length;i++){
// 			console.log(c[i])
// 		}
// 	}, 500)
	
// }

// function citiesLoop3(x) {
	
// }

// function cd(c) {
// 		setTimeout(function(){
// 		for (var i=0;i<c.length;i++){
// 			console.log(c[i])
// 		}
// 	}, 500)
// }



// function citiesLoop2(c) {
// 	for (var i=0;i<c.length;i++){
// 		console.log(c[i])
// 	}
// }

//citiesLoop(cities);
// citiesLoop3(cd(cities))
// citiesLoop2(cities2);


/*
callbacks can be invoked synchronously or asynchronously 
The array.forEach() method used in the previous section invokes the
callback it receives synchronously.  
*/

//a callback being invoked asynchronously
/*function repositionElement(){
	console.log('repositioning!');
	//...
}*

//requestAnimationFrame returns immediately and invokes the 
//repositionElement callback at a later time.
/*window.requestAnimationFrame(repositionElement);


console.log('I am the last line of the script');
*/

/*
Synchronous code can be easier to undersatnd because it executes
in the order it is written.  A good comparison can be made using
the synch and asynch file APIs in Nodejs
*/

//using asynch code to write and read a file in Nodejs
/*var fs = require('fs'),
	timestamp = new Date().toString(),
	contents;


fs.writeFileSync('date.txt', timestamp);
contents = fs.readFileSync('date.txt');
console.log('Checking the contents');
console.assert(contents == timestamp);

console.log('I am the last line of the script');
*/


/*
var fs = require('fs'),
	timestamp = new Date().toString();


	fs.writeFile('date.txt', timestamp, function(err){
		if (err) throw err;

		fs.readFile('date.txt', function(err, contents){
			if (err) throw err;
			console.log('Checking the contents');
			console.assert(contents == timestamp);
		});
	});

console.log('I am the last line of the script');
*/

/*
//wrong async.  
var fs = require('fs'),
	timestamp = new Date().toString(),
	contents;

fs.writeFile('date.txt', timestamp);

//readfile is always invoked asynchronously, so readfile
//is guaranteed to return before invoking the callback 
fs.readFile('date.txt', function(err, data){
	if(err) throw err;
	contents = data;
});

console.log('Comparing the contents');
console.assert(timestamp == contents);
*/



/*
******
When you pass a callback to a function it's important
to know whether the callback will be invoked synchronously
or asynchronously.  You don't want a series of steps that build on 
one another to run out of order.

forEach isn't async, though it has a callback. But looks like an async since
JS is event-driven, and you make a scenario like I did above 
*/

/****!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
Callbacks can be  async or sync, depending on the function you call.
You can use promises to fix the issue with async, and make sure that the calls
you want to go first, do go first, and the ones you want to go later, do get
called later. Instead of you not knowing which async callback goes first (assuming you care
which param gets called first.  You can call an async function and not care on the 
order that the params get called).
And http calls are async functions

Also with callbacks you can run into callback hell, and promises makes this 
much easier to handle and even read

**Even though JS is syncronous by default it is event-driven so it doesn't wait for other stuff to finish
first, it something takes longer it keeps running other stuff
*****/


//the jquery.ready function can be synchronous or async
/*$(document).ready(function () {
	//jQuery cals this function after the DOM is loded and ready to
	//use

	console.log('DOM is ready');
});

console.log('I am the last line of the script');
*/

//Functions that invoke a callback synch in some cases and asynch
//in other create forks in the execution path that make your code less 
//predictable


//Run to Completion and the Event Loop:::::::::::::::::::::::::::::::::
/*
The JS you write runs on a single thread, which avoids complications 
found in other lanugages that share memory between threads.  
But if JS is single-threaded, where are the async tasks
and callbacks run?
*/

/*
//http request in Node.js
var express = require("express");
var app = express();


app.get('/',function(req,res){
	res.send("Hello World Abiam");
})

app.get('/home',function(req,res){
	res.send("Papiiii");
})

app.listen(3000);

var http = require('http');

	http.get('https://www.google.com', function(err, res){
		console.log('got a response');
	});
*/

/*
The call http.get() triggers a network request that a separate thread
handles.  But wait - you were just told that JS is single-threaded.
Here's the distinction: the JS code you write all runs on a single
thread, but the code that implements the async task(the http.get)
is not part of that JS and is free to run on a separate thread

in JS your code eruns without interruption until it passes control 
back to the host environment by returning from the function that the
host initially called.  At that point the callback can be removed from the queue 
and invoked.  

All other threads communicate with your code by placing items on the queue.  
They are not permitted to manipulate any other memory accessible to JS

After the callback is added ot the queue there is no guarantee how long
it will have to wait.  

The JS runtime simply continues in an endless cycle of pulling an item
off the queue if one is available, running the code that the item triggers,
and then checking the queue again.  This cycle is known as the event loop
*/
/*
//using setTimeout to demonstrate the event loop
function marco(){
	console.log('polo');
}

setTimeout(marco, 0);
console.log('Ready when you are');
*/

//Race condition
/*
var async = true,
	xhr = new XMLHttpRequest();

	xhr.open('get', 'data.json', async);
	xhr.send();

	setTimeout(function delayed() {
		function listener(){
			console.log('greetings from listener');
		}
		xhr.addEventListener('load', listener);
		xhr.addEventListener('error', listener);
	}, 3000);
*/



/*
Promises:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

//Promises comes from Async callbacks (not sync callbacks)

The biggest challenge with nontrivial amounts of async JS
is mangin execution order through a series of steps and 
handling any error that arise.  
Promises address this problem by giving you a way to organize callbacks
into discrete steps that are easier to read and maintain
.  And when errors occur they can be handled outside the primary application
logic without the need for boilerplate checks in each step

A promise is an object that serves as a placeholder for a value.
That value is usually the result of an async operation such as an HTTP
request or reading a file from disk.  When an async function is called it
can immediately return a promise object.  Using that object, you can
register callbacks that will run when the operation succeeds or an
error occurs


*/


//Using callbacks
/*
loadImage('.../waves.jpg',
	function onsuccess(img) {
		//Add the image to the current web page
		document.body.appendChild(img);
	},
	function onerror(e) {
		console.log('Error occurred while loading image');
	}
);/*


	function loadImage ( url, success, error) {

		var img = new Image();
		img.src = url;

		img.onload = function () {
			success ( img );
		};

		img.onerror = function ( e ) {
			error(e);
		};
	} 



//success and error is depricated (i think, its not promises either, i think lol)
//Promise then and catch
/*
 var promise = loadImage('/Users/abvelazquez/Desktop/waves.jpg');

 	promise.then(function (img) {
 		document.body.appendChild(img);
 	});

 	promise.catch(function (e) {
 		console.log('Error occurred whle loading image');
 		console.log(e);
 	})

*/


//Chaining calls using then and catch
/*
 loadImage('/Users/abvelazquez/Desktop/waves.jpg').then(function (img) {
 	document.body.appendChild(img);
 }).catch(function (e) {
 	console.log('Error occurred while loading image');
 	console.log(e);
 });


//creating and resolving a promise
	function loadImage(url) {
		var promise = new Promise(
			function resolver(resolve, reject) {
				var img =  new Image();
				img.src = url;

				img.onload = function() {
					resolve(img);
				};

				img.onerror = function (e) {
					reject (e);
				};
			});
		return promise;
	}
*/

/* Multiple Consumers:::::::::::::::::::::::::::::::::::::::::::::
When multiple pieces of code are interested in the outcome of the same
async operation, they can use the same promise.  
*/

//One promise with multiple consumers
/*
	var user = {
		profilePromise: null,
		getProfile: function () {
			if (!this.profilePromise) {
				//Assume ajax() returns a promise that is eventually
				//fullfilled with {name: 'Samantha', subscribedToSpam: true}
			
				this.profilePromise = ajax(/someurl/);
			}
			return this.profilePromise;
		}
	};

	var navbar = {
		show: function (user) {
			user.getProfile().then(function (profile) {
				console.log('***Navbar***');
				console.log('Name: ' + profile.name);
			});
		}
	};

	var account = {
		show: function (user) {
			user.getProfile().then(function (profile) {
				console.log('***Account Info ***');
				console.log('Name: ' + profile.name);
				console.log('Send lots of email? ' + profile.subscribedToSpam);
			});
		}
	};

	navbar.show(user);
	account.show(user);
*/
	//Console output:
	//*** Navbar ***
	//Name : Samantha
	//*** Account Info ***
	//Name: Samantha
	//Send lots of email? true



/* Promise States
The state of an operation represented by a promise is stored within
the promise.  At any given moment an operation has either not begun,
is in progress, has run to completion, or has stopped and cannot be 
completed.  These conditions are represented by three mutually
exclusive states:

Pending: The operation has not begin or is in progress
Fulfilled: The operation has completed
Rejected: The operation could not be completed

--> Pending  --> Fulfilled
		     --> Rejected

When a promise is no longer pending it is said to be settled.  This
is a general term indicating the promise has reached its final
state

*A Promise is a placeholder for the result of one attempt of 
an operation.
*/


//The following demonstrates how the state of a promise can
//only be changed once.  

//The state of a promise never changes after it is fulfilled or rejected

//  var promise = new Promise(function (resolve, reject) {
//  	resolve(Math.PI);
//  	reject(0);				//does nothing
//  	resolve(Math.sqrt(-1)); //does nothing
//  });

//  promise.then(function (number) { //that param is what the promise holds
//  	console.log('The number is ' + number);
//  });

// console.log(promise);
// console.log(promise.PromiseValue);

 //console output it
 //3.14...



 /////////////////////////
 /*
Async / Await

Async functions return a promise 


 */


/*
Promises vs Observables

Promise
A Promise handles a single event when an async operation completes or fails.
Note: There are Promise libraries out there that support cancellation, but ES6 Promise doesn't so far.
Observable
An Observable is like a Stream (in many languages) and allows to pass zero or more events where the callback is called for each event.
Often Observable is preferred over Promise because it provides the features of Promise and more. With Observable it doesn't matter if you want to handle 0, 1, or multiple events. You can utilize the same API in each case.
Observable also has the advantage over Promise to be cancelable. If the result of an HTTP request to a server or some other expensive async operation isn't needed anymore, the Subscription of an Observable allows to cancel the subscription, while a Promise will eventually call the success or failed callback even when you don't need the notification or the result it provides anymore.
Observable provides operators like map, forEach, reduce, ... similar to an array
There are also powerful operators like retry(), or replay(), ... that are often quite handy.


Promises Angular 1

https://tylermcginnis.com/async-javascript-from-callbacks-to-promises-to-async-await/


If you want to call an HTTP service you will get a Promise.

In your controller you will

variable.getFunc(). //get Promise
	.then( function (data) {  //you will pass a callback to the Promise
	//do data stuff after data has been generated
}) 

In your service 

return $http.get(url)  //Retrieving url endpoint which also passes over a Promise. This function returns promise
.then(function(data) {
	//do stuff
}
.catch(function(error){
	//if error
}

.then and .catch will return a new promise 

Angular 2 (observable and subscribe)

Make function type observable

return this._http.get(url)
	.map((res:Response) => //do whatever )
	.catch((error: any) => Observable.throw(err.json().error));


In component

this._service.function().
	.subscribe(  //subscribe 
	res => //do something  , you can add (res) if you want
	err=> //error
	() => //optional, if you want to do something else
)


Node (async and promise) (old school promise too) 

try {
    const groceriesPromise = fetch("http://groceries:3003/getGroceries"); //returns a promise
    const ratingsPromise = fetch("http://groceries:3003/getGroceryRatings");   //get URL
    const promises = [groceriesPromise, ratingsPromise]; //get Promise together
    const [groceriesResponse, ratingsResponse] = await Promise.all(promises);  //wait for promise to load (returns promise)
    const groceriesJSON = await groceriesResponse.json();
    const ratingsJSON = await ratingsResponse.json();
  
    res.json({ groceries: groceriesJSON, ratings: ratingsJSON});
    } catch(e) {
      res.sendStatus(500).json(e);
    }

//

result =  await function()  //this await function returns a promise and we wait for it (Returns promise)
//every away expression returns a promise
e.g.


*/