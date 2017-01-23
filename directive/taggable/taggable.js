(function () { 'use strict';}());

angular.module('miab').directive('taggable', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      taggable_image: "=taggableImage"
    },
    templateUrl: 'directive/taggable/taggable.html',
    controller: function($scope){

      $scope.getBoxStyle = function(box){
        return {
          top: box.y,
          left: box.x,
          width: box.xh,
          height: box.yh
        };
      };

      /* Current box being resized */
      var resize_box_index = -1;
      var move_box_index = -1;
      var paused_box = -1;

      /* Click handler to remove a bounding box */
      $scope.removeBox = function(ind){
        $scope.taggable_image.bounding_boxes.splice(ind,1);
      };

      /* Click handler to activate resizing a bounding box */
      $scope.activateResize = function(ind){
        resize_box_index = ind;
      };

      /* Click handler to activate moving a bounding box */
      $scope.activateMove = function(ind){
        move_box_index = ind;
      };

      /* Click handler to activate a delete action on a bounding box */
      $scope.activatePause = function(){
        paused_box = 1;
      };

      $scope.mouseDownInsideImage = function(evt){
        var mousedown = evt.buttons === 1;
        var m_x = evt.clientX - evt.currentTarget.offsetLeft;
        var m_y = evt.clientY - evt.currentTarget.offsetTop;
        if(resize_box_index < 0){

        }
      };

      $scope.mouseUpInsideImage = function(evt){
        resize_box_index = -1;
        move_box_index = -1;
        paused_box = -1;
        // Check to see if a bounding box was accidentally created or not. 
        var accident_threshold = 20; // Threshold set to 20 pixels
        var last_box = $scope.taggable_image.bounding_boxes[$scope.taggable_image.bounding_boxes.length-1];
        if(last_box.xh < accident_threshold && last_box.yh < accident_threshold){
          $scope.taggable_image.bounding_boxes.splice($scope.taggable_image.bounding_boxes.length-1, 1);
        }
      };

      $scope.moveInsideImage = function(evt){
        var mousedown = evt.buttons === 1;
        var image_bounds = {
          height: evt.currentTarget.clientHeight,
          width: evt.currentTarget.clientWidth,
        };

        if(mousedown){
          var m_x = evt.clientX - evt.currentTarget.offsetLeft;
          var m_y = evt.clientY - evt.currentTarget.offsetTop;
          console.log(evt);
          // We are resizing! 
          if(resize_box_index > -1){
            if(m_x > image_bounds.width) { m_x = image_bounds.width; }
            if(m_y > image_bounds.height) { m_y = image_bounds.height; }
            $scope.taggable_image.bounding_boxes[resize_box_index].xh = m_x - $scope.taggable_image.bounding_boxes[resize_box_index].x;
            $scope.taggable_image.bounding_boxes[resize_box_index].yh = m_y - $scope.taggable_image.bounding_boxes[resize_box_index].y;
          }
          // We are moving! 
          else if (move_box_index > -1){
            var box_width = $scope.taggable_image.bounding_boxes[move_box_index].xh;
            var box_height = $scope.taggable_image.bounding_boxes[move_box_index].yh;
            var new_x = m_x - box_width/2;
            var new_y = m_y - box_height/2;
            // Check bounding box bounds
            if(new_x < 0){ new_x = 0; }
            else if(new_x > image_bounds.width - box_width){
              new_x = image_bounds.width - box_width;
            }
            if(new_y < 0){ new_y = 0; }
            else if(new_y > image_bounds.height - box_height){
              new_y = image_bounds.height - box_height;
            }
            $scope.taggable_image.bounding_boxes[move_box_index].x = new_x;
            $scope.taggable_image.bounding_boxes[move_box_index].y = new_y;
          }
          // new box!
          else if (paused_box < 0){
            var new_box = {
              x: m_x,
              y: m_y,
              xh: 0,
              yh: 0,
              image_size:{
                x: evt.currentTarget.clientWidth,
                y: evt.currentTarget.clientHeight
              }
            };
            $scope.taggable_image.bounding_boxes.push(new_box);
            resize_box_index = $scope.taggable_image.bounding_boxes.length-1;
          }
        }
      };
    }
  };
});
