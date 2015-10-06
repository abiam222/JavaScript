(function() {

angular.module('searchBox', [])
  .directive('mySearchBox', mySearchBox);


function mySearchBox() {
        var directive = {
          restrict: 'E',
          replace: true,
          scope: {
            searchText: '=',
            isSearching: '='
          },
          controller: SearchingController,
         //controllerAs: 'vm',
          //bindToController: true,
          replace: true,
          template:
             '<form>' +
                '<div>' +
                   '<input ng-model="localSearchText" type="text" />' +
               '</div>' +
               '<div>' +
                 '<button ng-click="clearSearch()" class="btn btn-small">Clear</button>' +
                  '<button ng-click="doSearch()"    class="btn btn-small">Search</button>' +
                 '</div> ' +
                '<div ng-show="isSearching">' +
                   '<img ng-show="isSearching" src="http://loadinggif.com/images/image-selection/3.gif" /> ' +
                     'Searching...' +
                '</div>' +
            '</form>'
        };

        return directive;
  };

  SearchingController.$inject = ['$scope'];

    function SearchingController($scope) {

          var vm = this;

            $scope.localSearchText = '';
        


            $scope.clearSearch = function() {
                $scope.searchText = "";
                $scope.localSearchText = "";
              };

            $scope.doSearch = function() {
                $scope.searchText = $scope.localSearchText;
              };

    }




})();



