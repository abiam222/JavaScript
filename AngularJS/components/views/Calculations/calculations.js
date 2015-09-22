(function() {

angular.module('calculations', [])
      .directive('tabs1', tabs1);


  function tabs1() {
      var directive = {
          templateUrl:'views/Calculations/calculations.html',
           /* template: 
            '<div>' +
             '<label>Im inside my link function</label>' +
            '</div>', */
          restrict: 'E',
          scope: {
            max: '='
          },
          link: linkFunc,
          controller: BeerController,
          controllerAs: 'vm',
          bindToController: true  //because the scope is isolated
      };

      return directive;

      function linkFunc( scope, el, attr, ctrl ) { 
            //console.log("HERE");
      }

  }


  BeerController.$inject = ['$scope'];

  function BeerController($scope) {
      //injecting scope just for comparison
      var vm = this, //NO vm in variables, technically all have vm
      //here but vm in .html though
      
      //I don't have to call var in tax cause I called it in the view



      result = function() {
        console.log("in the result function");
        var total;
          vm.total = vm.tax1 * vm.tax2;
          console.log(vm.total);
      }

      
  };
})();



