/*var async = true;
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

*/


//CallBacks:::::::::::::::::::::::::::::::::::::::::::::::::::::::
/* 
Are the cornerstone of asynchronous JS programming.  

e.g.
*/


var cities = [ 'Tokyo', 
				'London', 
				'Boston', 
				'Berlin', 
				'Chicago',
				'New York'];
/*
cities.forEach(function callback(city){
	console.log(city);
});
*/
/*Whether your callbacks are inline functions or predefined is a matter of 
choice.  As long as you have a reference to a function, you can use 
it as a callback */


//Passing a callback as a predefined function
function callback(city){
	console.log(city);
}

cities.forEach(callback);



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
******When you pass a callback to a function it's important
to know whether the callback will be invoked synchronously
or asynchronously.  You don't want a series of steps that build on 
one another to run out of order.  
*/

/****!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
Callbacks can be  async or sync, depending on the function you call.
You can use promises to fix the issue with async, and make sure that the calls
you want to go first, do go first, and the ones you want to go later, do get
called later. Instead of you not knowing which async callback goes first (assuming you care
which param gets called first.  You can call an async function and not care on the 
order that the params get called).
And http calls are async functions
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

 var promise = new Promise(function (resolve, reject) {
 	resolve(Math.PI);
 	reject(0);				//does nothing
 	resolve(Math.sqrt(-1)); //does nothing
 });

 promise.then(function (number) { //that param is what the promise holds
 	console.log('The number is ' + number);
 });

console.log(promise);
console.log(promise.PromiseValue);

 //console output it
 //3.14...





