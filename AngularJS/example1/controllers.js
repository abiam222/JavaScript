

function HelloController($scope){
		$scope.greeting = { text: 'Hello'};
	}


function CartController($scope){
	$scope.bill = {};


	$scope.items = [
				{title: 'Paint pots', quantity: 8, price: 3.95},
				{title: 'Polka dots', quantity: 17, price: 12.95},
				{title: 'Pebbles', quantity: 5, price: 6.95}
			];

	$scope.totalCart = function(){
		var total = 0;
		for(var i=0, len=$scope.items.length; i<len;i++){
			total = total + $scope.items[i].price * $scope.items[i].quantity;
		}
		return total;
	}

	$scope.subtotal = function(){
		return $scope.totalCart() - $scope.bill.discount;
	};

	function calculateDiscount(newValue, oldValue, scope){
		$scope.bill.discount = newValue > 100 ? 10 : 0;
	}

	$scope.$watch($scope.totalCart, calculateDiscount, true);

//	$scope.remove = function(index){
	//			$scope.items.splice(index, 1);
	//		}
		}





function StartUpController($scope){
	$scope.computeNeeded = function() {
		$scope.needed  =  $scope.startingEstimate * 10;
	};

	$scope.requestFunding = function(){
		window.alert("Sorry, please get more customers first.");
	};
}



var students = [ {name:'Mary Contrary', id: '1'},
				 {name: 'Jack Sprat', id:'2'},
				 {name:'Jill Hill', id:'3'}];

	function StudentListController($scope){
		$scope.students = students;

		$scope.insertTom = function(){
			$scope.students.splice(1,0,{name:'Tom Thumb', id:'4'});
		};
	}



	function DeathrayMenuController($scope){
		//$scope.menuState = {show: false};
		/*$scope.stun = {show:false};
		$scope.disingtegrate = {show:false};
	    $scope.erase= {show:false};
		//$scope.menuState.show = false;

		$scope.toggleMenu = function(){
			$scope.menuState.show = !$scope.menuState.show;
		};

		$scope.stun = function(){
			$scope.stun.show = !$scope.stun.show;
		}
		//death ray funtions left as exercies to readere
		$scope.disingtegrate = function(){
			$scope.disingtegrate.show = !$scope.disingtegrate.show;
		}

		$scope.erase = function(){
			$scope.erase.show = !$scope.erase.show;
		}*/
	}




//Starts here
/*
//Create a module for our core AMail services
var aMailServices = angular.module('AMail', []);

//Set up our mappings between URLs, templates, and controllers
function emailRouteConfig($routeProvider){
	$routeProvider.when('/', {
		controller: ListController, 
		templateUrl: 'list.html'
	}).
	//notice that for the detail view, we specify a parametrized URL component
	//by placing a colon in front of the id
	when('/view/:id', {
		controller: DetailController,
		templateUrl: 'detail.html'
	}).
	otherwise({
		redirectTo: '/'
	});
}


//set up our route so the AMail service can ifnd it
aMailServices.config(emailRouteConfig);

//some fake emails
messages = [{
	id: 0, sender: 'jean@somecompany.com', subject: 'Hit there, old friend',
	date: 'Dec 7, 2013 12:32:00', recipients:['greg@somecompnay.com'],
	message: 'Hey, we should get together for lunch sometime and catch up.' + 'there
	are many things we should collaborate on this year.'
}, {
	id: 1, sender: 'maria@somecompany.com',
	subject: 'Where did you leave my laptop?'.
	date: 'Dec 7, 2013 8:15:12', recipients:['greg@somecompany.com'],
	message: 'I thought you were going to put it in my desk drawer.' +
	'But it does not seem t o be there.'
}, {
	id:2, sender: 'bill@somecompany.com', subject: 'Lost python',
	date: 'Dec 6, 2013 20:35:02', recipients:['greg@somecompany.com'],
	message: 'Nobody panic, but my pet python is missing from her cage.'
	+ 'She does not move too fast, so just call  me if you see her.'
}. ];

//publish our messages for the list template
function ListController($scope){
	$scope.messages = messages;
}

//get the mesage id from the route(parsed from the URL) and use it to 
//find the right message object
function DetailController ($scope, $routeParams) {
	$scope.mesage = messages[$routeParams.id];
}
*/

function SomeController($scope){
	$scope.message = {text: 'nothing clicked yet'};

	$scope.clickUnfocused = function(){
		$scope.message.text = 'unfocused button clicked';
	};

	$scope.clickFocused = function() {
		$scope.message.text = 'focus button clicked';
	}
}

var appModule = angular.module('app',['directives']);





function AddUserController($scope){
	$scope.message = '';

	$scope.addUser = function() {
		//TODO for the reader: actually save user to database...
		$scope.message = 'Thanks,' + $scope.user.first + ', we added you!';
	};
}








