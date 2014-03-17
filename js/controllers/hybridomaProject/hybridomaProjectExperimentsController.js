define(['angular', 'controllers'], function (angular, controllers) {
    'use strict';

    return controllers
        .controller('HybridomaProjectExperimentsController', function HybridomaProjectExperimentsController(
                $scope, LoadingToggler, $modal, HybridomaProjectExperiment, $stateParams, Protocol
        ) {
            var callBack, init;

            init = function () {
                LoadingToggler.on();
                $scope.experiments = HybridomaProjectExperiment.query({projectId:$stateParams.projectId}, function () {
                    LoadingToggler.off();
                });
            }

            $scope.experimentModal = function (experiment) {

                callBack = function () {
                    init();
                }

                $modal.open({
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

            $scope.deleteExperiment = function (experiment) {
                callBack = function () {
                    $scope.experiments.splice($scope.experiments.indexOf(experiment), 1);
                }

                $modal.open({
                    templateUrl: '/app/partials/hybridomaProject/experiment/deleteExperiment.html',
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

            init();
        });
});