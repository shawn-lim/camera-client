(function () { 'use strict';}());

angular.module('miab').service('UserService',function($rootScope, $http, $timeout, APIService, $auth, $state, $q) {
  $rootScope.System = {};
  var menuMap = { 
    user: [
      //{
        //root: 'services.usage',
        //state: 'services.usage',
        //name: 'Usage'
      //},
    ],
  };

  var CurrentUser = null;

  var Private = {
    setUser: function(user){
      //Initialize User Objects
      CurrentUser = {};
      CurrentUser.menu = menuMap['user'];
      // Initialize User Method : isAuthorized
      user.isAuthorized = function(userType){
        // TODO : Authorization Strategy
        return true;
      };

      $rootScope.menu = CurrentUser.menu;
      // Set the user profile for Service and Rootscope
      CurrentUser.profile = user;
      $rootScope.current_user = user;
    },
    removeUser: function(){
      $rootScope.current_user = null;
      $rootScope.menu = [];
      CurrentUser = null;
      $rootScope.System = {version: $rootScope.System.version}; // Clear everything except version
      if(typeof(Storage) !== "undefined") {
        sessionStorage.clear();
      }
    },

  };

  var getPromise = APIService.getPromise;
  // Use this service to log in via API and store user credential information.
  this.UserService = {
    registerUser: function(user){
      var deferred = $q.defer();
      if(CurrentUser){
        deferred.resolve(CurrentUser);
      }
      else{
        $auth.submitRegistration(user)
        .then(function(res){
          Private.setUser(res);
          deferred.resolve(CurrentUser);
        }, function(rejected){
          deferred.reject(rejected);
        });
      }
      return deferred.promise;
    },
    getUser: function(){
      var deferred = $q.defer();
      if(CurrentUser){
        deferred.resolve(CurrentUser);
      }
      else{
        $auth.validateUser()
        .then(function(res){
          Private.setUser(res);
          deferred.resolve(CurrentUser);
        }, function(rejected){
          deferred.reject(rejected);
        });
      }
      return deferred.promise;
    },
    isAuthenticated: function(){
      var deferred = $q.defer();
      try{
        $auth.validateUser()
        .then(function(response){
          Private.setUser(response);
          deferred.resolve(CurrentUser);
        })
        .catch(function(err){
          //console.log(err);
          if(err.reason === 'unauthorized'){
            deferred.reject(false);
          }
        });
      }
      catch(error){
        deferred.reject(error);
      }
      return deferred.promise;
    },
    login: function(email, password){
      var deferred = $q.defer();
      $auth.submitLogin({email: email, password: password})
      .then(function(res) {
        Private.setUser(res);
        deferred.resolve(true);
      })
      .catch(function(resp) {
        if(resp.errors[0] === 'Invalid credentials'){
          deferred.reject('Sorry, the credentials you entered do not match anything in our system.');
        }
        else {
          deferred.reject(resp);
        }
        // handle error response
      });
      return deferred.promise;
    },
    logout: function(){
      var deferred = $q.defer();
      $auth.signOut()
      .then(function(resp) {
        Private.removeUser();
        deferred.resolve(resp);
      })
      .catch(function(resp) {
        Private.removeUser();
        deferred.resolve(resp);
      });
      return deferred.promise;
    }
  };

  var us = this.UserService;

  //$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
    //// Check to see if logged in first
    //us.isAuthenticated()
    //.then(
      //function(user) {
        //if(user){
          //// If logged in, check permissions
          //user = user.profile;
          //// Default permissions if toState authorization settings not complete
          //if(!toState.data){ toState.data = {auth: ""}; }
          //if (toState.name === 'register' || toState.name === 'login' || !$rootScope.current_user.isAuthorized(toState.data.auth)) {
            //event.preventDefault();
            //// Direct the user to the right dashboard
            //$state.go('main', {}, {reload: true});
            ////$rootScope.toast_error('You are not authorized to access this page');
          //}
          //if($rootScope.dialogActive){
            //$rootScope.cancelDialog();
          //}
        //}
        //// if we're already going login, dont redirect.
      //},
      //function(rejected){
        //if(toState.name !== 'register' && toState.name !== 'login'){
          //event.preventDefault();
          //toParams = JSON.stringify(toParams);
          //Private.removeUser();
          //$state.go('login', {redirect: toState.name, params: toParams});
        //}
      //}
    //);
  //});

  return this.UserService;
});
