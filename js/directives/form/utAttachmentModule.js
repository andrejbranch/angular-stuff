define(['angular', 'directives'], function (angular, directives) {
    'use strict';

    return directives
        .directive('utAttachmentModule', function (ObjectAttachment, LoadingToggler, $modal) {
            return {
                restrict: 'E',
                scope: {o:'@', oid:'='},
                templateUrl: '/app/partials/form/utAttachmentModule.html',
                link: function ($scope, element) {
                    var init, splitAttachments, objectAttachments, callBack, modalInstance, spliceAttachment;

                    init = function () {
                        $scope.attachmentImages = [];
                        $scope.attachmentFiles = [];

                        LoadingToggler.on();
                        objectAttachments = ObjectAttachment.query(
                            {object: $scope.o, objectId: $scope.oid }, function () {
                            LoadingToggler.off();
                            splitAttachments();
                        });
                    }

                    splitAttachments = function () {
                        angular.forEach(objectAttachments, function (objectAttachment, key) {
                            objectAttachment.Attachment.isImage
                                ? $scope.attachmentImages.push(objectAttachment)
                                : $scope.attachmentFiles.push(objectAttachment)
                            ;
                        });
                    }

                    spliceAttachment = function (attachment) {
                        if (attachment.Attachment.isImage) {
                            $scope.attachmentImages.splice($scope.attachmentImages.indexOf(attachment), 1)
                        }

                        if (!attachment.Attachment.isImage) {
                            $scope.attachmentFiles.splice($scope.attachmentFiles.indexOf(attachment), 1)
                        }
                    }

                    $scope.deleteAttachment = function (attachment, type) {
                        modalInstance = $modal.open({
                            templateUrl: '/app/partials/form/attachmentDelete.html',
                            controller: 'DeleteAttachmentModalController',
                            resolve: {
                                objectAttachment: function () {
                                    return attachment
                                },
                                callBack: function () {
                                    return spliceAttachment
                                }
                            }
                        });
                    }

                    $scope.$watch('oid', function (v) {
                        if (!v) return; init();
                    })

                    $scope.Date = Date;
                }
            }
        })
    ;
});