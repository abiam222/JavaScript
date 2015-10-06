(function() { 

angular.module('app', ['searchBox', 'searchResults'])
	.controller('CitySearchController', CitySearchController);

	CitySearchController.$inject = ['$scope', '$timeout'];

	function CitySearchController($scope, $timeout) {

				$scope.$watch('citySearchText', function(citySearchText) {
					citySearchResults = ['New York', 'London', 'Paris'];
					found = false;

					if(citySearchText) {
						$scope.isSearchingForCities = true;
						$timeout(function() {
							$scope.isSearchingForCities = false;
							
							angular.forEach(citySearchResults, function(value, key) {
								if(citySearchText == value){
								   console.log(value +' is Found');
									found = true;
								} 
							});
								if(!found){
									console.log("I couldn't find your request");
								};
								
								
						}, 1000).then(function() {
 								$scope.citySearchText = "";
 							});
					} else {
						$scope.isSearchingForCities = false;
					}
						

				});
	};

})();
