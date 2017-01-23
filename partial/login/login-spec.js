describe('LoginCtrl', function () {

  beforeEach(module('miab'));

  var scope, ctrl;

  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    ctrl = $controller('LoginCtrl', {$scope: scope});
  }));

  it('Not Tested', inject(function () {
    expect("nothing").toBe("nothing");
  }));

});
