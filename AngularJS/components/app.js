(function() { 

angular.module('app', ['components'])
       .controller('MainController', MainController);

        //locale, scope
   // BeerController.$inject = ['$scope'];

  function MainController() {

    var vm = this,
        
         name;


     vm.min = 44;

    vm.name = "Abiam";

    console.log(vm.min);

};
})();
