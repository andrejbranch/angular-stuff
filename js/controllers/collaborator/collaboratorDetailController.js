define(['angular', 'controllers'], function (angular, controllers) {
    'use strict';

    return controllers
        .controller('CollaboratorDetailController', function CollaboratorDetailController(
                $scope, $stateParams, $state, Collaborator, LoadingToggler, $modal, $sanitize,
                $rootScope, $http, utPage
        ) {
            var callBack, init, modalInstance;

            init = function () {
                LoadingToggler.on();
                $scope.collaborator = Collaborator.get({collaboratorId:$stateParams.collaboratorId}, function () {
                    LoadingToggler.off();
                    utPage.setTitle('Collaborator ' + $scope.collaborator.groupName);
                });
            }

            $scope.edit = function () {

                callBack = function () {
                    init();
                }

                modalInstance = $modal.open({
                    templateUrl: '/app/partials/collaborator/form.html',
                    controller: 'CollaboratorModalController',
                    resolve: {
                        collaboratorId: function () {
                            return $scope.collaborator.id;
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