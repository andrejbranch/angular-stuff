define(['angular', 'app', 'angularRoute', 'angularUIRouter'], function(angular, app) {
    'use strict';

    return app.config(['$stateProvider', '$routeProvider', function($stateProvider, $routeProvider) {
        $stateProvider
            .state('homePage', {
                url: '',
                templateUrl: '/app/partials/homePage/homePage.html',
                controller: 'HomePageController'
            })
            .state('labCore', {
                url: '/labs-and-cores',
                templateUrl: '/app/partials/homePage/labCores.html',
                controller: 'LabCoreController'
            })
            .state('croweLab', {
                url: '/crowelab',
                templateUrl: '/app/partials/homePage/crowelab.html',
                controller: 'CroweLabController'
            })
            .state('adminCore', {
                url: '/admin-core',
                templateUrl: '/app/partials/homePage/adminCore.html',
                controller: 'AdminCoreController'
            })
            .state('flowCore', {
                url: '/flow-core',
                templateUrl: '/app/partials/homePage/flowCore.html',
                controller: 'FlowCoreController'
            })
            .state('gocore', {
                url: '/gocore',
                templateUrl: '/app/partials/homePage/gocore.html',
                controller: 'GocoreController'
            })
            .state('immunologyCore', {
                url: '/immunology-core',
                templateUrl: '/app/partials/homePage/immunologyCore.html',
                controller: 'ImmunologyCoreController'
            })
            .state('polackLab', {
                url: '/polack-lab',
                templateUrl: '/app/partials/homePage/polackLab.html',
                controller: 'PolackLabController'
            })
            .state('techCore', {
                url: '/tech-core',
                templateUrl: '/app/partials/homePage/techCore.html',
                controller: 'TechCoreController'
            })
        ;
    }]);
});