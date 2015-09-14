'use strict';

/* Directives */


angular.module('myApp.directives', []).directive('helloWorld', function(){
	return{
		restrict: 'AEC',
		//scope: {}, //isolated scope
		replace: true,
		'<p ng-click="clearMessage()">template: Hello, World!{{message}} </p>',
		link: function(scope,elem,attrs){
			scope.$watch('message',function(value){ //what does value give you
				console.log('Message Changed!');
			});
			scope.clearMessage = function(){//write here deff
				scope.message = '';
			}
			elem.bind('mouseover',function(){//what is bind?
				elem.css('cursor','pointer');
			});
		}
	}
});


/*
angular.module('myApp.directives', []).directive('helloWorld', function(){
	return{
		restrict: 'AEC',
		scope: {
			 message: '@messageAttr'
		}, //message property should be bound to the attribute messageAttr
		//now we can change the HTML as the following +=
		replace: true,
		template: '<p ng-click="clearMessage()">Hello, World!{{message}} </p>',
		link: function(scope,elem,attrs){
			scope.$watch('message',function(value){ //what does value give you
				console.log('Message Changed!');
			});
			scope.clearMessage = function(){//write here deff
				scope.message = '';
			}
			elem.bind('mouseover',function(){//what is bind?
				elem.css('cursor','pointer');
			});
		}
	}
});
*/
/*
angular.module('myApp.directives', []).directive('helloWorld', function(){
	return{
		restrict: 'AEC',
		scope: {
			 message: '=messageAttr',
			 showMessage: '&showMessageAttr'//Bind with parent scope function
		}, //message property should be bound to the attribute messageAttr
		//now we can change the HTML as the following +=
		replace: true,
		template: '<p ng-click="clearMessage()">Hello, World!{{message}} </p>',
		link: function(scope,elem,attrs){
			scope.$watch('message',function(value){ //what does value give you
				//console.log('Message Changed!');
				scope.showMessage();
			});
			scope.clearMessage = function(){//write here deff
				scope.message = '';
			}
			elem.bind('mouseover',function(){//what is bind?
				elem.css('cursor','pointer');
			});
		}
	}
});
*/


//+=  ... <hello-world message-attr="{{message}}"></hello-world>...

//the = technique lets you assign an actual scope model to the attribute 
//rather than just plain strings.  
//As a result you can pass values ranging from simple strings and 
//arrays to complex object ot the isolated scope.