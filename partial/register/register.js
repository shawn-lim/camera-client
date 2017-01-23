(function () { 'use strict';}());

angular.module('miab').controller('RegisterCtrl',function($scope, $state, toastr, UserService){
  $scope.registration_form = {
    email: '',
    password: null,
    password_confirmation: null
  };

  $scope.register = function(){
    if($scope.registration_form.password !== $scope.registration_form.password_confirmation){
      toastr.error('Your passwords do not match.', 'Registration Failed');
    }
    else{
      UserService.registerUser($scope.registration_form).then(function(res){
        toastr.success('Your registration has been been accepted. Logging you in now...', 'Registration Successful');
        $state.go('main', {reload: true});
      }, function(rejected){
        var message = rejected.data.errors.full_messages.join('<br/>');
        toastr.error(message, 'Registration Failed');
        $scope.form.email.$error = { used: true };
      });
    }
  };
});
