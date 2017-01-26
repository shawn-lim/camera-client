describe('CameraCtrl', function () {

  beforeEach(module('miab'));

  var scope, ctrl, mockService;

  beforeEach(inject(function ($rootScope, $controller, RealService) {
    scope = $rootScope.$new();

    mockService = RealService;
    ctrl = $controller('CameraCtrl', {$scope: scope, RealService: mockService});
  }));

  it('should ...', inject(function () {

    expect("This controller").toBe("fully tested");

  }));

});
