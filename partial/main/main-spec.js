describe('MainCtrl', function () {

  beforeEach(module('miab'));

  var scope, ctrl, mockService;

  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();

    ctrl = $controller('MainCtrl', {$scope: scope});
  }));

  it('should ...', inject(function () {
    expect("asd").toBe("asd");
  }));

});
