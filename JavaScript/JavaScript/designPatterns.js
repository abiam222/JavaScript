//Both Making object 'person' and calling its inheritance 'driver'
/*
var defineProp = function( obj, key, value ) {
	var config = {
		value: value,
		writable: true,
		enumerable: true,
		configurable: true
	};
	Object.defineProperty( obj, key, config );
};

var person = Object.create( Object.prototype );
defineProp( person, "car", "Delorean" );
defineProp( person, "dateOfBirth", "1981" );
defineProp( person, "hasBeard", false);

console.log(person);


var driver = Object.create( person );

defineProp( driver, "topSpeed", "100mph" );

console.log( driver.dateOfBirth );
console.log( driver.topSpeed );
*/


/////////////////////////////////////////////////////////////////
//CONSTRUCTOR PATTERN


/*
function Car( model, year, miles ) {
	this.model = model;
	this.year = year;
	this.miles = miles;

	this.toString = function () {
		return this.model + " has done " + this.miles + " miles";
	};
}

 var civic = new Car( "Honda Civic", 2009, 20000 );
 var mondeo = new Car( "Ford Mondeo", 2010, 5000 );

 console.log( civic.toString() );
 console.log( mondeo.toString() );
 */


 //Constructors With Prototypes
//[ABOVE CONSTRUCTOR HAS SOME PROBLEMS; It makes inheritance difficult and the
//other is that functions such as toString() are redefined for each of the
//new object created using the Car constructor(making additional instances)]

/*
 function Car( model, year, miles) {
 	this.model = model;
 	this.year = year;
 	this.miles = miles;
 }

 //note that we are using OBject.prototype.newMethod rather than
 //Object.prototype so as to avoid redefining the prototype object
Car.prototype.toString = function () {
	return this.model + "has done " + this.miles + " miles";
};

var civic = new Car( "Honda Civic", 2009, 2000 );
var mondeo = new Car( "Ford Mondeo", 2010, 5000 );

console.log( civic.toString() );
console.log( mondeo.toString() );
*/

//a single instance of toString() will now be shared between all of the
//Car objects


//////////////////////////////////////////////////////////////////
//MODULE PATTERN


//Keeps code cleanly separated and organized

//Ways to implement modules
/* 
The Module pattern
Object literal notation
AMD modules
CommonJS modules
ECMAScript Harmony modules
*/

//Module defined using Object literal notation
/*var myModule = {
	myProperty: "someValue",

	myConfig: {
		useCaching: true,
		language: "en"
	},

	saySomething: function () {
		console.log( "Where in the world is Paul Irish today?" );
	},

	reportMyConfig: function () {
		console.log( "Caching is: " + ( this.myConfig.useCaching ? "enabled"
			: "disabled") );
	},

	updateMyConfig: function( newConfig ) {
		if ( typeof newConfig === "object" ) {
			this.myConfig = newConfig;
			console.log( this.myConfig.language );
		}
	}
};

myModule.saySomething();
myModule.reportMyConfig();
myModule.updateMyConfig({
	language: "fr",
	useCaching: false
});
myModule.reportMyConfig();
*/
//using object literals can assist in encapsulatin gand organizing
//your code


/*The module pattern was originally deined as a way to provide both private
and public encapsulation for classes in conventional software engineering


In JS, the Module pattern is used to furhter emulate the concept of classes,
in such a way that we're able to include both public/private methods and 
variables inside a single object, thus shielding particularparts form the 
global scope.  


The Module pattern encapsulates "privacy", state and organization using closures.  
With this pattern, only the public API is returned, keeping everything
else within the closure private.  

**Should be noted that there isn't really an explicitly true sense of "privacy"
inside JS becasue unlike some traditional languages, it doesn't have access modifiers
Variables can't technically be declared as being public nor private and so we use 
function scope to simulate this concept.  Within the Module patten, variables or
methods declared are only available inside the module itself thankful
to closure.  Variables or methods defined within the returning object however 
are available to everyone

*/


//e.g. Module pattern which is self contained
// var testModule = (function() {
// 	var counter = 0;//only limited to this scope

// 	return {
// 		incrementCounter: function() {
// 			return counter++;
// 		},

// 		resetCounter: function() {
// 			console.log( "counter value prior to reset: " + counter );
// 			counter = 0;
// 		}
// 	};
// })();

// testModule.incrementCounter();
// testModule.resetCounter();


//Here's another Modular template

// var myNamespace = (function() {
// 	var myPrivateVar,
// 		myPrivateMethod;

// 		myPrivateVar = 0;

// 		myPrivateMethod = function( foo ) {
// 			console.log( foo );
// 		};

// 		return {
// 			myPublicVar: "foo",

// 			myPublicFunction: function( bar ) {
// 				myPrivateVar++;
// 				myPrivateMethod( bar );
// 			}
// 		};
// })();

// console.log( myNamespace.myPublicVar );
// myNamespace.myPublicFunction("Abiam");

/*
var basketModule = (function() {
	//privates
	var basket = [];

	function doSomethingPrivate() {
		//...
	}

	function doSomethingElsePrivate() {
		//...
	}

	//return an object exposed to the public
	return {
		//add items to our basket
		addItem: function( values ) {
			basket.push( values );
		},

		//get the count of items in the basket
		getItemCount: function() {
			return basket.length;
		},

		//public alias to a private function
		doSomething: doSomethingPrivate,

		//get the total value of items in the basket
		getTotal: function() {
			var q = this.getItemCount(),
				p = 0;

			while ( q-- ) {
				p += basket[q].price;
			}

			return p;
		}
	};
})();
*/


//inside the module, you may have noticed that we return an object. 
//This gets automcatically assigned to "BasketModule" so that 
//we can interact with it as follows:

// basketModule.addItem({
// 	item: "bread",
// 	price: 0.5
// });

// basketModule.addItem({
// 	item: "butter",
// 	price: 0.3
// });

// console.log( basketModule.getItemCount() );
// console.log( basketModule.getTotal() );
// console.log( basketModule.basket );
// console.log( basket );


//Import mixins
/* This variation of the pattern demonstrates how globals (e.g. jQuery, Underscore)
can be passed in as arguments to our module's anonymous function.
This effectively allows us to import them and locally alas them as we wish.
*/

//Global Module
// var myModule = (function ( jQ, _ ) {

// 	function privateMethod() {
// 		jQ("container").html("test");
// 	}

// 	function privateMethod2() {
// 		console.log( _.min(10,5,100,2,1000) );
// 	}

// 	return {
// 		publicMethod: function() {
// 			privateMethod();
// 		}
// 	};
// 	//Pull in jQuery and Underscore
// })( jQuery, _ );

// myModule.publicMethod();


//Exports
/*This next variation allows us to declare globals without consuming them
and couls similarly support the concept of global imports seen in the last
example */

// var myModule = (function() {

// 	var module = {},
// 		privateVariable = "Hello World";

// 		function privateMethod() {
// 			//...
// 		}

// 		module.publicProperty = "Foobar";
// 		module.publicMethod = function() {
// 			console.log( privateVariable );
// 		};

// 		return module;
// })();

// console.log( myModule.publicMethod() );



//Module Pattern for different JS libraries
//many examples, this is for jQuery
// function library( module ) {
// 	$(function() {
// 		if ( module.init ) {
// 			module.init();
// 		}
// 	});
// 	return module;
// }
 
//  var myLibrary = library(function() {
//  	return {
//  		init: function() {
//  			//module implementation
//  		}
//  	};
//  }());


/////////////////////////////////////////////////////////////////
/*
The Revealing Module Pattern

came about as Heilmann was frustrated with the fact that he had to 
repeat the name of the main object when we wanted to call one public method from
another or access public variables.  He also disliked the Module pattern's 
requirement for having to switch to object literal notation
for the things he wished to make public.  

*/

// var myRevealingModule = (function() {

// 	var privateVar = "Ben Cherry",
// 		publicVar = "Hey there!";

// 	function privateFunction() {
// 		console.log( "Name:" + privateVar );
// 	}

// 	function publicSetName( strName ) {
// 		privateVar = strName;
// 	}

// 	function publicGetName() {
// 		privateFunction();
// 	}

// 	//reveal public pointers to private functions and properties
// 	return {
// 		setName: publicSetName,
// 		greeting: publicVar,
// 		getName: publicGetName
// 	};
// })();

// myRevealingModule.setName( "Paul Kinlan" );


/////////////////////////////////////////////////////////////////////////

// function User() {

// 	function Buying() {
// 		console.log("BUYING");
// 	}

	// return {
	// 	Buying: Buying
	// }
// }

// User().Buying()

// var User = function() {
// 		function Buying() {
// 		console.log("BUYING2");
// 	}

// 	return {
// 		Buying: Buying
// 	}
// };

// User().Buying();


//Module!!!
//IFFE, function  ( can return(so those can only be accessed) )
//in any function the scope is protected so you have to return something.
//In IFFE you don't put var().blahh you just do var.blahh
//Object Literal (e.g. var module = {}  )
//without Buying() youre grabing the whole function(not what it returns)
//... you need () for that. 
//(or if it was an object, then the whole object, without () )


/////////////////////////////////////////////////////////////////////////


// The Singleton Pattern

// the singleton pattern can be implementedby creating a class with a method that
// creates a new instance of the class if one doesn't exist.  

// A singleton is not an object or class. It's a structure.  
// Think of how closured variables aren't actually closures - the function
// scope that prvocides the closure is the closure.  

// var mySingleton = (function(){
// 	//instance stores a reference to the singleton
// 	var instance;

// 	function init(){
// 		//singleton

// 		//private methods and variables
// 		function privatedMethod() {
// 			console.log( "I am private" );
// 		}

// 		var privateVariable = "I'm also private";

// 		var privateRandomNumber = Math.random();

// 		return {
// 			//Public methods and variables
// 			publicMethod: function() {
// 				console.log( "The public can see me!" );
// 			},

// 			publicProperty: "I am also public",

// 			getRandomNumber: function() {
// 				return privateRandomNumber;
// 			}
// 		};//end return
// 	};//end init

// 		return {
// 			//Get the singleton instance if one exists 
// 			//or crete on if it doesn't
// 			getInstance: function() {
// 				if ( !instance ) {
// 					instance = init();
// 				}

// 				return instance;
// 			}
// 		};
// })();


// var myBadSingleton = (function() {
// 	//instnace stores a reference to the singleton
// 	var instance;

// 	function init() {
// 		//singleton
// 		var privateRandomNumber = Math.random();

// 		return {
// 			getRandomNumber: function() {
// 				return privateRandomNumber;
// 			}
// 		};
// 	};

// 	return {
// 		//always create a new Singleton instance
// 		getInstance: function() {
// 			instance = init();

// 			return instance;
// 		}
// 	};
// })();

// //Usage:

// var singleA = mySingleton.getInstance();
// var singleB = mySingleton.getInstance();
// console.log( singleA.getRandomNumber() === singleB.getRandomNumber() ); //true

// var badsingleA = myBadSingleton.getInstance();
// var badsingleB = myBadSingleton.getInstance();
// console.log( badsingleA.getRandomNumber() !== badsingleB.getRandomNumber() ); //true



// 1. There must be exactly one instance of a class, and it must be accessible
// to clients from a well-known access point.
// 2. When the sole instance should be extensible by subclassing, and clients
// should be able to use an extended instance without modifying their code.



//From the example above if I change something from singleA, it will also
//change in singleB.  Only one instance of a class.  You can call a million
//objects and they will all be the same, if you change one, then they all change


//e.g.
var SingletonTester = (function() {
	//options: an object containing configuratoin options for the singleton
	//e.g. var options = { name: "test", pointX: 5 };
	function Singleton( options ) {

		//set options to the optinos supplied 
		//or an empty obejct if none are provided
		options = options || {};

		//set some propertie for our singleton
		this.name = "SingletonTester";

		this.pointX = options.pointX || 6;
		this.pointY = options.pointY || 10;
	}

	//our instance holder
	var instance;

	//an emulation of static variables and methods
	var _static = {
		name: "SingletonTester",

		//method for getting an instance.  It returns
		//a singleton instance of a singleton object
		getInstance: function( options ) {
			if ( instance === undefined ) {
				instance = new Singleton( options );
			}
			return instance ;
		}
	};
})();

	var singletonTest = SingletonTester.getInstance({
		pointX: 5
	});

	console.log( singletonTest.pointX ); //output 5