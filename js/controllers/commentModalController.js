define(['angular', 'controllers'], function (angular, controllers) {
    'use strict';

    return controllers
        .controller('CommentModalController', function CommentModalController(
            $scope, User, LoadingToggler, comment, $modalInstance, callBack
        ) {
            $scope.commentVars = {}
            $scope.commentVars.comment = comment.comment
            $scope.comment = comment
            $scope.Date = Date;

            $scope.save = function () {
                $scope.comment.comment = $scope.commentVars.comment
                LoadingToggler.on();
                $scope.comment.$save({
                    commentId: $scope.comment.id,
                    object: $scope.comment.object,
                    objectId: $scope.comment.objectId
                }, function (comment) {
                    LoadingToggler.off();
                    $modalInstance.close();
                    callBack();
                });
            }

            $scope.cancel = function () {
                $modalInstance.close();
            }

            $scope.delete = function () {
                comment.$delete({
                    commentId: comment.id,
                    objectId: comment.objectId,
                    object: comment.object
                }, function () {
                    $modalInstance.close();
                    callBack();
                });
            }
        })
    ;
});