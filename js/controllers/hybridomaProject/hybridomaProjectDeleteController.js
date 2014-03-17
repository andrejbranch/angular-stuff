define(['angular', 'controllers'], function (angular, controllers) {
    'use strict';

    return controllers
        .controller('HybridomaProjectDeleteController',
            function HybridomaProjectDeleteController (
                $scope, $modalInstance, project, callBack, LoadingToggler
            ) {
                $scope.project = project

                $scope.cancel = function () {
                    $modalInstance.close();
                }

                $scope.delete = function () {
                    LoadingToggler.on()
                    project.$delete({projectId:project.id}, function () {
                        LoadingToggler.off()
                        callBack() 
                        $modalInstance.close()
                    })
                }
        });
});