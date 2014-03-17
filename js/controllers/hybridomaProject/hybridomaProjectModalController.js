define(['angular', 'controllers', 'utTinyMCE'], function (angular, controllers) {
    'use strict';

    return controllers
        .controller('HybridomaProjectModalController',
            function HybridomaProjectModalController ($scope, $modalInstance, projectId,
                callBack, HybridomaProject, $http, $rootScope, LoadingToggler, AttachmentManager
            ) {
                LoadingToggler.on();

                // are we editing or creating
                if (projectId) {
                    $scope.project = HybridomaProject.get({projectId:projectId}, function (project) {
                        LoadingToggler.off();
                    });
                } else {
                    $scope.project = new HybridomaProject();
                    $scope.project.User = utLoggedInUser;
                    LoadingToggler.off();
                }

                $scope.cancel = function () {
                    $modalInstance.close();
                }

                $scope.save = function () {
                    LoadingToggler.on();
                    $scope.project.$save({projectId:$scope.project.id}, function (projectResponse) {
                        if (!projectResponse.errors || !projectResponse.globalErrors) {

                            // handle file uploads
                            AttachmentManager.setObject('HybridomaProject')
                            AttachmentManager.setObjectId($scope.project.id)
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