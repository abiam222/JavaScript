(function() {

angular.module('calculations', [])
      .directive('tabs', tabs);


  function tabs() {
      var directive = {
          //templateUrl:'views/servicesDemo/service.html',
            template: 
            '<div>' +
             '<label>Im inside my link function</label>' +
            '</div>', 
          restrict: 'E',
          scope: {
            max: '='
          },
          transclude: true,
          link: linkFunc,
          controller: BeerController,
          controllerAs: 'vm',
          bindToController: true  //because the scope is isolated
      };

      return directive;

      function linkFunc( scope, el, attr, ctrl ) { 
            console.log("HERE");
      }

  }


  BeerController.$inject = ['$scope'];

  function BeerController($scope) {
      //injecting scope just for comparison
      var vm = this; //NO vm in variables, technically all have vm
      //here but vm in .html though
      
     

      
  };
})();



