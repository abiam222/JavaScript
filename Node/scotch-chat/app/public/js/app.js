'use strict';

angular.module('scotch-chat', [])
  .factory('GUI', function() {
    return require('nw.gui');
  })
  .factory('Window', ['GUI', function(gui) {
    return gui.Window.get();
  }])
  .controller('Toolbar', ['$scope', 'Window',
    function($scope, Window) {
      /*
      
      Custom Control for Window operations

      $scope.minimize = function() {
        Window.minimize();
      };

      $scope.toggleFullscreen = function() {
        Window.toggleKioskMode();
      };

      $scope.close = function() {
        Window.close();
      };*/
    }
  ]);
