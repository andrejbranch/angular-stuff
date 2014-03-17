define(['angular', 'app', 'angularRoute', 'angularUIRouter'], function(angular, app) {
    'use strict';

    return app.config(['$stateProvider', '$routeProvider', function($stateProvider, $routeProvider) {
        $stateProvider
            .state('sampleGrid', {
                url: '/sample',
                templateUrl: '/app/partials/sample/grid.html',
                controller: 'SampleGridHeadController'
            })
            .state('sampleGrid.search', {
                url: '/search?contains?user?description?sampleType?protocol?molecule?tag?target?sample?donor?page?perPage?sortField?sortOrder?within?withinUnits?more?moreUnits?start?end',
                templateUrl: '/app/partials/sample/_grid_table.html',
                controller: 'SampleGridController'
            })
            .state('sample', {
                url: '/sample/:sampleId',
                templateUrl: '/app/partials/sample/detail.html',
                controller: 'SampleController'
            })
        ;
    }]);
});