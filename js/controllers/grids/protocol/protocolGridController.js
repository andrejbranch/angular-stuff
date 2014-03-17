define([
    'angular',
    'controllers',
    'controllers/grids/gridPaginationController',
    'controllers/grids/columnSelectionController',
    'controllers/grids/exportController',
    'controllers/grids/shareController'
], function (angular, controllers, $sanitize) {
    'use strict';

    return controllers
        .controller('ProtocolGridController',
            function ProtocolGridController (
                $scope, Protocol, LoadingToggler, $stateParams, $state, User,
                utPage, $modal, GridHelper, UserGridSetting
            ) {
                var modalInstance, callBack, initProtocols, initUserGridSettings;
                $scope.stateParams = $stateParams;
                $scope.Date = Date;

                var initProtocols = function () {
                    LoadingToggler.on();
                    $scope.protocols = Protocol.query($stateParams, function (protocols) {
                        LoadingToggler.off();
                        $scope.gridParams = $scope.protocols[0].gridParams;
                        utPage.setTitle('Protocol Search');
                    });
                }

                var initUserGridSettings = function () {
                    LoadingToggler.on();
                    $scope.userGridSetting = UserGridSetting.get({gridName:'Protocol'}, function (userGridSetting) {
                        $scope.showColumns = [];
                        angular.forEach(userGridSetting.columns, function (columnDetails, key) {
                            if (columnDetails.selected) {
                                $scope.showColumns.push(columnDetails.name);
                            }
                        });

                        LoadingToggler.off();
                    });
                }

                GridHelper.createProtocol = function (protocolId) {
                    var modalInstance = $modal.open({
                        templateUrl: '/app/partials/protocol/form.html',
                        controller: 'ProtocolModalController',
                        resolve: {
                            protocolId: function () {
                                return protocolId;
                            },
                            callBack: function () {
                                return function () {
                                    initProtocols();
                                };
                            }
                        }
                    });
                }

                GridHelper.initUserGridSettings = initUserGridSettings;

                initProtocols();
                initUserGridSettings();
        });
});