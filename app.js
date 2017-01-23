(function () { 'use strict';}());

APILOCATION={host: '10.0.10.208', port: '8090', ssl: false};

angular.module('miab',  
  [ 
    'angular.filter',  
    'ngResource',
    'ngAnimate', 
    'ui.router', 
    'ngOrderObjectBy', 
    'duScroll',  
    'ng-token-auth',  
    'textAngular',  
    '720kb.tooltips', 
    'ui.utils', 
    'ngAnimate',  
    'ngTable',  
    'toastr',  
    'ngActionCable',
    'ngLodash',
    'ngMessages'
]);

angular.module('miab').run(function($rootScope, $http, $state, SystemService, UserService) {
  $rootScope.safeApply = function(fn) {
    var phase = $rootScope.$$phase;
    if (phase === '$apply' || phase === '$digest') {
      if (fn && (typeof(fn) === 'function')) {
        fn();
      }
    } else {
      this.$apply(fn);
    }
  };
});

