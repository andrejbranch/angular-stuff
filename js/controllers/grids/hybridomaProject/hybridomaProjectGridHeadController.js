define([
    'angular',
    'controllers',
], function (angular, controllers, $sanitize) {
    'use strict';

    return controllers
        .controller('HybridomaProjectGridHeadController',
            function HybridomaProjectGridHeadController($scope, GridHelper) {
                $scope.createProject = function () {
                    GridHelper.createProject();
                }
        });
});