define([
    'angular',
    'controllers',
], function (angular, controllers, $sanitize) {
    'use strict';

    return controllers
        .controller('CollaboratorGridHeadController',
            function CollaboratorGridHeadController($scope, GridHelper) {
                $scope.createCollaborator = function () {
                    GridHelper.createCollaborator();
                }
        });
});