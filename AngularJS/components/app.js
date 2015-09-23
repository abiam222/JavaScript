(function() { 

angular.module('app', ['searchBox', 'searchResults'])
	.controller('CitySearchController', CitySearchController);

	CitySearchController.$inject = ['$scope', '$timeout'];

	function CitySearchController($scope, $timeout) {

				$scope.$watch('citySearchText', function(citySearchText) {
					citySearchResults = [];

					if(citySearchText) {
						$scope.isSearchingForCities = true;
						$timeout(function() {
							$scope.isSearchingForCities = false;
							$scope.citySearchResults = [
									'New York',
									'London',
									'Paris',
									'Moab'
							];
						}, 1000);
					} else {
						$scope.isSearchingForCities = false;
					}
				});
	};

})();
