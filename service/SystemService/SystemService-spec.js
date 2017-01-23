describe('SystemService', function() {
  var mockService, $httpBackend;

  beforeEach(module('miab'));

  // This mocks out the ui-router to a noop so it doesn't effect this testing.
  // Must be included AFTER 'webapp' to overwrite those dependencies
  var mod = angular.module('uiRouterNoop', []);
  mod.service('$state', function () { return {}; });
  mod.service('$urlRouter', function () { return {}; });
  beforeEach(module('uiRouterNoop'));

  /**
   * Mock out modules as needed
   */
  beforeEach(module('miab', function ($provide) {
    mockService = {};

    $provide.value('serviceToMock', mockService);
  }));

  /**
   * Get references to needed services
   */
  beforeEach(inject(function ($rootScope, $injector) {
    // Set up the mock http service responses
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.expectGET('/client_version').respond('0.0.0');
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('Client Version assigned correctly', inject(function($rootScope, SystemService) {
    $httpBackend.flush();
    expect($rootScope.System.version).toBe('0.0.0');
  }));

});
