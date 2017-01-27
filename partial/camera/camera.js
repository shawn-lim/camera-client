(function () { 'use strict';}());

angular.module('miab').controller('CameraCtrl',function($scope, $timeout, toastr, SocketService){
  var canvas = document.getElementById("live-view");
  var ctx = canvas.getContext("2d");
  var img = new Image();

  img.onload = function() {
    ctx.drawImage(img, 0, 0); 
    img.src = "";
  };
  img.src = "/img/bg.jpg";

  SocketService.on('liveview', function(stream){
    img.src = "data:image/jpg;base64," + stream;
  });

  $scope.startStream = function(){
    SocketService.emit('liveview:start');
  };
  $scope.stopStream = function(){
    SocketService.emit('liveview:stop', null, function(){
      $scope.clearCanvas();
    });
  };

  $scope.snap = function(){
    $scope.shot_taken = false;
    SocketService.emit('camera:shoot', {ids: [0,1,2]});
    toastr.success('Snapped successfully sent!', 'Snapped!');
    $scope.shot_taken = true;
    $timeout(function(){
      $scope.shot_taken = false;
    }, 500)
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
