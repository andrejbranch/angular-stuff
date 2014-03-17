define([
    'angular',
    'controllers',
], function (angular, controllers, $sanitize) {
    'use strict';

    return controllers
        .controller('SampleGridHeadController',
            function SampleGridHeadController($scope, GridHelper) {
                $scope.createSample = function () {
                    GridHelper.createSample();
                }

                $scope.createFusionSample = function () {
                    window.location = '/fusion-samples/new'
                }
        });
});