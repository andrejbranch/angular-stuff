define(['angular', 'controllers'], function (angular, controllers) {
    'use strict';

    return controllers
        .controller('HybridomaProjectReagentsController', function HybridomaProjectReagentsController(
                $scope, LoadingToggler, $modal, HybridomaProjectReagent, $stateParams, VimMtaUpdateHelper,
                Sample
        ) {
            var callBack, init

            init = function () {
                LoadingToggler.on();
                $scope.reagents = HybridomaProjectReagent.query({projectId:$stateParams.projectId}, function () {
                    LoadingToggler.off()
                });
            }

            $scope.reagentModal = function (reagent) {

                callBack = function () {
                    init()
                    VimMtaUpdateHelper.init()
                }

                $modal.open({
                    templateUrl: '/app/partials/hybridomaProject/reagent/form.html',
                    controller: 'HybridomaProjectReagentEditController',
                    resolve: {
                        reagent: function () {
                            return reagent
                        },
                        callBack: function () {
                            return callBack
                        }
                    }
                })
            }

            $scope.deleteReagent = function (reagent) {
                callBack = function () {
                    $scope.reagents.splice($scope.reagents.indexOf(reagent), 1)
                    VimMtaUpdateHelper.init()
                }

                $modal.open({
                    templateUrl: '/app/partials/hybridomaProject/reagent/deleteReagent.html',
                    controller: 'HybridomaProjectReagentEditController',
                    resolve: {
                        reagent: function () {
                            return reagent
                        },
                        callBack: function () {
                            return callBack
                        }
                    }
                });
            }

            init()
        });
});