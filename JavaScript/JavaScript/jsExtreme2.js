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

/*
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


		return publicAPI;
}


var fred = new User();

fred.login( "fred", "123");
fred.try2();
console.log(fred.usr());
console.log(fred.tryd());
*/





//Scope::::::::::::::::::::::::::::::::::::::::::::
/*
Scope is the set of rules that determines whwere and how a variable(identifier)
can be looked up.  This look-up may be for the purposes of assigning to the
variable, which is an LHS(lefthand-side) reference, or it may be for the
purpose of retrieving its value, which is an RHS(righthand-side) reference

*/

// function foo( a ) {
// 	console.log( a + b );
// }

// var b = 2;
// foo( 2 );//4



/*
For privacy issues instead of the doing the following

function doSomething( a ) {
	b = a + doSomethingElse( a * 2 );
	console.log( b * 3 );
}

function doSomethingElse( a ) {
	return a - 1;
}

var b;

doSomething( 2 );

do the following code instead

function doSomething( a ) {
	function doSomethingElse( a ) {
		return a - 1;
	}
	var b;
	b =  a + doSomethingElse( a * 2 );
	console.log( b * 3 );
}

doSomething( 2 );

*/

/*
Another benefit of "hiding" variables and functions inside a scope is to
avoid unintended collision between two different identifiers witht the
same name but different intended usages.  Collision results often in
unexpected overwriting of values
*/

// function foo() {
// 	function bar( a ) {
// 		 i = 3;//makes i global within foo, can change with "var i=3"
// 		console.log( a + i );
// 	}

// 	for ( var i = 0; i < 10; i++ ) {
// 		bar( i * 2 );
// 	}
// }

// foo();

//this causes an infinite loop bacause "i" in bar is actually 3


//Accessing global variable within function
// var a = 2;

// (function IIFE( global ) {
// 	var a = 3;
// 	console.log( a ); //3
// 	console.log( global.a ); //2
// })( window );

// console.log( a );//2


//BLOCK SCOPING - declaring variables as close as possible, as local as
//possible, as local as possible, to where they will be used.
//but on the surface, JavaScript has no facility for block scope
//unless you dig a little deeper

//let - keyword ataches the variable declaration to the scope of
//whatever block its contained in
//it hijacks any block's scope for its variable declaration

//"use strict"; //for ES6
// var foo = true;


// if ( foo ) {

// 	{

// 		let bar = foo * 2;
// 		bar = something( bar );
// 		console.log( bar );
// 	}
// }

// console.log( bar );


// function foo() {
// 	function bar( a ) {
// 		var i = 3;//makes i global within foo, can change with "var i=3"
// 		console.log( a + i );
// 	}

// 	for ( let i = 0; i < 10; i++ ) {
// 		bar( i * 2 );//uses this i and only here
// 	}
// }

// foo();


/*
// console.log( bar ) //var get undefined, with let get error

// var bar = 2;
*/



/*
Garbage Collection:::::
Another reason block-scoping is useful relates to closures and garbage
collection to reclaim memory.

consider:
*/

// function process( data ) {
// 	//do something here
// }

// var someReallyBigData = { .. }; //this variable data is kept in memory

// process( someReallyBigData );

// var btn = document.getElementById('myButton');

// btn.addEventListener( "click", function click( evt ) {
// 	console.log( "button clicked" );
// }, /*capturingPhase=*/ false );


// //we don't want someReallyBigData around
// //for memory usage, so we use block-scoping
// function process( data ) {
// 	//do something interesting
// }

// {
// 	let someReallyBigData = { .. }
// 	process( someReallyBigData );
// }

// var btn = document.getElementById('myButton');

// btn.addEventListener( "click", function click( evt ) {
// 	console.log("button clicked");
// }, /*capturingPhase=*/ false );

//declaring explicit blocks for variables to locally bind to is a
//powerful tool that you can add to your code toolbox


/*
Functions are the most common unit of scope in JavaScript.  Variables
and functions that are declared inside another function are essentially
"hidden" from any of the enclosing scopes, which is intentional design
principle of good software

Both function-scope and block-scope techniques where repectively approporiate
to produce better, more readable/maintainable code
*/



// Hoisting::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// The egg(declaration) comes before the chicken (assignment)

// Hoisting in Javascript default behavior of moving declarations to the top
// In JS, a variable can be declared after it has been used. It can be used before it has been
// declared.  JS only hoist declarations not initializations. To avoid bugs, always declare all variables
// at the beginning of every scope.


//Function declarations are hoisted, as we just saw. But function expressions are not
// foo();

// var foo = function bar() {
// 	console.log("HEY");
// }

//we get an error.  Function hasn't been declared



//*Note
// foo(); //TypeError
// bar(); //ReferenceError

// var foo = function bar() {};


//Functions are hoisted first over variables.
// foo();
// var foo;
// function foo() {
// 	console.log(1);
// }
// foo = function(){
// 	console.log(2);
// }

// while this all may sound like nothing more than interesting academic
// trivia, it highlights the fact that duplicate definitions in the same
// scope are a really bad idea and will often lead to  confusing results.


//***FOLLWING CAN BE CONFUSING!!!
// function declarations that appera inside of normal blocks typically hoist
// to the enclosing scope, rather than being conditional as this code implies.

// foo(); // b
// var a = true;

// if (a){
// 	function foo() { console.log("a") }
// } else {
// 	function foo() { console.log("b") }
// }

//However its important to note that this behavior is not reliable and
//is subject to change in future versions of Javascript, so its probably best
//to avoid declaring functions in blocks.


// var a  = 2;
//JS see it as var a and a =2 as two separate statements, the first one a compiler-phase task,
// and the second one an execution-phase task.

// What this leads to is that all declarations in a scope, regardless of where they appear, are
// processed first before the code itself is executed.  You can visualize this as declarations(variables
// 	and functions) being "moved" to the top of their respective scopes, which we call hoisting.
// Declaratoins themselves are hoisted, but assignments, even assignments of function expressions, are
// not hoisted.

// Be careful about duplicate declarations, expecially mixed between normal var declarations and functions
// declarations - peril awaits if you do!


/*
*****NOTE
"use strict" -- new
x = 3.14 //this will produce an error ( x is not defined )

Easier to write "secure" Javascript

*/


//Scope Closure:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// closure is all around you in JavaScript, you just have to recognize and embrace it
// Closures are created and used fo ryou all over your code.  What you are missing is the proper
// mental context to recognize, embrace, and leverage closures for your own will.


// Closure is when a function is able to remember and access its lexical scope even
// when that function is executing outside its lexical scope


// function foo() {
// 	var a = 2;

// 	function bar() {
// 		console.log(a);
// 	}

// 	bar();
// }

// foo();


// function foo() {
// 	var a = 2;

// 	function bar() {
// 		console.log(a);
// 	}

// 	return bar;
// }

// var baz = foo();

// baz(); //2



//Module:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
/* There are other code patterns that leverge the power of closure but that do not on the surface
appear to be about callbacks. Lets examine the most powerful of them: the module (module pattern)
*/
// function CoolModule() {
// 	var something = "cool";
// 	var another = [1,2,3];

// 	function doSomething() {
// 		console.log( something );
// 	}

// 	function doAnother() {
// 		console.log( another.join( "!" ) );
// 	}

// 	// return {
// 	// 	doSomething: doSomething,
// 	// 	doAnother: doAnother
// 	// };
// 	//return something;
// 	//return something;

// }
//console.log( CoolModule().something );

//To state it more simply, there are two requirements for the module pattern to be exercised
/*
	1. There must be an outer enclosing function, and it must be invoked at leaset once(each time creates
	a new module instance)
	2. The enclosing function must return back at least one inner function, so that this inner function
	 has closure over the private scope, and can access and/or modify that private state
*/
// var something = "papehh";

// var foo = (function CoolModule() {
// 	var something = "cool";
// 	var another = [1,2,3];

// 	function doSomething() {
// 		console.log( something );
// 	}

// 	function doAnother() {
// 		console.log( another.join("!") );
// 	}

// 	return {
// 		doSomething: doSomething,
// 		doAnother: doAnother
// 	};
// })();
// var me = {
// 	something: "hey"
// }
// foo.doSomething(); //cool
// foo.doAnother(); // 1 ! 2 ! 3!



// var foo = {
// 	something: "cool",
// 	doSomething: function() {
// 		console.log( this.something ); //THIS WORKS DIFFERENTLY IN OBJECT AND IN FUNCTION
// 	}
// }

// foo.doSomething();


// function CoolModule(id) {
// 	function identify() {
// 		console.log( id );
// 	}
// 	return {
// 		identify: identify
// 	};
// }

// var foo1 = CoolModule( "foo 1" );
// var foo2 = CoolModule( "foo 2" );

// foo1.identify(); // "foo 1"
// foo2.identify(); //"foo 2"


/* ANother slight but powerful variation on the module pattern is to name
the object you are returning as your public API
*/
// var foo = (function CoolModule(id) {
// 	function change() {
// 		publicAPI.identify = identify2;
// 	}

// 	function identify1() {
// 		console.log(id);
// 	}

// 	function identify2() {
// 		console.log( id.toUpperCase() );
// 	}

// 	var publicAPI = {
// 		change: change,
// 		identify: identify1
// 	};

// 	return publicAPI;
// })("foo module");

// foo.identify();//foo module
// foo.change();
// foo.identify();//FOO MODULE


// //MODERN MODULES::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// var MyModules = (function Manager() {
// 	var modules = {};
//
// 	function define(name, deps, impl) {
// 		for( var i=0; i<deps.length; i++) {
// 			deps[i] = modules[deps[i]];
// 		}
// 		modules[name] = impl.apply(impl, deps);
// 	}
// 	function get(name) {
// 		return modules[name];
// 	}
//
// 	return {
// 		define: define,
// 		get: get
// 	};
// })();
//
// MyModules.define( "bar", [], function() {
// 	function hello(who){
// 		return "Let me introduce: " + who;
// 	}
//
// 	return {
// 		hello: hello
// 	};
// });
//
// MyModules.define( "foo", ["bar"], function(bar) {
// 	var hungry = "hippo";
//
// 	function awesome(){
// 		console.log( bar.hello( hungry ).toUpperCase() );
// 	}
//
// 	return {
// 		awesome: awesome
// 	};
// });
//
// var bar = MyModules.get( "bar" );
// var foo = MyModules.get( "foo" );
//
// console.log( bar.hello("hippo") );//Let me introduce: hippo
// foo.awesome();//LET ME INTRODUCE: HIPPO\








//this::::::::::::::::::::::::::::::::::::::::

/*
The this mechanism provides a more elegant way of implicitly "pasing along" an object reference, leading
to cleaner API design and easeir reuse

You cannot use a this reference to look something up in a lexical scope. It's not possible

To learn this, you first have to learn what this is not, despite any assumptoins or misconceptions that
may lead you down those paths.  this is neither a reference to the function itself, nor is it a reference
to the functions lexical scope.
*/


//4 rules

// 1. DEFAULT BINDING::::::::::
// function foo() {
// 	console.log( this.a );
// }
//
// var a = 2;
//
// foo();//2

/*
The first rule will examine cmoes from the most common case of function calls: standalone function
invocation.  Think of this this rule as the defualt catch-all rule when none of the other rules apply.  */

/*Variables declared in the global scope, as var a = 2 is, are synonumous with global-object properties
of the same name.  They're not copies of each other, they are each other.  Secondly, we see that when foo() is
called, this.a resolves to out global variable a. Why? because in this case, the default binding for this applies
to the functoin call, and so points this at the global object.

How do we know tghat the default binding rule applies here? We examine the call0site to see how foo() is called.  In
our snippet, foo() is called with a plain, undecorated functoin reference.  None of the other rules we will demonstrate
will apply here, so the default binding applies instead.

If strict mode is in effect, the global object is not eligible for the default binding, so the this is insstead set to
undefined
*/

// function foo() {
// 	"use strict";
// 	console.log( this.a );
// }
//
// var a =2;
// foo();//undefined



// 2. IMPLICIT BINDING::::::
/*
Another rule to consider is whether the call-site has a context object, also referred to as an owning
or containing object.
*/

// function foo() {
// 	console.log( this.a );
// }
//
// var obj = {
// 	a: 2,
// 	foo: foo
// };
//
// obj.foo();// 2
//
// //Only the top/last level of an object property reference chain matters to the call-site
// //another example
// function foo() {
// 	console.log( this.a );
// }
//
// var obj2 = {
// 	a: 42,
// 	foo: foo
// };
//
// var obj1 = {
// 	a: 2,
// 	obj2: obj2
// };
//
// obj1.obj2.foo();//42
//
//
// //***** IMPLICITLY LOST
// /*
// One of the most common frustrations that this binding creates is
// when an implicityly bound function loses that binding, which ususally means
// it falls back to the default binding of either the global object or undefined, depending on
// strict mode
// */
//
// function foo() {
// 	console.log( this.a );
// }
//
// var obj = {
// 	a: 2,
// 	foo: foo
// };
//
// var bar = obj.foo; //functoin reference/alias
// var a = "oops, global"; //"a" also prperty on global object
//
// bar();//"oops global"
//
// //e.g.
//
// function foo() {
// 	console.log( this.a );
// }
//
// function doFoo( fn ) {
// 	//'fn' is just another reference to 'foo'
// 	fn(); // <-- call-site
// }
//
// var obj = {
// 	a: 2,
// 	foo: foo
// };
//
// var a = "oops global";//"a" also property on global object5
//
// doFoo( obj.foo ); //"oops global"


//parameter passing is just an implicit assignment, and since we're passing a function, it's an implicit
//refernce assingment, so the end result is the same as the previous snippet.


// 3. EXPLICIT BINDING
/*
With Implicit binding, we had to mutate the object in questoin to include
a reference on itself to the function, and use this property function
reference to indirectly bind this to the object

But what if you want to force a function call to use a particular object for
the 'this' binding, without putting a property function reference on the object

*/

// function foo() {
// 	console.log( this.a );
// }
//
// var obj = {
// 	a: 2
// };
//
// foo.call( obj ); //2

//involving foo with explicit binding foo.call(..) allows us to force
//its 'this' to be 'obj'
/*
If you pass a simple primitive value (of type string, boolean, or number)
as the 'this' binding, the primitive value is wrapped in its object-form(
new String(), new Boolean(), or new Number() ).  This is often referred
to as "boxing".

Unfortunately, explicit binding alone still doesn't offer any solution
to  the issue mentioned previously, of a function "losing" its intended
'this' binding or just having it paved over by a framework, etc.
*/

//***** HARD BINDING
//but a variation parttern around explicit binding actually does the trick
// function foo() {
// 	console.log( this.a );
// }
//
// var obj = {
// 	a: 2
// };
//
// var bar = function() {
// 	foo.call( obj );
// };
//
// bar(); //2
// setTimeout( bar, 100 );//


//e.g.
// function foo( something ) {
// 	console.log( this.a, something );
// 	return this.a + something;
// }
//
// var obj = {
// 	a: 2
// };
//
// var bar = function() {
// 	return foo.apply( obj, arguments );
// };
//
// var b = bar( 3 ); // 2 3
// console.log( b ); //5

//Another way to texpress this pattern is to create a reusable helper:
//
// function foo( something ) {
// 	console.log( this.a, something );
// 	return this.a  + something;
// }
//
// //simple 'bind' helper
// function bind( fn, obj ) {
// 	return function() {
// 		return fn.apply( obj, arguments );
// 	};
// }
//
// var obj = {
// 	a: 2
// };
//
// var bar = bind( foo, obj );
//
// var b = bar( 3 ); //2 3
// console.log( b );//5

//since hard binding is such a common pattern it's provided
//with a built-in utility as of ES5, Function.prototype.bind
//
// function foo( something ) {
// 	console.log( this.a, something );
// 	return this.a + something;
// }
//
// var obj = {
// 	a: 2
// };
//
// var bar = foo.bind( obj );
//
// var b = bar( 3 );// 2 3
// console.log( b );
//bind() returns a new function that is hardcoded to call the
//original functoin with the 'this' context set as you specified

//6. NEW BINDING

/* There's really no such thing as "constructor functions" but rather
construction calls of functions.

When a function is invoked with 'new' in front of it, otherwise known as
constructor call, the following things are done automcatically
1. A brand new object is created (aka constructed) out of thin airline
2. The newly constructed object is [[Prototype]] - linked
3. The newly constructed object is set as the 'this' binding for
that function call
4. Unless the function returns its own alternate object, the new-invoked
function call will automatically return the newly constructed object.

*/

// function foo( a ) {
// 	this.a = a
// }
//
// var bar = new foo( 2 );
// console.log( bar.a ); //2

/*
By calling foo(..) with 'new' in front of it, we've constructed a new
object and set that new object as the 'this' fot the call of foo(..) So
new is the final way that a function call's 'this' can be bound.
*/

/*
So we've uncovered the four rules for binding 'this' in functoin calls.  All
you need to do is find the call-site and ispect it to see which rules
applies.  But, what if the call-site has multiple eligible rules? there
must be an order of precedence to these rules, and so we will next
demonstrate what order to apply the rules

DEFAULT BINDING is the lowes priority rule of the four.
Which is more precedent, implicit binding or explicit??
*/

// function foo() {
// 	console.log( this.a );
// }
//
// var obj1 = {
// 	a: 2,
// 	foo: foo
// };
//
// var obj2 = {
// 	a: 3,
// 	foo: foo
// }
//
// obj1.foo(); //2
// obj2.foo();//3
//
// obj1.foo.call( obj2 ); //3
// obj2.foo.call( obj1 );//2

// So, explicit binding takes precedence over implicit binding, wihch
// means you should ask first if explicit binding applies before checking
// for implicit binding.

//Now, we just need to figure out where "new binding" first in the precedence


// function foo( something ) {
// 	this.a = something;
// }
//
// var obj1 = {
// 	foo: foo
// }
// var obj2 = {};
//
// obj1.foo( 2 );
// console.log( obj1.a );//2
//
// obj1.foo.call( obj2, 3);
// console.log( obj2.a ); //3
//
// var bar = new obj1.foo( 4 );
// console.log( obj1.a ); //2
// console.log( bar.a );//4

//Ok, new binding is more precedent than implicit binding

function foo( something ) {
	this.a = something;
}

var obj1 = {};

var bar = foo.bind( obj1 );
bar( 2 );
console.log( obj1.a );//2

var baz = new bar( 3 );
console.log( obj1.a );//2
console.log( baz.a ); //3
