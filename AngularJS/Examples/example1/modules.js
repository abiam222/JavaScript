(function(){
	var firstModule = angular.module('firstModule',[]);
	//firstModule is not global here 

	firstModule.controller('FirstController',function($scope){
		//register a controller
		//your rocking 
	});

	firstModule.directive('FirstDirective', function(){
		//register directive
		return{

		};
	});
});

})();

//firstModule undefined here 

/*Instead of above, we can do as follows
angular.module('firstModule', []);//specify dependency list here

angular.module('firstModule').controller('FirstController', function($scope){
	//your rocking controller
});

angular.module('firstModule').directive('FirstDirective',function(){
	return {

	};
});*/

//when you divide your source doe into different modules you have two choices
/* 
*Modularization by layers
*Modularization by features




Controllers shoud not

-No DOM manipulation.  This hsould be done in directives
-DOn't format model values in controllers.  Filters exists for this purpose
We have already seen filters in action with the built in date filters
-Don't write repeatable code in controllers.  Rather encapsulate them in services.

Controllers should
-Set the initial state of a scope by attaching models to it 
-Set functions on the scope that perform some tasks





///Adding Instance Functions and Properties to Controllers

**USING THIS 


Cons:
-Exposing the whole controller instance isn't a good idea in many cases.
The scope obejct exists for clear separation of concern between controller and view
-The approach is not mainstream and also leads to more typing

Pros:
-When controllers are nested and both inner and outer controller scopes
have models with the same names, the as keyword can really comein handy:

e.g.
<div ng-controller='OuterController as outer'>
	<div ng-controller='InnerController as inner'<
	Outer ={{outer.someModel}} and inner={{inner.someModel}}



//Data Binding

Data binding is the automatic synchronizatoin of data between view and the model.



//Scope
A scope- like other objects - can have properties and functions atached to it
The only difference is that we don't usually consturct a scope obejct manually.
Rather, AngularJS automatically creates and injects one for us


//Propotype

function Car(color,steering){
	this.color = color;
	this.steering = steering;
}

Car.prototype.year = 2012; //Car is functional object, so it has the 
'property' property

var car = new Car('red', 'left');

console.log(car.color);//prints color from car
console.log(car.year);//prints year from Car.prototype
console.log(car.hasOwnProperty('year')); //returns false

The prototype property is only present in constructor functions.  For example, 
Car has a prototype property while the obect constructed from Car(that is to say, car)
has an internal property called __proto__ which holds its prototype.

var car = new Car('red','left');//sets car.__proto__ = Car.prototype

but since IE is a bitch it doesn't use __proto__ as the name of this internal property.
But a Object.getPrototypeOf(objectName) was introduces to retrieve the internal __proto__


//Writing Access with Prototypes

Our object car doesn't have a property year, but Car.prototype does. 
Wehn you try to read car.year you get the value from Car.prototype.  
But you can also attach the property year to car, like this:

//Writing a Primitive to an object
car.year = 2000//sets prpoerty 'year' on car
console.log(car.year);//returns 'year' property from car and NOT from Car.prototype
console.log(car.hasOwnProperty('year'));//returns true as car has 'year' property

When you attach a new property to an object the property is attached to it
and not the prototype. Subsequently when you access the property, JS no longer consults
the property because the porpoerty is found right therer in the objects itself

//Writing a Reference Type to an object
Car.prototype.data = {}; //set it to empty object

car.data.engine = 'rear'; //this does not create a new property called 'data' on car object
console.log(car.data.engine); //returns 'rear' and it comes from Car.prototype
console.log(car.hasOwnProperty('data'));//false, as car doesn't have own property 'data'
Car.proptotype.hasOwnProperty('data'); //'data' property is created in prototype


//Objects an extend objects

var ferrari = Object.create(car);
console.log(Object.getPrototypeOf(ferrari)); //Car{}

Object.create() creates a new object whose internal __proto__ property
points to the object specified as the first argument to the function.  as
a result the ferrari objects __proto__ now points to car object.  So,
ferrari has all the properties defined in the car instance



