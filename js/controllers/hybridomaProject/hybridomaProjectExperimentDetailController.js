define(['angular', 'controllers'], function (angular, controllers) {
    'use strict';

    return controllers
        .controller('HybridomaProjectExperimentDetailController', function HybridomaProjectExperimentDetailController(
                $scope, $stateParams, $state, HybridomaProjectExperiment, LoadingToggler, $modal, $sanitize,
                $rootScope, $http, utPage
        ) {
            var callBack, init, modalInstance;

            init = function () {
                LoadingToggler.on();
                $scope.experiment = HybridomaProjectExperiment.get({projectId:$stateParams.projectId, experimentId:$stateParams.experimentId}, function () {
                    LoadingToggler.off();
                    utPage.setTitle('Experiment ' + $scope.experiment.description);
                });
            }

            $scope.edit = function (experiment) {

                callBack = function () {
                    init();
                }

                modalInstance = $modal.open({
                    templateUrl: '/app/partials/hybridomaProject/experiment/form.html',
                    controller: 'HybridomaProjectExperimentEditController',
                    resolve: {
                        experiment: function () {
                            return experiment;
                        },
                        callBack: function () {
                            return callBack;
                        }
                    }
                });
            }

            $scope.comment = function () {
                $rootScope.$broadcast('comment.new');
            }

            init();

            $scope.Date = Date;

            angular.element('body').addClass('edit');
        });
});