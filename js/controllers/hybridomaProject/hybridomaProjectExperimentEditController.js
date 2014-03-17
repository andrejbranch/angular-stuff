define(['angular', 'controllers'], function (angular, controllers) {
    'use strict';

    return controllers
        .controller('HybridomaProjectExperimentEditController',
            function HybridomaProjectExperimentEditController ( $scope, $modalInstance,
                LoadingToggler, callBack, HybridomaProjectExperiment, $stateParams,
                experiment, AttachmentManager
            ) {
                LoadingToggler.on();

                if (experiment) {
                    $scope.experiment = HybridomaProjectExperiment.get({projectId: $stateParams.projectId, experimentId: experiment.id}, function (experiment) {
                        LoadingToggler.off();
                    });
                } else {
                    $scope.experiment = new HybridomaProjectExperiment();
                    $scope.experiment.hybridomaProjectId = $stateParams.projectId;
                    LoadingToggler.off();
                }

                $scope.cancel = function () {
                    $modalInstance.close();
                }

                $scope.save = function () {
                    LoadingToggler.on();
                    $scope.experiment.$save({projectId: $stateParams.projectId, experimentId:$scope.experiment.id}, function (experimentResponse) {
                        if (!experimentResponse.errors || !experimentResponse.globalErrors) {
                            AttachmentManager.setObject('HybridomaProjectExperiment')
                            AttachmentManager.setObjectId($scope.experiment.id)
                            AttachmentManager.handleUpload($scope, function () {
                                LoadingToggler.off();
                                callBack($scope.experiment);
                                $modalInstance.close();
                            });
                        } else {
                            $('.modal-body').scrollTop(0);
                            LoadingToggler.off();
                        }
                    });

                }

                $scope.delete = function () {
                    experiment.projectId = $stateParams.projectId;
                    experiment.$delete({
                        experimentId: experiment.id,
                        projectId: experiment.projectId,
                    }, function () {
                        $modalInstance.close();
                        callBack();
                    });
                }
        });
});