document.writeln('Hello,world!');
console.log("hello,world");

//used to define new methods
/*Function.prototype.method = function(name, func){
	this.prototype[name] = func;
	return this;
};
*/

//==================================OBJECTS===================================================
var empty_object = {};

var stooge = {
	"first-name": "Jerome",//name
	"last-name": "Howard",
};



var myName = {

	firstName: "Abiam",
	lastName: "Velazquez"

}

var flight = {
	airline: "Oceanic",
	number: 815,
	departure:{
		IATA: "SYD",
		time: "2004-09-22 14:55",
		city: "Sydney"
	},
	arrival:{
		IATA:"LAX",
		time: "2004-09-23 10:42",
		city: "Los Angeles"
	}
};


//prototype
if(typeof Object.create !== 'function'){
	Object.create = function(o){
		var F = function() {};
		F.prototype = o;
		return new F();
	};
}
var another_stooge = Object.create(stooge);

//The prototype link has no effect on updating. When we make changes to an 
//object, the objects protoype is not touched
another_stooge['first-name'] = 'Harry';
another_stooge['middle-name'] = 'Moses';
another_stooge.nickname = 'Moe';

another_stooge["kid-Name"] = "Ramses";
//document.writeln(another_stooge["first-name"]);

stooge.profession = 'actor';
another_stooge.profession //'actor'


//Reflection
/*
typeof flight.number //'number'
typeof flight.status //'string'
typeof flight.arrival //'object'
typeof flight.manifest //'undefined'

typeof flight.toString //'function'
typeof flight.constructor //'function'


fight.hasOwnProperty('number') //true
flight.hasOwnProperty('constructor') //false
*/


//Enumeration
var name;
 //there is no guarantedd on the order of the names, so be prepared for
 //the names to appear in any order.  If you want to assure that the properties
 //appear in a particular order, it is best to avoid the for in statement
 //entirely and instead make an array containing the names of the properies in the correct order
for(name in another_stooge){
 	if(typeof another_stooge[name] !== 'function'){
 		//document.writeln(name + ':' + another_stooge[name]);
 	}
 }


//e.g. Array
/*
var i;
var properties = ['first-name','middle-name','last-name','profession'];
for(i=0;i<properties.length;i+=1){
	document.writeln(properties[i] + ':' +
		another_stooge[properties[i]]);
}
*/

//Delete
//The delete opereator cna be used to remove a property from an object.
//it will remove a proeprty from the object if it has one
//it will not touch any o the object in the prototype linkage
//another_stooge.nickname; //'Moe'
//Remove nickname from another_stooge, revealing the nickname of the prototype
//delete another_stooge.nickname;
//document.writeln(another_stooge.nickname); //undefined;


//Global Abatement
//By reducing your global footprint to a single name, you significantly reduce
//the chance of bad interactions with other applications, widgets, or libraries


//========================================FUNCTIONS================================================

//Functions in JS are objects
//Objects are collections of name/value pairs having a hidden link
//to a prototoype object.  Objects produced from object literals
//are lilnked to Object.prototype.  Function objects are linked
//to Fucntion.prototype(which is itself linked to Object.protytype)
//Every function is also created with two additional hidden properties: the 
//functions context and the code that implements the functions behaviour
//every function object is also created with a prototype property.
//its value is an object with a contructor property whose vale is the function
//This is distinct from the hidden link to Function.prototype.  

var add = function(a,b){
	return a+b;
}


//Invocation
//invoking a function suspends the execution of the current function, 
//passing control and parameters to the new function
//this and arguments

//Method Invocation Pattern
//When a function is stored as a property of an object, we call it a method
//When a method is invoked, this is bound to that object.  

var myObject = {
	value:0,
	increment: function(inc){
		this.value += typeof inc === 'number' ? inc : 1;
	}
};

myObject.increment();
//document.writeln(myObject.value);

myObject.increment(2);
//document.writeln(myObject.value);

var sum = add(3,4);
document.writeln(sum);
//when a function is invoked with this pattern, 'this' is bound to
//the global object 


myObject.double = function(){
	var that = this; //workaround

	var helper = function(){
		that.value = add(that.value, that.value);
	};
	helper();//invoke helper as a function

	
};
//invoke double as a method
myObject.double();
//document.writeln(myObject.getValue());



//==================================CONSTRUCTORS==================================================
//Constructor Invocation Pattern
//JS is a prototypal inheritance language, that means that objects
//can inherit properties directly from other objects.  The language is class-free


//Create a constructor function called Quo
//It makes an object with a status property

var Quo = function (string){
	this.status = string;
}

//Give all instances of Quo a public method
//called get_status

Quo.prototype.get_status = function(){
	return this.status;
};

//Make an instance of Quo

var myQuo = new Quo("confused");//new makes an instance

document.writeln(myQuo.get_status());//confused
/*document.writeln(myQuo.status);*/




//the "apply" method lets us construct an array of arguments to use to invoke
//a function.  It also lets us choose the value of "this".  The "apply" method takes two parameters.
//The first is the value that hsould be bound to this.  The second is an array of parameters

//Make an array of 2 numbers and add them
var array = [3,4];
var sum = add.apply(null,array);


//Make an object with a status member
var statusObject = {
	status: 'A-OK'//has to be same as 'this.status', cause thats what get_status is calling(237)
};

//statusObjects doesn't inherit from Quo.prototype
//but we can invoke the get_status method on
//statusObject even though statusObject doesn't
//have a get_status method

var status = Quo.prototype.get_status.apply(statusObject);
//status is 'A-OK'


document.writeln(Quo.prototype.get_status.apply(statusObject));





//Return
//The "return" statement can be used to cause the function to return early.
//Whsen "return" is executed, the function returns immediately withoug executing the 
//remaining statements
//A function always returns a value.  If the "return" value is not specified, then "undefined" is returned
//If the function was invoked with the "new" prefix and the return value is not an object, then "this"(new object) is returned


//Augmenting Types
//Adding a method to Object.prototype makes that method available to all objects
//This also works for functions, arrays, strings, numbres, regular expressions, 
//and booleans

Function.prototype.method = function(name,func){
	this.prototype[name] = func;
	return this;
};

//By augmenting Function.prototye with a "method", we no longer have to type the
//name of the "prototype" property.  That big of ugliness can now be hiddenss


//Scope
//JS doesn't have block scope even though its block syntax
//suggests that is does.  This confusion can be a source of errors
//JS does have function scope.  That means that the parameters and vairbles
//defined in a function are not visible outside of the function, and that 
//a variable defined anywhere whitin a function is visible everywhere within the 
//function
//In modern languages, it is recommended that variables be declared as late
//as possible, at the first point of use.  That turns out to be bad advice for JS
//because it lacks block scope.  So instead, it is best to declare all of the variables
//used in a functoin at the top of the function body


//You can also do (function() { }())//to protect scope of everything ()) will
//cause for the function to just run


//Closure
//The good news about scope is that inner functions get access to the parameters and
//variables of the functions they are defined within(with the exception of this or arguments)



//A more interesting case is when the inner function has a longer lifetime than
//its outer function
//Earlier, we made a "myObject" that had a value and an increment method. Suppose we
//wanted to protect the value from unauthorized changes.

//Instead of initializing myObject with an object literal, we will initialize myObect by
//calling a function that returns an object literal.  That function defines a value variable.
//That variable is always available to the increment and getValue method, but
//the functions scope keeps it hidden from the rest of the program

var myObject = function(){
	var value = 0;

	return{
		increment: function(inc){
			value += typeof inc === 'number' ? inc : 1;
		},
		getValue: function(){
			return value;
		}
	};
	
}();


//we are not assigning a function to myObject. We are assigning the result of
//invoking that function.  Notice the () on the last line.  The function returns an
//object containing two methods, and those methods continue to enjoy the privilege of
//access to the value variable


//The Quo constructor from earlier in this chapter produced an object with a status property
//and a get_status method.  Why would you call a getter method on a property you could access directly?
//It would be more useful if the status property were private.  So, lets define a different kind of quo
//function to do that

//MAKING CONSTRUCTOR 1
var quo = function(status){
	return{
		get_status: function(){
			return status;
		}
	};
};//returns object

//Make an instance of quo

var myQuo = quo("amazed");


document.writeln(myQuo.status);


//MAKING CONSTRUCTOR 2
function Quo(status) {
	this.get_status = function() {
		return status;
	}
}//this is a constructor 

//or 
var Quo = function(status) {
	this.get_status = function() {
		return status;
	}
}

//sets status as private
//hence using "quo('amaxed') set 
//the parameter to private.  Only way you can
//retrieve it is by using the getter method
//that function does the both setter and getter



//This quo function is designed to be used witout the new prefix, so the name
//is not capitalized.  When we call quo, it returns a new object containing a 
//get_status method.  A reference to that object is stored in myQuo.  The get)status
//method still has privileged access to quo's status property even though quo has already returned.
//get_status doesn't have access to copy of the parameter; it has access to the parameter
//itself.  This is possible because the function has access to the context in
//which it was cretaed. This is called closure

//Another example

//Define a function that sets a DOM node's color
//to yellow and then fades it to white
var fade = function(node){
	var level = 1;
	var step = function(){
		var hex = level.toString(16);
		node.style.backgorundColor = '#FFFF' + hex + hex;
		if(level < 15){
			level += 1;
			setTimeout(step, 100);
		}
	};
	setTimeout(step, 100);
};

fade(document.body);




//Callbacks
//asynchronous and synchronous calls

//synchronous
/*request = prepare_the_request();
response = send_request_synchronously(request);
display(response);

//asynchrounous
request = prepare_the_request();
send_request_asynchronously(request, function(response){
	display(response);
});*/



//Module
//we can use functions and closure to make modules.  A module is a function or object
//that presents an interface but that hides its state and implementation
//By using functions to prduce modules, we can almost completely eliminate our use of global
//variables, thereby mitigating one of JS worst features 


String.method('deentityify', function(){
	//The entity table. It maps entity names to
	//characters

	var entity = {
		quot: ' " ',
		lt: '<',
		gt: '>'
	};
//Return the deentittyify method

return function(){
	//This is the deentifyify method.  It calls the sting/
	//replace method, looking for substrings that start
	//with '&' and end with ';' If the characters in
	//between are in the entity table, then replace the
	//entity with the character from the table.  
	return this.replace(/&[^&;]+);/g,
		function (a,b){
			var r = entity[b];
			return typeof r === 'string' ? r : a;
		}
	  );
	};
}());


//The module pattern takes advantage of function scope and closure to create
//relationships that are binding and private.   In this exampe, only the deentityify 
//method has access tot eh entity data structure 


//The general pattern of a module is a function that defines private variables
//and functions; creates privileged functions which, through closure, will
//have access to the private variables and functions; and that returns the privileged
//functions or stores them in an accessible place

//Us of the Module pattern can eliminate the use of global variables(not good)
//it promotes information hiding and other good design practices.  It is very
//effective in encapsulation applications and other singletons.  

//it can also be used to produce objects that are secure.

var serial_maker = function(){

	//Produce an object that produces unique strings. A
	//unique string is made up of two parts: a prefix
	//and a sequence number,  The object comes with
	//methods for setting the prefix and sequence
	//number, and a gensym method that produces unique
	//strings

	var prefix = '';
	var seq = 0;
	return{
		set_prefix: function(p){
			prefix = String(p);
		},
		set_seq:function(s){
			seq = s;
		},
		gensym:function(){
			var result = prefix + seq;
			seq += 1;
			return result;
		}
	};
};

var seqer = serial_maker();
seqer.set_prefix = ('Q');
seqer.set_seq = (1000);
var unique = seqer.gensym();



//Cascade
//Some methods don't have a return value.  e.g. it is typical for methods
//that set or change the state of an object to return nothing.  If we have those
//methods return 'this' instead of 'undefined' we can enable cascades. In cascade, we can call
//many methods on the same object in sequence in a  single statement. 

/*
getElelement('myBoxDiv').
			move(350,15).
			width(100).
			height(100).
			color('red').
			border('10px outset').
			padding('4px');
			appendText("Please stand by").
			on('mousedown', function(m){
				this.startDrag(m, this.getNinth(m));
			}).
			on('mousemove', 'drag').
			on('mouseup', 'stropDrap').
			later(2000, function(){
				this.color('yellow').
				setHTML("What hath God wraught?").
				slide(400,40,200,200);
			}).
			tip('This box is resizeable');
*/

//Curry
//Functions are values, and we can manipulate function values in interesting ways
//Currying allows us to produce a new function by combining a function and an argument

//JS doesn't have a curry method, but we can fix that by augmenting Function.prototype

/*Function.method('curry', function(){
	var args = arguents, that = this;
	return function() {
		return that.apply(null, args.concat(arguments));
	};
	//something isn't right
})
*/
Function.method('curry', function(){
	var slice = Array.prototype.slice,
	args = slice.apply(arguments),
	that = this;
	return function(){
		return that.apply(null, args.concat(slice.apply(arguments)));
	};
});


var add1 = add.curry(1);
document.writeln(add1(6)); //7


//Memoization
//Function can use object to remmeber the results of previous operations, making it
//possible to avoid uneccessary work.  This optimization is called memoization.
//JS objects and arrays are very oconvenient for this



//============================================INHERTITANCE========================================================


//Inheritance


//JS,being a loosely typed language, never casts.  The lineage of an object
//is irrrelevant.  What matters about an object is what it can do not waht it is descended
//from
//Much more complicated constructions are possible, but it's usually best to keep it simple
//JS is prototypal language, which means that objects inherit directly from other objects

//Pseudoclassical
//jS is conflicted about its prototypal nature.  Its prorotype mechanism is obscrured 
//by some complicated syntactic business that looks vaguely classical.  
//Instead of having objects inherit directly from other objects, an unnecessary
//level of indirection is inserted such that objects are produced by constructor functoins.

//When a function object is created, the Function constructor that produces the 
//function object runs some code like this:
//this.prototype = {constructor: this};


Function.method('new', function(){

	//Create a new object that inherits from the
	//Constructor's prototype

	var that = Object.create(this.prototype);

	//Invoke the constructor, bing -this- to the new object

	var other = this.apply(that,arguments);

	//If its return value isn't an object, substitute the new object

	return (typeof other === 'object' && other) || that;
});

//we can define a constructor and augment its prototype

var Mammal = function(name){
	this.name = name;
};

Mammal.prototype.get_name = function(){
	return this.name;
};

Mammal.prototype.says = function(){
	return this.saying || '';
};

//now we can make an instance:

var myMammal = new Mammal('Herb the Mammal');
var name = myMammal.get_name(); //'herb the mammal'

//we can make another pseudoclass that inherits from Mammal by defining its constructor
//function and replacing its prototype with an instance of Mammal:

var Cat = function(name){
	this.name = name;
	this.saying = 'meow';
};

//replace cat.prototype with a new instance of Mammal

Cat.prototype = new Mammal();

//augment the new prototype with
//purr and get_name methods

Cat.prototype.purr = function(n){
	var i,s = '';
	for(i=0;i<n;i += 1){
		if (s){
			s +='-';
		}
		s +='r';
	}
	return s;
};
Cat.prototype.get_name = function(){
	return this.says() + ' ' + this.name + ' ' + this.says();
};

var myCat = new Cat('Henrietta');
var says = myCat.says();//'meow'
var purr = myCat.purr(5); //'r-r-r-r'
var name = myCat.get_name();//'meow Henrietta meow'

document.writeln(name); 

//The pseudoclassical pattern was intended to look sort of object-oriented,
//but it is looking quite alien.  We can hide some of the ugliness by using the
//method method and defining an inherits method:



//our inherits and method methods return "this", allowing us to program in a cascade
//style.  We can now make our Cat with one statement

/*
var Cat = function(name){9
	this.name = name;
	this.saying = 'meow';
}.inherits(Mammal).method('purr', function(n){
	var i,s = '';
	for(i=0;i<n;i += 1){
		if (s){
			s +='-';
		}
		s +='r';
	}
	return s;
}).method('get_name',function(){
		return this.says() + ' ' + this.name + ' ' + this.says();
	});
*/


//there is no privacy though; all properties are public.  There is no access to super methods
//If you forget to include the new prefix when calling a constructor function, the this will
//not be bound to a new object.  This will be bound to the global object, so instead of augmenting your new object
//you will be clobbering global variables.  
//To mitigate this problem, there is a convention that all construcotr functoins are named with an  initial capital, and that
//nothing else is spelled with an initial capital.  This gives us a prayer that visual inspection can find a missing new
//A much better alternative is to not use "new" at all


//Back to Constructors(object specifiers)
//it sometimes happens that a constructors is given a very large number of parameters
//this can be troublesome because it can be very difficult to remember the order of the arguments


//instead
/*var myObject = maker(f,l,m,c,s);

//we do
var myObject = maker({
	first:f,
	last: l,
	state: s,
	city: c
});*/

//the arguments can be listed in any order, arguments can be left out if the constructor
//is smart about defaults, adn the code is much easier to read


//prototypal
//in a purely prototypal pattern, we dispanse with classes.  We focus instead on the objects
//Prototypal inheritance is conceptually simpler than classical inheritance:a
//new object can inherit the properties of an old object.  
//you can make a useful object.  you can then make many more object that are like that one.
//the classification process of breaking an application down into a set of nested abstract classes can be completely avoided

var myMammal = {
	name: 'Herb the Mammal',
	get_name: function(){
		return this.name;
	},
	says: function(){
		return this.saying || '';
	}
};
/*
var happy = 7
var myProblem = function(){
	var value = 4;
	var happy = 5;


	 var physics = function(){
		return value;
	}
	physics();
	return{
		lola: function(){ return happy }
	};
	
};
*/

//=======================================OTHER OBJECT AND INHERITANCE============================================

//once we have an object taht we like, we can make more instances with the Object.create method
//we can then customize the new instances
var myCat = Object.create(myMammal);
/*var yourCat = new myProblem();
document.writeln(yourCat.lola());*/
myCat.name = 'Henrietta';
myCat.saying = 'meow';
myCat.purr = function(n){
		var i,s = '';
	for(i=0;i<n;i += 1){
		if (s){
			s +='-';
		}
		s +='r';
	}
	return s;
};
//myCat.get_name = function(){
//	return this.says() + ' ' this.name + ' ' + this.says();
//};

//this is differential inheritance. By customizing a new object, we specify the 
//differences from the object on which it is based.

//items defined in a scope are not visible outside of the scope.  In a sense, an inner scope
//inheirts from its outer scope. JS objects are very good at representing this relationship
//the "block" function is called
//when a left curly brace is encountered.  The parse function will lookk up symbols from
//scope, and augment scope when it defines new symbols 

var block = function(){
	//remember the current scope.  Make a new scope that
	//includes everything from the current one

	var oldScope = scope;
	scope = Object.create(scope);

	//advance past the left curly brace
	advance('{');

	//Parse using the new scope

	parse(scope);

	//advance past the right curly brace and discard the
	//new scope, restoring the old one

	advance('}');
	scope = oldScope;

}



//////Functional
var mammal =  function(spec){
	var that = {};

	that.get_name = function(){
		return spec.name;
	};

	that.says = function(){
		return spec.saying || '';
	};
	return that;

};

var myMammal = mammal({name: 'Herb'});


var cat = function (spec) {
	spec.saying = spec.saying || 'meow';
	var that = mammal(spec);
	that.purr = function(n){
		var i,s = '';
		for(i=0;i<n;i += 1){
			if(s){
				s += '-';
			}
			s += 'r';
		}
		return s;
	};
	that.get_name = function(){
		return that.says() + ' ' + spec.name + ' ' + that.says();
		return that;
	};
}

	var myCat = cat({name: 'Henrietta'});

//super methods
Object.method('superior', function(name){
	var that = 'this',
	method = that[name];
	return function(){
		return method.apply(that,arguments);
	};
});


var coolcat = function(spec){
	var that = cat(spec), super_get_name = that.superior('get_name');
	that.get_name = function(n){
		return 'like ' + super_get_name() + 'baby';
	};
	return that;
};

var myCoolCat = coolcat({name: 'Bix'});
var name = myCoolCat.get_name();
//'like mewo Bix meow baby'


//if all of the state of an object is private, then the object is taper-proof
//properties of the object can be replaced or deleted, but the integrity of the object is not
//compromised.  If we create an object in the functional style, and if al of the methods of the
//object make no use of this or taht, then the objec is durable.  A durable object is simiply a collection
// of functoins that act as capabilities
//a durable object cannot be compromised.  Access to a durable object doesn't give an attacker
//the ability to access the internal state of the object except as permitted by the methods




//we can compose objects out of set of parts.  
//we can make a function that can add simple event processing features to any object
//it adds an on methods, a fire method, and a private event registry

var eventuality = function(that){
	var registry = {};

	that.fire = function(event){
		var array,func,handler,i, type = typeof event === 'string' ? event: event.type;

		if(registry.hasOwnProperty(type)){
			array = registry[type];
			for(i=0; i<array.length; i+=1){
				handler = array[i];


				func = handler.method;
				if(typeof func === 'string'){
					func = this[func];
				}

				func.apply(this, handler.parameters || [event]);
			}
		}
		return this;

	};//end fire

	that.on = function(type, method, parameters){
		var handler = {
			method: method, 
			parameters: parameters
		};
		if(registry.hasOwnProperty(type)){
			registry[type].push(handler);
		} else {
			registry[type] = handler;
		}
		return this;
	};//end on
	return that;
};
 

 //we could also call it in a constructor function before that is returned
 eventuality(that);
 //in this way , a construcotr could assemble ojects from a set of parts/
 //JS loose typing is a big benefit here becasue we are not burdened with a type/
 //system that is concernedd about the lineage of classes. Instead, we can focus on the character
 //of their contents
 //if we wanted eventuality to have access to the objects private state, we could pass it the my bundle

//jS array are really objects


//When the property names are small sequential integers, you should use an array
//otherwise use an object 

Array.method('reduce', function(f, value){
	var i;
	for(i=0;i<this.length; i += 1){
		value = f(this[i], value);
	}
	return value;
});

//by adding a functoin to Array.prototype, every array inhertis the mehotd. In this
//case , we defined a reduce method that takes a fucntion and a starting value.  For each
//element of the array, it cals the function with an element and the value, and computs a new value


//becuase an array is really an object, we can add methods directly to an individual array
data.total = function(){
	return this.reduce(add, 0);
};

total = data.total(); //total iis 108




