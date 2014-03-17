define(['angular', 'app', 'angularRoute', 'angularUIRouter'], function(angular, app) {
    'use strict';

    return app.config(['$stateProvider', '$routeProvider', function($stateProvider, $routeProvider) {
        $stateProvider
            .state('protocolGrid', {
                url: '/protocol',
                templateUrl: '/app/partials/protocol/grid.html',
                controller: 'ProtocolGridHeadController'
            })
            .state('protocolGrid.search', {
                url: '/search?contains?protocol?sortField?sortOrder',
                templateUrl: '/app/partials/protocol/_grid_table.html',
                controller: 'ProtocolGridController'
            })
            .state('protocol', {
                url: '/protocol/:protocolId',
                templateUrl: '/app/partials/protocol/detail.html',
                controller: 'ProtocolDetailController'
            })
        ;
    }]);
});