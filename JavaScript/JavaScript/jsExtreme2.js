/*
//**********************************************************************

Don't think of JS of class and inheritance.  The
syntax may trick you into thinking there's something
like classes present. in fact the prototype mechanism
is fundamentally opposite in its behavior

DOM::
textContent, innerHTML
Array methods, DOM methods, document, string...


////////////////////////////////////////////////////////
getting multiple values out of a function
 
 //
 function getSize( width, height, depth) {
	var area = width * height;
	var value = width * height * depth
	var sizes = [ area, volume];
	return sizes;
 }

 var areaOne = getSize(3,2,3)[0];
 var volumOne = getSize(3,2,3)[1];

////////////////////////////////////////////////////////

Anonymous function - name is ommitted
IFFE - executed once the interpreter comes across
them.
//var area = (function () { ... } ) () 


Many different ways to call an object

1. Arrays
2. Literal Notation
3. new Object()
4. Object.create()
5. Constructor function (use 'this')
6. function() (use 'new' unless returns object)(needs prototype)



**All variables in a function(objects) are private.  Only available within
that functions scope.
(In object literal call, you need to specify with 'this' to grab current
class scope.) 


Under the hood, the 'this' is a reference to the object
that the function is created inside.  
(the variable always looks for the global scope unless
specified by 'this')
The 'this' keyword is dynamically bound based on how the function
in the question is executed, ('this' keyword refers to the function
it appears in is a misconception and wrong)



let(block scoping) good for managing variable scope
within block { }
e.g.
while(1){
	let b = 2;
}
//then b is only of the scope between { } (the brackets) 


*/

//**********************************************************************


//Prototype, 'inheritance',

/*
Polyfilling::::::::::::::::::::::::::::::::::::::::::::

The word "polyfill" is an invented term used to refer to taking
the definition of a newer feature and producing a piece of
code that's equivalent to the behavior, but is able to run
in older JS environments.  

e.g. if (isNaN doesn't work on older browsers)

if (!Number.isNaN) {
	Number.isNaN = function isNan(x) {
		return x !== x;
	}
}


Transpiling:::::::::::::::::::::::::::::::::::::::::::::::::
Tool that converts your newer code into older code equivalent.  This
process is comonly called "transpilling" a term for transforming 
+ compiling.  

use - Babel, Traceur

*/


/*
Closure::::::::::::::::::::::::::::::::::::::::::::::::::::::

you can think of closure as a way to "remember" and continue to access
a functions scope( it's variables) even once the function has finished 
running

*/

//e.g.
/*
function makeAdder( x ) {

	function add( y ) {
		return y + x;
	}

	return add;
}

var plusOne = makeAdder(1); //1
plusOne(3); //4
*/


/*
Modules (Module Pattern):::::::::::::::::::::::::::::::::::::::::::

Modules, let you define private implementation details (variables,
functions ) that are hidden from the outside world, as well as a
public API that is accessible form the outside

*/

//e.g.


function User() {
	var username,
		password;

		function doLogin( user, pw ) {

			this.username = user;
			this.password = pw;

		}

		function tryd() {
			console.log("try");
		}

		function getName(){
			return this.username;
		}

		var publicAPI = {
			login: doLogin,
			usr :  getName,
			try2 : tryd
		};

		
		//return publicAPI;
}


var fred = new User();

fred.login( "fred", "123");
fred.try2();
console.log(fred.usr());
console.log(fred.tryd());





