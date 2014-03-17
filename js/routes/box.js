define(['angular', 'app', 'angularRoute', 'angularUIRouter'], function(angular, app) {
    'use strict';

    return app.config(['$stateProvider', '$routeProvider', function($stateProvider, $routeProvider) {
        $stateProvider
            .state('boxView', {
                url: '/box/:boxId/:snapshot?edit',
                templateUrl: '/app/partials/box/boxView.html',
                controller: 'BoxViewController'
            })
            .state('boxView.freezerList', {
                url: '/f',
                templateUrl: '/app/partials/box/freezerList.html',
                controller: 'FreezerListController'
            })
            .state('boxView.divisionList', {
                url: '/f/:freezerId/d',
                templateUrl: '/app/partials/box/divisionList.html',
                controller: 'DivisionListController'
            })
            .state('boxView.boxList', {
                url: '/d/:divisionId:/b',
                templateUrl: '/app/partials/box/boxList.html',
                controller: 'BoxListController'
            })
            .state('boxView.search', {
                url: '/s/:sampleId/s',
                templateUrl: '/app/partials/box/sampleFind.html',
                controller: 'BoxSampleFindController'
            });
    }]);
});