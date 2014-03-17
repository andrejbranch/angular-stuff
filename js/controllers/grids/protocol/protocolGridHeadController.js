define([
    'angular',
    'controllers',
], function (angular, controllers, $sanitize) {
    'use strict';

    return controllers
        .controller('ProtocolGridHeadController',
            function ProtocolGridHeadController($scope, GridHelper) {
                $scope.createProtocol = function () {
                    GridHelper.createProtocol();
                }
        });
});