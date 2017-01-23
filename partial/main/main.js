(function () { 'use strict';}());

angular.module('miab').controller('MainCtrl',function($scope, $rootScope, $state, $timeout, $interval, toastr, SocketService){
  var c = 0;

  $scope.images = [];
  var canvas = document.getElementById("placeholder_canvas");
  var ctx = canvas.getContext("2d");
  var img = new Image();
  img.onload = function() {
    ctx.drawImage(img, 0, 0); 
    //after drawing set src empty
    img.src = "";
  }   
  SocketService.on('stream', function(stream){
    img.src = "data:image/jpg;base64," + stream;

  });

  $scope.startStream = function(){
    SocketService.emit('stream:start', null, function(res){
      console.log('stream start responded');
    });
  };
  $scope.stopStream = function(){
    SocketService.emit('stream:stop', null, function(res){
      console.log('stream start responded');
    });
    ctx.clearRect();
  };

  $scope.camera_info = {
    aperture: 'n/a',
    shutter: 'n/a',
    iso: 'n/a',
  };
  $scope.getInfo = function(){

  };
});
