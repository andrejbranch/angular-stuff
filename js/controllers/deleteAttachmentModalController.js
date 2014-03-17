define(['angular', 'controllers'], function (angular, controllers) {
    'use strict';

    return controllers
        .controller('DeleteAttachmentModalController', function DeleteAttachmentModalController(
            $scope, User, LoadingToggler, objectAttachment, $modalInstance, callBack
        ) {
            $scope.objectAttachment = objectAttachment
            $scope.Date = Date

            $scope.cancel = function () {
                $modalInstance.close()
            }

            $scope.deleteObjectAttachment = function () {
                LoadingToggler.on();
                $scope.objectAttachment.$delete({
                    id: $scope.objectAttachment.attachmentId,
                    objectId: $scope.objectAttachment.objectId,
                    object: $scope.objectAttachment.object
                }, function (objectAttachment) {
                    $modalInstance.close()
                    callBack(objectAttachment)
                    LoadingToggler.off();
                });
            }
        })
    ;
});