(function () { 'use strict';}());

angular.module('miab').controller('CameraCtrl',function($scope, SocketService){
  var canvas = document.getElementById("placeholder_canvas");
  var ctx = canvas.getContext("2d");
  var img = new Image();

  img.onload = function() {
    ctx.drawImage(img, 0, 0); 
    img.src = "";
  };

  SocketService.on('liveview', function(stream){
    img.src = "data:image/jpg;base64," + stream;
  });

  $scope.startStream = function(){
    SocketService.emit('liveview:start');
  };
  $scope.stopStream = function(){
    SocketService.emit('liveview:stop');
    $scope.clearCanvas();
  };

  $scope.snap = function(){
    SocketService.emit('camera:shoot');
  };

  $scope.camera_info = {
    aperture: 'n/a',
    shutter: 'n/a',
    iso: 'n/a',
  };
  $scope.getInfo = function(){
    //TODO
  };

  $scope.clearCanvas = function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  $scope.startStream();
  $scope.$on('destroy', function(){
    $scope.stopStream();
  });
});
