(function() {

angular.module('searchResults', [])
  .directive('mySearchResults', mySearchResults);


function mySearchResults() {
        var directive = {
          restrict: 'E',
          replace: true,
          scope: {
            searchText: '=',
            isSearching: '=',
            searchResults: '='
          },
          template:
           '<div ng-hide="isSearching">' +
            '<h4 ng-show="searchResults">Found {{searchResults.length}} Search Results For "{{searchText}}":</h4>' +
             '<ul ng-show="searchResults">' +
               '<li ng-repeat="searchResult in searchResults">' +
                 '{{searchResult}}' +
               '</li>' +
             '</ul>' +
           '</div>'
        };

        return directive;
  };

})();



