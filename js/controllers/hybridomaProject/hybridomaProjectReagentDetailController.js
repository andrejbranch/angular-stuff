define(['angular', 'controllers'], function (angular, controllers) {
    'use strict';

    return controllers
        .controller('HybridomaProjectReagentDetailController', function HybridomaProjectReagentDetailController(
                $scope, $stateParams, $state, HybridomaProjectReagent, LoadingToggler, $modal, $sanitize,
                $rootScope, $http, utPage
        ) {
            var callBack, init, modalInstance;

            init = function () {
                LoadingToggler.on();
                $scope.reagent = HybridomaProjectReagent.get({projectId:$stateParams.projectId, reagentId:$stateParams.reagentId}, function () {
                    LoadingToggler.off();
                    utPage.setTitle('Reagent ' + $scope.reagent.description);
                });
            }

            $scope.edit = function (reagent) {

                callBack = function () {
                    init();
                }

                modalInstance = $modal.open({
                    templateUrl: '/app/partials/hybridomaProject/reagent/form.html',
                    controller: 'HybridomaProjectReagentEditController',
                    resolve: {
                        reagent: function () {
                            return reagent;
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