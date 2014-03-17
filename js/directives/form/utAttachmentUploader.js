define(['angular', 'directives'], function (angular, directives) {
    'use strict';

    return directives
        .directive('utAttachmentUploader', function (AttachmentManager) {
            return {
                restrict: 'E',
                scope: {o:'@', oid:'='},
                templateUrl: '/app/partials/form/utAttachmentUploader.html',
                link: function ($scope, element) {
                    $scope.setFiles = function (el) {

                        AttachmentManager.setObject($scope.o)
                        AttachmentManager.setObjectId($scope.oid)

                        $scope.files = AttachmentManager.initializeFiles(el.files, function () {
                            $scope.$apply();
                        });
                    }

                    $scope.isImage = function (file) {
                        switch (file.type) {
                            case "image/jpeg":
                                return true;
                            case "image/png":
                                return true;
                            default:
                                return false;
                        }
                    }
                }
            }
        })
    ;
});