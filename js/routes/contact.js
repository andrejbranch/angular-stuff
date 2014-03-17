define(['angular', 'app', 'angularRoute', 'angularUIRouter'], function(angular, app) {
    'use strict';

    return app.config(['$stateProvider', '$routeProvider', function($stateProvider, $routeProvider) {
        $stateProvider
            .state('contactGrid', {
                url: '/contact',
                templateUrl: '/app/partials/contact/grid.html',
                controller: 'ContactGridHeadController'
            })
            .state('contactGrid.search', {
                url: '/search?contains?contact?sortField?sortOrder',
                templateUrl: '/app/partials/contact/_grid_table.html',
                controller: 'ContactGridController'
            })
            .state('contact', {
                url: '/contact/:contactId',
                templateUrl: '/app/partials/contact/detail.html',
                controller: 'ContactDetailController'
            })
        ;
    }]);
});