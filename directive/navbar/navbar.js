(function () { 'use strict';}());

angular.module('miab').directive('navbar', function() {
  return {
    restrict: 'E',
    replace: false,
    scope: false,
    templateUrl: 'directive/navbar/navbar.html',
    controller: function($rootScope, $scope, $state, UserService){
      $scope.hamburgerActive = false;
      $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        $scope.hamburgerActive = false;
      });

      // Navbar Active Helper
      $scope.checkState = function(name){
        return $state.current.name.indexOf(name) !== -1;
      };

      $scope.stateChange = function(state){
        if($state.current.name.indexOf('.edit') > 0 || $state.current.name.indexOf('.new') > 0){
          $rootScope.createDialog({
            title: 'Are you sure?',
            content: 'Are you sure you want to leave this page? You will lose any unsaved changes.',
            onConfirm: function(){
              $state.go(state);
            }
          });
        }
        else{
          $state.go(state);
        }
      };

      $scope.switchMode = function(){
        UserService.switchMode();
      };
      // Sign out of the System
      $scope.signOut = function(){
        var next = function(){
          UserService.logout()
          .then(
            function(resolved){
              $state.go('login');
            },
            function(rejected){
              $rootScope.toast_error('Error: ' + rejected.errors);
              $state.go('login');
            }
          );
        };

        if($state.current.name.indexOf('.edit') > 0 || $state.current.name.indexOf('.new') > 0){
          $rootScope.createDialog({
            title: 'Are you sure?',
            content: 'Are you sure you want to leave this page? You will lose any unsaved changes.',
            onConfirm: next 
          });
        }
        else{
          next();
        }
      };
    }
  };
});
