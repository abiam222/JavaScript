'use strict';

/* Controllers */

    
angular.module('myApp.controllers', []).controller('MainController', function($scope){
  $scope.message = 'I love AngularJS';

  $scope.showMessage = function(){
  	console.log('Message Changed');
  }

});


