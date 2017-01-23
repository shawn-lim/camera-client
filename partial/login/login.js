(function () { 'use strict';}());

angular.module('miab').controller('LoginCtrl',
  function($rootScope, $scope, $state, $timeout, toastr, UserService){
    $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options) {
      $rootScope.state_loading = false;
    });
    $scope.login = function(){
      $rootScope.state_loading = true;
      UserService.login($scope.email, $scope.password)
      .then(
        function(resolved){
          if($state.params.redirect){
            var params = JSON.parse($state.params.params);
            $state.go($state.params.redirect, params, {reload: true});
          }
          else{
            $state.go('main', {}, { reload: true });
          }
        },
        function(rejected) {
          $rootScope.state_loading = false;
          toastr.error(rejected, 'Login Failed');
        }
      );
    };
  });
