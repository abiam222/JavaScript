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

//Module defined using OBject literal notation
var myModule = {
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

//using objec literals can assist in encapsulatin gand organizing
//your code
