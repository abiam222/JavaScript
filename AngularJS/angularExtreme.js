/*
**Modules
**Controllers(different ways to do it)
**Data Binding(One way, Two Way)
***Scope
***Events
***Views & Routing
***Services
***Factories 
***Providers
***$watchers
REST API
****Directives
***Dependency Injection(DI)
****Filters
Deployment, Internationalization, Testing


Modules:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
In AngularJS you can easily divide your front-end source code into reusable components, called modules.  

app.js
controllers.js
directives.js
filters.js
services.js

e.g.*/
angular.module('firstModule', []); //no dependencies

angular.module('firstModule', ['moduleA', 'moduleB']);//2 dependencies

//e.g.2
// /app/modules/login/js/controller.js
angular.module('mainApp.login.controllers',[]);
// /app/modules/login/js/directives.js
angular.module('mainApp.login.directives',[]);
// /app/modules/login/loginModule.js
angular.module('loginModule', ['mainApp.login.controllers',
	'mainApp.login.directives']);
// /app/modules/comments/js/controllers.js
angular.module('mainApp.comment.controllers',[]);
// /app/modules/comment/js/directives.js
angular.module('mainApp.comment.directives'.[]);
// / app/mdoules/comment/loginModules.js
angular.module('commentModule',['mainApp.comment.controller',
	'mainApp.comment.directives']);


//Controller:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//e.g. 1
var firstModule.controller = angular.module('firstModule',[]);//define module

firstModule.controller('FirstController',function($scope){
	//register controller
});

firstModule.directive('FirstDirective',function(){
	//register a directive
});


/*above not good idea to put all in one instead you can 
do this but put it in this function
(function(){  ...  })();
*/

//e.g. 2
angular.module('myApp.controllers', []).controller('MainController', function($scope){
 //call controller
});

//e.g. 3
function FirstController($scope){
	//register controller
}


//e.g. 4 can do(really smart)
angular.module('firstModule', [])
.controller('FirstController', function($scope){
	//your controller
}).directive('FirstDirective',function(){
	//return blahh
})


//You can either use $scope or this(ivar)[but with this 
//you will have to change the view to e.g. meController.now
//where now is the model and meController the controller
//instead of just now]


/*

Dependency Injection::::::::::::::::::::::::::::::::::::::::::::::::

Makes our lives easier by letting us write loosely coupled and easily testable components(our code is not in charge of obtaining its dependencies)(injectable types most commonly used in AngularJS are services)
Many services but two popular are $provide and $injector that work in the background to make Dependency Injection possible

e.g.1(not so popular)    */
function DemoController($rootScope, $scope, $http){

}
DemoController.$inject=['$rootScope','$scope','$http'];
angular.module('myApp',[]).controller('DemoController', DemoController);

//e.g.2
angular.module('myApp',[]).controller('DemoController',
	['$rootScope','$scope','$http',
	function($rootScope,$scope,$http){
	//write here
	//the dependecies are injected into the constructor functoin in the order
	//they are declared in the array
}]);


//e.g.
//Provider
angular.module(‘myApp’,[]).config(function($provide){
$provide
.provider(‘alertService’, function(){
	this.$get = function(){
	return function(){
	alert(‘Service in action’);
} } }); });

//You can get hold of the $provide service inside the config block of your module.  Then you can call $provide.provider() to register a new provider.  Now, in another component, say a controller, you can ask for alertService to be injected

function simpleController(alertService){
	alertService();
}

/*When you ask for the alertService the provider’s $get method is called and you receive what it returns
provider(), service(), factory(), value() and constant() to register different injectable types.  
Methods such as factory(), value(), constant() etc. all create providers for you implicitly without obliging you o type all the provider related stuff
*/

//e.g.
//Factory
app.config(function($provide){
	$provide.factory('alertService',function(){
		return function(){
			alert('Service in Action');
		}	}) })

angular.module('myApp').factory('alertService',function(){
	return function(){
		alert('Service in Action');
	}
})

//Service
//$injector e.g.
angular.module('myApp').service('customerService',function($injector){
	var $http=$injector.get('$http');
	var $rootScope=$injector.get('$rootScope');
});
//you can also get $injector injected into the config block of you module
angular.module('myApp').config('[$injector', function($injector){
	//use $injectro here
}]);
//you can have $injector for selected modules.
var injector = angular.injector(['ng','customModule']);



/*
Data Binding:::::::::::::::::::::::::::::::::::::::::::
Is the automatic synchronizatoin of data between view and the model.
When we say two-way, we mean the synchronization process works both
ways.  In AngularJS, we cerate the models and set them on the scope object

e.g.
*/
...
<input type="text" ng-model="name"/>
<div>Hello, {{name}} </div>
...





/*
Services, Factories, and Providers:::::::::::::::::::::::::::::::::::::::::::
*/

/*Services like $location, $timeout, $rootScope
/real-world application, the built-in services are not always
going to be sufficient so you'll need to create custom services.

The main purpose of these components is that they hold some logic that's
required at multiple points within your app.  Although services, factories, and
providers are all sued to accomplish the same task(encapsulating repetitive logic)
there are subtle difference between them.  

They're all injectible types.They can be injected into contrllers and other services 
through Dependency Injection.  Apart from these there are also two more injectable
types: value and constant. 

***AngularJS Services are Always Singletons
*/

angular.module('myApp').service('helloService', function(){
	this.sayHello = function() {
		alert('Hello!! Welcome to services')
	}
});//first param: service name second param:: is the constructor func

//to use it you do this
angular.module('myApp').controller('TestController',
	function(helloService){
		helloService.sayHello();//helloService is the service object
	});//camelcase for services

 //we can also add dependencies to our service like the following
 angular.module('myApp').service('helloService',
 	function($timeout){
 		this.sayHello=function(name){
 			$timeout(function(){
 				alert('Hello' +name);
 			},2000);
 		}
 	});

 angular.module('myApp').controller('TestController',
 	function(helloService){
 		helloService.sayHello('AngularJS');
 	});

 //eagerly load a service(for speed, not lazy instantiated use run())
/* 1.The second argument to service() is a constructor.When we 
ask for the service as dependency, AngularJS creates an object from
this constructor function and injects it
2. A service is a singleton.  Instantiates the service object only once
and all other components share the same instance.
3. Services are lazily instantiated.  Instantiates the service
only when it encounters a component that declares dependency on the
service
*/

/*
Factory
same as a service.  However is more verbose and configurable,
it gives you freedom to determine what to instantiate and return
to the factory*/

//e.g.
angular.module('myApp').factory('helloService',
	function(){
		return{
			sayHello: function(name){
				alert('Hello' +name);
			},
			echo: function(message){
				alert(message);;
			}
		}
	});
/*second argument is a normal function(not a constructor function)
which can return an object or function.  
The value can be a function, object, or value. In this case
we aer returning an object with two intance methods
*/

//e.g.
angular.module('myApp').controller('TestController',
	function(helloService){
		helloService.sayHello('AngularJS');//alerts Hello AngularJS
		helloService.echo('I Love AngularJS');//alerts I love AngularJS
	});//same as service

/*Usually, the object you return from the factory function,
has several functions that perform differnt tasks.  For instance, in
a note-taking app you can have a noteFactory.  The instnace returned
by the factory function may have functions such as:
*/

angular.module('myApp').factory('noteFactory',
	function($http){
		//declare dependency on $http
		return{
			addNote: function(note){
				//save the note. may be use $http to persist on server
			},
			updateNote: function(note){
				//UPDATE NOTE
			},
			getNotes: function(){
				//get all notes
			},
			getNote: function(noteId){
				//get a single not
			}
		}
	});//this factory can be inject into a controller or some other
//service whenever required/
/*Remember that factories, like services, are singletones.  
A factory can also depend on other services or factories.  The
above example demonstartes this by declaring a dependency on $http.  
Both services and factories are used to accomplish the same
task: ***sharing data and encapsultig business logic.
Note that you return an object from the factory function, so youu
have the freedom to determine which object to return based on certain
params.  This is not the case with services where you simply pass a 
constructor function to service().  That said, in many instances,
you can use either a service or factory.
*/


/*Provider
Is the most configurable and verbose version of services
because it's based on prior setting or logic.  e.g. the built
in $route service may behave differently based on the mode(html5Mode or hashbang)
you configured in $route-Provider.  In short, a provider, as its name suggests, acts
as a provider of some sort of service.

**Every service you create has an associated provider(AngularJS does
this automatically for you) 

A provider can be injected into our modules config() block, where a
user can configure it before the app starts.  
*/
//e.g. to greet users
angular.module('myApp').provider('greet',function(){
	this.greeting = 'Hello';//we can configure this. The default is Hello
	this.$get = function(){ //will be called to obtaion greet service
		return function(name){
			alert(greeting + ', ' + name);
		}
	}
	this.setGreeting = function(greeting){//setter for gretting text
		this.greeting = greeting;
	}
});
/*the second argument t provider() is a constructor function.
This must have an instance method called $get() in order for the
provider to work. 

We're exposing a service called greet. But the actual provider name
is greetProvider.  So we'll use the name greet to get a reference
to the service and greetProvider to get a reference to the provider
(in module.config())


Now we can configure and use the provider as following:::
*/

angular.module('myApp').config(function(greetProvider){//get the provider injected
	greetProvider.setGreeting('Hola');//configure our provider
});

angular.module('myApp').controller('TestController',
	function(greet){
		greet('Sandeep');//use the greet service
	});


/* 
What's returned?

greetProvider = Result of invoking the constructor function passed to 
provider() with new.  This returns an object.

greet = Result of calling greetProvider.$get(). In this case it returns 
a function which displays an alert.  But the return type can be anything
in general


Value:

is an injectible type that is used to register a simple service,
which can be a string, number, array, function, or an object.  

e.g. Suppose you want to provide a version number for your website;
you can just use a value service. 
*/

angular.module('myApp').value('appVersion','1.0');

/*The above snippet registers a value service appVersion whose value set to
1.0.  A controller or some service in our app can declare a dependency on 
this value and use it.  
'value' can't be injected in module.config(); this is one of the important
differences between values and constants.  This is done to prevent accidental 
instantiation of services during the configuration phase.

Constant:

A constant is an injectable type that is the same as a value except
that it can be injected into module.config().  You register a constant
by calling constant() function of angular.module();
*/

angular.module('myApp').constant('DATA_SOURCE','a string here');


/*
Decorators:

Modify third-party services
pg109
*/



//Service
/*
Syntax: module.service( 'serviceName', function ); 
Result: When declaring serviceName as an injectable argument you will be 
provided with an instance of the function.
In other words new FunctionYouPassedToService().
 */

 //Factories
 /*
 Syntax: module.factory( 'factoryName', function ); 
Result: When declaring factoryName as an injectable argument you
 will be provided with the value that is returned by invoking the 
 function reference passed to module.factory.
*/


//Providers
/*
Syntax: module.provider( 'providerName', function ); 
Result: When declaring providerName as an injectable argument 
you will be provided with ProviderFunction().$get().
 The constructor function is instantiated before the $get method
  is called - ProviderFunction is the function reference passed to 
  module.provider.
  */



provide.value('a', 123);

function Controller(a) {
  expect(a).toEqual(123);
}
//In this case the injector simply returns the value as is. 
//But what if you want to compute the value? Then use a factory

provide.factory('b', function(a) {
  return a*2;
});

function Controller(b) {
  expect(b).toEqual(246);
}

//So factory is a function which is responsible for creating the value. 
//Notice that the factory function can ask for other dependencies.
//But what if you want to be more OO and have a class called Greeter?

function Greeter(a) {
  this.greet = function() {
    return 'Hello ' + a;
  }
}

//Then to instantiate you would have to write

provide.factory('greeter', function(a) {
  return new Greeter(a);
});

//Then we could ask for 'greeter' in controller like this

function Controller(greeter) {
  expect(greeter instanceof Greeter).toBe(true);
  expect(greeter.greet()).toEqual('Hello 123');
}

//But that is way too wordy. A shorter way to write this would be provider.service('greeter', Greeter);
//But what if we wanted to configure the Greeter class before the injection? Then we could write

provide.provider('greeter2', function() {
  var salutation = 'Hello';
  this.setSalutation = function(s) {
    salutation = s;
  }

  function Greeter(a) {
    this.greet = function() {
      return salutation + ' ' + a;
    }
  }

  this.$get = function(a) {
    return new Greeter(a);
  };
});

//We can then do this:

angular.module('abc', []).config(function(greeter2Provider) {
  greeter2Provider.setSalutation('Halo');
});

function Controller(greeter2) {
  expect(greeter2.greet()).toEqual('Halo 123');
}
//As a side note, service, factory, and value are all derived from provider.

provider.service = function(name, Class) {
  provider.provide(name, function() {
    this.$get = function($injector) {
      return $injector.instantiate(Class);
    };
  });
}

provider.factory = function(name, factory) {
  provider.provide(name, function() {
    this.$get = function($injector) {
      return $injector.invoke(factory);
    };
  });
}

provider.value = function(name, value) {
  provider.factory(name, function() {
    return value;
  });
};










/*
Filters:::::::::::::::::::::::::::::::::::::::
Sometimes data stored in a web app is in a format that's different
from what we want to show to the user.  e.g. You may store two-digit
country codes in lowercase in your database, but wish to display those
country codes on a web page in uppercase.  This is where AngularJS filters come ni.
Filters help to filter the format the data to be displayed to the users.  

*/

//e.g.
{{countryCode | uppercase}}
//uppercase is the name of the filter
{{currentDate | date: 'yyyy-MM-dd'}}
//can also take multiple arguments
{{expression | imaginaryFilter: arg1 : arg2 : arg3}}
//other built in like currency, number, date, json


//customer filter
//e.g.
angular.module('myApp',[]).filter('limitCharacters',function(){
	return function(input,characterCount){
		return(input.length > characterCount) ?
		input.substring(0,characterCount) : input;
	}
});

//then you will write
{{content | limitCharacters : 127}}


//chaining filters
{{content | limitCharacters: 127 | uppercase}}

//Using filters in controllers, services, and directives
//e.g.
angular.module('myApp',[]).controller('TestController',
	function($scope,limitCharactersFilter){
		$scope.content = limitCharactersFilter('Thi is less than 127',
			127);
	});
//You need to add a suffix Filter to the filer name while listing it
//as an argument for dependcy injection


//show like this
{{content}}

/////
/*There's a built in filter in AngularJS called "filter" that takes
an array of imtes and returns a sub-array based on filtering condition.
"filter" is ost commonly used in conjecntion with ng-repeat
pg238 really nice

<li ng-repeat="friend in friends | filter: {{name:filterText}}

//orderBy Filter
//limitTo Filter

Using the $filter Service

e.g.*/
angular.module('myApp',[]).controller('TestController',
	function($scope,$filter){
		var limitCharacters = $filter('limitCharacters');
		$scope.content = limitCharactersFilter('This is less than 127',127);
	});

//worcoutn filter




/*
Directives:::::::::::::::::::::::::::::::::::::::::::::::::::

//Directives
Directives, i.e. ng-repeat, ng-show, ng-model
But when you come to develop real world apps you'll most
likely ned custom directives.
Directive: to help you make your HTML truly interactive 
by attaching even listeners to the elements and/pr tranforming the DOM
*/
//in jquery you can do 
<input type="text" class="date-picker" />
$(".date-picker").datePicker();

//but with Angular DIrectives you can do
<date-picker></date-picker>

//Directives come in four flavors
/*
As elements: <date-picker></date-picker>
As attributes: <input type="text" date-picker>
As classes: <input type="text" class="date-picker" />
As comments: <!-- directive: date-picker -->

Its best to try to use directives as elements or attributes
whenever possible 

**Although you use the camelCase to name the directive, when 
using it in the HTML you'll need to separate the words with 
dashes or colons

hence 
*/
angular.module('myApp', []).directive('helloWorld', function(){
   return{
      restrict: 'AEC',
      replace: true,
      template: '<h3>Hello, World!</h3>'
   }
});
/*
<hello-world/> or <hello:world/>
or <div hello-world /> or <div hello:world />

if you want to be HTML5 compliant you can prefix your directive
name with x- or data-

<div data-hello-world></div>
<div x-hello-world></div>


-restrict: this provides a way to specify how a directive should
be used in HTML(there are four ways).  In this case we've set it to 
'AEC', which means the directive can be used as an attribute, a new HTML
element or class. 

-template: this specifies the HTML markup that'll be produced when the directive
is processed by AngularJS.   

Keep your directives in a separate HTML file. 


******scope - if you have ng-controller in the markup and our directive
is used inside it, then the directive will use the parent controller’s scope.  This means that you can set models and watchers on this scope inside the link function.  But this is not your only option.  Directives can also be configured to define their own scope- something we’ll cover later in this chapter 

elm: this is the element on which our directive is applied.  This element is already jQLite wrapped. 

attars: This is a map containing the attributes and their values that are applied to the directive in HTML.

*it’s important to note that attrs contains, not only the attributes that were set for the directive, but also all the attributes set for the element of the directive.  This way, even if you use a directive as an attribute itself, you can access all the other attributes on the same element.  


compile: used to perform a DOM transformation before the link function runs.  Note that the compile function doesn’t have access to the scope, and must return a link function.  But if there’s no compile function you can configure the link function as usual.  


compile function accepts the following arguments.  

tElement - the element on which the directive is applied.  The prefix t indicates that this is a template element and no scope is available yet.  

attrs - The map of attributes declared on the element in markup

*/
//i.e.

angular.module(‘testModule’).directive(‘testDirective’, function(){
	return {
	  compile: function(tElem, attrs){
	    //do optional DOM transformation here
	   //tElem is jQLite/jQuery wrapped
	     return function(scope, elem, attars){
		//linking function here
		};
	     }
	  };
	});


//you can use compile, controller, and link

/*
**Most of the time, you’ll be working with the link function alone.  This is because most directives are concerned with registering even listeners, watchers, updating the DOM, etc.  
and this is done inside the link function. Directives such as hg-repeat, which need to clone and repeat the DOM element several times, use the compile function before the link function runs.  This leaded to the question of why two separate functions are needed at all.  Why can’t we just have one? To answer this, we need to understand how directives are compiled by AngularJS

Compilation of Directive::
When the application bootstraps, AngularJS starts parsing the DOM using the $compile service.  This searches for

Most of the time, you’ll be working with the link function alone.  This is because most directives are connected with registering event listeners, watchers, updating the DOM, etc. and this is done inside the link function.  


//Changing a directives scope
*/
…
 return {
	scope: true, //use a child scope that inherits from parent
…
   
//more pg205


/*
Using @ for One-Way Binding////////
@ is used to establish a one-way binding between isolated scope model and a parent scope property.  We call this one-way binding because with this technique you can only pas strings to the attribute(using expressions, {{}} or just static values)
When the parent scope property changes, you isolated scope model also changes.  However the reverse is not true! You can’t change the parent cope model by manipulation the isolated scope model.  
Parent Scope vs Child Scope vs. Isolated Scope////////////
As an AngularJS beginner one might get confused while choosing the right scope for a directive.  By default,a directive doesn’t create a new scope and uses its parent’s scope.  
But in many cases this isn’t what we want.  If your directive manipulates the parent scope properties heavily and creates new ones, it might pollute the scope.  Letting all the directives use the same parent scope istn’ a good idea because anybody can modify our scope properties.  The following guidelines may help you choose the right scope for your directive:

* Parent Scope(scope: false) - the is the default case.  If your directive doesn’t manipulate the parent scope properties you might not need a new scope.  In this case, using the parent scope is okay
*Child Scope(scope:true) - this creates a new child scope for a directive which prototypically inherits from the parent scope.  If the properties and functions you set on the scope are nt relevant to toerh directives and the parent, you should probably create a new child scope.  With this you also have al the scope proprieties and functions defined by the parent.  
*Isolated Scope(scope: {}) - This is like a sandbox! You need this if the directive you’re going to build is self-contained and reusable.  Your directive might be creating many scope properties and functions which are meant for internal use, and should never be seen by the outside world.  If this is the case, it’s better to have an isolated scope.  The isolated scope, 
as expected, does not inherit the parent scope 

Transclusion - is a feature that enables us to wrap a directive around arbitrary content.  
If you set transclude:true in the directive definition, a new transcluded scope will be created which prototypically inherits from the parents scope.  If you want your directive with isolated scope to contain an arbitrary piece of content and execute it against the parent scope, transclusion can be used.  
The controller function of a directive is used if you want to allow other directives to communicate with yours.  
****DO PAGE 215
Inside your directive, if you register any listener to the scope, it’ll be destroyed automatically at the same time as the scope.  But if you register listeners on a service or a DOM element which isn’t going to be destroyed you should manually clean them up.  Otherwise you may introduce memory leakages.
When your scope is getting destroyed it will broadcast a $destroy event.  You can listen to it, and perform any final cleanups like so:
*/
scope.$on(‘$destroy’, function(){
	//cleanups here
});
s
^^https://docs.angularjs.org/guide/ie


//MORE ON DIRECTIVES IN OTHER PAGE

/*
You're right, there's many options at play.
A controller is a good place to start writing something new in angular. Tying a controller to a piece of markup lets you use angular's already existing library of directives with angular's existing services.
After a very short while of living with this, you'll realize your controller has gotten too large. Well now its time to refactor. Here's the general guidelines I tend to follow.

Controllers: controllers attach and manage values/functionality tied to the $scope. Ultimately $scope tends to be heavily presentation driven. IE its a view model.
Services: services tend to tie in infrastructure, backend, or other browser features
Directives: directives allow you to integrate with DOM events/functionality not handled by existing handlers.
So you'll want to push code in one of three directions:

Code from my controller is really logically another piece of presentation data/logic and should be split into another controller. Note when working with items on $scope, its best to segregate parts that each controller
 is responsible for into their own objects on $scope. For example $scope.creditCard.[blah] for one controller vs $scope.billingAddress.[blah] for another controller. This helps prevent issues with angular's use of prototype inheritance on $scope.
Code from my controller is a piece of application infrastructure or utility code, that may need to be shared through the app, and should be split off into a service
Code from my controller is concerned heavily with presentation/DOM organization, and therefore should be split off into its own directive

An example of 1. might be to handle entering/validating credit card separate from the rest of the payment form. You'd have a bunch of credit card logic in a controller separate from the logic for letting users input addresses, so they'd be logically separate controllers.
An example of 2 might be to move the part that communicates with the credit card backend service to accept/decline payment. Or another example might be a module that talks to the backend to handle the user creation API.
An example of 3 might be to create some sort of auto-tab functionality that moves the cursor between the 4 edit boxes after the 4 numbers are entered for a credit card.
Split up your app accordingly.


//ADDED LATER:::::
Directive - DOM Manipulation, Catch DOM events
directives e.g. are ng-repeat, ng-show
You can extend HTML, do better than DIV and SPAN tags




*/

/*
View and Routing:::::::::::::::::::::::::::::::::::::::::::::::

Every web app you'll build in the future will have different views
associated with it.  As we're developing Single Page Apps, it's
importantto map each route to a particular view. This logically divides you 
app into manageable parts and keeps it maintainable.  
AngularJS provides excellent support for multiple views and routing via its
routing API.


We can say that each AngularJS route is composed of a URL, a template
and a controller.  

When someone first lands on our web page, it'sa full-page load.  Subsequently,
when the user clicks a link and navigates to a different URL, the route changes and content of the
route are dynamically loaded into the page via an AJAX call.
The benefit of this approach is that it results in much less network traffic.  
in a typical web app, we'd load each page fully with each request, serving loads
of repetitive content such as headers and footers multiple times in the process.  But
when you use multiple views and routing there's no repetitive content since the headers,
footers, sidebars, are only served as a part of the firs request.  All Subsequent request simply
updating specific elemetns of your page.  As you might expect, this leads to faster rendering of the views.


Views in your app are regular HTML files.  As a result, we need to create
separate HTML file for each view.  The next step is to tell AngularJS which view
to use for which route. 
*/

//e.g.
//Assuming we hav etwo views: partials/view1.html
//	and partials/view2.html 

angular.module('myApp').config(function($routeProvider){
	$routeProvider.when('/view1',{
		controller: 'Controller1',
		templateUrl: 'partials/view1.html',
	}).when('/view2',{
		controller:'Controller2',
		templateUrl: 'partials/view2.html',
	});
});//view1.html and view2.html are just partials

/*config() let's use configure a module.  
we inject $routeProvider as an argument to the function.  
This is, in fact , a built-in AngularJS object.  When we declare
a function with the paramters $routeProvider,
AngularJS automatically injects a $routePRovider object while calling it
this is another example of Dependnecy Injection in action.  

The when() function of $routeProvider can be used to configure your routes.
This particular function takes two params.  The first param is the route name
and a string representing the route.  The second is the route definintion.

controller is optional because you can use ng-controller in the HTML.  

*/

//e.g.
//Two views: One for showing a "Hello World" and another
//for showing the current date 

//app/js/app.js
'use strict';

angular.module('myApp',['myApp.controllers','ngRoute']);

angular.module('myApp').config(function($routeProvider){
	$routeProvider.when('/view1',{
		controller:'Controller1',
		templateUrl:'partials/view1.html'
	}).when('/view2',{
		controller: 'Controller2',
		templateUrl: 'partials/view2.html'
	});
});

//app/js/controller.js
'use strict';

angular.module('myApp.controllers',[]).controller('Controller1',
	function($scope){
		$scope.message = "Hello, World";
	}).controller('Controller2',function($scope){
		$scope.now = new Date();
	});

//app/index.HTML
...
<body>
	<ul>	
		<li><a href="#/view1">view1</a></li>
		<li><a href="#/view2">view2</a></li>
	</ul>

	<ng-view></ng-view>//container for differnt views
	//we could have also done <div class="ng-view"></div>
	//or <div ng-view></div>
...


//app/partials/view1.html
<p>From View 1: {{message}} </p>

//app/partials/view2/html
<p>From View 2: {{now | date: 'medium'}}</p>


//html5Mode pg77


/*
Sometimes it's necessary to pass some parameters to the controller 
associated with your view.  

e.g. You may want to pass a post ID in the URL, which the controller can grab
and then fetch the related content via an Ajax call.   These parameters
passed in the route are called route paramters and are exposed by an integreated 
AngulaJS service called $routeParams.  

e.g. for /view1: This allows users to enter their first and last name. 
On the click of a button, we load route /view2, passing the first name and 
last name as route parameters.  

/view2: it retrieves the passed first name and last name from the route
and displays them. 

*/

//app.js

'use strict';

angular.module('myApp', ['myApp.controllers', 'ngRoute']);

angular.module('myApp').config(function($routeProvider, $locationProvider){
	$routeProvider.when('/view1',{
		controller:'Controller1',
		templateUrl:'/partials/view1.html'
	}).when('/view2/:firstname/:lastname',{
		controller: 'Controller2',//we can refer to these route params
		//via $routeParams.firstname and $routeParams.lastname
		templateUrl: '/partials/view2.html'// the '/' says is not the root directory
	}).otherwise({redirectTo:'/view1'});
	$locationProvider.html5Mode(true);
});

//partials/view1.html
<p>
	First name: <input type="text" ng-model="firstname" /><br />
	Last name: <input type="text" ng-model="lastname" /><br />
	<button ng-click="loadView2()">Load View2</button>
</p>


//partials/view2.html
<p>
	From View2.
	<ul>
		<li>First name: {{firstname}}</li>
		<li>Last name: {{lastname}}</li>
	<ul>
</p>


//controllers.js
'use strict';

angular.module('myApp.controllers', []).controller('Controller1',
	function($scope, $location){
		$scope.loadView2 = function(){
			$location.path('/view2/'+$scope.firstname+'/'+
				$scope.lastname);
		}
	}).controller('Controller2',function($scope,$routeParams){
		$scope.firstname = $routeParams.firstname;
		$scope.lastname = $routeParams.lastname;
	});


//ng-template
//pg 82


/*
'resolve' Property in the Route Config object we pass as the second 
argumnet to the $routeProvider.when() function.  This can be used
to pass additional dependencies to the controller.  

e.g. for a controller to work we might need
to retrieve all the users in our system, typically by doing an AJAX call.
This is what resolve does.  

Deffered type(promise) - Which means the returned value is 
just a placeholder for an actual value that'll be available in the
near future.  
Consider an AJAX call that retrieves a blog post from its id.  You
can resolve here to get post object.  
*/

...
templateUrl: '/partials/view2.html',
resolve: {
	names: function(){
		//typically you will use a service to retireve values form 
		//the server here
		return ['Misko', 'Vojta', 'Brad'];//this is used as dependency value
	}
}

//rest on pg86


/*
Updatig $location Does not cause  a Full Page Refresh

When you use $location to update browser URL, this just loads a 
new route and does not cause a full page refresh. If you want to 
trigger a full page refresh, or redirect the user to a different website
or URL, you can do that using $window.location.href
*/

$location.path()//gets current path
$location.path('/view2');//sets the current path and updates URL

$location.search();//get an object tha has key/values as search params
$location.search({key1:value1,key2:value2});//set the search params

//hash() function lets you get or set the hash part of the URL
$location.hash();//get the hash part e.g. #div1, #div2 etc
$location.hash('div');//changes URL to /view1#div

//you can chain as well
$location.path('/view2').search({key1:value1}).hash('div1');

/*The following functions of $location can be used to read the non
writable parts of the URL
*host(): returns the host name, such as localhost
port(): Returns the port the server is listening on, such as 8000
protocol(): returns the protocol used, such as http
url(): returns the part of the URL after hostname and protocol
absURL(): returns the whole URL
*/

/*
Events in Routing:::::

$location:
$locationChangeStart: This event is broadcast on the $rootScope just
before the URL in the browser changes as result of the mutations done
to $location via setters - such as calling path()
$locationChangeSuccess: This event is broadcast just after URL in the
browser changes.  But, if some part of your code listens to the $locationChangeStart
event and calls prventDefault on it, this event won't be fired.  

$route:
$routeChangeStart: This event is broadcast just before AngularJS starts
changing the route.  At this point, the $route service starts resolving all the dependencies
needed to effect this change.  This typically involves fetching the view
template and resolving all the dependencies listed in 'resolve' property
in the route definition.  

e.g.
*/
angular.module('myApp').run(function($rootScope){
	$rootScope.$on('$routeChangeStart', function(){
		//do something magical here
	});
});


/*
$routeChangeSuccess: This event is broadcast after the $route service is able  
to successfully resolve all the dependencies needed to load the new route.
The ng-view directive listens to this event so that it can instantiate the
related controller, and the view can be rendered.  

$rootChangeError: If the $route service is unable to resolve at least one 
of the dependencies needed to change the route, the $routeChangeError event 
is broadcast.



ng-include - can be used to fetch, compile, and include an external
HTML fragment in your main page.  

e.g. Your main HTML can have different sections like a header, a footer,
a sidebar etc.  You can put the template for these components in separate HTML
files and include them in you main HTML

e.g.
*/

//selected-user.html
<ul>
	<li>First name:{{firstname}}</li>
	<li>Last name:{{lastname}}</li>
</ul>

//all-users.html
<ul>
	<li ng-repeat="name in names">
	 {{name}}
	</li>
</ul>

//modifying template for /view2
<p>
<div ng-include=" '/partials/fragments/selected-user.html' "></div>
<div ng-include=" '/partials/fragments/all-users.html' "/></div>

//or you may use ng-include as a standalone element 
...
<ng-include src=" '/partials...'"
...


/*
UI Routers

When you're starting with AngularJS routing, it's a good idea to begin 
with ngRoute.  That said, it has one serious limitation in that you can't 
have nested views in your app-just the one ng-view.  But when your app
grows in complexity, you may wish to have views within views.  

e.g. You app's admin panel will be loaded inside an ng-view. 
Furthermore, this admin panel could have several sub views, which
should ideally be loaded inside the admin panel's own ng-view.
But we know this isn't possble with AngularJS default routing system

The solution to this problem is to use the Angular UI Router - a 

**You need to download UI Router Script pg94 
*/







/*
Scope and Events:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

scope is just a javascript object that a container for key/value pairs.

AngularJS automatically creates and injects one for us.

$rootScope - this is created as a result of attaching the ng-app directive
to any HTML element

ng-controller - it creates a new child scope, wihch prototypally inherits 
from the $rootScope. 
You can nest scopes by using an ng-controller directive inside another ng-controller
*/

//e.g.
<div ng-app>//creates a $rootScope
	<div ng-controller="OutterController">//creates a scope(scope1) that inherits form $rootScope
	<div ng-controller="InnerController">//creates a child scope(scope2) that inherits from scope1
</div></div></div>


/*
$rootScope is the parent of all scopes(except isolated scopes)
hence all the protperties attached to $rootScope are available
to scope1.  Similarly, scope2 has access to all the properties attached 
to scope1


****BEST DESCRIPTION OF PROTOTYPE AND JAVASCRIPT SCOPE 
Every javascript construcotr function has a property called
prototype which opints to an object.  When you access a property on an object(someObject.someProperty)
javascript searches for the property in that object. If it's found, its returned. If not, then
Javascript starts searching for the property in the object's prototype.  
The prototype property is nothing but another object.  Again, if the searched property is found
in the prototype it's returned. If it's not found, then the search continues upwards in the 
prototype chain until the property is found or Object.prototype is reached.
*/

//e.g.
function Car(color, steering){
	this.color = color;
	this.steering = steering;
}

Car.prototype.year = 2012;//Car is a functional object, so it has the 'prototype' property

var car = new Car('red', 'left');

console.log(car.color);//prints color from car
console.log(car.year);//prints year from Car.prototype
console.log(car.hasOwnProperty('year'));//returns false

/*
As you can see, the property color was found on the car object and thus it 
was returned.  But there is no property called year in car. So, Javascript searches for the
property in Car.prototype, which is found and returned.  So, whatever proeprty
you set to the constructor's prototype will be shared across all the instances of it.  


***
The prototype property is only present in constructor functions.  For example,
Car has prototype property while the object constructed from Car(that is to say, car)
has an internal property called __proto__ which holds its prototype.
*/
var car = new Car('red','left');//sets car.__proto__ = Car.prototype


//****** IE doesn't use __proto__ as the name of this internal property
//ECMA5script introduced a function Object.getPrototypeOf(objectNem) which can
//be treated as a standard way to retrieve the internal __proto__


/*
Writing a primitive to an object::
Our object car doesn't have a property year, but Car.prototype does.
When you try to read car.year you get the value from Car.prototype.
But you can also attach the property year to car
*/

car.year = 200; //sets property 'year' on car
console.log(car.year);//returns 'year' property from car and NOT from Car.prototype
console.log(car.hasOwnProperty('year'));//returns true as car has 'year' property

//Writing a reference type to an object
Car.prototype.data = {};//set it to empty object
car.data.engine = 'rear';//this doesn't creat a new property called 'data' on car object
console.log(car.data.engine);//returns 'rear' and it comes from Car.prototype
console.log(car.hasOwnProperty('data'));//flase, as car doesn't have own property 'data'
Car.prototype.hasOwnProperty('data');//'data' property is creaed in prototype

//Objects can extend Objects
var ferrari = Object.create(car);
console.log(Object.getPrototypeOf(ferrari)); //Car {}
/*
Object.create() creates a new object whoe internal __proto__ property points
to the object specified as the first argument to the function.  As a result the ferrari
object's __proto__ now point to car object. So, ferrari has all the properties defined
in the car instance.  

That's a quick overview of prototypal inheritance.  
Now let's see how AngularJS utilizes this in scope inheritance
*/


/*
Prototypal Inheritance in AngularJS Scopes

The $rootScope object has a function called $new() that's used to create child scopes.
Apart from controllers, directives may also create child scopes.  Some directivees simply
use the parent scope without creating a child.  And some other directives create isolated
scopes that don't inherit from any parent scope and exist on their own.  

e.g. Create an app that lists three books published by SitePoint.  
*/

//app/js/app.js
'use strict';
angular.module('myApp',['myApp.controller']);
angular.module('myApp').run(function($rootScope){
	$rootScope.title='Famous Books';
	$rootScope.name='Root Scope';
});

//app/js/controllers.js
angular.module('myApp.controllers',[]).controller('SiteController',function($scope){
	$scope.publisher = 'SitePoint';
	$scope.type = "Web Development";
	$scope.name = "Scope for SiteController";
});
angular.module('myApp.controllers').controller('BookController',function($scope){
	$scope.books = ['Jump Start HTML5', 'Jump Start CSS', 'Jump Start Responsive Web Design'];
	$scope.name = "Scope for BookController";
});


//scopes.html
...<ng-bind for title>pg53
<body ng-controller="SiteController">
	<span>{{publisher}} excels in {{type}} books </span>
	<div ng-controller="BookController">
	 <h3>Some of the popular books from {{publisher}}</h3>
	 <ul>
	 	<li ng-repeat="book in books">
	 		{{book}}
	 	</li>
	</ul>
	</div></body>
	...


/*
the callback passed to angular.module('myApp').run() gets called when all the modules are 
loaded.  Inside this we are setting a model title on $rootScope.

Batarang can give you the scope hierarchy 
*/

/*
Advanced Scpoe Concepts::

A watcher monitors model changes and takes action in response.
The $scope object has a function $watch() that's used to register a watcher.  
Let's modify 
*/

...<ng-bind for title>pg53
<body ng-controller="SiteController">
	<span>{{publisher}} excels in {{type}} books </span>
	<div ng-controller="BookController">
	 <h3>Some of the popular books from {{publisher}}</h3>
	 <ul>
	 	<li ng-repeat="book in books">
	 		{{book}}.<a href="#" ng-click="addToWishList(book)">Add to Wish List</a>
	 	</li>
	</ul>
	</div></body>
	...


//

angular.module('myApp.controllers').controller('BookController',
	function($scope){
		$scope.books = ['Jump Start HTML5', 'Jump Start CSS', 'Jump Start Responsive Design'];
		$scope.name = "Scope for BookController";
		$scope.addToWishList = function(book){
			$scope.addToWishListCount++;
		};
		$scope.wishListCount = 0;
		$scope.$watch('wishListCount',
	function(newValue,oldValue){
		console.log('called ' +newValue+' times');
		 if(newValue == 2){
		 	alert('Great! You have 2 items in you wish list. Time to buy what you love. ');
		 }
	});
	});

//put true as thrid parameter to "watch" objects and other things pg56


/*
In many cases, instead of watching a simple value yo may want to watch a collectoin of items
such as an array or an object.  For that you need to use $watchCollection(). In case you
are watching an array, your listener function will be called whenever a new item is added
to the array or an existing one is removed, updated, or reordered.  

to fully understand $watcher you also need to understand $digest() and $apply()
*/

//e.g.
<input id="input" type="text" ng-model="name" />
<div id="output">{{name}}</div>

/*technically when the "name" model changes the expression automatically updates itself.
 This is done by setting up a watcher on the "name" model.  
*/

<body ng-controller="TimeoutController">
 <button ng-click = "scheduleTask()">Get Message after 3 seconds</button>
 <br />Message fetched: {{message}}
 </body>

 //controller
 angular.module('myApp',[]).controller('TimeoutController',
 	function($scope){
 		$scope.scheduleTask = function(){
 			setTimeout(function(){
 				$scope.message = 'Fetched after 3 seconds';
 				console.log('message='+$scope.message);//log this to console
 			}, 3000);
 		}
 	});

//need $apply
 angular.module('myApp',[]).controller('TimeoutController',
 	function($scope){
 		$scope.scheduleTask = function(){
 			setTimeout(function(){
 			  $scope.$apply(function(){
 				$scope.message = 'Fetched after 3 seconds';
 				console.log('message='+$scope.message);//log this to console
 			});
 			}, 3000);
 		}
 	});

 //$timeout 
 //AngularJS supplie a built-in service called $timeout which delays
 //the execution of a function by a given interval and automatically
 //wraps you code inside $apply() so that you don't have to do it manually.  
 //e.g.
 angular.module('myApp',[]).controller('TimeoutController',
 	function($scope,$timeout){
 		$scope.fetchMessage = function(){
 			$timeout(function(){
 				$scope.message = 'Fetched after 3 seconds';//just update. no need for $apply
 				console.log('message =' + $scope.message);
 			}, 3000);
 		}
 	});


 /**********
 Broadcasting and Emitting Events:::

 One of the beautiful aspects of ANgularJS scopes is the ability to broadcast events and 
 its handling of them.  SOme of you controllers might be wiaitng for some event to occur 
 such as waiting for a particular data to be available form an AJAX request.
 So the controller that's responsible for obtaining the dat can notify other controllers
 that it's arrived and send the actual data, too.  This is done by "emitting" or "broadcasting"
 events.  By doing this controllers up in the scope hierrachy or down in the scope hierarchy can 
 handle the event and so something meaningful.  

 1. Emitting the event upwards in the scope hierarchy
 2. Broadcasting the event downward in the scope hierarchy


$scope.$emit(name,args) For Emitting Events
$scope has a function called $emit() that's used to emit an event upwards in the
scope hierarchy.  The event life cycle starts with the scope on which $emit()
was called and is dispatched upwards in the scope hierarchy to all the registered
listeners.  Also it's interesting that the $scope which emits the event receives a 
notification(via $on)when it's emitted

$scope.$broadcast(name,args) For Broadcasting Events
The $broadcast() function is the same as $emit() except the event propagates
downwards in the scope hierarchy to all the child scopes.  The parameters list 
is also same as that of $emit().  Like $emit, the $scope which broadcasts the event
also receives a notification(via $on) when it's broadcast

$scope.$on(name, handlerFunction) FOr Registering Listeners
The $on function registers event listeners that should be called when the event occurs. 
The first parameter is the name of the event you are interest in. THe second
parameters is a callback function which gets called when the event occurs. The callback
takes two params

1. event: this is an event object which has several useful properties and functions
that give more information about the event.  These are as follows:
name: The name of the event that's broadcasted or emitted
targetScope: The scope that emitted/broadcasted the event
currentScope: The scope that's handling the event
stopPropagation: This is a function, which when called, stops further
propagatoin of the event.  But keep in mind this is available only in the events
that were emitted.  After an event is emitted, if a particular scope calls this 
function the event propagation stops.  

*/

//Suppose we have an app that generates a random message every three seconds.
//The app is divided into two sections: Messages and Stats.  

//app/js/app.js
angular.module('myApp',['myApp.controllers']);

//app/js/controllers.js
angular.module('myApp.controllers',[]);

angular.module('myApp.controllers').controller('MessageController',
	function($scope, $timeout){
		$scope.messages = [{
			sender: 'user1',
			text: 'Message1'
		}];
		var timer;
		var count=0;
		$scope.loadMessage = function(){
			count++;
			$scope.messages.push({
				sender: 'user1',
				text: 'Random message' +count
			});
			timer = $timeout($scope.loadMessages, 2000);
			if(count == 3){
				$scope.$broadcast('EVENT_NO_DATA','Not Connected');
				$timeout.cancel(timer);
			}
		};
		timer = $timeout($scope.loadMessages,2000);
		$scope.$on('EVENT_RECEIVED',function(){
			console.log('Received emitted event');
		});
	});

angular.module('myApp.controllers').controller('StatsController',
	function($scope){
		$scope.name = 'World';
		$scope.status = 'Connected';
		$scope.statusColor = 'green';
		$scope.$on('EVENT_NO_DATA', function(event,data){
			console.log('received broadcasted event');
			$scope.status = data;
			$scope.statusColor = 'red';
			$scope.$emit('EVENT_RECEIVED');
		});
	});

//events html
...
<body>
	<div ng-controller="MessageController">
		<h4>Messages:</h4>
	<ul>
		<li ng-repeat="message in messages">
			{{message.text}}
		</li>
	</ul>
	<div ng-controller="StatsController">
		<h4>Stats:</h4>
	<div>{{messges.length}} Message(s)</div>
	<div>Status: <span style="color:{{statusColor}}">{{status}}</span>
	</div></div></div>
	...


/***********************************
Interacting with REST APIs:::::::::::::::::::::::::::::::::::::::::::::

But in a real-world app, you'll need to store you data in persisten storage:
Your server will normally expose a REST API, which will enable you to perfrom CRUD 
operations on oyour app. In AngularJS, we interact iwth these REST APIs using
services such as $http and $resource.  But before you do this, you need to 
be aware of a concept called "promises".  
THis chapter will first intorduce the concept of promises and then explain how to work 
with REST APIs using $http and $resource.

A promise object represent a value that may not be available yet, but will be at some
point in the future.  It enables you to write aynchronous code in a more synchronous way.  
This means your asynchronous functoin will return immediately and you can treat this return
value as a proxy to the actual value that'll be obtained in future.


If you use promises, your AJAX call should return a promise object
immediately rather than waiting for a response. 


Caller ->calls				 Async Function ->calls(resolve the promise)
       <-Gets Back a Promise    			->calls(reject the promise)