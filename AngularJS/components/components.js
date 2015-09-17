angular.module('components', [])
      .directive('tabs', tabs);


  function tabs() {
      var directive = {
          link: link,
          templateUrl:'tabs.html',
          restrict: 'E',
          scope: {
            max: '='
          },
          controller: BeerController,
          controllerAs: 'vm',
          bindToController: true  //because the scope is isolated
      };

      return directive;

      function link( scope, element, attrs ) {
        '<div>' +
          '<label>Im inside my link function</label>' +
            '</div>'
      }

  }


  BeerController.$inject = ['$scope'];

  function BeerController($scope) {
     
      var vm = this,
           max;

      beers = [1,2,3,4,5,6];

      vm.max = 3;


      for( var i = 0; i < beers.length; i++) {
            console.log(beers[i]);
            //document.write(beers[i]);
      }
  }



/*angular.module('components', [])
 
  .directive('tabs', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      controller: function($scope, $element) {
        var panes = $scope.panes = [];
 
        $scope.select = function(pane) {
          angular.forEach(panes, function(pane) {
            pane.selected = false;
          });
          pane.selected = true;
        }
 
        this.addPane = function(pane) {
          if (panes.length == 0) $scope.select(pane);
          panes.push(pane);
        }
      },
      template:
        '<div class="tabbable">' +
          '<ul class="nav nav-tabs">' +
            '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">'+
              '<a href="" ng-click="select(pane)">{{pane.title}}</a>' +
            '</li>' +
          '</ul>' +
          '<div class="tab-content" ng-transclude></div>' +
        '</div>',
      replace: true
    };
  })
 
  .directive('pane', function() {
    return {
      require: '^tabs',
      restrict: 'E',
      transclude: true,
      scope: { title: '@' },
      link: function(scope, element, attrs, tabsController) {
        tabsController.addPane(scope);
      },
      template:
        '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
        '</div>',
      replace: true
    };
  })
  */

