describe('taggableTest', function() {

  beforeEach(module('miab'));

  var el, scope, compile, controller;

  beforeEach(inject(function($rootScope,$compile) {
    scope = $rootScope.$new();
    compile = $compile;
    el = angular.element("<taggable></taggable>");
    compile(el)($rootScope.$new());
    $rootScope.$digest();

    controller = el.controller('taggable');
    scope = el.isolateScope() || el.scope();
  }));

  //describe('$scope.getBoxStyle', function(){
    //it('Given a box object, should return CSS styles that will draw a box on the image.', function(){
      //var box = {
        //x: 101,
        //y: 102,
        //xh: 11,
        //yh: 12
      //};
      //var styles = {
        //left: 101,
        //top: 102,
        //width: 11,
        //height: 12
      //};

      ////expect(angular.equals(scope.getBoxStyle(box), styles)).toBe(true);
    //});
  //});
});
