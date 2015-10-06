
//angular.module('myApp.controllers', []).
function FinanceController($scope){
	$scope.salary = 0;
	$scope.percentage = 0;
	$scope.result = function(){
		return $scope.salary * $scope.percentage * 0.01;
	};
};


/*angular.module('myApp.controllers', []).
controller.('FinanceController',function($scope){
	$scope.salary = 0;
	$scope.percentage = 0;
	$scope.result = function(){
		return $scope.salary * $scope.percentage * 0.01;
	};
});
*/

/*
angular.module('myApp',[]).controller('GreetingController', function($scope){
	$scope.now = new Date();
	$scope.helloMessages = ['Hello','Bonjour','Hola','Ciao','Hallo'];
	$scope.greeting = $scope.helloMessages[0];
	$scope.getRandomHelloMessage = function(){
		$scope.greeting = $scope.helloMessages[parseInt((Math.random()*
			$scope.helloMessages.length))];
	}
});
*/

