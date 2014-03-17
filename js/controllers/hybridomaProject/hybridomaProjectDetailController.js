define(['angular', 'controllers'], function (angular, controllers) {
    'use strict';

    return controllers
        .controller('HybridomaProjectDetailController', function HybridomaProjectDetailController(
                $scope, $stateParams, $state, HybridomaProject, LoadingToggler, $modal, $sanitize,
                $rootScope, $http, utPage, HybridomaProjectExperiment, HybridomaProjectReagent,
                HybridomaProjectMeeting
        ) {
            var callBack, init, modalInstance, updateVimMta;

            init = function () {
                LoadingToggler.on();
                $scope.project = HybridomaProject.get({projectId:$stateParams.projectId}, function () {
                    LoadingToggler.off();
                    utPage.setTitle('Hybridoma Project ' + $scope.project.name);
                });
            }

            $scope.updateVimMta = function () {
            }

            $scope.edit = function () {

                callBack = function () {
                    init();
                }

                modalInstance = $modal.open({
                    templateUrl: '/app/partials/hybridomaProject/form.html',
                    controller: 'HybridomaProjectModalController',
                    resolve: {
                        projectId: function () {
                            return $scope.project.id;
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