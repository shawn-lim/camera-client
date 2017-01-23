(function () { 'use strict';}());

angular.module('miab').directive('dialog', function($rootScope, $document, $timeout) {
  return {
    restrict: 'E',
    replace: true,
    scope: true,
    templateUrl: 'directive/dialog/dialog.html',
    link: function() {},
    controller: function($scope, $rootScope){

      $rootScope.createDialog = function(dialogOptions){
        $rootScope.dialogActive = true;
        $scope.dialog = {
          title: dialogOptions.title,
          content: dialogOptions.content,
          use_text_area: dialogOptions.use_text_area,
          comment_rule: dialogOptions.comment_rule,
          confirm_text: dialogOptions.confirm_text || 'CONFIRM',
          confirm_class: dialogOptions.confirm_class || 'button-primary',
          hide_cancel_btn: dialogOptions.hide_cancel_btn || false,
          onConfirm: dialogOptions.onConfirm,
          onCancel: dialogOptions.onCancel
        };
      };

      $scope.destroyDialog = function(){
        $timeout(function(){
          $rootScope.dialogActive = false;
          $scope.dialog = null;
        });
      };
      $rootScope.cancelDialog = function(){
        if($scope.dialog.onCancel){
          $scope.dialog.onCancel();
        }
        $scope.destroyDialog();
      };

      $scope.confirmDialog = function(){
        if($scope.dialog.onConfirm) {
          if ($scope.dialog.comment_rule === 'optional' || $scope.dialog.comment_rule === 'required') {
            $scope.dialog.onConfirm($scope.dialog.comments);
            $scope.destroyDialog();
          }
          else {
            $scope.dialog.onConfirm();
            $scope.destroyDialog();
          }
        }
        $scope.destroyDialog();
      };
    }
  };
});
