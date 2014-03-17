define(['angular', 'controllers', 'utTinyMCE'], function (angular, controllers) {
    'use strict';

    return controllers
        .controller('ProtocolModalController',
            function ProtocolModalController ($scope, $modalInstance, protocolId,
                callBack, Protocol, $http, $rootScope, LoadingToggler,
                AttachmentManager
            ) {
                LoadingToggler.on();

                // are we editing or creating
                if (protocolId) {
                    $scope.protocol = Protocol.get({protocolId:protocolId}, function (protocol) {
                        LoadingToggler.off();
                    });
                } else {
                    $scope.protocol = new Protocol();
                    LoadingToggler.off();
                }

                $scope.cancel = function () {
                    $modalInstance.close();
                }

                $scope.save = function () {
                    LoadingToggler.on();
                    $scope.protocol.$save({protocolId:$scope.protocol.id}, function (protocolResponse) {
                        if (!protocolResponse.errors || !protocolResponse.globalErrors) {

                            // handle file uploads
                            AttachmentManager.setObject('Protocol')
                            AttachmentManager.setObjectId($scope.protocol.id)
                            AttachmentManager.handleUpload($scope, function () {
                                LoadingToggler.off();
                                $modalInstance.close();
                                callBack();
                            });
                        } else {
                            $('.modal-body').scrollTop(0);
                            LoadingToggler.off();
                        }
                    });

                }
        });
});