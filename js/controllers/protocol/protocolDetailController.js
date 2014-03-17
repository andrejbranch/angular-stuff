define(['angular', 'controllers'], function (angular, controllers) {
    'use strict';

    return controllers
        .controller('ProtocolDetailController', function ProtocolDetailController(
                $scope, $stateParams, $state, Protocol, LoadingToggler, $modal, $sanitize,
                $rootScope, $http, utPage
        ) {
            var callBack, init, modalInstance;

            init = function () {
                LoadingToggler.on();
                $scope.protocol = Protocol.get({protocolId:$stateParams.protocolId}, function () {
                    LoadingToggler.off();
                    utPage.setTitle('Protocol ' + $scope.protocol.groupName);
                });
            }

            $scope.edit = function () {

                callBack = function () {
                    init();
                }

                modalInstance = $modal.open({
                    templateUrl: '/app/partials/protocol/form.html',
                    controller: 'ProtocolModalController',
                    resolve: {
                        protocolId: function () {
                            return $scope.protocol.id;
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