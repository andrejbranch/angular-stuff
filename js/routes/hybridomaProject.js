define(['angular', 'app', 'angularRoute', 'angularUIRouter'], function(angular, app) {
    'use strict';

    return app.config(['$stateProvider', '$routeProvider', function($stateProvider, $routeProvider) {
        $stateProvider
            .state('projectGrid', {
                url: '/hybridoma-project',
                templateUrl: '/app/partials/hybridomaProject/grid.html',
                controller: 'HybridomaProjectGridHeadController'
            })
            .state('projectGrid.search', {
                url: '/search?contains?project?sortField?sortOrder?within?withinUnits?more?moreUnits?start?end',
                templateUrl: '/app/partials/hybridomaProject/_grid_table.html',
                controller: 'HybridomaProjectGridController'
            })
            .state('project', {
                url: '/hybridoma-project/:projectId',
                templateUrl: '/app/partials/hybridomaProject/detail.html',
                controller: 'HybridomaProjectDetailController'
            })
            .state('experiment', {
                url: '/hybridoma-project-experiment/:projectId/:experimentId',
                templateUrl: '/app/partials/hybridomaProject/experiment/detail.html',
                controller: 'HybridomaProjectExperimentDetailController'
            })
            .state('meeting', {
                url: '/hybridoma-project-meeting/:projectId/:meetingId',
                templateUrl: '/app/partials/hybridomaProject/meeting/detail.html',
                controller: 'HybridomaProjectMeetingDetailController'
            })
            .state('reagent', {
                url: '/hybridoma-project-reagent/:projectId/:reagentId',
                templateUrl: '/app/partials/hybridomaProject/reagent/detail.html',
                controller: 'HybridomaProjectReagentDetailController'
            })
        ;
    }]);
});