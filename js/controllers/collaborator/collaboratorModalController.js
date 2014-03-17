define(['angular', 'controllers', 'utTinyMCE'], function (angular, controllers) {
    'use strict';

    return controllers
        .controller('CollaboratorModalController',
            function CollaboratorModalController ($scope, $modalInstance, collaboratorId,
                callBack, Collaborator, $http, $rootScope, LoadingToggler,
                AttachmentManager
            ) {
                LoadingToggler.on();

                // are we editing or creating
                if (collaboratorId) {
                    $scope.collaborator = Collaborator.get({collaboratorId:collaboratorId}, function (collaborator) {
                        LoadingToggler.off();
                    });
                } else {
                    $scope.collaborator = new Collaborator();
                    LoadingToggler.off();
                }

                $scope.cancel = function () {
                    $modalInstance.close();
                }

                $scope.save = function () {
                    LoadingToggler.on();
                    $scope.collaborator.$save({collaboratorId:$scope.collaborator.id}, function (collaboratorResponse) {
                        if (!collaboratorResponse.errors || !collaboratorResponse.globalErrors) {

                            // handle file uploads
                            AttachmentManager.setObject('Collaborator')
                            AttachmentManager.setObjectId($scope.collaborator.id)
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