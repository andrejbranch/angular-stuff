define(['angular', 'controllers'], function (angular, controllers) {
    'use strict';

    return controllers
        .controller('HybridomaProjectReagentEditController',
            function HybridomaProjectReagentEditController (
                $scope, $modalInstance, LoadingToggler, callBack, HybridomaProjectReagent, 
                $stateParams, reagent, AttachmentManager
            )
            {
                LoadingToggler.on()
                if (reagent) {
                    $scope.reagent = HybridomaProjectReagent.get({projectId: $stateParams.projectId, reagentId: reagent.id}, function (reagent) {
                        LoadingToggler.off();
                    });
                } else {
                    $scope.reagent = new HybridomaProjectReagent();
                    $scope.reagent.hybridomaProjectId = $stateParams.projectId;
                    LoadingToggler.off();
                }

                $scope.cancel = function () {
                    $modalInstance.close();
                }

                $scope.save = function () {
                    LoadingToggler.on();
                    $scope.reagent.$save({projectId: $stateParams.projectId, reagentId:$scope.reagent.id}, function (reagentResponse) {
                        if (!reagentResponse.errors || !reagentResponse.globalErrors) {

                            AttachmentManager.setObject('HybridomaProjectReagent')
                            AttachmentManager.setObjectId($scope.reagent.id)
                            AttachmentManager.handleUpload($scope, function () {
                                LoadingToggler.off();
                                callBack($scope.reagent);
                                $modalInstance.close();
                            });
                        } else {
                            $('.modal-body').scrollTop(0);
                            LoadingToggler.off();
                        }
                    });

                }

                $scope.delete = function () {
                    reagent.projectId = $stateParams.projectId;
                    reagent.$delete({
                        reagentId: reagent.id,
                        projectId: reagent.projectId,
                    }, function () {
                        $modalInstance.close();
                        callBack();
                    });
                }
        });
});