define(['angular', 'app', 'angularRoute', 'angularUIRouter'], function(angular, app) {
    'use strict';

    return app.config(['$stateProvider', '$routeProvider', function($stateProvider, $routeProvider) {
        $stateProvider
            .state('collaboratorGrid', {
                url: '/collaborator',
                templateUrl: '/app/partials/collaborator/grid.html',
                controller: 'CollaboratorGridHeadController'
            })
            .state('collaboratorGrid.search', {
                url: '/search?contains?collaborator?sortField?sortOrder',
                templateUrl: '/app/partials/collaborator/_grid_table.html',
                controller: 'CollaboratorGridController'
            })
            .state('collaborator', {
                url: '/collaborator/:collaboratorId',
                templateUrl: '/app/partials/collaborator/detail.html',
                controller: 'CollaboratorDetailController'
            })
        ;
    }]);
});