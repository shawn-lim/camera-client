
/**
 * $urlRouterProvider must be defined before the routes for the redirections to work properly.
 */
angular.module('miab').config(function ($urlRouterProvider, $urlMatcherFactoryProvider, $locationProvider, $authProvider, toastrConfig) {
  $urlRouterProvider.otherwise('/');

	//    Allow trailing slashes
	$urlMatcherFactoryProvider.strictMode(false);

	// use the HTML5 History API
	$locationProvider.html5Mode(true);
  // If you use ngTokenAuth, use the code below, or implement your own. Remember to set the APILOCATION somewhere like the app.js file.
  $authProvider.configure({
    apiUrl: 'http' + (APILOCATION.ssl ? 's' : '' ) + '://'+APILOCATION.host+ (APILOCATION.port === '80' ? '' : ':'+APILOCATION.port)
  });

  angular.extend(toastrConfig, {
    allowHtml: true
  });
});

angular.module('miab').config(function($stateProvider) {
  $stateProvider.state('main', {
      url: '/',
      templateUrl: 'partial/main/main.html',
      controller: 'MainCtrl',
      controllerAs: 'main'
    });
  $stateProvider.state('tagging', {
      url: '/tagging',
      templateUrl: 'partial/tagging/tagging.html'
    });
  $stateProvider.state('ruling-out', {
      url: '/ruling-out/:task_id',
      templateUrl: 'partial/ruling-out/ruling-out.html'
    });
  $stateProvider.state('login', {
      url: '/login',
      templateUrl: 'partial/login/login.html',
      controller: 'LoginCtrl'
    });
  $stateProvider.state('register', {
      url: '/register',
      templateUrl: 'partial/register/register.html',
      controller: 'RegisterCtrl'
    });
  $stateProvider.state('camera', {
      url: '/camera',
      templateUrl: 'partial/camera/camera.html'
    });
  /* Add New States Above */
});

